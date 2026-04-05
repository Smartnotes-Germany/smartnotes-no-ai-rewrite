import { createEnv } from "@t3-oss/env-core";
import { createIsomorphicFn } from "@tanstack/react-start";
import { envConfigWithoutRuntimeEnv } from "./env-config";

// Tanstack Start uses two different places where the ENVs come from: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables
const getRuntimeEnv = createIsomorphicFn()
  .server(() => process.env)
  .client(() => import.meta.env);

// only put the `envConfigWithoutRuntimeEnv` and the `runtimeEnv` in there
export const env = createEnv({
  ...envConfigWithoutRuntimeEnv,
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: getRuntimeEnv(),
});
