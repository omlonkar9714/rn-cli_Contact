import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ToastAndroid,
  Linking,
  AsyncStorage,
  Alert,
  Button,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
// import RNImmediatePhoneCall from "react-native-immediate-phone-call";

export default class ViewContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModal: false,
      contactNumber: 0,
      name: '',
      Photo: null,
    };
  }
  ItemSeparatorComponent() {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#ccc',
        }}
      />
    );
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    const user_info = navigation.getParam('info', 'NO-User');
    // let uplid = user_info.id;
    // AsyncStorage.getItem('data').then(value => {
    //   let rlist = JSON.parse(value);
    //   for (let i = 0; i < rlist.length; i++) {
    //     if (rlist[i].id == uplid) {
    //       this.setState({
    //         contactNumber: rlist[i].Photo,
    //         name: rlist[i].name,
    //         Photo: rlist[i].Photo,
    //       });

    //       AsyncStorage.setItem('data', JSON.stringify(rlist));
    //       this.props.navigation.navigate('ViewContact');
    //     }
    //   }
    // });
  };

  toggleModal = () => {
    this.setState({
      isDeleteModal: !this.state.isDeleteModal,
    });
  };

  deleteContact = user_info => {
    let delid = user_info.id;
    AsyncStorage.getItem('data').then(value => {
      let rlist = JSON.parse(value);
      for (let i = 0; i < rlist.length; i++) {
        if (rlist[i].id == delid) {
          rlist.splice(i, 1);
          AsyncStorage.setItem('data', JSON.stringify(rlist));
          this.props.navigation.navigate('ContactsHome');
        }
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const user_info = navigation.getParam('info', 'NO-User');

    return (
      <View style={styles.container1}>
        <StatusBar backgroundColor="white" barStyle="light-content"></StatusBar>
        <View
          style={{
            height: 56,
            backgroundColor: 'transparent',
            width: '100%',
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '4%',
                alignItems: 'center',
              }}>
              <View>
                <View>
                  <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../assets/back-arr.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#f50',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                width: '90%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{marginRight: '8%'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../assets/star.png')}
                    style={{width: 20, height: 20, tintColor: '#f50'}}
                  />
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('EditContact', {
                    info: navigation.getParam('info', 'NO-User'),
                  });
                }}>
                <View style={{marginRight: '5%'}}>
                  <Text style={{fontSize: 20, color: '#f50'}}>Edit</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View style={styles.avtar}>
              <View style={styles.avtar}>
                {user_info.Photo && (
                  <Avatar
                    size={150}
                    rounded
                    source={{
                      uri: user_info.Photo,
                    }}
                  />
                )}
                {!user_info.Photo && (
                  <View
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 75,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ccc',
                    }}>
                    <Text style={{fontSize: 20}}>No Photo</Text>
                  </View>
                )}

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {user_info.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                marginTop: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  +91 {user_info.contactNumber}
                </Text>
                <Text style={{fontSize: 15, color: '#ccc'}}>
                  Mobile | India
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                    backgroundColor: '#ffccb3',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      let number = user_info.contactNumber;
                      if (Platform.OS === 'ios') {
                        number = 'telprompt:${' + number + '}';
                      } else {
                        number = 'tel:${' + number + '}';
                      }
                      Linking.openURL(number);
                    }}>
                    <Image
                      source={require('../assets/phone.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#f50',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                    backgroundColor: '#ffccb3',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 15,
                  }}>
                  <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../assets/video.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#f50',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                    backgroundColor: '#ffccb3',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../assets/sms.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#f50',
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                  }}
                  source={{
                    uri:
                      'https://www.xda-developers.com/files/2017/11/WhatsApp.png',
                  }}></Image>
              </View>
              <View>
                <Text style={{fontWeight: '100', fontSize: 15}}>Whatsapp</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  Message +91 {user_info.contactNumber}
                </Text>
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  Voice call +91 {user_info.contactNumber}
                </Text>
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  Video call +91 {user_info.contactNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    marginRight: 10,
                    borderRadius: 7.5,
                  }}
                  source={{
                    uri:
                      'https://library.kissclipart.com/20181204/je/kissclipart-google-g-clipart-g-suite-google-search-c6b931e9568ec36d.jpg',
                  }}></Image>
              </View>
              <View>
                <Text style={{fontWeight: '100'}}>Google</Text>
              </View>
            </View>

            <View style={{marginTop: 20}}>{this.ItemSeparatorComponent()}</View>

            <View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 17}}>Share Contacts</Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 17}}>Add to VIP Contacts Group</Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 17}}>Add to Blacklist</Text>
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  onPress={this.toggleModal}
                  // this.deleteContact();

                  style={{fontSize: 17, color: 'red'}}>
                  Delete Contact
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal
          backdropColor="#ccc"
          animationIn="bounceIn"
          animationOut="bounceOut"
          animationOutTiming={100}
          style={{justifyContent: 'center', alignItems: 'center'}}
          isVisible={this.state.isDeleteModal}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              width: '80%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 20}}>
                You want to delete this contact?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Button
                  color="#f50"
                  title="Delete"
                  onPress={() => {
                    this.toggleModal();
                    this.deleteContact(user_info);
                  }}
                />
              </View>
              <View>
                <Button
                  color="black"
                  title="Cancel"
                  onPress={this.toggleModal}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {flex: 1},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avtar: {
    height: 210,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
