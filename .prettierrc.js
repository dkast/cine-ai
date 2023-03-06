// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
 module.exports = {
  semi: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "none",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "pluginSearchDirs": false,
  importOrder: [
    "^react",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^@/env.mjs",
    "^[./]"
  ],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true
};
