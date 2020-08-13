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
 * @class AcRechargeBoxSPPopupScrollItem
 */
var AcRechargeBoxSPPopupScrollItem = (function (_super) {
    __extends(AcRechargeBoxSPPopupScrollItem, _super);
    function AcRechargeBoxSPPopupScrollItem() {
        var _this = _super.call(this) || this;
        _this._code = "";
        _this._aid = "";
        _this._desc1 = null;
        _this._desc2 = null;
        _this._rechargeBtn = null;
        _this._receiveBtn = null;
        _this._boxItemCfg = null;
        return _this;
    }
    AcRechargeBoxSPPopupScrollItem.prototype.initItem = function (index, boxItemCfg, itemParam) {
        this.width = 520;
        this._code = itemParam.code;
        this._aid = itemParam.aid;
        this._boxItemCfg = boxItemCfg;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 230;
        bg.setPosition(0, 0);
        this.addChild(bg);
        var rewardbg = BaseBitmap.create("public_tc_bg03");
        rewardbg.width = 502;
        rewardbg.height = 110;
        rewardbg.setPosition(bg.x + bg.width / 2 - rewardbg.width / 2, bg.y + 40);
        this.addChild(rewardbg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupTitle-" + boxItemCfg.id + "_" + this._code), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.x = bg.x + 15;
        titleText.y = bg.y + 10;
        this.addChild(titleText);
        var rewardVoList = GameData.formatRewardItem(boxItemCfg.getReward);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(0.8);
            var rewardDBWidth = rewardDB.width - 7;
            var startWidth = (rewardbg.width - rewardDBWidth * rewardVoList.length - 10) / (rewardVoList.length + 1);
            rewardDB.setPosition(5 + rewardbg.x + startWidth + 6 + (i * (rewardDBWidth + startWidth)), rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10);
            // rewardDB.x = 0;
            // rewardDB.y = rewardbg.y + rewardbg.height / 2 - rewardDB.height / 2 + 10;
            this.addChild(rewardDB);
        }
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc-" + this._boxItemCfg.id + "_" + this._code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN); //0x20eb37);
        desc1.setPosition(rewardbg.x + (rewardbg.width - 130) / 2 - desc1.width / 2, rewardbg.y + rewardbg.height + 10);
        this.addChild(desc1);
        if (this._code == "3") {
            desc1.visible = false;
        }
        this._desc1 = desc1;
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc2", ["0"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.setPosition(desc1.x + desc1.width / 2 - desc2.width / 2, desc1.y + desc1.height + 8);
        this.addChild(desc2);
        this._desc2 = desc2;
        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRechargeBoxSPPopupViewGoRecharge", this.rechargeClick, this);
        this._rechargeBtn.setPosition(rewardbg.x + rewardbg.width - this._rechargeBtn.width, desc1.y);
        this.addChild(this._rechargeBtn);
        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRechargeBoxSPPopupViewReceive", this.receiveClick, this);
        this._receiveBtn.setPosition(rewardbg.x + rewardbg.width - this._receiveBtn.width, desc1.y);
        this.addChild(this._receiveBtn);
        this.refreshData(index);
    };
    AcRechargeBoxSPPopupScrollItem.prototype.refreshData = function (index) {
        var status = 0; // 0->未解锁   1->前往充值  2->领取  3->已领取
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        // let boxCfg =  cfg.getBoxData(boxInfo.needGem);
        var rechargeNum = vo.getBoxReChargeNum(this._boxItemCfg.needGem);
        var receiveNum = vo.getBoxReceiveNum(this._boxItemCfg.needGem);
        if (this._boxItemCfg.rechargeTimeLimit > rechargeNum) {
            //不可领取
            //判断是否已经解锁了
            if (this._boxItemCfg.rechargeTimeLimit == rechargeNum + 1) {
                status = 1;
            }
            else {
                status = 0;
            }
        }
        else if (this._boxItemCfg.rechargeTimeLimit <= rechargeNum) {
            //可以领取
            //判断是否已经领取了
            var num = vo.getReceiveNumById(String(this._boxItemCfg.id));
            if (num == 0) {
                status = 2;
            }
            else {
                status = 3;
            }
        }
        this._desc2.text = "";
        switch (status) {
            case 0:// 0->未解锁
                this._rechargeBtn.visible = true;
                this._rechargeBtn.setEnable(false);
                this._rechargeBtn.setText("acRechargeBoxSPPopupViewLock");
                this._receiveBtn.visible = false;
                var unlockID = this._boxItemCfg.unlockID;
                if (unlockID > 0) {
                    this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc3", [LanguageManager.getlocal("acRechargeBoxSPPopupTitle-" + unlockID + "_" + this._code)]);
                    this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                }
                break;
            case 1://1->前往充值
                this._rechargeBtn.visible = true;
                this._rechargeBtn.setEnable(true);
                this._rechargeBtn.setText("acRechargeBoxSPPopupViewGoRecharge");
                this._receiveBtn.visible = false;
                var rechargecfg = Config.RechargeCfg.getRechargeItemCfgByKey(this._boxItemCfg.needGem);
                if (rechargecfg && rechargecfg.gemCost) {
                    this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc4", [String(rechargecfg.gemCost)]);
                    this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                }
                break;
            case 2://2->领取 
                this._rechargeBtn.visible = false;
                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(true);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceive");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc5");
                this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                break;
            case 3://3->已领取
                this._rechargeBtn.visible = false;
                this._receiveBtn.visible = true;
                this._receiveBtn.setEnable(false);
                this._receiveBtn.setText("acRechargeBoxSPPopupViewReceived");
                this._desc2.text = LanguageManager.getlocal("acRechargeBoxSPPopupViewDesc6");
                this._desc2.x = this._desc1.x + this._desc1.width / 2 - this._desc2.width / 2;
                break;
        }
    };
    /**
     * 前往充值按钮
     */
    AcRechargeBoxSPPopupScrollItem.prototype.rechargeClick = function () {
        if ("" + this._code == "5") {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRechargeBoxSP_rechargetip-code5"));
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    AcRechargeBoxSPPopupScrollItem.prototype.receiveClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo || !vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var activeId = this._aid + "-" + this._code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, { "activeId": activeId, "rechargeId": this._boxItemCfg.id });
    };
    AcRechargeBoxSPPopupScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRechargeBoxSPPopupScrollItem.prototype.dispose = function () {
        this._code = "";
        this._aid = "";
        this._desc1 = null;
        this._desc2 = null;
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._boxItemCfg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPPopupScrollItem;
}(ScrollListItem));
__reflect(AcRechargeBoxSPPopupScrollItem.prototype, "AcRechargeBoxSPPopupScrollItem");
