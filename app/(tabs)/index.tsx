import React, {useState} from "react";

import { Image, StyleSheet, Platform, View, Text, TextInput, FlatList,TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
//import {MeiliSearch} from "meilisearch";

const { MeiliSearch } = require ('meilisearch');

const client = new MeiliSearch({
  host: '172.233.129.212',
  apiKey: '9674910d2440954f136b0e1537007301972088cd71ca00c44008f4a9a024',
});



  
export default function HomeScreen() {
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = async (text: string) =>{
    setQuery(text);

    if(text.trim()===""){
      setResults([]);
      return;
    }

    try{
      const index = client.index("movies");
      const searchResults = await index.search(text,{limit:10,});
      setResults(searchResults.hits);
    } catch (error){
      console.error("error buscando en meilisearch: ", error);
    }
  };

  const renderItem = ({item} : {item:any}) =>(
    <TouchableOpacity style={styles.resultItem}>
      
      <Text style={styles.title}> {item.title}</Text>
      <Text style={styles.genre}> {item.genre}</Text>

    </TouchableOpacity>
  );

  return (

    <View style={styles.container}>
      <Text style={styles.header}>Buscador de peliculas</Text>
      <TextInput
        style = {styles.input}
        placeholder="Busca una pelicula..."
        value={query}
        onChangeText={searchMovies}
      />
      <FlatList
        data= {results}
        keyExtractor={(item) =>item.id.toString()}
        renderItem = { renderItem }
        contentContainerStyle = {styles.listContainer}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input:{
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  listContainer:{
    marginTop: 10,
  },
  resultItem:{
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title:{
    fontSize: 18,
    fontWeight: "bold",
  },
  genre:{
    fontSize: 14,
    color: "#6c757d",
  },
});

//exports moduls = HomeScreen