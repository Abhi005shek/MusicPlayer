import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './Card';
import Player from './Player';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HideOnKeyboard} from 'react-native-hide-onkeyboard';
import {useActiveTrack} from 'react-native-track-player';

const Search = ({songs, setIsOpen, forward}) => {
  const [query, setQuery] = useState('');
  const tabBarHeight = useBottomTabBarHeight();
  const track = useActiveTrack();
  const [searchedSongs, setSearchSongs] = useState([]);

  useEffect(() => {
    if (!query) {
      setSearchSongs([]);
    }
    if (query.length) {
      setSearchSongs([]);
      const arr = songs?.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchSongs(arr);
    }
  }, [query]);

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 20,
          paddingHorizontal: 20,
        }}>
        <ScrollView>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: 'white',
                fontSize: 25,
                // fontWeight: 'bold',
              }}>
              Search
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              marginVertical: 20,
              borderRadius: 5,
            }}>
            <TextInput
              style={{
                paddingLeft: 10,
                flex: 1,
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
              }}
              value={query}
              onChangeText={setQuery}
              placeholder="What do you want to listen to?"
            />
            <View style={{marginRight: 15}}>
              {!query ? (
                <View style={{}}>
                  <Octicon name="search" size={25} color={'black'} />
                </View>
              ) : (
                <Pressable onPress={() => setQuery('')}>
                  <View style={{}}>
                    <MCIcon name="close" size={28} color={'black'} />
                  </View>
                </Pressable>
              )}
            </View>
          </View>

          <View>
            {searchedSongs.length ? (
              searchedSongs?.map((el, index) => {
                return (
                  <View key={el.title}>
                    <Pressable onPress={() => setQuery('')}>
                      <Card song={el} index={index} />
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  height: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MCIcon name="music-note-off" size={80} color={'grey'} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'lightgrey',
                  }}>
                  No Songs Found
                </Text>
              </View>
            )}
          </View>

          <View style={{height: 160}}></View>
        </ScrollView>
      </View>

      {track && (
        <View
          style={{
            marginHorizontal: 5,
            position: 'absolute',
            bottom: tabBarHeight + 5,
            left: 5,
            right: 5,
          }}>
          <HideOnKeyboard>
            <Player forward={forward} setIsOpen={setIsOpen} />
          </HideOnKeyboard>
        </View>
      )}
    </>
  );
};

export default Search;
