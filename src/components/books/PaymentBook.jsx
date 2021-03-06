import React, {useEffect, useState} from "react";
import chash from '../images/icons8-receive_euro.svg';
import online from '../images/icons8-check_for_payment.svg';
import axios from "axios";
import {useToasts} from 'react-toast-notifications';
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";
import {apiUrl} from './../http/config.json';
import {toast} from "react-toastify";


const PaymentBook = ({history}) => {

    const {addToast} = useToasts();

    const cost = localStorage.getItem("cost")
    const token = localStorage.getItem("token")
    const hasOnlinePayment = localStorage.getItem("hasOnlinePayment");
    const hasOfflinePayment = localStorage.getItem("hasOfflinePayment");
    const [hasOfflinePaymentSelected, setHasOfflinePaymentSelected] = useState(true);
    if (token === '') {
        history.replace('/')
    }

    // const getBackgroundColor = (id) =>{
    //     if(id === selectedItem) return "#6653A7" 
    //     else return "fff"
    // }

    // const getTextColor = (id) =>{
    //     if(id === selectedItem) return  "fff"
    //     else return "#000"
    // }
    const setPaymentMethod = (id) => {
        // selectedItem = id
        if (id === 1 && document.getElementById("1") != null) {
            if(document.getElementById("1") != null){
            document.getElementById("1").style.backgroundColor = "#6653A7";
            document.getElementById("1").style.color = "#fff";
            }
            if(document.getElementById("2") != null){

            document.getElementById("2").style.backgroundColor = "#fff";
            document.getElementById("2").style.color = "#000";
            }
            localStorage.setItem("payment_method", id);
        
            setHasOfflinePaymentSelected(true);

        } else if (id === 2) {

            if(document.getElementById("1") != null){
            document.getElementById("1").style.backgroundColor = "#fff";
            document.getElementById("1").style.color = "#000";
            }
            if(document.getElementById("2") != null){
                document.getElementById("2").style.backgroundColor = "#6653A7";
                document.getElementById("2").style.color = "#fff";
            }

            localStorage.setItem("payment_method", id);
            setHasOfflinePaymentSelected(false);
        }

    }


    useEffect(() => {

        setPaymentMethod(1)

        if (hasOfflinePaymentSelected === false) {
            setPaymentMethod(2)
        }

        // if(hasOfflinePayment ==='false' && hasOnlinePayment ==='true'){
        //     setPaymentMethod(1)
        // }

        // if(hasOfflinePayment ==='true' && hasOnlinePayment ==='false'){
        //     setPaymentMethod(2)
        // }
    });

    const submitVisitRequest = () => {

        const category = Number(localStorage.getItem("category"));
        const patient_name = localStorage.getItem("patient_name");
        const visit_date = localStorage.getItem("visit_date");
        const visit_time = localStorage.getItem("visit_time");
        const payment_method = Number(localStorage.getItem("payment_method"));
        const token = localStorage.getItem("token");

        let book;
        if (localStorage.getItem("isTimeActive") === 'true') {

            book = {category, patient_name, visit_date, visit_time, payment_method}

        } else {

            book = {category, patient_name, visit_date, payment_method}

        }

        console.log(JSON.stringify(book))

        if (payment_method === 1 || payment_method === 2) {
            axios.post(apiUrl + "books/", JSON.stringify(book), {
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    if (response.data.data.payment_method === 2) {
                        localStorage.setItem("saved_visit", response.data.data.id)


                        const saved_visit = localStorage.getItem("saved_visit")
                        const token = localStorage.getItem("token")
                        localStorage.clear()
                        localStorage.setItem("token", token)
                        localStorage.setItem("saved_visit", saved_visit)
                        history.replace('/payment-result')
                    } else {


                        const saved_visit = localStorage.getItem("saved_visit")
                        const token = localStorage.getItem("token")
                        localStorage.clear()
                        localStorage.setItem("token", token)
                        localStorage.setItem("saved_visit", saved_visit)
                        // window.open(response.data.data.url, '_blank');
                        window.location.href = response.data.data.url;

                        // history.replace('/')
                    }
                    // localStorage.setItem("saved_visit", response.data.data.id)
                    // ;

                } else {
                    console.log(response.status)
                }
            })
                .catch(ex => {
                    if (ex.message === 'Request failed with status code 401') {
                        localStorage.setItem("token", "")
                        localStorage.setItem("is_logged_in", false)
                        history.replace('/')
                    } else if (ex.response) {
                        toast.error(ex.response.data.message.error)
                        console.log(ex.response.data.message.error)
                        // addToast(ex.response.data.message.error, {
                        //     appearance: 'error',
                        //     autoDismiss: true,
                        // })
                    }
                })
        } else {
            addToast('???????? ?????? ???????????? ???? ???????????? ????????????', {
                appearance: 'error',
                autoDismiss: true,
            })
        }

    }

    return (

        <div>
            <div className="IndexHeader d-flex justify-content-between">
                <p className="pt-4 px-4">
                    ????????????
                </p>
                <NavLink to="/book-categories" className="mt-4 mx-3 text-decoration-none text-dark">
                    <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                </NavLink>
            </div>

            <div className="IndexMainLayout">

                <div className="container pt-3">

                    <div className="row">

                        <div className="col-md-6 mx-auto">

                            <p>

                                ????????????

                            </p>

                            <hr/>

                            <div className="row">

                                {hasOnlinePayment === 'true' ? (<div className="col-5 mx-auto shadow pt-4 HomeButtons"
                                //   style={{backgroundColor: getBackgroundColor(1), color: getTextColor(1) }} 
                                  id="1"
                                                          onClick={() => setPaymentMethod(1)}>
                                    <div className="py-4 rounded">
                                        <img className="d-block mx-auto py-3" src={online} alt=""/>
                                    </div>
                                    <p className="text-center mt-3 small">
                                        ???????????? ????????????
                                    </p>
                                </div>) : null}

                                {hasOfflinePayment === 'true' ? (<div className="col-5 mx-auto shadow pt-4 HomeButtons" id="2"
                                                                //   style={{backgroundColor: getBackgroundColor(2), color: getTextColor(2)}}
                                                           onClick={() => setPaymentMethod(2)}>
                                    <div className="py-4 rounded">
                                        <img className="d-block mx-auto py-3" src={chash} alt=""/>
                                    </div>
                                    <p className="text-center mt-3 small">
                                        ???????????? ???? ?????????? ????????????
                                    </p>
                                </div>) : null}
                            </div>

                            {hasOfflinePaymentSelected ? (
                                <div className="d-block text-center mt-4">

                                    <p>

                                        ???????? ?????? ????????????

                                    </p>
                                    <p>
                                        {cost.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        <small className="mx-1">
                                            ??????????
                                        </small>
                                    </p>
                                </div>
                            ) : <div className="d-block text-center mt-4">


                                <p className="small">
                                    ?????? ?????????? ???? ???? ?????????? ???????????? ???????????? ???????????? ??????. ???????? ?????????? ???????? ???????? ???????? ?????? ????
                                    ???????? ????????.
                                </p>
                            </div>}

                            {
                                hasOfflinePaymentSelected ? (
                                    <button className="buttonGreen px-5 mt-5 btn btn-block Inputs"
                                            onClick={submitVisitRequest}>
                                        ????????????
                                    </button>
                                ) : (
                                    <button className="buttonGreen px-5 mt-5 btn btn-block Inputs"
                                            onClick={submitVisitRequest}>
                                        ?????? ??????????
                                    </button>
                                )
                            }


                        </div>

                    </div>

                </div>

            </div>


        </div>

    );


}

export default PaymentBook;
