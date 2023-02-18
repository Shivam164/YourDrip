import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../Styles/Home.css";
import Navbar from '../components/Navbar';
import AddImage from '../components/AddImage';
import { Storage, Account, Client } from 'appwrite';
import { useState } from 'react';
import { useEffect } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function Home() {

const [images, setImages] = useState(null);

const client = new Client();
const account = new Account(client);
const storage = new Storage(client);

client
    .setEndpoint('http://localhost:5000/v1')
    .setProject(`${process.env.REACT_APP_PROJECT_ID}`)

const getImages = async () => {
    try{
        const _image = await storage.listFiles("63f0c03a166ad54b3561");
        console.log(_image.files);
        setImages(_image.files);
    }catch(error){
        console.log(error);
    }
};

const uploadImage = async () => {
    try{

    }catch(error){
        console.log(error);
    }
}

useEffect(() => {
    console.log(`${process.env.REACT_APP_PROJECT_ID}`);
    console.log(`${process.env.REACT_APP_BUCKET_ID}`)
    getImages();
},[]);

  return (
    <div>
      {/* <CssBaseline /> */}
      <Navbar/>
      <main>
        {/* Hero unit */}
        <div
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >

        <div className='main__banner'>
          <div className='main__banner__left'>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                className="heading__container"
              >
                <h1 className='banner__heading'>Style</h1>
                <h1 className='banner__heading'>Better</h1>
              </Typography>
              
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Recommend Some Fit</Button>
                <Button variant="outlined">Add Clothes</Button>
              </Stack>
            </Container>
          </div>
          <div className='main__banner__right'>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              <p className='main__banner__right__line'>Know the clothes that can go well together.</p>
              <p className='main__banner__right__line'>Know what you can buy that will go well</p>
              <p className='main__banner__right__line'>with other clothes thay you already have.</p>
            </Typography>
          </div>
        </div>

        </div>

          <AddImage/>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {images && <Grid container spacing={4}>
            {images.map((img) => (
              <Grid item key={img.$id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 200, width: 300 }}
                    image={`${storage.getFilePreview("63f0c03a166ad54b3561",img.$id)}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      dflsjdf
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      </div>
  );
}