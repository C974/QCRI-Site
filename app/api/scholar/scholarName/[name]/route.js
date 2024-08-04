import ScholarsRepo from "C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/repo/scholars-repo.js";    


export async function GET(request, { params }) {
    const name = params.name;
    const scholar = await ScholarsRepo.getScholarName2(name);
    return Response.json(scholar, { status: 200 });

}