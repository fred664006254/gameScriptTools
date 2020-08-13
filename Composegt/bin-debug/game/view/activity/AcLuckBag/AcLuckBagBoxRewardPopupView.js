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
 * 福袋宝箱
 * author jiangliuyang 通用于转盘宝箱
 * date 2018/7/6
 * @class AcLuckBagBoxRewardPopupView
 */
var AcLuckBagBoxRewardPopupView = (function (_super) {
    __extends(AcLuckBagBoxRewardPopupView, _super);
    function AcLuckBagBoxRewardPopupView() {
        return _super.call(this) || this;
    }
    AcLuckBagBoxRewardPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var data = this.param.data;
        var rewardId = data.id;
        var rewardCfg = null;
        var need = 0;
        var mustStr = '';
        var canReward = null;
        var cfg = Config.AcCfg.LuckBagCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcLuckBagView.AID, AcLuckBagView.CODE);
        rewardCfg = cfg.getBoxRewardById(rewardId);
        need = rewardCfg.needNum;
        mustStr = rewardCfg.getReward;
        var ofy = 51;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 205;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy + 15;
        // bg.y = 116-ofy;
        this._nodeContainer.addChild(bg);
        var topBg = BaseBitmap.create("public_tc_bg02");
        topBg.width = 272;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 65 - ofy;
        this._nodeContainer.addChild(topBg);
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal("acLuckBagBoxDesc", [String(need)]);
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
        this._nodeContainer.addChild(tipTxt1);
        var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt2.text = LanguageManager.getlocal("acLuckBagBoxDesc1");
        tipTxt2.x = bg.x + 10;
        tipTxt2.y = bg.y + 20;
        this._nodeContainer.addChild(tipTxt2);
        if (!canReward) {
            canReward = [];
        }
        var resultStr = mustStr;
        for (var index = 0; index < canReward.length; index++) {
            resultStr = resultStr + "|" + canReward[index];
        }
        var rewardArr = GameData.formatRewardItem(resultStr);
        var lineNum = Math.ceil(rewardArr.length / 4);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = bg.width - 30;
        rbg.height = 120 * lineNum + 15;
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
        var rewardX = rbg.x + (500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2; //rewardX = rbg.x + (500 - 108 * rewardArr.length - 10 * (rewardArr.length - 1)) / 2;
        var rewardY = rbg.y + 12;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            var numLb = iconItem.getChildByName("numLb");
            // if(numLb)
            // {
            //     numLb.visible = false;
            // }
            if (index > 0) {
                rewardX += (iconItem.width + 15);
                if (index % 4 == 0) {
                    rewardX = rewardX = rbg.x + (500 - 108 * rewardArr.length - 15 * (rewardArr.length - 1)) / 2;
                    rewardY += iconItem.height + 15;
                }
            }
            iconItem.x = rewardX;
            iconItem.y = rewardY;
            this._nodeContainer.addChild(iconItem);
        }
    };
    AcLuckBagBoxRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcLuckBagBoxRewardPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckBagBoxRewardPopupView;
}(PopupView));
__reflect(AcLuckBagBoxRewardPopupView.prototype, "AcLuckBagBoxRewardPopupView");
