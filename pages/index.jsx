
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from '../Components/nftcard'

const Home= () => {
  const [wallet ,setwalletaddress] = useState('')
  const [collection ,setcollectionaddress] = useState('')
  const [NFTS ,setnfts] = useState([])
  const [isFetchforcollection ,setfetchforcollection] = useState(false)

const fetchNfts =  async() =>{

let nfts;

console.log("fetching nfts")
// Replace with your Alchemy API key:
const apiKey = "G7dMgOjXxpPwAYYkgQ7_TxZD9JNs18PI";
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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection//`;
const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
const nfts= await fetch(fetchURL , requestOptions).then(data => data.json())
if(nfts){
  console.log("NFTS COLLECTION" , nfts)
  setnfts(nfts.nfts)
}



}
}
  


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8">
  <div className= 'gap-1'>

   <input disabled={isFetchforcollection} className=" mr-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"  onChange={(e)=>{setwalletaddress(e.target.value)}} value = {wallet} type="text" placeholder='Add your wallet'/>
   
   <input  className=" mt-1 mr-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" onChange = {(e)=>{setcollectionaddress(e.target.value)}} value = {collection} type="text" placeholder='add collection address'/>
<label className='mr-4 italic '  ><input  onChange={(e)=>{setfetchforcollection(e.target.checked)}}   type="checkbox" /> fetchCollection </label>
<button className= " mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold  px-6 rounded mr-2 py-2"  onClick={
  ()=> {
    if(isFetchforcollection){
      fetchNftsForcollection()
    }
    else fetchNfts()
  }
}><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
  </div>
  <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>{
    NFTS.length && NFTS.map(nft => {
   
    return (
              <NFTCard nft={nft}></NFTCard>
            )
    })
    
    }</div>
    </div>
  )
}

export default Home
