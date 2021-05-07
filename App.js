import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Filter from "./components/Filter";

const data = {
  Crown: [
    { id: "crown-pic1", src: require("./assets/crown-pic1.png") },
    { id: "crown-pic2", src: require("./assets/crown-pic2.png") },
    { id: "crown-pic3", src: require("./assets/crown-pic3.png") }
  ],
  Flowers: [
    { id: "flower-pic1", src: require("./assets/flower-pic1.png") },
    { id: "flower-pic2", src: require("./assets/flower-pic2.png") },
    { id: "flower-pic3", src: require("./assets/flower-pic3.png") }
  ],
  Hairs: [
    { id: "hair-pic1", src: require("./assets/hair-pic1.png") },
    { id: "hair-pic2", src: require("./assets/hair-pic2.png") },
    { id: "hair-pic3", src: require("./assets/hair-pic3.png") },
    { id: "hair-pic4", src: require("./assets/hair-pic4.png") }
  ],
  Hats: [
    { id: "hat-pic1", src: require("./assets/hat-pic1.png") },
    { id: "hat-pic2", src: require("./assets/hat-pic2.png") }
  ],
  Others: [
    { id: "other-pic1", src: require("./assets/other-pic1.png") },
    { id: "other-pic2", src: require("./assets/other-pic2.png") },
    { id: "other-pic3", src: require("./assets/other-pic3.png") }
  ]
};

const filters = {
  "crown-pic1": require("./assets/crown-pic1.png"),
  "crown-pic2": require("./assets/crown-pic2.png"),
  "crown-pic3": require("./assets/crown-pic3.png"),
  "flower-pic1": require("./assets/flower-pic1.png"),
  "flower-pic2": require("./assets/flower-pic2.png"),
  "flower-pic3": require("./assets/flower-pic3.png"),
  "hair-pic1": require("./assets/hair-pic1.png"),
  "hair-pic2": require("./assets/hair-pic2.png"),
  "hair-pic3": require("./assets/hair-pic3.png"),
  "hair-pic4": require("./assets/hair-pic4.png"),
  "hat-pic1": require("./assets/hat-pic1.png"),
  "hat-pic2": require("./assets/hat-pic2.png"),
  "other-pic1": require("./assets/other-pic1.png"),
  "other-pic2": require("./assets/other-pic2.png"),
  "other-pic3": require("./assets/other-pic3.png")
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: "crown-pic1",
      selected: "Crown"
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  render() {
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <Image
            source={require("./assets/appIcon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Look Me....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face => (
            <Filter
              key={face.faceID}
              face={face}
              source={filters[this.state.current_filter]}
            />
          ))}
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}>
            <ScrollView
              contentContainerStyle={styles.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.keys(data).map(category => (
                <TouchableOpacity
                  key={`category-button-${category}`}
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        this.state.selected === category ? "#FFA384" : "#E7F2F8"
                    }
                  ]}
                  onPress={() =>
                    this.setState({
                      selected: category,
                      current_filter: data[category][0].id
                    })
                  }
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.lowerBottomContainer}>
            <ScrollView
              contentContainerStyle={styles.filters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {data[this.state.selected].map(filter_data => {
                return (
                  <TouchableOpacity
                    key={`filter-button-${filter_data.id}`}
                    style={[
                      styles.filterButton,
                      {
                        borderColor:
                          this.state.current_filter === filter_data.id
                            ? "#FFA384"
                            : "#FFFF"
                      }
                    ]}
                    onPress={() =>
                      this.setState({
                        current_filter: `${filter_data.id}`
                      })
                    }
                  >
                    <Image
                      source={filter_data.src}
                      style={styles.filterImage}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "row"
  },
  appIcon: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: 2,
    borderColor: "#FFA384",
    marginRight: RFValue(10)
  },
  appName: {
    color: "#FFA384",
    fontSize: RFValue(25),
    fontWeight: "800",
    fontStyle: "italic"
  },
  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
    backgroundColor: "#E7F2F8"
  },
  lowerTopContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerBottomContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE7BC"
  },
  categories: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  category: {
    width: RFValue(80),
    height: "70%",
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(5),
    borderWidth: 2
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterButton: {
    height: RFValue(70),
    width: RFValue(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(35),
    backgroundColor: "#E7F2F8",
    borderWidth: 5,
    marginRight: RFValue(20),
    marginBottom: RFValue(10)
  },
  filterImage: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    resizeMode: "contain"
  }
});
