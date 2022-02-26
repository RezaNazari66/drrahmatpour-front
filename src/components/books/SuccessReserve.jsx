import React, {useEffect, useState} from "react";
import {ArrowRepeat, Calendar2Week, CreditCard, PersonBadgeFill} from "react-bootstrap-icons";
import axios from "axios";
import moment from "jalali-moment";
import {NavLink} from "react-router-dom";
import {apiUrl} from './../http/config.json';
import {toast} from "react-toastify";
import Loading from "../loading/Loading";


const SuccessReserve = ({history, match}) => {


    const authResult = new URLSearchParams(window.location.search);
    const code = authResult.get('code')
    console.log(code)
    // if (match.params.id) {
    //     const {id} = match.params
    // }
    // console.log(id)
    const [newVisit, setNewVisit] = useState({});
    const [data, setData] = useState(false);
    const token = localStorage.getItem('token');
    const [visitDateFa, setVisitDateFa] = useState('');
    const [paid, setPaid] = useState(false);
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {

        if (code !== null) {


            if (code === "0") {

                setIsActive(false)

            } else {

                setIsActive(true)
                axios.get(apiUrl + "book/" + code, {
                    headers: {
                        'Authorization': 'Token ' + token,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.data.data)
                    setNewVisit(response.data.data);
                    setVisitDateFa(moment(response.data.data.visit_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
                    setData(true);
                    // setData(true);
                    console.log(visitDateFa);
                    setPaid(true);
                    setIsActive(false)
                })
                    .catch(ex => {
                        if (ex.message === 'Request failed with status code 401') {
                            localStorage.setItem("token", "")
                            localStorage.setItem("is_logged_in", false)
                            history.replace('/')
                        } else {

                        }
                    })


            }


        } else {
            setIsActive(true)
            axios.get(apiUrl + "book/" + localStorage.getItem("saved_visit"), {
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response.data.data)
                setNewVisit(response.data.data);
                setVisitDateFa(moment(response.data.data.visit_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
                setData(true);
                // setData(true);
                console.log(visitDateFa);
                setPaid(true)
                setIsActive(false)
            })
                .catch(ex => {
                    if (ex.message === 'Request failed with status code 401') {
                        localStorage.setItem("token", "")
                        localStorage.setItem("is_logged_in", false)
                        history.replace('/')
                    } else {

                    }
                })

        }


    }, [])


    // console.log(newVisit)

    if (isActive === true) {

        return (
            <Loading/>
        );

    } else {
        return (
            <div>
                <div className="IndexHeader">
                    <p className="pt-4 px-4">

                        رسید تعیین نوبت

                    </p>
                </div>

                {
                    paid ? (
                        <div className="IndexMainLayout">

                            <div className="container pt-3">

                                <div className="row">

                                    <div className="col-md-6 mx-auto">

                                        <div className="alert alert-success mt-2 py-5 text-center text-light">

                                            دریافت نوبت شما با موفقیت انجام شد.

                                        </div>

                                        <div className="shadow rounded mt-2">

                                            <div className="p-3">

                                                <p className="small d-flex">
                                                    <Calendar2Week classNa
                                                                   me="mx-1"/>
                                                    تاریخ مراجعه :
                                                    {visitDateFa}
                                                    {
                                                        localStorage.getItem("isTimeActive") === 'true' ? (
                                                            <div className="d-flex">
                                                                -
                                                                ساعت
                                                                <div>
                                                                    {localStorage.getItem('visit_time')}
                                                                </div>
                                                                -
                                                                {parseInt(localStorage.getItem('visit_time')) + 1}
                                                            </div>
                                                        ) : null
                                                    }
                                                </p>

                                                <p className="small">
                                                    <PersonBadgeFill className="mx-1"/>
                                                    بیمار :
                                                    {newVisit.patient_name}

                                                </p>

                                                <p className="small">
                                                    <CreditCard className="mx-1"/>
                                                    وضعیت پرداخت :
                                                    {newVisit.payment_method_title}
                                                </p>

                                                <p className="small">
                                                    <ArrowRepeat className="mx-1"/>
                                                    وضعیت :
                                                    {newVisit.status_title}
                                                </p>

                                            </div>

                                        </div>

                                        <NavLink to="/index"
                                                 className="buttonGreen px-5 mt-3 btn btn-block Inputs mb-5">
                                            بازگشت
                                        </NavLink>


                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="IndexMainLayout">

                            <p className="h5 text-center text-danger pt-5">
                                پرداخت انجام نشد
                            </p>

                            <p style={{marginTop: '10em'}} className="text-center">

                                لطفا مجددا تلاش نمایید

                            </p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-info" onClick={() => {
                                    history.push('index')
                                }}>

                                    بازگشت به صفخه اصلی

                                </button>

                            </div>

                        </div>
                    )
                }

            </div>


        );
    }

}
export default SuccessReserve;