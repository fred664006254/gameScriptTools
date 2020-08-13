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
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2018/8/30
  * @class AcRedLotusWarriorRewardInfoPopupView
  */
var AcRedLotusWarriorRewardInfoPopupView = (function (_super) {
    __extends(AcRedLotusWarriorRewardInfoPopupView, _super);
    function AcRedLotusWarriorRewardInfoPopupView() {
        var _this = _super.call(this) || this;
        _this.aid = null;
        _this.code = null;
        return _this;
    }
    /**获取资源数组 */
    AcRedLotusWarriorRewardInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["itemeffect"
        ]);
    };
    AcRedLotusWarriorRewardInfoPopupView.prototype.initView = function () {
        var cfg = this.param.data.itemCfg;
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var islast = this.param.data.islast;
        this.aid = aid;
        this.code = code;
        var lockKey = null;
        if (islast == 1) {
            lockKey = this.getDefaultCn("acredLotusWarriorlockLastTitle");
        }
        else {
            lockKey = this.getDefaultCn("acredLotusWarriorlockTitle");
        }
        var lockTF = ComponentManager.getTextField(LanguageManager.getlocal(lockKey, [cfg.needNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        lockTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - lockTF.width / 2, 15);
        this.addChildToContainer(lockTF);
        var rewardBg = BaseBitmap.create("public_9_probiginnerbg");
        rewardBg.width = 526;
        rewardBg.height = 131;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, lockTF.y + lockTF.height + 15);
        this.addChildToContainer(rewardBg);
        var rewardVo = GameData.formatRewardItem(cfg.getReward);
        var itemHeight = 0;
        for (var i = 0; i < rewardVo.length; i++) {
            var itemDB = GameData.getItemIcon(rewardVo[i], true, true);
            var maxLength = rewardVo.length > 4 ? 5 : rewardVo.length + 1;
            var startWidth = (rewardBg.width - itemDB.width * (maxLength - 1)) / (maxLength);
            var posX = rewardBg.x + startWidth + 6 + ((i % 4) * (itemDB.width + startWidth));
            var posY = rewardBg.y + 15 + (Math.floor((i) / 4) * (itemDB.height + 10));
            itemDB.setPosition(posX, posY);
            this.addChildToContainer(itemDB);
            itemHeight = itemDB.height;
        }
        rewardBg.height += ((Math.floor((rewardVo.length) / 5)) * (itemHeight + 10));
    };
    AcRedLotusWarriorRewardInfoPopupView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcRedLotusWarriorRewardInfoPopupView.prototype.getTitleStr = function () {
        return "acMidAutumnRewardInfoTitle";
    };
    AcRedLotusWarriorRewardInfoPopupView.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcRedLotusWarriorRewardInfoPopupView;
}(PopupView));
__reflect(AcRedLotusWarriorRewardInfoPopupView.prototype, "AcRedLotusWarriorRewardInfoPopupView");
