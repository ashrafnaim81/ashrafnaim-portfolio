-- CreateTable
CREATE TABLE "HomePage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroTitle" TEXT NOT NULL,
    "heroJobTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImage" TEXT,
    "stats" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AboutPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileTitle" TEXT NOT NULL,
    "profileSubtitle" TEXT NOT NULL,
    "profileJobTitle" TEXT NOT NULL,
    "profileLocation" TEXT NOT NULL,
    "profileYearsExperience" TEXT NOT NULL,
    "profileSummary" TEXT NOT NULL,
    "profileImage" TEXT,
    "qualifications" TEXT NOT NULL,
    "expertiseAreas" TEXT NOT NULL,
    "experiences" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
