import { BadgeComponents } from "@types";
import { ReactNative as RN, stylesheet, toasts, React } from "@metro/common";

const { View, Image, TouchableOpacity } = RN;

export const BadgeComponent = ({ name, image, size, margin, key }: BadgeComponents) => {

    const styles = stylesheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
        },
        img: {
            width: size,
            height: size,
            resizeMode: "contain",
            marginHorizontal: margin
        }
    });

    /*const renderBadge = () => {
        return (
            <TouchableOpacity onPress={() => toasts.open({ key: key, content: name, source: { uri: image } })}>
                <Image style={styles.img} source={{ uri: image }} />
            </TouchableOpacity>
        )
    }*/
    
    return (
        <View style={styles.container}>
            {/*{renderBadge()*/}
            <TouchableOpacity onPress={() => toasts.open({ content: name, source: { uri: image } })}>
                <Image style={styles.img} source={{ uri: image }} />
            </TouchableOpacity>
        </View>
    )
}