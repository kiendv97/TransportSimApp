Notification.requestPermission().then(function (result) {
    if (result === "granted") {
        console.log("Kiểm tra phát notification Cấp phép thành công.");
    } else {
        console.log("Notification không được bật.\n Bạn sẽ không nhận được thông báo khi có khách và tin nhắn mới. \n Liên với đội kĩ thuật để được hỗ trợ.");
    }

});
const pushNotification = (theBody, theTitle) => {
    let options = {
        body: theBody,
        icon: "",
    }
    let notification = new Notification(theTitle, options);
    notification.onclick = (event) => {
        window.location.href = "/list-chat";
        event.preventDefault();
        notification.close();
    };
}
export default {
    pushNotification
}