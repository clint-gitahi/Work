import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';

class ReviewScreen extends Component {
  // static navigationOptions = {
  //   title: 'Review Jobs',
  //   tabBarIcon: {
  //     icon: ({ tintColor }) => {
  //       return <Icon name="favorite" size={30} color={tintColor} />;
  //     }
  //   },
  //   header: ({ navigate }) => {
  //     return {
  //       headerRight: (
  //         <Button
  //           title="Settings"
  //           onPress={() => navigate('settings')}
  //           backgroundColor="rgba(0,0,0,0)"
  //           color="rgba(0, 122, 255, 1)"
  //         />
  //       ),
  //       style: {
  //         marginTop: Platform.OS === 'android' ? 24 : 0
  //       }
  //     };
  //   }
  // }

  static navigationOptions = {
    headerRight: <Button title="Info" />
  }

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {jobtitle, longitude, latitude,
        company, formattedRelativeTime, url, jobkey
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      }
      return (
        <Card key={jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      )
    })
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    )
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
