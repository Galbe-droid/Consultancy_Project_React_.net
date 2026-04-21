export interface CategoryDto {
    name: string;
    description: string;
    categoryType: 0 | 1 | 2;
}

export interface ReturnCategory{
    id: string;
    name: string;
    description: string;
    createDate: string;
    categoryType: 0 | 1 | 2;
}

export interface MinimalCategoryDto {
    id: string;
    name: string;
    categoryType: 0 | 1 | 2;
}