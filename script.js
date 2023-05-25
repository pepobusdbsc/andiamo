$(document).ready(function() {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set the QuickNode provider URL
      const providerUrl = "https://delicate-prettiest-arm.bsc.discover.quiknode.pro/afbbe553aaba290fa7701612b198144d23376c8f/";
      const provider = new Web3.providers.HttpProvider(providerUrl);
      web3 = new Web3(provider);
    }
  
    // Contract address and ABI
    const contractAddress = "0xB4172656E6C8AEFFC45Af7BC30eEaE017BC90201"; // Replace with your contract address
    const contractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "Lock",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "withdrawer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Withdraw",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "depositsByWithdrawer",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "depositsCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_duration",
              "type": "uint256"
            }
          ],
          "name": "extendLock",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "name": "getDepositsByTokenAddress",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_withdrawer",
              "type": "address"
            }
          ],
          "name": "getDepositsByWithdrawer",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getSelfAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "name": "getTokenTotalLockedBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lockFee",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_withdrawer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_unlockTimestamp",
              "type": "uint256"
            }
          ],
          "name": "lockTokens",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "lockedToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "withdrawer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unlockTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "withdrawn",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "marketingAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_lockFee",
              "type": "uint256"
            }
          ],
          "name": "setLockFee",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_marketingAddress",
              "type": "address"
            }
          ],
          "name": "setMarketingAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "walletTokenBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "withdrawTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      
    // Contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    // Function to show the form and hide the connect button
    function showForm() {
      $('#connectButton').hide();
      $('#form').show();
    }
  
    // Event listener for the connect button
  $('#connectButton').click(async function() {
    // Check if the user has a web3 provider (e.g., MetaMask) installed
    if (window.ethereum) {
      try {
        // Request account access from the user
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        showForm();
      } catch (error) {
        console.log('User denied account access');
      }
    } else {
      console.log('No web3 provider detected');
    }
  });

  // Event listener for the form submission
  $('#form').submit(async function(event) {
    event.preventDefault();

    // Get form values
    const tokenAddress = $('#tokenAddress').val();
    const amount = $('#amount').val();
    const withdrawer = $('#withdrawer').val();
    const unlockDateTime = $('#unlockDateTime').val();

    // Approve tokens and lock
    approveTokens(tokenAddress, amount, withdrawer, unlockDateTime);
  });

  // Function to approve tokens and lock
  async function approveTokens(tokenAddress, amount, withdrawer, unlockDateTime) {
    // Convert the unlock date and time to UNIX timestamp
    const unlockTimestamp = Math.floor(new Date(unlockDateTime).getTime() / 1000);

    // Call the approve function of the token contract to allow the spender (your contract) to spend the tokens
    const tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);
    const spender = contractAddress;
    const approveAmount = amount;

    try {
      await tokenContract.methods.approve(spender, approveAmount).send({ from: withdrawer });
      console.log('Tokens approved for spending');

      // Lock tokens by calling the contract's lockTokens function
      await contract.methods.lockTokens(tokenAddress, amount, unlockTimestamp).send({ from: withdrawer })
        .on('transactionHash', function(hash) {
          // Transaction sent, show loading indicator or message
          console.log('Transaction sent');
        })
        .on('receipt', function(receipt) {
          // Transaction receipt received, show success message
          console.log('Transaction successful');
          $('#result').text('Tokens locked successfully!');
        })
        .on('error', function(error) {
          // Error occurred during transaction, show error message
          console.error(error);
          $('#result').text('Error locking tokens');
        });
    } catch (error) {
      console.error(error);
      $('#result').text('Error approving tokens');
    }
  }
});