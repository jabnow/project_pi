import React from "react";
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav style={style.nav}>
            <ul style={style.ul}>
                <li style={style.li}>
                    <Link to="/Home" style={style.link}>Home</Link>
                </li>
                <li style={style.li}>
                    <Link to="/Learn" style={style.link}>Learn</Link>
                </li>
                <li style={style.li}>
                    <Link to="/Plan" style={style.link}>Plan</Link>
                </li>
                <li style={style.li}>
                    <Link to="/User" style={style.link}>User</Link>
                </li>
            </ul>

        </nav>
    )
}

const style = {
    nav: {
        backgroundColor: '#283739',
        padding: '10px',
        alignItems: "center",
    },
    ul: {
        listStyleType: 'none',
        justifyContent: 'space-evenly',
        display: "flex",
        textAlign: "center",
    },
    li: {
        padding: '20px',
    },
    link: {
        textDecoration: "none",
        fontSize: '40px',
        color: '#F5F5F5',
    }

}
export default Navbar;
