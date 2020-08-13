/**
 * 进度奖励
 * author wxz
 * date 2020.6.15
 * @class AcSkySoundRewardPopViewTab2
 */
class AcSkySoundRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
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
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_GETSOUNDNUM, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);   

        let id = "";
        let index = -1; 

        let dataList = this.vo.getSortAchievementCfg();
        if(AcSkySoundView.IS_SHOW_PROCESS >= 0)
        {
            for(let i = 0; i < dataList.length; i++)
            {
                if(dataList[i].id == AcSkySoundView.IS_SHOW_PROCESS)
                {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }            
            AcSkySoundView.IS_SHOW_PROCESS = -1;
        }  

        let rect =  new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcSkySoundRewardTab2ScrollItem, dataList, rect, {id:id,aid:this.aid, code:this.code});
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

        let num = this.vo.getAchRewardNum();
        this.showAchDialog(num+"");

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
    private showAchDialog(vid:string):void
    {
        let view = this;
        let keyStr = "achDialog_"+this.typeCode;
        let startCfg = view.cfg[keyStr];
        let bgName = "story_bg6";
        if(startCfg[vid])
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
            {
                aid : view.aid,
                code : ""+view.typeCode,
                AVGDialog : startCfg,
                visitId : vid,
                talkKey: "acSkySoundAchTalk_",
                bgName: bgName,
                callBack:null
            });
        }
    }  
	private get cfg():Config.AcCfg.SkySoundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_GETSOUNDNUM, this.requestCallback, this);
        this._scrollList = null;
        super.dispose();
     }
}