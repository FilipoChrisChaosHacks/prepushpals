#!/bin/bash

if ! command -v prettier &> /dev/null
then
    echo "Prettier is not installed. Skipping formatting checks."
else
    # Run formatting checks
    prettier --check .
fi

# Check if eslint is installed
if ! command -v eslint &> /dev/null
then
    echo "ESLint is not installed. Skipping linting checks."
else
    # Run linting
    eslint .
fi

# Run tests
npm test