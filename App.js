import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalcPage from './CalcPage';
import CalcHistoryPage from './CalcHistoryPage';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalcPage} />
        <Stack.Screen name="History" component={CalcHistoryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}