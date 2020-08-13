/**
 * 搜查魏府	充值
 * author 张朝阳
 * date 2019/6/24
 * @class AcSearchProofRechargePopupView
 */
class AcSearchProofRechargePopupView extends PopupView {

    private code: any = null;
    private aid: any = null;
    private _scrollList: ScrollList = null;
    public constructor() {
        super();
    }

    public initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETPROOFCHARGE, this.chargeRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        bg.height = 700;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);

        // let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let taskData = vo.getSortRecharge();
        // taskData.sort((a, b) => { return a.sortId - b.sortId });
        let rect = new egret.Rectangle(0, 0, 520, bg.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcSearchProofRechargeScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg.x + bg.width / 2 - this._scrollList.width / 2, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        this.refreashView();
    }
    /**
     * 领奖回调
     */
    private chargeRewardHandel(event: egret.Event) {
        if (event.data.ret) {
            let rewards: string = event.data.data.data.rewards;
            if (event.data.data.data.special) {
                rewards = "1021_0_" + event.data.data.data.special + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
            }
            let replacerewards = event.data.data.data.replacerewards;
            let rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: replacerewards });
            }
            this.refreashView()
        }
    }
    private refreashView() {
        let vo = <AcSearchProofVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let taskData = vo.getSortRecharge();
        taskData.sort((a, b) => { return a.sortId - b.sortId });
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
    }
    protected getTitleStr(): string {
        return "acArcadeRechargeViewTitle-" + this.param.data.code;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green"
        ]);
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETPROOFCHARGE, this.chargeRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        super.dispose();
    }

}