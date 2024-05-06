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
            async authorize(credentials: any) {

                const prisma = new PrismaClient()

                const response = await prisma.users.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })


                if (credentials?.password === response?.password) {
                    return {
                        id: response!.id,
                        email: response!.email,
                        role: response!.role
                    }

                }

                return null

            }
        })],
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
            }


            return token
        },
        async session({ session, token, user }) {
            session.user = {
                id: token.id as number,
                email: token.email!,
                role: token.role as string
            }

            return session
        },
    }
})

