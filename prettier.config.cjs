/** @type {import("prettier").Config} */
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~/types/(.*)$",
    "^~/app/(.*)$",
    "^~/config/(.*)$",
    "^~/hooks/(.*)$",
    "^~/lib/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
