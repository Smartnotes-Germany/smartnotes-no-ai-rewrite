import * as z from "zod";

/**
 * Only because the Vite Config doesn't import envs
 * Needs to be in a different file from src/env.ts because if this gets imported in the Vite Config the envs with the wrong `runtimeEnv` would get checked there.
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
    VITE_CONVEX_URL: z.url(),
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
