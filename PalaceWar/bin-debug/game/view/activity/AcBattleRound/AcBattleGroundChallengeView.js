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
var AcBattleGroundChallengeView = (function (_super) {
    __extends(AcBattleGroundChallengeView, _super);
    //挑战界面  //复仇  
    function AcBattleGroundChallengeView() {
        return _super.call(this) || this;
    }
    AcBattleGroundChallengeView.prototype.getOffsetX = function () {
        return 35;
    };
    AcBattleGroundChallengeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcBattleGroundChallengeView.prototype.getTitleStr = function () {
        //type 1挑战按钮  //2复仇   //3追杀
        if (AtkraceChallengeItem.data) {
            if (AtkraceChallengeItem.data.type == 1) {
                return "atkraceChallenge";
            }
            else if (AtkraceChallengeItem.data.type == 2) {
                return "atkraceRevenge";
            }
            else if (AtkraceChallengeItem.data.type == 3) {
                return "atkraceVisitTab3";
            }
        }
    };
    AcBattleGroundChallengeView.prototype.getTabbarTextArr = function () {
        return [
            "acBattleGroundTip15-1",
            "acBattleGroundTip16-1",
        ];
    };
    AcBattleGroundChallengeView.prototype.initView = function () {
    };
    AcBattleGroundChallengeView.prototype.getShowHeight = function () {
        return 730;
    };
    AcBattleGroundChallengeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundChallengeView;
}(PopupView));
__reflect(AcBattleGroundChallengeView.prototype, "AcBattleGroundChallengeView");
//# sourceMappingURL=AcBattleGroundChallengeView.js.map