import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      //"no-console": "warn", // Permite console.log, mas com aviso
      'semi': ['error', 'always'], // Exige ponto e vírgula no final
      'quotes': ['error', 'single'], // Força aspas duplas
      'indent': ['error', 2,{ 'SwitchCase':1 }], // Força indentação de 2 espaços
      'no-mixed-spaces-and-tabs': 'error', // Evita mistura de tabs e espaços
      'space-before-function-paren': ['error', 'always'], // Espaço antes dos parênteses de funções
      'keyword-spacing': ['error', { 'before': true, 'after': true }], // Espaço antes e depois de palavras-chave
      'object-curly-spacing': ['error', 'always'], // Espaço dentro de chaves { a: 1 }
      '@typescript-eslint/no-empty-object-type':'off',
    },
    //
  },
];
