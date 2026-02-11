export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: string
    }
  }
}