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
 * 好友
 * author qianjun
 * ddate 2018/06/21
 * @class FriendScrollItem
 */
var ZhenqifangSelectFriendItem = (function (_super) {
    __extends(ZhenqifangSelectFriendItem, _super);
    function ZhenqifangSelectFriendItem() {
        var _this = _super.call(this) || this;
        _this._uiType = "";
        return _this;
    }
    ZhenqifangSelectFriendItem.prototype.initItem = function (index, data, itemParm) {
        var _this = this;
        this._uiData = data;
        if (this._uiData.sadTitle || this._uiData.friendsTitle) {
            var titlebg = BaseBitmap.create("friends_progressbg");
            titlebg.width = 530;
            this.addChild(titlebg);
            titlebg.addTouchTap(this.titlebgHandler, this);
            this._titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("friendPageName1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._titleTxt.x = titlebg.x + titlebg.width / 2 - 40;
            this._titleTxt.y = titlebg.y + 15;
            this.addChild(this._titleTxt);
            this._titleArrow = BaseBitmap.create('friends_arrow2');
            this._titleArrow.x = this._titleTxt.x + 45;
            this._titleArrow.y = titlebg.y + 25;
            this._titleArrow.anchorOffsetY = this._titleArrow.height / 2;
            // this._titleArrow.scaleY = -1;
            this.addChild(this._titleArrow);
            if (this._uiData.friendsTitle) {
                this._titleTxt.text = LanguageManager.getlocal("friendPageName2");
                this._titleArrow.scaleY = Api.friendVoApi.isHideFriendsList() ? -1 : 1;
            }
            else {
                this._titleArrow.scaleY = Api.friendVoApi.isHideSaduList() ? -1 : 1;
            }
            if (PlatformManager.checkIsEnLang()) {
                this._titleTxt.x = titlebg.x + titlebg.width / 2 - this._titleTxt.width / 2;
                this._titleArrow.x = titlebg.x + titlebg.width - this._titleArrow.width - 15;
            }
            this.width = 530;
            this.height = titlebg.height;
            return;
        }
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 522;
        bg.height = 129;
        this._bg = bg;
        //bg.addTouchTap(this.showUserShot,this);
        //弹窗类型
        if (itemParm.uiType) {
            this._uiType = itemParm.uiType;
        }
        else {
            this._uiType = FriendScrollItem.UITYPE1;
        }
        if (data.uiType && (itemParm.uiType == FriendScrollItem.UITYPE7 || itemParm.uiType == FriendScrollItem.UITYPE1)) {
            this._uiType = data.uiType;
        }
        this.addChild(bg);
        //通用信息:头像，名字，线，官职，权势，帮会，
        // let avatar = Api.playerVoApi.getPlayerCircleHead(this._uiData.pic, this._uiData.ptitle);
        var avatar = Api.playerVoApi.getPlayerCircleHead(this._uiData.pic, this._uiData.ptitle);
        avatar.x = bg.x + 20;
        avatar.y = bg.y + bg.height / 2 - avatar.height / 2 + 7;
        var nameStr = data.name;
        nameStr = nameStr ? nameStr : "no-one";
        if (this._uiType == FriendScrollItem.UITYPE7) {
            var info = Api.adultVoApi.getFreiendNums2(this._uiData.friend);
            nameStr += "<font color=" + TextFieldConst.COLOR_WARN_GREEN2 + ">\uFF08" + LanguageManager.getlocal("reward") + "+" + (Config.ZhenqifangCfg.rltvByMarr[info.quality - 1] * 100).toFixed(0) + "%\uFF09</font>";
        }
        var nameTxt = ComponentManager.getTextField(nameStr, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        nameTxt.x = bg.x + 130;
        nameTxt.y = bg.y + 10;
        this.addChild(nameTxt);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.name = "lineImg";
        lineImg.y = nameTxt.y + 25;
        this.addChild(lineImg);
        this.addChild(avatar);
        //官职
        var officeTxt = ComponentManager.getTextField("officeTxt", 20, TextFieldConst.COLOR_BROWN);
        officeTxt.text = LanguageManager.getlocal("mainui_officer") + LanguageManager.getlocal("officialTitle" + this._uiData.level);
        officeTxt.x = nameTxt.x;
        officeTxt.y = lineImg.y + 20;
        this.addChild(officeTxt);
        //今日协助次数
        var powerTxt = ComponentManager.getTextField("powerTxt", 20, TextFieldConst.COLOR_BROWN);
        var total = Config.ZhenqifangCfg.friend.supportTimes;
        var cur = total - Api.zhenqifangVoApi.getFriendSupportTimes(data.uid);
        powerTxt.text = LanguageManager.getlocal("zhenqifangcdtip5", [String(cur == 0 ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN2), cur.toString(), total.toString()]);
        powerTxt.x = nameTxt.x;
        powerTxt.y = officeTxt.y + 25;
        this.addChild(powerTxt);
        //是否有符合条件门客
        // let ishave = false;
        // let allianceTxt = ComponentManager.getTextField("allianceTxt",20,TextFieldConst.COLOR_BROWN);
        // allianceTxt.text = LanguageManager.getlocal(ishave ? "zhenqifangcdtip6" : "zhenqifangcdtip7"); 
        // allianceTxt.x = nameTxt.x;
        // allianceTxt.y = powerTxt.y + 25;
        // this.addChild(allianceTxt);
        //请援
        var giftBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "actracksupport", function () {
            //
            var cur = Api.zhenqifangVoApi.getFriendSupportTimes(data.uid);
            if (cur >= total) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip14"));
                return;
            }
            if (Api.zhenqifangVoApi.getIsInFuidUseList(_this._uiData.uid)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip25"));
                return;
            }
            if (_this._uiType == FriendScrollItem.UITYPE7) {
                Api.zhenqifangVoApi.otherinfo = {};
                Api.zhenqifangVoApi.otherinfo.friend = _this._uiData.friend;
                Api.zhenqifangVoApi.otherinfo.times = _this._uiData.times;
            }
            else {
                Api.zhenqifangVoApi.otherinfo = null;
            }
            NetManager.request(NetRequestConst.REQUEST_ZQF_GETFRIENDSERVANT, {
                fuid: data.uid
            });
        }, this);
        giftBtn.x = this._bg.x + this._bg.width - giftBtn.width - 15;
        giftBtn.y = this._bg.y + 70;
        giftBtn.name = "giftBtn";
        this.addChild(giftBtn);
        if (this._uiType == FriendScrollItem.UITYPE1 || this._uiType == FriendScrollItem.UITYPE7) {
            if (this._uiType == FriendScrollItem.UITYPE7) {
                var info = Api.adultVoApi.getFreiendNums2(this._uiData.friend);
                var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 102);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, giftBtn, [0, -progress.height * 2 - 3]);
                this.addChild(progress);
                progress.setPercentage(info.percent, LanguageManager.getlocal("adultFriendDesc" + info.quality), TextFieldConst.COLOR_WHITE);
            }
        }
        if (Api.zhenqifangVoApi.getIsInFuidUseList(this._uiData.uid)) {
            var isinuse = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip24"), 20, TextFieldConst.COLOR_BROWN);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, isinuse, giftBtn, [0, -powerTxt.height - 3]);
            this.addChild(isinuse);
        }
        else {
            if (Api.zhenqifangVoApi.friendsendList[this._uiData.uid]) {
                var num = Object.keys(Api.zhenqifangVoApi.friendsendList[this._uiData.uid]).length;
                if (num > 0) {
                    var powerTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangcdtip19", [num.toString()]), 20, TextFieldConst.COLOR_BROWN);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, powerTxt_1, giftBtn, [0, -powerTxt_1.height - 3]);
                    this.addChild(powerTxt_1);
                }
            }
        }
    };
    ZhenqifangSelectFriendItem.prototype.titlebgHandler = function () {
        if (!this._uiData) {
            return;
        }
        if (this._uiData.sadTitle) {
            Api.friendVoApi.hideSaduList(!Api.friendVoApi.isHideSaduList());
            if (this._titleArrow) {
                this._titleArrow.scaleY = Api.friendVoApi.isHideSaduList() ? -1 : 1;
            }
        }
        if (this._uiData && this._uiData.friendsTitle) {
            Api.friendVoApi.hideFriendsList(!Api.friendVoApi.isHideFriendsList());
            if (this._titleArrow) {
                this._titleArrow.scaleY = Api.friendVoApi.isHideFriendsList() ? -1 : 1;
            }
        }
    };
    ZhenqifangSelectFriendItem.prototype.userShotCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        var rData = event.data.data;
        if (rData.ret == 0) {
            var data = rData.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    ZhenqifangSelectFriendItem.prototype.showUserShot = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._uiData.uid });
    };
    ZhenqifangSelectFriendItem.prototype.getSpaceX = function () {
        return 4;
    };
    ZhenqifangSelectFriendItem.prototype.getSpaceY = function () {
        return 5;
    };
    ZhenqifangSelectFriendItem.prototype.dispose = function () {
        this._uiType = "";
        this._bg = null;
        this._uiData = null;
        this._titleTxt = null;
        this._titleArrow = null;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangSelectFriendItem;
}(ScrollListItem));
__reflect(ZhenqifangSelectFriendItem.prototype, "ZhenqifangSelectFriendItem");
//# sourceMappingURL=ZhenqifangSelectFriendItem.js.map