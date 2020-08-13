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
var AcLocTombAttackPopupView = (function (_super) {
    __extends(AcLocTombAttackPopupView, _super);
    function AcLocTombAttackPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    AcLocTombAttackPopupView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            //"dailybosslastattackpopupview",
            "dailybosslastattacktitle",
            "allianceboss_fight_text",
            "tombfighttitle-" + code,
            "tombfighttitlebg-" + code,
            "tombkill-" + code,
            "tombreward-" + code
        ]);
    };
    Object.defineProperty(AcLocTombAttackPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAttackPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAttackPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAttackPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAttackPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombAttackPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        //type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
        var dataInfo = this.param.data;
        var bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill", [bossCfg.getnpcName(this.code)]), 20, TextFieldConst.COLOR_WHITE);
            descTxt_1.setPosition((this.viewBg.width - descTxt_1.width) / 2, 38);
            this.addChildToContainer(descTxt_1);
            return;
        }
        var height = 0;
        var bosskey = dataInfo.bosskey;
        var isSelfKill = dataInfo.type == 4 && Api.playerVoApi.getPlayerID() == this.vo.getTombKillUid(bossCfg.id, bosskey);
        if (dataInfo.type == 1) {
            height = 255;
        }
        else if (dataInfo.type == 2) {
            height = 170;
        }
        else {
            height = isSelfKill ? 290 : 190;
        }
        this.viewBg.height = height;
        this.viewBg.y = (GameConfig.stageHeigth - height) / 2;
        var bossName = bossCfg.getnpcName(this.code);
        var titlePic;
        var descStr;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        var maxbossValue = this.vo.getTombMaxHp(bossCfg.id);
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
        var titelbg = BaseBitmap.create("tombfighttitlebg-" + this.code);
        titelbg.setPosition((this.viewBg.width - titelbg.width) / 2, (-titelbg.height) / 2);
        this.addChildToContainer(titelbg);
        if (dataInfo.type == 1) {
            titlePic = "tombreward-" + this.code;
            descStr = LanguageManager.getlocal("alliancebossattacked3", [bossName, bossName, String(dataInfo.damage), percent]);
        }
        else if (dataInfo.type == 2) {
            titlePic = "tombfighttitle-" + this.code;
            descStr = LanguageManager.getlocal("alliancebossattacked4", [bossName, String(dataInfo.damage), percent]);
        }
        else if (dataInfo.type == 4) {
            titlePic = "tombkill-" + this.code;
            var peoplenum = this.vo.getTombKillNum(bossCfg.id, bosskey);
            var zid = this.vo.getTombKillZid(bossCfg.id, bosskey);
            var killname = this.vo.getTombKiller(bossCfg.id, bosskey);
            descStr = LanguageManager.getlocal("loctombattacktip1-" + this.code, [bossName, String(peoplenum), killname, Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid)]);
        }
        var title = BaseBitmap.create(titlePic);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, titelbg);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(descStr, 20, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.width = 640;
        descTxt.lineSpacing = 6;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, titelbg.y + titelbg.height - 5);
        this.addChildToContainer(descTxt);
        var offY = 0;
        if (dataInfo.type == 1 || isSelfKill) {
            var rewardVo = GameData.formatRewardItem(dataInfo.rewards)[0];
            var rewardIcon = GameData.getItemIcon(rewardVo, true);
            rewardIcon.setPosition((this.viewBg.width - rewardIcon.width) / 2, descTxt.y + descTxt.height + 16 + (dataInfo.type == 4 ? 35 : 0));
            this.addChildToContainer(rewardIcon);
            offY = 105;
        }
        if (isSelfKill) {
            var awardTXT = ComponentManager.getTextField(LanguageManager.getlocal("loctombattacktip2-" + this.code), 20);
            awardTXT.setPosition((this.viewBg.width - awardTXT.width) / 2, descTxt.y + descTxt.height + 10);
            this.addChildToContainer(awardTXT);
        }
        if (dataInfo.type < 4) {
            var rightScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore', [dataInfo.exp]), 20, TextFieldConst.COLOR_WARN_GREEN);
            rightScoreTxt.setPosition((this.viewBg.width - rightScoreTxt.width) / 2, descTxt.y + descTxt.height + offY + 30);
            this.addChildToContainer(rightScoreTxt);
        }
    };
    AcLocTombAttackPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcLocTombAttackPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcLocTombAttackPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcLocTombAttackPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcLocTombAttackPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcLocTombAttackPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AcLocTombAttackPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombAttackPopupView;
}(PopupView));
__reflect(AcLocTombAttackPopupView.prototype, "AcLocTombAttackPopupView");
//# sourceMappingURL=AcLocTombAttackPopupView.js.map