class AcJurakudaiChargeView  extends PopupView {
    public constructor() {
		super();
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acVo() : AcJurakudaiVo{
		return <AcJurakudaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private woodBg: BaseBitmap;
    private _timeCD : BaseTextField = null;
    
    private _listData: AcJurakudaiChargeItemParams[];
    private _listView: ScrollList;

	protected initView() {
        this.initData();
        this.container.width = 546;
        let newLine = BaseBitmap.create("popupview_bg5");
        let newRedBg = BaseBitmap.create("popupview_bg4");
        newLine.width = newRedBg.width;
        newRedBg.height = 94;
        this.addChildToContainer(newLine);
        this.addChildToContainer(newRedBg);
        newLine.setPosition((this.container.width - newLine.width)/2, 0);
        newRedBg.setPosition((this.container.width - newRedBg.width)/2, 0);

        let timeDateTxt = ComponentManager.getTextField(this.acVo.getAcLocalTime(), 18, 0xFDF3B5);
        this.addChildToContainer(timeDateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDateTxt, newRedBg, [30,20]);

        let acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acJurakudaiChargeDesc`, this.code), [""+this.acVo.rechargenum]), 18, 0xFDF3B5);
        this.addChildToContainer(acDescTxt);
        acDescTxt.lineSpacing = 5;
        acDescTxt.width = newRedBg.width - 60;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acDescTxt, timeDateTxt, [0,timeDateTxt.height+8]);

        let timeCDTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acFanliReviewReward_acCD`, [this.acVo.acCountDown]), 18, 0xFDF3B5);
        this.addChildToContainer(timeCDTxt);
        this._timeCD = timeCDTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeCDTxt, newRedBg, [30,20]);

        let [list_w, list_h] = [522, this.getShowHeight() - 200];
        this._listView = ComponentManager.getScrollList(AcJurakudaiChargeItem, this._listData, new egret.Rectangle(0, 0, list_w, list_h));
        this.addChildToContainer(this._listView);
        this._listView.setPosition((this.container.width-list_w)/2, newRedBg.y + newRedBg.height);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.refreshList,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIRECHARGEREWARD), this.onReciveRew, this);
    }

    private initData() {
        this._listData = [];
        // this.acVo.config.recharge.forEach((v, i) => {
        //     this._listData.push({
        //         aid: this.aid,
        //         code: this.code,
        //         chargeCfg: v,
        //         status: this.acVo.getRechargeStatus(v)
        //     })
        // })
        this.acVo.rechargeInfoList.forEach((v, i) => {
            this._listData[i] = {
                aid: this.aid,
                code: this.code,
                chargeCfg: v.rechargeCfg,
                status: v.status
            }
        })
    }

    private refreshList() {
        this.initData();
        this._listView.refreshData(this._listData);
    }

    private onReciveRew(e: egret.Event) {
        if (e.data.ret) {
            let _db: {rewards: string, addlottery: number} = e.data.data.data;
            let _rew = this.acVo.formatReward(_db.rewards, _db.addlottery || 0);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, _rew);
            // let rewardList = GameData.formatRewardItem(_rew);
            // App.CommonUtil.playRewardFlyAction(rewardList);
        }
    }

    protected initBg() {
        super.initBg();
        this.woodBg = BaseBitmap.create("commonview_woodbg");
        this.addChild(this.woodBg);
    }

    protected resetBgSize():void {
        super.resetBgSize();
        this.woodBg.width = this.viewBg.width - 84;
        this.woodBg.height = this.viewBg.height - 94;
        this.woodBg.setPosition(this.viewBg.x + 42, this.viewBg.y + 62);
        this.container.setPosition(this.woodBg.x, this.woodBg.y);
        let view = this;
        let uicode = view.code;
    }

    public tick():void{
        this._timeCD.text = LanguageManager.getlocal(`acFanliReviewReward_acCD`, [this.acVo.acCountDown]);
    }

    // protected isHaveTitle() {
    //     return true;
    // }

    protected getShowHeight():number{
        return 900;
    }
    
    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode(`acJurakudaiCharge`, this.code)
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "commonview_woodbg","shopview_redbg","popupview_bg5","popupview_bg4","progress_type1_yellow2", "progress_type3_bg"
		]);
    }

	public dispose():void{
        this._timeCD = null;
        this.woodBg = null;

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.refreshList,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIRECHARGEREWARD), this.onReciveRew, this);

        super.dispose();
    }
}