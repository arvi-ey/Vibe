import React, { useEffect, Suspense, lazy } from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import HomeDetailLoader from './HomeDetailLoader'

const HomeDetail = React.lazy(() =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./HomeDetail'));
        }, 1000);
    })
);



const Home = () => {


    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />
            <Suspense fallback={<HomeDetailLoader />}>
                <HomeDetail />
            </Suspense>
        </div>
    )
}

export default Home