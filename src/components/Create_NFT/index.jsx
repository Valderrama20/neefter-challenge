import fetch from "node-fetch"
import axios from 'axios';
import { useState } from "react";
import style from "./NFT.module.css"


export default function NFT () {

  const [data, setData] = useState({name:"",description:"" ,img:"",key:"",value:"",gmail:""})
    const set_data = (e) => {
       setData({...data,[e.target.name]:e.target.value})
    }
    const create_nft = (e) => {
      e.preventDefault()

        const options = {
  method: 'POST',
  url: 'https://www.crossmint.com/api/2022-06-09/collections/default-solana/nfts',
  headers: {
    'content-type': 'application/json',
    'x-client-secret': 'sk_live.4t1syawA.dafUFS9GLpRikKIahOLuKgyzP8YJ9NBR',
    'x-project-id': '8d64705f-ec64-46e0-8321-c5a9b55bd42c'
  },
  data: {
    recipient: `email:${data.gmail}:solana`,
    metadata: {
      name: data.name,
      image: data.img,
      description: data.description,
      attributes: [{trait_type: data.key, value: data.value}]
    }
  }
};

console.log(`email:${data.gmail}:solana`)

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

}
    const add_img = async (e) => {

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlwurkglp/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'NFTS-jose';
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  
  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then((e) => {
      if (e.secure_url !== '') {
        const uploadedFileUrl = e.secure_url;
        setData({...data,["img"]:uploadedFileUrl})
        console.log(uploadedFileUrl)
      }
    })
    .catch(err => console.error(err));

    }
 

    return(
    <form className={style.comtainer} onSubmit={(e) => create_nft(e)}>
     <h1>Create a single NFT</h1>
     <h2>Upload files</h2>
     <h3>Upload all files you want to mint</h3>
     <img src={data.img} alt="" />
     <input type="file" onChange={(e) => add_img(e)} required={true}/>
     <div className={style.linea}></div>
     <h2>Token details</h2>
     <p>
        the "Display name" and "Description" will be show in wallets or on marketplaces,
         where the NFT is displayed. This information is also store on the blockchain
         </p>
         <div className={style.input1}>
      <input type="text" placeholder="Name" name="name" onChange={(e)=>set_data(e)} required={true}/>
      <input type="text" placeholder="Description" name="description" onChange={(e)=>set_data(e)} required={true}/>
      <input type="email" placeholder="gmail" name="gmail" onChange={(e)=>set_data(e)} required={true}/>
         </div>
         <label htmlFor="">Propertis</label>
      <div className={style.input2}>
      <input type="text" placeholder="Key" name="key" onChange={(e)=>set_data(e)} required={true}/>:
      <input type="text" placeholder="Value" name="value" onChange={(e)=>set_data(e)} required={true}/>
      </div>
     
      <button >Create NFT</button> 
    </form>
    // <button onClick={() => create_nft()}>Create NFT</button>
    )
}