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
 * 物资供应 item
 * author ycg
 * date 2020.5.27
 */
var SixSection1RechargeScrollItem = (function (_super) {
    __extends(SixSection1RechargeScrollItem, _super);
    function SixSection1RechargeScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    SixSection1RechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 620;
        this._data = data;
        var bg = BaseBitmap.create("public_scrollitembg"); //public_9_bg14
        bg.width = this.width - 20;
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeTitle", ["" + data.needGem]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += (titleTF.width + 40);
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var reward = data.getReward;
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 108;
        var spaceX = 8;
        var spaceY = 12;
        var scale = 1;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 20;
        rewardBg.x = bg.x + bg.width / 2 - rewardBg.width / 2;
        rewardBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(rewardBg);
        var stX = (rewardBg.width - (5 * (baseWidth * scale + spaceX) - spaceX)) / 2 + rewardBg.x;
        var rowNum = Math.ceil(rewardArr.length / 5);
        rewardBg.height = rowNum * (baseWidth * scale + spaceY) + spaceY;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = stX + (itemicon.width * scale + spaceX) * (i % 5);
            itemicon.y = rewardBg.y + spaceY + Math.floor(i / 5) * (itemicon.height * scale + spaceY);
            this.addChild(itemicon);
        }
        bg.height = rewardBg.y + rewardBg.height + 75;
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 410);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        var currChargeGem = Api.sixsection1VoApi.getRechargeNum();
        var progressStr = LanguageManager.getlocal("sixSection1RechargeProcess", [String(currChargeGem), "" + data.needGem]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        this.height = bg.height + this.getSpaceY();
        if (Api.sixsection1VoApi.isGetRechargeById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (currChargeGem >= data.needGem) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!Api.sixsection1VoApi.isInPeriousTime())) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, { rkey: data.id });
                }, this);
                reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", function () {
                    if ((!Api.sixsection1VoApi.isInPeriousTime())) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 15, bg.y + bg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                if ((!Api.sixsection1VoApi.isInPeriousTime())) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    SixSection1RechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1RechargeScrollItem.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1RechargeScrollItem;
}(ScrollListItem));
__reflect(SixSection1RechargeScrollItem.prototype, "SixSection1RechargeScrollItem");
//# sourceMappingURL=SixSection1RechargeScrollItem.js.map