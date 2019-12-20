import React, { Component } from 'react'
import Todoinput from './Todoinput'
import Todoing from './Todoing'
export default class Todolist extends Component {
    constructor(){
        super();
        this.state = {
            list1:!localStorage.getItem('key1')?[]:localStorage.getItem('key1').split(','),
            list2:!localStorage.getItem('key2')?[]:localStorage.getItem('key2').split(',')
        }}
    addItem = (value) => {
            let list = this.state.list1;
            list.push(value);
            this.setState({
                list1 : list
            },()=>localStorage.setItem('key1',list))
    }
    deleteItem1 = (idx) => {
        let list = this.state.list1;
        list.splice(idx,1);
        this.setState({
            list1 : list
        },()=>localStorage.setItem('key1',list))
    }
    deleteItem2 = (idx) => {
        let list = this.state.list2;
        list.splice(idx,1);
        this.setState({
            list2 : list
        },()=>localStorage.setItem('key2',list))}
    submitItem = (idx) => {
        let list = this.state.list1;
        let llist = this.state.list2;
        llist.push(list[idx]);
        list.splice(idx,1);
        this.setState({
            list1 : list,
            list2 : llist
        },()=>{localStorage.setItem('key1',list);localStorage.setItem('key2',llist)})}
    returnItem = (idx) => {
        let list = this.state.list1;
        let llist = this.state.list2;
       list.push(llist[idx]);
        llist.splice(idx,1);
        this.setState({
            list1 : list,
            list2 : llist
        },()=>{localStorage.setItem('key1',list);localStorage.setItem('key2',llist)})}
    render() {
        return (
            <div>
               <Todoinput addtodo = {this.addItem}/>
               <Todoing todo = {this.deleteItem1} tosubmit = {this.submitItem} todelete = {this.deleteItem2} todolist1 = {this.state.list1} todolist2 = {this.state.list2} toreturns = {this.returnItem}/>
            </div> 
            
        )
    }
}
