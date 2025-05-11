// FULL CODE START
// expo install react-native-maps
// npm install react-native-maps
// npm start
// summary expo install react-native-maps
// how to i 
// node -v
//npm -v
//npm install -g expo-cli

 //expo init CalculatorApp
//cd CalculatorApp
// npm start
// https://opencagedata.com/dashboard#geocoding
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function App() {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(null);

  const fetchCoordinates = async (location) => {
    try {
      const API_KEY = '32dba265c30f45f39b3df5c5db3b4291'; // Your OpenCage API key
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length === 0) throw new Error('No results found');
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } catch (err) {
      Alert.alert('Geocoding Error', `Could not find location: ${location}`);
      return null;
    }
  };

  const handleCalculateFromNames = async () => {
    if (!location1 || !location2) {
      Alert.alert('Error', 'Please enter both locations');
      return;
    }

    const coord1 = await fetchCoordinates(location1);
    const coord2 = await fetchCoordinates(location2);

    if (coord1 && coord2) {
      setMarkers([coord1, coord2]);
      const dist = getDistance(
        coord1.latitude, coord1.longitude,
        coord2.latitude, coord2.longitude
      );
      setDistance(dist.toFixed(2));
    }
  };

  const reset = () => {
    setLocation1('');
    setLocation2('');
    setMarkers([]);
    setDistance(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Location ${index + 1}`}
            pinColor={index === 0 ? 'blue' : 'green'}
          />
        ))}
      </MapView>

      <View style={styles.panel}>
        <TextInput
          placeholder="Enter first location"
          style={styles.input}
          value={location1}
          onChangeText={setLocation1}
        />
        <TextInput
          placeholder="Enter second location"
          style={styles.input}
          value={location2}
          onChangeText={setLocation2}
        />
        <Button title="Calculate Distance" onPress={handleCalculateFromNames} />
        <View style={{ marginVertical: 10 }} />
        <Button title="Reset" color="red" onPress={reset} />
        {distance && <Text style={styles.result}>Distance: {distance} km</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
});
