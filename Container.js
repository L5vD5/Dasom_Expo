import React from 'react';
import { Platform, StatusBar, ListItem, Text, AsyncStorage, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Drawer, Header, Left, Right, Icon, Body, Title, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SideBar from './SideBar';
import { getData } from './getData.js';
import { getLanguage } from './AsyncStorage.js';

export default class ContainerWithDrawer extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
        }
    }

    componentWillMount() {
        getLanguage(AsyncStorage).then((key) => {
            if(key == null) {
                this.setState({
                    language: getData('en'),
                    loaded: true
                })
            } else {
                this.setState({
                    language: getData(key),
                    loaded: true
                });
            }
        });
    }

    render() {
        const topMargin = Platform.OS=='ios'? 0 : StatusBar.currentHeight//Constants.statusBarHeight;
        return this.state.loaded ? (<Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar ref={ref => {this.sideBar = ref;}} topMargin={topMargin} closeDrawer={() => this.drawer._root.close()}/>}
        >
            <Container style={{marginTop: topMargin}}>
                <Header style={{backgroundColor: '#467bec'}}>
                    <Left>
                        <Icon name="menu" style = {{color: 'white'}} onPress = { () => {this.sideBar.componentWillMount(); this.drawer._root.open()} } />
                    </Left>
                    <Body>
                      <Title onPress={() => Actions.screen1()} style={{marginLeft: 50, width: 100}}>
                          <Image
                            source={require("./asset/img/1x/aya.png")}
                            style={styles.center}
                          />
                      </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                {this.props.children}
            </Container>
            </Drawer>) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
                <Spinner />
            </View>)
    }
}

const styles = StyleSheet.create({
  center: {
    height: 120,
    width: 200,
    resizeMode: 'contain'
  }
});
