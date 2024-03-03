module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'no-var': 'off', // Turn off no-var rule
    'no-unused-vars': 'off', // Turn off no-unused-vars rule
    'require-jsdoc': 'off', // Turn off require-jsdoc rule
  },
};
