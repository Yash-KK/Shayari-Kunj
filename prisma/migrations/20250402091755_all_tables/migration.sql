-- CreateEnum
CREATE TYPE "ShayariStatus" AS ENUM ('Approved', 'InProgres', 'Rejected');

-- CreateTable
CREATE TABLE "Shayari" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "status" "ShayariStatus" NOT NULL,

    CONSTRAINT "Shayari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShayariToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ShayariToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ShayariToTag_B_index" ON "_ShayariToTag"("B");

-- AddForeignKey
ALTER TABLE "_ShayariToTag" ADD CONSTRAINT "_ShayariToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Shayari"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShayariToTag" ADD CONSTRAINT "_ShayariToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
