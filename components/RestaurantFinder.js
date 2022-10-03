import React from 'react';
import{ View , Button, StyleSheet, InputAccessoryView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {googleApi} from './apiKeys.js'

export default function RestaurantFinder() {
  
    const inputAccessoryViewID = 'uniqueID';
    const [address, SetAddress] = React.useState('');
    const [region, SetRegion] = React.useState({latitude: 60.170275, longitude: 24.943749, latitudeDelta: 0.1, longitudeDelta: 0.1});
    const [markers, SetMarkers] = React.useState([]);
    const [lat, SetLat] = React.useState('');
    const [lng, SetLng] = React.useState('');
    const key = googleApi();

  GetAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      SetLat(jsondata.results[0].geometry.location.lat);
      SetLng(jsondata.results[0].geometry.location.lng);
      ShowAddress();
    })
    .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
  }
  
  ShowAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat +','+ lng + '&radius=1500&type=restaurant&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
      SetMarkers(jsondata.results)
      
      //console.log(markers)
    
    })
    
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }
  


return (
  <View style={styles.container}>
    <MapView 
        provider={PROVIDER_GOOGLE}
        style = {{flex: 1}}
        region={region}>

    {markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: marker.geometry.location.lat, 
          longitude: marker.geometry.location.lng
        }}
        title={marker.name}
        description={marker.description}
      
      />
      
      
      ))
    }
    </MapView>
    <InputAccessoryView >
      <View style={styles.textInputContainer}>
          
          <TextInput style={styles.textInput}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={address => SetAddress(address)}
              placeholder = 'What is the address?'>
          </TextInput>
          
          <Button onPress = {GetAddress} title='SHOW'></Button>
      </View>
    </InputAccessoryView>
  </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 40,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      backgroundColor: 'white',
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
    }, 
  });