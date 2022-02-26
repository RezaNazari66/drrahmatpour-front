import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import {apiUrl} from './../http/config.json';
import mapboxgl from 'mapbox-gl';
import Loading from "../loading/Loading";
import Mapir from "mapir-react-component";
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";


const ClinicInfo = ({history}) => {


    const [clinicInfo, setClinicInfo] = useState([]);
    const token = localStorage.getItem("token");
    const [isActive, setIsActive] = useState(true)


    if (token === '') {
        history.replace('/')
    }

    if (clinicInfo.length === 0) {

        axios.get(apiUrl + "clinic-info/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                console.log(response.data.data);
                setClinicInfo(response.data.data);
                setIsActive(false)
                // mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pcmFzYWRpMTMiLCJhIjoiY2t3bnkwaGJ5MTBjdTJ1bG5uZjZzOWpkbyJ9.HHm8_nq6_i6Ayf9kSYUZxw';

                // const map = new mapboxgl.Map({
                //     container: 'map',
                //     center: [53.07054, 36.56132],
                //     zoom: 15,
                //     style: 'mapbox://styles/mapbox/streets-v11'
                // });
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })

    }


    const Map = Mapir.setToken({
        hash: true,
        logoPosition: "top-left",
        maxZoom: [16],
        transformRequest: (url) => {
            return {
                url: url,
                headers: {
                    'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4ZDNlZjIyMzAxMzQ3YzhiMTljMDMxNWY4ZDYwNzQzODUxZDM4YTQ1ZmM1YjJhMzE3NGNiNzVhZWNiNDhhM2M3NGYxMWQ3MTIwNDcwNTdjIn0.eyJhdWQiOiIxNjM2OSIsImp0aSI6ImM4ZDNlZjIyMzAxMzQ3YzhiMTljMDMxNWY4ZDYwNzQzODUxZDM4YTQ1ZmM1YjJhMzE3NGNiNzVhZWNiNDhhM2M3NGYxMWQ3MTIwNDcwNTdjIiwiaWF0IjoxNjM5NzQxMDE4LCJuYmYiOjE2Mzk3NDEwMTgsImV4cCI6MTY0MjI0NjYxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.c3hrt9aKTt7zrhV-tVsyqQFLmBjpUj-zVTgeMvVpNDbe1JFGZHcvw3wBQysdB8ohzupWk4B3j8KHSrLzc5kZ8MoUW8si77Wyem0EngvPXQngSUhhoMlBEKoQ_m09YTvU29jz4oKPaF_3uKJQHgnik-ua3ZXeeKxAib_kt7hbJUAfO2FVjt6iKA23FMEKWgGzCHQtdYWdEQO03bSzBkHPf_wTqfrWNuWsLF8WaHAhKFNMLITH17Q45fTGlAZt7SLEYSsm4rmVotDs2pwIaHs7T7O6AbzTdROqgUnbUIm-iFMi_bgXzCMFzYmU1q6C5W83jAi_xCJIiay6MAswQC-n9w', //Mapir access token
                    'Mapir-SDK': 'reactjs'
                }
            }

        }
    });


    if (isActive === true) {
        return (
            <Loading/>
        );
    } else {
        return (
            <div>
                <div className="IndexHeader d-flex justify-content-between">
                    <p className="pt-4 px-4">
                        اطلاعات کلینیک
                    </p>
                    <NavLink to="/index" className="mt-4 mx-3 text-decoration-none text-dark">
                        <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                    </NavLink>
                </div>

                <div className="IndexMainLayout">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-7 mx-auto">

                                <p className="pt-3">

                                    <i class="fas fa-search-location"></i>

                                    آدرس کلینیک

                                </p>
                                <p className="TextGray">

                                    {clinicInfo.address}

                                </p>

                                <div id="map" className="mapBox mx-auto">
                                    {/*<GoogleMapReact*/}
                                    {/*bootstrapURLKeys={{ key: 'AIzaSyDBm7LcS6Hu0uhXOo8NwamklQnrPUV2eBc'}}*/}
                                    {/*defaultCenter={defaultProps.center}*/}
                                    {/*defaultZoom={defaultProps.zoom}*/}
                                    {/*>*/}
                                    {/*</GoogleMapReact>*/}
                                    <Mapir
                                        className={'w-100 h-100'}
                                        Map={Map}
                                           zoom={[15]}>
                                        <Mapir.Layer
                                            type="symbol"
                                            layout={{"icon-image": "harbor-15"}}>
                                        </Mapir.Layer>
                                        <Mapir.Marker
                                            coordinates={[53.07054, 36.56132]}
                                            anchor="bottom">
                                        </Mapir.Marker>
                                    </Mapir>
                                </div>
                                <div className="mt-5 mx-5">
                                    <a href={'tel:' + clinicInfo.phone}
                                       className="ClinicCall px-5 py-3 text-light mt-5 d-block text-center text-decoration-none">
                                        تماس با کلینیک
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        );

    }

}

export default ClinicInfo;