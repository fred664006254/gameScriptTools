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
 * 大奖奖池中奖名单
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryRandBoxPopupView
 */
var AcLotteryRandBoxPopupView = (function (_super) {
    __extends(AcLotteryRandBoxPopupView, _super);
    function AcLotteryRandBoxPopupView() {
        return _super.call(this) || this;
    }
    AcLotteryRandBoxPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = 380;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_tc_bg03");
        bg2.width = bg.width - 20;
        bg2.height = 170;
        bg2.x = bg.x + 10;
        bg2.y = bg.y + 10;
        this.addChildToContainer(bg2);
        var bg3 = BaseBitmap.create("public_tc_bg03");
        bg3.width = bg2.width;
        bg3.height = bg2.height;
        bg3.x = bg2.x;
        bg3.y = bg2.y + bg2.height + 20;
        this.addChildToContainer(bg3);
        var title2 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt1"), 20, TextFieldConst.COLOR_BROWN);
        title2.x = bg2.x + 20;
        title2.y = bg2.y + 15;
        this.addChildToContainer(title2);
        var title3 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt2"), 20, TextFieldConst.COLOR_BROWN);
        title3.x = title2.x;
        title3.y = bg3.y + 15;
        this.addChildToContainer(title3);
        var cfgData = this.param.data.cfgData;
        var randReward = cfgData.randReward;
        var ranArr = [];
        for (var key in randReward) {
            if (randReward.hasOwnProperty(key)) {
                var element = randReward[key];
                ranArr.push(element[0]);
            }
        }
        var content2 = new BaseDisplayObjectContainer();
        var ranArrStr = ranArr.join("|");
        var rewardArr2 = GameData.getRewardItemIcons(ranArrStr, true, true);
        for (var index = 0; index < rewardArr2.length; index++) {
            var rewardIcon = rewardArr2[index];
            rewardIcon.setScale(0.9);
            // rewardIcon.height = 42;
            // rewardIcon.width = 42;
            rewardIcon.setPosition(10 + 110 * index, 10);
            content2.addChild(rewardIcon);
        }
        var rect1 = new egret.Rectangle(0, 0, bg2.width - 30, bg2.height - 40);
        var scrollList1 = ComponentManager.getScrollView(content2, rect1);
        scrollList1.horizontalScrollPolicy = "on";
        scrollList1.verticalScrollPolicy = "off";
        scrollList1.x = bg2.x + 15;
        scrollList1.y = title2.y + 20;
        this.addChildToContainer(scrollList1);
        var getReward = cfgData.getReward;
        var content3 = new BaseDisplayObjectContainer();
        var rewardArr = GameData.getRewardItemIcons(getReward, true, true);
        for (var index = 0; index < rewardArr.length; index++) {
            var rewardIcon = rewardArr[index];
            rewardIcon.setScale(0.9);
            // rewardIcon.height = 42;
            // rewardIcon.width = 42;
            rewardIcon.setPosition(10 + 110 * index, 10);
            content3.addChild(rewardIcon);
        }
        var rect3 = new egret.Rectangle(0, 0, bg3.width - 30, bg3.height - 40);
        var scrollList3 = ComponentManager.getScrollView(content3, rect3);
        scrollList3.horizontalScrollPolicy = "on";
        scrollList3.verticalScrollPolicy = "off";
        scrollList3.x = bg3.x + 15;
        scrollList3.y = title3.y + 20;
        this.addChildToContainer(scrollList3);
        var txt4 = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryRandBoxPopupView_txt3"), 20, TextFieldConst.COLOR_BROWN);
        txt4.multiline = true;
        txt4.lineSpacing = 4;
        txt4.width = bg3.width - 60;
        txt4.x = bg.x + bg.width / 2 - txt4.width / 2;
        txt4.y = bg.y + bg.height + 15;
        this.addChildToContainer(txt4);
    };
    AcLotteryRandBoxPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcLotteryRandBoxPopupView.prototype.getTitleStr = function () {
        var boxId = this.param.data.boxId;
        boxId = boxId.split("_")[1];
        return "itemName_" + boxId;
    };
    AcLotteryRandBoxPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLotteryRandBoxPopupView;
}(PopupView));
__reflect(AcLotteryRandBoxPopupView.prototype, "AcLotteryRandBoxPopupView");
