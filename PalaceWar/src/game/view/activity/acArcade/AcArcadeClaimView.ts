/**
 * 	电玩大本营任务
 * author 张朝阳
 * date 2019/6/12
 * @class AcArcadeTaskView
 */
class AcArcadeClaimView extends CommonView {

    private code: any = null;
    private aid: any = null;
    private _scrollList: ScrollList = null;
    private _myScoreTF: BaseTextField = null;
    public constructor() {
        super();
    }

    public initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, this.christmasTaskRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

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
        let taskData = cfg.claimListItemCfg;

        // taskData.sort((a, b) => { return a.sortId - b.sortId });

        let rect = new egret.Rectangle(0, 0, 608, bg2.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcArcadeClaimScrollItem, taskData, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);

        let myScore = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewMyScore-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        myScore.setPosition(bg.x + 30, bg2.y + bg2.height + 20 - myScore.height / 2);
        this.addChildToContainer(myScore)

        let moonCoin = BaseBitmap.create("acarcadeview_mooncoin-" + this.getUiCode());
        moonCoin.setPosition(myScore.x + myScore.width, myScore.y + myScore.height / 2 - moonCoin.height / 2);
        this.addChildToContainer(moonCoin)

        this._myScoreTF = ComponentManager.getTextField("X" + vo.getScore(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._myScoreTF.setPosition(moonCoin.x + moonCoin.width, moonCoin.y + moonCoin.height / 2 - this._myScoreTF.height / 2);
        this.addChildToContainer(this._myScoreTF);

        let tip = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeClaimViewTipDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tip.setPosition(bg.x + bg.width - tip.width - 30, myScore.y + myScore.height / 2 - tip.height / 2);
        this.addChildToContainer(tip);

    }
    /**
     * 领奖回调
     */
    private christmasTaskRewardHandel(event: egret.Event) {
        if (event.data.ret) {
            let rewards = event.data.data.data.rewards;
            let rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
        }
    }
    private refreashView() {
        let vo = <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let taskData = cfg.claimListItemCfg;
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
        this._myScoreTF.text = "X" + vo.getScore();
    }
    protected getTitleStr(): string {
        return "acArcadeClaimViewTitle-" + this.param.data.code;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "acarcadeview_mooncoin-" + this.param.data.code
        ]);
    }
    protected getUiCode(): string {
        if (this.param.data.code == "2") {
            return "1";
        }
        return this.param.data.code;
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ARCADESHOPBUY, this.christmasTaskRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        super.dispose();
    }

}