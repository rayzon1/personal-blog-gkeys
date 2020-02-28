import React, { createRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import NavigationList from '../components/NavigationList';
import BlogPreview from '../components/BlogPreview';
import ResourceList from '../components/ResourceList';

export default function Home() {
    const checkBoxRef = createRef();
    const listRef = createRef();
    const [isChecked, setIsChecked] = useState(false);

    //TODO: Create useState true/false to open or close nav

    

    return (
        <div className="home">
            <div className="home__section--1">
                <Navigation setIsChecked={setIsChecked}/>
                {
                    isChecked && <NavigationList/>
                }
            </div>
            <div className="home__section--2">
                <Header />
                <div style={{ display: 'flex'}}>
                    <BlogPreview />
                    <ResourceList />
                </div>
            </div>
        </div>
    )
}