import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csv from 'csv-parser'; // Ensure you have the csv-parser package
import { PrismaClient } from '@prisma/client'; // Adjust according to your setup

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

// async function main() {
//   const records = [];
//   const csvPath = path.join(__dirname, 'people2.csv');

//   // Read the CSV file
//   fs.createReadStream(csvPath)
//     .pipe(csv())
//     .on('data', (data) => records.push(data))
//     .on('end', async () => {
//       // Process each record and insert it into the database
//       for (const record of records) {
//         if (record.id) { // Check if id is present
//           try {
//             const existingRecord = await prisma.people2.findUnique({
//               where: { id: parseInt(record.id) },
//             });

//             if (!existingRecord) {
//               await prisma.people2.create({
//                 data: {
//                   id: parseInt(record.id),
//                   name: record.name,
//                   url: record.url,
//                   year: record.year,
//                   univ: record.univ,
//                   gradlevel: record.gradlevel,
//                   country: record.country,
//                   dissertation: record.dissertation,
//                   students: record.students || '',
//                   advisors: record.advisors || '',
//                   webcontent: record.webcontent || '',
//                   otherurl: record.otherurl || '',
//                   imageurls: record.imageurls || '',
//                   wikicontent: record.wikicontent || '',
//                   wikiurls: record.wikiurls || '',
//                   languagelinks: record.languagelinks || '',
//                   wikiconnections: record.wikiconnections || '',
//                 },
//               });
//             } else {
//               console.warn(`Record with id ${record.id} already exists. Skipping.`);
//             }
//           } catch (error) {
//             console.error(`Failed to process record with id ${record.id}:`, error);
//           }
//         } else {
//           console.warn(`Skipping record due to missing id:`, record);
//         }
//       }

const countrypath = path.join(__dirname, '../app/data/country.json');

async function main1() {
  try {
    const jsonData = fs.readFileSync(countrypath, 'utf-8');
    const countries = JSON.parse(jsonData);
    console.log(countries);
    for (const country of countries) {
      await prisma.country.create({
        data: country,
      });
    }
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main1()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

// async function run() {
//   // await unseed(); // Ensure unseeding is complete
//   await main();   // Then start seeding
// }

// run()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

// // const islandpath = path.join(process.cwd(), 'D:/GItHub/QCRI-Site/QCRI-Site/app/data/num_islands.json');

// async function main3() {

//   // const filePath = path.join(__dirname, 'data', 'num_islands.json');
//   const filePath = path.join(__dirname, '../app/data/num_islands.json');
//   const data = fs.readFileSync(filePath, 'utf8');
//   const jsonData = JSON.parse(data);


//   for (const islandDetail of jsonData.islands_details) {
//     await prisma.island.create({
//       data: {
//         islandNumber: islandDetail.island_number,
//         startYear: islandDetail.start_year ? parseInt(islandDetail.start_year, 10) : null,
//         endYear: islandDetail.end_year ? parseInt(islandDetail.end_year, 10) : null,
//         node: islandDetail.nodes,
//       },
//     });
//   }
// }

// main3()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });