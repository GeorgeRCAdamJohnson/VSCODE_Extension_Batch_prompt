# Copilot Chat Batch Evaluation Extension

## Overview
This VS Code extension allows you to batch-send prompts to Copilot Chat, time each response, and export results to a file. It is designed for creative and technical workflows, and can be integrated into larger projects or pipelines.

## Features
- Batch prompt evaluation using a text file
- Progress indicator and robust error handling
- Timed responses for each prompt
- Export results to a text file

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/GeorgeRCAdamJohnson/VSCODE_Extension_Batch_prompt.git
   ```
2. Open the folder in VS Code.
3. Run `npm install` to install dependencies.
4. Press F5 to launch the Extension Development Host.

## Usage
1. In the Extension Development Host, open the Command Palette (Ctrl+Shift+P).
2. Run `Copilot Chat: Batch Evaluate`.
3. Select a prompt file (one prompt per line, e.g. `starship-prompts.txt`).
4. Choose an output file location.
5. Review results and timings in the output file.

## Example Prompt File
```
Design a customizable starship dashboard with drag-and-drop holographic widgets.
Build an anomaly scanner that decodes alien signals in real time.
... (one prompt per line)
```

## Expected Results
- Each prompt receives a detailed, creative response (1–2 paragraphs, code samples possible).
- Response times: 2–10 seconds per prompt.
- Output file contains all prompts, responses, and timings.

## Integration with Main Project
- You can use this extension as a standalone tool or integrate it into your main project pipeline.
- For automation, you can trigger batch evaluation via VS Code tasks or scripts.
- Results can be parsed and used for further analysis, documentation, or creative development.
- Amazon Q or Copilot can assist with configuration, troubleshooting, and extending the workflow.

## Troubleshooting
- Ensure `engines.vscode` is set in `package.json`.
- Recompile and reload the extension after code changes.
- If errors occur, check the output file for details.

## Contributing
Pull requests and feedback welcome!

## License
MIT
