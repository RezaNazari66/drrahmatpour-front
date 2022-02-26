import React, {useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import {apiUrl} from './../http/config.json';
import {toast} from "react-toastify";
import {ArrowLeftShort} from "react-bootstrap-icons";


const Profile = ({history}) => {

    const token = localStorage.getItem("token")
    const [profile, setProfile] = useState([]);
    const [fullName, setFullName] = useState('');


    const changeProfile = () => {

        const user_info = {'fullName': fullName}
        console.log(JSON.stringify(user_info))
        axios.put(apiUrl + "profile/", user_info, {
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            }
        }).then(re => {
            toast.success('اطلاعات با موفقیت ثبت گردید', {position: 'top-center'})
            console.log(re);
            setProfile(re.data);
            localStorage.setItem('fullName', fullName)
            setProfile(localStorage.getItem('mobile_number'));
            // setFullName('');
        })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "");
                    localStorage.setItem("is_logged_in", false);
                    history.replace('/');
                }
            })

    }


    if (profile.length === 0) {
        axios.get(apiUrl + "dashboard/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            setFullName(re.data.data.profile.fullName)
            console.log(re.data)
        }).catch(ex => {
        })

        // axios.get(apiUrl + "profile/", {
        //     headers: {
        //         'Authorization': 'Token ' + token
        //     }
        // }).then(re => {
        //     console.log(re);
        //     // setFullName(re.data.data.username);
        //
        // })
        //     .catch(ex => {
        //         if (ex.message === 'Request failed with status code 401') {
        //             localStorage.setItem("token", "");
        //             localStorage.setItem("is_logged_in", false);
        //             history.replace('/');
        //         }
        //     })
        setFullName(localStorage.getItem('fullName'))
        setProfile(localStorage.getItem('mobile_number'));
    }


    const logout = () => {

        axios.get(apiUrl + "logout/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            localStorage.setItem("token", "");
            localStorage.setItem("is_logged_in", false);
            history.replace('/');
        })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "");
                    localStorage.setItem("is_logged_in", false);
                    history.replace('/');
                }
            })


    }

    if (token === '') {
        history.replace('/')
    }


    const [isIphone, setIsIphone] = useState(false);
    if (window.navigator.platform === 'iPhone' && isIphone === false) {

        setIsIphone(true);

    }

    return (
        <div>
            <div className="IndexHeader d-flex justify-content-between">
                <p className="pt-4 px-4">
                    اطلاعات کاربری
                </p>
                <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                    <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                </NavLink>
            </div>

            <div className="IndexMainLayout">

                <div className="container">
                    <div className="row">
                        <div className="col-11 col-md-10 mx-auto">
                            <p className="mt-4 mx-3">
                                <i className="fa fa-user-circle mr-3" aria-hidden="true"></i>
                                اطلاعات کاربری
                            </p>
                            <hr className="mt-3"/>
                            <form className="form row">
                                <input className="col-11 Inputs form-control py-4 mt-4 mx-auto" type="text"
                                       placeholder="نام و نام خانوادگی" value={fullName}
                                       onChange={e => setFullName(e.target.value)}/>
                                <input className="col-11 Inputs form-control py-4 mt-4 mx-auto" type="number"
                                       placeholder="شماره موبایل" value={profile} disabled/>
                                <br/>
                                <p onClick={changeProfile}
                                   className="btn buttonGreen px-5 Inputs col-11 col-md-3 mx-auto mt-4">
                                    ویرایش
                                </p>
                                <br/>
                                <p onClick={logout}
                                   className="btn btn-secondary px-5 Inputs col-11 col-md-4 mx-auto mt-4">
                                    خروج از اکانت
                                </p>
                                {isIphone ?
                                    <NavLink className="btn btn-danger px-5 Inputs col-11 col-md-4 mx-auto mt-4"
                                             to="/install">
                                        نصب اپلیکیشن
                                    </NavLink>
                                    :
                                    null}

                            </form>
                        </div>
                    </div>
                </div>


            </div>


        </div>


    );
}

export default Profile;
