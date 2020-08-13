/**
  * 马超活动充值item‘
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRechargeScrollItem
  */
class AcMaChaoRechargeScrollItem extends ScrollListItem {

    /**
     * 充值奖励数据
     */
    private _rewardData: any = null;

    private _itemParm: any = null;
    public constructor() {
        super();
    }
	/**
	 * 初始化itemview
	 */
    public initItem(index: number, data: any, itemParm: any): void {

        let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);
        let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(itemParm.aid, itemParm.code);


        this._rewardData = data;
        this._itemParm = itemParm;
        let itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 610;
        itembg.height = 240;
        this.addChild(itembg);

        let detailBg: BaseBitmap = BaseBitmap.create("accarnivalview_tab_red");
        detailBg.setPosition(itembg.x + 3, itembg.y + 5);
        this.addChild(detailBg);

        let detailTF: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoViewRecharge-" + itemParm.code, [this._rewardData.needGem]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        detailTF.setPosition(detailBg.x + 10, detailBg.y + detailBg.height / 2 - detailTF.height / 2);
        this.addChild(detailTF);


        let rewardArr: RewardItemVo[] = GameData.formatRewardItem(this._rewardData.getReward);
        let itemHeigth: number;
        for (var i = 0; i < rewardArr.length; i++) {
            let rewardItem: BaseDisplayObjectContainer = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.95);
            rewardItem.setPosition(detailBg.x + 17 + i % 5 * (rewardItem.width + 8), detailBg.y + detailBg.height + Math.floor(i / 5) * (rewardItem.height + 3) + 10);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        let num = rewardArr.length % 5 == 0 ? (rewardArr.length / 5) - 1 : Math.floor(rewardArr.length / 5);
        itembg.height += num * itemHeigth + 20;

        let progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 386);
        progress.setPosition(detailTF.x, itembg.y + itembg.height - progress.height - 22);
        this.addChild(progress);

        let receiveBM = BaseBitmap.create("collectflag");

        receiveBM.anchorOffsetX = receiveBM.width / 2;
        receiveBM.anchorOffsetY = receiveBM.height / 2;
        let numScale: number = 0.6;
        receiveBM.setScale(numScale);
        receiveBM.setPosition(itembg.x + itembg.width - receiveBM.width / 2 * numScale - 15, itembg.y + itembg.height - receiveBM.height / 2 * numScale - 20)
        this.addChild(receiveBM);

        let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
        rechargeBtn.setPosition(itembg.x + itembg.width - rechargeBtn.width - 15, itembg.y + itembg.height - rechargeBtn.height - 20);
        this.addChild(rechargeBtn);

        let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
        receiveBtn.setPosition(itembg.x + itembg.width - receiveBtn.width - 15, itembg.y + itembg.height - receiveBtn.height - 20);
        this.addChild(receiveBtn);

        this.height = itembg.height;

        progress.setText(LanguageManager.getlocal("acMaChaoViewProgressText-" + itemParm.code, [String(vo.getChargeNum()), this._rewardData.needGem]))
        let percent: number = vo.getChargeNum() / this._rewardData.needGem;
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
    }
    /**
  * 打开充值界面
  */
    private rechargeHandler(event: egret.Event) {
        let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    /**
     * 领取按钮
     */
    private receiveHandler() {
        let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMC, { "activeId": vo.aidAndCode, "rechargeId": this._rewardData.id });
    }


    public getSpaceY(): number {
        return 5;
    }

    public dispose(): void {
        this._rewardData = null;
        this._itemParm = null;
        super.dispose();
    }
}