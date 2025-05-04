import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    IconButton,
    Dialog
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useProducts } from '../providers/ProductProvider';

export default function ProductFormComponent({ open, onClose, }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: undefined

    });
    const [fileData, setFileData] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileData(file)



        }
    };
    const productProvider = useProducts();
    console.log({productProvider:productProvider,

    });
    ;
    const handleSubmit = async (e) => {
        e.preventDefault();
      await  productProvider.addNewProduct(product, fileData)
      onClose();


    };
    let imageUrl = product.image;
    if (fileData) {
        imageUrl = URL.createObjectURL(fileData);
    }

    return (
        <Dialog open={open} onClose={() => onClose(null)}>
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        إضافة منتج
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="اسم المنتج"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="التفاصيل"
                        name="description"
                        multiline
                        rows={4}
                        value={product.description}
                        onChange={handleChange}
                        required
                    />


                    <FormControl fullWidth margin="normal">
                        <Input
                            id="product-image"
                            type="file"
                            inputProps={{ accept: 'image/*' }}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <label htmlFor="product-image">
                                <IconButton color="primary" component="span">
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </label>
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {product.image ? product.image.name : ''}
                            </Typography>
                        </Box>
                        {imageUrl && (
                            <Box sx={{ mt: 2 }}>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </Box>
                        )}
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Add Product
                    </Button>
                </Paper>
            </Box>
        </Dialog>
    );
}

