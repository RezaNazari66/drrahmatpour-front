//InstallPWA.js
import React, {useEffect, useState} from "react";
// import Modal from "react-bootstrap";
// import { useModal } from "../Hooks/useModal";

import "./PWA.css";
import image from "../../images/LogoMark.png";
import share from "../../images/AppleShare.png";

export const InstallPWA = ({...props}) => {
    const [modalOpen, setModalOpen, toggleModal] = useState(false);

    useEffect(
        () => {
            setModalOpen(true)
        }, []
    )
    return (
        <div className="modal notification-card">
            <div className="uk-container uk-container-small uk-flex uk-flex-middle uk-flex-center uk-height-1-1">
                <div style={{maxWidth: "400px"}} className="uk-card uk-card-default uk-card-body">
                    <div style={{marginTop: "-50px"}} className="uk-text-center">
                        <img
                            src={image}
                            className="uk-border-rounded"
                            height="72"
                            width="72"
                            alt="Install PWA"
                        />
                    </div>
                    <div className="uk-margin-top uk-text-center">
                        <h3>Install Bevyho!</h3>
                    </div>
                    <p className="uk-h4 uk-text-muted uk-text-center uk-margin-remove-top">Install this application on
                        your homescreen for a better experience.</p>
                    <div className="uk-text-center">
                        <p className="uk-text-small">
                            Tap
                            <img
                                src={share}
                                style={{margin: "auto 4px 8px"}}
                                className="uk-display-inline-block"
                                alt="Add to homescreen"
                                height="20"
                                width="20"
                            />
                            then &quot;Add to Home Screen&quot;
                        </p>
                    </div>
                    <button className="uk-button button-minimal" onClick={() => setModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}