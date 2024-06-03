import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function App() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=64930df30e9240b6be3214240242205&q=${latitude},${longitude}&lang=pt`;
      const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=64930df30e9240b6be3214240242205&q=${latitude},${longitude}&days=3&lang=pt`;

      // Fetch current weather
      fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => setError(error.message));

      // Fetch weather forecast
      fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => setForecastData(data.forecast.forecastday))
        .catch((error) => setError(error.message));
    }
  }, [latitude, longitude]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error ? (
        <Text>Erro: {error}</Text>
      ) : weatherData && forecastData ? (
        <>
          <View style={styles.weatherContainer}>
            <View>
              <Image 
                source={{ uri: `https:${weatherData.current.condition.icon}` }}
                style={styles.weatherIcon}
              />
            </View>
            <View>
              <Text style={styles.location}>{weatherData.location.name}</Text>
              <Text style={styles.temp}>{weatherData.current.temp_c} °C</Text>
              <Text>{weatherData.current.condition.text}</Text>
            </View>
          </View>
          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>Previsão do Tempo</Text>
            <View style={styles.forecastRow}>
              {forecastData.map((day, index) => (
                <View key={index} style={styles.forecastDay}>
                  <Text>{day.date}</Text>
                  <Image 
                    source={{ uri: `https:${day.day.condition.icon}` }}
                    style={styles.forecastIcon}
                  />
                  <Text>{day.day.avgtemp_c} °C</Text>
                  <Text>{day.day.condition.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  temp:{
    fontSize:40
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  location: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  forecastContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forecastDay: {
    alignItems: 'center',
    marginHorizontal: 10,

  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
});
