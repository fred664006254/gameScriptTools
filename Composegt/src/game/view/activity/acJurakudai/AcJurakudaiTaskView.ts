class AcJurakudaiTaskView  extends PopupView{
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

    private _listData: AcJurakudaiTaskItemParams[] = [];
    private _listView: ScrollList;

    protected initView() {
        this.initData();

        this.container.width = 546;
        let [list_w, list_h] = [522, this.getShowHeight() - 124];
        this._listView = ComponentManager.getScrollList(AcJurakudaiTaskItem, this._listData, new egret.Rectangle(0, 0, list_w, list_h));
        this.addChildToContainer(this._listView);
        this._listView.setPosition((this.container.width-this._listView.width)/2, 10);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.refreshList,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAITASKREWARD), this.onReciveRew, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_JURAKUDAI_GOTOMAIN, this.hide, this);
    }

    private initData() {
        this._listData = [];
        this.acVo.taskInfoList.forEach((v, i) => {
            this._listData[i] = {
                aid: this.aid,
                code: this.code,
                taskCfg: v.taskCfg,
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

    protected getShowHeight():number{
        return 900;
    }
    
    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode(`acJurakudaiTask`, this.code);
    }
    
    protected resetBgSize():void {
        super.resetBgSize();
        this.woodBg.width = this.viewBg.width - 84;
        this.woodBg.height = this.viewBg.height - 94;
        this.woodBg.setPosition(this.viewBg.x + 42, this.viewBg.y + 62);
        this.container.setPosition(this.woodBg.x, this.woodBg.y);
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "commonview_woodbg","shopview_redbg","progress_type1_yellow2", "progress_type3_bg"
		]);
    }

	public dispose():void{
        this.woodBg = null;

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_JURAKUDAI_REFRESHVO, this.refreshList,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAITASKREWARD), this.onReciveRew, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_JURAKUDAI_GOTOMAIN, this.hide, this);
        super.dispose();
    }
}