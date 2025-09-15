import * as vscode from 'vscode';


export async function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('copilotChat.batchEvaluate', async () => {
    try {
      // Select Copilot chat models
      const models = await vscode.lm.selectChatModels({ vendor: 'copilot' });
      if (models.length === 0) {
        vscode.window.showErrorMessage('No Copilot chat models available.');
        return;
      }
      const model = models[0];
      // Prompt user to select a text file with prompts
      const promptFileUri = await vscode.window.showOpenDialog({
        canSelectMany: false,
        filters: { 'Text Files': ['txt'] },
        openLabel: 'Select Prompt File'
      });
      if (!promptFileUri || promptFileUri.length === 0) {
        vscode.window.showErrorMessage('No prompt file selected.');
        return;
      }
      const promptFile = promptFileUri[0];
      const promptData = await vscode.workspace.fs.readFile(promptFile);
      const promptLines = Buffer.from(promptData).toString('utf8').split(/\r?\n/).filter(line => line.trim().length > 0);
      const prompts = promptLines.map(line => ({
        role: vscode.LanguageModelChatMessageRole.User,
        name: 'User',
        content: [ new vscode.LanguageModelTextPart(line) ]
      }));

      // Prompt user to select output file location
      const outputFileUri = await vscode.window.showSaveDialog({
        filters: { 'Text Files': ['txt'] },
        saveLabel: 'Save Responses As'
      });
      if (!outputFileUri) {
        vscode.window.showErrorMessage('No output file selected.');
        return;
      }

      let output = '';
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Copilot Chat Batch Evaluation',
        cancellable: false
      }, async (progress) => {
        let completed = 0;
        for (const prompt of prompts) {
          try {
            progress.report({ message: `Processing prompt ${completed + 1} of ${prompts.length}` });
            const start = Date.now();
            const response = await model.sendRequest([prompt]);
            let responseText = '';
            for await (const chunk of response.text) {
              responseText += chunk;
            }
            const end = Date.now();
            const elapsed = ((end - start) / 1000).toFixed(2);
            output += `Prompt: ${prompt.content[0].value}\nResponse: ${responseText || 'No response'}\nTime: ${elapsed} seconds\n\n`;
            completed++;
          } catch (err) {
            output += `Prompt: ${prompt.content[0].value}\nError: ${err}\n\n`;
            vscode.window.showWarningMessage(`Error processing prompt: ${prompt.content[0].value}`);
          }
        }
        await vscode.workspace.fs.writeFile(outputFileUri, Buffer.from(output, 'utf8'));
        vscode.window.showInformationMessage('Batch evaluation complete. Responses saved.');
      });
    } catch (err) {
      vscode.window.showErrorMessage(`Batch evaluation failed: ${err}`);
    }
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
