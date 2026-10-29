import js from "@eslint/js";
import globals from "globals";
export default [
  {
    ignores: [
      "**/dist/**",
      "documents/**",
      ".source/**",
      "backups/**",
      "node_modules/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["apps/website/src/*.js"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["scripts/*.mjs", "apps/website/test/*.mjs", "eslint.config.mjs"],
    languageOptions: { globals: globals.node },
  },
];
