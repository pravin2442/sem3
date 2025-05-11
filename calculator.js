import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState(''); // 👉 Store selected operator

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('❗ Please enter valid numbers');
      return;
    }

    switch (operator) {
      case '+':
        setResult(`Result: ${a + b}`);
        break;
      case '-':
        setResult(`Result: ${a - b}`);
        break;
      case '*':
        setResult(`Result: ${a * b}`);
        break;
      case '/':
        setResult(b !== 0 ? `Result: ${a / b}` : '❗ Cannot divide by zero');
        break;
      default:
        setResult('❗ Please select an operator');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Simple Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
        returnKeyType="done"
        onSubmitEditing={calculate}
      />

      <View style={styles.buttonRow}>
        {['+', '-', '*', '/'].map((op) => (
          <TouchableOpacity
            key={op}
            style={styles.button}
            onPress={() => setOperator(op)} // 👉 Just set operator here
          >
            <Text style={styles.buttonText}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.equalButton]}
        onPress={calculate} // 👉 Calculate on "=" button press
      >
        <Text style={styles.buttonText}>=</Text>
      </TouchableOpacity>

      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 8,
    elevation: 2,
    width: '22%',
    alignItems: 'center',
  },
  equalButton: {
    backgroundColor: '#27ae60',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  result: {
    fontSize: 22,
    textAlign: 'center',
    color: '#444',
    marginTop: 10,
  },
});
