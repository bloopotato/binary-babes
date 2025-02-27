import { useRouter } from 'expo-router';
import { StyleSheet, Text, Pressable } from 'react-native';

type CardProps = {
    title: string;
    href?: string;
    onPress?: () => void;
};

export default function Card({ title, href, onPress }: CardProps) {
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
            <Text style={styles.text}>{title}</Text>
        </Pressable>
        
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
    },
    card: {
        backgroundColor: '#edebf3',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 343,
        height: 116,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Raleway',
        color: '#422c81',
        fontWeight: 'bold',
    },
});
