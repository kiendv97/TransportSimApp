import Vue from "vue"

Vue.prototype.$postMessage = function (data) {
    console.log(`postMessage.data: ${JSON.stringify(data)}`);
    try {
        window.ReactNativeWebView.postMessage(data);
    }catch (e) {
        console.log(e)
    }
}
