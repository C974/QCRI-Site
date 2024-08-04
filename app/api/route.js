import CountryRepo from "@/app/repo/country-repo.js";


export async function GET(request ) {
    const country = await CountryRepo.getCountry();
    return Response.json({ country }, { status: 200 });


}


