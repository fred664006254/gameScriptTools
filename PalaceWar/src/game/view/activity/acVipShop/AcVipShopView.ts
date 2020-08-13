/**
 * 神秘商店
 */
class AcVipShopView extends AcCommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _activityDurTxt:BaseTextField; 
	private gemTF:BaseTextField = null;
    private _currVipLevel:number =0;
    private _nextVipLevel:number =0;
    private _storeDesTxt:BaseTextField =null; 
    private _itemArr:Array<any>=[];
    private _cfgObj=null;
    private _scrollList:ScrollList=null;
	private _activityTimerText: BaseTextField = null;
    private _acvipshopvipText: BaseTextField = null;
    private _vipImg:BaseLoadBitmap =null;
    // public static AID:string=null;
    // public static CODE:string =null;
    private lastType:number=0;
    
    public constructor() {
		super();
	}
   	 
	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_BUYVIPSHOP), this.buyCallback, this);
	
        // AcVipShopView.AID =this.aid;
        // AcVipShopView.CODE =this.code;
        
        this._currVipLevel = Api.playerVoApi.getPlayerVipLevel();
        this._nextVipLevel = Api.playerVoApi.getPlayerNextVipLevel();
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.checkRedpoints,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.checkRedpoints,this);
       
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        
        let blue_bottom:BaseBitmap = BaseBitmap.create("acvipshopview_bluebottom");
        blue_bottom.width=640;
        blue_bottom.height=500;
        blue_bottom.y=800;//GameConfig.stageHeigth-90;
		this._nodeContainer.addChild(blue_bottom);

        let topBg:BaseBitmap = BaseLoadBitmap.create("activity_vipshop_topbg"+this.code);
        topBg.width = 640;
        topBg.height=246;//GameConfig.stageWidth+18;
        topBg.y = -13;
		this._nodeContainer.addChild(topBg);

        // 人物对话底框
        let speakBg:BaseBitmap = BaseBitmap.create("public_9_bg25");
        speakBg.width=380;
        speakBg.height=90;
		this._nodeContainer.addChild(speakBg);
        speakBg.x=250;
        speakBg.y=60;
        
        let speakBg_horn:BaseBitmap = BaseBitmap.create("acvipshopview_horn");
		this._nodeContainer.addChild(speakBg_horn);
        speakBg_horn.x=speakBg.x-20;
        speakBg_horn.y=speakBg.y+speakBg.height/2-speakBg_horn.height/2-20;


        let speakText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        let str2 = LanguageManager.getlocal("vipspeakdes");
        speakText.text=str2;
        speakText.width=speakBg.width-30;
        speakText.x =speakBg.x+15;
        speakText.y =speakBg.y+18;
        speakText.lineSpacing =3;
        this._nodeContainer.addChild(speakText);  

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - topBg.height - topBg.y -this.container.y+5-60;
        bottomBg.x = -8;

        bottomBg.y = topBg.height + topBg.y;
		this._nodeContainer.addChild(bottomBg);
    	//活动时间   
		this._activityTimerText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._activityTimerText.x = 240
		this._activityTimerText.y = 205; 
        this._activityTimerText.width = 390;
        this._activityTimerText.textAlign =TextFieldConst.ALIGH_CENTER;
		this._activityTimerText.text = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);
        
        let tabName = [];
        let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.height-130);
        let tabY = bottomBg.y + 24;
        let tabX = 15;

        this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        if(this._cfgObj)
        {
            this._itemArr = this._cfgObj.getList(1);
            tabName.push("acvip_tab1");
            tabName.push("acvip_tab2");
            tabName.push("acvip_tab3");

            let scrollList = ComponentManager.getScrollList(AcVipShopViewScrollItem,this._itemArr,tmpRect,this.code);
            scrollList.y = tabY+170;
            scrollList.x = 25;
            this._scrollList =scrollList;     
            this.addChild(scrollList);
        } 

        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = tabX;
        tabbarGroup.y = tabY;
        this._nodeContainer.addChild(tabbarGroup);


        //当前vip等级
        let acvipshopvipText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        let str = LanguageManager.getlocal("vipshopcurrvipdes");
        acvipshopvipText.text=str;
        acvipshopvipText.x=430;
        acvipshopvipText.y = bottomBg.y+bottomBg.height+12;
        this.addChildToContainer(acvipshopvipText);
        this._acvipshopvipText = acvipshopvipText;
        if(this._currVipLevel>0)
        {   
            let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._currVipLevel).icon);
            this.addChildToContainer(vipImg);
            vipImg.x= acvipshopvipText.x+acvipshopvipText.width;
            vipImg.y =acvipshopvipText.y-5;
            vipImg.bindData = Api.vipVoApi.getVipCfgByLevel(this._currVipLevel).icon;
            this._vipImg =vipImg;
        }
        else if(this._currVipLevel==0)
        {
            acvipshopvipText.text=str+":无";
        }
    
        //金币显示
        let temW = 38;
		let servantNumBg = BaseBitmap.create("servant_topnumbg");
		servantNumBg.x = 8;
		servantNumBg.y = acvipshopvipText.y+102;
		this.addChild(servantNumBg);

        let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.scaleX = temW/gemIcon.width;
		gemIcon.scaleY = temW/gemIcon.height;
		gemIcon.x = 15;
		gemIcon.y = acvipshopvipText.y+100;
		this.addChild(gemIcon);

		this.gemTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_TITLE_SMALL);
		this.gemTF.x = gemIcon.x + temW + 5;
		this.gemTF.y = gemIcon.y+5;
		this.addChild(this.gemTF); 

		let goToRechargeBtn:BaseButton = ComponentManager.getButton("mainui_btn1","",this.goToRechargeHandler,this);
		goToRechargeBtn.setScale(0.85);
		goToRechargeBtn.x = servantNumBg.width-5;
		goToRechargeBtn.y = servantNumBg.y;
		this.addChild(goToRechargeBtn);

    }
    private buyCallback(evt:egret.Event):void
    {
    
        this.gemTF.text =Api.playerVoApi.getPlayerGemStr();
        if(evt.data.ret==true)
        {
            if(evt.data&&evt.data.data&&evt.data.data.data.rewards)
            {
                App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
            } 
            if(this.lastType==0)
            {
                this.lastType=1;
            } 
            this._itemArr = this._cfgObj.getList(this.lastType);
            this._scrollList.refreshData(this._itemArr,this.code);
            this._scrollList.setPosition(25,427); 
        }
    }

    protected tabBtnClickHandler(params:any)
    {
         this._itemArr =[];
         let idx = params.index;
         this.lastType= idx+1; 
         
         this._itemArr = this._cfgObj.getList(idx+1);
         this._scrollList.refreshData(this._itemArr,this.code);
         this._scrollList.setPosition(25,427); 
    } 
    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "acvipshopview_red",
            "acvipshopview_horn","servant_bottombg","acvipshopview_bluebottom",
            "servant_topnumbg",
         ]);
	}
    private checkRedpoints()
    {
        this._currVipLevel = Api.playerVoApi.getPlayerVipLevel();
        if(this._currVipLevel>0&&this._vipImg)
        {
             var currLevip:any =Api.vipVoApi.getVipCfgByLevel(this._currVipLevel).icon;
             this._vipImg.setload(currLevip);
             let str = LanguageManager.getlocal("vipshopcurrvipdes");
             this._acvipshopvipText.text =str; 
        }
        else if(this._currVipLevel>0)
        {   
            let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._currVipLevel).icon);
            this.addChildToContainer(vipImg);
            vipImg.x= this._acvipshopvipText.x+this._acvipshopvipText.width-23;
            vipImg.y =this._acvipshopvipText.y-5;
            this._vipImg =vipImg;
            let str = LanguageManager.getlocal("vipshopcurrvipdes");
            this._acvipshopvipText.text =str;  
        }
     

        
         var currLevip:any =Api.vipVoApi.getVipCfgByLevel(this._currVipLevel).icon;
         if(this._vipImg&&this._vipImg.bindData!=currLevip)
         {

            this._vipImg.bindData =currLevip; 
            if(this.lastType==0)
            {
                this.lastType=1;
            } 

            this._itemArr = this._cfgObj.getList(this.lastType);
            this._scrollList.refreshData(this._itemArr,this.code);
            this._scrollList.setPosition(25,427); 

            if( this.gemTF)
            {
                this.gemTF.text =Api.playerVoApi.getPlayerGem().toString();
            } 
         }
        // for (var index = 0; index < this._redImgList.length; index++) {
        //     var redImg:BaseBitmap = this._redImgList[index];
        //     let name = redImg.name ;
        //     let tmpStr = name.split("_");
        //     let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(tmpStr[0],tmpStr[1]);
        //     if (tmpVo.isShowRedDot) {
        //         redImg.visible = true;
        //     }else{
        //         redImg.visible = false;
        //     }
        // }
    }

	public dispose():void
	{
        //  App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.checkRedpoints,this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.checkRedpoints,this);
        this._nodeContainer = null;
        // AcVipShopView.AID=null;
        // AcVipShopView.CODE=null;
        this._activityDurTxt = null;
        this._storeDesTxt = null;       
        this.lastType =0;
        this._activityTimerText =null;
        this._vipImg =null;
        super.dispose();
    }
}