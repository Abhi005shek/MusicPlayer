import {View, Text} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const ProgressBar = () => {
  const progress = useProgress();

  function duration(time) {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${min}:${sec}`;
  }
  return (
    <View style={{paddingHorizontal: 0, backgroundColor: 'black'}}>
      <Slider
        minimumValue={0}
        maximumValue={progress.duration}
        minimumTrackTintColor={'#FFD369'}
        maximumTrackTintColor={'lightgrey'}
        thumbTintColor={'#FFD369'}
        value={progress.position}
        onValueChange={e => {
          TrackPlayer.seekTo(e);
        }}
        style={{height: 40, fontSize: 30}}
      />
      <View
        style={{
          paddingBottom: 20,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 12, color: 'white'}}>
          {duration(progress.position)}
        </Text>
        <Text style={{fontSize: 12, color: 'white'}}>
          {duration(progress.duration)}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
