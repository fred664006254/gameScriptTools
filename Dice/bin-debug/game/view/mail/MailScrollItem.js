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
 * 商店滑动item
 * author dmj
 * date 2017/10/28
 * @class ShopScrollItem
 */
/*
 *@description: dice mail item 从江山美人改的
 *@author: hwc
 *@update date: 2020-04-09 11:08:18
 *@version 2.1.0
 */
var MailScrollItem = (function (_super) {
    __extends(MailScrollItem, _super);
    function MailScrollItem() {
        var _this = _super.call(this) || this;
        // 选中sp
        _this._selectedSp = null;
        return _this;
    }
    MailScrollItem.prototype.initItem = function (index, data) {
        this._selectedIndex = index;
        this._mailInfoVo = Api.MymailVoApi.getMailByMailID(data);
        this._mailID = data;
        var temW = 503;
        var temH = 135;
        this.width = temW;
        this.height = temH;
        var contain = new BaseDisplayObjectContainer();
        // this.width = temW;
        this.height = temH + 10;
        var bg = BaseBitmap.create("mail_list_item_bg");
        this._bg = bg;
        bg.width = temW;
        bg.height = temH;
        bg.y = 17;
        this.addChild(bg);
        // let timeBg = BaseBitmap.create();
        // this.addChild(timeBg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeBg, bg, [0,0]);
        if (this._mailInfoVo.isread == 0) {
            contain.setPosition(4, 0);
            this.addChild(contain);
            var new_mail = BaseBitmap.create("mail_view_label");
            new_mail.x = 0;
            new_mail.y = 0;
            contain.addChild(new_mail);
            var txt = ComponentMgr.getTextField(LangMger.getlocal("newemail"), TextFieldConst.SIZE_24, ColorEnums.white);
            contain.addChild(txt);
            txt.setPosition(15, 20);
            txt.stroke = 2;
            txt.strokeColor = ColorEnums.mail_strokeColor_1;
            txt.rotation = -20;
        }
        var xuxian = BaseBitmap.create("mail_view_xuxian");
        this.addChild(xuxian);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, xuxian, bg, [20, 46]);
        var titlestr = this.cutTxt(this._mailInfoVo.title, 9); // 
        var titleTF = ComponentMgr.getTextField(titlestr, TextFieldConst.SIZE_28, ColorEnums.white);
        titleTF.x = 77;
        titleTF.y = 11 + bg.y;
        this.addChild(titleTF);
        this._mailTitleTF = titleTF;
        titleTF.strokeColor = ColorEnums.mail_strokeColor_1;
        var timeTF = ComponentMgr.getTextField(this._mailInfoVo.timeStr, TextFieldConst.SIZE_20, ColorEnums.white);
        timeTF.x = temW - timeTF.width - 20;
        timeTF.y = titleTF.y;
        this.addChild(timeTF);
        timeTF.strokeColor = ColorEnums.mail_strokeColor_1;
        var showTxt = this.cutTxt(this._mailInfoVo.content);
        var contentTF = ComponentMgr.getTextField(showTxt, TextFieldConst.SIZE_20, ColorEnums.mail_color_1);
        contentTF.height = 70;
        contentTF.width = 465;
        contentTF.x = 20;
        contentTF.y = titleTF.y + titleTF.height + 15;
        contentTF.lineSpacing = 3;
        this.addChild(contentTF);
        this.controlSelectedState(2);
        this.updateMailState();
        this.addTouch(this.clickItemHandler, this, null, true);
        // TickMgr.addTick(this.tick,this);
    };
    MailScrollItem.prototype.cutTxt = function (context, len) {
        len = len || 60;
        if (!context || context.length <= 0)
            return "";
        var tem = "";
        if (context.length > len) {
            tem = context.substr(0, len);
            tem += "...";
        }
        else {
            tem = context;
        }
        return tem;
    };
    MailScrollItem.prototype.tick = function () {
    };
    MailScrollItem.prototype.clickItemHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._isBegin = true;
                this.controlSelectedState(1);
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._isBegin) {
                    this._isBegin = false;
                    this.callbackHanler();
                    this.controlSelectedState(2);
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._isBegin = false;
                this.controlSelectedState(2);
                break;
        }
    };
    /**
     *
     * @param state 1:选中，2：非选中
     */
    MailScrollItem.prototype.controlSelectedState = function (state) {
        if (this._bg) {
            var curButtonName = "";
            switch (state) {
                case 1:
                    if (this._selectedSp) {
                        this._selectedSp.visible = true;
                    }
                    break;
                case 2:
                    if (this._selectedSp) {
                        this._selectedSp.visible = false;
                    }
                    break;
            }
        }
    };
    /**
     * 更新邮件状态
     * @param state 0:未读，1:已读
     */
    MailScrollItem.prototype.updateMailState = function () {
    };
    MailScrollItem.prototype.callbackHanler = function (param) {
        ViewController.getInstance().openView(ViewConst.MAINDETAILPOPUPVIEW, { index: this._selectedIndex, "mailID": this._mailID });
    };
    MailScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    MailScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    MailScrollItem.prototype.dispose = function () {
        this._bg = null;
        this._mailInfoVo = null;
        this._mailTitleTF = null;
        _super.prototype.dispose.call(this);
    };
    return MailScrollItem;
}(ScrollListItem));
__reflect(MailScrollItem.prototype, "MailScrollItem");
//# sourceMappingURL=MailScrollItem.js.map