const { execSync } = require('child_process');
const config = require('./.hookconfig.json');

// Function to check if a package is installed
function isPackageInstalled(packageName) {
    try {
        execSync(`npm list ${packageName} --depth=0`, { stdio: 'ignore' });
        return true; // No error means the package is installed
    } catch (error) {
        return false; // Error means the package is not installed
    }
}

// Function to ensure a package is installed
function ensurePackageInstalled(packageName) {
    if (!isPackageInstalled(packageName)) {
        console.log(`${packageName} is not installed. Installing...`);
        execSync(`npm install ${packageName}`, { stdio: 'inherit' });
    } else {
        console.log(`${packageName} is already installed.`);
    }
}

config.checks.forEach(check => {
    try {
        if (check === 'eslint') {
            // Ensure ESLint is installed
            ensurePackageInstalled('eslint');
            execSync('eslint .', { stdio: 'inherit' });
        } else if (check === 'prettier') {
            // Ensure Prettier is installed
            ensurePackageInstalled('prettier');
            execSync('prettier --check .', { stdio: 'inherit' });
        }
        // Add additional checks here
    } catch (error) {
        console.error(`Error during ${check}: ${error}`);
        process.exit(1);
    }
});
