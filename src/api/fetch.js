const axios = require('axios');
const URL = 'https://banhang.topsim.vn/api';
const user = JSON.parse(localStorage.getItem('user'))
let profileUser = async (id) => {
    let result = await axios.get(`${URL}/account-admin/detail/${id}`, {
        headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
        }
    });
    return result.data.response;

};
let countTractionTrader = async () => {
    let result = await axios.get(`${URL}/transaction-trader/count-transaction-group-status-for-app`, {
        headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
        }
    });
    return result.data.response;
};
let login = async (username, password, otp) => {
    let response = await axios.post(`${URL}/login`, {
        username: username,
        password: password,
        otp: otp
    });
    return response;
};
let changeStatus = async (packageItemId, note, status, receivablePrice) => {
    let postData = {}
    if (status == 'DELIVERED') {
        postData = {
            status: status,
            note: note ? note : '',
            total_receivable_shipping_fee: receivablePrice ? receivablePrice : ''
        }
    } else if (status == 'FAIL' || status == 'SHIPPING') {
        postData = {
            status: status,
            note: note ? note : ''
        }
    }
    // let result = await axios.put(`${URL}/transaction-trader/package-item/${packageItemId}/status`,
    //     {
    //         ...postData,
    //     },
    //     {
    //         headers: {
    //             "x-access-token": localStorage.access_token,
    //             "Access-Control-Allow-Origin": "*"
    //         }
    //     });
    // return result.data.response;
};
let postComment = async (userId, content) => {
    let result = await axios.post(`${URL}/commons/comments`,
        {
            ref_id: userId,
            content: content
        },
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        });
    return result.data.message;
};
let getComment = async (id) => {
    let result = await axios.get(`${URL}/commons/comments?type=ORDER&id=${id}`, {
        headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
        }
    });
    return result.data.response;
};
let putSeriSim = async (packageId, seri) => {
    let result = await axios.put(`${URL}/orders/items/${packageId}`,
        { sim_series: seri },
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        });
    return result.data.message;
};
let resetPwd = async (userId, oldPwd, newPwd, reNewPwd) => {
    let result = await axios.put(`${URL}/account-admin/reset-pass/${userId}`,
        {
            password: newPwd,
            old_password: oldPwd,
            repassword: reNewPwd
        },
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        });
    return result.data.response;
};
let getOrder = async (packageId) => {
    let result = await axios.get(`${URL}/transaction-trader/detail/${packageId}`,
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        });
    return result.data.response;
};
let listTransactionForApp = async (status, page = 1, page_size = 20) => {
    let result = await axios.get(`${URL}/transaction-trader/list-transaction-for-app`,
        {
            params: {
                status,
                page,
                page_size
            },
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
let searchTransation = async (sold_product, status) => {
    let result = await axios.get(`${URL}/transaction-trader/list-transaction-for-app`,
        {
            params: {
                sold_product: sold_product,
                status: status
            },
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
let getRequestConnect = async (orderCode) => {
    let result = await axios.get(`${URL}/transaction-trader/detail-request-connected`,
        {
            params: {
                order_code: orderCode
            },
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
let getListConnect = async (status, page, sold_product = '') => {
    let result = await axios.get(`${URL}/transaction-trader/list-request`,
        {
            params: {
                shipper_id: user.id,
                status: status.length ? status : undefined,
                page: page || 1,
                page_size: 15,
                sold_product: sold_product.length ? sold_product : undefined
            },
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
let putConnect = async (orderCode, status) => {
    let result = await axios.put(`${URL}/orders/change-status-connected`, {
        order_code: orderCode,
        status: status
    },
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        })
    return result.data.response;
}
export {
    getListConnect,
    putConnect,
    getRequestConnect,
    searchTransation,
    listTransactionForApp,
    resetPwd,
    getOrder,
    profileUser,
    changeStatus,
    countTractionTrader,
    login,
    getComment,
    putSeriSim,
    postComment
};