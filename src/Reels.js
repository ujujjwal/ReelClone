import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import {hp, wp} from '../src/Dimension';
import {videoData} from './data';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {SwiperFlatList} from 'react-native-swiper-flatlist';
const Reels = () => {
  const [toggleLikeImage, setToggleLikeImage] = useState(false);
  const [currentIndex, setIndex] = useState(0);

  onBuffer = e => {
    console.log('Buffering...!!!!!....', e);
  };

  videoError = e => {
    console.log('Some error Occured', e);
  };

  onChangeIndex = ({index}) => {
    setIndex(index);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Video
          source={{
            uri: item.sources,
          }} 
          onBuffer={onBuffer} 
          onError={videoError} 
          paused={currentIndex !== index}
          resizeMode={'cover'}
          style={styles.backgroundVideo}
        />

        <View
          style={styles.leftView}>
          <View>
            <Text style={{fontWeight: 'bold', color: '#fff'}}>
              {item.username}
            </Text>
          </View>

          <View style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 10,
                }}>
                <Text style={{color: 'yellow'}}>{item.type}</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  console.log('Hello Follow Button!!!');
                }}>
                <View
                  style={styles.followView}>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>Follow</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={[{flexWrap: 'wrap', flex: 1}, styles.fontStyling]}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightView}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.verticalPadding}
              onPress={() => {
                setToggleLikeImage(!toggleLikeImage);
              }}>
              {toggleLikeImage ? (
                <Image
                  source={require('../src/assets/img/Heart.png')}
                  style={{height: 30, width: 30}}
                />
              ) : (
                <Image
                  source={require('../src/assets/img/blankHeart.png')}
                  style={{height: 30, width: 30}}
                />
              )}
            </TouchableOpacity>

            <View style={styles.verticalPadding}>
              <Image
                source={require('../src/assets/img/comment.png')}
                style={{height: 25, width: 25}}
              />
            </View>

            <View style={styles.verticalPadding}>
              <Image
                source={require('../src/assets/img/share.png')}
                style={{height: 25, width: 25}}
              />
            </View>

            <View style={styles.verticalPadding}>
              <Image
                source={require('../src/assets/img/displayPic.jpg')}
                style={{height: 30, width: 30, borderRadius: 15}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SwiperFlatList
        data={videoData}
        renderItem={renderItem}
        onChangeIndex={onChangeIndex}
        vertical
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: windowHeight,
    width: windowWidth,

    // ...StyleSheet.absoluteFill,
  },
  rightView: {position: 'absolute', bottom: hp(5), right: wp(5), zIndex: 1},
  verticalPadding: {paddingVertical: 10},
  fontStyling: {
    fontSize: 14,
    color: '#fff',
  },
  whiteText: {
    color: '#000',
  },
  leftView:{position: 'absolute', bottom: hp(5), left: wp(5), zIndex: 1},
  followView:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  }
});
export default Reels;
