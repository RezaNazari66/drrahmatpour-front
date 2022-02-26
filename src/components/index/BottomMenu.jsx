import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {HouseDoor, Person, Calendar2Week, GeoAlt} from 'react-bootstrap-icons';
import {useHistory} from "react-router";
import logo from "../images/logo-dark2.png";


const BottomMenu = () => {
    const [value, setValue] = React.useState('index');
    const is_logged_in = localStorage.getItem("is_logged_in");

    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 'index':
                history.push('/index');
                break;
            case 'profile':
                history.push('/my-profile');
                break;
            case 'my-books':
                history.push('/my-books');
                break;
            default:
                history.push('/clinic-info');
                break;
        }
    };

    return (
        <div className="d-block d-md-none">
            <BottomNavigation value={value} onChange={handleChange} className={ is_logged_in ? "fixed-bottom py-4" : "d-none" }>
                <BottomNavigationAction value="index" icon={<HouseDoor size={28}/>}/>
                <BottomNavigationAction value="profile" icon={<Person size={28}/>}/>
                <BottomNavigationAction value="my-books" icon={<Calendar2Week size={28}/>}/>
                <BottomNavigationAction value="clinic-info" icon={<GeoAlt size={28}/>}/>
            </BottomNavigation>
        </div>
    );
}

export default BottomMenu;