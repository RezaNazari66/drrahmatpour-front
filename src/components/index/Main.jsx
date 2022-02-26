import Index from "./Index";
import BookCategories from "../book-categories/BookCategories";
import ClinicInfo from "./ClinicInfo";
import NewBook from "../books/NewBook";
import MyBooks from "../books/MyBooks";
import PaymentBook from "../books/PaymentBook";
import {Switch, Route, useHistory} from 'react-router-dom';
import BottomMenu from "./BottomMenu";
import React from "react";
import Profile from "../commans/Profile";
import SuccessReserve from "../books/SuccessReserve";
import {Calendar2Week, GeoAlt, HouseDoor, Person, PlusCircle} from 'react-bootstrap-icons';
import EducationItemInfo from "./EducationItemInfo";


const Main = () => {

    const history = useHistory()
    const is_active = localStorage.getItem("is_logged_in")
    let is_show = true

    if (is_active === 'false') {
        is_show = false
    }

    return (
        <div className="d-flex justify-content-around">
            <div style={{width: '15%', backgroundColor: '#6ADC99', height: '100vh', position: 'fixed', top:0, right:0, bottom:0}}
                 className="d-none d-md-block">


                <div className="SideBarHeader">
                    <p className="pt-4 px-4">

                        <h4 className="d-block text-center pt-3 text-light" style={{fontFamily:'vazir'}}>
                            دکتر رحمت پور
                        </h4>

                    </p>
                </div>

                <div className="px-4 pt-5 text-white">

                    <p className="py-4 my-4 sideBarMenuItem" onClick={() => {
                        history.push('index')
                    }}>

                        <HouseDoor className="mx-2" size={'30'}/>

                        صفحه اصلی

                    </p>

                    <p className="py-4 my-4 sideBarMenuItem" onClick={() => {
                        history.push('book-categories')
                    }}>

                        <PlusCircle className="mx-2" size={'30'}/>
                        نوبت جدید

                    </p>

                    <p className="py-4 my-4 sideBarMenuItem" onClick={() => {
                        history.push('my-books')
                    }}>

                        <Calendar2Week className="mx-2" size={'30'}/>
                        نوبت های من

                    </p>

                    <p className="py-4 my-4 sideBarMenuItem" onClick={() => {
                        history.push('my-profile')
                    }}>

                        <Person className="mx-2" size={'30'}/>
                        پروفایل من

                    </p>

                    <p className="py-4 my-4 sideBarMenuItem" onClick={() => {
                        history.push('clinic-info')
                    }}>

                        <GeoAlt className="mx-2" size={'30'}/>
                        اطلاعات کلینیک

                    </p>

                </div>


            </div>
            <div className="mainscreen-w">
                <switch>
                    <Route path="/index" exact component={Index}/>
                    <Route path="/my-profile" component={Profile}/>
                    <Route path="/book-categories" component={BookCategories}/>
                    <Route path="/clinic-info" component={ClinicInfo}/>
                    <Route path="/my-books" component={MyBooks}/>
                    <Route path="/new-book" component={NewBook}/>
                    <Route path="/book-payment" component={PaymentBook}/>
                    <Route path="/education-info" component={EducationItemInfo}/>
                    <Route path="/payment-result" component={SuccessReserve}/>
                </switch>
                {is_show ? (<BottomMenu/>) : null}
            </div>
        </div>
    );
}

export default Main;