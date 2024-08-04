import ScholarsRepo from "C:/Users/gigia/Desktop/QCRI-Site/my-next-app/app/repo/scholars-repo.js";    

export async function GET(request, { params }) {
    const year = params.year;
    const scholar = await ScholarsRepo.getScholarByYear(year);
    return Response.json(scholar, { status: 200 });
}
