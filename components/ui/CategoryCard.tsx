import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { images } from "@/constants/Images";
import { Link } from "expo-router";

type CategoryCardProps = {
    readonly category: string;
};

const IMAGE_HIGHT_WIDTH = 150;


function CategoryCard({ category }: CategoryCardProps) {
    
    return (
        <ThemedView
            lightColor={"white"}
            darkColor={"#40c2ff"}
            style={styles.card}
        >
            <Link href={{
                pathname: "/(modal)/[category]",
                params: { category },
            }}
            
            >
                <Image
                    source={images[category as keyof typeof images]}
                    style={{ width: IMAGE_HIGHT_WIDTH, height: IMAGE_HIGHT_WIDTH }}
                />
            </Link>
            <ThemedText type="subtitle">{category}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 15,
        width: "100%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CategoryCard;
