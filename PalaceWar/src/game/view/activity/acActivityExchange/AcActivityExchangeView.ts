class AcActivityExchangeView extends AcCommonView {
    public constructor() {
        super();
    }

    private _banner: BaseLoadBitmap;
    private _listBg: BaseLoadBitmap;
    private listview: ScrollList;
    private _list_db: any[];

    private _timeLabel: BaseTextField;
    private _djsBg: BaseLoadBitmap;
    private _djsLabel: BaseTextField;

    public get Vo(): AcActivityExchangeVo {
        return <AcActivityExchangeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.updateList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE), this.onRewardGet, this);

        this._banner = BaseLoadBitmap.create("acactivityexchange-1_banner");
        this.addChildToContainer(this._banner);
        this._banner.height = 245;
        this._banner.y = this.titleBg.height - 6;

        this._listBg = BaseLoadBitmap.create("acactivityexchange-1_bigframe");
        this.addChildToContainer(this._listBg);
        this._listBg.width = GameConfig.stageWidth;
        this._listBg.height = GameConfig.stageHeigth - this._banner.y - this._banner.height;
        this._listBg.x = 0;
        this._listBg.y = this._banner.y + this._banner.height;

        this._timeLabel = ComponentManager.getTextField(this.Vo.getAcTimeAndHour(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this.addChildToContainer(this._timeLabel);
        this._timeLabel.width = 340;
        this._timeLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this._timeLabel.setPosition(264, this._banner.y + 168);

        this._djsBg = BaseLoadBitmap.create("public_9_bg61");
        this.addChildToContainer(this._djsBg);
        this._djsBg.width = 270;
        this._djsBg.height = 28;
        this._djsBg.setPosition(GameConfig.stageWidth - 270, this._banner.y + this._banner.height - 28);
        this._djsLabel = ComponentManager.getTextField(this.Vo.getAcCountDown(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this.addChildToContainer(this._djsLabel);
        this._djsLabel.width = 270;
        this._djsLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this._djsLabel.setPosition(GameConfig.stageWidth - 270, this._banner.y + this._banner.height - 24);

        this.updateList();
    }

    private formatListData() {
        this._list_db = [];
        this.Vo.config.AllCfgItems.forEach(v => {
            this._list_db.push({
                aid: this.aid,
                code: this.code,
                itemCfg: <Config.AcCfg.ActivityExchangeCfgItem>v
            })
        })
    }

    private updateList() {
        this.formatListData();
        if (!this.listview) {
            const list_w = 602;
            const list_h = this._listBg.height - 30;
            this.listview = ComponentManager.getScrollList(AcActivityExchangeItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this.listview);
            this.listview.x = (GameConfig.stageWidth - list_w) / 2;
            this.listview.y = this._listBg.y + 15;
        }

        this.listview.refreshData(this._list_db);
    }

    protected getTitleBgName(): string {
        return "acactivityexchange-1_title";
    }

    protected getTitleStr():string {
        return "";
    }

    protected getRuleInfo():string{
		return "acActivityExchangeRule-" + this.getUiCode();
    }

    private onRewardGet(e: any) {
        if (e.data.ret) {
            const __rews = e.data.data.data.rewards;
            let rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList, this.Vo.buyPoint);
        }
    }

    public tick() {
        this._djsLabel.text = this.Vo.getAcCountDown();
    }

    public dispose() {
        this._banner = null;
        this.listview = null;
        this._list_db = null;
        this._listBg = null;
        this._timeLabel = null;
        this._djsBg = null;
        this._djsLabel = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.updateList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE), this.onRewardGet, this);
        super.dispose();
    }
}