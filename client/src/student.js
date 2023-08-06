import React from 'react';
import './homepage.css';
import {Link} from 'react-router-dom';

export default function Student()
{
    return (<>
    <div class="container">
        <h1>Choose One Option</h1>
        <div class="button-container">
            <button class="button" >Give Exam</button>
            <button class="button" >View Results</button>
        </div>
    </div></>);
}