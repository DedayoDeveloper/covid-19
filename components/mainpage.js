// @ts-nocheck
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  RecyclerViewBackedScrollView,
  ScrollView,
  ImageBackground,
  Modal,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Image,
} from 'react-native';



let screenWidth = Dimensions.get('window').width;

const colors = ['#5C6BC0', '#009688', '#F44336'];

const chartConfig = {
  backgroundGradientFrom: 'red',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'red',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

export default class mainpage extends Component {
  constructor(props, {navigation}) {
    super(props);
    this.state = {
      dataSource: [],
      country: null,
      modalVisible: false,
      result: [0],
      secondView: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getCountry = async () => {
    this.setModalVisible(true);

    const response = await fetch(
      'https://covidapi.mybluemix.net/api/v1/cases/countries',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json().catch(error => {
      console.log('ERROR OCCURED: ' + error.message);
      Alert.alert('ERROR OCCURED,  Try Again ');
    });
    const countrydata = data.countries.filter(obj => {
      return obj.country == this.state.country;
    });
    this.setState({result: countrydata});
    console.log(this.state.result[0].active);
    this.setModalVisible(false);
    console.log('DEBUGGING!!');
    this.setState({secondView: true});;
  };

  componentDidMount = async () => {
    this.setModalVisible(true);
    const response = await fetch(
      'https://covidapi.mybluemix.net/api/v1/cases/total',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const dataFromApi = await response.json().catch(error => {
      console.log('ERROR OCCURED: ' + error.message);
      Alert.alert('ERROR OCCURED,  Try Again ');
    });
    this.setState({dataSource: dataFromApi});
    console.log(
      'THIS IS THE RESULT +++++============' + JSON.stringify(dataFromApi),
    );
    this.setModalVisible(false);

    // this.props.naviagtion.navigate('allcountries', {datasource: data});
  };

render() {
    var activeData = this.state.dataSource;
    console.log('ACTIVE DATA');
    console.log(activeData);
    // var deaths = parseFloat(activeData.deaths);
    // console.log(deaths);
    // var newDeaths = deaths.replace(/,/g, '');
    // console.log(newDeaths);

  if (this.state.modalVisible) {
      return (
        <View style={styles.indicatorStyle}>
          <Image source={require('./img/modalimagetwo.jpg')} />
          <Text>LOADING... Please wait!</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if  (this.state.secondView == true) {
      return (
        <ImageBackground
          source={require('./img/img2.png')}
          style={styles.chartContainer}>
          <Image source={require('./img/globeone.png')} />
          <View>
            <Text style={styles.header}>COVID-19</Text>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.boldTextOne}>
                TOTAL CASES = {this.state.result[0].total}
              </Text>
              <Text style={styles.boldTextThree}>
                ACTIVE CASES = {this.state.result[0].active}
              </Text>
              <Text style={styles.boldTextTwo}>
                RECOVERED = {this.state.result[0].recovered}
              </Text>
              <Text style={styles.boldTextFour}>
                DEATHS = {this.state.result[0].deaths}
              </Text>
            </View>

            <View style={styles.btn}>
              <TextInput
                placeholder="e.g Nigeria"
                selectionColor="#0000FF"
                underlineColorAndroid="#ffffff"
                placeholderTextColor="#ffffff"
                onChangeText={country => this.setState({country})}
                accessibilityLabel="Get country statistics"
                style={styles.countrytextholder}
              />

          <Button title="Check Country" onPress={() => this.getCountry()} />
            </View>
          </ScrollView>
        </ImageBackground>
      );

    }
    else {
      //  deaths = deaths.replace(/,/g,'');
      //  console.log(deaths);

      return (
        <ImageBackground
          source={require('./img/img2.png')}
          style={styles.chartContainer}>
          <Image source={require('./img/globeone.png')} />
          <View>
            <Text style={styles.header}>COVID-19</Text>
          </View>
          <ScrollView>
            <View>
              <Text style={styles.boldTextOne}>
                TOTAL CASES = {this.state.dataSource.total}
              </Text>
              <Text style={styles.boldTextThree}>
                ACTIVE CASES = {this.state.dataSource.active}
              </Text>
              <Text style={styles.boldTextTwo}>
                RECOVERED = {this.state.dataSource.recovered}
              </Text>
              <Text style={styles.boldTextFour}>
                DEATHS = {this.state.dataSource.deaths}
              </Text>
            </View>

  <View style={styles.btn}>
              <TextInput
                placeholder="e.g Nigeria"
                selectionColor="#0000FF"
                underlineColorAndroid="#ffffff"
                placeholderTextColor="#ffffff"
                onChangeText={country => this.setState({country})}
                accessibilityLabel="Get country statistics"
                style={styles.countrytextholder}
              />

              <Button title="Check Country" onPress={() => this.getCountry()} />
            </View>
          </ScrollView>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },

  chartContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  card: {
    width: 100,
    height: 100,

  },

  boldTextOne: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
  },

  boldTextTwo: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },

  boldTextThree: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },

  boldTextFour: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  pieChartStyle: {
    borderWidth: 1,
    borderColor: 'white',
  },
  indicatorStyle: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  backgroundImage: {
    width: 100,
    height: 100,
  },
  header: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 50,

  },

btn: {
    width: 200,
    alignContent: 'center',
    alignContent: 'center',
    justifyContent: 'center',


  },

  countrytextholder: {
    color: 'white',
  },


});
