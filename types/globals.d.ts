export {}

export type Roles = 'admin' | 'moderator' | 'user' | 'tester' | 'guest';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete: boolean,
      skipOnboardingTemporarily?: boolean
      role: Roles
    }
  }
}