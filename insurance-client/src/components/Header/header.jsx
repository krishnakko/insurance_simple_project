import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './header.scss';


function Header(props) {
    let location = useLocation();
    const [activeHeader, setActiveHeader] = useState("policies");
    useEffect(() => {
        if (location.pathname.includes("report")) {
            setActiveHeader("reports")
        }

    }, [location.pathname])

    return (
        <div className="appHeader">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <div className="navLeft">
                    <a className="navbar-brand" href="/" style={{ color: 'darkgreen', fontWeight: 'bold' }}>Insurance Client</a>
                </div>
                <div className="navRight">
                    <ul className="navbar-nav">
                        <li ><a className={`${activeHeader === "policies" && "active"}`} href="/">Policies</a></li>
                        <li ><a className={`${activeHeader === "reports" && "active"}`} href="/policy/report">Reports</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}
export default Header;
