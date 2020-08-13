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
  * 携美同游充值奖励item
  * author yangchengguo
  * date 2019.11.4
  * @class AcTravelWithBeautyRechargeScrollItem
  */
var AcTravelWithBeautyRechargeScrollItem = (function (_super) {
    __extends(AcTravelWithBeautyRechargeScrollItem, _super);
    function AcTravelWithBeautyRechargeScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcTravelWithBeautyRechargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 530;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("accarnivalview_tab_red");
        titleBg.y = 7;
        titleBg.x = 5;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acTravelWithBeautyRechargeNumTitle-" + this.getTypeCode(), [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = this._itemData.getReward;
        if (this._itemData.specialGift) {
            rewards = "1033_0_" + this._itemData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH - 20;
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
        itembg.height += progress.height + 25;
        progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
        this.addChild(progress);
        var currChargeGem = vo.getChargeNum();
        var progressStr = LanguageManager.getlocal("acTravelWithBeautyRechargeNum-" + this.getTypeCode(), [String(currChargeGem), String(data.needGem)]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        this.height = itembg.height;
        if (vo.isGetRechargeById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
            titleBg.setRes("accarnivalview_tab_green");
        }
        else {
            if (vo.getChargeNum() >= data.needGem) {
                titleBg.setRes("accarnivalview_tab_green");
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
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
                chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcTravelWithBeautyRechargeScrollItem.prototype.getTypeCode = function () {
        if (this._aidAndCode.code == "2") {
            return "1";
        }
        else if (this._aidAndCode.code == "4") {
            return "3";
        }
        return this._aidAndCode.code;
    };
    AcTravelWithBeautyRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcTravelWithBeautyRechargeScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyRechargeScrollItem;
}(ScrollListItem));
__reflect(AcTravelWithBeautyRechargeScrollItem.prototype, "AcTravelWithBeautyRechargeScrollItem");
//# sourceMappingURL=AcTravelWithBeautyRechargeScrollItem.js.map