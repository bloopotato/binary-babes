import React from 'react';
import { View, StyleSheet, Animated,useWindowDimensions } from 'react-native';

type PaginatorProps = {
    data: any[];
    scrollX: Animated.Value;
};

export default function Paginator({ data, scrollX }: PaginatorProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_: any, i: number) => {
                {/*Previous dot, current dot, next dot*/}
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={[
                            styles.dot,
                            {
                                width: dotWidth,
                                opacity,
                            }
                        ]}
                        key={i.toString()}
                    />
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#432C81',
        marginHorizontal: 8,
    }
})