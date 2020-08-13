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
  * 国庆活动充值奖励item
  * author yangchengguo
  * date 2019.9.12
  * @class AcNationalDayRechargeScrollItem
  */
var AcNationalDayRechargeScrollItem = (function (_super) {
    __extends(AcNationalDayRechargeScrollItem, _super);
    function AcNationalDayRechargeScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcNationalDayRechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var itemBgStr = ResourceManager.hasRes("acnationalday_charge_item_bg-" + this.getTypeCode()) ? "acnationalday_charge_item_bg-" + this.getTypeCode() : "acnationalday_charge_item_bg-1";
        var itembg = BaseBitmap.create(itemBgStr);
        itembg.width = 621;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("alliance_taskAttrbg1");
        titleBg.y = 7;
        titleBg.x = 0;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeItemInfo-" + this.getTypeCode(), [String(data.needItem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 80;
        var rewards = this._itemData.getReward;
        if (data.specialReward) {
            rewards = "1028_0_" + data.specialReward + "_" + this._code + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 1;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 11) + 19, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = ((rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) - 1) * itemHeight;
        itembg.height += offsetH + 5;
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 420);
        // itembg.height += progress.height + 25;
        progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 20);
        this.addChild(progress);
        var currChargeGem = vo.getChargeNum();
        var progressStr = String(currChargeGem + "/" + data.needItem);
        progress.setPercentage(currChargeGem / data.needItem, progressStr, TextFieldConst.COLOR_WHITE);
        this.height = itembg.height;
        if (vo.isGetRechargeById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.55);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.55 / 2 - 10, this.y + this.height - reviceBM.height * 0.55 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getChargeNum() >= data.needItem) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETCHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 10);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", function () {
                    if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 10);
                this.addChild(chargeBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcNationalDayRechargeScrollItem.prototype.getTypeCode = function () {
        if (this._code == "2") {
            return "1";
        }
        return this._code;
    };
    AcNationalDayRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcNationalDayRechargeScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayRechargeScrollItem;
}(ScrollListItem));
__reflect(AcNationalDayRechargeScrollItem.prototype, "AcNationalDayRechargeScrollItem");
//# sourceMappingURL=AcNationalDayRechargeScrollItem.js.map