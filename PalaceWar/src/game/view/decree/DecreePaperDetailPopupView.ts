/**
 * 已选择政令UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePaperDetailPopupView
 */
class DecreePaperDetailPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _paperIdx:string;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD),this.ProlicyBtnClickHandlerCallBack,this);

		this._paperIdx = Api.promoteVoApi.getGdinfo().gdid ;
		let paperCfg = Config.PolicyCfg.getGovDecreeById(this._paperIdx);

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let paperbg = BaseBitmap.create("decree_policy_detailbg");
		paperbg.anchorOffsetX = paperbg.width/2;
		paperbg.x = this.viewBg.width/2;
		paperbg.y = 70;
		this._nodeContainer.addChild(paperbg);
		
		let startY = paperbg.y + paperbg.height + 10;
		let policybg = BaseBitmap.create("decree_policy_bg1");
		// policybg.width = 530;
		policybg.x = this.viewBg.width/2 - policybg.width/2;
		policybg.y = startY;
		policybg.name = "policybg";
		this._nodeContainer.addChild(policybg);

		let bookbg =  BaseBitmap.create("decree_bookbg");
		bookbg.x = policybg.x + 15;
		bookbg.y = policybg.y + policybg.height/2 - bookbg.height/2-2;
		this._nodeContainer.addChild(bookbg);

		let policyIcon = BaseBitmap.create("decree_book");
		policyIcon.x = bookbg.x + bookbg.width/2 - policyIcon.width/2;
		policyIcon.y = bookbg.y + bookbg.height/2 - policyIcon.height/2;
		this._nodeContainer.addChild(policyIcon);
		
		let addTimes1 = paperCfg.addTimes1;
		let addTimes2 = paperCfg.addTimes2;
		let addExtent1 = String(paperCfg.addExtent1*100);
		let addExtent2 = String(paperCfg.addExtent2*100);
		let moreStr = "";
		if(Api.promoteVoApi.ismore())
		{
			addExtent1 = String(paperCfg.leveeTimeEff1*100);
			addExtent2 = String(paperCfg.leveeTimeEff2*100);
			moreStr ="  "+ LanguageManager.getlocal("decreepaper_ismore");
		}

		let nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		nameTxt.text = LanguageManager.getlocal("decreePaper_Name"+ paperCfg.type) + "-" + LanguageManager.getlocal("decreePaper_subName"+paperCfg.sort) + moreStr;
		nameTxt.x = policybg.x + 117;
		nameTxt.y = policyIcon.y + 12;
		this._nodeContainer.addChild(nameTxt);

		

		let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		descTxt.multiline = true;
		descTxt.lineSpacing = 3;
		descTxt.width = paperbg.width - 60;
		descTxt.text = LanguageManager.getlocal("decreePaper_Desc" + paperCfg.type + "_1",[""+addTimes1,addExtent1]);
		descTxt.x = nameTxt.x;
		descTxt.y = nameTxt.y + 28;
		this._nodeContainer.addChild(descTxt);

		let descTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		descTxt.multiline = true;
		descTxt2.lineSpacing = 3;
		descTxt2.width = paperbg.width - 60;
		descTxt2.text = LanguageManager.getlocal("decreePaper_Desc" + paperCfg.type + "_2",[""+addTimes2,addExtent2]);
		descTxt2.x = descTxt.x
		descTxt2.y = descTxt.y + 28;
		this._nodeContainer.addChild(descTxt2);
		if(PlatformManager.checkIsEnSp())
		{
			 nameTxt.size =18; 
	
			 descTxt.size =17;
			 descTxt.width = 390;
			 descTxt.lineSpacing = 2;
			 descTxt.x= 162; descTxt.x-15;
			 descTxt.y = nameTxt.y + 25;

			 descTxt2.size=17;
			 descTxt2.width =390; 
			 descTxt2.y =descTxt.y+descTxt.height+3;
		}

		 
		if(PlatformManager.checkIsThSp())
		{
			nameTxt.lineSpacing = 3;
			descTxt.y = nameTxt.y + nameTxt.height + 3;
			descTxt2.y = descTxt.y + descTxt.height + 3; 

		}

		let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW);
	   
        var zoneStr:number = 0;
		zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;  
		tipTxt.text = LanguageManager.getlocal("decreePaperDetail_tip",[zoneStr+""]);
		tipTxt.anchorOffsetX = tipTxt.width/2;
		tipTxt.x = this.viewBg.width/2;
		tipTxt.y = descTxt2.y + 70;
		this._nodeContainer.addChild(tipTxt);
    }

	protected ProlicyBtnClickHandlerCallBack(event:egret.Event)
	{
		if(event && event.data && event.data.ret)
		{
			let rData = event.data.data;
			// let rData =  盖戳
			let stampImg = this.addStampFlag();
			stampImg.setScale(1.5);
			egret.Tween.get(stampImg,{loop:false}).to({scaleX:1,scaleY:1},300)
		}
	}

	protected addStampFlag()
	{
		let policybg = this._nodeContainer.getChildByName("policybg");
		let stampImg = BaseBitmap.create("decree_policy_stamp");
		stampImg.name = "stampImg";
		stampImg.anchorOffsetX = stampImg.width/2;
		stampImg.anchorOffsetY = stampImg.height/2;
		stampImg.x =  policybg.x + + policybg.width - stampImg.width/2 -15;
		stampImg.y = policybg.y + policybg.height/2 ;
		this._nodeContainer.addChild(stampImg);
		return stampImg;
	}
	protected ProlicyBtnClickHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
	}

    protected getShowHeight():number
	{
		return 500;
	}

    // 背景图名称
	protected getBgName():string
	{
		return "decree_popbg";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_policy_detailbg","decree_policy_bg1","decree_policy_bg2","decree_policy_bg3","decree_policy_bg4",
			"decree_paper_listbg","decree_book","decree_bookbg",
			"decree_popbg","decree_policy_icon1","decree_policy_stamp","decree_policy_icon2","decree_policy_icon3","decree_policy_icon4",
    	]);
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}

    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD),this.ProlicyBtnClickHandlerCallBack,this);
		this._nodeContainer = null;
		this._paperIdx = null;

		super.dispose();
	}
}