const fireBaseUrlAdd = 'https://iid.googleapis.com/iid/v1:batchAdd'
const fireBaseUrlRemove = 'https://iid.googleapis.com/iid/v1:batchRemove'
const axios = require('axios')
const serverKey = 'key=AAAA6XZOpOk:APA91bElHLg770foPiGClB7Fb__Q3FwQL1ks3UduRtg6lKc5gdPbbxsCdt90XzPcwjEf7MsSVRNNckuQANuPOJUTSQ0rYpP2HtxaNTshppB241FHQTYaLnW6bDreOrxhXmr0M4AqeyYj'
let postDevice = async (nameTopic) => {
    console.log(nameTopic);
    let result = await axios.post(`${fireBaseUrlAdd}`,
        {
            to: `/topics/appgiaosim${nameTopic}`,
            registration_tokens: [`${localStorage.tokenDevice}`]
        },
        {
            headers: {
                "Authorization": serverKey,
                "Content-Type": 'application/json'
            }
        })
    return result.data.response;
}
let unsubcribeDevice = async (nameTopic) => {
    console.log(nameTopic);
    let result = await axios.post(`${fireBaseUrlRemove}`,
        {
            to: `/topics/appgiaosim${nameTopic}`,
            registration_tokens: [`${localStorage.tokenDevice}`]
        },
        {
            headers: {
                "Authorization": serverKey,
                "Content-Type": 'application/json'
            }
        })
    return result.data.response;
}
export {
    postDevice,
    unsubcribeDevice
}