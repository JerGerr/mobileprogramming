import React, {useEffect} from 'react';
import{ View , Button, StyleSheet, InputAccessoryView, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';

//import {MapquestapiKey} from './apiKeys.js';
// Normally to obscure the api key from others and easier, more central management the keys will be stored in a separate folder.

export default function SpotFinder() {
  
    const inputAccessoryViewID = 'uniqueID';
    const [location, setLocation] = React.useState(null);
    const [address, SetAddress] = React.useState('');
    const [region, SetRegion] = React.useState({latitude: 0, longitude: 0, latitudeDelta: 1, longitudeDelta: 1});
    const [marker, SetMarker] = React.useState('');
    
    
    //const key = MapquestapiKey();
 
    const key = '6cugLWzAF1Dvoz1Pyq0YdfJ0NiAd9qHO';

            useEffect(() => {
                getLocation();
            }, []); 
  
    const getLocation = async () => {
        let {status} = await Location.requestPermissionsAsync();
    
        if (status !== 'granted') {
            Alert.alert('Permission to access denied');
        }
    
        else{
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;
        
            SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
        }
    };

    let text = 'Processing ...';
        if (location) {
            text = '';
    }
  
ShowAddress = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + address;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      const lat = jsondata.results[0].locations[0].latLng.lat;
      const lng = jsondata.results[0].locations[0].latLng.lng;
      SetMarker(jsondata.results[0].locations[0].street)
      SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }
  
    return (
    <View style={styles.container}>
          <Text>{text}</Text>
        <MapView 
            provider={PROVIDER_GOOGLE}
            style = {{flex: 1}}
            region={region}>
        <Marker 
            coordinate={{
                latitude: region.latitude, 
                longitude: region.longitude
            }}
            
            title={marker}/>
        </MapView>
    
        <InputAccessoryView >
            <View style={styles.textInputContainer}>
                
                <TextInput style={styles.textInput}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={address => SetAddress(address)}
                    placeholder = 'What address?'>
                
                </TextInput>
                
                <Button onPress = {ShowAddress} title='SHOW'></Button>
            </View>
    
        </InputAccessoryView>
        </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 35,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      backgroundColor: '#D3D3D3',
    },
    textInput: {
      flex: 1,
      paddingLeft: 8,
    }, 
  });