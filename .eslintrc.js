module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {},
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "@nuxtjs/eslint-config-typescript"
  ],
  plugins: ["vue"],
  rules: {
    semi: [2, "never"],
    indent: "off",
    "no-console": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "prettier/prettier": ["error", { semi: false, singleQuote: true }]
  }
};
