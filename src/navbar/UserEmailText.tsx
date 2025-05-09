"use server";

import { getCurrentUser } from "@/backend/auth/UserAuth";

export default async function UserEmailText() {
  const user = await getCurrentUser();
 

  return <div>{user?.fullName}</div>;
}
