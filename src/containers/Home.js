import React, { createRef, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import NavigationList from '../components/NavigationList';
import BlogPreview from '../components/BlogPreview';
import ResourceList from '../components/ResourceList';

export default function Home() {
    const checkBoxRef = createRef();
    const listRef = createRef();

    //TODO: Create useState true/false to open or close nav

    useEffect(() => {
        const showMenu = () => {
            if (checkBoxRef.current.checked) {
                // listRef.current.style.opacity = 1;
                // return listRef.current.style.display = " ";
                console.log(checkBoxRef.current.checked); 
            } else if (!checkBoxRef.current.checked) {
                listRef.current.style.opacity = 0;
                listRef.current.style.visibility = "hidden";
                console.log(checkBoxRef.current.checked);
            }
            // console.log(checkBoxRef.current.checked);
        }
        showMenu();
    }, [checkBoxRef, listRef])
    

    return (
        <div className="home">
            <div className="home__section--1">
                <Navigation checkBoxRef={checkBoxRef}/>
                <NavigationList listRef={listRef}/>
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