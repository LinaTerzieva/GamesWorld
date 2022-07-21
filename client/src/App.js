import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <div className="header__logo">
            <img
              className="header__logo-img"
              src="../logo.png"
              alt="logo"
            />
          </div>
          <div className="header__nav-menu">
            <div className="header__nav-dropdown dropdown">
              <a className="header__nav-menu-links link" href="">
                Store
              </a>
              {/* <div className="header__nav-dropdown-content dropdown-content">
                <a href="#">Home</a>
                <a href="http://localhost:3000/search.html">All games</a>
              </div> */}
            </div>
            <div className="header__nav-dropdown dropdown">
              <a className="header__nav-menu-links link" href="">
                About
              </a>
              {/* <div className="header__nav-dropdown-content dropdown-content">
                <a href="#">Company</a>
              </div> */}
            </div>
            <div className="header__nav-dropdown dropdown">
              <a className="header__nav-menu-links link" href="">
                Contact us
              </a>
              {/* <div className="header__nav-dropdown-content dropdown-content">
                <a href="http://localhost:3000/contact.html">Contact us</a>
                <a href="#">Help</a>
              </div> */}
            </div>
          </div>
          <div className="header__nav-bar">
            <div className="header__nav-item header__nav-item-cart">
              <label className="header__nav-item-label">
                <a className="header__nav-links link">Cart</a>
                {/* <i className="header__nav-icon fa-solid fa-cart-shopping" /> */}
                <FontAwesomeIcon className="header__nav-icon" icon={faCartShopping} />
              </label>
              <span className="header__nav-cart--count position-absolute top-0 start-100 translate-middle badge rounded-pill">
                0
              </span>
              {/* <div className="cart-content">
                <div className="cart-header heading-small px-4 py-3">
                  Your shopping cart
                </div>
                <div className="cart-item py-3 px-2">
                  <div className="cart-item__name">World of Warcraft</div>
                  <div className="cart-item__price">20.99€</div>
                  <button className="cart-item__remove-button">
                    <i className="fa-solid fa-xmark text-white" />
                  </button>
                </div>
                <div className="cart-item py-3 px-2">
                  <div className="cart-item__name">Heroes of the storm</div>
                  <div className="cart-item__price">15.09€</div>
                  <button className="cart-item__remove-button">
                    <i className="fa-solid fa-xmark text-white" />
                  </button>
                </div>
                <div className="cart-total pt-3 pb-2 px-2">
                  <div className="cart-total__price">36.08€</div>
                  <div className="cart-total__title">Total</div>
                </div>
                <div className="cart-checkout py-3 px-2">
                  <a href="" className="cart-checkout__btn link">
                    Go To Checkout
                  </a>
                </div>
              </div> */}
            </div>
            <div className="header__nav-item">
              <a className="header__nav-links link" href="">
                Log in
              </a>
              {/* <i className="header__nav-icon fa-solid fa-user" /> */}
              <FontAwesomeIcon className="header__nav-icon" icon={faUser} />
            </div>
          </div>
          <span className="hamburger-menu">
            <i />
            <i />
            <i />
          </span>
          {/* <div className="mobile-menu">
            <div className="mobile-menu__item">
              <a className="mobile-menu__links" href="">
                <i className="mobile-menu__icon fa-solid fa-user" />
                Log in
              </a>
            </div>
            <div className="mobile-menu__item">
              <a className="mobile-menu__links" href="">
                <i className="mobile-menu__icon fa-solid fa-cart-shopping" />
                Cart
              </a>
            </div>
            <div className="mobile-menu__item">
              <a
                className="mobile-menu__links"
                href="http://localhost:3000/search.html"
              >
                Store
              </a>
            </div>
            <div className="mobile-menu__item">
              <a className="mobile-menu__links" href="">
                About
              </a>
            </div>
            <div className="mobile-menu__item">
              <a
                className="mobile-menu__links"
                href="http://localhost:3000/contact.html"
              >
                Contact us
              </a>
            </div>
          </div> */}
        </div>

      </header>
    </div>
  );
}

export default App;
