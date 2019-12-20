import React, { Component } from 'react'

export default class Todoing extends Component {

    handledelete = (idx) => {
        this.props.todo(idx);
    }
    delete = (idx) => {
        this.props.todelete(idx);
    }
    render() {
        return (
            <div style={{fontSize:'40px',color:'blue'}}>
                 <div>
                
                    <ul>
                        {this.props.todolist1 == null ? '' :(this.props.todolist1.length > 0?this.props.todolist1.map((item1,index1) => {
                            return <li key = {'1' + index1}>
                                <img src="https://i04piccdn.sogoucdn.com/f87d0720902c9da4" alt="" style={{width: '60px',
    height: '60px',marginTop:'20px'}}/>
                                {item1}-----------------<button onClick = {() => this.handledelete(index1)} style={{position:'absolute',width:'100px',height:'40px',marginTop:'45px',backgroundColor:'gray',borderColor:'red'}}>删除</button></li>
                        }):'')}
                    </ul>
                </div>

            </div>
        )
    }
}
