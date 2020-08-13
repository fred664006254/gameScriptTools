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
  * 圣诞奖励item
  * author 张朝阳
  * date 2018/11/29
  * @class AcChristmasRewardScrollItem
  */
var AcChristmasRewardScrollItem = (function (_super) {
    __extends(AcChristmasRewardScrollItem, _super);
    function AcChristmasRewardScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化item
     */
    AcChristmasRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, itemParam.code);
        var scaleValue = 0.85;
        if (itemParam.scale) {
            scaleValue = 0.9;
        }
        var rewardVo = GameData.formatRewardItem(data.reward)[0];
        // vo.getFloorReward(data.id,Number(itemParam.floor))?false:
        var light = false;
        if (vo.getFloor() >= 4) {
            light = data.isLight;
        }
        else {
            light = vo.getFloorReward(data.id, Number(itemParam.floor)) ? false : data.isLight;
        }
        var reward = GameData.getItemIcon(rewardVo, true, light);
        reward.setScale(scaleValue);
        //透明图填充Item
        var fillBg = BaseBitmap.create("public_alphabg");
        fillBg.width = reward.width * scaleValue + 13;
        fillBg.height = reward.height * scaleValue + 20;
        reward.setPosition(fillBg.x + fillBg.width / 2 - reward.width * scaleValue / 2, fillBg.y + fillBg.height / 2 - reward.height * scaleValue / 2);
        fillBg.alpha = 0;
        this.width = fillBg.width;
        this.height = fillBg.height;
        this.addChild(fillBg);
        this.addChild(reward);
        if (vo.getFloorReward(data.id, Number(itemParam.floor)) && vo.getFloor() < 4) {
            var receiveBM = BaseBitmap.create("acchristmasview_smalldescbg");
            receiveBM.setPosition(reward.x + reward.width * scaleValue / 2 - receiveBM.width / 2, reward.y + reward.height * scaleValue / 2 - receiveBM.height / 2);
            this.addChild(receiveBM);
            var receiveTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasRewardPopupViewReceiveTip"), 16, TextFieldConst.COLOR_LIGHT_YELLOW);
            receiveTxt.setPosition(receiveBM.x + receiveBM.width / 2 - receiveTxt.width / 2, receiveBM.y + receiveBM.height / 2 - receiveTxt.height / 2);
            this.addChild(receiveTxt);
            App.DisplayUtil.changeToGray(reward);
        }
    };
    AcChristmasRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChristmasRewardScrollItem;
}(ScrollListItem));
__reflect(AcChristmasRewardScrollItem.prototype, "AcChristmasRewardScrollItem");
//# sourceMappingURL=AcChristmasRewardScrollItem.js.map