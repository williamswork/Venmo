import styles from "../styles/Navbar.module.css";
import {ChevronDownIcon} from '@heroicons/react/outline'
import { TransactionContext } from "../context/context";
import {useEffect, useState, useContext} from 'react';



const Navbar = () => {
const {connectWallet, currentAccount} = useContext(TransactionContext)

// generate random avaters
const generateRandomAvatar = () => {
  // pick a number beteen 1 and a thousnd
  const randomAvatar = Math.floor(Math.random() * 1000);
  // useing the disperser api
  return `https://avatars.dicebear.com/api/adventurer/${
    randomAvatar + currentAccount
  }.svg`;
};

  return <nav className = {styles.navigationContainer}>
 <div className= {styles.container} > 
 <div className= {styles.logoImage}>
  <img src ={generateRandomAvatar()}   alt='Eth-logog' className={styles.logoImage}/>
         </div>
   
         {currentAccount ? (
          <div className={styles.actionsContainer}>
            <p>
              Whats'up,{" "}
              <span className={styles.accentColor}>
               {`${currentAccount.slice(0,8)}...`}
              </span>
              ! 👋
            </p>

            <ChevronDownIcon className={styles.arrowDownIcon} />
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatarImage}
                src="https://yeeqiang.me/avatar.jpeg"
                alt=""
              />
            </div>
          </div>
        )  : (
        <button className= {styles.connectBtn} onClick={connectWallet}>
          Connect Wallet
        </button>
        )}   
      </div>
  </nav>
}

export default Navbar
