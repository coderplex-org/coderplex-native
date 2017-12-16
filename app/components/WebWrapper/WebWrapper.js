import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { baseURL } from '../../config';
import { primaryColor } from '../../constants';
import { Loading } from '../common';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class WebWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      canGoBack: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    if (!this.state.canGoBack) {
      this.myWebView.goBack();
      return true;
    }
  };

  onLoadStart = () => {
    this.setState({ loading: true });
  };

  onLoadFinish = () => {
    this.setState({ loading: false });
  };

  _onRenderError(e) {
    console.log('onRenderError', e);
  }

  _onError(e) {
    console.log('onError', e);
  }

  _onShouldStartLoadWithRequest() {
    return true;
  }

  _onNavigationStateChange(navState) {
    console.log('onNavigationStateChange', navState);
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

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
            this.myWebView = webview;
          }}
          source={{
            uri: baseURL
          }}
          style={styles.webViewStyle}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          onLoadStart={() => this.onLoadStart.bind(this)}
          onLoad={() => this.onLoadFinish.bind(this)}
          renderError={this._onRenderError}
          onError={this._onError}
          onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
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
