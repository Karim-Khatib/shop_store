import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const  pathname  =new URL( request.url).pathname;


  if (pathname =='/users') {
   return NextResponse.redirect(new URL('/users/active', request.url));
  }
  return  NextResponse.next();
}