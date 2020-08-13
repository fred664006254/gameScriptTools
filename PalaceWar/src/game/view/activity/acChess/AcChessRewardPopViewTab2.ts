/**
 * 进度奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardTab1ScrollItem
 */
class AcChessRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);   

        let id = "";
        let index = -1; 

        let dataList = this.vo.getSortAchievementCfg();

        if(AcChessView.IS_SHOW_PROCESS > 0)
        {
            for(let i = 0; i < dataList.length; i++)
            {
                if(dataList[i].id == AcChessView.IS_SHOW_PROCESS)
                {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }        
            AcChessView.IS_SHOW_PROCESS = 0;
        }  

        let rect =  new egret.Rectangle(0, 0, 530, 670);
        let scrollList = ComponentManager.getScrollList(AcChessRewardTab2ScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
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
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }        
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortAchievementCfg();
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
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}