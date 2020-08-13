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
var AcCrossServerWipeBossAttackedPopupView = (function (_super) {
    __extends(AcCrossServerWipeBossAttackedPopupView, _super);
    function AcCrossServerWipeBossAttackedPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AcCrossServerWipeBossAttackedPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    Object.defineProperty(AcCrossServerWipeBossAttackedPopupView.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAttackedPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAttackedPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossAttackedPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        this.addTouchTap(this.hide, this);
        //type 1 最后一击   2 战斗  3 被别人击杀
        var dataInfo = this.param.data;
        var bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
        if (dataInfo.type == 1) {
            this.viewBg.height = 300;
        }
        else {
            this.viewBg.height = 200;
        }
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBossHasKill", [bossCfg.npcName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            descTxt_1.setPosition((this.viewBg.width - descTxt_1.width) / 2, 38);
            this.addChildToContainer(descTxt_1);
            return;
        }
        var bossName = bossCfg.npcName;
        var titlePic;
        var descStr;
        if (dataInfo.type == 1) {
            titlePic = "accrossserverwipeBoss_killTitle";
            descStr = LanguageManager.getlocal("accrossserverwipeBossResult1", [bossName, bossName, String(dataInfo.damage)]);
        }
        else {
            titlePic = "accrossserverwipeBoss_fightTitle";
            descStr = LanguageManager.getlocal("accrossserverwipeBossResult2", [bossName, String(dataInfo.damage)]);
        }
        var title = ComponentManager.getTextField(LanguageManager.getlocal(titlePic), 40, 0xffd447); //.create(titlePic);
        title.setPosition((this.viewBg.width - title.width) / 2, 10);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(descStr, 20, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.width = 480;
        descTxt.lineSpacing = 3;
        this.addChildToContainer(descTxt);
        // let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore',[dataInfo.exp]),20,TextFieldConst.COLOR_WARN_GREEN2);
        // this.addChildToContainer(rightScoreTxt);
        var rightScoreTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossBattleScore1', [dataInfo.attackexp]), 20, TextFieldConst.COLOR_WARN_GREEN2);
        var rightScoreTxt2 = null;
        if (dataInfo.killexp != 0) {
            rightScoreTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossBattleScore2', [dataInfo.killexp]), 20, TextFieldConst.COLOR_WARN_GREEN2);
            this.addChildToContainer(rightScoreTxt2);
        }
        this.addChildToContainer(rightScoreTxt1);
        if (dataInfo.type == 1) {
            descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 10);
            rightScoreTxt1.setPosition((this.viewBg.width - rightScoreTxt1.width) / 2, descTxt.y + descTxt.height + 10);
            var overY = rightScoreTxt1.y + rightScoreTxt1.height;
            if (rightScoreTxt2) {
                rightScoreTxt2.setPosition((this.viewBg.width - rightScoreTxt2.width) / 2, rightScoreTxt1.y + rightScoreTxt1.height + 10);
                overY = rightScoreTxt2.y + rightScoreTxt2.height;
            }
            var rewardVo = GameData.formatRewardItem(dataInfo.rewards)[0];
            var rewardIcon = GameData.getItemIcon(rewardVo);
            rewardIcon.setScale(0.85);
            rewardIcon.setPosition((this.viewBg.width - rewardIcon.width * rewardIcon.scaleX) / 2, overY + 15);
            this.addChildToContainer(rewardIcon);
        }
        else {
            descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 30);
            rightScoreTxt1.setPosition((this.viewBg.width - rightScoreTxt1.width) / 2, descTxt.y + descTxt.height + 30);
            if (rightScoreTxt2) {
                rightScoreTxt2.setPosition((this.viewBg.width - rightScoreTxt2.width) / 2, rightScoreTxt1.y + rightScoreTxt1.height + 10);
            }
        }
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AcCrossServerWipeBossAttackedPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossAttackedPopupView;
}(PopupView));
__reflect(AcCrossServerWipeBossAttackedPopupView.prototype, "AcCrossServerWipeBossAttackedPopupView");
