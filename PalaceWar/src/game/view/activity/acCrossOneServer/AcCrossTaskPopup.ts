class AcCrossTaskPopupView extends PopupView {
    public constructor() {
        super();
    }

    private get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private _listview: ScrollList;
    private _list_db: AcCrossTaskItemInfo[];

    protected initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW), this.onRewardGet, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSONESERVER_END, this.refreshList, this);
        
        let listBg: BaseLoadBitmap = BaseLoadBitmap.create("public_scrolllistbg");
        listBg.width = 526;
        listBg.height = 720;
        this.addChildToContainer(listBg);
        listBg.setPosition((this.getShowWidth() - listBg.width) / 2, 0);
    
        this.refreshList();
    }

    private formatData() {
        this._list_db = [];
        this._list_db = this.Vo.config.taskList.map((v, i) => {
            return {
                aid: this.param.data.aid,
                code: this.param.data.code,
                rkey: i+1,
                powerAdd: v.powerAdd,
                rewards: v.getReward,
                powerNow: this.Vo.risePower,
                status: this.Vo.getTaskStatus(i+1)
            }
        })

        this._list_db.sort((a, b) => {
            return b.status - a.status;
        })
    }

    private refreshList() {
        this.formatData();

        if (!this._listview) {
            const list_w = 510;
            const list_h = 704;
            this._listview = ComponentManager.getScrollList(AcCrossTaskItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this._listview);
            this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8);
        }

        this._listview.refreshData(this._list_db);
    }

    private onRewardGet(e: any) {
        if (e.data.ret) {
            const __rews = e.data.data.data.rewards;
            let rewardList = GameData.formatRewardItem(__rews);
            App.CommonUtil.playRewardFlyAction(rewardList);
        }
    }

    protected getTitleStr() {
        return "acCrossOneServerText2"
    }

    protected getShowHeight():number {
        return 820;
    }

    protected resetBgSize():void {
        super.resetBgSize();
        this.container.y = this.viewBg.y + 72;
    }

    public dispose() {
        this._listview = null;
        this._list_db = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW), this.onRewardGet, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSONESERVER_END, this.refreshList, this);
        super.dispose()
    }
}