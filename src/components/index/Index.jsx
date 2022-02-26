import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import {Button, Modal} from "react-bootstrap";

const Index = ({history}) => {

    const token = localStorage.getItem("token")



    if (token === ''){
        history.replace('/')
    }

    return(

        <div>
            <div className="IndexHeader">
                <p className="pt-4 px-4">
                    دکتر رحمت پور
                </p>
            </div>

            <div className="IndexMainLayout">



                <Switch>

                    <Route path="/index" component={Home}/>

                </Switch>

            </div>


        </div>

    );


}

export default Index;
