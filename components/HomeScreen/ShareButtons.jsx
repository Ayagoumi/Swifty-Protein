import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
  Share
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as MediaLibrary from "expo-media-library";

export default function ShareButtons({ renderRef, viewShotRef }) {

  const takeScreenShot = async () => {
    try {
      const res = await viewShotRef.current.capture();
      Share.share({ url: res });
      // await Sharing.shareAsync(res, { dialogTitle: "Share this image" });
      let result = await MediaLibrary.requestPermissionsAsync(true);
      if (result.status === "granted") {
        let r = await MediaLibrary.saveToLibraryAsync(res);
      }
      Alert.alert("Success", "ScreenShot Successfully");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={{
      position: "absolute",
      bottom: 20,
      right: 25,
      zIndex: 2,
    }}>
      <View
        style={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity onPress={() => takeScreenShot(renderRef.current)}>
          <View
            style={{
              backgroundColor: "#D8D8D8",
              width: 40,
              height: 40,
              fontSize: 20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="plus" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}