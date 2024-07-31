import Layout, { CustomTabBar } from "../(home)/_layout";
import colors from "../helpers/colors";
import { SvgProps } from "react-native-svg";
import PageHeader from "../components/PageHeader";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { FunctionComponent, ReactElement, ReactSVGElement } from "react";

import PlumberIcon from "../../assets/icons/services/plumberIcon.svg";
import PainterIcon from "../../assets/icons/services/painterIcon.svg";
import CleaningIcon from "../../assets/icons/services/cleaningIcon.svg";
import CarpenterIcon from "../../assets/icons/services/carpenterIcon.svg";
import ElectricianIcon from "../../assets/icons/services/electricianIcon.svg";
import InteriorDecorIcon from "../../assets/icons/services/interiorDecorIcon.svg";
import TabBar from "../components/TabBar";

type Services = {
	name: string;
	icon: React.JSX.Element;
	slug: string;
};

const services: Services[] = [
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
	return (
		<View style={styles.container}>
			<PageHeader pageName="Services" />
			<View style={styles.pageContentContainer}>
				<View style={styles.serviceContentContainer}>
					{services.map((item, index) => {
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
		paddingTop: 70,
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
