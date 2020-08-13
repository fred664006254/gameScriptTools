/**
 * 进度奖励
 * author wxz
 * date 2020.6.29
 * @class AcMouseGoldRewardPopViewTab2
 */
class AcMouseGoldRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }
    private get typeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETACHIEVEMENT, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);   

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
        let scrollList = ComponentManager.getScrollList(AcMouseGoldRewardTab2ScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
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

	private get cfg():Config.AcCfg.SkyArmorCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSkyArmorVo{
        return <AcSkyArmorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_GETACHIEVEMENT, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}