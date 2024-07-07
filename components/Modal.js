import {
  StyleSheet,
  Image,
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import Slider from '@react-native-community/slider';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  useProgress,
  useActiveTrack,
  usePlaybackState,
  State,
  RepeatMode,
} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';

const ModalView = ({isOpen, setIsOpen, forward, backward}) => {
  const progress = useProgress();
  const song = useActiveTrack();
  const playerState = usePlaybackState();
  const [isLooping, setIsLooping] = useState(false);

  function handlePlayback() {
    if (playerState.state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  function time(t) {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);

    return `${min < 10 ? `0${min}` : `${min}`} : ${
      sec < 10 ? `0${sec}` : `${sec}`
    }`;
  }

  async function getloop() {
    if (isLooping) {
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setIsLooping(false);
      return;
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setIsLooping(true);
      return;
    }
  }

  return (
    <Modal animationType="slide" visible={isOpen}>
      <LinearGradient
        colors={['brown', 'rgba(238,174,202,1)', 'rgba(61,120,190,1)']}
        useAngle={true}
        angle={0}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{flex: 1}}>
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
            }}>
            <Pressable onPress={() => setIsOpen(false)}>
              <Text>
                <Icon name="chevron-down" size={30} color="#FFD369" />
              </Text>
            </Pressable>
            {playerState.state === State.Playing && (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                  textAlign: 'center',
                  color: 'white',
                }}>
                Now Playing...
              </Text>
            )}
            <Text>
              <Icon name="chevron-down" size={30} color="transparent" />
            </Text>
          </View>

          <View
            style={{
              padding: 0,
              height: '60%',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {song?.cover ? (
              <View
                style={{
                  paddingHorizontal: 20,
                  shadowColor: 'black',
                  elevation: 24,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  style={{height: '70%', width: '100%', borderRadius: 10}}
                  source={{uri: song.cover}}
                />
              </View>
            ) : (
              <View
                style={{
                  marginTop: 10,
                  height: '70%',
                  width: '90%',
                  shadowColor: 'black',
                  elevation: 24,
                  backgroundColor: '#2b2b2b',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <MIcon name="album" size={260} color={'grey'} />
              </View>
            )}
          </View>

          <View style={{paddingHorizontal: 20, paddingTop: 0}}>
            <View style={{marginTop: 10}}>
              <ScrollView horizontal={true}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                    // fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {song?.title}
                </Text>
              </ScrollView>
            </View>

            <View>
              <ScrollView horizontal={true}>
                <Text
                  style={{
                    marginTop: 5,
                    // fontWeight: 'bold',
                    fontSize: 14,
                    color: 'lightgrey',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {song?.artist != '<unknown>'
                    ? song?.artist
                    : 'Unknown Artist'}
                </Text>
              </ScrollView>
            </View>
          </View>

          <View style={{paddingHorizontal: 0}}>
            <Slider
              minimumValue={0}
              maximumValue={progress.duration}
              minimumTrackTintColor={'#FFD369'}
              maximumTrackTintColor={'lightgrey'}
              thumbTintColor={'#FFD369'}
              value={progress.position}
              onValueChange={e => TrackPlayer.seekTo(e)}
              style={{height: 40, fontSize: 30}}
            />
            <View
              style={{
                paddingBottom: 20,
                paddingHorizontal: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: 'white',
                }}>
                {time(progress.position)}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: 'white',
                }}>
                {time(progress.duration)}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingBottom: '10%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Pressable onPress={getloop}>
              <Text>
                <SIcon
                  name="loop"
                  size={25}
                  color={!isLooping ? '#fff' : '#FFD369'}
                />
              </Text>
            </Pressable>

            <Pressable onPress={backward}>
              <Text>
                <Icon name="backward-step" size={30} color="#fff" />
              </Text>
            </Pressable>

            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={handlePlayback}>
                <Text>
                  <Icon
                    name={
                      playerState.state === State.Playing ? 'pause' : 'play'
                    }
                    size={48}
                    color="#fff"
                  />
                </Text>
              </Pressable>
            </View>

            <Pressable onPress={forward}>
              <Text>
                <Icon name="forward-step" size={30} color="#fff" />
              </Text>
            </Pressable>

            <Pressable onPress={() => {}}>
              <Text>
                <SIcon name="volume-2" size={25} color="#fff" />
              </Text>
            </Pressable>
          </View>

          {/*  */}
        </View>
        {/*  */}
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    flex: 1,
    right: 0,
    left: 0,
    flex: 1,
  },
});

export default ModalView;
