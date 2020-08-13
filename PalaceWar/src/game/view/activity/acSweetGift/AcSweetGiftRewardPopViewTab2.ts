/**
 * 任务奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardTab1ScrollItem
 */
class AcSweetGiftRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETTASK, this.requestCallback, this);
        this.height = 670;
		this.width = 520;
        let dataList = this.vo.getSortTaskCfg();
        let rect =  new egret.Rectangle(0, 0, 520, 670);
        let scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab2ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(30+1, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

	private get cfg():Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETTASK, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}