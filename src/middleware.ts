import { NextResponse } from "next/server";
import { PrivateRoute, PublicRoute, RoutesName } from "./lib/constant";
import { getSession } from "./backend/auth/Session";

export async function middleware(request: Request) {
  const token = await getSession(); // const token = request.get('session')?.value
  const isLoggedIn = token != undefined;
  const pathname = new URL(request.url).pathname;
  const isPublicRoute = PublicRoute.includes(pathname);
  const isPrivateRout = PrivateRoute.includes(pathname);
  
  if (!isLoggedIn && isPrivateRout) {
    return NextResponse.redirect(new URL(RoutesName.LOGIN, request.url));
  }
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL(RoutesName.ACTIVE_USERS, request.url));
  }

  if (isLoggedIn) {
    if (
      pathname == RoutesName.USERS ||
      pathname == RoutesName.DASHBOARD ||
      pathname == RoutesName.ROOT
    ) {
      return NextResponse.redirect(
        new URL(RoutesName.ACTIVE_USERS, request.url)
      );
    }
  } 
   if (!isLoggedIn && !isPublicRoute) {
 
    return NextResponse.redirect(new URL(RoutesName.LOGIN, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)","/"],
};
