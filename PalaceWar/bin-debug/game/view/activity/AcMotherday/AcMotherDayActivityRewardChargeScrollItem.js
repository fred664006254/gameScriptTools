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
  * 充值item
  * author 张朝阳
  * date 2019/7/16
  * @class AcMotherDayActivityRewardChargeScrollItem
  */
var AcMotherDayActivityRewardChargeScrollItem = (function (_super) {
    __extends(AcMotherDayActivityRewardChargeScrollItem, _super);
    function AcMotherDayActivityRewardChargeScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        return _this;
    }
    AcMotherDayActivityRewardChargeScrollItem.prototype.isSceneCode = function (code) {
        var arr = [3, 4, 7, 8];
        return arr.indexOf(Number(code)) > -1;
    };
    AcMotherDayActivityRewardChargeScrollItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this._aidAndCode.code)) {
            case 2:
            case 5:
            case 6:
                code = '1';
                break;
            case 4:
                code = '3';
                break;
            case 7:
            case 8:
                code = '7';
                break;
            default:
                code = this._aidAndCode.code;
                break;
        }
        return code;
    };
    /**
     * 初始化itemview
     */
    AcMotherDayActivityRewardChargeScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aidAndCode = itemParam;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        itembg.height = 130;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create(vo.getChargeNum() >= data.needGem ? "accarnivalview_tab_green" : "accarnivalview_tab_red");
        titleBg.y = 7;
        titleBg.x = 3;
        // bottom2.width =170;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acMotherDayActivityRewardChargeScrollItemTitle-3", [String(data.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        // titleBg.width = titleTF.width + 50;
        var rewards = this._itemData.getReward;
        if (this._itemData.specialGift) {
            var uicode = this.getUiCode();
            rewards = "1007_0_" + this._itemData.specialGift + "_" + uicode + "|" + this._itemData.getReward;
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
        itembg.height += offsetH;
        this.height = itembg.height;
        //进度条
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 320);
        progress.setPosition(itembg.x + 15, itembg.y + itembg.height - progress.height - 25);
        this.addChild(progress);
        progress.setPercentage(vo.getChargeNum() / data.needGem, LanguageManager.getlocal("acMotherDayActivityRewardChargeScrollItempg-" + (this.isSceneCode(this._aidAndCode.code) ? '3' : this._aidAndCode.code), [String(vo.getChargeNum()), String(data.needGem)]), TextFieldConst.COLOR_WHITE);
        if (vo.isGetRecharge(data.id)) {
            var reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(itembg.x + itembg.width - reviceBM.width * 0.7 / 2 - 10, this.y + this.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else {
            if (vo.getChargeNum() >= data.needGem) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    var v = Api.acVoApi.getActivityVoByAidAndCode(_this._aidAndCode.aid, _this._aidAndCode.code);
                    if ((!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_MOTHERDAY_GETCHARGE, { activeId: vo.aidAndCode, rkey: Number(data.id) });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
            }
            else {
                var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", function () {
                    var v = Api.acVoApi.getActivityVoByAidAndCode(_this._aidAndCode.aid, _this._aidAndCode.code);
                    if (vo.checkIsInEndShowTime() || (!v.isStart)) {
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
    AcMotherDayActivityRewardChargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMotherDayActivityRewardChargeScrollItem.prototype.dispose = function () {
        this._itemData = null;
        _super.prototype.dispose.call(this);
    };
    return AcMotherDayActivityRewardChargeScrollItem;
}(ScrollListItem));
__reflect(AcMotherDayActivityRewardChargeScrollItem.prototype, "AcMotherDayActivityRewardChargeScrollItem");
//# sourceMappingURL=AcMotherDayActivityRewardChargeScrollItem.js.map