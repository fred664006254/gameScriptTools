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
  * 充值奖励item
  * author ycg
  * date 2020.2.10
  * @class AcThreekingdomsOfWifeDetailTab1ScrollItem
  */
var AcThreekingdomsOfWifeDetailTab1ScrollItem = (function (_super) {
    __extends(AcThreekingdomsOfWifeDetailTab1ScrollItem, _super);
    function AcThreekingdomsOfWifeDetailTab1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._issending = false;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcThreekingdomsOfWifeDetailTab1ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsOfWifeChargeItem", [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = this._itemData.getReward;
        if (this._itemData.specialGift) {
            rewards = "1040_0_" + this._itemData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
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
        var currChargeGem = vo.getCurrRecharge();
        var progressStr = LanguageManager.getlocal("acThreekingdomsOfWifeChargeNum", [String(currChargeGem), String(data.needGem)]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        this.height = itembg.height;
        if (vo.isGetChargeRewardById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
            titleBg.setRes("accarnivalview_tab_green");
        }
        else {
            if (vo.getCurrRecharge() >= data.needGem) {
                titleBg.setRes("accarnivalview_tab_green");
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    if (_this._issending == true) {
                        return;
                    }
                    _this._issending = true;
                    NetManager.request(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, { activeId: vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", function () {
                    if (!vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(itembg.x + itembg.width - chargeBtn.width - 15, itembg.y + itembg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                if (!vo.isInActivity()) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcThreekingdomsOfWifeDetailTab1ScrollItem.prototype.getTypeCode = function () {
        if (this._aidAndCode.code == "2") {
            return "1";
        }
        if (this._aidAndCode.code == "4") {
            return "3";
        }
        return this._aidAndCode.code;
    };
    AcThreekingdomsOfWifeDetailTab1ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcThreekingdomsOfWifeDetailTab1ScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._issending = false;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsOfWifeDetailTab1ScrollItem;
}(ScrollListItem));
__reflect(AcThreekingdomsOfWifeDetailTab1ScrollItem.prototype, "AcThreekingdomsOfWifeDetailTab1ScrollItem");
//# sourceMappingURL=AcThreekingdomsOfWifeDetailTab1ScrollItem.js.map