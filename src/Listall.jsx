
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Navbar';
// import Product from './list/Product';
import ProductList from './list/ProductList';



export default function Listall() {
  return (
    <>
    <div className='bgcolor'>

    <Navbar />

    <Box height={70}  />
   
   
      <Box sx={{ display: 'flex' }}>
    
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Product /> */}
        
        <ProductList />
        
         
        </Box>
      </Box>
      </div>
    </>
  );
}



