import React, { Component } from "react";
import './Information.css';

class Information extends Component {
    handleEdit(e) {
        // console.log(e.target.parentElement.children[0].tagName)
    }
    render() {
        return (
            <form action='/information' method='POST'>
                <h3>information</h3>
                <div>
                    <span>name<p className="username">adham ashraf haddad</p></span>
                    <button type='button' onClick={this.handleEdit}>edit</button>
                </div>
                <div>
                    <span>gender<p className="gender">male</p></span>
                    <button>edit</button>
                </div>
                <div>
                    <span>location<p className="location">egypt, giza</p></span>
                    <button>edit</button>
                </div>
                <div>
                    <span>birthday<p className="birthday">february, 8, 2002</p></span>
                    <button>edit</button>
                </div>
                <div>
                    <span>story<p className="story">Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer. I worked too hard to achieve this progress, it's my passion and I need an opportunity to show myself.</p></span>
                    <button>edit</button>
                </div>

                <h3>links</h3>
                <div>
                    <span>linkedIn<p>https://linkedin.com/in/adhamashraf</p></span>
                    <button>edit</button>
                </div>
                <div>
                    <span>twitter<p>https://twitter.com/AdhamHaddad_</p></span>
                    <button>edit</button>
                </div>

                <h3>education</h3>
                <div>
                    <span>work<p>The Sparks Foundation - Web Development and Designing</p></span>
                    <button>edit</button>
                </div>
                <div>
                    <span>education<p>Computers and Information Systems - B.S</p></span>
                    <button>edit</button>
                </div>
                <button type='submit'>save changes</button>
            </form>
        );
    }
}
export default Information;