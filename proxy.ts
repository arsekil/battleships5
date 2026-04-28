import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding']);
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/leaderboard', '/support', '/contact'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth()

  if (isAuthenticated && isOnboardingRoute(req)) {
    return NextResponse.next()
  }

  if (!isAuthenticated && !isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url })

  // TODO enable onboarding after implementing it, for now we want to allow users to access the app without completing onboarding
  // if (isAuthenticated && sessionClaims?.metadata?.onboardingComplete === "false" || 
  // isAuthenticated && sessionClaims?.metadata?.skipOnboardingTemporarily === "true") {
  //   const onboardingUrl = new URL('/onboarding', req.url)
  //   return NextResponse.redirect(onboardingUrl)
  // }

  if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
