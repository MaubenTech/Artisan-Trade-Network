import { createAppAsyncThunk } from "@hooks/createAppAsyncThunk";
import { postData } from "./APIFunction";
import { ValidationError } from "@store/authSlice";
import { Platform } from "react-native";

export const isEmailValid = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * A function that abstracts away verbose code and generates an async thunk that sends a post request based on arguments passed. Handles the response based on arguments passed as well.
 * @param actionName The name of the action (e.g. auth/login)
 * @param apiUrl The api endpoint the post request will be sent to
 * @param successIdentifier The property in the response that indicates that the request was successful
 * @param successCallback A callback that would be run when the signal is successful. The result of the request and input parameters will be passed to this function and whatever the function returns will be used as the successful value of the async thunk.
 * @param errorCallback An optional callback that is run when the request is unsuccessful. The error(s) is passed to the function and it is run before the async thunk is declared as rejected.
 * @returns A generated async thunk for specified post request.
 */
export const generatePostAsyncThunk = <EndpointResultType, ThunkReturnType extends Record<string, any>, ThunkArgType extends Record<string, any>>(
	actionName: string,
	apiUrl: string,
	successIdentifier: string,
	successCallback: (result: EndpointResultType, params?: ThunkArgType) => ThunkReturnType,
	errorCallback?: (error) => void
) => {
	const formattedActionName = actionName.split("/")[1];
	type CompleteEndpointResultType = EndpointResultType | { error: string } | { errors: ValidationError[] };
	const thunk = createAppAsyncThunk<ThunkReturnType, ThunkArgType>(actionName, async (params, { getState, dispatch, rejectWithValue }) => {
		try {
			const result = await postData<CompleteEndpointResultType>(apiUrl, params);

			if (typeof result === "string") {
				return rejectWithValue(result);
			}

			if (typeof result === "object") {
				if ("error" in result) {
					if (errorCallback) errorCallback(result.error);
					return rejectWithValue(result.error);
				}

				if ("errors" in result) {
					if (errorCallback) errorCallback(result.errors);
					const errorFields = result.errors.map((specificError) => specificError.path).join(", ");
					return rejectWithValue(`Errors on ${errorFields} fields`);
				}

				if (successIdentifier in result) {
					return successCallback(result, params);
				}
			}
		} catch (error) {
			if (errorCallback) errorCallback(error);
			console.error(`${toSentenceCase(formattedActionName, true)} Error:`, error);
			return rejectWithValue(error.message || toSentenceCase(formattedActionName) + " failed");
		}
	});
	return thunk;
};

/**
 * Converts a string from snake case to sentence case (e.g "login" -> "Login", "forgotPassword" -> "Forgot password", "anotherRandomExample" -> "Another random example")
 * @param str String to be resolved
 * @param capitalized Boolean that indicates whether the beginning character of each word in the string should be capitalized
 * @returns The resolved string
 */
function toSentenceCase(str: string, capitalized?: boolean): string {
	let temp = str.replace(/([a-z])([A-Z])/g, "$1 $2");
	if (capitalized) temp.toLowerCase();
	temp.replace(/^./, (match) => match.toUpperCase());
	return temp;
}

export const isAndroid = () => Platform.OS === "android";
export const isiOS = () => Platform.OS === "ios";

/**
 * Reverses a date string's format, literally, from DD/MM/YYYY to YYYY/MM/DD, from MM/DD/YYYY to YYYY/DD/MM, etc. For e.g, reverses 03/24/2001 to 2001/24/03 and 03/24/2001 to 2001/24/03, etc.
 * NOTE: No checks are done to verify if the dates in the datestring are valid.
 * @param date The date string to be reversed
 * @param splitter The optional split indicator (e.g, "/" or "-"). @default "/"
 * @param joiner The optional joining character (e.g. "/" or "-") @default "/"
 * @returns The reversed date string
 */
export const reverseDate = (date: string, splitter: string = "/", joiner: string = "/") => date.split(splitter).reverse().join(joiner);

export type TimeUnit = "y" | "year" | "years" | "m" | "month" | "months" | "d" | "day" | "days";

/**
 * A function to get date in YYYY/MM/DD format after subtracting a time period out of it
 * @param timeAgo How much time will be subtracted based on the time unit
 * @param timeUnit Time unit used to measure the time ago value, e.g. days, months, years
 * @param joiner The optional joining character (e.g. "/" or "-")
 * @returns The maximumDate string in YYYY/MM/DD format
 */
export const subtractDate = (timeAgo: number, timeUnit: TimeUnit = "y", joiner: string = "/") => {
	const date = new Date();
	switch (timeUnit) {
		case "y":
		case "year":
		case "years":
			date.setFullYear(date.getFullYear() - timeAgo);
			break;
		case "m":
		case "month":
		case "months":
			date.setMonth(date.getMonth() - timeAgo);
			break;
		case "d":
		case "day":
		case "days":
			date.setDate(date.getDate() - timeAgo);
	}
	// console.log(date);
	return date.getFullYear() + joiner + (date.getMonth() + 1) + joiner + date.getDate(); // Adding 1 to month because Date's index begins at 0, and DatePicker's begins at 1
};
