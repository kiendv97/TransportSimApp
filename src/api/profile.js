const axios = require('axios');

let profileUser = () => {
    axios.get('http://beta4.topsim.vn/api/account-admin/detail/1', {
        headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(result => {
            return result.data.response;
        });
};
export { profileUser };


