import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { abi } from "../constants/abi";
import { ethers } from "ethers";

const injected = new InjectedConnector();

export default function Home() {
  const { activate, active, library: provider } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (e) {
      console.log(e);
    }
  }

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(7531);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      {active ? (
        <>
          "connected" <button onClick={() => execute()}>execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>connect</button>
      )}
    </div>
  );
}
