export const appService = {
    getOrg,
    getMotionData
};

function getMotionData(id, ts) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`https://augment-api.azurewebsites.net/motionData?hubID=${id}&ts=${ts}`, requestOptions)
        .then(handleResponse) 
}

function getOrg() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`https://augment-api.azurewebsites.net/org`, requestOptions)
        .then(handleResponse) 
    //return Promise.resolve([{"name":"AVCare","centers":[{"name":"Alpha","id":"AVCare-Alpha","units":[{"name":"101","hubID":"AVCare-Alpha-101","areas":[{"name":"bedroom","id":"AVCare-Alpha-101-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-101-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-101-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-101-livingroom"}]},{"name":"102","hubID":"AVCare-Alpha-102","areas":[{"name":"bedroom","id":"AVCare-Alpha-102-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-102-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-102-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-102-livingroom"}]},{"name":"103","hubID":"AVCare-Alpha-103","areas":[{"name":"bedroom","id":"AVCare-Alpha-103-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-103-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-103-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-103-livingroom"}]},{"name":"104","hubID":"AVCare-Alpha-104","areas":[{"name":"bedroom","id":"AVCare-Alpha-104-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-104-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-104-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-104-livingroom"}]},{"name":"105","hubID":"AVCare-Alpha-105","areas":[{"name":"bedroom","id":"AVCare-Alpha-105-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-105-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-105-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-105-livingroom"}]},{"name":"106","hubID":"AVCare-Alpha-106","areas":[{"name":"bedroom","id":"AVCare-Alpha-106-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-106-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-106-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-106-livingroom"}]},{"name":"107","hubID":"AVCare-Alpha-107","areas":[{"name":"bedroom","id":"AVCare-Alpha-107-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-107-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-107-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-107-livingroom"}]},{"name":"108","hubID":"AVCare-Alpha-108","areas":[{"name":"bedroom","id":"AVCare-Alpha-101-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-101-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-101-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-101-livingroom"}]}]}],"id":"f1a727d5-0189-4fac-8559-4a9366e3da4f","_rid":"EJwiAJuVeY8BAAAAAAAAAA==","_self":"dbs/EJwiAA==/colls/EJwiAJuVeY8=/docs/EJwiAJuVeY8BAAAAAAAAAA==/","_etag":"\"03002573-0000-2000-0000-5e37c1d50000\"","_attachments":"attachments/","_ts":1580712405}])
}

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return json
        }
    });
}