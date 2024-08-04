import ScholarsRepo from "C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/repo/scholars-repo.js";    

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// export async function GET (request, { params }) {
//     const id = params.id;
//     const scholar= await ScholarsRepo.getScholar(id);
//     return  Response.json(scholar , { status: 200 });
// }


export async function GET (request, { params }) {
    const id = params.id;
    const scholar= await ScholarsRepo.getScholar(id);
    return  Response.json(scholar , { status: 200 });
}