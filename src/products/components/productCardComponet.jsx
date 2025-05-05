import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import productDefaultImage from '../assets/product.png'
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDialogs } from '@toolpad/core';
import CardHeader from '@mui/material/CardHeader';


export default function ProductsCardComponent({title,description,image,onDelete}) {
    const dialogs = useDialogs();
    async function handelDeleteDialog(e) {
        e.stopPropagation();
        const isOk = await dialogs.confirm('هل أنت متاكد من حذف المنتج', {
            okText: 'نعم',
            cancelText: 'لا',
            title: 'حذف المنتج',
        });
        if(isOk && onDelete) {
            onDelete();
        }
    }
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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
            </CardActionArea>
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton onClick={handelDeleteDialog} aria-label="حذف">
                    <DeleteIcon sx={{ color:'red' }} />
                </IconButton>
            </Box>
        </Card>
    );
}
