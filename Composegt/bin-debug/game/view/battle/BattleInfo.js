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
        return _super.call(this) || this;
    }
    /**
     * 初始化
     * 总的兵力
     * @param params 信息 自己不传，npc传。
     */
    BattleInfo.prototype.init = function (totalNum, params, info, isconquest) {
        this._totalNum = totalNum;
        if (!params) {
            this._isHero = false;
        }
        else {
            this._isHero = true;
        }
        var scale9Bg = BaseBitmap.create("battle_info_bg");
        scale9Bg.width = 400; //445;//376;
        this.addChild(scale9Bg);
        var forceNum;
        var progressBarPic;
        var nameStr;
        var officerTitleStr;
        var show;
        if (this._isHero) {
            forceNum = Api.playerVoApi.getAtk();
            // progressBarPic="progress_type1_yellow";
            progressBarPic = "progress_type1_yellow2";
            nameStr = Api.playerVoApi.getPlayerName();
            officerTitleStr = Api.playerVoApi.getPlayerOffice();
        }
        else {
            if (info) {
                show = info.show;
                var number = 10;
                if (isconquest) {
                    number = 5000;
                }
                forceNum = Math.ceil(this._totalNum / number);
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
            // progressBarPic="progress_type1_red";
            progressBarPic = "progress_type3_red";
        }
        var headContainer;
        var preX = 0;
        if (this._isHero) {
            headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
            preX = 105 + 5;
            // headContainer.setPosition(-7, -8);
            headContainer.setPosition(-7, -18);
            scale9Bg.scaleX = -1;
            scale9Bg.setPosition(headContainer.width / 2 + scale9Bg.width - 64, (headContainer.height - scale9Bg.height) / 2 - 3);
        }
        else {
            headContainer = new BaseDisplayObjectContainer();
            var myBody = BaseLoadBitmap.create("head_circle_bg");
            headContainer.addChild(myBody);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 120, 120);
            this._npcHead = BaseLoadBitmap.create("prison_icon" + show, rect);
            this._npcHead.scaleX = 120 / this._npcHead.width;
            this._npcHead.scaleY = 109 / this._npcHead.height;
            this._npcHead.x = -5;
            this._npcHead.y = 3;
            headContainer.addChild(this._npcHead);
            preX = 14 + 64 + 5;
            scale9Bg.setPosition(0 + 64, (headContainer.height - scale9Bg.height) / 2 - 3);
            headContainer.x = scale9Bg.width - headContainer.width / 2 + 5;
            // headContainer.y = -5;
            headContainer.y = -15;
        }
        this.addChild(headContainer);
        var soldierText = ComponentManager.getTextField(LanguageManager.getlocal("soldier") + ":  ", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_INPUT);
        soldierText.x = preX;
        soldierText.y = 62 + 2;
        this.addChild(soldierText);
        this._progressBar = ComponentManager.getProgressBar(progressBarPic, "progress_type3_bg", 190); //245
        this._progressBar.x = preX + soldierText.width;
        this._progressBar.y = soldierText.y;
        this._progressBar.setTextColor(TextFieldConst.COLOR_WARN_YELLOW_NEW);
        this._progressBar.setTextSize(18);
        // this._progressBar.setPercentage(1);
        this.addChild(this._progressBar);
        this._name = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._name.textColor = TextFieldConst.COLOR_WARN_YELLOW_NEW;
        this._name.x = preX;
        this._name.y = 9 + 2;
        this.addChild(this._name);
        var nn = App.StringUtil.changeIntToText(forceNum);
        this._force = ComponentManager.getTextField(LanguageManager.getlocal("force") + ":  " + nn, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_INPUT);
        // force.textColor = TextFieldConst.COLOR_YELLOW;
        this._force.x = preX;
        this._force.y = 35 + 2;
        this.addChild(this._force);
        //官职
        /*
        let officerTitle:BaseTextField = ComponentManager.getTextField(officerTitleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        officerTitle.textColor = TextFieldConst.COLOR_WARN_GREEN;
        officerTitle.x = preX + 310  - officerTitle.width;
        officerTitle.y = this._name.y;
        this.addChild(officerTitle);
        */
        // officerTitleStr = "正一品";
        if (this._isHero) {
            // let officeTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(officerTitleStr, "office_fnt");
            var officeTF = ComponentManager.getTextField(officerTitleStr, 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
            officeTF.name = "officeTF";
            // officeTF.setScale(0.9);
            if (this._isHero) {
                officeTF.x = scale9Bg.x - scale9Bg.width + 65 - officeTF.width / 2 - 5;
                officeTF.y = scale9Bg.y + scale9Bg.height - officeTF.height - 8;
            }
            else {
                officeTF.x = scale9Bg.x + scale9Bg.width - 50 - officeTF.width / 2;
                officeTF.y = scale9Bg.y + scale9Bg.height - officeTF.height;
            }
            if (PlatformManager.checkIsViSp()) {
            }
            else {
                var officeBg = BaseBitmap.create("challenge_officebg");
                officeBg.width = officeTF.width + 40;
                officeBg.x = officeTF.x + officeTF.width / 2 - officeBg.width / 2;
                officeBg.y = officeTF.y + officeTF.height / 2 - officeBg.height / 2;
                this.addChild(officeBg);
                this.addChild(officeTF);
            }
        }
    };
    Object.defineProperty(BattleInfo.prototype, "curNumber", {
        set: function (v) {
            this._curNum = v;
            this._progressBar.setText(App.StringUtil.changeIntToText(this._curNum));
            this._progressBar.setPercentage(v / this._totalNum);
        },
        enumerable: true,
        configurable: true
    });
    BattleInfo.prototype.resetInfo = function (v) {
        this._totalNum = v;
        if (this._isHero) {
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
    BattleInfo.prototype.dispose = function () {
        this._totalNum = null;
        this._curNum = null;
        this._progressBar = null;
        this._force = null;
        this._name = null;
        this._npcHead = null;
        _super.prototype.dispose.call(this);
    };
    return BattleInfo;
}(BaseDisplayObjectContainer));
__reflect(BattleInfo.prototype, "BattleInfo");
