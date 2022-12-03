// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import { Web3Modal } from "web3modal";
// import walletConnectProvider from "@walletconnect/web3-provider";
// import { GOERLI_RPC_URL } from "../.env";

// let web3Modal;
// // Web3Modal needs the list of the providers we wanto to give it
// // It comes default with Metamask, we don't to instruct about Metamask
// const providerOptions = {
//   walletconnect: {
//     package: walletConnectProvider,
//     options: {
//       rpc: {
//         5: process.env.GOERLI_RPC_URL,
//       },
//     },
//   },
// };

// export default function Home() {
//   async function connect() {
//     web3Modal = new Web3Modal({
//       cacheProvider: false,
//       providerOptions,
//     });
//     const web3ModalProvider = await web3Modal.connect();
//     const provider = new ethers.providers.web3Modal(web3ModalProvider);
//   }
//   return <div className={styles.container}></div>;
// }

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  const { data, error, runContractFunction, isFetching, isLoading } =
    useWeb3Contract({
      abi: abi,
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // your contract address here
      functionName: "store",
      params: {
        _favoriteNumber: 42,
      },
    });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  return (
    <div>
      {hasMetamask ? (
        isWeb3Enabled ? (
          "Connected! "
        ) : (
          <button onClick={() => enableWeb3()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isWeb3Enabled ? (
        <button onClick={() => runContractFunction()}>Execute</button>
      ) : (
        ""
      )}
    </div>
  );
}
