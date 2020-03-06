import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  Button,
  AsyncStorage,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';

// import {
//   TextInput,
//   TouchableWithoutFeedback,
// } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

export default class EditContact extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Edit Contact',
  };
  constructor(props) {
    super(props);
    this.state = {
      isFocused1: true,
      isFocused2: false,
      isFocused3: false,
      isFocused4: false,
      info: [],
      prevInfo: [],
      name: '',
      id: 0,
      surname: '',
      workplace: '',
      title: '',
      email: '',
      isSave: false,
      contactNumber: 0,
      contactPhoto: null,
      isImageModal: false,
    };
  }

  componentDidMount = () => {
    const data = this.props.navigation.getParam('info', 'NO-User');
    console.log('Edit' + JSON.stringify(data));
    this.setState({
      name: data.name,
      surname: data.surname,
      workplace: data.workplace,
      contactNumber: data.contactNumber,
      id: data.id,
      email: data.email,
      contactPhoto: data.Photo,
      isImageModal: false,
    });
  };

  toggleModal = () => {
    this.setState({
      isImageModal: !this.state.isImageModal,
    });
  };

  _launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      compressImageQuality: 0.8,
      cropping: true,
    }).then(image => {
      console.log('Image: ' + JSON.stringify(image));
      this.setState({contactPhoto: image.path});
      this.setState({isSave: true});
      this.cleanTempImages();
    });
  };

  _pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.8,
      cropping: true,
    }).then(image => {
      console.log('Image: ' + JSON.stringify(image));
      this.setState({contactPhoto: image.path});
      this.setState({isSave: true});
      this.cleanTempImages();
    });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permission.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  cleanTempImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  saveEditedContact = () => {
    if (this.state.isSave) {
      //update

      let uplid = this.state.id;
      AsyncStorage.getItem('data').then(value => {
        let rlist = JSON.parse(value);
        for (let i = 0; i < rlist.length; i++) {
          if (rlist[i].id == uplid) {
            rlist[i].name = this.state.name;
            rlist[i].contactNumber = this.state.contactNumber;
            rlist[i].Photo = this.state.contactPhoto;
            rlist[i].surname = this.state.surname;
            rlist[i].workplace = this.state.workplace;
            rlist[i].email = this.state.email;

            AsyncStorage.setItem('data', JSON.stringify(rlist));
            this.cleanTempImages();
            this.props.navigation.navigate('ContactsHome');
          }
        }
      });
      //update
      ToastAndroid.show('Saved', ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } else {
      ToastAndroid.show('Edit First', ToastAndroid.SHORT);
    }
  };

  render() {
    const {navigation} = this.props;
    const user_info = navigation.getParam('info', 'NO-User');
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 83,
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
                marginLeft: '2%',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('ContactsHome');
                }}>
                <View>
                  <Text style={{fontSize: 20, color: '#f50'}}>Cancel</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                width: '90%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{marginRight: '30%'}}>
                <Text style={{fontSize: 20, color: '#000000'}}>
                  Edit Contact
                </Text>
              </View>
              <View style={{marginRight: '10%'}}>
                <Text
                  onPress={() => {
                    this.saveEditedContact();
                  }}
                  style={{
                    fontSize: 20,
                    color: this.state.isSave ? '#f50' : '#ccc',
                  }}>
                  Save
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: '#ccc',
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.contactPhoto && (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.toggleModal();
                }}>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                  }}
                  source={{uri: this.state.contactPhoto}}></Image>
              </TouchableWithoutFeedback>
            )}
            {!this.state.contactPhoto && (
              <View
                style={{
                  backgroundColor: '#ccc',
                  borderRadius: 10,
                  height: 100,
                  width: 100,
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  onPress={() => {
                    this.setState({isImageModal: true});
                  }}>
                  Click here to select Image
                </Text>
              </View>
            )}
          </View>
          <View style={{marginLeft: 25, width: '70%'}}>
            <View>
              <TextInput
                autoFocus={true}
                onFocus={() => {
                  this.setState({isFocused1: true});
                }}
                onBlur={() => {
                  this.setState({isFocused1: false});
                }}
                underlineColorAndroid={'transparent'}
                style={{height: 40}}
                onChangeText={text => {
                  this.setState({isSave: true});
                  this.setState({name: text});
                }}
                placeholder="Name here"
                value={this.state.name}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused1 ? '#f50' : '#ccc',
                }}></View>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  this.setState({isFocused2: true});
                }}
                onBlur={() => {
                  this.setState({isFocused2: false});
                }}
                underlineColorAndroid={'transparent'}
                style={{height: 40}}
                onChangeText={() => {
                  this.setState({isSave: true});
                }}
                placeholder="Surname here"
                value={this.state.surname}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused2 ? '#f50' : '#ccc',
                }}></View>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  this.setState({isFocused3: true});
                }}
                onChangeText={() => {
                  this.setState({isSave: true});
                }}
                onBlur={() => {
                  this.setState({isFocused3: false});
                }}
                underlineColorAndroid={'transparent'}
                style={{height: 40}}
                placeholder="Workplace here"
                value={this.state.workplace}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused3 ? '#f50' : '#ccc',
                }}></View>
            </View>
            {/* <View>
              <TextInput
                onFocus={() => {
                  this.setState({isFocused4: true});
                }}
                onBlur={() => {
                  this.setState({isFocused4: false});
                }}
                onChangeText={() => {
                  this.setState({isSave: true});
                }}
                underlineColorAndroid={'transparent'}
                style={{height: 40}}
                placeholder="Title here"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused4 ? '#f50' : '#ccc',
                }}></View>
            </View> */}
          </View>
        </View>
        <View style={{marginTop: 50}}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text>Mobile</Text>
          </View>
          <View
            style={{
              height: '70%',
              width: 0.8,
              backgroundColor: '#ccc',
              marginLeft: 50,
            }}></View>
          <View style={{marginLeft: 30}}>
            <TextInput
              onChangeText={text => {
                this.setState({contactNumber: text});
              }}
              keyboardType="number-pad"
              maxLength={10}
              value={this.state.contactNumber}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text>Email</Text>
          </View>
          <View
            style={{
              height: '70%',
              width: 0.8,

              marginLeft: 50,
            }}></View>
          <View style={{marginLeft: 30}}>
            <TextInput
              onChangeText={text => {
                this.setState({email: text});
                this.setState({isSave: true});
              }}
              placeholder="Email Here"
              value={this.state.email}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}></View>

        <Modal
          backdropColor="#ccc"
          animationIn="bounceIn"
          animationOut="bounceOut"
          animationOutTiming={100}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          isVisible={this.state.isImageModal}>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 20}}>Please select the image</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                justifyContent: 'space-evenly',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.toggleModal();
                    this._launchCamera();
                  }}>
                  <Image
                    source={require('../assets/cam.png')}
                    style={{width: 40, height: 40, tintColor: '#f50'}}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.toggleModal();
                    this._pickImage();
                  }}>
                  <Image
                    source={require('../assets/file.png')}
                    style={{width: 40, height: 40, tintColor: 'green'}}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
                marginBottom: 20,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                color="grey"
                title="Cancel"
                onPress={() => {
                  this.toggleModal();
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
