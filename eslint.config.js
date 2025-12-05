import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    // Ignore build output
    { ignores: ['dist', 'node_modules'] },

    // Base configuration for all files
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.es2021,
                React: 'readonly',
                JSX: 'readonly',
                process: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },

    // JavaScript and JSX files
    {
        files: ['**/*.{js,jsx}'],
        extends: [js.configs.recommended],
        rules: {
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : ['error', { allow: ['error', 'error'] }],
            'no-debugger': 'error',
            'no-var': 'error',
            'no-undef': 'error',
            'no-unreachable': 'error',
            'no-constant-condition': 'error',
            'no-empty': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-template': 'error',
            'prefer-destructuring': ['error', { array: true, object: true }],
        },
    },

    // TypeScript files (excluding config files)
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['*.config.ts', '*.config.*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.app.json',
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-var': 'error',
            'no-unused-vars': 'on', // Handled by @typescript-eslint/no-unused-vars
            'no-undef': 'off', // TypeScript handles this
            'no-unreachable': 'error',
            'no-constant-condition': 'error',
            'no-empty': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-template': 'error',
            'prefer-destructuring': ['error', { array: true, object: true }],
            // TypeScript-specific rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-empty-interface': 'warn',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
        },
    },

    // Style and formatting rules (when not using Prettier)
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            // Code quality rules
            'no-else-return': 'error',
            'no-implicit-coercion': 'error',
            'no-useless-return': 'error',
            'no-useless-concat': 'error',
            'no-useless-escape': 'error',
            'no-loop-func': 'error',
            eqeqeq: ['error', 'always'],
            'dot-notation': 'error',
            curly: ['error', 'all'],
            camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
            'new-cap': ['error', { newIsCap: true }],
            'no-underscore-dangle': ['error', { allow: ['_id'] }],

            // Complexity rules
            'max-len': [
                'warn',
                { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true },
            ],
            'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
            'max-depth': ['warn', 4],
            'max-nested-callbacks': ['warn', 3],
            complexity: ['warn', 10],
        },
    },

    // React and JSX rules
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-key': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-pascal-case': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-unsafe': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },

    // Import rules
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: { project: './tsconfig.app.json' },
                node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
            },
        },
        rules: {
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            'import/export': 'error',
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/first': 'error',
            'import/no-duplicates': 'error',
        },
    },

    // Accessibility rules
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-has-content': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/aria-unsupported-elements': 'error',
            'jsx-a11y/img-redundant-alt': 'error',
            'jsx-a11y/mouse-events-have-key-events': 'error',
            'jsx-a11y/no-access-key': 'error',
            'jsx-a11y/no-noninteractive-element-interactions': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'error',
            'jsx-a11y/role-supports-aria-props': 'error',
            'jsx-a11y/tabindex-no-positive': 'warn',
        },
    },

    // Configuration files (vite.config.ts, etc.)
    {
        files: ['*.config.{js,ts}', '*.config.*.{js,ts}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            globals: globals.node,
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'no-console': 'off',
        },
    },

    // Test files configuration
    {
        files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'max-lines-per-function': 'off',
            complexity: 'off',
        },
    },

    // Prettier integration (should be last)
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            // Disable style rules that conflict with Prettier
            indent: 'off',
            'linebreak-style': 'off',
            quotes: 'off',
            semi: 'off',
            'comma-dangle': 'off',
            'object-curly-spacing': 'off',
            'array-bracket-spacing': 'off',
            'arrow-parens': 'off',
            'arrow-spacing': 'off',
            'eol-last': 'off',
            'key-spacing': 'off',
            'no-multiple-empty-lines': 'off',
            'no-trailing-spaces': 'off',
            'max-len': 'off',
        },
    },
]);
