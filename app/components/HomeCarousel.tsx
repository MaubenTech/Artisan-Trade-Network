import React, { useState } from "react";
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import colors from "../helpers/colors";
import { Link } from "expo-router";
import { SwipeData } from "../(home)/Home";

var { width, height } = Dimensions.get("window");

export default function HomeCarousel({ data }: { data: SwipeData[] }) {
	const [currentIndex, setCurrentIndex] = useState<string | number>(0);

	return (
		<View style={{ width: width * 1.2, gap: 5 }}>
			<Carousel
				layout={"default"}
				data={data}
				renderItem={({ item }: { item: SwipeData }) => <Card cardItem={item} />}
				firstItem={0}
				inactiveSlideOpacity={1}
				sliderWidth={width}
				itemWidth={width * 0.72}
				// slideStyle={{ display: "flex", alignItems: "center" }}
				vertical={false}
				onScroll={(event) => {
					const x = event.nativeEvent.contentOffset.x;
					setCurrentIndex((x / width).toFixed(0));
				}}
			/>
			<View style={styles.carouselIndicatorContainer}>
				{data.map((item: any, index: string | number) => {
					return (
						<View
							style={{
								backgroundColor:
									currentIndex == index
										? colors.mainColor
										: colors.shadedMainColor,
								width: currentIndex == index ? 40 : 8,
								...styles.carouselIndicator,
							}}
							key={index}
						></View>
					);
				})}
			</View>
		</View>
	);
}

const Card = ({ cardItem }: { cardItem: SwipeData }) => {
	return (
		<View>
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
					<TouchableOpacity
						style={{
							backgroundColor: cardItem.buttonColor,
							...styles.cardButton,
						}}
					>
						<Link
							style={{
								alignItems: "center",
								flexDirection: "row",
								justifyContent: "center",
								height: "100%",
								...styles.cardButtonTitle,
								gap: 10,
								textAlign: "center",
								width: "100%",
								padding: 20,
							}}
							href={cardItem.href}
							suppressHighlighting
						>
							{cardItem.secondIcon}
							{cardItem.buttonTitle}
							{cardItem.icon}
						</Link>
					</TouchableOpacity>
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
