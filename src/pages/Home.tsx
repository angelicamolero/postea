import Header from "../components/Header/Header";
// import ProductForm from "../components/Product/ProductForm";
// import ProductList from "../components/Product/ProductList";
import PostList from "../components/Posts/PostList";
import styles from './Home.module.scss'

const Home = () => {
    
    return ( 
        <div className={styles.home}>
            <Header/>
            <PostList/>
            {/* <ProductForm/>
            <ProductList/> */}
        </div>
     )
}
 
export default Home;