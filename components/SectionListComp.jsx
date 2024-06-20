import React from "react";
import {
  SectionList,
  Dimensions,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  Text,
  View,
  SafeAreaView
} from "react-native";

const SectionListComponent = () => {
  const renderItem = ({ item }) =>
    <View>
      <Text>
        {" "}{item}{" "}
      </Text>
    </View>;

  const data = [
    {
      id: "1",
      data: ["Lorem ipsum dolor sit amet"]
    },
    {
      id: "2",
      data: ["Lorem ipsum dolor sit amet"]
    },
    {
      id: "3",
      data: ["Lorem ipsum dolor sit amet"]
    },
    {
      id: "4",
      data: ["Lorem ipsum dolor sit amet"]
    },
    {
      id: "5",
      data: ["Lorem ipsum dolor sit amet"]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
      style={styles.sectionView}
        sections={data}
        renderItem={renderItem}
        keyExtractor={section => section.id}
        invrted={false}
        horizontal={false}
        renderSectionHeader={({ section }) =>
          <Text>
            {" "}{section.id}{" "}
          </Text>}
        renderSectionFooter={({ section }) =>
          <Text>
            {" "}{section.id}{" "}
          </Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    paddingTop: StatusBar.currentHeight
  },
  sectionView: {
    backgroundColor: "pink"
    // marginHorizontal: 20,
  },
  text: {
    fontSize: 42
  }
});
export default SectionListComponent;