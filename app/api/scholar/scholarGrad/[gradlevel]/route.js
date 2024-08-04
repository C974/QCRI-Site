import ScholarsRepo from "C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/repo/scholars-repo.js";    

export async function GET(request, { params }) {
    const gradlevel = params.gradlevel;
    const scholar = await ScholarsRepo.getScholarByGradlevel(gradlevel);
    return Response.json(scholar, { status: 200 });
}