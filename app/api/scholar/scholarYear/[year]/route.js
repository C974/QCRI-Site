import ScholarsRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/scholars-repo.js";

export async function GET(request, { params }) {
    const year = params.year;
    const scholar = await ScholarsRepo.getScholarByYear(year);
    return Response.json(scholar, { status: 200 });
}
