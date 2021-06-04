const axios = require('axios');
const URL = 'https://banhang.topsim.vn/api';
const URL_APPSIM_TEST = 'https://api-test01.appsim.net'
// const URL_APPSIM_TEST = 'http://localhost:3333'
const URL_APP_TOPSIM_URL = 'https://banhang.topsim.vn'
const qs = require('qs')

let register = async (username, password) => {
    let result = await axios.post(`${URL}/account-admin/create-appsim`, {
       username, password
    }, {
        headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJodGFkbWluIiwiZnVsbF9uYW1lIjoiVOG6oSBWaeG7h3QgVGjhuqNvIiwicGhvbmVfbnVtYmVyIjoiMDk0NDE5OTk5MSIsImVtYWlsIjoiaHRfYWRtaW5AZ21haWwuY29tIiwiZGV2aWNlX2NvZGUiOiIiLCJ0eXBlX3VzZXIiOjIsInNtc19wb3J0IjoiIiwicm9sZXMiOnsiZGVwYXJ0X2lkIjoxLCJkZXBhcnRfbmFtZSI6IkNPTVBBTlkiLCJkZXBhcnRtZW50X2NvZGUiOiJDT01QQU5ZIiwicm9sZSI6InN1cGVyX2FkbWluIiwiZ3JvdXB0X2lkcyI6WzQyXSwiZ3JvdXB0X2NvZGVzIjpbIkNPTU1PTiJdLCJvd25lcl9ncm91cCI6W119LCJpYXQiOjE2MjI3OTAxMzMsImV4cCI6MTYyNTM4MjEzM30.5z3hwQcsKbQoFUDQC1zjL9AoC8Hxd4N2BQgOnbj04Ok'
        }
    });
    return result.data.status;
}

let getListSimAppsim = async (keysearch, limit, offset)  =>{
    let payload = {
        key: keysearch,
        limit: limit,
        offset: offset,
      };
    let result = await axios.post(`${URL_APPSIM_TEST}/v3/api/search/sim`, qs.stringify(payload), {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'device_type': 'POSTMAN', 
            'device_name': 'POSTMAN', 
            'device_code': 'POSTMAN'
          },
    });
    return result.data.data ? result.data.data.sims : [];
}

let sendOrderTopsim = async (order) => {
    const opp_request = [{
        customer_name: "appsim",
        customer_phone: "0969997197",
        customer_address: 'Đơn test',
        sold_product: order.sim,
        sold_product_root: order.sim,
        request_date: Date.now(),
        source_text: "appsim_test",
        source: "Website",
        type_order: "Dev Kien"
    }]
    let result = await axios.post(`${URL_APP_TOPSIM_URL}/opportunities/bulk-create`, opp_request)

    return result.data.data

}

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
    let result = await axios.put(`${URL}/transaction-trader/package-item/${packageItemId}/status`,
        {
            ...postData,
        },
        {
            headers: {
                "x-access-token": localStorage.access_token,
                "Access-Control-Allow-Origin": "*"
            }
        });
    return result.data.response;
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
let resetPwd = async ({userId, oldPwd, newPwd, reNewPwd}) => {
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
let getListConnect = async (status, page, sold_product = '', shipper_id = 1) => {
    let result = await axios.get(`${URL}/transaction-trader/list-request`,
        {
            params: {
                shipper_id: shipper_id,
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
    getListSimAppsim,
    changeStatus,
    sendOrderTopsim,
    countTractionTrader,
    login,
    register,
    getComment,
    putSeriSim,
    postComment
};