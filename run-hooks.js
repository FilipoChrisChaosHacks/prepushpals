const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
function getGitRoot() {
    return execSync('git rev-parse --show-toplevel').toString().trim();
}

const projectRoot = getGitRoot();

// Function to check if a package is installed
function isPackageInstalled(packageName) {
    try {
        execSync(`npm list ${packageName} --depth=0`, { stdio: 'ignore', cwd: projectRoot });
        return true; // No error means the package is installed
    } catch (error) {
        return false; // Error means the package is not installed
    }
}

// Function to ensure a package is installed
function ensurePackageInstalled(packageName) {
    if (!isPackageInstalled(packageName)) {
        console.log(`${packageName} is not installed. Installing at project root...`);
        execSync(`npm install ${packageName}`, { stdio: 'inherit', cwd: projectRoot });
    } else {
        console.log(`${packageName} is already installed at the project root.`);
    }
}

function copyFile(source, destination) {
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
}

function randomizeIndentation(line) {
    const spaces = Math.floor(Math.random() * 4); // Random number of spaces (0-3)
    return ' '.repeat(spaces) + line.trim(); // Add spaces before the line
}

function randomizeCode(content) {
    // Split the content into lines
    const lines = content.split('\n');
    const randomizedLines = lines.map(line => {
        // Randomly decide whether to remove the newline
        if (Math.random() < 0.5) {
            return line.trim(); // Remove leading and trailing whitespace
        }
        return line;
    });

    // Join the lines back together with newlines
    return randomizedLines.join('\n');
}

function causeChaos(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && file !== '.git' && file !== 'node_modules') {
            causeChaos(filePath); // Recursively process directories
        }else if (file.endsWith('.js')) {
            // Randomize indentation, variable names, and function order for chaos
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const randomizedContent = fileContent
                .split('\n')
                .map(randomizeIndentation)
                .join('\n');
            randomizeCode(randomizedContent)
            fs.writeFileSync(filePath, randomizedContent);
        }
    });
}

// Now let's require the config from the user's project root
const configPath = path.join(projectRoot, '.hookconfig.json');
const config = require(configPath);

config.checks.forEach(check => {
    try {
        if (check === 'eslint') {
            // Ensure ESLint is installed at the user's project root
            const projectESLintConfigPath = path.join(projectRoot, '.eslintrc.js');
            const ESLintConfigPath = path.join(projectRoot, 'node_modules', 'prepushpals', 'config', '.eslintrc.js')
            copyFile(ESLintConfigPath, projectESLintConfigPath);
            execSync('eslint --fix .', { stdio: 'inherit', cwd: projectRoot });
        } else if (check === 'prettier') {
            // Ensure Prettier is installed at the user's project root
            ensurePackageInstalled('prettier');

            const projectPrettierConfigPath = path.join(projectRoot, '.prettierrc');
            if (!fs.existsSync(projectPrettierConfigPath)) {
                const prettierConfigPath = path.join(projectRoot, 'node_modules', 'prepushpals', 'config', '.prettierrc')
                copyFile(prettierConfigPath, projectPrettierConfigPath);
            }

            execSync('prettier --write .', { stdio: 'inherit', cwd: projectRoot });
        }
        if (check === 'chaos'){
            causeChaos(projectRoot);
        }
        // Add additional checks here
    } catch (error) {
        console.error(`Error during ${check}: ${error}`);
        process.exit(1);
    }
});


