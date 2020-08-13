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
 * 姻缘签奖励
 * author ycg
 * date 2020.1.7
 * @class AcTravelWithBeautyPlayRewardView
 */
var AcTravelWithBeautyPlayRewardView = (function (_super) {
    __extends(AcTravelWithBeautyPlayRewardView, _super);
    function AcTravelWithBeautyPlayRewardView() {
        var _this = _super.call(this) || this;
        _this._currMaskH = 0;
        _this._rewardArrList = [];
        _this._count = 0;
        _this._rewardBg = null;
        _this._bg = null;
        return _this;
    }
    AcTravelWithBeautyPlayRewardView.prototype.initView = function () {
        var _this = this;
        var bg = BaseLoadBitmap.create("actravelwithbeauty_marrybg-" + this.getTypeCode());
        bg.width = 572;
        bg.height = 860;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        this._bg = bg;
        var infoNum = App.MathUtil.getRandom(1, 6);
        var infoBg = BaseLoadBitmap.create("actravelwithbeauty_marrybg_" + infoNum + "-" + this.getTypeCode());
        infoBg.width = 572;
        infoBg.height = 860;
        infoBg.setPosition(bg.x + bg.width / 2 - infoBg.width / 2, bg.y + bg.height / 2 - infoBg.height / 2);
        this.addChildToContainer(infoBg);
        infoBg.alpha = 0;
        var title = BaseBitmap.create("actravelwithbeauty_marrybgtitle-" + this.getTypeCode());
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y + 10);
        this.addChildToContainer(title);
        var textNum = App.MathUtil.getRandom(1, 11);
        var info = BaseLoadBitmap.create("actravelwithbeauty_marryflag_" + textNum + "-" + this.getTypeCode());
        var isNeedAni = true;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuLang()) {
            info.width = 519;
            info.height = 85;
            info.setPosition(bg.x + bg.width / 2 - info.width / 2, bg.y + 560 - info.height);
            isNeedAni = false;
        }
        else {
            info.width = 86;
            info.height = 515;
            info.setPosition(bg.x + bg.width - info.width - 30, bg.y + 70);
            var mask = new egret.Rectangle(0, 0, info.width, 0);
            info.mask = mask;
            this._currMaskH = 0;
        }
        this.addChildToContainer(info);
        this.container.setScale(0.3);
        var pos = this.param.data.pos;
        this.container.setPosition(pos.x - 50, pos.y + 40);
        egret.Tween.get(this.container).wait(100).to({ x: 0, y: 0, scaleX: 1, scaleY: 1 }, 500).call(function () {
            if (isNeedAni) {
                egret.Tween.get(infoBg).wait(100).to({ alpha: 1 }, 500).call(_this.playInfoAni, _this, [info]);
            }
            else {
                egret.Tween.get(infoBg).wait(100).to({ alpha: 1 }, 500).call(_this.playRewardAni, _this);
            }
        });
    };
    AcTravelWithBeautyPlayRewardView.prototype.playInfoAni = function (obj) {
        var _this = this;
        egret.Tween.get(obj).call(function () {
            if (_this._currMaskH < obj.height) {
                _this._currMaskH += 10;
                var mask = new egret.Rectangle(0, 0, obj.width, _this._currMaskH);
                obj.mask = mask;
            }
            else {
                egret.Tween.removeTweens(obj);
                _this.playRewardAni();
            }
        }).wait(20).call(function () { _this.playInfoAni(obj); });
    };
    AcTravelWithBeautyPlayRewardView.prototype.playRewardAni = function () {
        var rewards = this.param.data.rewards;
        if (rewards) {
            var rewardArrList = GameData.formatRewardItem(rewards);
            this._rewardArrList = rewardArrList;
            var bg = BaseBitmap.create("public_9_bg96");
            bg.width = 520;
            this.addChildToContainer(bg);
            this._rewardBg = bg;
            var maxNum = Math.ceil(rewardArrList.length / 5);
            if (rewardArrList.length > 1 && rewardArrList.length < 5) {
                bg.height = 120;
            }
            else {
                bg.height = maxNum > 2 ? maxNum * 110 : 220;
            }
            bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, this._bg.y + this._bg.height - 77 - bg.height);
            TimerManager.doTimer(100, this._rewardArrList.length, this.playAni, this);
        }
    };
    AcTravelWithBeautyPlayRewardView.prototype.playAni = function () {
        this.createItem(this._count);
    };
    AcTravelWithBeautyPlayRewardView.prototype.showEnterBtn = function () {
        var enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", this.enterBtnCallback, this);
        enterBtn.setPosition(this._bg.x + this._bg.width / 2 - enterBtn.width / 2, this._bg.y + this._bg.height - enterBtn.height - 10);
        this.addChildToContainer(enterBtn);
    };
    AcTravelWithBeautyPlayRewardView.prototype.enterBtnCallback = function () {
        if (this.param.data.callback && this.param.data.obj) {
            this.param.data.callback.apply(this.param.data.obj);
        }
        this.hide();
    };
    /**
     * 实例化 Item
     */
    AcTravelWithBeautyPlayRewardView.prototype.createItem = function (count) {
        var rewardDB = GameData.getItemIcon(this._rewardArrList[count], true, true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
        var maxLength = 5;
        var scale = 0.8;
        var offX = 10;
        var startX = (this._rewardBg.width - (rewardDB.width * scale + offX) * maxLength + offX) / 2;
        var posX = this._rewardBg.x + startX + rewardDB.width * scale / 2 + count % maxLength * (rewardDB.width * scale + offX);
        var posY = this._rewardBg.y + 15 + rewardDB.height * scale / 2 + Math.floor(count / maxLength) * (rewardDB.height * scale + 15);
        if (this._rewardArrList.length == 1) {
            posX = this._rewardBg.x + this._rewardBg.width / 2;
            posY = this._rewardBg.y + this._rewardBg.height / 2;
        }
        rewardDB.setPosition(posX, posY);
        this.addChildToContainer(rewardDB);
        rewardDB.setScale(0);
        egret.Tween.get(rewardDB, { loop: false }).wait(100).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 0.8, scaleY: 0.8 }, 50);
        this._count++;
        if (this._count == this._rewardArrList.length) {
            this.showEnterBtn();
        }
    };
    AcTravelWithBeautyPlayRewardView.prototype.getTypeCode = function () {
        var code = this.param.data.code;
        if (code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    AcTravelWithBeautyPlayRewardView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcTravelWithBeautyPlayRewardView.prototype.getBgName = function () {
        return null;
    };
    AcTravelWithBeautyPlayRewardView.prototype.getTitleBgName = function () {
        return null;
    };
    AcTravelWithBeautyPlayRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcTravelWithBeautyPlayRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "actravelwithbeauty_marryflag_1-3", "actravelwithbeauty_marryflag_2-3","actravelwithbeauty_marryflag_3-3","actravelwithbeauty_marryflag_4-3","actravelwithbeauty_marryflag_5-3","actravelwithbeauty_marryflag_6-3","actravelwithbeauty_marryflag_7-3","actravelwithbeauty_marryflag_8-3","actravelwithbeauty_marryflag_9-3","actravelwithbeauty_marryflag_10-3", 
            "actravelwithbeauty_marrybgtitle-" + this.getTypeCode(), "actravelwithbeauty_marrybg-" + this.getTypeCode()
        ]);
    };
    AcTravelWithBeautyPlayRewardView.prototype.dispose = function () {
        this._currMaskH = 0;
        this._rewardArrList = [];
        this._rewardBg = null;
        this._count = 0;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyPlayRewardView;
}(CommonView));
__reflect(AcTravelWithBeautyPlayRewardView.prototype, "AcTravelWithBeautyPlayRewardView");
//# sourceMappingURL=AcTravelWithBeautyPlayRewardView.js.map