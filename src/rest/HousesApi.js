// This is where all of our logic to make a network call for the Houses endpoint is going to go
// The reason we are going to put it in its own file/own class is so that we can use this around any class
// that needs to make those api calls - whereas the old version was tied to the app.js file

const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

class HousesApi {
    get = async () => {
        try {
            const resp = await fetch(HOUSES_ENDPOINT);
            const data = await resp.json();
            return data;
        }   catch(e) {
            console.log('Ooops, seems there was an error', e)
        }
    }

    put = async (house) => {
        try {
            const resp = await fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
                method: 'PUT',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(house)
            });
            return await resp.json();
        }   catch(e) {
            console.log('Ooops, looks like updatingHouses had an error', e)
        }
  }


}


export const housesApi = new HousesApi();