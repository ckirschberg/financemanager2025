import { CategoryEntity } from "./CategoryEntity";
import axios from 'axios';

export class CategoriesAPI {
    static baseUrl = 'http://127.0.0.1:3000/categories';

    static async getCategories() {
        console.log("calling " + CategoriesAPI.baseUrl);

        try {
            const response = await axios.get<CategoryEntity[]>(this.baseUrl);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        
        
    }

    static async createCategory(category: CategoryEntity) {
        console.log("calling " + CategoriesAPI.baseUrl);
        
        const response = await fetch(CategoriesAPI.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        const data = await response.json();
        return data;
    }
}