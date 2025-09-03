const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'init',
        'feat',
        'fix',
        'refactor',
        'chore',
        'style',
        'docs',
        'test',
      ],
    ],
  },
};

export default Configuration;
