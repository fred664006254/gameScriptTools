/**
 * 政令列表UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePaperView
 */
class DecreePaperView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _txtResList:BaseTextField[] = [];
	private _costGoldNum:number = 0;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD),this.refreshPaperHandlerCallback,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let decree_wordbg = BaseBitmap.create("decree_wordbg");
		decree_wordbg.width = 500;
		decree_wordbg.anchorOffsetX = decree_wordbg.width/2;
		decree_wordbg.x = this.viewBg.width/2;
		decree_wordbg.y = GameConfig.stageHeigth/2 - 350;
		// this._nodeContainer.addChild(decree_wordbg);
		this.addChildToContainer(decree_wordbg);

		let word1Img = BaseBitmap.create("decree_policy_word1");
		word1Img.anchorOffsetX = word1Img.width/2;
		word1Img.x = this.viewBg.width/2;
		word1Img.y = decree_wordbg.y + decree_wordbg.height/2 - word1Img.height/2;
		// this._nodeContainer.addChild(word1Img);
		this.addChildToContainer(word1Img);

		let clostBtn = ComponentManager.getButton( ButtonConst.POPUP_CLOSE_BTN_1,"",this.hide,this);
		clostBtn.x = decree_wordbg.x + decree_wordbg.width/2 -clostBtn.width/2;
		clostBtn.y = decree_wordbg.y + decree_wordbg.height/2 - clostBtn.height + 30;
		// this._nodeContainer.addChild(clostBtn);
		this.addChildToContainer(clostBtn);

		let startY = GameConfig.stageHeigth/2;
		for (var index = 1; index <= 3; index++) {
			let paperbg = BaseBitmap.create("decree_paper1");
			paperbg.x = this.viewBg.width/2 + (paperbg.width + 25)*(index-2) -paperbg.width/2 ;
			paperbg.y = startY - paperbg.height/2;
			this._nodeContainer.addChild(paperbg);
			paperbg.touchEnabled = true;
			paperbg.addTouchTap(this.PaperImgClickHandler,this,[index]);

			let policyIcon = BaseBitmap.create("decree_book");
			policyIcon.x = paperbg.x + paperbg.width/2 - policyIcon.width/2+5;
			policyIcon.y = paperbg.y + 85;
			this._nodeContainer.addChild(policyIcon);
			
			let nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			// nameTxt.text = LanguageManager.getlocal("decreePaper_Name"+index);
			nameTxt.x =  paperbg.x + paperbg.width/2;
			nameTxt.y = paperbg.y+ 250;
			this._nodeContainer.addChild(nameTxt);
			this._txtResList.push(nameTxt);

			let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			descTxt.multiline = true;
			descTxt.lineSpacing = 3;
			descTxt.width = paperbg.width - 20;
			// descTxt.text = LanguageManager.getlocal("decreePaper_Desc"+index);
			descTxt.x = paperbg.x + paperbg.width/2
			descTxt.y = nameTxt.y + 40;
			this._nodeContainer.addChild(descTxt);
			this._txtResList.push(descTxt);
		}

		let leveeTime = Config.PolicyCfg.leveeTime;
		let tipTxt = ComponentManager.getTextField("",20);
		var time1  =  App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[0]).hour; 
		var time2  =  App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[1]).hour;   
		tipTxt.text = LanguageManager.getlocal("decreePaperTipTxt",[""+time1,""+time2]);
		tipTxt.anchorOffsetX = tipTxt.width/2;
		tipTxt.x = GameConfig.stageWidth/2;
		tipTxt.y =GameConfig.stageHeigth - 50;
		// this._nodeContainer.addChild(tipTxt);
		this.addChildToContainer(tipTxt);

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"decreepaper_refreshBtnTxt",this.refreshPaperHandler,this);
		btn.x = this.viewBg.width/2 - btn.width/2;
		btn.y = GameConfig.stageHeigth/2 + 300;
		this._nodeContainer.addChild(btn);

		let goldIcon = BaseLoadBitmap.create("itemicon1");
		goldIcon.setScale(0.45);
		goldIcon.x = btn.x + 10;
		goldIcon.y = btn.y - 40;
		goldIcon.name = "goldIcon";
		this._nodeContainer.addChild(goldIcon);

		let costTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_WARN_YELLOW);
		costTxt.y =	btn.y - 25;
		costTxt.name = "costTxt";
		this._nodeContainer.addChild(costTxt);
		this.refreshCostInfo();
    }
	
	protected refreshCostInfo()
	{
		let goldIcon = this._nodeContainer.getChildByName("goldIcon");
		let costTxt = <BaseTextField >this._nodeContainer.getChildByName("costTxt");

		let gdinfo = Api.promoteVoApi.getGdinfo(); //gdtypes
		let refreshgdNeedGem = Config.PolicyCfg.refreshgdNeedGem
		
		if(gdinfo.num > refreshgdNeedGem.length-1)
		{
			this._costGoldNum = refreshgdNeedGem[refreshgdNeedGem.length-1];
		}else{
			this._costGoldNum = refreshgdNeedGem[gdinfo.num];
		}

		if(this._costGoldNum == 0)
		{
			goldIcon.visible = false;
			costTxt.text = LanguageManager.getlocal("decree_refreshPaper_costTxt1");
			costTxt.x = GameConfig.stageWidth/2  - costTxt.width/2;
		}else{
			goldIcon.visible = true;
			costTxt.text =""+ this._costGoldNum;
			costTxt.x = goldIcon.x + 50;
		}
		let gdtypes:number[] = gdinfo.gdtypes;
		if(gdtypes.length == 0 || Object.keys(gdtypes).length == 0)
		{
			gdtypes = [1,2,3];
		}
		for (var index = 0; index < gdtypes.length; index++) {
			let gdId =  gdtypes[index];
			let nameTxt = this._txtResList[index*2]
			nameTxt.text = LanguageManager.getlocal("decreePaper_Name"+gdId);
			nameTxt.anchorOffsetX = nameTxt.width/2;
			
			let descTxt = this._txtResList[index*2 +1]
			descTxt.text = LanguageManager.getlocal("decreePaper_Desc"+gdId);
			descTxt.anchorOffsetX = descTxt.width/2;
		}
	}

	protected refreshPaperHandlerCallback(event:egret.Event)
    {
        if(!event || !event.data || !event.data.ret)
        {
			// App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_refreshFailedTip"));
            return;
        }
		/**
		 * 执行刷新Ani
		 */
		// this.refreshCostInfo();
		egret.Tween.get(this._nodeContainer,{loop:false}).to({alpha:0},500).call(this.refreshCostInfo,this).to({alpha:1},500);
    }

	protected refreshPaperHandler()
	{
		if(Api.playerVoApi.getPlayerGem() < this._costGoldNum)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_refreshTip"));
			return;
		}

		if(this._costGoldNum <= 0)
		{
			this.doRefreshRequest();
			return;
		}

		let mesObj = {
			 confirmCallback: this.doRefreshRequest,
			 handler : this, 
			 icon : "itemicon1",
			 iconBg:"itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
			 msg: LanguageManager.getlocal("decreepaper_refreshTipTxt",[""+this._costGoldNum]),
			 id : 1,
			 useNum : this._costGoldNum,
			 linespacing : 6,
			 height : 250
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );	
	}
	protected doRefreshRequest()
	{
		NetManager.request(NetRequestConst.REQUEST_POLICY_REFRESHGD,{});
	}
	protected PaperImgClickHandler(obj:any,param:number)
	{
		let gdid = Api.promoteVoApi.getGdinfo().gdtypes[param-1]; //gdtypes
		if(!gdid)
		{
			gdid = 11;
		}
		ViewController.getInstance().openView(ViewConst.BASE.DECREEPAPERINFOVIEW,{gdId:gdid});
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat( [
			"decree_wordbg","decree_policy_word1","decree_paper1","decree_book",
		]);
	}
	protected getTitleStr():string
	{
		return "";
	}
	
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD),this.refreshPaperHandlerCallback,this);
		this._costGoldNum = 0;
		this._nodeContainer = null;
		this._txtResList = [];

		super.dispose();
	}
}