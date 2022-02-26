import React from 'react';
import {NavLink} from 'react-router-dom';


const BookCategoriesItems = ({ image_url , title, id, calendarType, hasOfflinePayment,hasOnlinePayment, cost}) => {

    const setCategory = (category, categoryName) => {

        localStorage.setItem("category", category);
        localStorage.setItem("calendarType", calendarType);
        localStorage.setItem("categoryName", categoryName);
        localStorage.setItem("hasOnlinePayment", hasOnlinePayment);
        localStorage.setItem("hasOfflinePayment",hasOfflinePayment);
        localStorage.setItem("cost", cost);

    }

    return(

        <NavLink to="/new-book" className="text-dark text-decoration-none">
        <div className="mx-1 my-3" onClick={() => setCategory(id, title)}>
            <img src={image_url} className="BookCategoriesImage" alt=""/>
            <p className="text-center mt-2">
                {title}
            </p>
        </div>
        </NavLink>
    );


}

export default BookCategoriesItems;