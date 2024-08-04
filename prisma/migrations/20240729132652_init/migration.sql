-- CreateTable
CREATE TABLE "people2" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "year" TEXT,
    "univ" TEXT,
    "gradlevel" TEXT,
    "country" TEXT,
    "dissertation" TEXT,
    "students" TEXT,
    "advisors" TEXT,
    "webcontent" TEXT,
    "otherurl" TEXT,
    "imageurls" TEXT,
    "wikicontent" TEXT,
    "wikiurls" JSONB,
    "languagelinks" JSONB,
    "wikiconnections" JSONB,

    CONSTRAINT "people2_pkey" PRIMARY KEY ("id")
);
