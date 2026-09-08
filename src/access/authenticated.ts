import type { PayloadRequest } from "payload";

/** Payload access rule shared by collections that require an admin session. */
export const authenticated = ({
  req: { user },
}: {
  req: PayloadRequest;
}): boolean => Boolean(user);
