import { ThemedText } from "@/components/ThemedText";
import { router, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    TouchableOpacity,
    Text,
    SafeAreaView,
    View,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import data from "@/model.json";
import { Accelerometer } from "expo-sensors";

function Playing() {
    const [counter, setCounter] = useState(10);
    const [currentWord, setCurrentWord] = useState(
        data.categories?.[0]?.words?.[0] || ""
    );
    const [wordIndex, setWordIndex] = useState<number>(0);
    const [lastChangeTime, setLastChangeTime] = useState(Date.now());
    const [goodWords, setGoodWords] = useState(0);
    const [badWords, setBadWords] = useState(0);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    useEffect(() => {
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    useEffect(() => {
        Accelerometer.setUpdateInterval(500);
        const subscription = Accelerometer.addListener(({ x, y }) => {
            // you need to move the phone to the left to change the word
            console.log(y);

            const now = Date.now();
            if (x <= -0.9 && now - lastChangeTime > 500) {
                // 1 second debounce
                setLastChangeTime(now);
                setWordIndex((prevIndex) => {
                    const newIndex = prevIndex + 1;
                    setCurrentWord(
                        data.categories?.[0]?.words?.[newIndex] || ""
                    );
                    return newIndex;
                });
                setGoodWords((prev) => prev + 1);
            }
            if (x >= 0.9 && now - lastChangeTime > 1000) {
                // 1 second debounce
                setLastChangeTime(now);
                setWordIndex((prevIndex) => {
                    const newIndex = prevIndex + 1;
                    setCurrentWord(
                        data.categories?.[0]?.words?.[newIndex] || ""
                    );
                    return newIndex;
                });
                setBadWords((prev) => prev + 1);
            }
        });
        return () => subscription.remove();
    }, [lastChangeTime]);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.dismissTo("/")}>
                        <Ionicons name="close-circle" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.playingContainer}>
                    <Text style={styles.playingText}>
                        {counter > 0 ? currentWord : `¡Se acabó el tiempo!`}
                    </Text>
                    {counter === 0 && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 20,
                                }}
                            >
                                <ThemedText
                                    lightColor="green"
                                    type="subtitle"
                                    style={{ textAlign: "center" }}
                                >
                                    {"\n"}
                                    Buenas: {goodWords}
                                </ThemedText>
                                <ThemedText
                                    lightColor="red"
                                    type="subtitle"
                                    style={{ textAlign: "center" }}
                                >
                                    {"\n"}
                                    Malas: {badWords}
                                </ThemedText>
                            </View>
                        )}
                    <ThemedText type="subtitle" style={styles.counterText}>
                        {counter > 0 && counter}
                    </ThemedText>
                </View>
            </SafeAreaView>
        </>
    );
}

export default Playing;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffa500", // Orange color
    },
    header: {
        right: 0,
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 16,
        zIndex: 1,
    },
    playingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffa500", // Orange color
        padding: 16,
    },
    playingText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginBottom: 20,
    },
    counterText: {
        fontSize: 30,
        color: "white",
    },
});
