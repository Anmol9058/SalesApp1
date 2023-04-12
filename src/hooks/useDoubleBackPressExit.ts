import {BackHandler, Platform} from 'react-native';
import toast from '../helpers/toast';

let currentCount = 0;

const useDoubleBackPressExit = () => {
  console.log('useDoubleBackPressExit', currentCount);
  if (Platform.OS === 'ios') {
    return;
  }
  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentCount === 1) {
      BackHandler.exitApp();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
    toast.info({
      message: 'Press again to close!',
    });
  }
  setTimeout(() => {
    currentCount = 0;
  }, 2000);
};

export default useDoubleBackPressExit;
