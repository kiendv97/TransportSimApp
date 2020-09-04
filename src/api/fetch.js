const axios = require('axios');

let profileUser = async () => {
    let result = await axios.get('https://banhang.topsim.vn/api/account-admin/detail/1', {
        headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
        }
    })
    return result.data.response;

};
let getTransaction = () => {

}
let login = () => {

}
let countTractionTrader = async(id,)
let changeStatus = async (data, type) => {
    let result = await axios.put(`https://banhang.topsim.vn/api/transaction-trader/package-item/${data.id}/status`,
        {
            data: {

            },
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
export { profileUser, changeStatus };


