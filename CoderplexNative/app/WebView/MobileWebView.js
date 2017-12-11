import React from 'react';
import { View, WebView, Dimensions } from 'react-native';
import { baseURL } from '../config';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const MobileWebView = () => {
  return (
    <View style={styles.container}>
      <WebView
        ref={webview => {
          myWebView = webview;
        }}
        source={{
          uri: baseURL
        }}
        style={styles.webViewStyle}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1
  },
  webViewStyle: {
    width: deviceWidth,
    height: deviceHeight
  }
};

export default MobileWebView;
