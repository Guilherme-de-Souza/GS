
import React from 'react';

import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function TabTwoScreen() {
  
  
  return (
  <View style={styles.container}>
        <Text style={styles.chartTitle}>Gráfico de Status</Text>

        
    <Bar
  data={{
    labels: ['Concluídas', 'Em andamento'],
    datasets: [
      {
        label: 'Tarefas',
        data: [5, 3], // valores
        backgroundColor: ['#4CAF50', '#FF9800'],
      },
    ],
  }}
  options={{
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  }}
/>
        
        </View>
        
    );

  }

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

