import React from "react";
import colors from "../../../src/helpers/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuHeader from "../../../src/components/MenuHeader";
import PageHeader from "../../../src/components/PageHeader";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import JobPicture from "../../../assets/images/JobPicture.svg";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

const JobHistory = () => {
	return (
		<View style={{ backgroundColor: colors.white }}>
			<PageHeader pageName="Job History" />
			<View style={styles.container}>
				<Link
					style={styles.job}
					asChild
					href={"/(customerPages)/(profile)/JobHistoryDetails"}
				>
					<TouchableOpacity>
						<View style={styles.jobPicture}>
							<JobPicture />
						</View>
						<View style={styles.jobDetailContainer}>
							<View style={styles.jobDetailHeader}>
								<Text style={styles.jobDetailText}>
									Need to repair my toilet
								</Text>
								<Ionicons name="menu" color={"black"} />
							</View>
							<Text style={styles.jobServiceCategory}>Maintenance</Text>
							<Text
								style={styles.jobDetailContent}
								lineBreakMode="middle"
								numberOfLines={2}
							>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Veritatis, aliquam Officia deserunt dicta alias dolore quis
								pariatur porro ullam facilis molestiae quasi.
							</Text>
							<View style={styles.jobDetailFooter}>
								<Text style={styles.jobPriceDetail}>₦ 500.00</Text>
								<Text style={styles.jobDate}>
									<Ionicons name="timer-outline" />
									11/04/2023
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</Link>
				<View style={styles.jobBorderBottom}></View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: colors.white,
		marginTop: 30,
	},
	job: {
		paddingHorizontal: 30,
		flexDirection: "row",
		height: height * 0.15,
		width: width * 0.75,
		gap: 8,
	},
	jobBorderBottom: {
		height: height,
		width: width,
		borderTopWidth: 1,
		borderStyle: "solid",
		borderColor: "black",
	},
	jobPicture: {},
	jobDetailContainer: {
		gap: 5,
	},
	jobServiceCategory: {
		color: colors.greySecondaryShade,
	},
	jobDetailHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	jobDetailText: {
		fontWeight: "600",
	},
	jobDetailContent: {},
	jobDetailFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		color: colors.greySecondaryShade,
		fontWeight: "200",
	},
	jobPriceDetail: {
		color: colors.greySecondaryShade,
		fontWeight: "400",
	},
	jobDate: {
		color: colors.greySecondaryShade,
		fontWeight: "400",
	},
});

export default JobHistory;
