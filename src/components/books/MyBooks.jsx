import React, {useState} from "react";
import axios from "axios";
import MyBooksItems from './MyBooksItems';
import {apiUrl} from './../http/config.json';
import Loading from "../loading/Loading";
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";

const MyBooks = ({history}) => {

    const [myBooks, setMyBooks] = useState([])
    const token = localStorage.getItem("token");
    const [isActive, setIsActive] = useState(true)

    if (token === null) {
        history.replace('/')
    }


    console.log(myBooks)
    if (myBooks.length === 0) {

        axios.get(apiUrl + "books/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                console.log(myBooks);
                setMyBooks(response.data.data.books);
                setIsActive(false);
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })

    }

    if (isActive === true) {

        return (
            <Loading/>
        );

    } else if (myBooks.length === 0) {
        return (

            <div>
                <div className="IndexHeader d-flex justify-content-between">
                    <p className="pt-4 px-4">
                        دکتر رحمت پور
                    </p>
                    <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                        <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                    </NavLink>
                </div>

                <div className="IndexMainLayout">

                    <p style={{height: '100%', width: '100%', textAlign: "center", lineHeight: '75vh'}}>

                        هیچ نوبتی برای شما ثبت نشده است

                    </p>

                </div>


            </div>


        );
    } else if (myBooks.length !== 0) {
        return (

            <div>
                <div className="IndexHeader d-flex justify-content-between">
                    <p className="pt-4 px-4">
                        نوبت های من
                    </p>
                    <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                        <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                    </NavLink>
                </div>

                <div className="IndexMainLayout">

                    {/* <div className="container"> */}

                        {/* <div className="row"> */}

                            <div className="col-md-7 mx-auto">

                                {myBooks.map(book => <MyBooksItems date={book.visit_date}
                                                                   id={book.id}
                                                                   setMyBooks={setMyBooks}
                                                                   setIsActive={setIsActive}
                                                                   status_key={book.status_key}
                                                                   patient_name={book.patient_name}
                                                                   payment_method_title={book.payment_method_title}
                                                                   status_title={book.status_title}/>)}

                            </div>

                        {/* </div> */}

                    {/* </div> */}

                </div>


            </div>

        );

    }
}

export default MyBooks;