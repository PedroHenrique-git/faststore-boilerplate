import { NextRequest, NextResponse } from 'next/server';

const pathnames = ['/myaccount'];

export function middleware(request: NextRequest) {
  const { nextUrl, cookies, url } = request;

  const isLoggedIn = !!cookies.get('vtex_session');

  if (!isLoggedIn && pathnames.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', url));
  }

  return NextResponse.next();
}
