import React from 'react';

export default function NavigationList({ listRef }) {
    
    return (
        <div className="navigation__list" ref={listRef}>
            <ul className="navigation__list__ul">
                <li className="navigation__list__ul--item-1">ONE</li>
                <li className="navigation__list__ul--item-2">TWO</li>
                <li className="navigation__list__ul--item-3">THREE</li>
                <li className="navigation__list__ul--item-4">FOUR</li>
            </ul>
        </div>
    )
}