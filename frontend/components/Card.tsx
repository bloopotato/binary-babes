import { useRouter } from 'expo-router';
import { StyleSheet, Text, Pressable, Image, View, ImageSourcePropType } from 'react-native';

type CardProps = {
    title: string;
    href?: string;
    image?: ImageSourcePropType;
    onPress?: () => void;
};

export default function Card({ title, href, image, onPress }: CardProps) {
    const router = useRouter();

    return (
        <Pressable 
            style={styles.card} 
            onPress={() => {
                if (onPress) {
                    onPress();
                } else if (href) {
                    router.push(href as any);
                }
            }
        }>
            <View style={styles.textBox}>
                <Text style={styles.text}>{title}</Text>
            </View>
            {image && <Image source={image} style={styles.cardImage} resizeMode='contain' />}
        </Pressable>
        
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#edebf3',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 343,
        height: 116,
    },
    textBox: {
        width: 200,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Raleway-Bold',
        color: '#422c81',
    },
    cardImage: {
        width: 90,
        height: 90
    }
});
