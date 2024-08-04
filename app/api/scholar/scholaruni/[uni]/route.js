import ScholarsRepo from "C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/repo/scholars-repo.js";    


export async function GET(request, { params }) {

    const uni = params.uni;
    const scholar = await ScholarsRepo.getScholarByUniv(uni);
    return Response.json(scholar, { status: 200 });
}