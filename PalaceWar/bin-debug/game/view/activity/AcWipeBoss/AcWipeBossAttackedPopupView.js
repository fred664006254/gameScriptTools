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
var AcWipeBossAttackedPopupView = (function (_super) {
    __extends(AcWipeBossAttackedPopupView, _super);
    function AcWipeBossAttackedPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AcWipeBossAttackedPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            //"dailybosslastattackpopupview",
            "dailybosslastattacktitle",
            "allianceboss_fight_text"
        ]);
    };
    Object.defineProperty(AcWipeBossAttackedPopupView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossAttackedPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossAttackedPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossAttackedPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.addTouchTap(this.hide, this);
        //type 1 最后一击   2 战斗  3 被别人击杀
        var dataInfo = this.param.data;
        var bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill", [bossCfg.npcName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            descTxt_1.setPosition((this.viewBg.width - descTxt_1.width) / 2, 38);
            this.addChildToContainer(descTxt_1);
            return;
        }
        var bossName = bossCfg.npcName;
        var titlePic;
        var descStr;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        var maxbossValue = this.vo.getWipeBossMaxHp(bossCfg.id);
        var percent = "";
        var per = 0.001;
        if ((maxbossValue * per / 100) > dataInfo.damage) {
            percent = LanguageManager.getlocal("alliancebossdamage1", [per.toString()]);
        }
        else {
            var value = dataInfo.damage / maxbossValue * 100;
            var str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0, -1));
            percent = LanguageManager.getlocal("alliancebossdamage2", [str + "%"]);
        }
        if (dataInfo.type == 1) {
            titlePic = "wipebosskilltitle";
            descStr = LanguageManager.getlocal("alliancebossattacked3", [bossName, bossName, String(dataInfo.damage), percent]);
        }
        else {
            titlePic = "allianceboss_fight_text";
            descStr = LanguageManager.getlocal("alliancebossattacked4", [bossName, String(dataInfo.damage), percent]);
        }
        var title = BaseBitmap.create(titlePic);
        title.setPosition((this.viewBg.width - title.width) / 2, 10);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.width = 640;
        descTxt.lineSpacing = 6;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 18);
        this.addChildToContainer(descTxt);
        var offY = 0;
        if (dataInfo.type == 1) {
            var rewardVo = GameData.formatRewardItem(dataInfo.rewards)[0];
            var rewardIcon = GameData.getItemIcon(rewardVo);
            rewardIcon.setPosition((this.viewBg.width - rewardIcon.width) / 2, descTxt.y + descTxt.height + 16);
            this.addChildToContainer(rewardIcon);
            offY = 105;
        }
        var rightScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore', [dataInfo.exp]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        rightScoreTxt.setPosition((this.viewBg.width - rightScoreTxt.width) / 2, descTxt.y + descTxt.height + offY + 30);
        this.addChildToContainer(rightScoreTxt);
    };
    AcWipeBossAttackedPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcWipeBossAttackedPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcWipeBossAttackedPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcWipeBossAttackedPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcWipeBossAttackedPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcWipeBossAttackedPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AcWipeBossAttackedPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossAttackedPopupView;
}(PopupView));
__reflect(AcWipeBossAttackedPopupView.prototype, "AcWipeBossAttackedPopupView");
//# sourceMappingURL=AcWipeBossAttackedPopupView.js.map