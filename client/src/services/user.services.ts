import type { EditUser, User } from "@/shared/interfaces";
import axios from "axios";

export async function editProfile(formData: EditUser): Promise<User> {
    try {
        const res = await axios.put("/api/user/edit", formData);       
        return res.data;
    } 
    catch (error) {
        throw error;
    }
}