import FlatListComponent from '../components/HomeScreen/FlatList';
import { View, StyleSheet, Text, TextInput, SafeAreaView, StatusBar, Keyboard, Dimensions } from 'react-native';
import { useEffect, useState, useRef, useContext } from 'react';
// import useOrientation from '../Hooks/useOrientation';

// const data = require('../assets/ligands.json');
import { LigandContext } from "../context/state";

export default function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const value = useContext(LigandContext);
  const data = value.state.data;
  const [sortData, setSortData] = useState(data);
  // const orientation = useOrientation();
  console.log("here");

  const handleOutsideClick = (e) => {
    Keyboard.dismiss();
    setSearch('');
  }

  // useEffect(() => {
  //   setSortData(data);
  // }, [data]);

  useEffect(() => {
    if (search.length > 0) {
      const newData = data?.filter(item => {
        const itemData = `${item.toUpperCase()}`;
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSortData(newData);
    } else {
      setSortData(data);
    }
  }, [search]);

  return (
    <View navigation={navigation} style={{
      ...styles.container,
      // paddingVertical: orientation === "portrait" ? 0 : 20,
    }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarText}>Search for{"\n"}a Ligand</Text>
          <TextInput placeholder='Search' style={styles.searchBar}
            onChangeText={(text) => setSearch(text)}
            onOuterFocus={() => handleOutsideClick}
            clearTextOnFocus={true}
          />
        </View>
      </SafeAreaView>
      <FlatListComponent DATA={sortData} navigation={navigation} />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBarContainer: {
    justifyContent: 'space-evenly',
    height: 120,
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  searchBarText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 50,
    width: '85%',
    paddingHorizontal: 15,
  },
});