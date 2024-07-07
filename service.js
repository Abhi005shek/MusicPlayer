import TrackPlayer, {Event} from 'react-native-track-player';

export default async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    // console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    // console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
}
// export default async function () {
//   // This service needs to be registered for the module to work
//   // but it will be used later in the "Receiving Events" section
// }
