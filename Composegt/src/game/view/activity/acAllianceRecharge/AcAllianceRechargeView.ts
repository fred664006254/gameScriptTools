/**
 * 帮会充值活动
 * date 2019/2/11
 * @class AcAllianceRechargeView
 */
class AcAllianceRechargeView extends AcCommonView
{
    private _scrollList:ScrollList = null; 
    private _rewardTime: BaseTextField = null;
    private _activityTimerText: BaseTextField = null;
    // private _activityDes: BaseTextField = null;
    private _acCDTxt: BaseTextField = null;
    // private _activityDes2: BaseTextField = null;
    private _chrargeType:number =0;
    
    private _downBottom:BaseBitmap = null;
    private _moreArrow:BaseBitmap = null;
    private touchBoo:boolean =true;
    private _isShowMore:boolean = false;
    private moveContainer:BaseDisplayObjectContainer =null;
    private _touchBg:BaseBitmap =null;
    private moreBg:BaseBitmap =null;
    private _currMaskBmp:BaseBitmap =null;
    // private bottom:BaseBitmap =null;
    private moreData:any = null;

    private totalText:BaseTextField = null;
    private countText:BaseTextField = null;

    private dataList = null;
    private _dataScrollList:ScrollList = null;
    private _emptyText: BaseTextField = null;
    public constructor()
    {
        super();
    } 

    private _titleBg: BaseLoadBitmap = null;  
 
    private get cfg() : Config.AcCfg.AllianceRechargeCfg
    {   
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }


	protected get acVo():AcAllianceRechargeVo
	{
		return <AcAllianceRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
    protected getTitleStr():string
	{   
        let str = this.aid+"-"+this.code;
		return "ac"+App.StringUtil.firstCharToUper(str)+"_Title";
	}


    protected getRequestData() :{requestType:string,requestData:any}
	{	
        
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEINFO,requestData:{activeId:this.aid+"-"+this.code}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret)
        { 
            
            this.dataList = data.data.data.chargeList;
        } 
	}

    public initView()
    {
        // this.dataList = [];
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO,this.refreshBtnStatus,this);


        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEINFO),this.refreshRankList,this);

        if(ResourceManager.hasRes("acalliancerecharge_titlebg"+this.code)){
            this._titleBg = BaseLoadBitmap.create("acalliancerecharge_titlebg"+this.code); 
        } else {
            this._titleBg = BaseLoadBitmap.create("acalliancerecharge_titlebg1"); 
        }
        
        this._titleBg.name = "titleBg";
        this._titleBg.width = 628;
        this._titleBg.height = 254;
        this._titleBg.x = GameConfig.stageWidth/2 - this._titleBg.width/2;
        this._titleBg.y = 69; 
        this.addChildToContainer(this._titleBg); 

        // 活动时间
        // this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeTime",[this.acVo.acTimeAndHour]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._activityTimerText.x =130;
        // this._activityTimerText.y = 285;
        // this.addChild(this._activityTimerText);

  
        let deltaT = this.acVo.et - GameData.serverTime - 86400 * 1;
        let timeStr = "";
		if (deltaT > 0) {
			timeStr = LanguageManager.getlocal("acAllianceRechargeAcCD", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
			
		} else {
			timeStr = LanguageManager.getlocal("acAllianceRechargeAcCD", [LanguageManager.getlocal("acAllianceRechargeAcCDEnd")]);
		}

      	//倒计时文本 
		let acCDTxt = ComponentManager.getTextField(timeStr, 18, 0xfff9dc);
        acCDTxt.x = GameConfig.stageWidth/2 - acCDTxt.width/2; 
		acCDTxt.y = 274; 
		this.addChild(acCDTxt);
		this._acCDTxt = acCDTxt; 


 
        let activityDes = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeDescribe_1"), 20,0x5e3003);
        // 内容描述
        activityDes.width= 560;
        activityDes.height= 85;
        activityDes.textAlign = "center";
        activityDes.lineSpacing = 2;
        activityDes.x = GameConfig.stageWidth/2 - activityDes.width/2;
        activityDes.y = 145;
        this.addChild(activityDes); 

  

        // 内容描述2
        let activityDes2 = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeWarn"), 20,0xa70500);
        activityDes2.width= 560;
        activityDes2.height= 25;
        activityDes2.x =GameConfig.stageWidth/2-activityDes2.width/2;
        activityDes2.textAlign =TextFieldConst.ALIGH_CENTER;
        activityDes2.y =  240;
        this.addChild(activityDes2); 
       


        let border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.x = 0;
        border.y = 69;
        border.height = GameConfig.stageHeigth - 69 ;
        

        let tmpRect = null;

        let rewardList = this.cfg.getRewardList();

        tmpRect = new egret.Rectangle(0,0,GameConfig.stageWidth,border.height -254 - 87);
        let scrollList = ComponentManager.getScrollList(AcAllianceRechargeScrollItem,rewardList,tmpRect, {aid:this.aid,code:this.code});
        scrollList.setPosition(16,69 + 254 + 8);  
		this.addChild(scrollList);
		this._scrollList = scrollList; 


        this._downBottom = BaseBitmap.create("arena_bottom");
        this._downBottom.height = 70;
		this._downBottom.y =GameConfig.stageHeigth-this._downBottom.height - 15;
		this._downBottom.x = 0;  
		this.addChild(this._downBottom);

        this.addChild(border);

        this.totalText = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeTotalText",[this.acVo.getRenum()+""]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.totalText.x = 20;
        this.totalText.y = this._downBottom.y + this._downBottom.height/2 - this.totalText.height/2 + 5;
        this.addChild(this.totalText);

        this.countText = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeCountText",[this.acVo.getRtotal()+""]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countText.x = this.totalText.x + this.totalText.width + 15;
        this.countText.y = this._downBottom.y + this._downBottom.height/2 - this.countText.height/2 + 5;
        this.addChild(this.countText);



      

        let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18, this._downBottom.y + this._downBottom.height/2 - showMore.height/2);
		this.addChild(showMore);

		this._moreArrow = BaseBitmap.create("arena_arrow");
		this._moreArrow.setPosition(showMore.x - this._moreArrow.width - 5, this._downBottom.y + this._downBottom.height/2 - this._moreArrow.height/2);
		this.addChild(this._moreArrow);

        

        if(Api.playerVoApi.getPlayerAllianceId() == 0)
        {   
            this.drawblackMask(); 
		} 
 
    }

    protected refreshBtnStatus()
    {   
        
        // if(this.acVo.getRechargeFlag()==1)
        this.totalText.text = LanguageManager.getlocal("acAllianceRechargeTotalText",[this.acVo.getRenum()+""]);
        this.countText.text = LanguageManager.getlocal("acAllianceRechargeCountText",[this.acVo.getRtotal()+""]);
        this.countText.x = this.totalText.x + this.totalText.width + 15;
      
     }


    private drawblackMask():void
    {
        let _maskBmp = BaseBitmap.create("public_9_viewmask");
		_maskBmp.width=GameConfig.stageWidth;
		_maskBmp.height=GameConfig.stageHeigth;
		_maskBmp.touchEnabled = true;
        _maskBmp.y = 69 + 245;//315+32;
		this.addChild(_maskBmp); 


        //tip
        let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
        tipBg.name="tipBg";
        tipBg.x= 0;
        tipBg.y =500;
        this.addChild(tipBg);

        var message = LanguageManager.getlocal("acAllianceRechargeTip"); 
        let msgText:BaseTextField=ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipBg.height = msgText.height + 50;

        msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
        msgText.textAlign=egret.HorizontalAlign.CENTER;
        msgText.name="msgText";
        msgText.lineSpacing=2; 
        this.addChild(msgText);
 
        //按钮 
        let imgBg = BaseBitmap.create("mainui_bottombtnbg");
        imgBg.setPosition(GameConfig.stageWidth/2-imgBg.width/2,tipBg.y+tipBg.height+25);
        this.addChild(imgBg);

        let imgBtn = ComponentManager.getButton("alliance_taskicon", "", this.bottomBtnClickHandler, this);
        imgBtn.setPosition(imgBg.x + imgBg.width / 2 - imgBtn.width / 2 - 5, imgBg.y + imgBg.height / 2 - imgBtn.height / 2);
        this.addChild(imgBtn);

        let imgName = BaseBitmap.create("acalliancerecharge_serarch");
        imgName.setPosition(imgBg.x + imgBg.width / 2 - imgName.width / 2, imgBg.y + imgBg.height - imgName.height);
        this.addChild(imgName);


        // let openType ="alliance"; 
        // let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
        // if(!isShowNpc)
        // {
        //     let lockedStr:string= LanguageManager.getlocal("acAllianceRechargeUnluckDes");//Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
        //     msgText.text =lockedStr;
        //     msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
        //     msgText.textAlign=egret.HorizontalAlign.CENTER;
        //     imgBg.visible =false;
        //     imgBtn.visible =false;
        //     imgName.visible =false;
        // } 
    }
    private bottomBtnClickHandler():void
    {   
        let isopen = Api.allianceVoApi.isShowNpc();//getLockedString();
        if(!isopen){
            App.CommonUtil.showTip(Api.allianceVoApi.getLockedString());
            return;
        }
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
    }


    private showMoreHandle():void
	{
		
		if(this.touchBoo)
		{
			this._isShowMore = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
				this._moreArrow.y += this._moreArrow.height;
					this.showList();		
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
					this.closeList();
			}
		}
		
	}
	private showList():void
	{
        if(!this.moveContainer){
            this.moveContainer= new BaseDisplayObjectContainer();
			this.addChild(this.moveContainer);
            this.moveContainer.name ="moveContainer";

			this.moreBg = BaseBitmap.create("arena_bottom_bg");
			this.moreBg.width = 640;
			this.moreBg.height =GameConfig.stageHeigth - 330;
			this.moveContainer.addChild(this.moreBg);

			this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
			this._currMaskBmp.width=GameConfig.stageWidth;
			this._currMaskBmp.height=GameConfig.stageHeigth;
			this._currMaskBmp.touchEnabled = true;
			this.addChild(this._currMaskBmp);
			this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._downBottom));
			
			// 增加 点击区域
			this._touchBg = BaseBitmap.create("public_9v_bg11");  
			this._touchBg.width = 640;
			this._touchBg.height =260;
			this._touchBg.x=0;
			this._touchBg.y=-240;
			this._touchBg.alpha =0;
			this._touchBg.addTouchTap(this.showMoreHandle,this);
			this.moveContainer.addChild(this._touchBg);
        }
        this._currMaskBmp.visible = true;

        // this.dataList = this.dataList.concat(this.dataList).concat(this.dataList).concat(this.dataList).concat(this.dataList).concat(this.dataList).concat(this.dataList).concat(this.dataList).concat(this.dataList);
	
        // this.dataList = [
        //     ["颠三倒四的",1],
        //     ["颠三倒四的1",1],
        //     ["颠三倒四的2",1],
        //     ["颠三倒四的3",1],
        //     ["颠三倒四的4",1],
        //     ["颠三倒四的5",1],
        //     ["颠三倒四的6",1],
        //     ["颠三倒四的7",1],
        //     ["颠三倒四的8",1],
        //     ["颠三倒四的9",1],
        //     ["颠三倒四的0",1],
        //     ["颠三倒四的2",1],
        //     ["颠三倒四的4",1],
        //     ["颠三倒四的5",1],
        //     ["颠三倒四的3",1],
        //     ["颠三倒四的5",1],
        //     ["颠三倒四的4",1],
        //     ["颠三倒四的6",1],
        //     ["颠三倒四的7",1],
        //     ["颠三倒四的5",1],
        //     ["颠三倒四的6",1]
        // ];
        if(this.dataList && this.dataList.length && this.dataList.length >0){
            if(!this._dataScrollList){
                let rect = egret.Rectangle.create();
                rect.setTo(0, 0, 640, GameConfig.stageHeigth - 380);
                this._dataScrollList = ComponentManager.getScrollList(AcAllianceRechargeRankScrollItem, this.dataList, rect);
                this.moveContainer.addChild(this._dataScrollList);
                this._dataScrollList.y = 25;
            } 
        } else {
            if(!this._emptyText){
                this._emptyText = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceRechargeEmptyText"), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
                this._emptyText.x =GameConfig.stageWidth/2 - this._emptyText.width/2;
                this._emptyText.y =300;
                this.moveContainer.addChild(this._emptyText);
            }
            this._emptyText.visible = true;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEINFO,{activeId:this.aid+"-"+this.code});

        this.moveContainer.y =1150;
        this.touchBoo=false;
        egret.Tween.get(this.moveContainer).to({y:250},500).call(function()
        {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo =true;
        },this);
	}

    private refreshRankList(event:egret.Event){
        let rData = event.data.data.data;
        this.dataList = rData.chargeList;
 
        if(this._dataScrollList && this.dataList && this.dataList.length && this.dataList.length >0){
            this._dataScrollList.refreshData(this.dataList);
            if(this._emptyText){
                this._emptyText.visible = false;
            }
        } else {
            
            // if(this._emptyText){
            //     this._emptyText.visible = false;
            // }
        }
        
    }
	private closeList():void
	{
		this.touchBoo=false;
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
                this.touchBoo=true;
                egret.Tween.removeTweens(this.moveContainer);
		
		    },this);
		}
        if(this._currMaskBmp)
        {
            this._currMaskBmp.visible = false;
        }
        
		// if(this._currMaskBmp&&this._currMaskBmp.parent)
		// {
			// this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			// this._currMaskBmp.dispose();
			// this._currMaskBmp =null;
		// }
		
		// if(this._touchBg&&this._touchBg.parent)
		// {
			// this._touchBg.parent.removeChild(this._touchBg);
			// this._touchBg.dispose();
			// this._touchBg =null;
		// }
		
	}    
    // protected getRuleInfo():string
	// {
	// 	let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo_"+this.code;

	// 	if(LanguageManager.checkHasKey(ruleStr))
	// 	{
	// 		return ruleStr;
	// 	} 
	// 	return "";
    // } 
    protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime - 86400 * 1;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acAllianceRechargeAcCD", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this._acCDTxt.x = GameConfig.stageWidth/2 - this._acCDTxt.width/2; 
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acAllianceRechargeAcCD", [LanguageManager.getlocal("acAllianceRechargeAcCDEnd")]);
		
            this._acCDTxt.x = GameConfig.stageWidth/2 - this._acCDTxt.width/2; 
        }
		return false;
	}
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
            "mainui_bottombtnbg",
            "arena_bottom_bg",
            "arena_more",
            "arena_arrow",
            "arena_bottom",
            "acalliancerecharge_scrolltitle",
            "acalliancerecharge_serarch",
            "progress_type1_yellow2",
            "progress_type3_bg",
            "alliance_taskicon"

        ]);
    }  
    
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO,this.refreshBtnStatus,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGEINFO),this.refreshRankList,this);

        this._scrollList = null; 
        this._rewardTime = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._chrargeType =0;
        this._downBottom = null;
        this._moreArrow = null;
        this.touchBoo =true;
        this._isShowMore = false;
        this.moveContainer =null;
        this._touchBg =null;
        this.moreBg =null;
        this._currMaskBmp =null;
        this.moreData = null;
        this.totalText = null;
        this.countText = null;
        this.dataList = null;
        this._dataScrollList = null;
        this._emptyText = null;
        super.dispose();
    }

    
}