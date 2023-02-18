import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Account, Client, Databases, Storage } from 'appwrite';
import React, { useState } from 'react';
import "../Styles/AddImage.css";
import uniqid from "uniqid";

function AddImage() {

const [cloth, setCloth] = useState("");
const [clothImage, setClothImage] = useState(null);

const client = new Client();
const account = new Account(client);
const storage = new Storage(client);

client
    .setEndpoint('http://localhost:5000/v1')
    .setProject(`${process.env.REACT_APP_PROJECT_ID}`)

const handleSelect = (e) => {
    e.preventDefault();
    setCloth(e.target.value);
}

const databases = new Databases(client);

const uploadImage = async (e) => {
    e.preventDefault();
    const p = uniqid();
    try{
        const newImage = await storage.createFile('63f0c03a166ad54b3561', p, clothImage);
        const clothType = await databases.createDocument('63f0de3ec6d361c0a004', '63f0de47e2ea632fca55', p, {Key: p, type: cloth});
        console.log(newImage);
        setCloth("");
        setClothImage(null);
    }catch(error){
        console.log(error);
    }
    
}

return ( 
    <div className='form'>
        <h3>Add Image</h3>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cloth</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cloth}
            label="Cloth"
            onChange={handleSelect}
        >
            <MenuItem value={"Shirt"}>Shirt</MenuItem>
            <MenuItem value={"Pant"}>Pant</MenuItem>
            <MenuItem value={"Jeans"}>Jeans</MenuItem>
            <MenuItem value={"Tie"}>Tie</MenuItem>
            <MenuItem value={"Sweater"}>Sweater</MenuItem>
            <MenuItem value={"Shoes"}>Shoes</MenuItem>
            <MenuItem value={"Socks"}>Socks</MenuItem>
        </Select>
        <p></p>
        <Button
        variant="contained"
        component="label"
        >
        <span className='random__space'> </span>
        <input
            type="file"
            onChange={(e) => {
                setClothImage(e.target.files[0]);
            }}
        />
        </Button>
        <p></p>
        <Button variant="contained" onClick={(e) => uploadImage(e)} >Upload</Button>
        </FormControl>
    </div>
    );
}

export default AddImage;