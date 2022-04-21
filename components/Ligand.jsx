import { View, StyleSheet, StatusBar, Dimensions, Text } from "react-native";
import { ProteinDetail } from "./HomeScreen/ProteinDetail";
import useOrientation from '../Hooks/useOrientation';
import { useEffect, useRef } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import SwitchButton from "./HomeScreen/SwitchButton";
import ZoomButtons from "./HomeScreen/ZoomButtons";
import BottomHalfModal from "./HomeScreen/modal";

export default function Ligand({ navigation, route }) {
  const headerHeight = useHeaderHeight();
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height - headerHeight;
  const containers = useRef(null)
  const orientation = useOrientation();

  return (
    <View style={{
      ...styles.ligandPage,
      width: orientation === 'portrait' ? width : width,
      height: orientation === "portrait" ? height : height,
    }}
      ref={containers}
    >
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <View style={styles.content}>
        <SwitchButton addedStyle={{ left: 20, top: 20, zIndex: 10, }}
          items={[
            {
              name: "F-P",
              value: 0,
            },
            {
              name: "P-C",
              value: 1,
            },
            {
              name: "P-A",
              value: 2,
            }
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", textAlign: "left", position: "absolute", top: 0, left: 0 }}>Hello</Text>
        </View>
      </View>
      <ZoomButtons ZoomIn={() => null} ZoomOut={() => null} />
      {/* <ProteinDetail atom="C" CoordX={100} CoordY={50} CoordZ={50} /> */}
      <BottomHalfModal atom="C" CoordX={100} CoordY={50} CoordZ={50} />
    </View>
  )
}

const styles = StyleSheet.create({
  ligandPage: {
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  content: {
    backgroundColor: "#000",
    opacity: 0.9,
    width: "100%",
    // height: "87%",
    flex: 1,
    // height: 20,
  }
})