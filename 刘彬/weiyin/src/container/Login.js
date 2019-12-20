import React, { Component} from 'react'
import {Redirect } from 'react-router-dom';
import Todolist from '../Todolist/Todolist'
import {BrowserRouter as Router,Route} from 'react-router-dom';
export default class Login extends Component {
    render() {
        
        return (
            <div class="login">
                <form>
                    <input type="text" placeholder="username"/>
                    <br/>
                    <input type="password" placeholder="password"/>
                    <br/>
                    <input type="submit" value="登录"/>
                </form>
            </div>
        )
    }
}
