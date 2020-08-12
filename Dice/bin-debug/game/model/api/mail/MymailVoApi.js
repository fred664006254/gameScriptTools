/*
 *@description: 邮件数据格式化
 *@author: hwc
 *@date: 2020-04-09 13:22:33
 *@version 0.0.1
 */
var Api;
(function (Api) {
    var MymailVoApi;
    (function (MymailVoApi) {
        var mailVo = null;
        var checkts;
        function formatData(data) {
            if (!mailVo) {
                mailVo = new MailVo();
            }
            mailVo.initData(data);
            checkts = data.checkts;
        }
        MymailVoApi.formatData = formatData;
        function getMailVo() {
            return mailVo;
        }
        MymailVoApi.getMailVo = getMailVo;
        function getMailIDs() {
            var readedMails = [];
            var unreadedMails = [];
            for (var key in mailVo.mailInfoMap) {
                if (mailVo.mailInfoMap.hasOwnProperty(key)) {
                    var element = mailVo.mailInfoMap[key];
                    if (element.isread == 0) {
                        unreadedMails.push(key);
                    }
                    else {
                        readedMails.push(key);
                    }
                }
            }
            readedMails.sort(function (a, b) { return mailVo.mailInfoMap[b].ts - mailVo.mailInfoMap[a].ts; });
            unreadedMails.sort(function (a, b) { return mailVo.mailInfoMap[b].ts - mailVo.mailInfoMap[a].ts; });
            return unreadedMails.concat(readedMails);
        }
        MymailVoApi.getMailIDs = getMailIDs;
        function getMailByMailID(key) {
            var mailInfo = new MailInfoVo();
            mailInfo.initData(mailVo.mailInfoMap[key]);
            return mailInfo;
        }
        MymailVoApi.getMailByMailID = getMailByMailID;
        function getDetaTimeByMailID(mailID) {
            return checkts - getMailByMailID(mailID).ts;
        }
        MymailVoApi.getDetaTimeByMailID = getDetaTimeByMailID;
        function hasUnreadMail() {
            return mailVo.unread > 0;
        }
        MymailVoApi.hasUnreadMail = hasUnreadMail;
        function dispose() {
            mailVo = null;
            checkts = 0;
        }
        MymailVoApi.dispose = dispose;
    })(MymailVoApi = Api.MymailVoApi || (Api.MymailVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=MymailVoApi.js.map