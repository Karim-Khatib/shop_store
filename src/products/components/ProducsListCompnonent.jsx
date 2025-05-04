import { Box, Fab, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import ProductsCardComponent from './productCardComponet';
import AddButtonComponent from './AddButtonComponent';
import { useProducts } from '../providers/ProductProvider';
export default function ProducsListCompnonent() {
    const productsProvider = useProducts();

    return (
        productsProvider.isLoading ? <Box
            height={"100vh"}
            width={"100vw"}
            alignContent={"center"}
        >
            <Typography>
                جاري جلب المنتجات
            </Typography>

        </Box> :
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                padding: 2
            }}>
                <Box sx={{
                    flexGrow: 1,
                    position: 'relative'
                }}>
                    <Grid container={true} spacing={2}
                        sx={4}

                    >

                        {
                            productsProvider.product.lenght === 0 ?
                                <Typography>
                                    لاتوجد منتجات
                                </Typography> :

                                productsProvider.product.map((item,) => {
                                    return (
                                        <ProductsCardComponent key={item.id} 
                                        title={item.name}
                                        description={item.description} 
                                        image={item.image} 
                                        id={item.id}

                                        />
                                    )
                                })}
                    </Grid >

                </Box>
                <AddButtonComponent />

            </Box>
    )
}
