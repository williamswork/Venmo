import styles from './styles/App.module.css';
import Navbar from './components/Navbar';
import TrasactionForm from './components/transaction/TransactionForm'
import ActivityCard from './components/activity/ActivityCard';

function App() {
  return (
    <div className={styles.wrapper}>
     <header>
<Navbar/>
      </header>
<main className={styles.mainContainer}>
  <div className={styles.activityContainer}> <ActivityCard/> </div>
  <div className={styles.sidebarContainer}> 
  <TrasactionForm/>
  </div>
</main>

    </div>
  );
}

export default App;
