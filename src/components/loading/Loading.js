import React from 'react';
import Lottie from "react-lottie";
import animationData from "../../lotties/lottie_loading.json";

const Loading = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <div style={{position:'relative'}} className={"d-flex justify-content-center"}>
                <div className="d-block" style={{margin:'0', position:'absolute' , top:'45vh'}}>
                    <Lottie
                        options={defaultOptions}
                        height={75}
                        width={100}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;