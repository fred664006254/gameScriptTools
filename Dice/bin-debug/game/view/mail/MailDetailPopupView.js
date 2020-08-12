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
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
/*
 *@description: 邮件详情
 *@author: hwc
 *@update date: 2020-04-10 14:50:19
 *@version
 */
var MailDetailPopupView = (function (_super) {
    __extends(MailDetailPopupView, _super);
    function MailDetailPopupView() {
        var _this = _super.call(this) || this;
        _this.infoWidth = 504;
        return _this;
    }
    MailDetailPopupView.prototype.initView = function () {
        // 内容区
        var contentCon = new BaseDisplayObjectContainer();
        // contentCon.x = 25;
        // contentCon.y = 10;
        contentCon.height = 472;
        this.addChildToContainer(contentCon);
        var contentbg = BaseBitmap.create("mail_detail_view_bg");
        contentbg.width = this.infoWidth;
        contentbg.height = contentCon.height;
        contentCon.addChild(contentbg);
        var content = ComponentMgr.getTextField("", TextFieldConst.SIZE_20, ColorEnums.white);
        content.x = 20;
        content.y = 42;
        content.width = 460;
        content.bold = true;
        contentCon.addChild(content);
        content.strokeColor = 0;
        content.stroke = 2;
        content.text = this._mailInfoVo.content;
        content.wordWrap = true;
        content.height = contentbg.height - content.y;
        content.lineSpacing = 10;
        // 奖励列表区
        if (this._mailInfoVo.rewards != "") {
            var rewardCon = new BaseDisplayObjectContainer();
            rewardCon.y = contentCon.y + contentCon.height + 10;
            rewardCon.width = 504;
            this.addChildToContainer(rewardCon);
            var iconWidth = 108 * 0.8;
            var dx = 15;
            var arr = GameData.formatRewardItem(this._mailInfoVo.rewards);
            var rewardIconStartX = (this.infoWidth - arr.length * iconWidth - (arr.length - 1) * dx) / 2;
            for (var index = 0; index < arr.length; index++) {
                var element = arr[index];
                var item = GameData.getItemIcon(element, element.num);
                rewardCon.addChild(item);
                item.scaleX = 0.8;
                item.scaleY = 0.8;
                item.x = rewardIconStartX + (iconWidth + dx) * index;
                item.y = 5;
                var numTxt = item.getChildByName("numTxt");
                //numTxt.y -= 20;
                numTxt.size = 30;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, rewardCon, contentbg, [0, 0]);
            this.rewardBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("rewardbtntxt"), this.rewardBtnHandler, this, null, null, TextFieldConst.SIZE_28);
            this.addChild(this.rewardBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.rewardBtn, this.viewBg, [0, 25]);
            this.rewardBtn.setEnable(this._mailInfoVo.isread == 0);
        }
        else {
            // contentbg.height = 472;
            if (this._mailInfoVo.isread == 0)
                this.request(NetConst.MAIL_GET_REWARD, { mailId: this.mailID });
        }
    };
    MailDetailPopupView.prototype.initTitle = function () {
        this.titleCon = new BaseDisplayObjectContainer();
        this.addChild(this.titleCon);
        var mailText = ComponentMgr.getTextField(this._mailInfoVo.title, TextFieldConst.SIZE_32, ColorEnums.white);
        mailText.width = 328;
        mailText.bold = true;
        mailText.textAlign = egret.HorizontalAlign.CENTER;
        this.titleCon.addChild(mailText);
        mailText.setPosition(this.viewBg.x + 131, this.viewBg.y + 27);
        mailText.stroke = 2;
        mailText.strokeColor = ColorEnums.black;
        var timeBg = BaseBitmap.create("mail_view_time_bg");
        timeBg.width = 328;
        timeBg.height = 46;
        this.titleCon.addChild(timeBg);
        timeBg.setPosition(this.viewBg.x + 131, this.viewBg.y + 85);
        var timeText = ComponentMgr.getTextField(this._mailInfoVo.timeStr, TextFieldConst.SIZE_20, 0xFFF3B2);
        this.titleCon.addChild(timeText);
        timeText.bold = true;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, timeText, timeBg, [12, 0]);
        timeText.stroke = 2;
        timeText.strokeColor = ColorEnums.mail_strokeColor_1;
        var detaTime = Api.MymailVoApi.getDetaTimeByMailID(this.mailID);
        var detaTimeText = ComponentMgr.getTextField(App.DateUtil.getFormatBySecond(detaTime, 4), TextFieldConst.SIZE_20, 0xFFF3B2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, detaTimeText, timeBg, [12, 0]);
        detaTimeText.bold = true;
        this.titleCon.addChild(detaTimeText);
        detaTimeText.stroke = 2;
        detaTimeText.strokeColor = ColorEnums.mail_strokeColor_1;
    };
    MailDetailPopupView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        this.viewBg.setPosition(24, 121);
        this.viewBg.x = GameConfig.stageWidth / 2 - this.viewBg.width / 2;
        this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
    };
    MailDetailPopupView.prototype.resetBgSize = function () {
        this.container.x = this.viewBg.x + 45;
        this.container.y = this.viewBg.y + 107;
        this.setChildIndex(this.titleCon, this.getChildIndex(this.container));
        this.viewBg.x -= 20;
        this.titleCon.x -= 10;
        this.container.x -= 10;
        this.closeBtn.x = this.viewBg.x + 505;
        this.closeBtn.y = this.viewBg.y + 19;
    };
    MailDetailPopupView.prototype.rewardBtnHandler = function (event) {
        // this.rewardBtn.setEnable(false);
        // App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
        var x = GameConfig.stageWidth / 2;
        var y = GameConfig.stageHeigth / 2;
        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(x, y));
        this.request(NetConst.MAIL_GET_REWARD, { mailId: this.mailID });
    };
    MailDetailPopupView.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        if (data && data.ret) {
            switch (data.data.cmd) {
                case NetConst.MAIL_GET_REWARD:
                    if (this.rewardBtn) {
                        // App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE, {type:"mail"});
                        ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                            title: LangMger.getlocal("reward_pupopview_title"),
                            rewards: data.data.data.rewards,
                            callback: function () {
                                App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                            }
                        });
                        this.rewardBtn.setEnable(false);
                    }
                    break;
                default:
                    break;
            }
        }
    };
    MailDetailPopupView.prototype.getTitleStr = function () {
        return "";
    };
    MailDetailPopupView.prototype.show = function (data) {
        this.mailID = data.data.mailID;
        _super.prototype.show.call(this, data);
        this._mailInfoVo = Api.MymailVoApi.getMailByMailID(data.data.mailID);
    };
    MailDetailPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    MailDetailPopupView.prototype.getBgName = function () {
        return "mail_detail_view_bg2";
    };
    MailDetailPopupView.prototype.getShowHeight = function () {
        return 890;
    };
    MailDetailPopupView.prototype.getCloseBtnName = function () {
        return "mail_view_detail_close_btn";
    };
    // protected getBgExtraHeight():number
    // {
    // 	return 86;
    // }
    MailDetailPopupView.prototype.dispose = function () {
        this.rewardBtn = null;
        this._mailInfoVo = null;
        this.mailID = null;
        _super.prototype.dispose.call(this);
    };
    return MailDetailPopupView;
}(PopupView));
__reflect(MailDetailPopupView.prototype, "MailDetailPopupView");
//# sourceMappingURL=MailDetailPopupView.js.map