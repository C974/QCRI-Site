import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class LoccationRepo {
    async getLocation(country) {
        try {
            return await prisma.country.findFirst({
                where: {
                    country: country
                }, select: {
                    longitude: true,
                    latitude: true
                },
            })
        } catch (error) {
            return { error: error.message }
        }
    }
}




export default new LoccationRepo();