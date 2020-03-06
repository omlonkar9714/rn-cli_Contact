import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//////////////////////////////////////////////////////////////////////////// redux example below

// import React, { Fragment, Component } from "react";
// import { SafeAreaView, StyleSheet, View, Button, Text } from "react-native";

// class App extends Component {
//   state = { count: 0 };
//   decrementCount() {
//     let { count } = this.state;
//     count--;
//     this.setState({
//       count
//     });
//   }
//   incrementCount() {
//     let { count } = this.state;
//     count++;
//     this.setState({
//       count
//     });
//   }
//   render() {
//     const { count } = this.state;
//     return (
//       <View styles={styles.container}>
//         <View style={{ marginTop: 80 }}>
//           <Button title="increment" onPress={() => this.incrementCount()} />
//         </View>
//         <View>
//           <Text>{count}</Text>
//         </View>
//         <View>
//           <Button title="decrement" onPress={() => this.decrementCount()} />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });

// export default App;
