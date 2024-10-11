const BASE_URL = 'https://api.artisantradesnetwork.com/api';


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
export const getData = async<T>(uri: string): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}${uri}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error : ${response.statusText}`);
        }

        return await response.json() as T;
    }

    catch (error) {
        console.error('Fetch Error: ', error)
        throw error
    }
}