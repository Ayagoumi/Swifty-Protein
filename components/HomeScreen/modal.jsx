import { View, StyleSheet, Text, Button } from 'react-native';
import { useState, useEffect } from 'react'
import Modal from 'react-native-modal';
import axios from 'axios';

const Coordinate = ({ coordLabel, coord }) => {
  return (
    <View style={styles.coordinateContainer}>
      <Text style={styles.coordinateLabel}>{coordLabel} :</Text>
      <Text style={styles.coordinate}>{parseFloat(coord?.toFixed(2))}</Text>
    </View>
  )
}

const AtomDetail = ({ DataType, DataValue, AddedStyle }) => {
  return (
    <View>
      <Text style={{ fontSize: 7, color: "#7F7F7F" }}>{DataType}</Text>
      <Text style={{ marginLeft: 4, }}>{DataValue}</Text>
    </View>
  )
}

export default function BottomHalfModal({ atom, CoordX, CoordY, CoordZ }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const closeModal = () => setIsModalVisible(!isModalVisible);

  const [atomDetail, setAtomDetail] = useState([])

  useEffect(() => {
    if (atom === "" || atom === undefined) {
      setAtomDetail([])
    }
    else {
      axios.get(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${atom?.toUpperCase()}`)
        .then(res => {
          setAtomDetail(res.data)
        })
    }
  }, [atom])

  return (
    <>
      {atomDetail.length !== 0 &&
        <Modal
          testID={'modal'}
          isVisible={isModalVisible}
          onSwipeComplete={closeModal}
          hasBackdrop={false}
          coverScreen={false}
          swipeDirection={['left', 'right']}
          style={styles.view}
        >
          <View style={styles.content}>
            <View style={styles.DetailContainer}>
              <View style={styles.atomContainer}>
                <Text style={styles.atomLabel}>{atomDetail.symbol}</Text>
                <Text style={{ fontSize: 10, }}>{atomDetail.name}</Text>
                <Text style={{ fontSize: 10, }}>{atomDetail.standardState}</Text>
              </View>
              <View style={styles.atomDetailContainer}>
                <Text style={{ fontSize: 13, marginBottom: 10, }}>Coordinates :</Text>
                <View style={styles.coordinatesContainer}>
                  <Coordinate coordLabel="X" coord={CoordX} />
                  <Coordinate coordLabel="Y" coord={CoordY} />
                  <Coordinate coordLabel="Z" coord={CoordZ} />
                </View>
              </View>
              <View style={styles.proteinContainer}>
                <AtomDetail DataType="Density :" DataValue={Number.parseFloat(atomDetail.density).toExponential()} />
                <AtomDetail DataType="Atomic Number :" DataValue={atomDetail.atomicNumber} />
              </View>
            </View>
          </View>
        </Modal>
      }
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  content: {
    borderRadius: 18,
    backgroundColor: 'white',
    paddingVertical: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 4,
    // borderColor: 'rgba(0, 0, 0, 0.1)',
    // flexDirection: 'column',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  DetailContainer: {
    // position: "absolute",
    width: "100%",
    // height: 90,
    // backgroundColor: "#fff",
    // bottom: 30,
    // borderRadius: 18,
    overflow: "hidden",
    flexDirection: 'row',
  },
  atomContainer: {
    width: "20%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  atomLabel: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
  },
  atomDetailContainer: {
    flex: 1,
    // height: "100%",
    // paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: 'column',
    paddingVertical: 15,
  },
  proteinContainer: {
    width: "20%",
    // height: "100%",
    justifyContent: "space-around",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  atomNameLabel: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
  },
  coordinatesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  coordinateContainer: {
    backgroundColor: "#D8D8D8",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  coordinateLabel: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    // marginBottom: 10,
  },
  coordinate: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
    paddingLeft: 3,
  },
});
