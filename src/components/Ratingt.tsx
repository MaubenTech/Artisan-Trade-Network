import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type RatingProps = {
	maxRating?: number;
	initialRating?: number;
	onRatingChange?: (rating: number) => void;
};
const Rating: React.FC<RatingProps> = ({ maxRating, initialRating, onRatingChange }) => {
	const [rating, setRating] = useState(initialRating);

	const handlePress = (index: number) => {
		setRating(index + 1);
		if (onRatingChange) onRatingChange(index + 1);
	};
	return (
		<View style={styles.ratingsContainer}>
			{Array.from({ length: maxRating }).map((_, index) => (
				<TouchableOpacity>
					<Ionicons
						name={index < rating ? "star" : "star-outline"}
						size={24}
						color={index < rating ? "#FFD700" : "#CCC"}
						onPress={() => handlePress(index)}
					/>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	ratingsContainer: {
		flexDirection: "row",
	},
});

export default Rating;
