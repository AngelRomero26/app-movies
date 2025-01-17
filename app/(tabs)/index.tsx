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


const documents = [
    { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
    { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
    { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
    { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
    { id: 5, title: 'Moana', genres: ['Fantasy', 'Action']},
    { id: 6, title: 'Philadelphia', genres: ['Drama'] },
]

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
    backgroundColor: "#f8f9fa"
  },
  header:{
  },
  input:{
  },
  listContainer:{

  },
  resultItem:{

  },
  title:{

  },
  genre:{

  },
});

//exports moduls = HomeScreen