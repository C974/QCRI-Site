import ScholarsRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/scholars-repo.js";


export async function GET(request, { params }) {

    const uni = params.uni;
    const scholar = await ScholarsRepo.getScholarByUniv(uni);
    return Response.json(scholar, { status: 200 });
}