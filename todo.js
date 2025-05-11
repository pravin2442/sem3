import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which task is being edited

  const addOrUpdateTask = () => {
    if (task.trim() === '') return;

    if (editingId) {
      // Update existing task
      setTaskList(taskList.map(item => 
        item.id === editingId ? { ...item, title: task } : item
      ));
      setEditingId(null);
    } else {
      // Add new task
      setTaskList([...taskList, { id: Date.now().toString(), title: task }]);
    }

    setTask('');
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
    if (editingId === id) {
      setTask('');
      setEditingId(null);
    }
  };

  const editTask = (item) => {
    setTask(item.title);
    setEditingId(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />

      <Button title={editingId ? "Update Task" : "Add Task"} onPress={addOrUpdateTask} />

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editTask(item)}>
                <Text style={styles.editButton}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue',
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});
