import { Box, Fab } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDialogs } from '@toolpad/core';
import ProductFormComponent from './ProductFormComponent';

export default function AddButtonComponent() {
    const dialogs = useDialogs();
    
    const handleOpenDialog = () => {
        dialogs.open(ProductFormComponent,

            
        );
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
            <Fab color="success" aria-label="add" onClick={handleOpenDialog}>
                <AddIcon />
            </Fab>
        </Box>
    );
}
