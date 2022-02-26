import './App.css';
import SendCode from './components/authenticate/SendCode';
import ReciveCode from './components/authenticate/ReciveCode';
import { Switch, Route } from 'react-router-dom';
import React from "react";
import {ToastProvider} from "react-toast-notifications";
import Main from "./components/index/Main";
import Install from "./components/index/Install";
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {

    const is_active = localStorage.getItem("is_logged_in")
    let is_show = true

    if (is_active === 'false'){

        is_show = false

    }
    console.log(is_show)




    return (
        <ToastProvider>


            <div className="rtl mb-5 pb-3">

                    <Switch>
                        <Route path = "/" exact component = { SendCode }/>
                        <Route path = "/recive-code" component = { ReciveCode }/>
                        <Route path= "/install" component={Install}/>
                        <Main/>

                    </Switch>

                </div>


        </ToastProvider>
    );
}
export default App;