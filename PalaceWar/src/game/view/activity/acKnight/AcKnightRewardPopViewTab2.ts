/**
 * 进度奖励
 * author wxz
 * date 2020.5.14
 * @class AcKnightRewardPopViewTab2
 */
class AcKnightRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KNIGHT_GETACHIEVE, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);   

        let id = "";
        let index = -1; 
        let dataList = this.vo.getSortAchievementCfg();

        if(AcKnightView.IS_SHOW_PROCESS > 0)
        {
            let tempid = (this.vo.getAttackProcess())["id"];
            for(let i = 0; i < dataList.length; i++)
            {
                if(dataList[i].id == tempid)
                {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }        
            AcKnightView.IS_SHOW_PROCESS = 0;
        }  

        let rect =  new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcKnightRewardTab2ScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
        scrollList.setPosition(25, 60);
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

	private get cfg():Config.AcCfg.KnightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcKnightVo{
        return <AcKnightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KNIGHT_GETACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}