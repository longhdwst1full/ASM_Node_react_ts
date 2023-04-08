import React from "react";
import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
export default function Header() {
  return (
    <header>
      <>
        {/* <header className="header-top-strip py-3">
          <div className="container m-auto">
            <div className="flex justify-between">
              <p className="text-white py-2  mb-0">
                Free Shipping Over $100 & Free Returns
              </p>

              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </header> */}
        {/* <header className="header-upper py-3">
          <div className="container m-auto">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-2">
                <h2>
                  <Link to="/" className="text-white pl-10">
                    Digitic
                  </Link>
                </h2>
              </div>
              <div className="col-span-5">
                <div className="grid grid-cols-12 ">
                  <input
                    type="text"
                    className="col-span-7  shrink py-2"
                    placeholder="Search Product Here..."
                    aria-label="Search Product Here..."
                    aria-describedby="basic-addon2"
                  />
                  <span
                    className="col-span-1 input-group-text p-3"
                    id="basic-addon2"
                  >
                    <BsSearch className="text-sm" />
                  </span>
                </div>
              </div>
              <div className="col-span-5">
                <div className="header-upper-links flex items-center justify-between">
                  <div>
                    <Link
                      to="/compare-product"
                      className="flex items-center gap-10 text-white"
                    >
                      <svg
                        width="35px"
                        height="35px"
                        fill="#ffffff"
                        viewBox="0 0 100 100"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                       
                        <defs />
                        <g
                          id="4.-To-refresh"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <g
                            transform="translate(0.000000, 8.000000)"
                            stroke="#ffffff"
                            strokeWidth={4}
                          >
                            <path
                              d="M89,40 C89,17.90861 71.09139,0 49,0 C34.1239759,0 21.1446258,8.12062657 14.2530697,20.1707596"
                              id="Layer-1"
                            />
                            <polyline
                              id="Layer-2"
                              transform="translate(89.000000, 37.000000) scale(1, -1) rotate(11.000000) translate(-89.000000, -37.000000) "
                              points="79 42 89 32 99 42"
                            />
                            <path
                              d="M91,84 C91,61.90861 73.09139,44 51,44 C36.1239759,44 23.1446258,52.1206266 16.2530697,64.1707596"
                              id="Layer-3"
                              transform="translate(51.000000, 64.000000) scale(-1, -1) translate(-51.000000, -64.000000) "
                            />
                            <polyline
                              id="Layer-4"
                              transform="translate(11.000000, 47.000000) scale(-1, 1) rotate(11.000000) translate(-11.000000, -47.000000) "
                              points="1 52 11 42 21 52"
                            />
                          </g>
                        </g>
                      </svg>

                      <p className="mb-0">
                        Compare <br /> Products
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/wishlist"
                      className="flex items-center gap-10 text-white"
                    >
                      <svg
                        id="Capa_1"
                        width="36px"
                        height="36px"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                      >
                        <g id="Layer_46" data-name="Layer 46">
                          <path
                            d="M56.73,10.82a16.36,16.36,0,0,0-23,0L32,12.51l-1.7-1.69a16.36,16.36,0,0,0-23,0,16.28,16.28,0,0,0,0,23L30.94,
       57.52a1.51,1.51,0,0,0,2.12,0L56.73,33.85A16.36,16.36,0,0,0,56.73,10.82ZM54.61,31.73,32,54.33,9.39,31.73a13.21,
       13.21,0,0,1-3.89-9.4A13.35,13.35,0,0,1,18.79,9.05a13.16,13.16,0,0,1,9.39,3.89l2.76,2.75a1.49,1.49,0,0,0,2.12,0l2.76-2.75A13.29,13.29,0,0,1,54.61,31.73Z"
                          />
                        </g>
                      </svg>

                      <p className="mb-0">
                        Favourite <br /> wishlist
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/login"
                      className="flex items-center gap-10 text-white"
                    >
                      <svg
                        id="Capa_1"
                        height="33px"
                        width="33px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title />
                        <g id="about">
                          <path
                            d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"
                            id="id_101"
                            style={{ fill: "rgb(255, 255, 255)" }}
                          />
                          <path
                            d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"
                            id="id_102"
                            style={{ fill: "rgb(255, 255, 255)" }}
                          ></path>
                        </g>
                      </svg>

                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/cart"
                      className="flex items-center gap-10 text-white"
                    >
                      <img src={cart} alt="cart" />
                      <div className="flex flex-col gap-10">
                        <span className="badge bg-white text-black">0</span>
                        <p className="mb-0">$ 500</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header> */}
        {/* <header className="header-bottom py-3">
          <div className="container-xxl">
            <div className="grid grid-cols-12">
              <div className="col-span-full">
                <div className="menu-bottom flex items-center gap-30">
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={menu} alt="" />
                        <span className="me-5 d-inline-block">
                          Shop Categories
                        </span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="menu-links">
                    <div className="flex items-center gap-15">
                      <NavLink to="/">Home</NavLink>
                      <NavLink to="/product">Our Store</NavLink>
                      <NavLink to="/blogs">Blogs</NavLink>
                      <NavLink to="/contact">Contact</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header> */}
      </>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              HDL
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Register
            </Link>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <Nav />
          </div>
        </div>
      </nav>
    </header>
  );
}
