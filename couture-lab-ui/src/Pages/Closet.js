import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import DashboardNavbar from '../Components/dashboardnavbar';
import Footer from '../Components/footer';
import ImgCarousel from '../Components/imgcarousel';

import styles from './Closet.module.css';

export default function Closet() {
    return (
        <div className={styles['closet-container']}>
            <DashboardNavbar />
            <div className={styles['clothes-container']}>
                <h1>Virtual Closet</h1>
                <div class="adding-container">
                    <a href="/addclothes">
                        <button className={styles['addclothes-button']}>Add Clothes</button>
                    </a>
                </div>
            </div>
            <Tabs isLazy isFitted variant='enclosed'>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Tops</Tab>
                    <Tab>Bottoms</Tab>
                    <Tab>Shoes</Tab>
                    <Tab>Accessories</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ImgCarousel/>
                    </TabPanel>
                    <TabPanel>
                        <ImgCarousel/>
                    </TabPanel>
                    <TabPanel>
                        <ImgCarousel/>
                    </TabPanel>
                    <TabPanel>
                        <ImgCarousel/>
                    </TabPanel>
                    <TabPanel>
                        <ImgCarousel/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Footer />
        </div>
    )
}