import { StyleSheet } from "react-native";
import React from "react";
import { compactStyles } from "@helpers/styles";
import ProgressBar from "@components/ProgressBar";
import { JobStatus } from "app/(tabs)/Jobs";
import { BidStatus } from "app/(tabs)/Bids";
import useAppSelector from "@hooks/useAppSelector";
import { selectCurrentUser } from "@store/authSlice";
import { selectJobById, selectJobsState } from "@store/jobsSlice";
import { RootState } from "@store";
import { selectFirstBidByJobId } from "@store/bidsSlice";
import useRoles from "@hooks/useRoles";

const PostedJobProgressStatus = ({ jobStage, bidStage, jobId }: { jobStage?: JobStatus; bidStage?: BidStatus | JobStatus; jobId: string }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { isArtisan } = useRoles();

	let numerator = -1;

	const denominator = isArtisan ? 4 : 3;

	if (!isArtisan) {
		switch (jobStage) {
			case "Posted":
				numerator = 1;
				break;
			case "Active":
				numerator = 2;
				break;
			case "Completed":
				numerator = 3;
				break;
			default:
				return <></>;
		}
	} else {
		switch (bidStage) {
			case "Posted":
				return <></>;
			case "Bid":
				numerator = 1;
				break;
			case "Pending":
				numerator = 2;
				break;
			case "Active":
				numerator = 3;
				break;
			case "Completed":
				numerator = 4;
				break;
			default:
				return <></>;
		}
	}
	return <ProgressBar status={isArtisan ? bidStage : jobStage} numerator={numerator} denominator={denominator} showCompleteLevel />;
};

export default PostedJobProgressStatus;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});
