import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Task } from './interface/tasks';

export default function App() {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<'concluída' | 'em andamento'>('em andamento');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      status: taskStatus,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskTitle('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <View style={styles.statusContainer}>
        <TouchableOpacity
          onPress={() => setTaskStatus('em andamento')}
          style={[styles.statusBtn, taskStatus === 'em andamento' && styles.active]}
        >
          <Text>Em andamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTaskStatus('concluída')}
          style={[styles.statusBtn, taskStatus === 'concluída' && styles.active]}
        >
          <Text>Concluída</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={addTask}>
        <Text style={styles.addText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.taskItem}>
            {item.title} - {item.status}
          </Text>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#e0e0e0',
  },
  addBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
