/*
author : jiang
date : 2018.8.28
desc : 小额礼包
*/
class AcDailyGiftView extends AcCommonView{
    public constructor(){
        super();
    }

    private bgImg:BaseLoadBitmap = null;
    private titleText: BaseTextField = null;
    private dailyGiftBtn: BaseButton = null;
    private dailyGiftText: BaseTextField = null;
    private dailyGiftRedPoint: BaseBitmap = null;
    private _scrollList:ScrollList = null;
    private _code: string = null;

    private get vo(): AcDailyGiftVo{
        return <AcDailyGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    

	// protected get code():string
	// {
    //     if(this._code == null){
    //         let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(this.aid);

    //         this._code = list[0].code.toString();
    //     }
    
    //     return this._code;

	// }
    public initView(){
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT),this.dailyGiftCallback,this);


        let bg = BaseLoadBitmap.create("acdailygiftview_bg"+this.code);
        bg.y = 69;
        bg.width = 640;
        bg.height = 298;
        this.addChildToContainer(bg);
        
        this.titleText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftTitleText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        
        this.titleText.x = 30;
        this.titleText.y =  260;
        this.titleText.lineSpacing = 5;
        this.addChildToContainer(this.titleText);
        
        this.dailyGiftBtn = ComponentManager.getButton("acdailygiftview_box",null,this.dailyGiftBtnHandler,this);
        this.dailyGiftBtn.x = 495;
        this.dailyGiftBtn.y = 265;


        this.addChildToContainer(this.dailyGiftBtn);

        this.dailyGiftText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBtnText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.dailyGiftText.x = this.dailyGiftBtn.x - 15;
        this.dailyGiftText.y = this.dailyGiftBtn.y + this.dailyGiftBtn.height - 20;
        this.addChildToContainer(this.dailyGiftText);

        let line:BaseBitmap=BaseBitmap.create("public_line");
		line.width =640;  
		line.y = bg.y + bg.height - 10;
		this.addChildToContainer(line);

        let bottom = BaseBitmap.create("adult_lowbg");
        bottom.x = GameConfig.stageWidth/2 - bottom.width / 2;
        bottom.y = GameConfig.stageHeigth - 10 - bottom.height;
        this.addChildToContainer(bottom);

        let bottomText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBottomText"),TextFieldConst.FONTSIZE_TITLE_SMALL,0xd4923e);
        bottomText.x = bottom.x + bottom.width / 2 - bottomText.width / 2;
        bottomText.y = bottom.y + bottom.height / 2 - bottomText.height / 2;
        this.addChildToContainer(bottomText);

        let border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69 - bg.height - line.height;
        border.y = line.y + line.height;
        this.addChildToContainer(border);






        let cfgObj : Config.AcCfg.DailyGiftCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        
        let dailyGiftCfg = cfgObj.dailyCost;
        let list = [];
        let dailyCostData = null;
        for (let key in dailyGiftCfg) {
            dailyCostData = dailyGiftCfg[key];
            let cfg: Config.RechargeItemCfg  = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
            list.push({code:this.code,cfg: cfg,limit: dailyCostData["limit"],rechargeId:dailyCostData["cost"],rechargeCount:this.vo.ainfo[dailyCostData["cost"]]});
        }
      
        let rect = new egret.Rectangle(0,10,GameConfig.stageWidth - 20,border.height-bottom.height -10);
        this._scrollList = ComponentManager.getScrollList(AcDailyGiftScrollItem,list,rect);
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width/2;//bottomBg.x;
        this._scrollList.y = border.y + 5;
        this.addChildToContainer(this._scrollList);

        this.updateStatus();
    }





    private dailyGiftBtnHandler()
    {
        //每日奖励

        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT,{activeId : this.aid+"-"+this.code});


    }
    private dailyGiftCallback(event):void
    {
        let data:{ret:boolean,data:any}=event.data;
    
        if(data.data.ret == 0){
            //领取成功
            let rewObj = GameData.formatRewardItem(data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
          
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_boxget");
            this.dailyGiftBtn.setEnable(false);
            return;
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
            

        }


    }
    protected receivePushData(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;

		// let data:{ret:boolean,data:any}=event.data;
		if(data.data.ret == 0 && data.data.cmd==NetPushConst.PUSH_PAY)
		{
            
          
            let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            let rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            let rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
			if(data.data.data.payment)
			{
				// let itemid=data.data.data.payment.itemId;
				// PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
			}
		}
	}

	protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    protected getRuleInfo():string
	{
		return super.getRuleInfo();
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rechargevie_db_01","itemicon1","adult_lowbg","activity_db_01"

        ]);
    } 

    protected getTitleStr():string
    {
        return this.aid + "_Title";
    }

    private updateStatus(): void{

        if (this.vo.freegift == 1){
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_box");
            this.dailyGiftBtn.setEnable(true);
            this.dailyGiftBtn.showStatusIcon("public_dot2");
        } else {
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_boxget");
            this.dailyGiftBtn.setEnable(false);
            this.dailyGiftBtn.removeStatusIcon();
        }
        if(this._scrollList != null){
            let cfgObj : Config.AcCfg.DailyGiftCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        
            let dailyGiftCfg = cfgObj.dailyCost;
            let list = [];
            let dailyCostData = null;
            for (let key in dailyGiftCfg) {
                dailyCostData = dailyGiftCfg[key];
                let cfg: Config.RechargeItemCfg  = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
                list.push({code:this.code,cfg: cfg,limit: dailyCostData["limit"],rechargeId:dailyCostData["cost"],rechargeCount:this.vo.ainfo[dailyCostData["cost"]]});
            }
            this._scrollList.refreshData(list);
        }
    }
    
    public dispose():void
	{   

        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT),this.dailyGiftCallback,this);

        this.bgImg  = null;
        this.titleText = null;
        this.dailyGiftBtn = null;
        this.dailyGiftText = null;
        this.dailyGiftRedPoint = null;
        this._scrollList = null;
        this._code = null;
        super.dispose();
    }
}