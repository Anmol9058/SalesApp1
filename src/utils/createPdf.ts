import { useContext } from 'react';
import { Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { authContext } from '../contexts/context';


export const createPdf = async (content: any) => {
    try {
      let options = {
        html: content,
        fileName: 'Customer Ledger',
          directory: 'Downloads',
          base64: true,
          height: 490,
          width: 350,
          // padding: 10,
          bgColor: '#ffffff',
      };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file)
      if (Platform.OS === 'android') {
        const android = RNFetchBlob.android;
        android.actionViewIntent(file.filePath, 'application/pdf');
      } else {
        RNFetchBlob.ios.openDocument(file.filePath);
      }
    } catch (error) {
      console.log(error);
    }
  };
