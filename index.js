const fs = require('fs');
const path = require('path');

function installPreCommitHook() {
  const hooksDir = path.join('.git', 'hooks');
  const preCommitHookPath = path.join(hooksDir, 'pre-commit');
  const scriptPath = path.join(__dirname, 'templates', 'pre-commit.sh');

  // Read the template hook script
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');

  // Write the hook script to the pre-commit file
  fs.writeFileSync(preCommitHookPath, scriptContent, { mode: 0o755 });

  console.log('Pre-commit hook installed successfully!');
}

module.exports = {
    installPreCommitHook,
    // Add other functions here
};