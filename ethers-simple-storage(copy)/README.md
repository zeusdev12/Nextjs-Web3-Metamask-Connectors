Created a new project with nodeJS.
Used node keyword to run Javascript in our local development environment
Added dependencies of external packages into our local package (package.json) using yarn
Created a scripts section in package.json so we can minimise long commmands that we need to run, into single keyword("compile").
"compile": "yarn solcjs --bin --abi --include-path nmode_modules/ --base-path . -o . SimpleStorage.sol"
Basic setup of javaScript scripts:
Imported the packages at the top, added main executor function at the bottom and wrote the main function in the middle.
Used async keyword for our functon tio use asyncronous programming and get access to the await keyword, which waits for the promise to finish.
Created options to choose to connect to any blockachian. Connected the provider to a wallet and private key.
Used ethers package tool to interact with blockahain in JavaScript.
Encrypted private keys so they are not lying around in the code in plain text. Ran scripts from encrypted keys.
Got abi and binary of the code to deploy to the blockahchain and interact with the contract programitically.
Added a default editor in Settings.json amd overrode it in .prettierrc, to autoformat the code.
Deployed the contract to a test net and manually verified the sourcecode in Etherscan.
