import React, { Component } from 'react'

export default class Todoinput extends Component {
    constructor(){
        super();
        this.state = {
            val : ''
        }
    }
   handleinput = (e) => {
       if(e.keyCode === 13){
           this.props.addtodo(e.target.value);
           this.setState({
               val : ''
           })
       }
   }
   handlechange = (e) => {
       this.setState({
           val : e.target.value
       })
        console.log(this.state.val);
   }
    render() {
        return (
            <div class="tianjia">
                <label htmlFor = 'inp'>添加用户</label>
                <input onChange = {(e) =>this.handlechange(e)}  value = {this.state.val} type = 'text'  id = 'inp' placeholder = '输入添加的用户名称' onKeyDown = {(e) => {this.handleinput(e)}}></input>
            </div>
        )
    }
}
