/**
 * 任务奖励
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab3
 */
class AcKiteDetailPopupViewTab3 extends CommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACKITE_GETTASKREWARD, this.requestCallback, this);
        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);
        let dataList = this.vo.getSortTask();
        let rect = new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcKiteDetailPopupViewTab3ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        let rewards = rData.rewards;
        if (rData.specialGift) {
			rewards = "1052_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rData.rewards;
		}
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
        let dataList = this.vo.getSortTask();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get cfg() : Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcKiteVo{
        return <AcKiteVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACKITE_GETTASKREWARD, view.requestCallback, view);
        view._scrollList = null;

        super.dispose();
    }
}