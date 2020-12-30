import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
export default class WorldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    this.getData();
    this.getPopulation();
  }
  getData() {
    return fetch('https://covid-19-data.p.rapidapi.com/totals', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '732a2643d3mshf3d16ace3a873aap16b12ajsn3c1d74acfcff',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getPopulation() {
    fetch('https://world-population.p.rapidapi.com/worldpopulation', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e111597f2amsh6f8578305d267a7p1598dfjsn58f2368da362',
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            totalPopulation: responseJson.body.world_population,
          },
          function () {}
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: '20%',
            marginBottom: 2,
          }}
          source={require('./img.jpg')}
        />

        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: 15,
          }}>
          Last Updated: {JSON.stringify(this.state.dataSource[0].lastUpdate)}
        </Text>

        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'dodgerblue',
            marginBottom: 5,
            width: '80%',
          }}>
          <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
            Confirmed Cases
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'green',
            borderStyle: 'solid',
            backgroundColor: 'white',
            width: '50%',
            borderBottomColor: 'grey',
            borderBottomWidth: 4,
            marginBottom: 3,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'tomato',
              fontWeight: 'bold',
            }}>
            {JSON.stringify(this.state.dataSource[0].confirmed)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: 20,
          }}>
          {Math.round(
            ((100 * JSON.stringify(this.state.dataSource[0].confirmed)) /
              JSON.stringify(this.state.totalPopulation)) *
              100
          ) / 100}
          % of world population
        </Text>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'tomato',
            marginBottom: 5,
            width: '80%',
          }}>
          <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
            Critical Cases
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'green',
            borderStyle: 'solid',
            backgroundColor: 'white',
            width: '50%',
            borderBottomColor: 'grey',
            borderBottomWidth: 4,
            marginBottom: 3,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'tomato',
              fontWeight: 'bold',
            }}>
            {JSON.stringify(this.state.dataSource[0].critical)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: 20,
          }}>
          {Math.round(
            ((100 * JSON.stringify(this.state.dataSource[0].critical)) /
              JSON.stringify(this.state.dataSource[0].confirmed)) *
              100
          ) / 100}
          % of confirmed cases
        </Text>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#00cc00',
            marginBottom: 5,
            width: '80%',
          }}>
          <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
            Recovered
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'green',
            borderStyle: 'solid',
            backgroundColor: 'white',
            width: '50%',
            borderBottomColor: 'grey',
            borderBottomWidth: 4,
            marginBottom: 3,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'tomato',
              fontWeight: 'bold',
            }}>
            {JSON.stringify(this.state.dataSource[0].recovered)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: 20,
          }}>
          {Math.round(
            ((100 * JSON.stringify(this.state.dataSource[0].recovered)) /
              JSON.stringify(this.state.dataSource[0].confirmed)) *
              100
          ) / 100}
          % of confirmed cases
        </Text>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: 'red',
            marginBottom: 5,
            width: '80%',
          }}>
          <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
            Deaths
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'green',
            borderStyle: 'solid',
            backgroundColor: 'white',
            width: '50%',
            borderBottomColor: 'grey',
            borderBottomWidth: 4,
            marginBottom: 3,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'tomato',
              fontWeight: 'bold',
            }}>
            {JSON.stringify(this.state.dataSource[0].deaths)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'grey',
            marginBottom: 20,
          }}>
          {Math.round(
            ((100 * JSON.stringify(this.state.dataSource[0].deaths)) /
              JSON.stringify(this.state.dataSource[0].confirmed)) *
              100
          ) / 100}
          % of confirmed cases
        </Text>
      </SafeAreaView>
    );
  }
}
