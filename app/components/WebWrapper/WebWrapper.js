import React, { Component } from 'react';
import { View, WebView, Dimensions, StatusBar } from 'react-native';
import { baseURL } from '../../config';
import { primaryColor } from '../../constants';
import { Loading } from '../common';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class WebWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  onLoadStart = () => {
    this.setState({ loading: true });
  };

  onLoadFinish = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
        {this.state.loading &&
          <View
            style={{
              width: deviceWidth,
              height: deviceHeight,
              backgroundColor: primaryColor
            }}
          >
            <Loading />
          </View>}
        <WebView
          ref={webview => {
            myWebView = webview;
          }}
          source={{
            uri: baseURL
          }}
          style={styles.webViewStyle}
          javaScriptEnabled={true}
          onLoadStart={() => this.onLoadStart()}
          onLoad={() => this.onLoadFinish()}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  webViewStyle: {
    width: deviceWidth,
    height: deviceHeight
  }
};

export default WebWrapper;
