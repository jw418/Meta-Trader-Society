import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";


const App = () => {
  const [web3,setWeb3] = useState()
  const [accounts, setAccouts] = useState()
  const [networkId,setNetwordId] = useState()
  const [contact,setContract] = useState()


  useEffect(() => {
    loadData()
  })

  const loadData = async() => {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId();

    setWeb3(web3)
    setAccouts(accounts)
    setNetwordId(networkId)
  }

  return(
    <div>
      <h1>Meta Trader Society</h1>
    </div>
  )
}

export default App;
