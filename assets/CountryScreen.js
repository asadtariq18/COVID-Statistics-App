import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

import CountryStatisticsScreen from './CountryStatisticsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class CountryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      filteredDataSource: [],
      masterDataSource: [],
      query: '',
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    fetch('https://world-population.p.rapidapi.com/allcountriesname', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e111597f2amsh6f8578305d267a7p1598dfjsn58f2368da362',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          filteredDataSource: responseJson,
          masterDataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCountryData() {
    fetch('https://covid-19-data.p.rapidapi.com/country?name=italy', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e111597f2amsh6f8578305d267a7p1598dfjsn58f2368da362',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          countryData: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /* search(text) {
    const masterDataSource = filteredDataSource;
    const formattedQuery = text.toLowerCase();
    const filteredDataSource = _.filter(
      this.state.masterDataSource,
      (country) => {
        if (
          this.state.masterDataSource.body.countries.includes(formattedQuery)
        ) {
          return true;
        }
        return false;
      }
    );

    this.setState({ filteredDataSource, query: text });
  }*/
  countryStats(text, { navigation }) {
    navigation.push('CountryStatisticsScreen', { text });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Text style={styles.title}> Countries </Text>
        </View>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 20 }}
          placeholder="Search"
          //onChangeText={this.search()}
        />

        <FlatList
          style={{ flex: 1 }}
          data={this.state.masterDataSource.body.countries}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={(text) => this.countryStats({ text })}>
              <View
                style={{
                  borderColor: 'grey',
                  borderRadius: 15,
                  borderBottomWidth: 1,
                  justifyContent: 'space-evenly',
                }}>
                <Text style={styles.text}> {item}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </SafeAreaView>
    );
  }
}

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Countries">
        <Stack.Screen name="Countries" component={CountryScreen} />
        <Stack.Screen
          name="Country Statistic"
          component={CountryStatisticsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
    fontSize: 30,
    padding: 20,
  },
  text: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
