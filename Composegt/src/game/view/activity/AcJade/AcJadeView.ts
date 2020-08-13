/**
 * 翠玉生辉
 * 2018/11/13
 * jiangliuyang
 */
class AcJadeView extends AcCommonView
{


    //活动倒计时
    private _timerText: BaseTextField = null;
    //排名
    private _rankText: BaseTextField = null;
    //右面描述 1， 2
    private _descText1: BaseTextField = null;

    private _descText2: BaseTextField = null;


    //活动时间
    private _activityTimerText:BaseTextField = null;
    //中间描述1， 2
    private _descText3: BaseTextField = null;

    private _descText4: BaseTextField = null;

    private _titleBg: BaseLoadBitmap = null;

    private _rankBtn: BaseButton = null;

    private _rankBtnText: BaseBitmap = null;

    private _myrankArr = null;

    // private get vo() : AcJadeVo{
    //     return <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    // }
    private get cfg() : Config.AcCfg.JadeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    public constructor() {
		super();
	}
   	 
	public initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshRed,this);

         let suffix = this.code;
        if(this.code == "1" ){
            suffix = "1";
        }
        
        
        if(this.code == "1" || this.code == "2"  ){
            this._titleBg = BaseLoadBitmap.create("acjadeview_titlebg1" );
        }else{
            this._titleBg = BaseLoadBitmap.create("acjadeview_titlebg"+ this.code);
        }
        this._titleBg.width = 626;
        this._titleBg.height = 334;
        this._titleBg.x = GameConfig.stageWidth / 2 - this._titleBg.width/2;
        this._titleBg.y = 69;
        this.addChild(this._titleBg);
        
        let t = this.acVo.et - GameData.serverTime - 86400 * 1;
        if(t < 0){
            t = 0;
        }
        let timeTxt = App.DateUtil.getFormatBySecond(t,1);
        //倒计时  
        this._timerText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_timer",[timeTxt]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._timerText.x = this._titleBg.x + 355;
		this._timerText.y = this._titleBg.y + 30;
       	this.addChild(this._timerText);
        if(t <= 0){
            this._timerText.text = LanguageManager.getlocal("acJadeActiveOver");
        } else {
            TickManager.addTick(this.tick,this);
        }
        let rankNumText = "1000+";
        if(this._myrankArr && this._myrankArr.myrank){
            rankNumText = this._myrankArr.myrank.toString();
        }

        //排名
        this._rankText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_rank",[rankNumText]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._rankText.x = this._timerText.x;
		this._rankText.y = this._timerText.y + this._timerText.height + 10;
       	this.addChild(this._rankText);     

        //描述1
        this._descText1 = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_desc1_"+suffix,[this.cfg.cost.toString()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._descText1.x = this._timerText.x;
		this._descText1.y = this._rankText.y + this._rankText.height + 5;
        this._descText1.width = 250;
        this._descText1.lineSpacing = 5
       	this.addChild(this._descText1);

        // //描述2
        // this._descText2 = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_desc2_"+this.code), 18,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	// this._descText2.x = this._timerText.x;
		// this._descText2.y = this._descText1.y + this._descText1.height + 5;
        // this._descText2.width = 250;
        // this._descText2.lineSpacing = 5
       	// this.addChild(this._descText2);      

        
        let stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 9);
		let etTxt = App.DateUtil.getFormatBySecond(this.acVo.et-86400, 9);
        // - 86400 * 1
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_acttimer",[stTxt,etTxt]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._activityTimerText.x = this._titleBg.x + 20;
		this._activityTimerText.y = this._titleBg.y + 252;
       	this.addChild(this._activityTimerText);
        
       
        //描述3
        this._descText3 = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_desc3_"+ suffix), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._descText3.x = this._titleBg.x + 20;
		this._descText3.y = this._activityTimerText.y + this._activityTimerText.height + 10;
        // this._descText3.width = 250;
       	this.addChild(this._descText3);

        //描述4
        this._descText4 = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_desc4_"+ suffix), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
	 	this._descText4.x = this._titleBg.x + 20;
		this._descText4.y = this._descText3.y + this._descText3.height + 5;
        // this._descText4.width = 250;
       	this.addChild(this._descText4);  

        
        this._rankBtn = ComponentManager.getButton("acjadeview_item"+ (this.code == "3" ? "3" : "1"),null,this.rankBtnCallback,this);
        this._rankBtn.x = this._titleBg.x + 510;
        this._rankBtn.y = this._titleBg.y + 240;
        this.addChild(this._rankBtn);

        this._rankBtnText = BaseBitmap.create("acjadeview_rankname"+ (this.code == "3" ? "3" : "1"));
        this._rankBtnText.x = this._rankBtn.x + this._rankBtn.width / 2 - this._rankBtnText.width/2;
        this._rankBtnText.y = this._rankBtn.y + this._rankBtn.height - this._rankBtnText.height-12;
        this.addChild(this._rankBtnText);



        let border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69;
        border.x = 0;
        border.y = 69;
        this.addChild(border);

       this.refreshRed();

    }
    private refreshRed()
    {
        if(this.acVo.isShowRedDot){
            this.tabbarGroup.addRedPoint(2);
        } else {
            this.tabbarGroup.removeRedPoint(2);
        }
    }

    protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    private rankBtnCallback(event):void
    {
   
        ViewController.getInstance().openView(ViewConst.POPUP.ACJADERANKLISTVIEW,{aid:this.aid,code:this.code});
    }
    
    protected getTabbarTextArr():Array<string>
	{
        if(this.code == "1"){
            return ["acJadeViewTab1_1", 
                    "acJadeViewTab2_1",
                    "acJadeViewTab3_1",
                ]
        }

		return ["acJadeViewTab1_"+this.code, 
                "acJadeViewTab2_"+this.code,
                "acJadeViewTab3_"+this.code,
            
		    ];
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
       
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETJADERANK,requestData:{activeId:this.aid+"-"+this.code}};
	}  
	protected receiveData(data:{ret:boolean,data:any}):void
	{
    
        if(data.ret){
            this._myrankArr = data.data.data.myrankArr;
            // this._rankArr = data.data.data.rankArr;
            if(this._rankText != null){
                let rankNumText = "1000+";
                if(this._myrankArr && this._myrankArr.myrank){
                    rankNumText = this._myrankArr.myrank.toString();
                }
                this._rankText.text = LanguageManager.getlocal("acJadeView_rank",[rankNumText]);
                // this._rankText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_rank",[rankNumText]), 18,TextFieldConst.COLOR_LIGHT_YELLOW);

            }

        }
        
	}      
 	protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
				this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.container.x,this.container.y);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
	}
    private tick():void
    {
        let t = this.acVo.et - GameData.serverTime - 86400 * 1;
        if(t < 0){
            t = 0;
            TickManager.removeTick(this.tick,this);
            this._timerText.text = LanguageManager.getlocal("acJadeActiveOver");
            // this._timerText.x = this._titleBtn.x + this._titleBtn.width / 2 - this._timerText.width/2;
            this._timerText.x = this._titleBg.x + 355;
		    this._timerText.y = this._titleBg.y + 30;
        } else {
            let timeTxt = App.DateUtil.getFormatBySecond(t,1);
            this._timerText.text = LanguageManager.getlocal("acJadeView_timer",[timeTxt]);
            
        }


    }    
    protected getTabbarGroupY():number
	{
		return 334;
	}

    protected getRuleInfo():string
	{
        if(this.code == "1"){
		    return "acJadeViewRule_1";
        }
        return "acJadeViewRule_"+this.code;
	} 

    private goToRechargeHandler():void
    {
         ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    } 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "acjadeview_rankname",
            "adult_lowbg",
            "rechargevie_db_01",
            "progress_type1_yellow2",
            "progress_type3_bg"
         ]);
	} 
	public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshRed,this);
        TickManager.removeTick(this.tick,this);
    //活动倒计时
        this._timerText = null;
    //排名
        this._rankText = null;
    //右面描述 1， 2
        this._descText1 = null;

        this._descText2 = null;


    //活动时间
        this._activityTimerText = null;
    //中间描述1， 2
        this._descText3 = null;

        this._descText4 = null;

        this._titleBg = null;

        this._rankBtn = null;

        this._rankBtnText = null;

        this._myrankArr = null;
        super.dispose();
    }
}