const ethers = require("ethers")
const fs = require("fs-extra") //for grabbing contract objects(abi and binary of compiled code) via filePath; run"yarn add fs-extra"
require("dotenv").config()
// const can't be modified

async function main() {
    // ethers: is api
    // HTTP://127.0.0.1:7545 local chain
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // specifies the URL we are going to connect to
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    //const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8") // fs.readFileSync will read from encryptedKey.json into encryptedJson variable
    // next we create a wallet from encryptedKey
    //let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //    encryptedJson,
    //    process.env.PRIVATE_KEY_PASSWORD
    //)
    // then we need to connect our wallet to the provider
    // wallet = await wallet.connect(provider)

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    // contractFactory is an objsct used to deploy contracts
    console.log("Deploying . . .")
    const contract = await contractFactory.deploy() // "Stop here. wait for the contract to deploy"
    await contract.deployTransaction.wait(1)
    console.log(`Contract address= ${contract.address}`)

    // wait for certian number of blocks for our contracts to finish with
    //   console.log("Here is the deployment transaction(deployment response): ");
    //   console.log(contract.deployTransaction);
    //   console.log("Here is the deployment receipt");
    //   console.log(transactionReceipt);

    // sending raw transaction in ether.js >> create a tx/ contract by specifing tx detials/data. This provides unlimited flexiblity with the transaction we send
    //   console.log("let's deploy with only tx data");
    //   const nonce = await wallet.getTransactionCount();
    //   const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0, //we are not sending any fund
    //     data: "",
    //     chainId: 1337,
    //   };
    //   // Above are only tx detials, we need to sign the tx and send to the blockchain
    //   //const signedTxResponse = await wallet.signTransaction(tx);
    //   //console.log(signedTxResponse);
    //   const sentTxResponse = await wallet.sendTransaction(tx);
    //   await sentTxResponse.wait(1);
    //   console.log(sentTxResponse);

    const currentFavoriteNumber = await contract.retrieve() // contract function comes with all the functions available in the contract described in the ABI
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`)

    // update the favorite number on the contract by calling the store function
    const transactionResponse = await contract.store("9")
    const transactionReceipt = await transactionResponse.wait(1)
    const updatedFavoriteNumber = await contract.retrieve()
    console.log(
        `New Updated Favorite Number is: ${updatedFavoriteNumber.toString()}`
    )
}

// When we deploy the byte code to the blockchain, and call functions on it, the code allows the functions to be called if they exist
//but in order for our code to know that they exist its much easier to just give the ABI

/*
Now we are going to:
> connect to our Gancahe instance 
> connect a wallet with a private key from Ganache
> grab the ABI and binary  of our contract
> connect to the new contractFactory object which is connected to the wallet, that wallet will deploy the contract
> deploy the contract with "await contractFactory.deploy()"
> we will wait one block for that contract to finish deploying
> we will call the function "contract.retrieve()" which will call our current favorite number
*/

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
