class AcCrossRankRewPopupView extends PopupView {
    public constructor() {
        super();
    }

    private get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private _listview: ScrollList;
    private _list_db: AcCrossRankRewItemInfo[];

    private scoreLabel: BaseTextField;
    private rankLabel: BaseTextField;

    private lookRankBtn: BaseButton;

    protected initView() {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshMyRank, this);

        let listBg: BaseLoadBitmap = BaseLoadBitmap.create("public_scrolllistbg");
        listBg.width = 526;
        listBg.height = 606;
        this.addChildToContainer(listBg);
        listBg.setPosition((this.getShowWidth() - listBg.width) / 2, 0);

        let _msgBg = BaseLoadBitmap.create("public_9_bg1");
        this.addChildToContainer(_msgBg);
        _msgBg.width = 526;
        _msgBg.height = 108;
        _msgBg.setPosition((this.getShowWidth() - _msgBg.width) / 2, listBg.height + 4);

        this.scoreLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText8", [""+this.Vo.risePower]), 24, 0xfcf3b4);
        this.addChildToContainer(this.scoreLabel);
        this.scoreLabel.setPosition(_msgBg.x+20, _msgBg.y+25);

        this.rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText9", [""]), 24, 0xfcf3b4);
        this.addChildToContainer(this.rankLabel);
        this.rankLabel.setPosition(_msgBg.x+20, _msgBg.y+62);

        this.Vo.getRankInfo(1);

        this.lookRankBtn = ComponentManager.getButton("btn2_small_yellow", "acCrossOneServerText10", this.lookRank, this);
        this.addChildToContainer(this.lookRankBtn);
        this.lookRankBtn.setPosition(_msgBg.x+378, _msgBg.y+32);
    
        this.refreshList();
    }

    private lookRank() {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code
        })
    }

    private refreshMyRank(e) {
        let __myrank: string = LanguageManager.getlocal("acCrossOneServerText18");
        if (e.data.ret && e.data.data.data && e.data.data.data.myrankArr) {
            let _db = e.data.data.data;
            if (_db.myrankArr.myrank) {
                __myrank = ""+_db.myrankArr.myrank;
            }
        }
        this.rankLabel.text = LanguageManager.getlocal("acCrossOneServerText9", [__myrank]);
    }

    private formatData() {
        this._list_db = [];
        this._list_db = this.Vo.config.awardList.map(v => {
            return {
                aid: this.param.aid,
                code: this.param.code,
                rewards: v.getReward,
                rank: v.rank
            }
        })
    }

    private refreshList() {
        this.formatData();

        if (!this._listview) {
            const list_w = 510;
            const list_h = 606 - 16;
            this._listview = ComponentManager.getScrollList(AcCrossRankRewItem, [], new egret.Rectangle(0, 0, list_w, list_h));
            this.addChildToContainer(this._listview);
            this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8);
        }

        this._listview.refreshData(this._list_db);
    }

    protected getTitleStr() {
        return "acCrossOneServerText4"
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
        this.scoreLabel = null;
        this.rankLabel = null;
        this.lookRankBtn = null;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshMyRank, this);
        super.dispose()
    }
}