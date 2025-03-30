import colors from "@helpers/colors";
import PageHeader from "@components/PageHeader";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import React, { FunctionComponent, ReactElement, ReactSVGElement, useEffect } from "react";

import TabBar from "@components/TabBar";
import PlumberIcon from "@assets/icons/services/plumberIcon.svg";
import PainterIcon from "@assets/icons/services/painterIcon.svg";
import CleaningIcon from "@assets/icons/services/cleaningIcon.svg";
import CarpenterIcon from "@assets/icons/services/carpenterIcon.svg";
import ElectricianIcon from "@assets/icons/services/electricianIcon.svg";
import InteriorDecorIcon from "@assets/icons/services/interiorDecorIcon.svg";
import { useSelector } from "react-redux";
import { fetchServices, selectServices, selectServicesError, selectServicesStatus, Service } from "@store/servicesSlice";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { router } from "expo-router";
import { setJobService } from "@store/jobsSlice";
import { API_BASE_URL } from "@store";

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
	const status = useAppSelector(selectServicesStatus);
	const error = useAppSelector(selectServicesError);
	const [serviceImages, setServiceImages] = React.useState<Record<string, string>>({});

	useEffect(() => {
		if (status === "idle") {
			console.log("Dispatching Services in Service Component:");
			dispatch(fetchServices());
		}
	}, [dispatch]);

	useEffect(() => {
		if (status === "succeeded" && services.length > 0) {
			const serviceImageUrls: Record<string, string> = {};

			services.forEach((service) => {
				if (service.image) serviceImageUrls[service._id] = `${API_BASE_URL}/file/${service.image}`;
			});

			setServiceImages(serviceImageUrls);
		}
	}, [services, status]);

	const handleServiceChoice = (serviceId: string) => {
		dispatch(setJobService(serviceId));
		router.navigate({ pathname: "/NewJob", params: { serviceId } });
	};

	const getServiceImageUrl = (service: Service) => {
		return serviceImages[service._id] || null;
	};

	return (
		<View style={styles.container}>
			<PageHeader pageName="Services" />
			<View style={styles.pageContentContainer}>
				{status === "loading" && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={colors.mainColor} />
						<Text style={styles.loadingText}>Loading Services...</Text>
					</View>
				)}
				{status === "failed" && error && (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>Failed to load services: {error}</Text>
					</View>
				)}

				{status === "succeeded" && (
					<View style={styles.serviceContentContainer}>
						{services.map((service, index) => {
							const imageUrl = getServiceImageUrl(service);
							return (
								<View key={service._id} style={styles.serviceItemWrapper}>
									<ImageBackground
										source={imageUrl ? { uri: imageUrl } : null}
										style={styles.serviceItemBackground}
										imageStyle={{ borderRadius: 20 }}
										resizeMode="cover"
									>
										<TouchableOpacity onPress={() => handleServiceChoice(service._id)} style={styles.serviceItem} key={service._id}>
											{/* {service.image} */}
											<Text style={styles.serviceItemTitle}>{service.name}</Text>
											{/* <Text style={styles.serviceItemSubTitle}>{service.description}</Text> */}
										</TouchableOpacity>
									</ImageBackground>
								</View>
							);
						})}
						{/* {localServices.map((item, index) => {
							return (
								<View style={styles.serviceItem} key={index}>
									{item.icon}
									<Text style={styles.serviceItemTitle}>
										{item.name}
									</Text>
									<Text style={styles.serviceItemSubTitle}>
										{item.slug}
									</Text>
								</View>
							);
						})} */}
					</View>
				)}
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

	serviceItemWrapper: {
		width: "58%",
		marginBottom: 20,
		height: height * 0.18,
		borderWidth: 2,
		borderColor: colors.whiteShade,
		borderRadius: 20,
	},

	serviceItemBackground: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
	},

	serviceItem: {
		// width: "45%",
		flex: 1,
		// marginBottom: 30,
		// backgroundColor: colors.grey2,
		backgroundColor: "rgba(245, 245, 245, 0.5)",
		borderRadius: 20,
		// borderColor: colors.whiteShade,
		// borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
		padding: 6,
		// height: height * 0.18,
		// marginRight: 3,
	},

	serviceItemTitle: {
		fontWeight: "700",
		fontSize: 18,
	},

	serviceItemSubTitle: {
		marginTop: 5,
		fontSize: 7,
		color: colors.subTitlesColor,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: height * 0.5,
	},

	loadingText: {
		marginTop: 10,
		color: colors.mainColor,
	},

	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: height * 0.5,
		padding: 20,
	},

	errorText: {
		color: colors.red,
		textAlign: "center",
	},
});
