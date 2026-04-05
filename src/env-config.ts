import * as z from "zod";

const convexUrlSchema = z.url().refine(
  (value) => {
    return new URL(value).hostname.endsWith(".convex.cloud"); // Cannot end with a trailing "/". Must end with .convex.cloud
  },
  {
    message:
      "Must point to your Convex deployment URL on convex.cloud, not the convex.site URL. Also cannot end with a trailing '/'.",
  },
);

/**
 * Only a separate file from from src/env.ts because the Vite Config doesn't import envs (https://vite.dev/config/#using-environment-variables-in-config) so we need this as a base for then later to give it the runtimeEnvs based on where it's used.
 * If the content of src/env.ts would get imported in the Vite Config the envs with the wrong `runtimeEnv` would get checked there.
 * Put all the T3 Env configuration except the `runtimeEnv` in there.
 */
export const envConfigWithoutRuntimeEnv = {
  server: {
    /* Example envs
      DATABASE_URL: z.url(),
      OPEN_AI_API_KEY: z.string().min(1),
      */
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  client: {
    VITE_CONVEX_URL: convexUrlSchema,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
} as const;
