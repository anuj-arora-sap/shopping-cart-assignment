import { useState } from 'react';
import Link from 'next/link'

import Logo from '../../organisms/Logo';
import Cart from '../../organisms/Cart';
import './header.scss';

function Header({ handleClickCart, isCartVisible }) {

    return (
        <div className="Header-Container">
            <Logo />
            <Cart handleCartClick={handleClickCart} />
            <div className="Links-Wrapper">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/plp">
                    <a className="Product-Link">Products</a>
                </Link>
            </div>
            <div className="Register-Wrapper">
                <Link href="/login">
                    <a>SignIn</a>
                </Link>
                <Link href="/signup">
                    <a className="Register-Link">Register</a>
                </Link>
            </div>
            {/* {isCartVisible && } */}
        </div>
    )
}

export default Header;