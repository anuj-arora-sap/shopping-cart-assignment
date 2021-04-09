import { useState } from 'react';
import Link from 'next/link'

import Logo from '../Logo';
import Cart from '../Cart';
import './header.scss';

function Header({handleClickCart, isCartVisible}) {
   
    return (
        <div className="Header-Container">
            <Logo />
            <Cart handleCartClick={handleClickCart}/>
            <div className="Links-Wrapper">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/plp">
                    <a className="Product-Link">Products</a>
                </Link>
            </div>
            <div className="Register-Wrapper">
                <a>SignIn</a>
                <a className="Register-Link">Register</a>
            </div>
            {/* {isCartVisible && } */}
        </div>
    )
}

export default Header;