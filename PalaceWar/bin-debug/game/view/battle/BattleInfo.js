/**
 * 战斗中 玩家 或 npc 信息小板
 * author shaoliang
 * date 2017/9/21
 * @class BattleInfo
 */
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
var BattleInfo = (function (_super) {
    __extends(BattleInfo, _super);
    function BattleInfo() {
        var _this = _super.call(this) || this;
        _this._sorce = "";
        return _this;
    }
    BattleInfo.prototype.setSurce = function (sorce) {
        this._sorce = sorce;
    };
    /**
     * 初始化
     * 总的兵力
     * @param params 信息 自己不传，npc传。
     */
    BattleInfo.prototype.init = function (totalNum, params, info) {
        this._totalNum = totalNum;
        if (!params) {
            this._isHero = false;
        }
        else {
            this._isHero = true;
        }
        var scale9Bg = BaseBitmap.create("battle_info_bg");
        if (PlatformManager.checkIsPtLang()) {
            scale9Bg.width = scale9Bg.width + 50;
        }
        this.addChild(scale9Bg);
        var forceNum;
        var progressBarPic;
        var nameStr;
        var officerTitleStr;
        var show;
        if (this._isHero) {
            forceNum = Api.playerVoApi.getAtk();
            if (info == "conquest") {
                if (Api.otherInfoVoApi.isHasScene("302", "searchScene")) {
                    var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene", "302").personalityCfg;
                    if (abilitycfg.buffValue) {
                        forceNum += forceNum * abilitycfg.buffValue;
                        forceNum = Math.floor(forceNum + 0.5);
                    }
                }
            }
            progressBarPic = "battle_hero_bar";
            nameStr = Api.playerVoApi.getPlayerName();
            officerTitleStr = Api.playerVoApi.getPlayerOffice();
        }
        else {
            if (info) {
                show = info.show;
                forceNum = Math.ceil(this._totalNum / 10);
                officerTitleStr = LanguageManager.getlocal("dailybossNameType1", [String(info.cid)]);
                nameStr = LanguageManager.getlocal("BossName" + show);
            }
            else {
                var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
                show = challengeConfig.show;
                forceNum = challengeConfig.atk;
                officerTitleStr = LanguageManager.getlocal("nothing");
                nameStr = LanguageManager.getlocal("npcName" + show);
            }
            progressBarPic = "battle_npc_bar";
        }
        var headContainer;
        var preX = 0;
        if (this._isHero) {
            // headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
            headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
            preX = 98;
            headContainer.setPosition(0, -6);
            headContainer.setScale(1.05);
            scale9Bg.scaleX = -1;
            scale9Bg.setPosition(headContainer.width / 2 + scale9Bg.width, (headContainer.height - scale9Bg.height) / 2 - 3);
        }
        else {
            headContainer = new BaseDisplayObjectContainer();
            // let myBody:BaseBitmap = BaseBitmap.create("head_circle_bg");
            var myBody = BaseLoadBitmap.create("head_circle_bg");
            headContainer.addChild(myBody);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 120, 120);
            this._npcHead = BaseLoadBitmap.create("prison_icon" + show, rect);
            this._npcHead.scaleX = 100 / this._npcHead.width;
            this._npcHead.scaleY = 100 / this._npcHead.height;
            this._npcHead.x = -5;
            this._npcHead.y = 1;
            headContainer.addChild(this._npcHead);
            preX = 14;
            scale9Bg.setPosition(0, (headContainer.height - scale9Bg.height) / 2 - 3);
            headContainer.setPosition(scale9Bg.width - headContainer.width / 2, -4);
        }
        this.addChild(headContainer);
        //士兵消耗
        if (info != "conquest" && this._isHero) {
            this._heroForce = forceNum;
            var costLevel = this.getCostLevel(forceNum);
            var costContainer = new BaseDisplayObjectContainer();
            var costBg = BaseBitmap.create('battle_info_costbg');
            costBg.width = 450;
            costContainer.addChild(costBg);
            var colorStr = LanguageManager.getlocal('battleInfoCostLevel' + costLevel);
            var costTipStr = LanguageManager.getlocal('battleInfoCostTip', [colorStr]);
            this._costTipTxt = ComponentManager.getTextField(costTipStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            this._costTipTxt.width = costBg.width - 50;
            this._costTipTxt.x = costBg.x + costBg.width / 2 - this._costTipTxt.width / 2 - 15;
            this._costTipTxt.y = costBg.y + costBg.height / 2 - this._costTipTxt.height / 2;
            this._costTipTxt.textAlign = egret.HorizontalAlign.CENTER;
            costContainer.addChild(this._costTipTxt);
            this.addChild(costContainer);
            costContainer.y = scale9Bg.y + scale9Bg.height + 6;
        }
        var soldierText = ComponentManager.getTextField(LanguageManager.getlocal("soldier"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        soldierText.x = preX;
        soldierText.y = 62 + 2;
        this.addChild(soldierText);
        this._progressBar = ComponentManager.getProgressBar(progressBarPic, "exp_progress_bg", 262 - (soldierText.width - 44));
        this._progressBar.x = preX + soldierText.width + 5;
        this._progressBar.y = soldierText.y;
        this._progressBar.setTextSize(18);
        this.addChild(this._progressBar);
        if (PlatformManager.checkIsRuSp()) {
            this._progressBar.scaleX = 0.85;
        }
        this._name = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._name.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._name.x = preX;
        this._name.y = 9 + 2;
        this.addChild(this._name);
        this._force = ComponentManager.getTextField(LanguageManager.getlocal("force") + ":  " + forceNum, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // force.textColor = TextFieldConst.COLOR_YELLOW;
        this._force.x = preX;
        this._force.y = 35 + 2;
        this.addChild(this._force);
        var officerTitle = ComponentManager.getTextField(officerTitleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        officerTitle.textColor = TextFieldConst.COLOR_WARN_GREEN;
        officerTitle.x = preX + 310 - officerTitle.width;
        officerTitle.y = this._name.y;
        this.addChild(officerTitle);
        if (this._isHero) {
            this.refreshDecreeAttr();
        }
    };
    Object.defineProperty(BattleInfo.prototype, "curNumber", {
        set: function (v) {
            this._curNum = v;
            this._progressBar.setText(this._curNum.toString());
            this._progressBar.setPercentage(v / this._totalNum);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleInfo.prototype, "curNum", {
        get: function () {
            return this._curNum;
        },
        enumerable: true,
        configurable: true
    });
    BattleInfo.prototype.refreshDecreeAttr = function () {
        var addInfo = Api.challengeVoApi.getDecreePolicyAddAttrInfo();
        if (this._sorce == "conquest") {
            addInfo = Api.conquestVoApi.getDecreePolicyAddAttrInfo();
        }
        var addV = 0;
        if (addInfo) {
            if (!this._decreeAddTxt) {
                this._decreeAddTxt = ComponentManager.getTextField("", this._force.size, TextFieldConst.COLOR_WARN_YELLOW2);
                this._decreeAddTxt.setPosition(this._force.x + this._force.width + 10, this._force.y);
                this.addChild(this._decreeAddTxt);
            }
            if (addInfo.lastTimes > 0) {
                addV = Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
                if (this._sorce == "conquest") {
                    addInfo = Api.conquestVoApi.getDecreePolicyAddAttrInfo();
                    this._decreeAddTxt.text = "(" + addInfo.strKey2 + "+" + addV.toFixed(0) + ")";
                    // LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV.toFixed(0)]) + ")";
                }
                else {
                    this._decreeAddTxt.text = "(" + LanguageManager.getlocal(addInfo.strKey, [addInfo.strKey2, addV.toFixed(0)]) + ")";
                }
                // operation by shaoliang
                // this._decreeAddTxt.visible = false;
            }
            else {
                this._decreeAddTxt.text = "";
            }
            // let forceNum= Api.playerVoApi.getAtk();
            // this._force.text = LanguageManager.getlocal("force") + ":  " + (forceNum+addV).toFixed(0);
        }
    };
    BattleInfo.prototype.refreshCostTipTxt = function () {
        if (this._costTipTxt) {
            var costLevel = this.getCostLevel(this._heroForce);
            var colorStr = LanguageManager.getlocal('battleInfoCostLevel' + costLevel);
            var costTipStr = LanguageManager.getlocal('battleInfoCostTip', [colorStr]);
            this._costTipTxt.text = costTipStr;
        }
    };
    BattleInfo.prototype.resetInfo = function (v) {
        this._totalNum = v;
        if (this._isHero) {
            this.refreshDecreeAttr();
            this.refreshCostTipTxt();
        }
        else {
            var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
            var nameStr = LanguageManager.getlocal("npcName" + challengeConfig.show);
            this._name.text = nameStr;
            var forceNum = challengeConfig.atk;
            this._force.text = LanguageManager.getlocal("force") + ":  " + forceNum;
            this._npcHead.setload("prison_icon" + challengeConfig.show);
        }
    };
    BattleInfo.prototype.getCostLevel = function (forceNum) {
        var challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
        var costLevel = 1;
        var heroForce = forceNum;
        var npcForce = challengeConfig.atk;
        var rate = (npcForce + 1000) / (heroForce + 1000);
        if (rate <= Config.GameprojectCfg.challengeRatio1) {
            costLevel = 1;
        }
        else if (rate <= Config.GameprojectCfg.challengeRatio2) {
            costLevel = 2;
        }
        else if (rate <= Config.GameprojectCfg.challengeRatio3) {
            costLevel = 3;
        }
        else if (rate <= Config.GameprojectCfg.challengeRatio4) {
            costLevel = 4;
        }
        else {
            costLevel = 5;
        }
        return costLevel;
    };
    BattleInfo.prototype.dispose = function () {
        this._totalNum = null;
        this._curNum = null;
        this._progressBar = null;
        this._force = null;
        this._name = null;
        this._npcHead = null;
        this._decreeAddTxt = null;
        this._sorce = "";
        this._costTipTxt = null;
        this._heroForce = 0;
        _super.prototype.dispose.call(this);
    };
    return BattleInfo;
}(BaseDisplayObjectContainer));
__reflect(BattleInfo.prototype, "BattleInfo");
//# sourceMappingURL=BattleInfo.js.map