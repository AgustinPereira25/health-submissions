import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'
import { dbPatient } from './database';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //Informacion util sobre el usuario
  // console.log({ session });
  // console.log(req);
  if ( !session ){
    //we don't need to remember previous page if we logOut
    // const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    // if (requestedPage !== '/') url.search = `p=${ requestedPage }`;
    
    return NextResponse.redirect( url );
  }

  if ( req.nextUrl.pathname.startsWith('/patient') || req.nextUrl.pathname === '/' ){
    if( session.user.role !== 'patient' ){
      return NextResponse.redirect( new URL('/doctor/submissions', req.url))
    }
  }

  if ( req.nextUrl.pathname.startsWith('/doctor') || req.nextUrl.pathname === '/'){
    if( session.user.role !== 'doctor' ) {
      return NextResponse.redirect( new URL('/patient', req.url))
    }
  }

  //Control that patient's data it's inserted.
  if ( session.user.role === 'patient' ){
    if ( req.nextUrl.pathname.startsWith('/patient/submissions/new') && ( session.user.phone === '' || session.user.weight === '' || session.user.height === '' || session.user.otherInfo === '' ) ){
      return NextResponse.redirect( new URL('/patient/information', req.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path', '/patient/:path*', '/doctor/:path*']
};