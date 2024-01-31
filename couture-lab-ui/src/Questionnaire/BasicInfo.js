import { Input, Select, Button } from '@chakra-ui/react';

import styles from './BasicInfo.module.css';


export default function BasicInfo() {
    return (
        <div className={styles['basicinfo-container']}>
            <h1>Sign Up</h1>
            <p>Let us know some basic information to get started!</p>
            <section className={styles['inputinfo-container']}>
                <Input className={styles['inputinfo-input']} placeholder='What should we call you?' />
                <Input className={styles['inputinfo-input']} placeholder='Username' />
                <Select className={styles['inputinfo-input']} placeholder='Select gender'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Select>
                <Select className={styles['inputinfo-input']} placeholder='Age Group'>
                    <option value='under18'>Under 18</option>
                    <option value='18to25'>18-25</option>
                    <option value='26to35'>26-35</option>
                    <option value='36to45'>36-45</option>
                    <option value='46to55'>46-55</option>
                    <option value='over55'>55</option>
                </Select>
                <Select className={styles['inputinfo-input']} placeholder='Preferred Style'>
                    <option value='casual'>Casual</option>
                    <option value='formal'>Formal</option>
                    <option value='business'>Business</option>
                    <option value='sporty'>Sporty</option>
                    <option value='bohemian'>Bohemian</option>
                    <option value='vintage'>Vintage</option>
                    <option value='preppy'>Preppy</option>
                    <option value='other'>Other</option>
                </Select>
                <Button className={styles['inputinfo-input']} colorScheme='blue'>Continue</Button>
            </section>
        </div>
    )
}