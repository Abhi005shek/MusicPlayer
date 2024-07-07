import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import {useEffect, useState} from 'react';
import {requestPermission} from './utils/getPermission';

import TrackPlayer, {
  RepeatMode,
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './components/Search';
import Home from './components/Home';
import Artists from './components/Artists';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Octicon from 'react-native-vector-icons/Octicons';
import {useActiveTrack} from 'react-native-track-player';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();

function App() {
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const track = useActiveTrack();

  async function forward() {
    if (songs.length - 1 === track.id) {
      await TrackPlayer.skip(0);
    } else {
      await TrackPlayer.skipToNext();
    }
  }

  async function backward() {
    if (track.id === 0) {
      await TrackPlayer.skip(songs.length - 1);
    } else {
      await TrackPlayer.skipToPrevious();
    }
  }

  async function getAllSong() {
    if (!songs.length) {
      const songsList = await getAll({
        limit: 20,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 5000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      });
      if (typeof songsList === 'object') {
        const data = songsList?.map((s, index) => {
          const audio = s.url.split('.');
          if (audio[audio.length - 1] === 'mp3') {
            return {
              ...s,
              id: index,
              artwork: s.cover ? s.cover : 'image',
              duration: s.duration / 1000,
            };
          } else return {url: undefined};
        });
        // console.log('=================');
        const d = data?.filter(el => el.url !== undefined);
        setSongs(
          d.map((el, index) => {
            return {
              ...el,
              id: index,
            };
          }),
        );
      }
    }
  }

  async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getActiveTrack();
      isSetup = true;
    } catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        color: 'crimson',
        progressUpdateEventInterval: 2,
      });

      isSetup = true;
    } finally {
      return isSetup;
    }
  }

  useEffect(function () {
    requestPermission();
  }, []);

  useEffect(function () {
    getAllSong();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let isSetup = await setupPlayer();
        await TrackPlayer.reset();
        await TrackPlayer.add(songs);
        const q = await TrackPlayer.getQueue();
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
      } catch (err) {
        console.log('Error in setup => ', err);
      }
    })();
  }, [songs]);

  return (
    <NavigationContainer>
      <StatusBar
        // translucent={true}
        barStyle={'light-content'}
        backgroundColor={'black'}
        animated={true}
      />
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: 'black'}}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: 'crimson',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: {fontSize: 10},
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#000',
            bottom: 0,
            borderWidth: 0,
            height: 65,
            left: 5,
            right: 5,
            paddingBottom: 6,
          },
        }}>
        <Tab.Screen
          name="Songs"
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="music" size={25} color={color} />
            ),
          }}>
          {() => (
            <Home
              currentSong={currentTrack}
              songs={songs}
              total={songs?.length}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              forward={forward}
              backward={backward}
              getAllSong={getAllSong}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon: ({color}) => (
              <Octicon name="search" size={25} color={color} />
            ),
          }}>
          {() => (
            <Search
              forward={forward}
              songs={songs}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Artists"
          component={Artists}
          options={{
            tabBarIcon: ({color}) => (
              <Octicon name="person" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
