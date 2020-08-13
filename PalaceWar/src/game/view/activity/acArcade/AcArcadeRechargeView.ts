/**
 * 	电玩大本营充值
 * author 张朝阳
 * date 2019/6/12
 * @class AcArcadeRechargeView
 */
class AcArcadeRechargeView extends CommonView {

    private code: any = null;
    private aid: any = null;
    private _scrollList: ScrollList = null;
    public constructor() {
        super();
    }

    public initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE, this.chargeRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        let bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);

        let bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30 - 40;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);

        // let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let taskData = vo.getSortRecharge();
        // taskData.sort((a, b) => { return a.sortId - b.sortId });
        let rect = new egret.Rectangle(0, 0, 608, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcArcadeRechageScrollItem, null, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);

        let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeRechargeViewTip-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        tipTF.setPosition(bg2.x + bg2.width / 2 - tipTF.width / 2, bg2.y + bg2.height + 10);
        this.addChildToContainer(tipTF)

        this.refreashView();
    }
    /**
     * 领奖回调
     */
    private chargeRewardHandel(event: egret.Event) {
        if (event.data.ret) {
            let rewards: string = event.data.data.data.rewards;
            if (event.data.data.data.specialGift) {
                rewards = "1018_0_" + event.data.data.data.specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
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
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADEGETCHARGE, this.chargeRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        super.dispose();
    }

}