/**
  * 客栈活动充值item
  * author 张朝阳
  * date 2018/12/7
  * @class AcHotelRechargeScrollItem
  */
class AcHotelRechargeScrollItem extends ScrollListItem {
    /**
    * 充值进度条
    */
    private _progress: ProgressBar = null;
    /**
     * 充值奖励数据
     */
    private _itemData: Config.AcCfg.HotelRechargeItemCfg = null;
    private _aidAndCode: { "aid": string; "code": string } = null;
    /**
     * item的bg
     */
    private _itembg: BaseBitmap = null;

    private _receiveBM: BaseBitmap = null;

    private _receiveBtn: BaseButton = null;

    private _rechargeBtn: BaseButton = null;
    public constructor() {
        super();
    }
	/**
	 * 初始化itemview
	 */
    public initItem(index: number, data: any, itemParam: any): void {
        this._itemData = data;
        this._aidAndCode = itemParam;
        this.width = 608;
        this._itembg = BaseBitmap.create("public_9_bg14");
        this._itembg.width = this.width;
        this._itembg.height = 210;
        this.addChild(this._itembg);

        let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(this._itembg.x + this._itembg.width / 2 - titleBg.width / 2, this._itembg.y + 5);
        this.addChild(titleBg);

        let titleTFKey = this._aidAndCode.code == "1" ? "acHotelRechargeTitle" : "acHotelRechargeTitle-" + this._aidAndCode.code;
        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(titleTFKey, [String(this._itemData.needGem)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);

        let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

        let rewardBg = BaseBitmap.create("public_9_managebg");
        // 113 X 420;
        rewardBg.width = 420;
        rewardBg.height = 113;
        rewardBg.setPosition(titleBg.x + 10, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);



        let rewardArr: RewardItemVo[] = GameData.formatRewardItem(this._itemData.getReward);
        // let scrolNode : BaseDisplayObjectContainer =  new  BaseDisplayObjectContainer();
        let itemHeight: number;
        for (var i = 0; i < rewardArr.length; i++) {
            let rewardItem: BaseDisplayObjectContainer = GameData.getItemIcon(rewardArr[i], true);
            rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setScale(0.9);
            rewardItem.setPosition(rewardBg.x + rewardItem.width / 2 + i % 4 * (rewardItem.width - 5), rewardBg.y + rewardItem.height / 2 + (Math.floor((i) / 4)) * rewardItem.height + 3);
            this.addChild(rewardItem);
            itemHeight = rewardItem.height;

        }
        rewardBg.height += (Math.floor(rewardArr.length / 4) - 1) * itemHeight;
        this._itembg.height += (Math.floor(rewardArr.length / 4) - 1) * itemHeight;

        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 576);
        this._progress.setPosition(this._itembg.x + 10, this._itembg.y + this._itembg.height - this._progress.height - 22);
        this.addChild(this._progress);

        this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "acCarnivalToChargeBtnText", this.rechargeHandler, this);
        this._rechargeBtn.setPosition(this._itembg.x + this._itembg.width - this._rechargeBtn.width - 5, this._itembg.y + this._itembg.height / 2 - this._rechargeBtn.height / 2);
        this.addChild(this._rechargeBtn);

        this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ac_recharge_Btntxt2", this.receiveHandler, this);
        this._receiveBtn.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2 - this._receiveBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2 - this._receiveBtn.height / 2);
        this.addChild(this._receiveBtn);

        this._receiveBM = BaseBitmap.create("collectflag");
        this._receiveBM.anchorOffsetX = this._receiveBM.width / 2;
        this._receiveBM.anchorOffsetY = this._receiveBM.height / 2;
        this._receiveBM.setScale(0.6);
        this._receiveBM.setPosition(this._rechargeBtn.x + this._rechargeBtn.width / 2, this._rechargeBtn.y + this._rechargeBtn.height / 2);
        this.addChild(this._receiveBM);
        this.refreshView();

    }

    /**
     * 刷新UI
     */
    private refreshView() {
        this.refreshProgress();
        this.refreshBtn();

    }
    /**
     * 刷新进度
     */
    private refreshProgress() {
        let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        let percentTxt = LanguageManager.getlocal("acCarnivalProgressText", [String(vo.getRechargeValue()), String(this._itemData.needGem)]);
        let percent = vo.getRechargeValue() / this._itemData.needGem;
        this._progress.setText(percentTxt)
        this._progress.setPercentage(percent);
    }
	/**
     * 更新Btn
     */
    private refreshBtn() {
        let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (vo.isReceiveRecharge(this._itemData.id)) {
            this._receiveBM.setVisible(true);
            this._rechargeBtn.setVisible(false);
            this._receiveBtn.setVisible(false);
        }
        else {

            if (vo.getRechargeValue() < this._itemData.needGem) {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(true);
                this._receiveBtn.setVisible(false);
            }
            else {
                this._receiveBM.setVisible(false);
                this._rechargeBtn.setVisible(false);
                this._receiveBtn.setVisible(true);
            }
        }
    }
	/**
     * 打开充值界面
     */
    private rechargeHandler(event: egret.Event) {
        let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        let deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    /**
     * 领取按钮
     */
    private receiveHandler() {
        let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMC, { "activeId": activityId, "rechargeId": this._itemData.id });
    }

    public getSpaceY(): number {
        return 5;
    }

    public dispose(): void {
        this._progress = null;
        this._itemData = null;
        // this._id = null;
        this._itembg = null;
        this._receiveBM = null;
        this._receiveBtn = null;
        this._rechargeBtn = null;
        super.dispose();
    }
}