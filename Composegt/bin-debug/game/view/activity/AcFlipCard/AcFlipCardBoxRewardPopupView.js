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
 * author yanyuling
 */
var AcFlipCardBoxRewardPopupView = (function (_super) {
    __extends(AcFlipCardBoxRewardPopupView, _super);
    function AcFlipCardBoxRewardPopupView() {
        return _super.call(this) || this;
    }
    AcFlipCardBoxRewardPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var ofy = 10;
        var topBg = BaseBitmap.create("public_tc_bg02");
        topBg.width = 272;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = ofy;
        this._nodeContainer.addChild(topBg);
        var lockTxt = "acFlipCard_nettip5";
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(lockTxt, ["" + this.param.data.need]);
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
        this._nodeContainer.addChild(tipTxt1);
        ofy += topBg.height + 10;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 205;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = ofy;
        this._nodeContainer.addChild(bg);
        var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal("dailyTaskRewardPreviewPopuiViewTitle");
        tipTxt2.x = bg.x + 10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        var resultStr = this.param.data.rewardstr;
        var rewardArr = GameData.formatRewardItem(resultStr);
        var lineNum = Math.ceil(rewardArr.length / 4);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = bg.width - 20;
        rbg.height = 120 * lineNum + 40;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = tipTxt2.y + tipTxt2.height + 10;
        this._nodeContainer.addChild(rbg);
        var leftF = BaseBitmap.create("public_tcdw_bg01");
        leftF.x = rbg.x + 5;
        leftF.y = rbg.y + 3;
        this._nodeContainer.addChild(leftF);
        var rightF = BaseBitmap.create("public_tcdw_bg02");
        rightF.x = rbg.x + rbg.width - rightF.width - 5;
        rightF.y = rbg.y + 3;
        this._nodeContainer.addChild(rightF);
        bg.height = rbg.height + 70;
        var rewardX = rbg.x + 15;
        var rewardY = rbg.y + 15;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            if (index > 0 && index % 4 == 0) {
                rewardX = rbg.x + 15;
                rewardY += iconItem.height + 15;
                iconItem.x = rewardX;
            }
            else {
                iconItem.x = rewardX;
                rewardX += (iconItem.width + 15);
            }
            iconItem.y = rewardY;
            this._nodeContainer.addChild(iconItem);
        }
    };
    AcFlipCardBoxRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcFlipCardBoxRewardPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcFlipCardBoxRewardPopupView;
}(PopupView));
__reflect(AcFlipCardBoxRewardPopupView.prototype, "AcFlipCardBoxRewardPopupView");
