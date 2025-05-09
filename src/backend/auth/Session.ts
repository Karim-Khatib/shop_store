"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "my_secret_key"
);
const COOKIE_NAME = "session";

export async function encrypt(payload: UserPayload) {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function setSession(payload: UserPayload) {
  const token = await encrypt(payload);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60,
  });
}
interface UserPayload {
  userId: string;
}
export async function getSession(): Promise<UserPayload | undefined> {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;

  if (!cookie) return undefined;
  const payload = await decrypt(cookie);
 
  if (!payload?.userId) {
    return undefined;
  }
  return {
    userId: payload.userId?.toString(),
  };
}

export async function clearSession() {
  (await cookies()).delete(COOKIE_NAME);
}
