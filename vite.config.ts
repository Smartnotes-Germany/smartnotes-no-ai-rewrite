import { defineConfig, loadEnv } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createEnv } from "@t3-oss/env-core";
// Needs to have file name extension (TS). Otherwise Oxlint will not work and fail with this error:
// `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '[...]\smartnotes-no-ai-rewrite\src\env-config'`
// https://nodejs.org/api/esm.html#mandatory-file-extensions
// https://stackoverflow.com/questions/65384754/error-err-module-not-found-cannot-find-module
// ALSO doesn't work with tsConfigPaths. Something like "~/env-config.ts" doesn't work unfortunately without getting this error:
// `vite.config.ts (13:43) [UNRESOLVED_IMPORT] Warning: Could not resolve '~/env-config.ts'` in vite.config.ts and `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '~' imported`
import { envConfigWithoutRuntimeEnv } from "./src/env-config.ts";

const config = defineConfig(({ mode }) => {
  // only put the `envConfigWithoutRuntimeEnv` and the `runtimeEnv` in there
  createEnv({
    ...envConfigWithoutRuntimeEnv,
    /**
     * What object holds the environment variables at runtime (in this case build time). This is usually
     * `process.env` or `import.meta.env`.
     */
    runtimeEnv: {
      ...process.env,
      ...loadEnv(mode, process.cwd(), ""),
    },
  });

  return {
    staged: {
      "*": "vp check --fix",
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
  };
});

export default config;
