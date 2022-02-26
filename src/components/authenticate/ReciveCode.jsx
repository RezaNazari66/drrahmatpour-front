import React, {useState, useRef} from 'react';
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";
import {useToasts} from "react-toast-notifications";
import {apiUrl} from './../http/config.json';
import {toast} from "react-toastify";
import Loading from "../loading/Loading";


const ReciveCode = ({history}) => {
    const {addToast} = useToasts();
    const [code, setCode] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [, forceUpdate] = useState();
    const token = localStorage.getItem("token");
    const mobile_number = localStorage.getItem("mobile_number");
    const [resend, setResend] = useState(false);
    const [seconds, setSeconds] = React.useState(59);
    const [minutes, setMinutes] = React.useState(1);


    React.useEffect(() => {
        if (seconds > 0 && minutes !== 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else if (seconds === 0 && minutes > 0) {
            setSeconds(59);
            setMinutes(0);
        } else if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setResend(true)
        }
    });

    if (token === null || token === '') {
        console.log('token none')
    } else {
        history.replace('/index');
    }

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "وارد کردن کد الزامی می باشد",
            min: "کد وارد شده صحیح نمی باشد",
            max: "کد وارد شده صحیح نمی باشد"
        },
        element: message => <small className="TextGray mt-2 small"> {message} </small>
    }));


    const handleSubmit = event => {
        // event.preventDefault();
        const re_code = localStorage.getItem("code");
        const mobile_number = localStorage.getItem("mobile_number");
        const otp_token = localStorage.getItem("otp_token")
        const login = {code, mobile_number, otp_token};
        console.log('submitted')
        if (validator.current.allValid()) {
            setIsActive(true);
            axios.post(apiUrl + 'login/', JSON.stringify(login))
                .then(response => {

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("is_logged_in", true);
                    setIsActive(false);
                    history.replace("/index");

                }).catch(ex => {
                toast.error('کد وارد شده صحیح نمی باشد')
                setIsActive(false)
            })
        } else {

            setIsActive(false);
            validator.current.showMessages("code");
            forceUpdate(1)
        }


    }


    const resend_code = () => {
        const mobile_number = localStorage.getItem("mobile_number");
        const mobile_number_org = {mobile_number}
        console.log(JSON.stringify(mobile_number_org))
        toast.success('کد مجددا ارسال گردید')
        axios.post(apiUrl + 'send-code/', JSON.stringify(mobile_number_org))
            .then(response => {
                console.log(response)
                localStorage.setItem("code", response.data.code);
                localStorage.setItem("otp_token", response.data.otp_token);
                localStorage.setItem("mobile_number", mobile_number);
                setResend(false);
                addToast('کد مجددا ارسال گردید', {
                    appearance: 'success',
                    autoDismiss: true,
                })
                forceUpdate(1);
                setSeconds(59);
                setMinutes(1);
                setResend(false)

            })
            .catch(ex => {
                //     addToast(ex.response.data.message.error, {
                //     appearance: 'error',
                //     autoDismiss: true,
                // })
            })

    }


    if (isActive === true) {
        return (
            <Loading/>
        );
    } else {
        return (

            <div>

                <header className="LoginHeader fixed-top">
                </header>
                <div className="container text-center">

                    <div className="LoginMargin">
                        <h3 className="mt-5" style={{fontFamily: 'vazir'}}>
                            دکتر رحمت پور
                        </h3>
                        <p className="text-dark mt-5">
                            کد به شماره
                            {mobile_number}
                            پیامک شد
                        </p>
                        <hr/>
                        <p className="text-mute small">کد دریافتی را وارد نمایید</p>
                        <div className="row">
                            <div className="col-11 col-md-6 mx-auto">
                                <form className="form" onSubmit={handleSubmit}>
                                    <input className="Font-16 form-control py-4 Inputs" type="number"
                                           placeholder="کد دریافتی"
                                           value={code}
                                           name="code"
                                           onChange={e => {
                                               setCode(e.target.value);
                                               validator.current.showMessageFor("code");
                                           }}
                                    />
                                    {validator.current.message("code", code, "required|min:4|max:4")}
                                    <br/>
                                    <p className="text-right small mx-5">
                                        <div className="text-center">
                                            <br/>
                                            {resend ? (
                                                <p onClick={resend_code}
                                                   style={resend ? {color: "black"} : {color: "gray"}}>
                                                    ارسال مجدد کد
                                                </p>
                                            ) : (
                                                <p>
                                                    {minutes}
                                                    :
                                                    {seconds}
                                                </p>
                                            )}
                                        </div>
                                    </p>
                                    <button className="btn buttonGreen Inputs px-5 py-2" onClick={() => {
                                        handleSubmit()
                                    }}>
                                        ورود
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <header className="ResiveHeaderBottom fixed-bottom">
                </header>

            </div>

        );
    }
}

export default ReciveCode;