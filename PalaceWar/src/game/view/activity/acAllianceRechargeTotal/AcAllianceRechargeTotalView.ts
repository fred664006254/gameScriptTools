/**
 * 帮会充值活动  (累计充值)
 * date 2018/10/17
 * @class AcAllianceRechargeTotalView
 */
class AcAllianceRechargeTotalView extends AcCommonView
{
    private _scrollList:ScrollList = null; 
    private _rewardTime: BaseTextField = null;
    private _activityTimerText: BaseTextField = null;
    private _activityDes: BaseTextField = null;
    private _acCDTxt: BaseTextField = null;
    private _activityDes2: BaseTextField = null;
    private _chrargeType:number =0;
    
        

    public constructor()
    {
        super();
    } 

    private _titleBg: BaseLoadBitmap = null;  
    private get cfg() : Config.AcCfg.AllianceRechargeTotalCfg
    {   
        let currCode =this.param.data.code;
        if(!currCode)
        {
           currCode = this.code;
        }
         
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, currCode);
    }

    protected  getUiCode():string
	{
        let currCode =this.param.data.code
        if(!currCode)
        {
           currCode = this.code;
        }
        return currCode;
	}

    protected get acVo():AcAllianceRechargeTotalVo
	{
        let currCode =this.param.data.code;
        if(!currCode)
        {
           currCode = this.code;
        }
		return <AcAllianceRechargeTotalVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,currCode);
	}

    protected getTitleStr():string
	{   
        let str = this.aid+"-"+this.getUiCode();
		return "ac"+App.StringUtil.firstCharToUper(str)+"_Title";
	}

    protected getRuleInfo():string{

		return "acAllianceRechargeTotalViewRuleInfo-"+this.getUiCode();
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALINFO,requestData:{activeId: this.aid+"-"+this.getUiCode()}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret)
        { 
            // console.log(data.ret); 
        } 
	}

    public initView()
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2,this.refreshBtnStatus,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALREWARD),this.getRewardCallBack,this);
        this._titleBg = BaseLoadBitmap.create("acallianrechargetitlebg_1"); 
        this._titleBg.name = "titleBg";
        this._titleBg.width = 640;
        this._titleBg.height = 254;
        this._titleBg.x = GameConfig.stageWidth/2 - this._titleBg.width/2;
        this._titleBg.y = -15; 
        this.addChildToContainer(this._titleBg); 

        // 活动时间
        this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`acAllianceTime`,[this.acVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x =130;
        this._activityTimerText.y = 285;
        this.addChild(this._activityTimerText);

  
      	//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("acAlliance_acCD", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xff0000);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = 210; 
		acCDTxt.y = 287+32; 
		this.addChild(acCDTxt);
		this._acCDTxt = acCDTxt; 
        this.tick();


        // 内容描述
        this._activityDes = ComponentManager.getTextField(LanguageManager.getlocal("acAlliancetotal-"+this.getUiCode()+"-describe"), 22,TextFieldConst.COLOR_BROWN);
        this._activityDes.width= 560;
        this._activityDes.height= 85;
        this._activityDes.x =40
        this._activityDes.y = 145;
        this.addChild(this._activityDes); 

       this.refreshBtnStatus();

        // 内容描述2
        this._activityDes2 = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceTotalBuyDes"+this.getUiCode()+"_"+this._chrargeType), 22,TextFieldConst.COLOR_BROWN);
        this._activityDes2.width= 560;
        this._activityDes2.height= 25;
        this._activityDes2.x =GameConfig.stageWidth/2-this._activityDes2.width/2;
        this._activityDes2.textAlign =TextFieldConst.ALIGH_CENTER;
        this._activityDes2.y =250;//  this._activityDes.y+this._activityDes.height;
        this.addChild(this._activityDes2); 
       


        let border = BaseBitmap.create("public_9_bg22");
        border.width = GameConfig.stageWidth;
        border.x = 0;
        border.y = 355-41+32;
        border.height = GameConfig.stageHeigth - border.y -80+41-32;
        this.addChild(border);

        let bg5:BaseBitmap = BaseBitmap.create("public_9_bg32");
		bg5.y = border.y + 20;
		bg5.x = 13;
		bg5.width = 615;
		bg5.height = border.height-30;
		this.addChild(bg5);

        let tmpRect = null;
        let keys = [];
        for(let i in this.cfg.countReward){
            let unit = this.cfg.countReward[i];
            let needid = Number(unit.need);
            if(needid){
                if(this.acVo.getChargeNum() >= this.cfg.countReward[needid - 1].total){
                    keys.push(unit);
                }
            }
            else{
                keys.push(unit);
            }
        }
       
        tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth,bg5.height - 10);
        let scrollList = ComponentManager.getScrollList(AcAllianceRechargeTotalScrollItem,keys,tmpRect, this.getUiCode());
        scrollList.setPosition(16,bg5.y+6);  
		this.addChild(scrollList);
		this._scrollList = scrollList; 
      

        let downBottom:BaseBitmap = BaseBitmap.create("arena_bottom");
		downBottom.y =GameConfig.stageHeigth-downBottom.height;
		downBottom.x = 0;  
		this.addChild(downBottom);

        let RecordBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"alliance_record",this.eventCollectHandler ,this);        
        RecordBtn.x = downBottom.width/2-RecordBtn.width/2;
        RecordBtn.y = downBottom.y+downBottom.height/2-RecordBtn.height/2;
        this.addChild(RecordBtn);


        if(Api.playerVoApi.getPlayerAllianceId() == 0)
        {   
            this.drawblackMask(); 
		} 
 
    }

    protected refreshBtnStatus()
    {   
        if(this.acVo.getRechargeFlag()==1)
        {
            this._chrargeType = 2;
        }
        else
        {
            this._chrargeType = 1;
        }
        if( this._activityDes2)
        {
            this._activityDes2.text =  LanguageManager.getlocal("acAllianceTotalBuyDes"+this.getUiCode()+"_"+this._chrargeType);
        }
      
     }


    private drawblackMask():void
    {
        let _maskBmp = BaseBitmap.create("public_9_viewmask");
		_maskBmp.width=GameConfig.stageWidth;
		_maskBmp.height=GameConfig.stageHeigth;
		_maskBmp.touchEnabled = true;
        _maskBmp.y =315+32;
		this.addChild(_maskBmp); 


        //tip
        let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
        tipBg.name="tipBg";
        tipBg.x= 0;
        tipBg.y =500;
        this.addChild(tipBg);

        var message = LanguageManager.getlocal("AllianceRechargtip"); 
        let msgText:BaseTextField=ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_TITLE_SMALL);
        msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
        msgText.textAlign=egret.HorizontalAlign.CENTER;
        msgText.name="msgText";
        msgText.lineSpacing=2; 
        this.addChild(msgText);
 
        //按钮
        let imgBg = BaseBitmap.create("alliance_iconbg");
        imgBg.setPosition(GameConfig.stageWidth/2-imgBg.width/2,tipBg.y+tipBg.height+50);
        this.addChild(imgBg);

        let imgBtn = ComponentManager.getButton("alliance_memicon", "", this.bottomBtnClickHandler, this);
        imgBtn.setPosition(imgBg.x + imgBg.width / 2 - imgBtn.width / 2 - 5, imgBg.y + imgBg.height / 2 - imgBtn.height / 2);
        this.addChild(imgBtn);

        let imgName = BaseBitmap.create("serarchaliance");
        imgName.setPosition(imgBg.x + imgBg.width / 2 - imgName.width / 2, imgBg.y + imgBg.height - imgName.height);
        this.addChild(imgName);


        let openType ="alliance"; 
        let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
        if(!isShowNpc)
        {
            let lockedStr:string= LanguageManager.getlocal("allianUnluckDes");//Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
            msgText.text =lockedStr;
            msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
            msgText.textAlign=egret.HorizontalAlign.CENTER;
            imgBg.visible =false;
            imgBtn.visible =false;
            imgName.visible =false;
        } 
    }
    private bottomBtnClickHandler():void
    {   
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
    }

    private eventCollectHandler():void
    { 
        ViewController.getInstance().openView(ViewConst.POPUP.ACALLIACEToTalRANKLISTPOPUPVIEW,{
            aid:this.aid,   
            code:this.getUiCode(),  
        });
    }

   
    
    public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime - 86400 * 1;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
		}
		return false;
    }
    
    public getRewardCallBack(event : egret.Event):void{
        let view = this;
        
        if(!event.data.ret){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        let rData = event.data.data.data;
        if(rData.getFailFlag==1){
            App.CommonUtil.showTip(LanguageManager.getlocal("acallianceRechErr"));
            return;
        }
        let rewards = rData.rewards;
        let item = <AcAllianceRechargeTotalScrollItem>this._scrollList.getItemByIndex(this.acVo.index);
        if(item){
            item.refreshView(rewards);
        }

        let keys = [];
        for(let i in this.cfg.countReward){
            let unit = this.cfg.countReward[i];
            let needid = Number(unit.need);
            if(needid){
                if(this.acVo.getChargeNum() >= this.cfg.countReward[needid - 1].total){
                    keys.push(unit);
                }
            }
            else{
                keys.push(unit);
            }
        }
        this._scrollList.refreshData(keys, this.getUiCode());
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
           "alliance_iconbg",
           "alliance_memicon",
           "serarchaliance",
           "progress7",
           "progress7_bg",
           "acmidautumnview_titlebg",
           "arena_bottom"
        ]);
    }  
    
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2,this.refreshBtnStatus,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALREWARD),this.getRewardCallBack,this);
        this._activityDes2= null;
        this._scrollList =null;
        this._rewardTime =null;
        this._activityTimerText =null;
        this._activityDes =null;
        this._acCDTxt =null; 
        super.dispose();
    }

    
}