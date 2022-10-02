
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const Home= () => {
  const [wallet ,setwalletaddress] = useState('')
  const [collection ,setcollectionaddress] = useState('')
  const [NFTS ,setnfts] = useState([])
  const [isFetchforcollection ,setfetchforcollection] = useState(false)

const fetchNfts =  async() =>{

let nfts;
console.log("fetching nfts")
// Replace with your Alchemy API key:
const apiKey = "";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
//
if(!collection.length){
  // Setup request options:
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


// Replace with the wallet address you want to query:
// const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
const fetchURL = `${baseURL}?owner=${wallet}`;
nfts= await fetch(fetchURL , requestOptions).then(data => data.json())
}
else {
console.log("fetching nfts for collection owned by the address" )
const fetchURL = `${baseURL}?owner=${wallet}&contractAddress%5B%5D=${collection}`
nfts= await fetch(fetchURL , requestOptions).then(data => data.json())
}
if(nfts){
  console.log(nfts)
  setnfts(nfts.ownedNfts)
}


}
const fetchNftsForcollection = async () => {
  if(collection.length){
    var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
  const apiKey = "G7dMgOjXxpPwAYYkgQ7_TxZD9JNs18PI";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
const nfts= await fetch(fetchURL , requestOptions).then(data => data.json())
if(nfts){
  console.log("NFTS COLLECTION" , nfts)
}



}
}
  


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
  <div>
   <input onChange={(e)=>{setwalletaddress(e.target.value)}} value = {wallet} type="text" placeholder='add your wallet'/>
   <input onChange = {(e)=>{setcollectionaddress(e.target.value)}} value = {collection} type="text" placeholder='add collection address'/>
<label ><input onChange={(e)=>{setfetchforcollection(e.target.checked)}}   type="checkbox" />fetchforCollection</label>
<button onClick={
  ()=> {
    if(isFetchforcollection){
      fetchNftsForcollection()
    }
    else{fetchNfts()}
  }
}>LetsGO</button>
  </div>
    </div>
  )
}

export default Home
