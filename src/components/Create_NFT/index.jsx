import fetch from "node-fetch"
import axios from 'axios';
import { useState } from "react";
import style from "./NFT.module.css"


export default function NFT () {

  const [data, setData] = useState({name:"",description:"" ,img:"",key:"",value:"",gmail:""})
    const set_data = (e) => {
       setData({...data,[e.target.name]:e.target.value})
    }
    const create_nft = () => {
       
        const options = {
          method: 'POST',
          url: 'https://staging.crossmint.com/api/2022-06-09/collections/default-solana/nfts',
          headers: {
            'content-type': 'application/json',
            'x-client-secret': 'sk_live.yhv0fos0.Yk4VvApRdw2JoMEjcZcJti7wu1eUPbI3',
            'x-project-id': '8d64705f-ec64-46e0-8321-c5a9b55bd42c'
          },
          data: {
            recipient: 'email:jose23122009@gmail.com:solana',
            metadata: {
              name: 'My first Mint API NFT',
              image: 'https://www.crossmint.com/assets/crossmint/logo.png',
              description: 'My NFT created via the mint API!',
              attributes: [{trait_type: 'primer nft', value: 'true'}]
            }
          }
        };
        
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });




 // prueba con Fetch

// const url = 'https://staging.crossmint.io/api/2022-06-09/collections/default-solana/nfts';
// const options = {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//     'x-client-secret': 'sk_live.yhv0fos0.Yk4VvApRdw2JoMEjcZcJti7wu1eUPbI3',
//     'x-project-id': '8d64705f-ec64-46e0-8321-c5a9b55bd42c'
//   },
//   body: JSON.stringify({
//     recipient: 'email:jose23122009@gmail.com:solana',
//     metadata: {
//       name: 'Primer NFT jose',
//       image: 'https://www.crossmint.io/assets/crossmint/logo.png',
//       description: 'el mejor',
//       attributes: [{trait_type: 'primero', value: 'true'}]
//     }
//   })
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

    }

    return(
    // <form className={style.comtainer}>
    //  <h1>Create a single NFT</h1>
    //  <h2>Upload files</h2>
    //  <h3>Upload all files you want to mint</h3>
    //  <div className={style.linea}></div>
    //  <h2>Token details</h2>
    //  <p>
    //     the "Display name" and "Description" will be show in wallets or on marketplaces,
    //      where the NFT is displayed. This information is also store on the blockchain
    //      </p>
    //      <div className={style.input1}>
    //   <input type="text" placeholder="Name" name="name" onChange={(e)=>set_data(e)} required={true}/>
    //   <input type="text" placeholder="Description" name="description" onChange={(e)=>set_data(e)} required={true}/>
    //   <input type="email" placeholder="gmail" name="gmail" onChange={(e)=>set_data(e)} required={true}/>
    //      </div>
    //      <label htmlFor="">Propertis</label>
    //   <div className={style.input2}>
    //   <input type="text" placeholder="Key" name="key" onChange={(e)=>set_data(e)} required={true}/>:
    //   <input type="text" placeholder="Value" name="value" onChange={(e)=>set_data(e)} required={true}/>
    //   </div>
    //   <button onClick={() => console.log(data)}>Create NFT</button>
    // </form>
    <button onClick={() => create_nft()}>Create NFT</button>
    )
}