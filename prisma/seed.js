import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csv from 'csv-parser'; // Ensure you have the csv-parser package
import { PrismaClient } from '@prisma/client'; // Adjust according to your setup

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

async function main() {
  const records = [];
  const csvPath = path.join(__dirname, 'people2.csv');

  // Read the CSV file
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => records.push(data))
    .on('end', async () => {
      // Process each record and insert it into the database
      for (const record of records) {
        if (record.id) { // Check if id is present
          try {
            const existingRecord = await prisma.people2.findUnique({
              where: { id: parseInt(record.id) },
            });

            if (!existingRecord) {
              await prisma.people2.create({
                data: {
                  id: parseInt(record.id),
                  name: record.name,
                  url: record.url,
                  year: record.year,
                  univ: record.univ,
                  gradlevel: record.gradlevel,
                  country: record.country,
                  dissertation: record.dissertation,
                  students: record.students || '',
                  advisors: record.advisors || '',
                  webcontent: record.webcontent || '',
                  otherurl: record.otherurl || '',
                  imageurls: record.imageurls || '',
                  wikicontent: record.wikicontent || '',
                  wikiurls: record.wikiurls || '',
                  languagelinks: record.languagelinks || '',
                  wikiconnections: record.wikiconnections || '',
                },
              });
            } else {
              console.warn(`Record with id ${record.id} already exists. Skipping.`);
            }
          } catch (error) {
            console.error(`Failed to process record with id ${record.id}:`, error);
          }
        } else {
          console.warn(`Skipping record due to missing id:`, record);
        }
      }

      console.log('Seeding finished.');
      await prisma.$disconnect();
    });
}

async function run() {
  // await unseed(); // Ensure unseeding is complete
  await main();   // Then start seeding
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
