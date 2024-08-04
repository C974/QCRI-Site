import ScholarsRepo from "@/app/repo/scholars-repo.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const scholar = await ScholarsRepo.getscholars();
    return Response.json(scholar, { status: 200 });

}


export async function POST(request) {
    const data = await request.json();
    const scholar = await ScholarsRepo.createScholar(data);

    return Response.json(scholar, { status: 200 });
}
