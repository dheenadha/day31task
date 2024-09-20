import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
        <Box sx={{ width: '80%',margin: '2%'}}>
            <Typography sx={{margin : '1%'}}>
                Click below to Navigate
            </Typography>
          <Button sx={{margin : '1%'}} color="primary" variant="contained" onClick={()=>navigate('/books')}>Books</Button>
          <Button sx={{margin : '1%'}} color="primary" variant="contained" onClick={()=>navigate('/authors')}>Authors</Button>
        </Box>
    </>
  )
}

export default Home