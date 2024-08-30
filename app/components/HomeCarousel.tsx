import {
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	InteractionManager,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import colors from "../helpers/colors";
import { SwipeData } from "../(home)/Home";
import Carousel from "react-native-snap-carousel";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

var { width, height } = Dimensions.get("window");

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
										backgroundColor:
											currentX.value == index
												? colors.mainColor
												: colors.shadedMainColor,
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
		<View style={{ width: width }}>
			<TouchableWithoutFeedback>
				<Image
					// source=
					source={cardItem.img}
					style={{
						width: width * 0.7,
						height: height * 0.4,
						borderRadius: 20,
					}}
				/>
			</TouchableWithoutFeedback>
			<View
				style={{
					position: "absolute",
					top: 50,
					justifyContent: "space-between",
					alignItems: "center",
					marginLeft: "5%",
					height: height * 0.31,
				}}
			>
				<View style={{ gap: 10 }}>
					<Text style={styles.cardTitle}>{cardItem.title}</Text>
					<Text style={styles.cardSubtitle}>{cardItem.subtitle}</Text>
				</View>
				<View
					style={{
						width: width * 0.6,
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<Link
						href={cardItem.href}
						asChild
						style={{
							alignItems: "center",
							...styles.cardButton,
							textAlign: "center",
							backgroundColor: cardItem.buttonColor,
						}}
					>
						<TouchableOpacity
							style={{
								padding: 15,
								gap: 10,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{cardItem.secondIcon}
							<Text style={styles.cardButtonTitle}>{cardItem.buttonTitle}</Text>
							{cardItem.icon}
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardTitle: {
		fontSize: 25,
		fontWeight: "900",
		color: "white",
		width: width * 0.5,
		letterSpacing: 0.5,
	},

	cardSubtitle: {
		fontSize: 15,
		color: "white",
		width: width * 0.5,
	},

	cardButton: {
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 15,
		justifyContent: "center",
	},

	cardButtonTitle: {
		fontSize: 20,
		color: "white",
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
