class AcCrossRankPopupView extends PopupView {
    public constructor() {
        super();
    }

    private get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private _listview: RankScrollList;

    private _rankLabel: BaseTextField;

    private noRankTip: BaseTextField;

    protected initView() {
        let listBg1: BaseLoadBitmap = BaseLoadBitmap.create("public_scrolllistbg");
        listBg1.width = 526;
        listBg1.height = 606;
        this.addChildToContainer(listBg1);
        listBg1.setPosition((this.getShowWidth() - listBg1.width) / 2, 0);

        let listBg2 = BaseLoadBitmap.create("public_popupscrollitembg");
        listBg2.width = 510;
        listBg2.height = 606-16-4;
        this.addChildToContainer(listBg2);
        listBg2.setPosition(listBg1.x + 8, listBg1.y + 12);

        let titleBg = BaseLoadBitmap.create("public_9_bg33");
        this.addChildToContainer(titleBg);
        titleBg.width = 510;
        titleBg.height = 34;
        titleBg.setPosition(listBg2.x, listBg2.y-4);
        let _t1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText11"), 22, 0xfcf3b4);
        this.addChildToContainer(_t1);
        _t1.setPosition(titleBg.x + 44, titleBg.y + 6);
        let _t2 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText12"), 22, 0xfcf3b4);
        this.addChildToContainer(_t2);
        _t2.setPosition(titleBg.x + 174 - 25, titleBg.y + 6);
        let _t3 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText21"), 22, 0xfcf3b4);
        this.addChildToContainer(_t3);
        _t3.setPosition(titleBg.x + 399 - 115, titleBg.y + 6);
        let _t4 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText13"), 22, 0xfcf3b4);
        this.addChildToContainer(_t4);
        _t4.setPosition(titleBg.x + 399 - 20, titleBg.y + 6);


        let _msgBg = BaseLoadBitmap.create("public_9_bg1");
        this.addChildToContainer(_msgBg);
        _msgBg.width = 526;
        _msgBg.height = 108;
        _msgBg.setPosition((this.getShowWidth() - _msgBg.width) / 2, listBg1.height + 4);

        let _nickLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText14", [Api.playerVoApi.getPlayerName()]), 24, 0xfcf3b4);
        this.addChildToContainer(_nickLabel);
        _nickLabel.setPosition(_msgBg.x + 20, _msgBg.y + 26);

        let _zidLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText22", [ServerCfg.selectServer.zid]), 24, 0xfcf3b4);
        this.addChildToContainer(_zidLabel);
        _zidLabel.setPosition(_msgBg.x + 300 - 40, _msgBg.y + 26);

        let _scoreLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText15", [`${this.Vo.risePower}`]), 24, 0xfcf3b4);
        this.addChildToContainer(_scoreLabel);
        _scoreLabel.setPosition(_msgBg.x + 300 - 40, _msgBg.y + 62);

        this._rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText16", ['']), 24, 0xfcf3b4);
        this.addChildToContainer(this._rankLabel);
        this._rankLabel.setPosition(_msgBg.x + 20, _msgBg.y + 62);

        this.noRankTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText17"), 24, 0xffffff);
        this.addChildToContainer(this.noRankTip);
        this.noRankTip.width = this.getShowWidth();
        this.noRankTip.textAlign = TextFieldConst.ALIGH_CENTER;
        this.noRankTip.setPosition(0, this.getShowHeight()*0.3);
        this.noRankTip.setVisible(false);

        const list_w = 498;
        const list_h = 544;
        let reqParam = {
            requestType: NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK,
            requestParam:{
                activeId: `${this.param.data.aid}-${this.param.data.code}`,
                index: 1
            }
        }
        this._listview = ComponentManager.getRankScrollList(AcCrossRankItem, [], new egret.Rectangle(0, 0, list_w, list_h), {index: 0},reqParam);
        this.addChildToContainer(this._listview);
        this._listview.setPosition((this.getShowWidth() - list_w) / 2, 8+34);
        this._listview.setRequestIndex(1);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshList, this);
        this.Vo.getRankInfo(1);
    }

    private refreshList(e: any) {
        let _listDB: AcCrossRankItemInfo[] = [];
        let _index: number = e.data.data.data.index || 1;
        if (e.data.ret && e.data.data.data && e.data.data.data.rankArr && e.data.data.data.rankArr.map) {
            _listDB = e.data.data.data.rankArr.map((v, i) => {
                return {
                    aid: this.param.data.aid,
                    code: this.param.data.code,
                    rank: (_index - 1) * 100 + i + 1,
                    uid: v.uid,
                    nick: v.name,
                    zid: v.zid,
                    score: v.value
                }
            })
        }
        if (_index == 1 && _listDB.length == 0) {
            this._listview.visible = false;
        } else {
            this._listview.visible = true;
            this._listview.refreshRankData(_listDB, {index: _index});
        }
        this.noRankTip.setVisible(_index == 1 && _listDB.length == 0);

        let __myrank: string = LanguageManager.getlocal("acCrossOneServerText18");
        if (e.data.ret && e.data.data.data && e.data.data.data.myrankArr) {
            let _db = e.data.data.data;
            if (_db.myrankArr.myrank) {
                __myrank = ""+_db.myrankArr.myrank;
            }
        }
        this._rankLabel.text = LanguageManager.getlocal("acCrossOneServerText16", [__myrank]);
    }

    protected getTitleStr() {
        return "acCrossOneServerText3"
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
        this._rankLabel = null;
        this.noRankTip = null;

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK), this.refreshList, this);
        super.dispose()
    }
}