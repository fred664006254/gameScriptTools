/**
 * 任务奖励
 * author wxz
 * date 2020.5.8
 * @class AcChessRewardPopViewTab
 */
class AcChessRewardPopViewTab3 extends AcCommonViewTab
{
    public _scrollList:ScrollList = null;
    private _aidAndCode: { "aid": string; "code": string} = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETTASK, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);  

        let dataList = this.vo.getSortTaskCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let len = dataList.length;
        let scrollList = ComponentManager.getScrollList(AcChessRewardTab3ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(25, 65);
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
		if (rData.specialGift) {
			rewards = "1056_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rData.rewards;
		}        
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
    }
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

	private get cfg():Config.AcCfg.ChessCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcChessVo{
        return <AcChessVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETTASK, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}

