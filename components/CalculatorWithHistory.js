import React from'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';


export default function CalculatorWithHistory() {
    const [result, setResult] = React.useState(0);
    const [number1, setNumber1] = React.useState('');
    const [number2, setNumber2] = React.useState('');
    const [data, setData] = React.useState([]);

  
    const Addition = () => {
      const res = parseFloat(number1) + parseFloat(number2);
      setResult(res);
      setData([...data, { key: number1 + " + " + number2 + " = " + res }]);
    };
  
    const Substraction = () => {
      const res = parseFloat(number1) - parseFloat(number2);
      setResult(res);
      setData([...data, { key: number1 + " - " + number2 + " = " + res }]);

    };
    
    return (
      <View style = {styles.container}>
        <View style = {styles.container}>
            <Text style = {styles.resulttext}>Result: {result.toFixed(0)} </Text>
            <TextInput 
              keyboardType = "numeric" 
              style = {styles.form} 
              value = {String(number1.replace(/,/g, '.'))} 
              onChangeText = {number1 => setNumber1(number1)}/>
            <TextInput 
              keyboardType = "numeric" 
              style = {styles.form} 
              value = {String(number2.replace(/,/g, '.'))} 
              onChangeText = {number2 => setNumber2(number2)}/>
        </View>
        <View style={styles.buttons} >
            <Button title = "Add" onPress = {Addition} />
            <Button title = "Subtract" onPress = {Substraction} />
        </View>
        <View style={styles.history}>
            <FlatList data={data} renderItem={({ item }) => <Text>{item.key}</Text>} keyExtractor={(item, index) => index.toString()} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#eaeaea",
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  
    resulttext: {
      fontSize: 18,
      color: 'blue'
    },
  
    form: {
      width:200, 
      height:30, 
      borderColor: 'black',
      backgroundColor: "white", 
      borderWidth: 1,
    },
  
    buttons: { 
      flex: 2,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
    },
    history: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });