import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BlogPreview from '../components/BlogPreview';

export default function Home() {


    return (
        <div className="home">
            <div className="home__section--1">
                <Navigation />
            </div>
            <div className="home__section--2">
                <Header />
                <BlogPreview />
            </div>
        </div>
    )
}