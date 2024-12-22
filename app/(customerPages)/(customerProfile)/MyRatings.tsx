import React, { useEffect } from "react";
import { Text } from "@components/Text";
import PageHeader from "@components/PageHeader";
import { View, StyleSheet, Dimensions } from "react-native";
import JobRating from "@assets/images/JobRating.svg";
import ProfilePicture from "@assets/components/chatList/images/profilePicture.svg";
import useAppSelector from "@hooks/useAppSelector";
import { selectAllReviews } from "@store/reviewsSlice";
import Rating from "@components/Ratingt";

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

	useEffect(() => {
		console.info(reviews);
	});

	return (
		<>
			<PageHeader pageName="Reviews" />
			<View style={styles.container}>
				{reviews.map((jobReview, idx) => {
					return (
						<>
							<View style={styles.jobReviewContainer} key={jobReview._id}>
								<Text style={styles.jobReviewHeader}>{jobReview.jobReviewHeader}</Text>
								<Text style={styles.jobReviewTitle}>{jobReview.jobReviewTitle}</Text>
								<Text style={styles.jobReview}>{jobReview.comment}</Text>
								<View style={styles.ratingContainer}>
									<ProfilePicture width={40} />
									<View>
										<Text>Drew Berry</Text>
										{/* <JobRating width={90} /> */}
										<Rating maxRating={5} />
									</View>
								</View>
							</View>
							<View key={idx} style={styles.jobBorderBottom}></View>
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
