import { supabase } from "./supabase";

export async function uploadFileAndGetUrl(file: File, bucketName: string = 'users'): Promise<string> {
    try {
        const fileName = `${Math.random()}${Date.now()}-${file.name}.png`;
        
        const {  error } = await supabase
            .storage
            .from(bucketName)
            .upload(fileName, file);

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(fileName);

        return publicUrl;
    } catch (error) {
     
        throw error;
    }
}