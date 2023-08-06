import React from 'react';
import './homepage.css';
import {Link} from 'react-router-dom';

export default function Homepage()
{
    return (<>
    <div class="container">
        <h1>Choose your role</h1>
        <div class="button-container">
            <Link to = '/student'><button class="button" >Student</button></Link>
           <Link to ='/teacher'> <button class="button" >Teacher</button></Link>
        </div>
    </div></>);
}