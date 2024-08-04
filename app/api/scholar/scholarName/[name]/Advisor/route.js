import ScholarsRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/scholars-repo.js";


export async function GET(request, { params }) {
    const name = params.name;
    const scholar = await ScholarsRepo.getAdvisorByScholarName(name);
    return Response.json(scholar, { status: 200 });

}