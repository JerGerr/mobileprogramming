import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function ShoppingList() {
  
  const [unitCount, setUnitCount] = useState('');
  const [shopList, setShopList] = useState([]);

  const AddItem = () => {
    setShopList([...shopList, unitCount]);
    setUnitCount('');
  };

  const ClearItem = () => {
    setShopList([]);
    setUnitCount('');
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
          <TextInput 
            style = {styles.form} 
            value = {unitCount} 
            onChangeText = {unitCount => setUnitCount(unitCount)}/>
      </View>
      <View style={styles.buttons} >
          <Button title = "Add" onPress = {AddItem} />
          <Button title = "Clear" onPress = {ClearItem} />
      </View>
      <View style={styles.listcontainer}>
        <Text style = {{fontSize: 18, color: 'red'}}>Shopping List</Text>
        <FlatList data = {shopList} renderItem = {({item}) => 
        <Text style = {{fontSize: 18, color: 'black'}}> {item} </Text > } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  listcontainer: {
    flex: 4,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    width:200, 
    height:30, 
    borderColor: 'black', 
    borderWidth: 1,
  },

  buttons: { 
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  }

});