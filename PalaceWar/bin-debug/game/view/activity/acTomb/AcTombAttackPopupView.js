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
var AcTombAttackPopupView = (function (_super) {
    __extends(AcTombAttackPopupView, _super);
    function AcTombAttackPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._cancelback = false;
        return _this;
    }
    AcTombAttackPopupView.prototype.getResourceList = function () {
        var code = this.getUicode();
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
    Object.defineProperty(AcTombAttackPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAttackPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAttackPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAttackPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombAttackPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombAttackPopupView.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombAttackPopupView.prototype.initView = function () {
        var code = this.getUicode();
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this.param.data.cancelCallback) {
            this._cancelback = this.param.data.cancelCallback;
        }
        //type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
        var dataInfo = this.param.data;
        var bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
        if (dataInfo.type == 3) {
            var descTxt_1 = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill", [bossCfg.getnpcName(code)]), 20, TextFieldConst.COLOR_WHITE);
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
            if (this.vo.gettotalShopScore() >= this.cfg.maxScore) {
                height = 255;
            }
        }
        else {
            height = isSelfKill ? 290 : 190;
        }
        this.viewBg.height = height;
        this.viewBg.y = (GameConfig.stageHeigth - height) / 2;
        var bossName = bossCfg.getnpcName(code);
        var titlePic;
        var descStr;
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
        // if (this.param.data && this.param.data.f && this.param.data.o)
        // {
        // 	this._obj = this.param.data.o;
        // 	this._callbackF = this.param.data.f;
        // }
        var maxbossValue = 0;
        if (bossCfg.id != 12) {
            maxbossValue = this.vo.getTombMaxHp(bossCfg.id);
        }
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
        var titelbg = BaseBitmap.create("tombfighttitlebg-" + code);
        titelbg.setPosition((this.viewBg.width - titelbg.width) / 2, (-titelbg.height) / 2);
        this.addChildToContainer(titelbg);
        if (dataInfo.type == 1) {
            titlePic = "tombreward-" + code;
            descStr = LanguageManager.getlocal("alliancebossattacked3", [bossName, bossName, String(dataInfo.damage), percent]);
        }
        else if (dataInfo.type == 2) {
            titlePic = "tombfighttitle-" + code;
            if (dataInfo.index == 12) {
                descStr = LanguageManager.getlocal("alliancebossattacked2", [bossName, String(dataInfo.damage)]);
            }
            else {
                descStr = LanguageManager.getlocal("alliancebossattacked4", [bossName, String(dataInfo.damage), percent]);
            }
        }
        else if (dataInfo.type == 4) {
            titlePic = "tombkill-" + code;
            var peoplenum = this.vo.getTombKillNum(bossCfg.id, bosskey);
            var zid = this.vo.getTombKillZid(bossCfg.id, bosskey);
            var killname = this.vo.getTombKiller(bossCfg.id, bosskey);
            descStr = LanguageManager.getlocal("tombattacktip1-" + code, [bossName, String(peoplenum), killname, Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid)]);
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
            var awardTXT = ComponentManager.getTextField(LanguageManager.getlocal("tombattacktip2-" + code), 20);
            awardTXT.setPosition((this.viewBg.width - awardTXT.width) / 2, descTxt.y + descTxt.height + 10);
            this.addChildToContainer(awardTXT);
        }
        if (dataInfo.type < 4) {
            var str = "";
            if (this.vo.gettotalShopScore() >= this.cfg.maxScore) {
                str = LanguageManager.getlocal('acwipeBossBattleScore2', [String(dataInfo.shopscore == 0 ? 0xff3c3c : 0x21eb39), dataInfo.shopscore, dataInfo.exp]);
            }
            else {
                str = LanguageManager.getlocal('acwipeBossBattleScore', [dataInfo.exp]);
            }
            var rightScoreTxt = ComponentManager.getTextField(str, 20, TextFieldConst.COLOR_WARN_GREEN);
            rightScoreTxt.setPosition((this.viewBg.width - rightScoreTxt.width) / 2, descTxt.y + descTxt.height + offY + 30);
            this.addChildToContainer(rightScoreTxt);
            if (this.vo.gettotalShopScore() >= this.cfg.maxScore) {
                var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("alliancebossattacked5"), 20);
                tipTxt.lineSpacing = 5;
                tipTxt.textAlign = egret.HorizontalAlign.CENTER;
                tipTxt.setPosition((this.viewBg.width - tipTxt.width) / 2, rightScoreTxt.y + rightScoreTxt.height + 25);
                this.addChildToContainer(tipTxt);
            }
        }
    };
    AcTombAttackPopupView.prototype.resetBgSize = function () {
        var _this = this;
        _super.prototype.resetBgSize.call(this);
        var dataInfo = this.param.data;
        var bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
        if (dataInfo.type == 4 && this.vo.getOpenEndlessBoss() && bossCfg.id == 7) {
            //
            var group = new BaseDisplayObjectContainer();
            group.width = 444;
            group.height = this.viewBg.y;
            group.mask = new egret.Rectangle(0, 0, 444, this.viewBg.y);
            this.addChildAt(group, 2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, this, [0, 0]);
            var npc = BaseLoadBitmap.create("tombboss12-1");
            npc.width = 444;
            npc.height = 456;
            group.addChild(npc);
            var tombbosseff = ComponentManager.getCustomMovieClip("finalbosseff", 12, 80);
            tombbosseff.width = 320;
            tombbosseff.height = 461;
            tombbosseff.anchorOffsetX = tombbosseff.width / 2;
            tombbosseff.anchorOffsetY = tombbosseff.height / 2;
            tombbosseff.playWithTime(-1);
            tombbosseff.setScale(1.5);
            tombbosseff.x = 205;
            tombbosseff.y = 155;
            group.addChild(tombbosseff);
            //增加提示
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("tombfloorbosstip5"), 20);
            var gobtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "tombgoattack", function () {
                _this._cancelback = true;
                _this.hide();
            }, this);
            this.addChild(tipTxt);
            this.addChild(gobtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, this.viewBg, [0, this.viewBg.height + 20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, gobtn, tipTxt, [0, tipTxt.height + 20]);
        }
    };
    AcTombAttackPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcTombAttackPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcTombAttackPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcTombAttackPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcTombAttackPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    AcTombAttackPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj, [this._cancelback]);
        }
        _super.prototype.hide.call(this);
    };
    AcTombAttackPopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._cancelback = false;
        _super.prototype.dispose.call(this);
    };
    return AcTombAttackPopupView;
}(PopupView));
__reflect(AcTombAttackPopupView.prototype, "AcTombAttackPopupView");
//# sourceMappingURL=AcTombAttackPopupView.js.map