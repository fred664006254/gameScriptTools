/**
 * 活动奖励
 * author weixiaozhe
 * date 2020.5.8
 * @class AcChessRewardPopViewTab1
 */
class AcChessRewardPopViewTab1 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETRECHARGE, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);     

        let dataList = this.vo.getSortRechargeCfg();
        let id = "";   
        let index = -1;
        if(AcChessView.IS_SHOW_RECHARGE)
        {
            AcChessView.IS_SHOW_RECHARGE = false;
            for(let i = 0; i < dataList.length; i++)
            {
                let strArr:string[] = dataList[i].getReward.split("|");
                for(let j = 0; j < strArr.length; j++)
                {
                    if(strArr[j].split("_")[1] == String(this.cfg.show2))
                    {
                        id = dataList[i].id;
                        index = i;
                        break;
                    }
                }
            }        
        }

        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let scrollList = ComponentManager.getScrollList(AcChessRewardTab1ScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if(index >= 0)
        {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let replacerewards = rData.replacerewards;
        if (replacerewards) 
        {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }        
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
    }

	private get cfg():Config.AcCfg.FindSameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcFindSameVo{
        return <AcFindSameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETRECHARGE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}