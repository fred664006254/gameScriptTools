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
var WelfareViewFunctionScrollltem = (function (_super) {
    __extends(WelfareViewFunctionScrollltem, _super);
    function WelfareViewFunctionScrollltem() {
        var _this = _super.call(this) || this;
        _this._getBtn = null;
        _this._unlockKey = null;
        return _this;
    }
    WelfareViewFunctionScrollltem.prototype.initItem = function (index, data) {
        this._data = data;
        var functionBg = null;
        if (data.gameName == "prison" && Api.switchVoApi.checkOpenNewPrison()) {
            functionBg = BaseLoadBitmap.create("functionPreview" + data.sortId + "_2");
        }
        else {
            if (Api.switchVoApi.checkIsInBlueWife() && ResourceManager.hasRes("functionPreview" + data.sortId + "_blueType")) {
                functionBg = BaseLoadBitmap.create("functionPreview" + data.sortId + "_blueType");
            }
            else {
                functionBg = BaseLoadBitmap.create("functionPreview" + data.sortId);
            }
        }
        functionBg.x = 5;
        functionBg.y = 0;
        this.addChild(functionBg);
        this._unlockKey = data.key;
        var bottom = BaseBitmap.create("funtionbottom");
        bottom.x = 0;
        bottom.width = 492;
        bottom.height = 173;
        bottom.y = 200; //-39;
        this.addChild(bottom);
        //描述
        var describeTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
        describeTxt.width = 480;
        describeTxt.x = 10;
        describeTxt.y = bottom.y + 8;
        describeTxt.text = LanguageManager.getlocal("funciontDes" + data.sortId);
        this.addChild(describeTxt);
        //描述2
        var describeTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt2.width = 450;
        describeTxt2.x = 10;
        describeTxt2.y = bottom.y + 35;
        var str = LanguageManager.getlocal("unlockDes" + data.sortId);
        describeTxt2.text = str;
        this.addChild(describeTxt2);
        //当前文本
        var currTex = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        currTex.x = 10;
        currTex.y = bottom.y + 60;
        var currStr = LanguageManager.getlocal("functionCurrDes");
        currTex.text = currStr + " ";
        this.addChild(currTex);
        //描述3
        var describeTxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt3.width = 450;
        describeTxt3.x = currTex.x + currTex.width + 2;
        describeTxt3.y = bottom.y + 60;
        var str2 = this.getStr(data.sortId);
        describeTxt3.text = str2;
        this.addChild(describeTxt3);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickGetBtnHandler, this);
        this._getBtn = getBtn;
        this._getBtn.setPosition(350, 290);
        this.addChild(this._getBtn);
        var iconList = GameData.getRewardItemIcons(data.reward, true, false);
        if (iconList && iconList.length > 0) {
            // //额外赠送ICON
            var startX = 20;
            var startY = 283;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.scaleX = 0.74;
                icon.scaleY = 0.74;
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
                _icon = icon;
            }
        }
        var modelName = data.gameName;
        if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
            var isShowNpc = Api[modelName + "VoApi"].isShowNpc();
            if (isShowNpc == true) {
                var arr = Api.otherInfoVoApi.getUnlockList();
                if (arr[Number(data.key)] == 1) {
                    var hasGetSp = BaseBitmap.create("collectflag");
                    hasGetSp.x = this._getBtn.x;
                    hasGetSp.y = this._getBtn.y;
                    this.addChild(hasGetSp);
                    this._getBtn.visible = false;
                }
                else {
                    this._getBtn.visible = true;
                }
                var str_1 = LanguageManager.getlocal("functionCurrDes2");
                describeTxt3.text = str_1; //"已解锁";
                describeTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
            }
            else {
                this._getBtn.touchEnabled = false;
                App.DisplayUtil.changeToGray(this._getBtn);
                describeTxt3.textColor = TextFieldConst.COLOR_WARN_RED3;
            }
        }
    };
    WelfareViewFunctionScrollltem.prototype.refreshBtnState = function () {
        var arr = Api.otherInfoVoApi.getUnlockList();
        if (this._getBtn) {
            if (arr[Number(this._data.key)] == 1) {
                var hasGetSp = BaseBitmap.create("collectflag");
                hasGetSp.x = this._getBtn.x;
                hasGetSp.y = this._getBtn.y;
                this.addChild(hasGetSp);
                this._getBtn.visible = false;
            }
            else {
                this._getBtn.visible = true;
            }
        }
    };
    WelfareViewFunctionScrollltem.prototype.clickGetBtnHandler = function (evt) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD), this.useCallback, this);
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD, { "unlockKey": this._unlockKey });
    };
    WelfareViewFunctionScrollltem.prototype.useCallback = function (evt) {
        if (evt.data.ret) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
            this.refreshBtnState();
        }
    };
    WelfareViewFunctionScrollltem.prototype.getStr = function (soId) {
        var str = "";
        if (soId == 1) {
            //红颜
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 3) {
            //当前打到第几章
            var currId = Api.challengeVoApi.getCurBigChannelId();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + currId]);
            return str;
        }
        if (soId == 2) {
            //子嗣
            var childNum = Api.childVoApi.getCnum();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + childNum]);
            return str;
        }
        if (soId == 4) {
            //联姻
            var num = Api.adultVoApi.getAdultMarryNum();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + num]);
            return str;
        }
        if (soId == 5) {
            var level = Api.composemapVoApi.getMaxLv();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + level]);
            return str;
        }
        if (soId == 6) {
            //当前打到第几章  "{1}个门客且{2}门客等级大于等于60"
            var str1 = Api.servantVoApi.getServantCount();
            var str2 = Api.servantVoApi.getServantCountLevel60Plus();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + str1, str2 + ""]);
            return str;
        }
        if (soId == 7 || soId == 8 || soId == 9) {
            //7酒楼 8联盟 9演武场
            var level = Api.composemapVoApi.getMaxLv();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + level]);
            return str;
        }
        if (soId == 10) {
            //征伐
            var currId = Api.challengeVoApi.getCurBigChannelId();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + currId]);
            return str;
        }
        if (soId == 11) {
            //商贸
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        return str;
    };
    WelfareViewFunctionScrollltem.prototype.getSpaceY = function () {
        return 1;
    };
    WelfareViewFunctionScrollltem.prototype.getSpaceX = function () {
        return 0;
    };
    WelfareViewFunctionScrollltem.prototype.dispose = function () {
        this._getBtn = null;
        this._unlockKey = null;
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewFunctionScrollltem;
}(ScrollListItem));
__reflect(WelfareViewFunctionScrollltem.prototype, "WelfareViewFunctionScrollltem");
