import React, {useEffect, useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {ArrowLeftShort} from "react-bootstrap-icons";
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import {apiUrl} from "../http/config.json";

const EducationItemInfo = () => {

    const history = useHistory();
    const location = useLocation();
    const _edu = location.state.education
    const [education, setEducation] = useState([]);


    useEffect(() => {

        if (education.length === 0) {
            axios.get(apiUrl + "blog/post/" + _edu.id, {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log(response.data.data)
                    setEducation(response.data.data.post);
                    // setIsActive(false);
                    // setState(1)
                    // history.replace('/index')
                })
                .catch(ex => {
                    if (ex.message === 'Request failed with status code 401') {
                        localStorage.setItem("token", "")
                        localStorage.setItem("is_logged_in", false)
                        history.replace('/')
                    }
                })

        }

    });

    console.log(_edu)

    return (
        <div>
            <div className="IndexHeader d-flex justify-content-between">
                <p className="pt-4 px-4">
                    آموزش ها
                </p>
                <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                    <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                </NavLink>
            </div>

            <div className="IndexMainLayout">


                <div className="d-flex justify-content-center">
                    <img alt={_edu.title} src={_edu.image_url} style={{width: '90%', borderRadius: '10px'}}
                         className="mx-auto my-3"/>
                </div>

                <p className="mx-4">

                    {ReactHtmlParser(_edu.title)}

                </p>

                <p className="mx-4">

                    {ReactHtmlParser(education.body)}

                </p>


            </div>

        </div>
    );
};

export default EducationItemInfo;