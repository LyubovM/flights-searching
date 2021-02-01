module.exports = {
  root: true,

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  env: {
    node: true,
    browser: true,
  },

  rules: {
    'no-shadow': 'off', // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'object-curly-newline': 'off',
    'no-restricted-syntax': [2, 'ForInStatement'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [2, { code: 240, tabWidth: 2, ignoreUrls: true }],
    'import/no-cycle': [2, { maxDepth: 1 }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      vue: 'never',
    }],
    'prefer-destructuring': 'off',
    camelcase: [2, { properties: 'always' }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always',
      },
    }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
          'ctx',
          'req',
          'request',
          'res',
          'response',
          '$scope',
        ],
      },
    ],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    curly: ['error', 'all'],
    'no-implicit-coercion': ['error'],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'no-inner-declarations': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
  },

  overrides: [
    {
      files: [
        '**/*.spec.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
