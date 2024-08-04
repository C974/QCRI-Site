import LocationRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/location-repo.js";

export async function GET(request, { params }) {
    const country = params.country;
    const location = await LocationRepo.getLocation(country);
    return Response.json(location, { status: 200 });


}