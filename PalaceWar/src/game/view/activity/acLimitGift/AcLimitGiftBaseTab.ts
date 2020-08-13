class AcLimitGiftBaseTab extends CommonViewTab {
    public constructor(data?: any) {
        super();
        this.initView();
    }

    public Vo: AcLimitGiftVo;

    private _listview: ScrollList;
    private _list_db: AcLimitGiftItemInfo[];

    protected initView() {
        const list_w = GameConfig.stageWidth - 20;
        const list_h = GameConfig.stageHeigth - 368 - 24;
        this._listview = ComponentManager.getScrollList(AcLimitGiftItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.addChild(this._listview);
        this._listview.setPosition(10, 4);

        let _bottom = BaseLoadBitmap.create("ac_limitgift_bg2");
        this.addChild(_bottom);
        _bottom.height = 32;
        _bottom.setPosition(0, GameConfig.stageHeigth - 362 - 32);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.onRewardGet, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receiveBuy, this);
    }

    private updateData() {
        this._list_db = [];
        this._list_db = this.Vo.config.GiftList.map(v => {
            return {
                aid: this.Vo.aid,
                code: this.Vo.code,
                cost: v.cost,
                getReward: v.getReward,
                limit: v.limit,
                show: v.show,
                has: this.Vo.getBuyNumByCost(v.cost)
            }
        })
    }

    public refreshView() {
        if (!this.Vo) return;
        this.updateData();

        this._listview.refreshData(this._list_db);
    }

    private onRewardGet(e: any) {
        if (e.data.ret) {
            const __rews = e.data.data.data.rewards;
            let rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }

        this.refreshView();
    }

    private receiveBuy(e) {
        if (e.data.ret) {
            const __cost = e.data.data.data.payment.itemId;
            const __rews =  Config.RechargeCfg.getRechargeItemCfgByKey(__cost).getReward;
            let rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }

        this.refreshView();
    }

    public dispose() {
        this._list_db = null;
        this._listview = null;

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.onRewardGet, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receiveBuy, this);
        super.dispose();
    }
}