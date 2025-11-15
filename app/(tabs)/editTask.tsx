import { useLocalSearchParams } from "expo-router";
import React  from 'react';
import { StyleSheet, Text, View, FlatList , TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Task } from "./interface/tasks";
import { useRouter, router , usePathname} from "expo-router";


export default function EditTask() {
  const pathname = usePathname();
  
    const [task, setTask] = useState<Task | null>(null);
  
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;


  useEffect(() => {
    if (taskId) {
      loadTask();
    }
  }, [taskId]);


  async function loadTask() {
    const json = await AsyncStorage.getItem("tasks");

    if (!json){
      setTask(null);
      return;}

    const tasks: Task[] = JSON.parse(json);
    const found = tasks.find((t) => {
  return String(t.id) === String(taskId);
});


    setTask(found || null);


    
  }

  function botaoTrocaStatus(){
  
if (task?.status === 'em andamento'){
  return(
    <View>
              <TouchableOpacity style={styles.editBtn} onPress={() => editTask('concluída')}>
        <Text>trocar para concluída</Text>
          </TouchableOpacity>
  </View>
  )
}
return(
    <View>
              <TouchableOpacity style={styles.editBtn} onPress={() => editTask('em andamento')}>
        <Text>trocar para em andamento</Text>
          </TouchableOpacity>
  </View>
  );
}
    async function editTask(newStatus: string) {
      if (!taskId) return;

  try {
    const json = await AsyncStorage.getItem("tasks");
    if (!json) return;

    const tasks: Task[] = JSON.parse(json);

    // Atualizar a task
    const updated = tasks.map(t => {
      if (String(t.id) === String(taskId)) {
        return { ...t, status: newStatus };
      }
      return t;
    });

    // Salvar novamente no AsyncStorage
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));


    // Voltar para a tela anterior
    router.back();
    router.replace("/(tabs)/Index");
    // (Opcional) Forçar refresh da tela anterior
    

  } catch (e) {
    console.error("Erro ao editar task:", e);
  }

      
    }


      return (
        <View style={styles.container}>
          <Text style={styles.title}>Editor de Tarefas {id}</Text>

          <View>
      {task ? (
        <>
          <Text>ID: {task.id}</Text>
          <Text>Título: {task.title}</Text>
          <Text>Status: {task.status}</Text>
        </>
      ) : (
        <Text>Carregando tarefa...</Text>
      )}
      
    {botaoTrocaStatus()}
    </View>
    



          </View>
    );
}





const styles = StyleSheet.create({
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