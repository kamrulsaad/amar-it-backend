export const blogsFilterableFields: string[] = ['searchTerm', 'blogCategoryId'];

export const blogsSearchableFields: string[] = ['title'];

export const blogsRelationalFields: string[] = ['blogCategoryId'];
export const blogsRelationalFieldsMapper: { [key: string]: string } = {
    blogCategoryId: 'blogCategory',
};
