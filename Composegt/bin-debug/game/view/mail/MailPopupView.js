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
/**
 * 邮件列表弹板
 * author dmj
 * date 2017/10/31
 * @class MailPopupView
 */
var MailPopupView = (function (_super) {
    __extends(MailPopupView, _super);
    function MailPopupView() {
        return _super.call(this) || this;
    }
    /**生成新标头 */
    MailPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    MailPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAIL_DETAIL, this.clickItemHandler, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_MYMAIL,this.refreshList,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL, this.refreshList, this);
        // let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
        // titleBg.width = 300;
        // titleBg.height = 60;
        // titleBg.x = this.viewBg.x + this.viewBg.width/2 - titleBg.width/2;
        // titleBg.y = 10;
        // this.addChildToContainer(titleBg);
        // let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // bg.width = 520;
        // bg.height = 612;
        // bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
        // bg.y = titleBg.y + titleBg.height + 10;
        // this.addChildToContainer(bg);
        this._mailNumTF = ComponentManager.getTextField(LanguageManager.getlocal("curMailNum", [Api.mailVoApi.getUnreadNum().toString(), Api.mailVoApi.getTotalNum().toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
        this._mailNumTF.x = this.viewBg.x + this.viewBg.width - this._mailNumTF.width - 55;
        this._mailNumTF.y = this.viewBg.y + 43 - this._mailNumTF.height / 2;
        this.addChildToContainer(this._mailNumTF);
        var tips = ComponentManager.getTextField(LanguageManager.getlocal("mailGetTip"), 18, TextFieldConst.COLOR_WARN_YELLOW);
        tips.width = 380;
        // tips.textAlign = egret.HorizontalAlign.CENTER;
        tips.x = this.viewBg.x + 50;
        tips.y = this.viewBg.y + 43 - tips.height / 2;
        this.addChildToContainer(tips);
        this._mailInfoVoList = Api.mailVoApi.getMailInfoVoList();
        // if(this._mailInfoVoList&&this._mailInfoVoList.length>=1)
        // {		
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 710);
        this._scrollList = ComponentManager.getScrollList(MailScrollItem, this._mailInfoVoList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(this.viewBg.width / 2 - this._scrollList.width / 2, this.viewBg.y + 80);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("mailNoDes"));
        // }
        // else
        // {
        // 	let noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // 	noDataTxt.text =LanguageManager.getlocal("mailNoDes");
        // 	noDataTxt.x = 250;
        // 	noDataTxt.y = 300;
        // 	this.addChildToContainer(noDataTxt);
        // }
        var titleBg = this.container.getChildByName("newTitleBg");
        titleBg.height = 810;
    };
    MailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "mail_icon", "mail_iconbg",
            "mail_rewardicon"
        ]);
    };
    MailPopupView.prototype.clickItemHandler = function (event) {
        this._index = Number(event.data.index);
        this._mailId = Number(event.data.mailId);
        var mailInfoVo = Api.mailVoApi.getMailInfoVoById(this._mailId);
        if (mailInfoVo && mailInfoVo.content && mailInfoVo.isread) {
            this.openMailDetail();
        }
        else {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL), this.useCallback, this);
            NetManager.request(NetRequestConst.REQUEST_MAIL_GET_DETAIL, { "mailId": this._mailId });
        }
    };
    MailPopupView.prototype.refreshList = function () {
        var mailScrollItem = this._scrollList.getItemByIndex(this._index);
        if (mailScrollItem) {
            mailScrollItem.updateMailState();
            var newMailnumStr = LanguageManager.getlocal("curMailNum", [Api.mailVoApi.getUnreadNum().toString(), Api.mailVoApi.getTotalNum().toString()]);
            this._mailNumTF.text = newMailnumStr;
        }
    };
    MailPopupView.prototype.useCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL), this.useCallback, this);
        var mailScrollItem = this._scrollList.getItemByIndex(this._index);
        mailScrollItem.updateMailState();
        this.openMailDetail();
    };
    // 打开邮件详情
    MailPopupView.prototype.openMailDetail = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.MAILDETAILPOPUPVIEW, { "mid": this._mailId, "index": this._index });
    };
    MailPopupView.prototype.getBgExtraHeight = function () {
        return 55;
    };
    MailPopupView.prototype.dispose = function () {
        this._mailInfoVoList = null;
        this._scrollList = null;
        this._mailNumTF = null;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,this.refreshList,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_MYMAIL, this.refreshList, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAIL_DETAIL, this.clickItemHandler, this);
        _super.prototype.dispose.call(this);
    };
    return MailPopupView;
}(PopupView));
__reflect(MailPopupView.prototype, "MailPopupView");
