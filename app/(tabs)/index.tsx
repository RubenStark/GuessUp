import { StyleSheet, FlatList, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "@/components/ui/CategoryCard";
import data from "@/model.json";

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <FlatList
                data={data.categories}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <CategoryCard
                            category={item.name}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.name}
                numColumns={2}
                horizontal={false}
                columnWrapperStyle={styles.columnWrapper}
            />

                <View
                    style={{
                        height: 300,
                    }}
                ></View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: "space-between",
        padding: 4,
        gap: 4,
    },
    itemContainer: {
        flex: 1,
        margin: 4,
    },
});
