import { useContext, useEffect, useState, createContext } from "react";
import { delteProductById, getAllProducts, inserProduct, uploadFileAndGetUrl } from "./productsServics";
import { useLoading } from "../../components/LoadingDialog";
import { useSnackbar } from "notistack";
// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
    return useContext(ProductsContext);
}

const ProductsContext = createContext();
export default function ProductProvider({ children }) {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        getAllProducts().then((produts) => {
            setProduct(() => produts);
            setLoading(false)

        })
    }, [])

    function refresh() {
        getAllProducts().then((produts) => {
            setProduct(() => produts);
        })
    }
    const loading = useLoading();
    async function addNewProduct(product, fileData) {
        let imageUrl = product.image;
        try {
            if (fileData) {
                loading.showDialog("جاري تحميل الصورة");
                imageUrl = await uploadFileAndGetUrl(fileData)
            }
            loading.showDialog("جاري حفظ المنتج");
            await inserProduct({
                description: product.description,
                image: imageUrl,
                name: product.name,
            })
            enqueueSnackbar("تم حفظ المنتح بنجاح")
            refresh();
        } catch (e) {
            enqueueSnackbar(e.message || "حدث خطأ")
        } finally {
            loading.closeDialog()
        }
    }
    async function deleteProduct(id) {
        loading.showDialog("جاري حذف المنتج");
        try{

            await delteProductById(id)
            enqueueSnackbar("تم حذف المنتح بنجاح",{ anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }})
            refresh()

        }catch(e){
            enqueueSnackbar(e.message || "حدث خطأ")
        }
        
        finally{
            loading.closeDialog()
        }
        
    }
    return (
        <ProductsContext.Provider value={{ product, isLoading, refresh, addNewProduct,deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}