import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import {useToasts} from "react-toast-notifications";
import {apiUrl} from './../http/config.json';
import Lottie from 'react-lottie';
import animationData from './../../lotties/lottie_loading.json';
import Loading from "../loading/Loading";
import {Button, Modal} from "react-bootstrap";
import darkLogo from "../images/logo-dark2.png";

const SendCode = ({history}) => {

    const {addToast} = useToasts();
    const [mobile_number, setMobileNumber] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [, forceUpdate] = useState();
    const token = localStorage.getItem("token");
    const [isIphone, setIsIphone] = useState(false);

    if (window.navigator.platform === 'iPhone' && isIphone === false) {
        setIsIphone(true);
        // if (localStorage.getItem("IsIphone") === null || localStorage.getItem("IsIphone") === false || !localStorage.getItem("IsIphone")) {
        //     setIsIphone(true);
        // }

    } else if (window.navigator.platform === 'iPad' && isIphone === false) {
        setIsIphone(true);

        // if (localStorage.getItem("IsIphone") === null || localStorage.getItem("IsIphone") === false || !localStorage.getItem("IsIphone")) {
        //     setIsIphone(true);
        // }

    }

    const install = () => {

        localStorage.setItem("IsIphone", true);
        history.push('/install');

    }

    const [show, setShow] = useState(true);
    const handleClose = () => {
        localStorage.setItem("IsIphone", true);
        setShow(true);
    };

    const handleShow = () => {
        localStorage.setItem("IsIphone", true);
        setShow(false)
    };


    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "وارد کردن شماره تماس الزامی می باشد",
            min: "شماره وارد شده صحیح نمی باشد"
        },
        element: message => <small className="TextGray mt-2 small"> {message} </small>
    }));

    if (token === null || token === '') {
        console.log('hello')
    } else {
        history.replace('/index');
    }

    const handleSubmit = event => {
        event.preventDefault();
        const mobile_number_org = {mobile_number};
        if (validator.current.allValid()) {
            setIsActive(true);
            axios.post(apiUrl + 'send-code/', JSON.stringify(mobile_number_org))
                .then(response => {
                    console.log(response.data)
                    localStorage.setItem("code", response.data.code);
                    localStorage.setItem("otp_token", response.data.otp_token);
                    localStorage.setItem("mobile_number", mobile_number);
                    setIsActive(false);
                    history.push("/recive-code");
                })
                .catch(ex => {
                    console.log(ex)
                    setIsActive(false);
                    // addToast(ex.response.data.message.error, {
                    //     appearance: 'error',
                    //     autoDismiss: true,
                    // })
                })
        } else {
            setIsActive(false);
            validator.current.showMessages("phone");
            forceUpdate(1)
        }
    }


    if (isActive === true) {
        return (
            <Loading/>
        );
    } else {
        return (

            <div>

                {isIphone && !window.navigator.standalone && !window.clientInformation.standalone? (
                     history.push('/install')
        // <Modal show={show} onHide={handleClose} animation={true} centered>
        //                 <Modal.Body>
        //                     <p className="text-center">
        //                         <img src={darkLogo} alt="logo"/>
        //                         نصب نسخه ios
        //                     </p>
        //                 </Modal.Body>
        //                 <Modal.Footer>
        //                     <Button className="Inputs px-3" variant="secondary" onClick={handleShow}>
        //                         بعدا
        //                     </Button>

        //                     <Button className="Inputs btn-danger px-3" variant="primary" onClick={install}>
        //                         نصب
        //                     </Button>
        //                 </Modal.Footer>
        //             </Modal>
                ) : null}


                <div className="HeaderGrayBackground">
                    <header className="LoginHeader fixed-top">
                    </header>
                </div>


                <div className="container text-center mt-5">
                    <div className="LoginMargin">
                        <h3 className="Title mt-5" style={{fontFamily: 'vazir'}}>
                            دکتر رحمت پور
                        </h3>
                        <p className="text-mute mt-3">برای ورود شماره موبایل خود را وارد کنید</p>
                        <div className="row">
                            <div className="col-11 col-md-6 mx-auto">
                                <form className="form" onSubmit={handleSubmit}>
                                    <input className="Font-16 form-control py-4 Inputs" type="number"
                                           placeholder="شماره موبایل"
                                           name="phone"
                                           id={'phoneInput'}
                                           value={mobile_number}
                                           onFocus={() => {
                                               document.getElementById('footer').style.display = 'invisible';
                                           }}
                                           onChange={e => {
                                               setMobileNumber(e.target.value);
                                               validator.current.showMessageFor("phone");
                                           }}/>
                                    {validator.current.message("phone", mobile_number, "required|min:11|max:11|phone")}
                                    <br/>
                                    <button className="btn Inputs px-5 py-2 buttonGreen" onClick={handleSubmit}>
                                        ورود / ثبت نام
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <header id={'footer'} className="LoginHeaderBottom fixed-bottom" style={{zIndex: '-100'}}>
                </header>

            </div>
        );
    }

}

export default withRouter(SendCode);