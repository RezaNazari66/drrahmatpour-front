import React from "react";
import logo from '../images/logo-dark2.png';
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";
import {ArrowDownSquareFill} from 'react-bootstrap-icons';


const Install = () => {


    return(



        <div>
            <div className="IndexHeader d-flex justify-content-between">
                <p className="pt-4 px-4">
                    نصب اپلیکیشن
                </p>
                <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                    <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                </NavLink>
            </div>

            <div className="IndexMainLayout">

                <img src={logo} className="d-block mx-auto pt-4" alt="logo"/>

                <p className="text-center mt-4">

                    نصب نسخه جدید IOS اپلیکیشن دکتر رحمت پور

                </p>

                <div className="alert alert-success mt-5 mx-2">


                    <ol>

                        <li>
                            در نوار پایین گوشی دکمه

                            را کلیک کنید.
                        </li>
                        <li>
                            منوی باز شده را بالا بکشید و دکمه
                            Add To Home Screen

                            را کلیک کنید.
                        </li>
                        <li>
                            در آخر در بالای صفحه دکمه
                            Add
                            را کلیک کنید.
                        </li>
                    </ol>


                </div>


            </div>


            <p className="text-center fixed-bottom">
                <ArrowDownSquareFill size={50}/>
            </p>

        </div>

    );



}

export default Install;