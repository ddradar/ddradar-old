module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "@nuxtjs/eslint-config-typescript"
  ],
  plugins: ["vue"],
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "space-before-function-paren": ["error", "never"],
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-spacing": "off",
    "prettier/prettier": ["error", { semi: false, singleQuote: true }]
  }
};
