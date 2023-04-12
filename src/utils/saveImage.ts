import RNFetchBlob from 'rn-fetch-blob';

const saveImage = REMOTE_IMAGE_PATH => {
  let date = new Date();
  let image_URL = REMOTE_IMAGE_PATH;
  let ext = /[.]/.exec(REMOTE_IMAGE_PATH)
    ? /[^.]+$/.exec(REMOTE_IMAGE_PATH)
    : undefined;
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image/meetups' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        '.' +
        ext[0],
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      console.log('res -> ', JSON.stringify(res));
    });
};

export default saveImage;
