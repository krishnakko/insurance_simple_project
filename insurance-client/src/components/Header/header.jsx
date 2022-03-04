import React from 'react';
import './header.scss';


function Header(props) {

    return (
        <div className="appHeader">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <div className="navLeft">
                    <a className="navbar-brand" href="/">Insurance Client</a>
                </div>
                <div className="navRight">
                    <ul className="navbar-nav">
                        <li><a href="/">Policies</a></li>
                        <li><a href="/policy/report">Report</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )

}
export default Header;
