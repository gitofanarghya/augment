import { store } from '../util/store'

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { "Content-Type": "application/json",
            "authorization": `Bearer ${user.token}` 
        };
    } else {
        return {};
    }
}


export const appService = {
    login,
    getOrg,
    getMotionData,
    getMotionDataV2,
    getSoftNotificationDetails,
    getLastContact
};

function login(username, password) {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "username": username,//"anarghya@stacklighting.com",
            "password": password,//"Abcd1234@"
        })
    };

    return fetch(`https://oncierreapi.azurewebsites.net/oauth`, requestOptions)
        .then(response => {
            return response.json().then(data => {
                if(!response.ok) {
                    const error = JSON.stringify((data.error && data.error.message) || (data && data.message) || response.statusText )
                    return Promise.reject(error);
                } else {
                    if(data.role !== 'superadmin') {
                        return Promise.reject('Access Denied')
                    } else {
                        if (data.token) {
                            localStorage.setItem('user', JSON.stringify(data));
                        }
                        return data 
                    }
                        
                }    
            })
        })
}

function getLastContact(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader(),
        body: null
    }

    return fetch(`https://oncierreapi.azurewebsites.net/lastContact?hubID=${id}`, requestOptions)
        .then(handleResponse) 
}

 
function getSoftNotificationDetails(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader(),
        body: null
    }

    return fetch(`https://oncierreapi.azurewebsites.net/sleepTimeDaily?hubID=${id}`, requestOptions)
        .then(handleResponse) 
}

function getMotionData(id, ts) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader(),
        body: null
    }

    return fetch(`https://oncierreapi.azurewebsites.net/motionData?hubID=${id}&ts=${ts}`, requestOptions)
        .then(handleResponse) 
}

function getMotionDataV2(id, ts1, ts2) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader(),
        body: null
    }

    return fetch(`https://oncierreapi.azurewebsites.net/motionData/v2?hubID=${id}&ts1=${ts1}&ts2=${ts2}`, requestOptions)
        .then(handleResponse) 
}

function getOrg() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader(),
        body: null
    }

    return fetch(`https://oncierreapi.azurewebsites.net/org`, requestOptions)
        .then(handleResponse) 
    //return Promise.resolve([{"name":"AVCare","centers":[{"name":"Alpha","id":"AVCare-Alpha","units":[{"name":"101","hubID":"AVCare-Alpha-101","areas":[{"name":"bedroom","id":"AVCare-Alpha-101-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-101-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-101-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-101-livingroom"}]},{"name":"102","hubID":"AVCare-Alpha-102","areas":[{"name":"bedroom","id":"AVCare-Alpha-102-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-102-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-102-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-102-livingroom"}]},{"name":"103","hubID":"AVCare-Alpha-103","areas":[{"name":"bedroom","id":"AVCare-Alpha-103-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-103-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-103-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-103-livingroom"}]},{"name":"104","hubID":"AVCare-Alpha-104","areas":[{"name":"bedroom","id":"AVCare-Alpha-104-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-104-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-104-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-104-livingroom"}]},{"name":"105","hubID":"AVCare-Alpha-105","areas":[{"name":"bedroom","id":"AVCare-Alpha-105-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-105-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-105-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-105-livingroom"}]},{"name":"106","hubID":"AVCare-Alpha-106","areas":[{"name":"bedroom","id":"AVCare-Alpha-106-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-106-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-106-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-106-livingroom"}]},{"name":"107","hubID":"AVCare-Alpha-107","areas":[{"name":"bedroom","id":"AVCare-Alpha-107-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-107-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-107-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-107-livingroom"}]},{"name":"108","hubID":"AVCare-Alpha-108","areas":[{"name":"bedroom","id":"AVCare-Alpha-101-bedroom"},{"name":"bathroom","id":"AVCare-Alpha-101-bathroom"},{"name":"kitchen","id":"AVCare-Alpha-101-kitchen"},{"name":"livingroom","id":"AVCare-Alpha-101-livingroom"}]}]}],"id":"f1a727d5-0189-4fac-8559-4a9366e3da4f","_rid":"EJwiAJuVeY8BAAAAAAAAAA==","_self":"dbs/EJwiAA==/colls/EJwiAJuVeY8=/docs/EJwiAJuVeY8BAAAAAAAAAA==/","_etag":"\"03002573-0000-2000-0000-5e37c1d50000\"","_attachments":"attachments/","_ts":1580712405}])
}

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if(response.status === 403) {
                store.dispatch({type:'logout'})
            }
            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return json
        }
    });
}