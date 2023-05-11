"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { ethers } from "ethers";

/*
connect to metamask
execute the function
 */
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        setSigner(await provider.getSigner());
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    /*
  Need 4 things for execute
  1. address
  2. contract ABI (blueprint to interact with a contract)
  3. function
  4. node connection 
   */
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_favNumber",
              type: "uint256",
            },
          ],
          name: "addPerson",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "nameToFavNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "peopleArr",
          outputs: [
            {
              internalType: "uint256",
              name: "favNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "retrieve",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_favoriteNumber",
              type: "uint256",
            },
          ],
          name: "store",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(12);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className={styles.main}>
      {isConnected ? (
        <>
          "Connected!!!"
          <button onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </main>
  );
}
