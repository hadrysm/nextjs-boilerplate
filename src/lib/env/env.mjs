import { createEnv } from '@t3-oss/env-nextjs';
// import { z } from 'zod';

const skipValidation =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== 'false' &&
  process.env.SKIP_ENV_VALIDATION !== '0';

export const env = createEnv({
  skipValidation,
  server: {},
  client: {
    // NEXT_PUBLIC_EXAMPLE: z.string()
  },
  runtimeEnv: {
    // NEXT_PUBLIC_EXAMPLE: process.env.NEXT_PUBLIC_EXAMPLE
  }
});
