import Footer from '../components/Footer';
import '../styles/globals.css';
import '../styles/main.css';
import styles from '../styles/Home.module.css';
import { BASE_URL } from '../utils/constants';
import { useAppStore } from '../store/store';
import { useEffect } from 'react';
import axios from "axios";


function MyApp({ Component, pageProps }) {
    const { setItems, items = [] } = useAppStore();

    useEffect(() => {
      if (!items?.length) setItems(pageProps.data);
    }, [pageProps.data, setItems, items]);
    
    return (
        <div className={styles.container}> 
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

MyApp.getInitialProps = async ({ Component }) => {
    const pageProps = Component.getInitialProps;
  
    const { data } = await axios.get(`${BASE_URL}/api/movies`);
  
    return { pageProps: { ...pageProps, data } };
  };
  
  export default MyApp;
