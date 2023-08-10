import React from "react";
import './homepage.css';
import {Link, Outlet} from 'react-router-dom';

export default function Teacher() {
    return (
        <>
            <div class="container">
                <h1>Choose One Option</h1>
                <div class="button-container">
                    <Link to='/createexam'>
                        <button class="button">Create Exam</button>
                    </Link>
                    <Link to='/viewresults'>
                        <button class="button">View Results</button>
                    </Link>
                </div>
            </div>
           
        </>
    );
}
