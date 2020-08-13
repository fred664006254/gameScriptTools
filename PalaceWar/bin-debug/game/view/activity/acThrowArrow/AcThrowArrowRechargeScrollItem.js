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
 * 	投壶活动奖励item
 * author 张朝阳
 * date 2019/4/3
 * @class AcThrowArrowRechargeScrollItem
 */
var AcThrowArrowRechargeScrollItem = (function (_super) {
    __extends(AcThrowArrowRechargeScrollItem, _super);
    function AcThrowArrowRechargeScrollItem() {
        return _super.call(this) || this;
    }
    AcThrowArrowRechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, itemParam.code);
        this.width = 520;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        itembg.height = 120;
        this.addChild(itembg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 33;
        titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2, itembg.y + 8);
        this.addChild(titleBg);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupViewRechargeItemTitle-" + itemParam.code, [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
        this.addChild(titleTxt);
        var leftLine = BaseBitmap.create("public_line3");
        leftLine.width += titleTxt.width;
        leftLine.setPosition(titleTxt.x + titleTxt.width / 2 - leftLine.width / 2, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);
        var rewards = "1006_0_" + data.specialGift + "_" + itemParam.code + "|" + data.getReward;
        var rewardsVoList = GameData.formatRewardItem(rewards);
        var rewardBg = BaseBitmap.create("public_9_managebg");
        rewardBg.width = 490;
        rewardBg.setPosition(itembg.x + itembg.width / 2 - rewardBg.width / 2, titleBg.y + titleBg.height + 8);
        this.addChild(rewardBg);
        var rewardScale = 0.8;
        var itemHeight = 0;
        for (var i = 0; i < rewardsVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardsVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 10) + 13);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale;
        }
        var offsetHeight = rewardsVoList.length % 5 == 0 ? rewardsVoList.length / 5 * itemHeight : (Math.floor(rewardsVoList.length / 5) + 1) * itemHeight;
        rewardBg.height += offsetHeight;
        itembg.height += rewardBg.height;
        this.height = itembg.height;
        var progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 355);
        progress.setPosition(itembg.x + 20, itembg.y + itembg.height - progress.height - 25);
        this.addChild(progress);
        progress.setPercentage(vo.getChargeValue() / data.needGem, LanguageManager.getlocal("acThrowArrowViewRechargeItemValue-" + itemParam.code, [String(vo.getChargeValue()), String(data.needGem)]), TextFieldConst.COLOR_WHITE);
        progress.scaleX = 0.95;
        if (vo.getChargeValue() >= data.needGem) {
            if (vo.checkChargeFlag(data.id)) {
                var receiveflagScale = 0.6;
                var receiveflag = BaseBitmap.create("collectflag");
                receiveflag.setScale(receiveflagScale);
                receiveflag.setPosition(itembg.x + itembg.width - receiveflag.width * receiveflagScale - 20, itembg.y + itembg.height - receiveflag.height * receiveflagScale - 10);
                this.addChild(receiveflag);
            }
            else {
                var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if (!vo.isStart) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETRECHARGERWD, { activeId: vo.aidAndCode, idx: data.id });
                }, this);
                receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 15, itembg.y + itembg.height - receiveBtn.height - 10);
                this.addChild(receiveBtn);
            }
        }
        else {
            var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acThrowArrowViewRechargeItemRechargeBtn-" + itemParam.code, function () {
                if (vo.checkIsInEndShowTime()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            }, this);
            rechargeBtn.setPosition(itembg.x + itembg.width - rechargeBtn.width - 15, itembg.y + itembg.height - rechargeBtn.height - 10);
            this.addChild(rechargeBtn);
        }
    };
    AcThrowArrowRechargeScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRechargeScrollItem;
}(ScrollListItem));
__reflect(AcThrowArrowRechargeScrollItem.prototype, "AcThrowArrowRechargeScrollItem");
//# sourceMappingURL=AcThrowArrowRechargeScrollItem.js.map