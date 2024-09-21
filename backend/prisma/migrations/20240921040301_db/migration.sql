/*
  Warnings:

  - You are about to drop the column `artistId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `playlistId` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artistId",
ADD COLUMN     "playlistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "albumId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "albumId";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
