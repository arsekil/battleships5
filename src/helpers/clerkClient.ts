import { createClerkClient } from '@clerk/backend'

export const clerkClient = createClerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY! as string })