import React, { useState } from "react";
import DatePicker from "react-datepicker";

import DashboardNavbar from '../Components/dashboardnavbar';

import styles from './History.module.css';
import "react-datepicker/dist/react-datepicker.css";

export default function History() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    //Dummy data
    const clothesData = {
        "2023-11-14": ["Shirt", "Pants", "Shoes"],
        "2023-11-15": ["Shirt", "Shorts", "Sneakers"],
        "2023-11-17": ["Shirt", "Leggings", "Sneakers"],
        "2023-11-19": ["Shirt", "Jacket", "Jeans", "Sneakers"],
    };

    const getFilteredClothes = () => {
        const filteredClothes = {};
        for (const date in clothesData) {
            if (startDate && endDate) {
                if (date >= startDate.toISOString().split('T')[0] && 
                date <= endDate.toISOString().split('T')[0]) {
                    filteredClothes[date] = clothesData[date];
                }
            }
        }
        return filteredClothes;
    };

    const filteredClothes = getFilteredClothes();

    return (
        <div className={styles['history-container']}>
            <DashboardNavbar />  
            <h1 className={styles['history-header']}>My Wardrobe</h1>
            <div className={styles['history-items']}>
                <div className={styles['calendar-items']}>
                    <h1>Current Date Range</h1>
                    <DatePicker className={styles['calendar']} selectsRange={true}
                    startDate={startDate} endDate={endDate}
                    onChange={(update) => { 
                        setDateRange(update);
                    }}
                    withPortal />
                </div>
                <div className={styles['history-clothes']}>
                    <h1>Clothes</h1>
                    <div className={styles['history-clothes-container']}>
                        {Object.keys(filteredClothes).map((date) => (
                            <div className={styles['history-clothes-list']} key={date}>
                                <p>{date}</p>
                                <ul>
                                    {filteredClothes[date].map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
