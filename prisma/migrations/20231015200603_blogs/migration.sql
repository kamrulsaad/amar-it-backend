-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_blogCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_blogCategoryId_fkey" FOREIGN KEY ("blogCategoryId") REFERENCES "blog_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
