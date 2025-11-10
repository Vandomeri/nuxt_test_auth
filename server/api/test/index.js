import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const slides = await prisma.МодельТоваров.findMany({
        take: 6
    })
    return slides


})