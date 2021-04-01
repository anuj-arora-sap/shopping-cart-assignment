import Logo from '../Logo';
import Cart from '../Cart';
import './header.scss';

function Header(){
    return(
        <div className="Header-Container">
            <Logo/>
            <Cart/>
            <div className="Links-Wrapper">
                <a>Home</a>
                <a className="Product-Link">Products</a>
            </div>
            <div className="Register-Wrapper">
                <a>SignIn</a>
                <a className="Register-Link">Register</a>
            </div>
        </div>
    )
}

export default Header;