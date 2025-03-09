import { auth } from "@clerk/nextjs/server";

export const getUserRole = async () => {
  const { sessionClaims } = await auth(); // ✅ Gunakan `await`
  return (sessionClaims?.metadata as { role?: string })?.role;
};