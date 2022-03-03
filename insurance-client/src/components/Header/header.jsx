import React from 'react';
import './header.scss';

function Header(props) {

    return (
        <div className="appHeader">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Insurance Client</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    </ul>
                </div> */}
            </nav>
        </div>
    )

}
export default Header;
