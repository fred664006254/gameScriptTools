/**
 * 充值奖励
 * author ycg
 * date 2020.3.24
 */
class AcChaoTingViewTab2 extends AcCommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        let baseView = <AcChaoTingView>ViewController.getInstance().getView("AcChaoTingView");
        let showHeight = baseView.getListShowHeight();

        let data = this.vo.getSortRechargeCfg();
        App.LogUtil.log("tab1 "+showHeight+ " dataleng "+data.length);
        let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, showHeight - 10);
        let scrollList = ComponentManager.getScrollList(AcChaoTingViewTabScrollItem2, data, rect, {aid: this.aid, code: this.code});
        scrollList.setPosition(GameConfig.stageWidth/2 - scrollList.width/2, 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private getRewardCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "otherRewards":rData.otherrewards, "isPlayAni":true});
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView(evt:egret.Event):void{
        let data = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(data, {aid: this.aid, code: this.code});
    }

    private getTypeCode():string{
        return this.code;
    }

    private get vo():AcChaoTingVo{
        return <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.ChaoTingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACCHAOTING_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        super.dispose();
    }
}