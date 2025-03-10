import React, { useEffect } from "react";
import { Text } from "@components/Text";
import PageHeader from "@components/PageHeader";
import { View, StyleSheet, Dimensions } from "react-native";
import JobRating from "@assets/images/JobRating.svg";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import useAppSelector from "@hooks/useAppSelector";
import { selectAllReviews, updateReviewRating } from "@store/reviewsSlice";
import Rating from "@components/Rating";
import useAppDispatch from "@hooks/useAppDispatch";

const { height, width } = Dimensions.get("window");

type JobReview = {
	jobReviewHeader: string;
	jobReviewTitle: string;
	jobReview: string;
};

const JobReviews: JobReview[] = [
	{
		jobReviewHeader: "Job Review",
		jobReviewTitle: "Need to repair my toilet",
		jobReview:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio " +
			"ab recusandae molestias voluptatibus quae cum doloremque maiores" +
			" nam cupiditate, exercitationem magni dignissimos numquam ducimus" +
			" perspiciatis tempora nisi asperiores, unde labore.",
	},
	{
		jobReviewHeader: "Job Review",
		jobReviewTitle: "Need to repair my kitchen",
		jobReview:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio " +
			"ab recusandae molestias voluptatibus quae cum doloremque maiores" +
			" nam cupiditate, exercitationem magni dignissimos numquam ducimus" +
			" perspiciatis tempora nisi asperiores, unde labore.",
	},
];

const MyRatings = () => {
	const reviews = useAppSelector(selectAllReviews);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.info(reviews);
	});

	const getRatingChange = (newRating: number, index: number, reviewId: string) => {
		console.info(`Review ${index}, updated rating: ${newRating}`);
		dispatch(updateReviewRating({ _id: reviewId, rating: newRating }));
		return newRating;
	};

	return (
		<>
			<PageHeader pageName="Reviews" />
			<View style={styles.container}>
				{reviews.map((review, index) => {
					return (
						<>
							<View style={styles.jobReviewContainer} key={review._id}>
								<Text style={styles.jobReviewHeader}>{review.header}</Text>
								<Text style={styles.jobReviewTitle}>{review.title}</Text>
								<Text style={styles.jobReview}>{review.comment}</Text>
								<View style={styles.ratingContainer}>
									<ProfilePicture width={40} />
									<View>
										<Text>Drew Berry</Text>
										{/* <JobRating width={90} /> */}
										<Rating
											maxRating={5}
											onRatingChange={(rating) => getRatingChange(rating, index, review._id)}
											initialRating={review.rating}
										/>
									</View>
								</View>
							</View>
							<View key={index} style={styles.jobBorderBottom}></View>
						</>
					);
				})}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 10,
		paddingTop: 30,
	},

	jobReviewContainer: {
		paddingHorizontal: 40,
		gap: 5,
	},

	jobReviewHeader: {
		fontWeight: "600",
		fontSize: 19,
	},

	jobReviewTitle: {
		fontSize: 14,
		fontWeight: "400",
	},

	jobReview: {
		fontSize: 12,
		fontWeight: "300",
	},

	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	jobBorderBottom: {
		width: width,
		borderTopWidth: 1,
		borderStyle: "solid",
		borderColor: "black",
	},
});

export default MyRatings;
