/**
 * 邮件列表弹板
 * author dmj
 * date 2017/10/31
 * @class MailPopupView
 */
/*
 *@description: 邮件列表弹版从江山美人修改到 dice
 *@author: bToTd
 *@update date: 2020-04-11 09:46:37
 *@version
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MailPopupView = (function (_super) {
    __extends(MailPopupView, _super);
    function MailPopupView() {
        var _this = _super.call(this) || this;
        _this.mainInfoList = [];
        return _this;
    }
    MailPopupView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_MYMAIL
        ];
    };
    MailPopupView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_MYMAIL:
                view.refreshList(evt);
                break;
        }
    };
    MailPopupView.prototype.initView = function () {
        this.initMailInfo();
        this.listView = ComponentMgr.getScrollList(MailScrollItem, this.mainInfoList, new egret.Rectangle(0, 0, 503, 730));
        this.addChildToContainer(this.listView);
        this.listView.x = (this.viewBg.width - this.listView.width) / 2;
        // this.listView.y = 18;
        // this.listView.setScrollTop(40);
        if (!this.mainInfoList || this.mainInfoList.length <= 0) {
            var nomailIcon = BaseBitmap.create("mail_view_nomail");
            this.addChildToContainer(nomailIcon);
            nomailIcon.x = 89;
            nomailIcon.y = 80;
            var noMailText = ComponentMgr.getTextField(LangMger.getlocal("noemail"), TextFieldConst.SIZE_30, 0x6B7DA3);
            noMailText.x = 0;
            noMailText.bold = true;
            noMailText.width = this.viewBg.width;
            noMailText.textAlign = egret.HorizontalAlign.CENTER;
            noMailText.y = nomailIcon.y + nomailIcon.height + 20;
            this.addChildToContainer(noMailText);
        }
    };
    MailPopupView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        this.viewBg.width = this.getShowWidth();
    };
    MailPopupView.prototype.initMailInfo = function () {
        this.mainInfoList = Api.MymailVoApi.getMailIDs();
    };
    MailPopupView.prototype.refreshList = function (event) {
        this.mainInfoList = Api.MymailVoApi.getMailIDs();
        if (this.listView != null) {
            this.listView.refreshData(this.mainInfoList);
        }
    };
    MailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["updatenotice_tab", "mail_unread_icon"]);
    };
    MailPopupView.prototype.getRequestData = function () {
        return {
            requestType: NetConst.MAIN_LIST,
            requestData: null
        };
    };
    MailPopupView.prototype.getShowHeight = function () {
        return 841;
    };
    // 背景图名称
    MailPopupView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
    MailPopupView.prototype.dispose = function () {
        this.listView = null;
        this.mainInfoList = [];
        _super.prototype.dispose.call(this);
    };
    return MailPopupView;
}(PopupView));
__reflect(MailPopupView.prototype, "MailPopupView");
//# sourceMappingURL=MailPopupView.js.map