import ScholarsRepo from "../app/repo/scholars-repo.js";    


export async function GET(request, { params }) {
    const country = params.country;
    const scholar = await ScholarsRepo.getScholarByCountry(country);
    return Response.json(scholar, { status: 200 });


}