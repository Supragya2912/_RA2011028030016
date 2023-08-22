import axios from 'axios';

export const getToken = () => {
    return axios.post('http://20.244.56.144/train/auth', {
        "companyName": "Supragya Railway Company",
        "clientID": "e3124801-dbcb-47c1-bc7f-d8a972d61400",
        "clientSecret": "PvySaTkOBngwczeR",
        "ownerName": "Supragya Anand",
        "ownerEmail": "sa4580@srmist.edu.in",
        "rollNo": "RA2011028030016"
    }).then(res => {
        return res && res.data && res.data.access_token;
    });
};

export const getTrains = (token) => {
    return axios.get('http://20.244.56.144:80/train/trains', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};
