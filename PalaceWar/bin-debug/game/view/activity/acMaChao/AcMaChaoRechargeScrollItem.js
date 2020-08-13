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
  * 马超活动充值item‘
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRechargeScrollItem
  */
var AcMaChaoRechargeScrollItem = (function (_super) {
    __extends(AcMaChaoRechargeScrollItem, _super);
    function AcMaChaoRechargeScrollItem() {
        var _this = _super.call(this) || this;
        /**
         * 充值奖励数据
         */
        _this._rewardData = null;
        _this._itemParm = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcMaChaoRechargeScrollItem.prototype.initItem = function (index, data, itemParm) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParm.aid, itemParm.code);
        this._rewardData = data;
        this._itemParm = itemParm;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 610;
        itembg.height = 240;
        this.addChild(itembg);
        var detailBg = BaseBitmap.create("accarnivalview_tab_red");
        detailBg.setPosition(itembg.x + 3, itembg.y + 5);
        this.addChild(detailBg);
        var detailTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewRecharge-" + itemParm.code, [this._rewardData.needGem]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        detailTF.setPosition(detailBg.x + 10, detailBg.y + detailBg.height / 2 - detailTF.height / 2);
        this.addChild(detailTF);
        var rewardArr = GameData.formatRewardItem(this._rewardData.getReward);
        var itemHeigth;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.95);
            rewardItem.setPosition(detailBg.x + 17 + i % 5 * (rewardItem.width + 8), detailBg.y + detailBg.height + Math.floor(i / 5) * (rewardItem.height + 3) + 10);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        var num = rewardArr.length % 5 == 0 ? (rewardArr.length / 5) - 1 : Math.floor(rewardArr.length / 5);
        itembg.height += num * itemHeigth + 20;
        var progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        progress.setPosition(detailTF.x, itembg.y + itembg.height - progress.height - 22);
        this.addChild(progress);
        var receiveBM = BaseBitmap.create("collectflag");
        receiveBM.anchorOffsetX = receiveBM.width / 2;
        receiveBM.anchorOffsetY = receiveBM.height / 2;
        var numScale = 0.6;
        receiveBM.setScale(numScale);
        receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width / 2 * numScale - 15, itembg.y + itembg.height - receiveBM.height / 2 * numScale - 20);
        this.addChild(receiveBM);
        var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
        rechargeBtn.setPosition(itembg.x + itembg.width - rechargeBtn.width - 15, itembg.y + itembg.height - rechargeBtn.height - 20);
        this.addChild(rechargeBtn);
        var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
        receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 15, itembg.y + itembg.height - receiveBtn.height - 20);
        this.addChild(receiveBtn);
        this.height = itembg.height;
        progress.setText(LanguageManager.getlocal("acMaChaoViewProgressText-" + itemParm.code, [String(vo.getChargeNum()), this._rewardData.needGem]));
        var percent = vo.getChargeNum() / this._rewardData.needGem;
        progress.setPercentage(percent);
        if (vo.isReceive(this._rewardData.id)) {
            receiveBM.setVisible(true);
            rechargeBtn.setVisible(false);
            receiveBtn.setVisible(false);
        }
        else {
            if (vo.getChargeNum() < this._rewardData.needGem) {
                receiveBM.setVisible(false);
                rechargeBtn.setVisible(true);
                receiveBtn.setVisible(false);
            }
            else {
                receiveBM.setVisible(false);
                rechargeBtn.setVisible(false);
                receiveBtn.setVisible(true);
            }
        }
    };
    /**
  * 打开充值界面
  */
    AcMaChaoRechargeScrollItem.prototype.rechargeHandler = function (event) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    AcMaChaoRechargeScrollItem.prototype.receiveHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMC, { "activeId": vo.aidAndCode, "rechargeId": this._rewardData.id });
    };
    AcMaChaoRechargeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMaChaoRechargeScrollItem.prototype.dispose = function () {
        this._rewardData = null;
        this._itemParm = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoRechargeScrollItem;
}(ScrollListItem));
__reflect(AcMaChaoRechargeScrollItem.prototype, "AcMaChaoRechargeScrollItem");
//# sourceMappingURL=AcMaChaoRechargeScrollItem.js.map