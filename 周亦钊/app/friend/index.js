import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions
} from 'react-native';
import { Button,Icon} from '@ant-design/react-native';
import SplashScreen from "react-native-splash-screen"; 

import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {height, width} =  Dimensions.get('window');
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const self = this;
class friend extends Component {
    componentDidMount() {
        console.log("========>>>")
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }
    
    static headersFind={
        headerTitle: '朋友',
        headerStyle: {
            backgroundColor: '#CD3700',
            height :height/15
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            flex:1,
            textAlign: 'center'
        }
    };

    static navigationOptions = {
        title: '朋友',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="team" size={25} color={tintColor} />
        )

    };
    
    onChange = (value) => {
        this.setState({ value });
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
        };
        // this.navigation = props.navigation;
    }

    render() {
        const { actions, state, navigation } = this.props;
        return (
            <View style={styles.container}>
                <Button type="warning">这是首页按钮</Button>
            </View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(friend);
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
};