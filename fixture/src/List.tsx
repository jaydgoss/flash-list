/** *
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  StyleSheet,
  Button,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListItem {
  value: number;
  type?: string;
}

let newItemIndexes = 1001;

const generateArray = (size: number): ListItem[] => {
  const arr = new Array<ListItem>(size);
  for (let i = 0; i < size; i++) {
    arr[i] = { value: i };
  }

  return arr;
};

const List = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(generateArray(100));
  const [isLoading, setIsLoading] = useState(false);

  const list = useRef<FlashList<ListItem> | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      newItemIndexes = 1001;
    }, [])
  );

  const removeItem = (item: number) => {
    setData(
      data.filter((dataItem) => {
        return dataItem.value !== item;
      })
    );
    list.current?.prepareForLayoutAnimationRender();
    // after removing the item, we start animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    const backgroundColor = item.value % 2 === 0 ? "#00a1f1" : "#ffbb00";

    // if (Number(item.value) >= 90 && Number(item.value) <= 99) {
    //   return <View />;
    // }
    // item.value % 2 === 0
    // ? 100 + (item.value > 1000 ? item.value / 10 : item.value) + 1
    // : 200 + (item.value > 1000 ? item.value / 10 : item.value),
    return (
      <Pressable
        onPress={() => {
          removeItem(item.value);
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor,
            // height: item.value % 2 === 0 ? 100 : 200,
            width: item.value % 2 === 0 ? 100 : 200,
          }}
        >
          <Text>Cell Id: {item.value}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setData([{ value: newItemIndexes++ }, ...data]);
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
          ADD A NEW ITEM
        </Text>
      </TouchableOpacity>

      <FlashList
        ref={list}
        refreshing={refreshing}
        // onRefresh={() => {
        //   setRefreshing(true);
        //   setTimeout(() => {
        //     setRefreshing(false);
        //   }, 2000);
        // }}
        keyExtractor={(item: ListItem) => {
          return item.value.toString();
        }}
        getItemType={(item: ListItem) => {
          return item.type;
        }}
        renderItem={renderItem}
        estimatedItemSize={100}
        data={data}
        drawDistance={250}
        horizontal
        // ListHeaderComponent={
        //   <View style={{ height: 100 }}>
        //     <Text>{isLoading ? "LOADING" : ""}</Text>
        //   </View>
        // }
      />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    backgroundColor: "#00a1f1",
  },
});
