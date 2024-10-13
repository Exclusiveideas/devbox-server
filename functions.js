  // Helper function to strip ANSI escape codes
 function stripAnsiCodes(input) {
    return input.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-ntqry=><]/g,
      ""
    );
  }



module.exports = { stripAnsiCodes };