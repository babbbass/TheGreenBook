/*
  Warnings:

  - You are about to alter the column `currentAmount` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `startAmount` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "startAmount" REAL NOT NULL,
    "currentAmount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("createdAt", "currentAmount", "id", "startAmount", "updatedAt", "userId") SELECT "createdAt", "currentAmount", "id", "startAmount", "updatedAt", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
