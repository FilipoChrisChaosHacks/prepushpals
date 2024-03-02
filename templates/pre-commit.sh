#!/bin/bash

if ! command -v prettier &> /dev/null
then
    echo "Prettier is not installed. Installing..."
    install_package prettier
else
    # Run formatting checks
    prettier --check .
fi

# Check if eslint is installed
if ! command -v eslint &> /dev/null
then
    echo "ESLint is not installed. Installing..."
    install_package eslint
else
    # Run linting
    eslint .
fi

# Run tests
npm test