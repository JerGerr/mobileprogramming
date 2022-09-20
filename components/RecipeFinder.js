import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, Linking} from 'react-native';

export default function RecipeFinder() {
  const [ingr, setIngr] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingr;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
        setRecipe(jsondata.results);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }

  const Item = ({ item }) => {
    const url = item.href
    return (
      <View style={styles.listItem}>
            <Image style={styles.photo} source={{ uri: item.strMealThumb }} />
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.category}>{item.strCategory}</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bigBlue}> Find meal by ingredients: </Text>
        <TextInput
          style={styles.textInput}
          value={ingr} 
          placeholder="tomato ... ?"
          onChangeText={(ingr) => setIngr(ingr)} />
        <Button title="Find" onPress={getRecipe} />
        <FlatList 
        style={styles.results}
        data={recipe} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => <Item item={item}/>} />  
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  textInput: {
    fontSize: 18,
    width: 300,
    margin: 10,
    alignSelf: "center",
    backgroundColor:"#FFEFD5",
  },
  bigBlue: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 10,
  },
  listItem:{
    margin:5,
    padding:5,
    backgroundColor:"#FFF",
    width:"90%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});