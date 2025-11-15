
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import desenvolvimento from './desenvolvimento';
import editTask from './EditTask';
import index from './index'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
                        <Stack.Screen name="index" component={index} />

            <Stack.Screen name="editTask" component={editTask} />
            <Stack.Screen name="desenvolvimento" component={desenvolvimento} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}