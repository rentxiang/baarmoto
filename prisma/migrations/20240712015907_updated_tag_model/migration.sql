/*
  Warnings:

  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "tagId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PostTag";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
