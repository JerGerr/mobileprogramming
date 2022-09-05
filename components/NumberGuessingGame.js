import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function NumberGuessingGame() {

  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [value, setValue] = useState('');
  const [attempt, setAttempt] = useState('1');
  const [error, setError] = useState('');
  const [resultMessage, setResultMessage] = useState(false);

  const buttonGuess = () => {

    setResultMessage(false);

    if (Number(value) < Number(random)) {

      setError('Your guess ' + value + ' is too low');
      setAttempt(Number(attempt) + Number(1));
      setResultMessage(true);
    } else if (Number(value) > Number(random)) {

      setError('Your guess ' + value + ' is too high');
      setAttempt(Number(attempt) + Number(1));
      setResultMessage(true);
    } else {

      setResultMessage(false);
      setRandom(Math.floor(Math.random() * 100) + 1);
      Alert.alert('You guessed the number in ' + attempt + ' guesses');
    }
  }



  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Guess number between 1-100.</Text>
        {resultMessage ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, margin: 10 }} numericvalue keyboardType={'numeric'} value={value} onChangeText={value => setValue(value)} />
      </View>
      <View style={styles.buttons}>
        <Button title="MAKE GUESS" onPress={buttonGuess} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    flex: 2,
    justifyContent: 'center',
  },
  buttons: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});