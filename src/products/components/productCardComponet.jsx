import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import productDefaultImage from '../assets/product.png'
import { Box, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDialogs } from '@toolpad/core';
import CardHeader from '@mui/material/CardHeader';
import { useProducts } from '../providers/ProductProvider';


export default function ProductsCardComponent({title,description,image,id}) {
    const dialogs = useDialogs();
    const productProvider=useProducts();
    async function handelDeleteDialog(e) {
        e.stopPropagation();
        const isOk = await dialogs.confirm('هل أنت متاكد من حذف المنتج', {
            okText: 'نعم',
            cancelText: 'لا',
            title: 'حذف المنتج',
        });
        if(isOk && id) {
            productProvider.deleteProduct(id)
        }
    }
    
    return (
        <Card sx={{ maxWidth: 345  , minWidth:250}}>
         <CardHeader
         action={
            <IconButton onClick={handelDeleteDialog} aria-label="delete">
            <DeleteIcon sx={
               { color: 'red',}
            }/>
        </IconButton>
         }
         ></CardHeader>
                <CardMedia
                    component="img"
                    height="140"
                    image={image||productDefaultImage}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title||"no Title"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description|| "No Description"}
                    </Typography>


                </CardContent>
            </Card>);
}
