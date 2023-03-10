import fetch from "node-fetch"
import axios from 'axios';
import { useState } from "react";
import style from "./NFT.module.css"
import Swal from 'sweetalert2'


export default function NFT() {
    const NFTS = { name: "", description: "", img: "", key: "", value: "", gmail: "" }
  const [data, setData] = useState(NFTS)
  const set_data = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
          attributes: [{ trait_type: data.key, value: data.value }]
        }
      }
    };

    console.log(data)

    axios
      .request(options)
      .then(function (response) {
        console.log(response)
        Swal.fire({
          icon: 'success',
          text: 'Your NFT was successfully created'
        })
          setData(NFTS)
      })
      .catch(function (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something wrong happened, please try again'
        })
      });

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
          setData({ ...data, ["img"]: uploadedFileUrl })
          console.log(uploadedFileUrl)
        }
      })
      .catch(err => console.error(err));

  }


  return (
    <form className={style.comtainer} onSubmit={(e) => create_nft(e)}>
      <h1>Create a single NFT</h1>
      <h2>Upload files</h2>
      <h3>Upload all files you want to mint</h3>

      <div className={style.img}>
        <img src={data.img} alt="" className={style.img1} />
        {data.img === ""
          ? <div>
            <img src="https://res.cloudinary.com/dlwurkglp/image/upload/v1673785967/image_hbiegp.png" alt="" className={style.img_add} />
            <p>Click below to browse</p>
            <div className={style.file_select} id={style.src_file1} onChange={(e) => add_img(e)} required={true} >
              <input type="file" name="src-file1" aria-label="Archivo" />
            </div>
          </div>
          : <button onClick={() => setData({ ...data, ["img"]: "" })}>X</button>}
      </div>

      <div className={style.linea}></div>
      <h2>Token details</h2>
      <p>
        the "Display name" and "Description" will be show in wallets or on marketplaces,
        where the NFT is displayed. This information is also store on the blockchain.
        The email where you want the NFT to be sent and some property of it
      </p>
      <div className={style.input1}>
        <input type="text" placeholder="Name" name="name" onChange={(e) => set_data(e)} required={true} value={data.name}/>
        <input type="text" placeholder="Description" name="description" onChange={(e) => set_data(e)} required={true} value={data.description} />
        <input type="email" placeholder="gmail" name="gmail" onChange={(e) => set_data(e)} required={true} value={data.gmail}/>
      </div>
      <label htmlFor="">Property</label>
      <div className={style.input2}>
        <input type="text" placeholder="Key" name="key" onChange={(e) => set_data(e)} required={true} value={data.key}/>:
        <input type="text" placeholder="Value" name="value" onChange={(e) => set_data(e)} required={true} value={data.value}/>
      </div>

      <button className={style.crear} disabled={data.img === "" ? true : false}>Create NFT</button>
      
    </form>
  )
}