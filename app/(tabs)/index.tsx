import React, { useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Button from "@/components/FilterButton";

import { Text, View } from "@/components/Themed";
import { getFilters } from "@/library/filters";

export default function TabOneScreen() {
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate initial data loading or any other setup
    loadData();
  }, []);

  const loadData = async () => {
    // Simulate initial data loading with a delay
    setRefreshing(true);

    const filters = await getFilters();

    console.log(filters);

    if (filters) {
      setData(filters);
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Button
        text={item.displayName}
        link={"/filter/" + item.displayName}
        image={item.image}
        id={item.id}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ActivityIndicator size="large" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
