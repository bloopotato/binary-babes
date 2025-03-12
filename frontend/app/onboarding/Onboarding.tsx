import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Animated, ViewToken } from "react-native";
import { useRouter } from "expo-router";

import slides from "@/app/onboarding/slides";
import Paginator from "@/app/onboarding/Paginator";
import OnboardingItem from "@/app/onboarding/OnboardingItem";
import Button from "@/components/Button";

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const router = useRouter();

    const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    
    
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({ item }) => <OnboardingItem item={item} />} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],{
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />

            {currentIndex < slides.length - 1 && (
                <Button label="Skip Tutorial" replace={true} href='/home' />
            )}

            {currentIndex === slides.length - 1 && (
                <Button label="Let's Get Started" theme='primary' replace={true} href='/home' />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    }
})