// file: ~/server/api/auth/[...].ts
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { PrismaClient } from '@prisma/client'
export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption
    secret: 'your-secret-here',
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {

                const prisma = new PrismaClient()

                const response = await prisma.users.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })


                if (credentials?.password === response?.password) {
                    return {
                        id: response?.id,
                        email: response?.email,
                    }

                }

                return null

            }
        })],
    callbacks: {
        async session({ session, token, user }) {
            session.user = {
                email: token.email,
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }


            return token
        }

    }
})