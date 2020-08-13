/**
 * 求签问卜--进度奖励
 * author wxz
 * date 2020.7.20
 * @class AcAskGodAchRewardPopView
 */
class AcAskGodAchRewardPopView extends PopupView{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
    }
    private get code():string{
        return this.param.data.code;
    }
    private get typeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
    private get aid():string{
        return this.param.data.aid;
    }
    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACASKGOD_GETNIGHTNUM, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(55, 10);
        this.addChildToContainer(rewardBg);   

        let id = "";
        let index = -1; 

        let dataList = this.vo.getSortAchievementCfg();
        if(this.param.data.id)
        {
            for(let i = 0; i < dataList.length; i++)
            {
                if(dataList[i].id == this.param.data.id)
                {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }            
        } 

        let rect =  new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcAskGodAchRewardScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
        scrollList.setPosition(55, 15);
        this.addChildToContainer(scrollList);
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
	private get cfg():Config.AcCfg.AskGodCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcAskGodVo{
        return <AcAskGodVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	protected getShowHeight():number
	{
		return 800;
    }
    protected resetBgSize():void
    {
        super.resetBgSize();
        this.container.x = 0;
    }
	protected getTitleStr():string
	{
		return "acAskGodAchievementTitle-"+this.typeCode;
	}    
    public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACASKGOD_GETNIGHTNUM, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}