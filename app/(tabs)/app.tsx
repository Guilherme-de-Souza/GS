
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import editTask from './editTask';
import desenvolvimento from './desenvolvimento';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="editTask" component={editTask} />
            <Stack.Screen name="desenvolvimento" component={desenvolvimento} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}