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
 * 	圣诞活动奖励预览
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
var AcChristmasRewardPopupView = (function (_super) {
    __extends(AcChristmasRewardPopupView, _super);
    function AcChristmasRewardPopupView() {
        return _super.call(this) || this;
    }
    AcChristmasRewardPopupView.prototype.initView = function () {
        var floorRewardList = this.param.data.floorRewardList;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var floor = Number(this.param.data.floor);
        var topStr = "";
        if (vo.getFloor() >= 4) {
            topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_11");
            if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_11_" + this.param.data.code);
            }
        }
        else {
            topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc");
            if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                topStr = LanguageManager.getlocal("acChristmasRewardPopupViewTopDesc_" + this.param.data.code);
            }
        }
        var topTxt = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        topTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt.width / 2, 5);
        this.addChildToContainer(topTxt);
        var rewardBg = BaseBitmap.create("public_9_probiginnerbg");
        rewardBg.width = 530;
        rewardBg.height = 400;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, topTxt.y + topTxt.height + 5);
        this.addChildToContainer(rewardBg);
        var rect = new egret.Rectangle(0, 0, rewardBg.width - 6, rewardBg.height - 15);
        var scrollList = ComponentManager.getScrollList(AcChristmasRewardScrollItem, floorRewardList, rect, { aid: this.param.data.aid, code: this.param.data.code, floor: this.param.data.floor });
        scrollList.setPosition(rewardBg.x + rewardBg.width / 2 - scrollList.width / 2, rewardBg.y + 7);
        this.addChildToContainer(scrollList);
        var buttomBg = BaseBitmap.create("public_9_downbg");
        buttomBg.width = 548;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, rewardBg.y + rewardBg.height + 10);
        this.addChildToContainer(buttomBg);
        var haveRewardStr = "";
        if (vo.getFloor() >= 4) {
            haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward", [String(acCfg.cost2)]);
            if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward_" + this.param.data.code, [String(acCfg.cost2)]);
            }
        }
        else {
            haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward", [String(acCfg.getFloorCost(String(floor)))]);
            if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                haveRewardStr = LanguageManager.getlocal("acChristmasRewardPopupViewHaveReward_" + this.param.data.code, [String(acCfg.getFloorCost(String(floor)))]);
            }
        }
        var haveRewardTxt = ComponentManager.getTextField(haveRewardStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        haveRewardTxt.setPosition(buttomBg.x + 12, buttomBg.y + 12);
        this.addChildToContainer(haveRewardTxt);
        var rewardNumStr = "";
        if (vo.getFloor() >= 4) {
            rewardNumStr = LanguageManager.getlocal("acChristmasRewardPopupViewRewardNum_11");
        }
        else {
            rewardNumStr = LanguageManager.getlocal("acChristmasRewardPopupViewRewardNum", [String(vo.getFloorValue(floor)), String(acCfg.getFloorStarNum(String(floor)))]);
        }
        var rewardNumTxt = ComponentManager.getTextField(rewardNumStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rewardNumTxt.setPosition(buttomBg.x + buttomBg.width - rewardNumTxt.width - 12, buttomBg.y + 12);
        this.addChildToContainer(rewardNumTxt);
        var buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc");
        if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
            buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_" + this.param.data.code);
        }
        if (Number(this.param.data.floor) == 3) {
            buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_2");
            if (this.isValentines() || this.getUiCode()) {
                buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_2_" + this.param.data.code);
            }
        }
        if (vo.getFloor() >= 4 || this.getUiCode()) {
            buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_11");
            if (this.isValentines() || this.getUiCode() || this.isMagpieBridge()) {
                buttomDescStr = LanguageManager.getlocal("acChristmasRewardPopupViewButtomDesc_11_" + this.param.data.code);
            }
        }
        var buttomDescTxt = ComponentManager.getTextField(buttomDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        buttomDescTxt.width = 524;
        buttomDescTxt.lineSpacing = 3;
        buttomDescTxt.setPosition(buttomBg.x + 12, haveRewardTxt.y + haveRewardTxt.height + 3);
        this.addChildToContainer(buttomDescTxt);
        buttomBg.height += buttomDescTxt.height + 5;
    };
    /**是否情人节 */
    AcChristmasRewardPopupView.prototype.isValentines = function () {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    };
    AcChristmasRewardPopupView.prototype.getUiCode = function () {
        if (this.param.data.code == "5") {
            return "5";
        }
        return null;
    };
    /**是否为鹊桥相会 7泰国*/
    AcChristmasRewardPopupView.prototype.isMagpieBridge = function () {
        if (this.param.data.code == "6" || this.param.data.code == "7") {
            return "6";
        }
        return null;
    };
    AcChristmasRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_smalldescbg"
        ]);
    };
    AcChristmasRewardPopupView.prototype.getTitleStr = function () {
        return "acChristmasRewardPopupViewTitle";
    };
    AcChristmasRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChristmasRewardPopupView;
}(PopupView));
__reflect(AcChristmasRewardPopupView.prototype, "AcChristmasRewardPopupView");
//# sourceMappingURL=AcChristmasRewardPopupView.js.map