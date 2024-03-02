const { execSync } = require('child_process');
const path = require('path');

// Use INIT_CWD to find the user's root directory
const projectRoot = process.env.INIT_CWD;

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

// Now let's require the config from the user's project root
const configPath = path.join(projectRoot, '.hookconfig.json');
const config = require(configPath);

config.checks.forEach(check => {
    try {
        if (check === 'eslint') {
            // Ensure ESLint is installed at the user's project root
            ensurePackageInstalled('eslint');
            execSync('eslint .', { stdio: 'inherit', cwd: projectRoot });
        } else if (check === 'prettier') {
            // Ensure Prettier is installed at the user's project root
            ensurePackageInstalled('prettier');
            execSync('prettier --check .', { stdio: 'inherit', cwd: projectRoot });
        }
        // Add additional checks here
    } catch (error) {
        console.error(`Error during ${check}: ${error}`);
        process.exit(1);
    }
});
