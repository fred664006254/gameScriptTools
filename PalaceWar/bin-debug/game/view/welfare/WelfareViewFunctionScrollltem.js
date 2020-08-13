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
        var functionBg = null;
        if (data.gameName == "prison" && Api.switchVoApi.checkOpenNewPrison()) {
            functionBg = BaseLoadBitmap.create("functionPreview" + data.key + "_2");
        }
        else {
            if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes("functionPreview" + data.key + "_blueType")) {
                functionBg = BaseLoadBitmap.create("functionPreview" + data.key + "_blueType");
            }
            else {
                functionBg = BaseLoadBitmap.create("functionPreview" + data.key);
            }
        }
        functionBg.x = 0;
        functionBg.y = 0;
        this.addChild(functionBg);
        this._unlockKey = data.key;
        var bottom = BaseBitmap.create("funtionbottom");
        bottom.x = 0;
        bottom.y = 193; //-39;
        this.addChild(bottom);
        //描述
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        describeTxt.width = 480;
        describeTxt.x = 10;
        describeTxt.y = bottom.y + 5;
        describeTxt.text = LanguageManager.getlocal("functionModuleDes" + data.key);
        this.addChild(describeTxt);
        //描述2
        var describeTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt2.width = 480;
        describeTxt2.x = 10;
        describeTxt2.y = bottom.y + 35;
        var str = LanguageManager.getlocal("unlockDes" + data.key);
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
        var str2 = this.getStr(data.key);
        describeTxt3.text = str2;
        this.addChild(describeTxt3);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.clickGetBtnHandler, this);
        this._getBtn = getBtn;
        this._getBtn.setPosition(335, 290);
        this.addChild(this._getBtn);
        var iconList = GameData.getRewardItemIcons(data.reward, true, false);
        if (iconList && iconList.length > 0) {
            // //额外赠送ICON
            var startX = 20;
            var startY = 280;
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
        if (modelName == "wifeBattle") {
            modelName = "wifebattle";
        }
        if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
            var isShowNpc = Api[modelName + "VoApi"].isShowNpc();
            if (isShowNpc == true) {
                var arr = Api.otherInfoVoApi.getUnlockList();
                if (arr[Number(data.key)] == 1) {
                    var hasGetSp = BaseBitmap.create("signin_had_get");
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
                describeTxt3.textColor = TextFieldConst.COLOR_WARN_RED;
            }
        }
    };
    WelfareViewFunctionScrollltem.prototype.refreshBtnState = function () {
        if (this._getBtn) {
            var hasGetSp = BaseBitmap.create("signin_had_get");
            hasGetSp.x = this._getBtn.x;
            hasGetSp.y = this._getBtn.y;
            this.addChild(hasGetSp);
            this._getBtn.visible = false;
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
        //sadun 亲家 5
        //friend 好友 6 
        //search  寻访 7 
        //council  内阁
        //studyatk	wife
        var str = "";
        if (soId == 2) {
            //红颜	wife
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 1) {
            //当前打到第几章	prison
            var currId = Api.challengeVoApi.getCurBigChannelId();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + currId]);
            return str;
        }
        if (soId == 3) {
            //子嗣	child
            var childNum = Api.childVoApi.getCnum();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + childNum]);
            return str;
        }
        if (soId == 4) {
            //联姻	adult
            var num = Api.adultVoApi.getAdultMarryNum();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + num]);
            return str;
        }
        if (soId == 5) {
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 6) {
            //当前打到第几章  "{1}个门客且{2}门客等级大于等于60"
            var str1 = Api.servantVoApi.getServantCount();
            var str2 = Api.servantVoApi.getServantCountLevel60Plus();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + str1, str2 + ""]);
            return str;
        }
        if (soId == 7) {
            //酒楼
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 8) {
            //联盟
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 9) {
            //演武场
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
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
        if (soId == 12) {
            var achVo = Api.achievementVoApi.getAchievementInfoVoById("403");
            var level = Api.playerVoApi.getPlayerLevel();
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + achVo.v]);
            return str;
        }
        if (soId == 13) {
            //好友
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        if (soId == 14) {
            //内阁
            var level = Api.playerVoApi.getPlayerLevel();
            var officStr = LanguageManager.getlocal("officialTitle" + level);
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + officStr]);
            return str;
        }
        else if (soId == 15) {
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + Api.servantVoApi.getServantCount()]);
            return str;
        }
        else if (soId == 16) {
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + Api.wifeVoApi.getWifeNum()]);
            return str;
        }
        else if (soId == 17) {
            var str_2 = "";
            if (Config.ServantweaponCfg.lvNeed > Api.playerVoApi.getPlayerLevel()) {
                str_2 += LanguageManager.getlocal("functionCurrentDes17_1", [LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel())]);
            }
            else {
                str_2 += LanguageManager.getlocal("functionCurrentDes17_4", [LanguageManager.getlocal("officialTitle" + Api.playerVoApi.getPlayerLevel())]);
            }
            str_2 += LanguageManager.getlocal("douhao");
            if (Config.GamepaceCfg.getWeaponPace() > Api.otherInfoVoApi.getServerOpenDay()) {
                var day = Config.GamepaceCfg.getWeaponPace() - Api.otherInfoVoApi.getServerOpenDay();
                str_2 += LanguageManager.getlocal("functionCurrentDes17_2", [String(day)]);
            }
            else {
                str_2 += LanguageManager.getlocal("functionCurrentDes17_3");
            }
            return str_2;
        }
        else if (soId == 18) {
            str = LanguageManager.getlocal("functionCurrentDes" + soId, ["" + Api.wifestatusVoApi.getStatusWifeNum()]);
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD), this.useCallback, this);
        this._getBtn = null;
        this._unlockKey = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewFunctionScrollltem;
}(ScrollListItem));
__reflect(WelfareViewFunctionScrollltem.prototype, "WelfareViewFunctionScrollltem");
//# sourceMappingURL=WelfareViewFunctionScrollltem.js.map