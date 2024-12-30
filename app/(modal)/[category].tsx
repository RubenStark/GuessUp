import { ThemedText } from "@/components/ThemedText";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import {
    Image,
    Pressable,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";

import data from "@/model.json";
import { images } from "@/constants/Images";

const IMAGE_HIGHT_WIDTH = 200;

export default function Modal() {
    const { category } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{ title: "Categoria" }} />
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <Image
                        source={images[category as keyof typeof images]}
                        style={{
                            width: IMAGE_HIGHT_WIDTH,
                            height: IMAGE_HIGHT_WIDTH,
                        }}
                    />
                    <ThemedText type="title" style={{ marginBottom: 20 }}>
                        {category}
                    </ThemedText>
                    <ThemedText
                        type="default"
                        style={{
                            textAlign: "center",
                            flexWrap: "wrap",
                            flexShrink: 1,
                        }}
                    >
                        {
                            data.categories.find((c) => c.name === category)
                                ?.description
                        }
                    </ThemedText>
                </View>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                        router.dismissTo("../(playing)/[category]",);
                    }}
                >
                    <ThemedText lightColor="white" type="subtitle">
                        Jugar
                    </ThemedText>
                </TouchableOpacity>


            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    viewContainer: {
        flex: 1,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    playButton: {
        paddingLeft: 150,
        paddingRight: 150,
        paddingVertical: 20,
        backgroundColor: "#14a0ff",
        borderRadius: 10,
        marginBottom: 50,
    },
});
