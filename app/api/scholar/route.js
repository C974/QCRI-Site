import { PrismaClient } from '@prisma/client';
import ScholarsRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/scholars-repo.js";


export async function GET(request) {
    const scholar = await ScholarsRepo.getScholars();
    return Response.json(scholar, { status: 200 });

}


export async function POST(request) {
    const data = await request.json();
    const scholar = await ScholarsRepo.createScholar(data);

    return Response.json(scholar, { status: 200 });
}

