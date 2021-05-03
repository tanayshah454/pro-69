import React from 'react';
import { Text,
   View,
   TouchableOpacity,
   TextInput,
   Image,
   StyleSheet,
  KeyboardAvoidingView ,
ToastAndroid,Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
        constructor(){
        super();
        this.state={
            hasCameraPerms:null,
            scanned:null,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions = async (id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          /*status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted the permission
          */
          hasCameraPermissions: status === "granted",
          buttonState: id,
          scanned: false
        });
      }
      handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
  
        if(buttonState==="clicked"){
          this.setState({
            scanned: true,
            scannedBookId: data,
            buttonState: 'clicked'
          });
        }
        else{
          this.setState({
            scanned: true,
            scannedStudentId: data,
            buttonState: 'normal'
          });
        }
      
      }
    render(){
  return (
    <View >
      <TouchableOpacity
      onPress={this.getCameraPermissions}
      title="bar Code Scanner">
          <Text>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}
}