import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: {
            id: number,
            email: string,
            role: string
        }
    }

    interface User {
        id: number
        email: string
        role: string
    }
}

