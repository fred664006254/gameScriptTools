/**
 * 关卡图标
 * author shaoliang
 * date 2017/10/11
 * @class ChallengeButton
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
var ChallengeButton = (function (_super) {
    __extends(ChallengeButton, _super);
    function ChallengeButton() {
        var _this = _super.call(this) || this;
        _this._knife1 = null;
        _this._knife2 = null;
        return _this;
    }
    ChallengeButton.prototype.initButton = function (callback, handler, idx, curChannel) {
        this._idx = idx;
        this._curChannel = curChannel;
        var curNum = Api.challengeVoApi.getCurMiddleChannelId() - 1;
        if (curNum <= idx) {
            this._lightBg = BaseBitmap.create("channel_light");
            this.addChild(this._lightBg);
            this.visible = false;
        }
        _super.prototype.init.call(this, "channel_bg", "", callback, handler);
        this.touchEnabled = false;
        if (curNum == idx) {
            if (curNum == 6) {
            }
            else {
            }
            this.showClickable();
        }
    };
    ChallengeButton.prototype.showClickable = function () {
        var curNum = Api.challengeVoApi.getCurMiddleChannelId() - 1;
        var curChannel = Api.challengeVoApi.getCurChannelId();
        var bossType = ChallengeCfg.getChallengeCfgById(curChannel).type;
        if (bossType == 2) {
            this.showBoss();
        }
        else {
            this.showKnifeAnim();
        }
    };
    ChallengeButton.prototype.showBoss = function () {
        this.visible = true;
        this.touchEnabled = true;
        var curChannel = Api.challengeVoApi.getCurChannelId();
        var challengeConfig = ChallengeCfg.getChallengeCfgById(curChannel);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 120, 120);
        var head = BaseLoadBitmap.create("prison_icon" + challengeConfig.showBoss, rect);
        head.setPosition(this._lightBg.width / 2 - head.width / 2, this._lightBg.height / 2 - head.height / 2 - 2);
        this.addChild(head);
        var boss = BaseBitmap.create("battle_boss");
        boss.setPosition(this._lightBg.width / 2 - boss.width / 2, this._lightBg.height - boss.height);
        this.addChild(boss);
    };
    ChallengeButton.prototype.showKnifeAnim = function () {
        this.visible = true;
        this.touchEnabled = true;
        this._knife1 = BaseBitmap.create("channel_knife");
        this._knife1.x = this._lightBg.x + this._lightBg.width / 2 - this._knife1.width / 2 + 3;
        this.addChild(this._knife1);
        egret.Tween.get(this._knife1, { loop: true }).to({ y: this._knife1.y - 7 }, 600).wait(100).to({ y: this._knife1.y }, 600).wait(100);
        // egret.Tween.get(beAttackHero).to({y:beAttackHero.y+offsetY},100).to({y:beAttackHero.y},120).to({alpha:0},800).call(this.showBattleRsult,this);
        // this._knife1 =BaseBitmap.create("channel_knife");
        // this._knife1.scaleX = -1;
        // this.addChild(this._knife1);
        // this._knife2 =BaseBitmap.create("channel_knife");
        // this.addChild(this._knife2);
        // this._knife1.anchorOffsetX = this._knife1.width;
        // this._knife1.anchorOffsetY = this._knife1.height;
        // this._knife2.anchorOffsetX = this._knife1.width;
        // this._knife2.anchorOffsetY = this._knife1.height;
        // this._knife1.setPosition(20 , this._lightBg.height - 20);
        // this._knife2.setPosition(this._lightBg.width - 20 , this._lightBg.height - 20);
        // this._knife1.rotation = -20;
        // this._knife2.rotation = 20;
        // egret.Tween.get(this._knife1,{loop:true}).to({rotation:40},200).wait(100).to({rotation:-40},300).wait(200);
        // egret.Tween.get(this._knife2,{loop:true}).to({rotation:-40},200).wait(100).to({rotation:40},300).wait(200);
    };
    ChallengeButton.prototype.hiddenKnifeAnim = function () {
        this._lightBg.visible = false;
        this.touchEnabled = false;
        egret.Tween.removeTweens(this);
        if (this._knife1) {
            this.removeChild(this._knife1);
            this._knife1 = null;
        }
        if (this._knife2) {
            this.removeChild(this._knife2);
            this._knife2 = null;
        }
    };
    ChallengeButton.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._idx = null;
        this._lightBg = null;
        this._knife1 = null;
        this._knife2 = null;
        _super.prototype.dispose.call(this);
    };
    return ChallengeButton;
}(BaseButton));
__reflect(ChallengeButton.prototype, "ChallengeButton");
