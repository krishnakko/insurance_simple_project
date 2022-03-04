import React from 'react';
import './footer.scss';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { Link } from '@material-ui/core';

export default function Footer() {
    let date = new Date()
    let currentYear = date.getFullYear();
    return (
        <div className="footerWrapper">
            <div className="footer">
                <div className="leftDiv">
                    <CopyrightIcon className="copyRight" /><span>{currentYear}</span>
                </div>

                <div className="rightDiv">
                    <span className="HeaderLinks">
                        Terms & conditions
                    </span>
                </div>
            </div>
        </div>
    )
}