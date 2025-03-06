const BASE_URL = "https://api.artisantradesnetwork.com/api";

// export const getData = async (uri: string) => {
//     try {
//         const response = await fetch(`${BASE_URL}${uri}`, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         return await response.json;
//     }

//     catch (error) {
//         console.error('Fetch Error: ', error)
//         throw error
//     }
// }

/******MAKING THE DATA THAT THE CALL RETURNS MATCH THE EXPECTED STRUCUTRE */
export const getData = async <T>(uri: string, jwt?: string): Promise<T> => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	if (jwt) headers.append("Authorization", `Bearer ${jwt}`);

	console.log("Headers: ");
	console.log(headers);
	const response = await fetch(`${BASE_URL}${uri}`, {
		method: "GET",
		headers,
		redirect: "follow",
	});
	try {
		const responseText = await response.text();
		try {
			const responseJson = JSON.parse(responseText);
			return responseJson;
		} catch (err) {
			console.log("Error while jsoning response: " + err);
			console.log(`Response text: ${responseText}`);
		}

		return responseText as T;
	} catch (error) {
		console.log(`Error while texing response: ${error}`);
	}

	return null;
	// 	try {

	// 		// console.log("Response: ");
	// 		// console.log(response);
	// 		// console.log("Response json: ");
	// 		// console.log(await response.json());

	// 		// if (!response.ok) {
	// 		// 	throw new Error(`Error : ${response.statusText}`);
	// 		// }

	// 		// return (await response.json()) as T;

	// 	} catch (error) {
	// 		console.error("Fetch Error: ", JSON.stringify(error));
	// 		throw error;
	// 	}
};

export const postData = async <T>(uri: string, body: Record<string, string>, jwt?: string): Promise<T | string> => {
	// try {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	if (jwt) headers.append("Authorization", `Bearer ${jwt}`);

	// console.log("Headers: ");
	// console.log(headers);

	const response = await fetch(`${BASE_URL}${uri}`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
		redirect: "follow",
	});

	// console.log("Response: ");
	// console.log(response);

	try {
		const responseText = await response.text(); //NOTE: When the api starts returning json for invalid credentials, this will not be necessary as response.json() will suffice.
		// console.log("Response text: ");
		// console.log(responseText);

		try {
			const responseJSON = JSON.parse(responseText);
			// console.log("Response JSON: ");
			// console.log(responseJSON);
			return responseJSON;
		} catch (error) {
			console.log("Error while jsoning response: " + error);
		}

		return responseText;
	} catch (error) {
		console.log(`Error while texting response: ${error}`);
	}

	// return;

	// if (!response.ok) {
	// 	throw new Error(`Error : ${response.statusText}`);
	// }

	return null;
	// }
	// catch (error) {
	// 	console.error("Fetch Error: ", JSON.stringify(error));
	// 	// throw error;
	// }
};
