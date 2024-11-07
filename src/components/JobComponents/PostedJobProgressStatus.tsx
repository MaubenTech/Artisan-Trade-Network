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

const PostedJobProgressStatus = ({ jobId }: { jobId?: string }) => {
	const styles = compactStyles(generalStyles, androidStyles, iosStyles);
	const { type: userType } = useAppSelector(selectCurrentUser);
	const isServiceProvider = userType === "ARTISAN";

	const { status: jobStage } = useAppSelector((state: RootState) => selectJobById(state, jobId));
	//TODO: You're not meant to be using selectFirstBidByJobId here, find an alternative!
	const { status: bidStage } = useAppSelector((state) => selectFirstBidByJobId(state, jobId)) ?? { status: jobStage };

	let numerator = -1;

	const denominator = isServiceProvider ? 4 : 3;

	if (!isServiceProvider) {
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
	return <ProgressBar status={isServiceProvider ? bidStage : jobStage} numerator={numerator} denominator={denominator} showCompleteLevel />;
};

export default PostedJobProgressStatus;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});
