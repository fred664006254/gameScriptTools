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
  * @class AcMidAutumnRewardInfoPopupView
  */
var AcMidAutumnRewardInfoPopupView = (function (_super) {
    __extends(AcMidAutumnRewardInfoPopupView, _super);
    function AcMidAutumnRewardInfoPopupView() {
        return _super.call(this) || this;
    }
    AcMidAutumnRewardInfoPopupView.prototype.initView = function () {
        var cfg = this.param.data.itemCfg;
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var topMsg = this.param.data.topMsg;
        var btnStatus = this.param.data.btnStatus;
        var lockTFKey = "ac" + aid + "lockTitle";
        if (code == '3' || code == '4' || code == '5' || code == '6') {
            lockTFKey = "ac" + aid + "lockTitle-" + code;
        }
        if (topMsg) {
            lockTFKey = topMsg;
        }
        //public_9_probiginnerbg
        var lockTF = ComponentManager.getTextField(LanguageManager.getlocal(lockTFKey, [cfg.needNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
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
        if (btnStatus) {
            if (btnStatus == "0") {
                //不可领取
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                }, this);
                reviceBtn.setPosition(rewardBg.x + rewardBg.width / 2 - reviceBtn.width / 2, rewardBg.y + rewardBg.height + 15);
                this.addChildToContainer(reviceBtn);
                reviceBtn.touchEnabled = false;
                reviceBtn.setGray(true);
            }
            else if (btnStatus == "2") {
                //已领取
                var reviceBM = BaseBitmap.create("collectflag");
                reviceBM.setPosition(rewardBg.x + rewardBg.width / 2 - reviceBM.width / 2, rewardBg.y + rewardBg.height + 10);
                this.addChildToContainer(reviceBM);
            }
        }
    };
    AcMidAutumnRewardInfoPopupView.prototype.getTitleStr = function () {
        return "acMidAutumnRewardInfoTitle";
    };
    AcMidAutumnRewardInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "collectflag",
        ]);
    };
    AcMidAutumnRewardInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnRewardInfoPopupView;
}(PopupView));
__reflect(AcMidAutumnRewardInfoPopupView.prototype, "AcMidAutumnRewardInfoPopupView");
//# sourceMappingURL=AcMidAutumnRewardInfoPopupView.js.map