// For a professional setup, we encrypt the private key so we can acess the PRIVATE KEY by using a password when we need it
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // set the script up to run the encrypt key one time, then remove the PRIVATE KEY from anywhere
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  ); // encrypt() function returns encrypted JSON key that we can store locally and can be only decrypted with a password
  // takes two paramaters: PRIVATE_KEY_PASSWORD AND PRIVATE_KEY

  console.log(encryptedJsonKey);
  // now that we encrypted the password, we will save it
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
  //saving to new file called encryptedKey.json and passing it the encrypted key we just made
  // then we can delete the PRIVATE_KEY and PASSWORD from the .env file
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
