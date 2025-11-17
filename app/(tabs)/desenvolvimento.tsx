
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
    <TouchableOpacity 
            onPress={() => router.push({
                pathname: "/",})}>
                    <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
        <Text style={styles.chartTitle}>Gráfico de Status</Text>

        
    <Bar
  data={{
    labels: ['Em andamento', 'Concluídas'],
    datasets: [
      {
        label: 'Tarefas',
        data: [numAnda, numConclu], // valores
        backgroundColor: [ '#FF9800', '#4CAF50'],
      },
    ],
  }}
  options={{
    responsive: true,
    plugins: {
      legend: {
        display: true,
         labels: {
        usePointStyle: true,   // força usar ponto (bolinha)
        pointStyle: 'circle',  // define tipo
        padding: 10,
        boxWidth: 0,           // remove o quadrado
      }
      },
    },
    
    
    layout: {
      padding: {
        top: 20,
        right: 50,
        bottom: 200,
        left: 50,
      },
    },
    
    }}
/>
        
        </View>
        
    );

  }

const styles = StyleSheet.create({
  backText: {
    color: '#2351e6ff',
    fontSize:16,
    fontWeight: 'bold',
    marginBottom:20,
  },
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

