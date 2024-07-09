/*
  Warnings:

  - You are about to drop the column `pic_url` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "pic_url",
ADD COLUMN     "pic_urls" TEXT[];
