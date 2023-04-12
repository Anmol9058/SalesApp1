import ImagePicker from 'react-native-image-crop-picker';

export const openGalleryImages = async () => {
  try {
    const res = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.5,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const openGalleryWithMultipleImages = async () => {
  try {
    const res = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.5,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const openCameraImages = async () => {
  try {
    const res = await ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.5,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
