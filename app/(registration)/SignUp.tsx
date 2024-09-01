import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
	Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Link, Redirect } from "expo-router";

export default function SignUp() {
	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("../../assets/images/logo.png")} />
			</View>
			<View style={styles.headerContainer}>
				<Text style={styles.header}> Create An Account</Text>
				<Text style={styles.subHeader}>Welcome! please enter your personal details.</Text>
			</View>
			<View style={styles.detailsContainer}>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>First Name</Text>
					<TextInput style={styles.placeholder} placeholder="Enter Your First Name" />
				</View>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Last Name</Text>
					<TextInput style={styles.placeholder} placeholder="Enter Your Last Name" />
				</View>
				<View style={styles.subDetailsContainer}>
					<Text style={styles.text}>Date Of Birth</Text>
					<TextInput style={styles.placeholder} placeholder="DD/MM/YYY" />
				</View>
				<Text style={styles.gender}>Gender</Text>
			</View>
			<View style={styles.genderOption}>
				<View style={styles.maleContainer}>
					<View style={styles.maleTick}></View>
					<Text style={styles.male}>Male</Text>
				</View>
				<View style={styles.femaleContainer}>
					<View style={styles.femaleTick}></View>
					<Text style={styles.female}>Female</Text>
				</View>
			</View>
			<View style={styles.loginButtonContainer}>
				<Link
					style={[
						{
							color: "white",
							textAlign: "center",
							fontSize: 18,
							// fontWeight: "800",
							letterSpacing: 1,
							alignSelf: "center",
						},
					]}

					// href={"(home)/Home"}
					href={'/(registration)/ContactDetails'}
					asChild
				>
					<Pressable>
						<Text>

							Proceed
						</Text>

					</Pressable>
				</Link>
			</View>
			<View style={styles.existContainer}>
				<Pressable>
					<Link
						href={"(home)/Home"}
					>
						Existing user ?
					</Link>
				</Pressable>
				<Pressable>
					<Link
						// href={"(home)/Home"}
						href={'/ContactDetails'}
					>
						Login
					</Link>
				</Pressable>
			</View>
		</View >
		// <Redirect href={'/ContactDetails'} />
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		gap: 30,
	},
	logo: {
		paddingTop: 20,
		flexDirection: "column",
		alignItems: "center",
	},
	headerContainer: {
		paddingLeft: 25,
		gap: 5,
	},
	header: {
		fontSize: 23,
		fontWeight: "bold",
	},
	subHeader: {

	},
	detailsContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		gap: 20,
	},
	subDetailsContainer: {
		gap: 8,
	},
	text: {
		color: "black",
		fontSize: 17,
	},
	placeholder: {
		borderWidth: 1,
		borderRadius: 10,
		paddingTop: "3%",
		paddingBottom: "5%",
		paddingLeft: "5%",
		paddingRight: "2%",
		alignItems: "center",
		// height: "27%",
		position: "relative",
	},
	gender: {
		color: "black",
		fontSize: 18,
		paddingLeft: 2,
	},
	genderOption: {
		display: "flex",
		flexDirection: "row",
		marginTop: "-3%",
		paddingLeft: "3.5%",
	},
	maleContainer: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 10,
		justifyContent: "space-around",
		borderWidth: 1,
		borderColor: "#52A2f2",
		borderRadius: 10,
		paddingBottom: "4%",
		paddingTop: "4%",
		paddingRight: "13%",
		alignItems: "center",
		position: "relative",
		backgroundColor: "#52A2f2",
	},
	maleTick: {
		marginLeft: 10,
		borderWidth: 8,
		borderColor: "#DDDDDD",
		borderRadius: 10,
		paddingBottom: "3%",
		paddingTop: "3%",
		paddingLeft: "3%",
		paddingRight: "3%",
		alignItems: "center",
		backgroundColor: "#52A2f2",
	},
	male: {
		color: "white",
		fontSize: 15,
		marginLeft: "5%",

	},
	femaleContainer: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#DDDDDD",
		paddingRight: "13%",
		alignItems: "center",
		position: "relative",
		backgroundColor: "#F8F9F8",
	},
	femaleTick: {
		marginLeft: 10,
		borderWidth: 8,
		borderColor: "#DDDDDD",
		borderRadius: 10,
		paddingBottom: "3%",
		paddingTop: "3%",
		paddingLeft: "3%",
		paddingRight: "3%",
		alignItems: "center",
		backgroundColor: "#F8F9F8",
	},
	female: {
		color: "#8f8f8f",
		fontSize: 15,
		marginLeft: "5%",
	},
	loginButtonContainer: {
		borderWidth: 1,
		borderRadius: 10,
		paddingTop: "3%",
		paddingBottom: "5%",
		paddingLeft: "7%",
		paddingRight: "7%",
		marginLeft: "7%",
		marginRight: "7%",
		alignItems: "center",
		borderColor: "#52A2f2",
		backgroundColor: "#52A2f2",
		position: "relative",
	},
	existContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		paddingLeft: "auto",
		paddingRight: "auto",
	}
});
