import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
export default class FavoriteScreen extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
     var list = [
    { value: 'Pakistan', id: 20055 },
    { value: 'Turkey', id: 20053 },
    { value: 'France', id: 45652 }
];
    return (
      <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Text style={styles.title}> Favorites </Text>
      </View>
      <FlatList
        style={{ flexDirection: 'row' }}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => alert("In Progress")}>
            <View
              style={{justifyContent: 'space-evenly' }}>
              <Text style={styles.text}> {item.value} </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={{ color: '#888', marginBottom: 10, marginLeft: 110 }}>
        {' '}
        Touch any item to remove{' '}
      </Text>
    </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    paddingHorizontal: 30,
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  text: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,

  },
});




