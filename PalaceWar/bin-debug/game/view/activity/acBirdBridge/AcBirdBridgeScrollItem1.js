var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
  * 充值奖励item
  * author sl
  * date 2020.7.24
  * @class AcBirdBridgeScrollItem1
  */
var AcBirdBridgeScrollItem1 = /** @class */ (function (_super) {
    __extends(AcBirdBridgeScrollItem1, _super);
    function AcBirdBridgeScrollItem1() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcBirdBridgeScrollItem1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeScrollItem1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeScrollItem1.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeScrollItem1.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcBirdBridgeScrollItem1.prototype.getTypeCode = function () {
        return this._itemData.uicode;
    };
    /**
     * 初始化itemview
     */
    AcBirdBridgeScrollItem1.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 530;
        var itemBg = BaseBitmap.create("public_popupscrollitembg");
        itemBg.x = this.width / 2 - itemBg.width / 2;
        this.addChild(itemBg);
        var titleBg = BaseBitmap.create("ac_skinoflibai_chargeitem_red");
        titleBg.x = itemBg.x;
        titleBg.y = itemBg.y + 5;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailRechargeItemInfo", "1"), [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = this._itemData.getReward;
        var rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
        var scale = 0.8;
        var itemHeight = 108;
        var itemWidth = 108;
        var spaceX = 10;
        var spaceY = 10;
        var stX = itemBg.x + (itemBg.width - (itemWidth * scale + spaceX) * 5 + spaceX) / 2;
        var stY = itemBg.y + 70;
        var offHeight = 95;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = itemBg.width - 20;
        rewardBg.x = itemBg.x + itemBg.width / 2 - rewardBg.width / 2;
        rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        for (var i = 0; i < rewardIconList.length; i++) {
            var rewardDB = rewardIconList[i];
            rewardDB.setScale(scale);
            rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        var bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
        if (bgHeight > itemBg.height) {
            itemBg.height = bgHeight - 8;
        }
        this.height = itemBg.height;
        itemBg.height -= 10;
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 330);
        progress.setPosition(itemBg.x + 15, itemBg.y + itemBg.height - progress.height - 18);
        this.addChild(progress);
        var currChargeGem = this.vo.rinfo.v;
        var progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailRechargeItemNum", this.getTypeCode()), [String(currChargeGem), String(data.needGem)]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        if (this.vo.isGetRechargeRewardById(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itemBg.x + itemBg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
            titleBg.setRes("ac_skinoflibai_chargeitem_green");
        }
        else {
            if (currChargeGem >= data.needGem) {
                titleBg.setRes("ac_skinoflibai_chargeitem_green");
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
                    if ((!_this.vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_AC_BIRDBRIDGEGETRECHARGE, { activeId: _this.vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 8);
                this.addChild(reviceBtn);
                if (!this.vo.isStart) {
                    reviceBtn.setGray(true);
                }
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", function () {
                    if (!_this.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                chargeBtn.setPosition(itemBg.x + itemBg.width - chargeBtn.width - 15, itemBg.y + itemBg.height - chargeBtn.height - 8);
                this.addChild(chargeBtn);
                if (!this.vo.isInActivity()) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcBirdBridgeScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcBirdBridgeScrollItem1.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcBirdBridgeScrollItem1;
}(ScrollListItem));
//# sourceMappingURL=AcBirdBridgeScrollItem1.js.map