
import React, { useEffect, useState } from 'react';

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Task } from '@/interfaces/tasks';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function TabTwoScreen() {
  const [numAnda, setNumAnda] = useState(0);
const [numConclu, setNumConclu] = useState(0);
 

function contarNumeros(tasks: Task[]) {
    let andamento = 0;
    let concluida = 0;

    tasks.forEach((task) => {
      if (task.status === "em andamento") andamento++;
      if (task.status === "concluída") concluida++;
    });

    setNumAnda(andamento);
    setNumConclu(concluida);
  }

  async function carregarTasks() {
    const data = await AsyncStorage.getItem("tasks");
    if (!data) return;

    const tasks: Task[] = JSON.parse(data);
    contarNumeros(tasks);
  }

  useEffect(() => {
    carregarTasks();
  }, []);
  
  return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.statusBtn}
            onPress={() => router.push({
                pathname: "/",})}>
                    <Text>Voltar</Text>
            </TouchableOpacity>
        <Text style={styles.chartTitle}>Gráfico de Status</Text>

        
    <Bar
  data={{
    labels: ['Concluídas', 'Em andamento'],
    datasets: [
      {
        label: 'Tarefas',
        data: [numConclu, numAnda], // valores
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
  
  statusBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
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

