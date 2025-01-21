module.exports = {
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],

  htmlWhitespaceSensitivity: "css",
  bracketSameLine: true,
  vueIndentScriptAndStyle: true,

  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  semi: true,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",

  endOfLine: "lf",
  insertPragma: false,
  insertFinalNewline: true,

  singleAttributePerLine: false
};