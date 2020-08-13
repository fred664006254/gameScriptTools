/**
 * 管家
 * author shaoliang
 * date 2020/4/23
 * @class HousekeeperView
 */

class HousekeeperView  extends CommonView
{   
    private _scrollList:ScrollList = null;

    private _timeText:BaseTextField = null;
    private _nextTime:number = 0;
    private _btn:BaseButton = null;

    public constructor() {
		super();
	}

    protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

    protected getContainerY():number
	{
		return 0;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "housekeeperview_topbg","progress20_bg","progress2","settingview_line",
            "housekeeperview_bottombg",
		]);
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_CONQUEST_INDEX,requestData:{}};
	}


    public initView():void
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_HOUSEKEEPER,this.checkBtn,this);

        this.setBigFameY(262);
		this.setBigFameCorner(1);

        let topBg = BaseBitmap.create("housekeeperview_topbg");
		this.addChildToContainer(topBg);

        let timebg = BaseBitmap.create("housekeeperview_timebg");
        timebg.setPosition(GameConfig.stageWidth/2-timebg.width/2,topBg.y+5);
        this.addChildToContainer(timebg);

        let hasDate = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[App.DateUtil.getFormatBySecond(Api.shopVoApi.getButleret(),6)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        hasDate.setPosition(timebg.x+timebg.width/2-hasDate.width/2,timebg.y+timebg.height/2-hasDate.height/2);
        this.addChildToContainer(hasDate);

        let talkContainer = new BaseDisplayObjectContainer();
        talkContainer.y = 45
        this.addChildToContainer(talkContainer);

        let talkbg = BaseBitmap.create("public_9_bg42");
        talkContainer.addChild(talkbg);

        let talktext =	ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_talk1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		talktext.lineSpacing=4;
		talktext.setPosition(24,15);
        talkContainer.addChild(talktext);

        talkbg.height = talktext.height+30;
        talkbg.width = talktext.width+48;

        let talktail = BaseBitmap.create("public_9_bg42_tail");
		talktail.setPosition(23,talkbg.height-4);
        talkContainer.addChild(talktail);

        talkContainer.x = 402;
        if (talkContainer.x+talkContainer.width + 12 > GameConfig.stageWidth)
        {
            talkContainer.x = GameConfig.stageWidth- 12 -talkContainer.width;
        }

        let choosebg = BaseBitmap.create("housekeeperview_choosebg");
		choosebg.setPosition(0,220);
        this.addChildToContainer(choosebg);
	
	 	let choosetext = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_choose"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        choosetext.setPosition(choosebg.x+choosebg.width/2-choosetext.width/2,choosebg.y+choosebg.height/2-choosetext.height/2-5);
        this.addChildToContainer(choosetext);

        let scrollH = GameConfig.stageHeigth-376-77;
		let rect = new egret.Rectangle(0,0,640,scrollH);

    // "wife":"佳人",
	// "search":"寻访",
	// "servant":"门客",
	// "bookroom":"太学",
	// "manage":"经营",
	// "affair":"公务",
	// "studyatk":"演武场",
	// "challenge":"关卡",

        let list = Api.housekeeperVoApi.getList();
		this._scrollList = ComponentManager.getScrollList(HousekeeperScrollItem,list ,rect);
		this._scrollList.x = 0;
		this._scrollList.y = topBg.y+topBg.height+55;
		this.addChildToContainer(this._scrollList);

        let bottombg = BaseBitmap.create("housekeeperview_bottombg");
        bottombg.y = GameConfig.stageHeigth-bottombg.height;
		this.addChild(bottombg);

        let btn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"housekeeper_name",this.btnHandle,this);
		btn.setPosition(GameConfig.stageWidth/2-btn.width/2,bottombg.y+bottombg.height/2-btn.height/2+8);
        this.addChild(btn);
        this._btn = btn;

        this._timeText  = ComponentManager.getTextField(" ",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeText.width = GameConfig.stageWidth;
        this._timeText.textAlign = egret.HorizontalAlign.CENTER;
        this._timeText.y = bottombg.y+1;
        this.addChild(this._timeText);

        this.checkCdTime();
        this.checkBtn();
    }

    private btnHandle():void
    {       
        if (!Api.shopVoApi.ifBuyButler())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("housekeeper_end_tip"));
            this.hide();
            return;
        }
        if (Api.housekeeperVoApi.getCdTime()>0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("housekeeper_wait_tip"));
            return;
        }

        let types:string[] = [];
        let list = Api.housekeeperVoApi.getList();

        for (let i=0; i<list.length; i++)
        {
            if (Api.housekeeperVoApi.getIsCheckByType(list[i]))
            {
                types.push(list[i]);
            }
        }
        if (types.length == 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("housekeeper_select_tip"));
            return;
        }

        ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERLOADVIEW,{info:types});
        this.hide();
        Api.housekeeperVoApi.setSaveCDTime();
    }

    public tick():void
    {
        if (!Api.shopVoApi.ifBuyButler())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("housekeeper_end_tip"));
            this.hide();
            return;
        }
        this.checkCdTime();
    }

    private checkCdTime():void
    {
        let cdtime = Api.housekeeperVoApi.getCdTime();
        if (cdtime>0)
        {
            this._timeText.visible = true;
            this._timeText.text = LanguageManager.getlocal("housekeeper_time_tip",[App.DateUtil.getFormatBySecond(cdtime,3)]);
        }
        else
        {
            this._timeText.visible = false;
        }
    }

    private checkBtn():void
    {
        let list = Api.housekeeperVoApi.getList();
        let v = false;
        for (let i = 0; i<list.length; i++)
        {
            if (Api.housekeeperVoApi.getIsCheckByType(list[i]))
            {
                v = true;
                break;
            }
        }
        this._btn.setEnable(v);
    }

    protected getRuleInfo():string
    {
        return "housekeeperview_rule";
    }

    public dispose():void
    {   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_HOUSEKEEPER,this.checkBtn,this);

        this._scrollList = null;
        this._timeText = null;
        this._nextTime = 0;
        this._btn = null;

        super.dispose();

    }
}