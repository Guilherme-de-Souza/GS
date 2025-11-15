import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from './interface/tasks';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { useNavigation } from '@react-navigation/native';


type editTaskProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'editTask'>;
};

export default function editTask() {

    



      return (
        <View style={styles.container}>
          <Text style={styles.title}>Editor de Tarefas</Text>
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