import { build } from "k-scaffold-jsx";
import { App } from "./src/html/App.js";
build({
  scriptEntry: "./src/worker/main.ts",
  app: App,
  outputDir: "./dist",
  styleEntry: "./src/styles/main.scss",
  translationEntry: "./src/translation.json5",
});
