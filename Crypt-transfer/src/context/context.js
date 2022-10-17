import {useEffect, useState, createContext} from 'react';
import { contractAddress, contractABI} from '../utils/constants'
import {ethers} from  'ethers'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/local/en'
TimeAgo.addLocate(en)

const timeAgo = new TimeAgo('en-US')

export const TransactionContext = createContext();
  

const {ethereum} = window;

// function to connect your smartcontract code to your actual code

const createEthereumContract = () => {
    // choose metamask as your provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    //  get the loged in user
    const signer = provider.getSigner();
    const transationContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    )
}



// children would be the name of the entire app
export const TransactionProvider = ({children}) => {
    
// run everytime the page loads 
useEffect(() => {
    checkIfWalletIsConnected()
    checkIfTransactionsExist()
    
    // whenever there is a new page your app will automatically refresh and show that transaction
}, [])


    // check if the current account is login or not
const [currentAccount, setcurrentAccount] = useState('');
const [addressTo, setaddressTo] = useState('');
const [amount, setamount] = useState(0);
const [message, setmessage] = useState('');
const [isLoading, setisLoading] = useState(false);
const [transactions, setTransactions] = useState([])
// by defult we would pull this from local storage
const [transactionCount, settransactionCount] = useState(
    localStorage.getItem('transactionCount')
);




const checkIfWalletIsConnected = async () => {
  
    try {
        if(!ethereum){
            return alert('Please connect  to your metamask');
        }
        const account = await ethereum.request
        ({method: 'eth_requestAccounts'});
    //  if account exist, set the first account as the main account 
        if(account.length) {
            setcurrentAccount(account[0])
            getAllTransactions()
        } else {
           alert('No accounts found')
        }

    } catch(error){
        alert(error)
    }
}
// get the transactioncount from the smart contract and assign the value to the local storage 


const checkIfTransactionsExist = async () => {
    try {
        // if metamask is installed 
        if(ethereum){
            const transationContract = createEthereumContract(); 

        const currentTransactionCount = await transationContract.getTransactionCount();
        // set the state of each transaction count to the viarble transactionCount
        window.localStorage.setItem('transactionCount' , currentTransactionCount);
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

const sendTransaction = async () => {
    try {
        if(ethereum) {
            const transationContract = createEthereumContract();
            // if the user gave you convert the amount 
            const parsedAmount = ethers.utils.parseEther(amount);
 
            await ethereum.request({
                method: 'eth_sendTransaction',
                params : [{
                    from: currentAccount, 
                    to: addressTo,
                    gas: '0x5208',
                    value:parsedAmount._hex,
                }]
              })
        const transactionHash = await  transationContract.addToBlockchain(
            addressTo,
            parsedAmount,
            message,
        )
        setisLoading(true)
        console.log(`Loading - ${transactionHash.hash}`)
        await transactionHash.wait()
        console.log(`Success - ${transactionHash.hash}`);
        setisLoading(false)

       const transactionsCount = await transationContract.getTransactionCount()

       settransactionCount(transactionsCount.toNumber())
      window.location.reload();
        }
      else{
        console.log('No etherum object')
      }  
    } catch(error){
        console.log(error)
    }
} 

//  this functions alllows your values to be seen by the user
// for the frontend
const getAllTransactions = async () => {
    try{
        if(ethereum){
            const transationContract = createEthereumContract();

            const availableTransactions = await transationContract.getAllTransactions();
          
            const structuredTransactions = availableTransactions.map(transaction => ({ 
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: timeAgo.format(
                    new Date(transaction.timestamp.toNumber() * 1000, 'mini')
                ),
                message: transaction.message,
                //  we are converting from wei to eth for the frontend to show to the user 
                amount: parseInt(transaction.amount._hex) / 10 ** 18 

            }))
      console.log(structuredTransactions)
      setTransactions(structuredTransactions)
        } else{
            alert('No transactions options')
        }
  
    } catch(error){

    }
}



const connectWallet = async () => {
try{
    if(!ethereum){
        return alert('Please install metamask');
    }
    const account = await ethereum.request
    ({method: 'eth_requestAccounts'});

    setcurrentAccount(account[0]);
    window.location.reload();

} catch(error) {
    console.log(error)
    throw new Error('No ethereum object found')
}}

return (
       <TransactionContext.Provider value={{
        connectWallet, 
        currentAccount,
       sendTransaction,
        setaddressTo,
        addressTo,
        setamount,
         amount,
         message,
        setmessage,
        isLoading,  
        transactions,
        getAllTransactions
        }}>
        {children}
       </TransactionContext.Provider>
    )
}


