import { Text } from "@components/Text";
import { Link } from "expo-router";
import colors from "@helpers/colors";
import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { SwipeData } from "app/(tabs)/Home";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { View, TouchableWithoutFeedback, Image, Dimensions, StyleSheet, TouchableOpacity, Pressable, InteractionManager, useWindowDimensions, ImageBackground } from "react-native";
import { compactStyles } from "@helpers/styles";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function HomeCarousel({ data }: { data: SwipeData[] }) {
	const currentIndex = useSharedValue(0);
	const currentX = useSharedValue(0);

	// console.log(currentIndex);

	return (
		<View style={{ width: width, gap: 10 }}>
			<Carousel
				layout={"default"}
				data={data}
				renderItem={({ item }: { item: SwipeData }) => <Card cardItem={item} />}
				// firstItem={0}
				inactiveSlideOpacity={1}
				sliderWidth={width}
				itemWidth={width * 0.72}
				contentContainerCustomStyle={{ paddingLeft: "10%" }}
				// slideStyle={{ display: "flex", alignItems: "" }}
				vertical={false}
				onScroll={(event) => {
					const x = event.nativeEvent.contentOffset.x;
					currentX.value = (x / width) * 100 > 25 ? 1 : 0;
					// console.log((x / width) * 100);
					// setCurrentIndex((x / width).toFixed(0));
				}}
				onSnapToItem={(index) => {
					currentIndex.value = index;
				}}
			/>
			<View style={styles.carouselIndicatorContainer}>
				{[null, null].map((_, index: number) => {
					return (
						<Animated.View
							style={[
								styles.carouselIndicator,
								useAnimatedStyle(() => {
									return {
										width: currentX.value == index ? 38 : 10,
										backgroundColor: currentX.value == index ? colors.mainColor : colors.shadedMainColor,
									};
								}),
							]}
							key={index}
						></Animated.View>
					);
				})}
			</View>
		</View>
	);
}

const Card = ({ cardItem }: { cardItem: SwipeData }) => {
	return (
		<ImageBackground style={styles.card} imageStyle={styles.cardImage} source={cardItem.img}>
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle}>{cardItem.title}</Text>
				<Text style={styles.cardSubtitle}>{cardItem.subtitle}</Text>
			</View>
			<Link
				href={cardItem.href}
				asChild
				style={{
					...styles.cardButton,
					backgroundColor: cardItem.buttonColor,
				}}
			>
				<TouchableOpacity>
					{cardItem.secondIcon}
					<Text style={styles.cardButtonTitle}>{cardItem.buttonTitle}</Text>
					{cardItem.icon}
				</TouchableOpacity>
			</Link>
		</ImageBackground>
	);
};

const generalStyles = StyleSheet.create({
	card: {
		// paddingTop: 50,
		paddingHorizontal: 25,
		// paddingVertical: moderateVerticalScale(25, 3),
		paddingVertical: 20,
		justifyContent: "space-between",
		alignItems: "center",
		// rowGap: 70,
		// rowGap: verticalScale(70),
		// rowGap: moderateVerticalScale(70, 7),
	},

	cardImage: {
		borderRadius: 20,
	},

	cardContent: {
		width: "100%",
	},

	cardTitle: {
		// fontSize: moderateScale(21, 3),
		fontSize: 22,
		lineHeight: 25,
		fontWeight: "600",
		color: colors.white,
		letterSpacing: 0.5,
		// backgroundColor: "#f0f",
	},

	cardSubtitle: {
		color: colors.white,
		// backgroundColor: "#f0f",
	},

	cardButton: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 15,
		gap: 10,
	},

	cardButtonTitle: {
		fontSize: 16,
		color: colors.white,
		marginLeft: 5,
	},

	carouselIndicatorContainer: {
		flexDirection: "row",
		width: width,
		justifyContent: "center",
		alignItems: "center",
	},

	carouselIndicator: {
		height: 8,
		borderRadius: 4,
		marginLeft: 5,
	},
});

const androidStyles = StyleSheet.create({
	card: {
		rowGap: moderateVerticalScale(75, 5),
	},
	cardContent: { gap: 10 },
	cardTitle: {
		fontSize: 22,
	},
	cardSubtitle: {
		// width: width * 0.45,
		paddingRight: 45,
		fontSize: 11,
	},
});

const iosStyles = StyleSheet.create({
	card: {
		rowGap: moderateVerticalScale(75, 2),
	},
	cardContent: { gap: 15 },
	cardTitle: {
		fontSize: 25,
	},
	cardSubtitle: {
		// width: width * 0.43,
		paddingRight: 40,
		fontSize: 12,
	},
});

const styles = compactStyles(generalStyles, androidStyles, iosStyles);
