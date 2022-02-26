import React, {useEffect, useRef} from "react";
import axios from "axios";
import {
    PersonBoundingBox,
    Calendar2Week,
    Clock,
    ArrowLeftShort,
    ArrowRightShort,
    ChevronCompactLeft, ChevronCompactRight, ChevronRight, ChevronLeft
} from 'react-bootstrap-icons';
import {useState} from "react";
import moment from "jalali-moment";
import SimpleReactValidator from "simple-react-validator";
import {useToasts} from "react-toast-notifications";
import {NavLink} from "react-router-dom";
import {apiUrl} from './../http/config.json';
import Loading from "../loading/Loading";

const NewBook = ({history}) => {

    const {addToast} = useToasts();

    const [days, setDays] = useState([]);
    const [activeHours, setActiveHours] = useState([])
    const [monthFaName, setMonthFaName] = useState("");
    const [, forceUpdate] = useState();
    const [isActive, setIsActive] = useState(true)
    const now_date = new Date();
    const fa_date = moment(now_date, 'YYYY/MM/DD').locale('fa').format('MM');
    const fa_year = moment(now_date, 'YYYY/MM/DD').locale('fa').format('YYYY');
    const [year, setYear] = useState(fa_year);
    const [thisMonth, setThisMonth] = useState(fa_date);
    const token = localStorage.getItem("token");
    const categoryName = localStorage.getItem("categoryName");
    const [patient_name, set_patient_name] = useState(localStorage.getItem("fullName"));
    const [isPrevMonthActive, setIsPrevMonthActive] = useState();
    const [isTimeActive, setIsTimeActive] = useState(false);

    localStorage.setItem("payment_method", '');

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "وارد کردن نام و نام خانوادگی الزامی می باشد",
            min: "نام وارد شده صحیح نمی باشد"
        },
        element: message => <small className="text-danger mt-2 small"> {message} </small>
    }));

    useEffect(() => {
        if (localStorage.getItem("visit_date")) {
            // focusOnDay(localStorage.getItem("visit_date"))
        }
    }, [])

    const lastMonth = () => {
        if (thisMonth <= fa_date) {
            console.log('this month is less than now ')
        } else {
            setIsActive(true)
            const now = Number(thisMonth);
            if (now === 1) {
                const n = 12
                const y = Number(year) - 1;
                setThisMonth(n);
                setYear(y);
                setDays([]);
                console.log(thisMonth);
                console.log(year);
            } else {
                const n = now - 1
                setThisMonth(n);
                setDays([]);
                console.log(thisMonth);
            }
        }

    }

    const nextMonth = () => {
        setIsActive(true)
        const now_m = Number(thisMonth);
        if (now_m === 12) {
            const n = 1
            const y = Number(year) + 1;
            setThisMonth(n);
            setYear(y);
            setDays([]);
            console.log(thisMonth);
            console.log(year);
        } else {
            const n = now_m + 1
            setThisMonth(n);
            setDays([]);
            console.log(thisMonth);
        }
    }

    if (days.length === 0) {
        // setThisMonth(fa_date);
        axios.get(apiUrl + "active-book-days?month=" + thisMonth + "&year=" + year + "&category_id=" + localStorage.getItem("category"),
            {
                headers: {
                    'Authorization': 'Token ' + token
                }
            })
            .then(response => {
                setIsTimeActive(response.data.data.isTimeActive);
                console.warn(response.data.data)
                setDays(response.data.data.days);
                setIsActive(false);
                setIsPrevMonthActive(response.data.data.isPrevMonthActive);
                setMonthFaName(response.data.data.monthFaName);
                setYear(response.data.data.year);
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })
    }

    const changeBackground = (date) => {

        for (let i = 0; i < days.length; i++) {

            const day = days[i]
            document.getElementById(day.date).style.backgroundColor = "";
            document.getElementById(day.date).style.color = "black";

        }
        document.getElementById(date).style.backgroundColor = "#6653A7";
        document.getElementById(date).style.color = "white";
        localStorage.setItem("visit_date", date);
        axios.get(apiUrl + "active-book-times?date=" + date, {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {

                console.log(response.data.data)
                setActiveHours(response.data.data.active_time);
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })

    }

    const focusOnDay = (day) => {
        document.getElementById(day.date).style.backgroundColor = "#6653A7";
        document.getElementById(day.date).style.color = "white";
        document.getElementById(day.date).scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        // setDays(response.data.data.days);
    }

    const focusOnFirstDay = (__days) => {
        __days.map((item) => {

            if (item.isSelected && item.is_active) {

                console.log(item.date)
                document.getElementById(item.date).style.backgroundColor = "#6653A7";
                document.getElementById(item.date).style.color = "white";
                document.getElementById(item.date).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });

                axios.get(apiUrl + "active-book-times?date=" + item.date, {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                })
                    .then(response => {
                        setActiveHours(response.data.data.active_time);
                    })
                    .catch(ex => {
                        if (ex.message === 'Request failed with status code 401') {
                            localStorage.setItem("token", "")
                            localStorage.setItem("is_logged_in", false)
                            history.replace('/')
                        }
                    })

                localStorage.setItem("visit_date", item.date);


            } else {


            }

        })
        // setDays(response.data.data.days);
    }

    const selectTime = (time) => {

        for (let i = 0; i < activeHours.length; i++) {
            const active_time = activeHours[i]
            if (active_time.is_active) {
                document.getElementById(active_time.time).style.backgroundColor = "#eee";
                document.getElementById(active_time.time).style.color = "black";
            }
        }
        localStorage.setItem("visit_time", time);
        document.getElementById(time).style.backgroundColor = "#6653A7";
        document.getElementById(time).style.color = "#fff";

    }

    const submitDate = () => {
        const visit_date = localStorage.getItem("visit_date");
        const visit_time = localStorage.getItem("visit_time");

        if (validator.current.allValid()) {
            if (visit_date && visit_time) {
                if (!isTimeActive) {
                    localStorage.setItem("isTimeActive", false)
                } else {
                    localStorage.setItem("isTimeActive", true)
                }
                localStorage.setItem("patient_name", patient_name)
                history.push('/book-payment')
            } else if (visit_date && isTimeActive === false) {
                if (!isTimeActive) {
                    localStorage.setItem("isTimeActive", false)
                } else {
                    localStorage.setItem("isTimeActive", true)
                }
                localStorage.setItem("patient_name", patient_name)
                history.push('/book-payment')
            } else {
                addToast('لطفا روز و ساعت مراجعه را انتخاب نمایید', {
                    appearance: 'info',
                    autoDismiss: true,
                })
                console.log('choose a date')
            }
        } else {
            validator.current.showMessages("patient_name");
            forceUpdate(1)
        }
    }

    const getTodayDay = () => {


        setDays([]);
        setIsActive(true);
        axios.get(apiUrl + 'active-book-days?get_current_month=1' + "&category_id=" + localStorage.getItem("category"), {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {


                setIsTimeActive(response.data.data.isTimeActive);
                setThisMonth(fa_date);
                setYear(fa_year);
                setIsActive(false);
                setDays(response.data.data.days);
                setMonthFaName(response.data.data.monthFaName);
                setYear(response.data.data.year);
                focusOnFirstDay(response.data.data.days);
                console.log(response.data.data.days);

            })
            .catch((ex) => {
                console.log(ex)
            })

    }

    const getFirstNullDay = () => {

        setDays([]);
        setIsActive(true);
        axios.get(apiUrl + 'first-bookable-days' + "?category_id=" + localStorage.getItem("category"), {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then((response) => {


                setIsTimeActive(response.data.data.isTimeActive);
                setThisMonth(fa_date);
                setYear(fa_year);
                setIsActive(false);
                setDays(response.data.data.days);
                setMonthFaName(response.data.data.monthFaName);
                focusOnFirstDay(response.data.data.days);
                console.log(response.data.data.days);

            })
            .catch((ex) => {
                console.log(ex)
            })


    }


    if (isActive === true) {
        return (
            <Loading/>
        );
    } else {

        return (
            <div>
                <div className="IndexHeader d-flex justify-content-between">
                    <h6 className="pt-4 px-4" style={{fontFamily: 'vazir'}}>
                        نوبت گیری

                    </h6>
                    <NavLink to="/book-categories" className="mt-4 mx-3 text-decoration-none text-dark">
                        <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                    </NavLink>
                </div>

                <div className="IndexMainLayout">

                    <div className="container pt-4">

                        <div className="row">

                            <div className="col-md-12 mx-auto">

                                <p>
                                    <PersonBoundingBox className="mx-1"/>
                                    اطلاعات بیمار
                                </p>
                                <hr/>

                                <form className="form">

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">نام و نام خانوادگی بیمار</label>
                                        <input className="py-3 form-control"
                                               style={{borderRadius: "1em"}}
                                               type="text"
                                               name="patient_name"
                                               value={patient_name}
                                               placeholder="نام و نام خانوادگی"
                                               onChange={e => {
                                                   validator.current.showMessageFor("patient_name");
                                                   set_patient_name(e.target.value);
                                               }
                                               }
                                        />
                                        {validator.current.message("patient_name", patient_name, "required|min:5")}
                                    </div>

                                </form>

                                <p className="small TextGray">

                                    دلیل مراجعه :
                                    {categoryName}

                                </p>

                                <p>
                                    <Calendar2Week className="mx-2"/>
                                    تاریخ مراجعه
                                </p>
                                <hr/>

                                <p className="h5 text-center mt-2">
                                    <div className="d-flex justify-content-between">
                                        {isPrevMonthActive ? (
                                            <h6>
                                                <ChevronRight onClick={lastMonth} size={28}/>
                                            </h6>
                                        ) : (
                                            <h6 className="TextGray">
                                                <ChevronRight onClick={lastMonth} size={28}/>
                                            </h6>
                                        )}
                                        <h6 className="text-purple mt-2">
                                            {monthFaName}
                                            -
                                            {year}
                                        </h6>
                                        <h6>
                                            <ChevronLeft onClick={nextMonth} size={28}/>
                                        </h6>
                                    </div>
                                </p>

                                <div className="scrolling-wrapper pb-3">

                                    {days.map(item =>
                                        <div id={item.date} key={item.id} className="card2 mx-2"
                                             style={{backgroundColor: "#eee", borderRadius: '15px'}}>
                                            {item.is_active ? (
                                                <div className="text-center dayItem py-1"
                                                     onClick={() => changeBackground(item.date)}>
                                                    <p className='mt-2'>
                                                        {item.faDay}
                                                    </p>
                                                    <p>
                                                        {item.weekDay}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="text-center dayItem py-1"
                                                     style={{backgroundColor: "#eee", color: 'lightgray'}}>
                                                    <p className='mt-2'>
                                                        {item.faDay}
                                                    </p>
                                                    <p>
                                                        {item.weekDay}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>

                                <div className="d-flex justify-content-center mt-3 pb-4">

                                    <button className="mx-2 px-3 py-2 todayBtn" onClick={() => {

                                        getTodayDay();

                                    }}>
                                        امروز
                                    </button>


                                    <button className="mx-2 px-3 py-2 nullDayBtn" onClick={() => {
                                        getFirstNullDay();
                                    }}>
                                        اولین روز خالی
                                    </button>

                                </div>


                                {isTimeActive ? (
                                    <div>
                                        {activeHours.length > 0 ? (
                                            <div>
                                                <p className="mt-3">

                                                    <Clock className="mx-1"/>
                                                    ساعت مراجعه
                                                    <hr/>
                                                </p>


                                                <div className="scrolling-wrapper">

                                                    {activeHours.map(item =>
                                                        <div id={item.time}
                                                             onClick={() => item.is_active ? selectTime(item.time) : null}
                                                             className="card pt-2 px-3 text-center ml-2 w-25 my-2"
                                                             style={item.is_active ? {
                                                                 backgroundColor: "#eee",
                                                                 borderRadius: '15px',
                                                                 color: 'black',
                                                                 border: 'none'
                                                             } : {
                                                                 backgroundColor: "#eee",
                                                                 borderRadius: '15px',
                                                                 color: 'lightgray',
                                                                 border: 'none'
                                                             }}>
                                                            <p>
                                                                ساعت
                                                                <br/>
                                                                {item.time + 1}
                                                                -
                                                                {item.time}
                                                            </p>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        ) : null}

                                    </div>
                                ) : null}


                                <p className="buttonGreen px-5 mt-3 btn btn-block Inputs mb-5" onClick={submitDate}>
                                    بعدی
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }


}

export default NewBook;