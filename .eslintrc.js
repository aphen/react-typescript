/**
 * @typescript-eslint/parser：ESLint的解析器，用于解析Typescript文件，从而检查和规范Typescript代码
 * @typescript-eslint/eslint-plugin：ESLint插件，包含了各类定义好的检测Typescript代码的规范,'plugin:prettier/recommended'
 */

module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        node: true,
        mocha: true,
        jest: true,
        es6: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', 'jsx-a11y', 'react-hooks', '@typescript-eslint'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 6,
        sourceType: 'module'
    },

    settings: {
        react: {
            version: 'detect'
        }
    },
    globals: {
        JSX: true,
        React: true,
        NodeJS: true,
        Promise: true
    },
    rules: {
        //在Rules中可以自定义你的React代码编码规范。
        //"jsx-a11y/anchor-is-valid":"off"
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
