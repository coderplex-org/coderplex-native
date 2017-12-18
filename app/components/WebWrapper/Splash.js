import React from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';
import { Loading } from '../common';
import { deviceHeight, deviceWidth } from '../../constants';

const Splash = () => {
  return (
    <View>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={{ width: deviceWidth, height: deviceHeight }}
      >
        <View style={{ alignSelf: 'center', position: 'absolute', bottom: 60 }}>
          <Loading />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
