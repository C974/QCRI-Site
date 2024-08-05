import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class IslandRepo {

    async checkNodesPresent(id1, id2) {
        try {
            return prisma.islands.findMany({
                where: {
                    node: {
                        hasSome: [id1, id2] // Adjust based on your actual schema
                    }
                },
                select: {
                    id: true
                }
            });
            
        } catch (error) {
            return { error: error.message }
        }
    }
}
export default  new IslandRepo();

