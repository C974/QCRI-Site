import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class CountryRepo {

    // async getLatitudeByCountry(country) {
    //     try {
    //         const result = await prisma.country.findUnique({
    //             where: {
    //                 country: country,
    //             },
    //             select: {
    //                 latitude: true,
    //             },
    //         });
    //         return result ? result.latitude : null;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }
    // async getLongitudeByCountry(country) {
    //     try {
    //         const result = await prisma.countryData.findUnique({
    //             where: {
    //                 country: country,
    //             },
    //             select: {
    //                 longitude: true,
    //             },
    //         });
    //         return result ? result.longitude : null;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }



    // async getCoordinatesByCountry(country) {
    //     try {
    //         const result = await prisma.country.findUnique({
    //             where: { country },
    //             select: { longitude: true, latitude: true },
    //         });
    //         return result ? { longitude: result.longitude, latitude: result.latitude } : null;
    //     } catch (error) {
    //         console.error("Error retrieving coordinates:", error);
    //         throw error;
    //     }
    // }

    async getLocation(country) {
        try {
            return await prisma.country.findMany({
                where: {
                    country: country
                }, select: {
                    longitude: true,
                    latitude: true
                },
            })
        } catch (error) {
            return { error: error.message }
        }
    }


    async getCoordinatesByCountry(country) {
        try {
            // Check if 'country' is not null or undefined
            if (!country) {
                throw new Error("Country parameter is required");
            }

            const result = await prisma.country.findUnique({
                where: { country },
                select: { longitude: true, latitude: true },
            });

            if (!result) {
                console.warn(`No coordinates found for country: ${country}`);
                return null;
            }

            return { longitude: result.longitude, latitude: result.latitude };
        } catch (error) {
            console.error("Error retrieving coordinates:", error.message);
            throw error;
        }
    }


    async getallCountries() {
        try {
            return await prisma.country.findMany();
        } catch (error) {
            return { error: error.message }
        }
    }
}






export default new CountryRepo();