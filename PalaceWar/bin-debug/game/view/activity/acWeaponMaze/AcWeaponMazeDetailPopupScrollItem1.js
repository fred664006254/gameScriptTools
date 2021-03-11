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
  * date 2020.4.24
  * @class AcWeaponMazeDetailPopupScrollItem1
  */
var AcWeaponMazeDetailPopupScrollItem1 = (function (_super) {
    __extends(AcWeaponMazeDetailPopupScrollItem1, _super);
    function AcWeaponMazeDetailPopupScrollItem1() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem1.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupScrollItem1.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeDetailPopupScrollItem1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**
     * 初始化itemview
     */
    AcWeaponMazeDetailPopupScrollItem1.prototype.initItem = function (index, data, itemParam) {
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
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailRechargeItemInfo", this.getTypeCode()), [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 15, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = this._itemData.getReward;
        if (this._itemData.specialGift) {
            rewards = "1055_0_" + this._itemData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
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
            itemBg.height = bgHeight;
        }
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 330);
        progress.setPosition(itemBg.x + 15, itemBg.y + itemBg.height - progress.height - 25);
        this.addChild(progress);
        var currChargeGem = this.vo.getRechargeNum();
        var progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailRechargeItemNum", this.getTypeCode()), [String(currChargeGem), String(data.needGem)]);
        progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);
        this.height = itemBg.height;
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
                    NetManager.request(NetRequestConst.REQUEST_ACWEAPONMAZE_GETRECHARGE, { activeId: _this.vo.aidAndCode, rkey: data.id });
                }, this);
                reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
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
                chargeBtn.setPosition(itemBg.x + itemBg.width - chargeBtn.width - 15, itemBg.y + itemBg.height - chargeBtn.height - 15);
                this.addChild(chargeBtn);
                if (!this.vo.isInActivity()) {
                    chargeBtn.setGray(true);
                }
            }
        }
    };
    AcWeaponMazeDetailPopupScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    AcWeaponMazeDetailPopupScrollItem1.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeDetailPopupScrollItem1;
}(ScrollListItem));
__reflect(AcWeaponMazeDetailPopupScrollItem1.prototype, "AcWeaponMazeDetailPopupScrollItem1");
//# sourceMappingURL=AcWeaponMazeDetailPopupScrollItem1.js.map