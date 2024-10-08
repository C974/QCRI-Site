import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ScholarsRepo {
    async getScholars() {
        try {
            return prisma.people2.findMany({
                orderBy: { id: 'asc' },
                take: 100
            });
        } catch (error) {
            return { error: error.message };
        }
    }
    async getScholar(id) {
        try {
            return prisma.people2.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }
    async getStudentNameById(id) {
        try {
            return prisma.people2.findUnique({
                where: {
                    id: parseInt(id)
                }, select: { name: true }
            })
        } catch (error) {
            return { error: error.message }
        }
    }
    async getScholarName(name) {
        try {
            return prisma.people2.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getScholarName2(name) {
        try {
            return await prisma.people2.findMany({
                where: {
                    name: {
                        contains: name
                    }
                },
                select: {
                    country: true,
                    id: true
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }



    async getScholarByCountry(country) {
        try {
            return prisma.people2.findMany({
                where: {
                    country: {
                        contains: country
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    //get scholars by year

    async getScholarByYear(year) {
        try {
            return prisma.people2.findMany({
                where: {
                    year: {
                        contains: year
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    // get scholars by univ

    async getScholarByUniv(univ) {
        try {
            return prisma.people2.findMany({
                where: {
                    univ: {
                        contains: univ
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    //get scholars by gradlevel

    async getScholarByGradlevel(gradlevel) {
        try {
            return prisma.people2.findMany({
                where: {
                    gradlevel: {
                        contains: gradlevel
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    // students String? get scholars by students

    async getScholarByStudents(students) {
        try {
            return prisma.people2.findMany({
                where: {
                    students: {
                        contains: students
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    // advisors String? get scholars by advisors

    async getScholarByAdvisors(advisors) {
        try {
            return prisma.people2.findMany({
                where: {
                    advisors: {
                        contains: advisors
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }


    //get advisor by scholar name 

    async getAdvisorByScholarName(name) {
        try {
            return prisma.people2.findMany({
                where: {
                    name: {
                        contains: name
                    }
                },
                select: {
                    advisors: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    //get id by name 

    async getScholarIdByName(name) {
        try {
            return prisma.people2.findMany({
                where: {
                    name: {
                        contains: name
                    }
                },
                select: {
                    id: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }



    async createScholar(people2) {
        try {
            return prisma.people2.create({
                data: people2
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateScholar(id, people2) {
        try {
            return prisma.people2.update({
                where: {
                    id: parseInt(id)
                },
                data: people2
            })
        } catch (error) {
            return { error: error.message }
        }
    }

}

export default new ScholarsRepo();