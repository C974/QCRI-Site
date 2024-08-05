-- CreateTable
CREATE TABLE "Island" (
    "id" SERIAL NOT NULL,
    "islandNumber" INTEGER NOT NULL,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "node" TEXT[],

    CONSTRAINT "Island_pkey" PRIMARY KEY ("id")
);
