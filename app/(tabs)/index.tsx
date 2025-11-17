import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, usePathname } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Task } from "@/interfaces/tasks";

//let numAnda = 0;
//let numConclu =0;

export default function App() {
const pathname = usePathname();


  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<'concluída' | 'em andamento'>('em andamento');
  const [tasks, setTasks] = useState<Task[]>([]);
// const [num, setNum] = useState<Num[]>([]);
 const [numAnda, setNumAnda] = useState(0);
const [numConclu, setNumConclu] = useState(0);

 // const numeric = Num {
   // numConcluida: numbConclu,
   // numAndamento: numAnda,
  //};
  console.log(tasks);
  //console.log(numAnda);
  console.log(numAnda, numConclu);
  
  function contarNumeros(tasks: Task[]) {
  let andamento = 0;
  let concluida = 0;

  tasks.forEach(task => {
    if (task.status === "em andamento") andamento++;
    if (task.status === "concluída") concluida++;
  });

  setNumAnda(andamento);
  setNumConclu(concluida);
}
  
  
  useEffect(() => {
    
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem('tasks');

      if (data) {
        const t = JSON.parse(data);
      setTasks(t);
      contarNumeros(t);
      }
       
      }
    

    loadTasks();
   
  }, []);
  /*
useEffect(() => {
  async function loadNumbers() {
    const data = await AsyncStorage.getItem('numeros');

    if (data) {
      const parsed = JSON.parse(data);
      setNumAnda(parsed.numAndamento);
      setNumConclu(parsed.numConcluida);
    }
  }

  loadNumbers();
}, []);*/

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
/*
useEffect(() => {
  const numb = {
      numConcluida: numConclu,
      numAndamento: numAnda,
    };
    console.log(numb);
    
        AsyncStorage.setItem('numeros', JSON.stringify(numb));

}, [numAnda, numConclu]);
*/

  async function addTask() {
    
      if (!taskTitle.trim()){
     return}
    ;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      status: taskStatus,
    };

     setTasks(prev => [...prev, newTask]);
/*
     if (taskStatus === 'em andamento'){setNumAnda(prev => prev + 1);
     }else{setNumConclu(prev => prev + 1);
     }
     const numb: Num ={
       numConcluida: numConclu,
       numAndamento: numAnda,
      };
      setNum([numb]);
      await AsyncStorage.setItem('numeros',JSON.stringify(numb));*/
      
  };

   function Limpar() {
    AsyncStorage.clear();
    refresh()
  }
 function refresh(){
  router.replace(pathname as any);
 }

  return (
    <View style={styles.container}>
      
    
    <View style={styles.view}>

      <Text style={styles.title}>Gerenciador de Tarefas</Text>

<TouchableOpacity style={styles.progressBtn}
        onPress={() => router.push({
            pathname: "/(tabs)/desenvolvimento",})}>
                <Text style={styles.addText}>Ver progresso</Text>
        </TouchableOpacity>
</View>
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
      <TouchableOpacity style={styles.cleanBtn} onPress={Limpar}>
        <Text style={styles.addText}>Limpar Tarefas</Text>
      </TouchableOpacity>

      <FlatList 
        
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.view}>
          <Text style={styles.taskItem}>
            {item.title} - {item.status}
          </Text>
          <TouchableOpacity style={styles.editBtn}>
              <TouchableOpacity onPress={() => router.push({
            pathname: "/EditTask",
            params: { id: item.id ,

            }})}>
        <Text>Editar</Text>
          </TouchableOpacity>
            </TouchableOpacity>
        
        </View>
        )}
      
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  progressBtn:{
    backgroundColor: '#5ec775ff',
    marginLeft: 'auto',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'flex-end'
    
  },
  editBtn:{
    marginLeft: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  view:{
    
    flexDirection: 'row',
    padding: 4,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
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
  cleanBtn: {
    backgroundColor: '#e75b51ff',
    padding: 12,
    borderRadius: 8,
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
    flex: 1,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
