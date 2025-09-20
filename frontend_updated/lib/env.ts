import { z } from "zod";

export const env = z
  .object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  })
  .parse(process.env);
