import React from 'react';
import {Link} from 'react-router-dom';

export default function Header(){

    return (
        <div className='headerwrap1'>
            <header>
                <div style={{fontSize:'40px',marginTop:'30px',marginLeft:'30px'}}>
                    <Link to='/login'style={{marginLeft:'20px'}}>登录</Link>
                    <Link to='/gedan' style={{marginLeft:'80px'}} >歌单管理</Link>
                    <Link to='/geci'style={{marginLeft:'100px'}}>歌词管理</Link>
                    <Link to='/users'style={{marginLeft:'100px'}}>用户管理</Link>
                    <Link to='/bangdan'style={{marginLeft:'100px'}}>榜单管理</Link>
                </div>
            </header>
        </div>
    )
} 