import {useContext, useEffect} from 'react';
import {io} from 'socket.io-client';

import {SOCKET_URL} from '../constants/api';
import {authContext, messageContext, socketContext} from '../contexts/context';

const useSocket = () => {
  const {setSocketInstance, socket_instance, setProfileStats} =
    useContext(socketContext);
  const {tokens, logged_in, user_data} = useContext(authContext);
  const {addMessageToRoom, replaceMessageWithId} = useContext(messageContext);

  useEffect(() => {
    let initialSocket;
    if (logged_in && tokens?.access?.token && !socket_instance) {
      initialSocket = io(SOCKET_URL, {
        auth: {
          token: tokens.access.token,
        },
      });
      setSocketInstance(initialSocket);
      initialSocket.on('connect', () => {
        initialSocket.emit('init');
        initialSocket.on('message:new', data => {
          addMessageToRoom({
            room_id: data.room_id,
            message: data,
          });
          initialSocket.emit(
            'message:read',
            {
              userId: user_data.id,
              roomId: data.room_id,
            },
            succes => {
              console.log('message:read', succes);
            },
          );
        });
        initialSocket.on('user:stats', data => {
          setProfileStats(data);
        });
        initialSocket.on('message:update', data => {
          replaceMessageWithId({
            message_id: data._id,
            room_id: data.room_id,
            message: data,
          });
        });
      });
    }
    return () => {
      if (initialSocket) {
        initialSocket.off('user:stats');
        initialSocket.off('message:new');
        initialSocket.off('message:read');
        initialSocket.off('message:update');
      }
      console.log('disconnected runing');
    };
  }, [
    addMessageToRoom,
    logged_in,
    replaceMessageWithId,
    setProfileStats,
    setSocketInstance,
    socket_instance,
    tokens?.access?.token,
    user_data?.id,
  ]);
};

export default useSocket;
