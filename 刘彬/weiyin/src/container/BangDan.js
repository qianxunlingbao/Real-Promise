import React, { Component } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';

export default class BangDan extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        fetch('https://api.apiopen.top/musicRankingsDetails?type=2')
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                this.setState({
                    data: res.result
                })
                console.log(res);
            })
    }
    render() {
        return (
            <Router>
            <div class="gebang">
                <ul>
                    {
                        
                        this.state.data.map(
                            (item,index)=>(
                                <li key={index}>
                                    <h2><a href="https://webfs.yun.kugou.com/201912200857/787085a3b2359de58c608037e9b66bae/G168/M04/0C/08/SIcBAF1brOOAeaH8ADtzw9LMTj4119.mp3">{item.album_title}</a></h2>
                                    <p>{item.author}</p>
                                </li>
                            )
                        )
                    }
                    
                </ul>
            </div>
            </Router>
        )
    }
}
