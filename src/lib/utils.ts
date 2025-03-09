import { auth } from "@clerk/nextjs/server";

export const getUserDetail = async () => {
  const { userId, sessionClaims } = await auth();

  const userDetail = {
    role: (sessionClaims?.metadata as { role?: string })?.role || null,
    currentUserId: userId || null,
  };

  return userDetail;
};