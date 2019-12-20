import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Todolist from '../Todolist1/Todolist'
import {BrowserRouter as Router,Route} from 'react-router-dom';
export default class Users extends Component {
    render() {
        return (
            <Router>
            <div>
                <div>
                <img src="https://i04piccdn.sogoucdn.com/c6e77a1f341cb26d" alt="" style={{width: '60px',
    height: '60px',marginTop:'20px'}}/>  
                    <a style={{fontSize:'40px',color:'black'}} href="">十年十月三十日</a>
                    <button style={{position:'absolute',marginLeft:'700px',width:'100px',height:'40px',marginTop:'45px',backgroundColor:'gray',borderColor:'red'}}>删除</button>
                    <br/>
                <img src="https://i01piccdn.sogoucdn.com/faff0d7fbe5722c9" alt="" style={{width: '60px',
    height: '60px'}}/>  
                    <a style={{fontSize:'40px',color:'black'}} href="">十五年等待候鸟</a>
                    <button style={{position:'absolute',marginLeft:'700px',width:'100px',height:'40px',marginTop:'20px',backgroundColor:'gray',borderColor:'red'}}>删除</button>
                    <br/>
                    <img src="https://i01piccdn.sogoucdn.com/02dfdc5d1acff07c" alt="" style={{width: '60px',
    height: '60px'}}/>  
                    <a style={{fontSize:'40px',color:'black'}} href="">梦回</a>
                    <button style={{position:'absolute',marginLeft:'900px',width:'100px',height:'40px',marginTop:'20px',backgroundColor:'gray',borderColor:'red'}}>删除</button>
                    <br/>
                    
                </div>
                <Todolist/>
            </div>
            </Router>
        )
    }
}
