import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import BookCategoriesItems from './BookCategoriesItems';
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";
import {apiUrl} from './../http/config.json';
import Loading from "../loading/Loading";



const BookCategories = ({history}) => {

    const [ bookCategoriess, setBookCategoriess ] = useState([])
    const [isActive, setIsActive] = useState(true)
    const token = localStorage.getItem("token");
    const visit_time = localStorage.getItem("visit_time");
    const visit_date = localStorage.getItem("visit_date");

    if (visit_date !== null && visit_time){
        localStorage.setItem("visit_time",'')
        localStorage.setItem("visit_date",'')
        localStorage.setItem("patient_name",'')
    }

    if (token === ''){
        history.replace('/')
    }

    if(bookCategoriess.length === 0){
        axios.get(apiUrl + "book/categories", {
            headers:{
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            console.log(re.data.data);
            setBookCategoriess(re.data.data.categories);
            setIsActive(false)
        })
        .catch(ex => {
            if (ex.message === 'Request failed with status code 401'){
                localStorage.setItem("token","")
                localStorage.setItem("is_logged_in", false)
                history.replace('/')
            }
        })
    }

    console.log(bookCategoriess)

    if (isActive === true){
        return(
            <Loading/>
        );
    }else {

        return (

            <div>
                <div className="IndexHeader d-flex justify-content-between">
                    <p className="pt-4 px-4">
                        نوبت گیری
                    </p>
                    <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                        <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                    </NavLink>
                </div>

                <div className="IndexMainLayout">

                    <p className="py-3 px-3 TextGray"> لطفا دلیل مراجعه به کلینیک را انتخاب نمایید </p>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            {bookCategoriess.map(item => <BookCategoriesItems
                                image_url={item.image_url}
                                title={item.title}
                                key={item.id}
                                id={item.id}
                                calendarType={item.calendarType}
                                hasOfflinePayment={item.hasOfflinePayment}
                                hasOnlinePayment={item.hasOnlinePayment}
                                cost={item.cost}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default BookCategories;