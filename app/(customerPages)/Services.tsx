import colors from "@helpers/colors";
import PageHeader from "@components/PageHeader";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { FunctionComponent, ReactElement, ReactSVGElement, useEffect } from "react";

import TabBar from "@components/TabBar";
import PlumberIcon from "@assets/icons/services/plumberIcon.svg";
import PainterIcon from "@assets/icons/services/painterIcon.svg";
import CleaningIcon from "@assets/icons/services/cleaningIcon.svg";
import CarpenterIcon from "@assets/icons/services/carpenterIcon.svg";
import ElectricianIcon from "@assets/icons/services/electricianIcon.svg";
import InteriorDecorIcon from "@assets/icons/services/interiorDecorIcon.svg";
import { useSelector } from "react-redux";
import { fetchServices, selectServices } from "@store/servicesSlice";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

type LocalServices = {
	name: string;
	icon: React.JSX.Element;
	slug: string;
};

const localServices: LocalServices[] = [
	{
		name: "Plumber",
		icon: <PlumberIcon height={90} />,
		slug: "Hire a plumber today",
	},
	{
		name: "Carpenter",
		icon: <CarpenterIcon height={90} />,
		slug: "Hire a Carpenter today",
	},
	{
		name: "Electrician",
		icon: <ElectricianIcon />,
		slug: "Hire an Electrician today",
	},
	{
		name: "Cleaner",
		icon: <CleaningIcon height={90} />,
		slug: "Hire a Cleaner today",
	},
	{
		name: "Painter",
		icon: <PainterIcon height={90} />,
		slug: "Hire a Painter today",
	},
	{
		name: "Interior Decorator",
		icon: <InteriorDecorIcon height={90} />,
		slug: "Hire an Interior decorator today",
	},
];

const { width, height } = Dimensions.get("window");

export default function Services() {
	const dispatch = useAppDispatch();
	const services = useAppSelector(selectServices);

	useEffect(() => {
		console.log("About to dispatch services function");
		dispatch(fetchServices())
			.unwrap()
			.then((result) => console.log("Services results fetched: ", result))
			.catch((error) => console.log("Error fetching services here: ", error));
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<PageHeader pageName="Services" />
			<View style={styles.pageContentContainer}>
				<View style={styles.serviceContentContainer}>
					{localServices.map((item, index) => {
						return (
							<View style={styles.serviceItem} key={index}>
								{item.icon}
								<Text style={styles.serviceItemTitle}>{item.name}</Text>
								<Text style={styles.serviceItemSubTitle}>{item.slug}</Text>
							</View>
						);
					})}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 10,
	},

	pageContentContainer: {
		marginTop: 30,
		paddingHorizontal: 20,
	},

	serviceContentContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},

	serviceItem: {
		width: "45%",
		marginBottom: 30,
		backgroundColor: colors.grey2,
		borderRadius: 20,
		borderColor: colors.whiteShade,
		borderWidth: 2,
		alignItems: "center",
		padding: 6,
		height: height * 0.18,
		marginRight: 3,
	},

	serviceItemTitle: {
		fontWeight: "600",
	},

	serviceItemSubTitle: {
		marginTop: 5,
		fontSize: 7,
		color: colors.subTitlesColor,
	},
});
