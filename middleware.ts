import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  const { pathname } = request.nextUrl;

if(currentUser && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/expense-tracker', request.url));
}

  return NextResponse.next();
}