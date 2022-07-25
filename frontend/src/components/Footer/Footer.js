import React, { Component } from 'react';
import './Footer.css';
class Footer extends Component {
    currentYear = () => {
        let years = new Date().getFullYear();
        return years;
    }

    render() {
        return (
            <footer>
                <p>
                    copyrights&copy; 2020 - {this.currentYear()}
                    <a href="https://www.linkedin.com/in/adhamashraf/" target='_blank' rel='noreferrer'>adham ashraf.</a>
                    all rights reserved.
                </p>
            </footer>
        )
    }
}
export default Footer;