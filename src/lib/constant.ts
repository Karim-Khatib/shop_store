export enum RoutesName {
    ROOT = "/",
  DASHBOARD =  "/dashboard",
  USERS = "/dashboard/users",
  ACTIVE_USERS = "/dashboard/users/active",
  BLOCKED_USERS = "/dashboard/users/blocked",
  GIFTS = "/dashboard/gifts",
  AUTH = "/auth",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  
}
export const PublicRoute:string[]=[RoutesName.LOGIN,RoutesName.REGISTER];
export const PrivateRoute:string[]=[RoutesName.DASHBOARD,RoutesName.USERS,RoutesName.GIFTS,RoutesName.ACTIVE_USERS,RoutesName.BLOCKED_USERS];