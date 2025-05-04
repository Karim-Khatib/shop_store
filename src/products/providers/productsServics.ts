import { createContext, useContext } from "react";
import supabase from "../../supabase/supabase_provider";


const fackeData:Product[] = [
    {
        id:1,
        name:'product 1',
        description:'product 1 description',
       image:undefined
    },
    {
        id:2,
        name:'product 2',
        description:'product 2 description',
        image:undefined
    },
    {
        id:3,
        name:'product 3',
        description:'product 3 description',
        image:undefined
    }

]

class Product{
    id:number|undefined;
    name:string;
    description:string;
    image:String|undefined;
    constructor(id:number|undefined,name:string,description:string,image:String|undefined){
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}
export async function getAllProducts():Promise<Product[]>{
    let {data,error} = await supabase.from('products').select('*');
    console.log({
        data:data,error:error})
    if(error || !data){
        return  [];
    }
    return data.map((product:any)=>{
        return new Product(product.id,product.name,product.description,product.image);
    });
}
export async function inserProduct(product:Product){
    await supabase.from("products").insert(product);
}
export async function delteProductById(id:Number){
    await supabase.from("products").delete().eq("id",id);
}


export {fackeData};


export async function uploadFileAndGetUrl(file: File, bucketName: string = 'products'): Promise<string> {
    try {
        const fileName = `${Date.now()}-${file.name}.png`;
        
        const { data, error } = await supabase
            .storage
            .from("products")
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
        console.error('Error uploading file:', error);
        throw error;
    }
}


