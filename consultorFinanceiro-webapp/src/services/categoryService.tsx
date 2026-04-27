import type {CategoryDto, MinimalCategoryDto, ReturnCategory} from "../types/category.ts";
import api from "../api/api.ts";

export const getAllCategories = async (): Promise<ReturnCategory[]> => {
    const response = await api.get("/category");
    return response.data.data;
}

export const getAllMinimalCategories = async (): Promise<MinimalCategoryDto[]> => {
    const response = await api.get("/category/minimal");
    return response.data.data;
}

export const getCategoryById = async (id: string): Promise<ReturnCategory> => {
    const response = await api.get(`/category/${id}`);
    return response.data.data;
}

export const createCategory = async(createCategory: CategoryDto): Promise<ReturnCategory> => {
    const response = await api.post("/category/create", createCategory);
    return response.data.data;
}

export const updateCategory = async(updateCategory: CategoryDto, id: string): Promise<ReturnCategory> => {
    const response = await api.post(`/category/update/${id}`, updateCategory);
    return response.data.data;
}

export const deleteCategory = async(id: string): Promise<boolean> => {
    const response = await api.delete(`/category/delete/${id}`);
    return response.data.data;
}