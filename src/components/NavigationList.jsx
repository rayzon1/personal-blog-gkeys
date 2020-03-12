import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationList() {
    
    return (
        <div className="navigation__list" >
            <ul className="navigation__list__ul" >
                <Link to="/" className="links">
                    <li className="navigation__list__ul--item-1">HOME</li>
                </Link>
                <li className="navigation__list__ul--item-2">ABOUT</li>
                <li className="navigation__list__ul--item-3">GITHUB</li>
                <Link to="/signin" className="links">
                    <li className="navigation__list__ul--item-4">ADMIN</li>
                </Link>
            </ul>
        </div>
    )
}