import ScholarsRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/scholars-repo.js";


export async function GET(request,{params}) {
    const scholar = await ScholarsRepo.getStudentNameById(params.id);
    return Response.json(scholar, { status: 200 });

 
}