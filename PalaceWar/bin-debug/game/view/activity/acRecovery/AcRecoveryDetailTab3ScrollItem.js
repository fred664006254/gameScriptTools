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
 * 奖池Item
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailTab3ScrollItem
 */
var AcRecoveryDetailTab3ScrollItem = (function (_super) {
    __extends(AcRecoveryDetailTab3ScrollItem, _super);
    function AcRecoveryDetailTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this.aid = null;
        _this.code = null;
        return _this;
    }
    AcRecoveryDetailTab3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        this.aid = aid;
        this.code = code;
        this.width = 530;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 524;
        bg.height = 240;
        bg.x = 3;
        this.addChild(bg);
        var bgFlagName = ResourceManager.hasRes("acrecovery_pooitemicon" + (index + 1) + "-" + this.getTypeCode()) ? "acrecovery_pooitemicon" + (index + 1) + "-" + this.getTypeCode() : "acrecovery_pooitemicon" + (index + 1) + "-1";
        var bgFlag = BaseBitmap.create(bgFlagName);
        bgFlag.setPosition(bg.x + 13, bg.y + bg.height / 2 - bgFlag.height / 2);
        this.addChild(bgFlag);
        var rewardVoList = GameData.formatRewardItem(data.rewards);
        var scale = 0.85;
        var itemHeight = 0;
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 310;
        rewardbg.height = 210;
        rewardbg.setPosition(bg.x + bg.width - rewardbg.width - 10, bg.y + bg.height / 2 - rewardbg.height / 2);
        this.addChild(rewardbg);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(rewardbg.x + 9 + ((rewardDB.width - 8) * (i % 3)), rewardbg.y + 9 + ((rewardDB.height - 8) * Math.floor(i / 3)));
            this.addChild(rewardDB);
            itemHeight = rewardDB.height;
        }
        // rewardbg.height = (rewardVoList.length % 3 == 0 ? rewardVoList.length / 3 : Math.floor(rewardVoList.length / 3) + 1) * itemHeight;
        this.height = bg.height;
    };
    AcRecoveryDetailTab3ScrollItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcRecoveryDetailTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRecoveryDetailTab3ScrollItem.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        _super.prototype.dispose.call(this);
    };
    return AcRecoveryDetailTab3ScrollItem;
}(ScrollListItem));
__reflect(AcRecoveryDetailTab3ScrollItem.prototype, "AcRecoveryDetailTab3ScrollItem");
//# sourceMappingURL=AcRecoveryDetailTab3ScrollItem.js.map