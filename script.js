$(document).ready(function() {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use the browser's provider
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set the provider you want to use (Binance Smart Chain)
      const provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
  
      web3 = new Web3(provider);
    }
  
    // Contract address and ABI
    const contractAddress = '0xB4172656E6C8AEFFC45Af7BC30eEaE017BC90201'; // Replace with your contract address
    const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"withdrawer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositsByWithdrawer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"extendLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getDepositsByTokenAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_withdrawer","type":"address"}],"name":"getDepositsByWithdrawer","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSelfAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getTokenTotalLockedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"address","name":"_withdrawer","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_unlockTimestamp","type":"uint256"}],"name":"lockTokens","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedToken","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"withdrawer","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lockFee","type":"uint256"}],"name":"setLockFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_marketingAddress","type":"address"}],"name":"setMarketingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"walletTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    // Form submit event listener
    $('#form').submit(async function(event) {
      event.preventDefault();
  
      // Get form values
      const tokenAddress = $('#tokenAddress').val();
      const amount = $('#amount').val();
      const withdrawer = $('#withdrawer').val();
      const unlockDateTime = Math.floor(new Date($('#unlockDateTime').val()).getTime() / 1000);
  
      // Perform token approval and locking
      try {
        // Get the user's address
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
  
        // Approve tokens
        const tokenContract = new web3.eth.Contract(contractABI, tokenAddress);
        await tokenContract.methods.approve(contractAddress, amount).send({ from: userAddress });
  
        // Lock tokens
        await contract.methods.lockTokens(tokenAddress, withdrawer, amount, unlockDateTime).send({ from: userAddress });
  
        // Display success message
        $('#result').html('<p>Tokens have been approved and locked successfully!</p>');
      } catch (error) {
        console.error(error);
        // Display error message
        $('#result').html('<p>An error occurred. Please check the console for details.</p>');
      }
    });
  });
  