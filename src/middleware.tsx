// import { getToken } from 'next-auth/jwt'
// import { NextRequest, NextResponse } from 'next/server'
// export async function middleware(request : NextRequest) {
//   const token = await getToken({req : request})
//   if(token){
//     if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register" ){
//       return NextResponse.redirect(new URL('/' , request.url ))
//     }
//     else{
//       return NextResponse.next() //go to place you want
//     }
//   }
//   else{
//     if(request.nextUrl.pathname === "/cart"){
//       return NextResponse.redirect(new URL('/login' , request.url ))
//     }
//    else{
//      return NextResponse.next() //go to place you want
//    }
// }
// }
// export const config = {
//     matcher: ['/cart', '/login' , '/register' ]
// }

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  if (token) {
    if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  else {
    const protectedRoutes = ["/cart", "/orders", "/users", "/wishlist"];

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/cart", "/orders", "/users", "/wishlist", "/login", "/register"],
};
