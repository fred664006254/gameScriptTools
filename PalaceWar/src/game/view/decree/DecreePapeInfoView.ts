/**
 * 政令详情UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePapeInfoView
 */
class DecreePapeInfoView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _nodeRightContainer:BaseDisplayObjectContainer;
	private _selGdid:string = "";
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETGD),this.isetGDCallback,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
		this._nodeRightContainer = new BaseDisplayObjectContainer();
		this._nodeRightContainer.x = -GameConfig.stageWidth;
		this.addChildToContainer(this._nodeRightContainer);
		this.addChildToContainer(this._nodeContainer);

		let paperIdx = this.param.data.gdId;
		// paperIdx = 1;
		let startY = GameConfig.stageHeigth/2;

		let paperbg = BaseBitmap.create("decree_paper2");
		paperbg.x = 0;
		paperbg.y = startY - paperbg.height/2;
		
		let decree_paper_open = BaseBitmap.create("decree_paper_open");
		decree_paper_open.width = GameConfig.stageWidth - paperbg.width;
		decree_paper_open.x = GameConfig.stageWidth - paperbg.x - decree_paper_open.width - 5;
		decree_paper_open.y = paperbg.y;
		this._nodeRightContainer.addChild(decree_paper_open);
		this._nodeContainer.addChild(paperbg);

		let policyIcon = BaseBitmap.create("decree_book");
		policyIcon.x = paperbg.x + paperbg.width/2 - policyIcon.width/2+5;
		policyIcon.y = paperbg.y + 85;
		this._nodeContainer.addChild(policyIcon);
		
		let nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		nameTxt.text = LanguageManager.getlocal("decreePaper_Name"+paperIdx);
		nameTxt.x =  paperbg.x + paperbg.width/2 - nameTxt.width/2;
		nameTxt.y = paperbg.y+ 250;
		this._nodeContainer.addChild(nameTxt);

		let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		descTxt.multiline = true;
		descTxt.lineSpacing = 3;
		descTxt.width = paperbg.width - 30;
		descTxt.text = LanguageManager.getlocal("decreePaper_Desc"+paperIdx);
		descTxt.x = paperbg.x + paperbg.width/2 - descTxt.width/2;
		descTxt.y = nameTxt.y + 40;
		this._nodeContainer.addChild(descTxt);


		let clostBtn = ComponentManager.getButton( ButtonConst.POPUP_CLOSE_BTN_1,"",this.hide,this);
		clostBtn.x = GameConfig.stageWidth -clostBtn.width+15;
		clostBtn.y = decree_paper_open.y - clostBtn.height + 45;
		clostBtn.alpha = 0;
		// this._nodeRightContainer.addChild(clostBtn);
		
		let paperCfg = Config.PolicyCfg.getGovDecreeByType(paperIdx);
		let paperKeys = Object.keys(paperCfg);
		paperKeys.sort((dataA:any,dataB:any)=>{
			return dataA.sort - dataB.sort;
		});
		let leveeTime = Config.PolicyCfg.leveeTime;
		startY = decree_paper_open.y + 15;

		let isDissTime = false;
		// let deltaSec =  GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime);
		// if( deltaSec >= leveeTime[0] * 3600 && deltaSec <= leveeTime[1] * 3600 )
		if(Api.promoteVoApi.isDuringDiscussionTime())
		{
			isDissTime = true;
		}
		let leveeGemDiscount = Config.PolicyCfg.leveeGemDiscount;
		for (var index = 1; index <= paperKeys.length; index++) {
			let tmpcfg = paperCfg[paperKeys[index-1]];
			let paperbg = BaseBitmap.create("decree_paper_listbg");
			paperbg.x = decree_paper_open.x +  decree_paper_open.width/2 -paperbg.width/2 ;
			paperbg.y = startY ;
			this._nodeRightContainer.addChild(paperbg);
			paperbg.touchEnabled = true;
			paperbg.addTouchTap(this.PaperImgClickHandler,this,[tmpcfg.id]);

			let addTimes1 = tmpcfg.addTimes1;
			let addTimes2 = tmpcfg.addTimes2;
			let addExtent1 = String(tmpcfg.addExtent1*100);
			let addExtent2 = String(tmpcfg.addExtent2*100);
			if(isDissTime)
			{
				addExtent1 = String(tmpcfg.leveeTimeEff1*100);
				addExtent2 = String(tmpcfg.leveeTimeEff2*100);
			}

			let descTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			descTxt.multiline = true;
			descTxt.lineSpacing = 3;
			descTxt.width = paperbg.width - 60;
			descTxt.text = LanguageManager.getlocal("decreePaper_Desc" + paperIdx + "_1",[""+addTimes1,addExtent1]);
			descTxt.x = paperbg.x + 30;
			descTxt.y = paperbg.y + 15;
			this._nodeRightContainer.addChild(descTxt);

			let descTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			descTxt.multiline = true;
			descTxt2.lineSpacing = 3;
			descTxt2.width = paperbg.width - 60;
			descTxt2.text = LanguageManager.getlocal("decreePaper_Desc" + paperIdx + "_2",[""+addTimes2,addExtent2]);
			descTxt2.x = descTxt.x
			descTxt2.y = descTxt.y + 28;
			this._nodeRightContainer.addChild(descTxt2);

			let goldIcon =  BaseLoadBitmap.create("itemicon1");
			goldIcon.setScale(0.45);
			goldIcon.x = paperbg.x + 330;
			goldIcon.y = paperbg.y + paperbg.height-45;
			this._nodeRightContainer.addChild(goldIcon);
			
			let costStr = ""+tmpcfg.gdCost;
			if(tmpcfg.gdCost == 0)
			{
				costStr = LanguageManager.getlocal("sysFreeDesc");
			}

			let leveeTimeEff1 = String(tmpcfg.leveeTimeEff1 * 100);
			let costTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
			costTxt.text = costStr;
			costTxt.y =	goldIcon.y+14;
			this._nodeRightContainer.addChild(costTxt);
			if(isDissTime)
			{
				goldIcon.x = paperbg.x + 180;
				if(tmpcfg.gdCost == 0)
				{
					costTxt.text = costStr;
				}else{
					costTxt.text = LanguageManager.getlocal("decreePaperDetail_costTxt",[costStr,String(tmpcfg.gdCost -leveeGemDiscount*tmpcfg.gdCost) ]);
				}
			}
			costTxt.x = goldIcon.x + 45;
			

			let arrowImg = BaseBitmap.create("decree_arrow2");
			arrowImg.x = paperbg.x +  paperbg.width -arrowImg.width - 10;
			arrowImg.y = paperbg.y + paperbg.height/2 - arrowImg.height/2;
			this._nodeRightContainer.addChild(arrowImg);

			startY += paperbg.height+3;
		}

		let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW);
		var time1  =  App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[0]).hour; 
		var time2  =  App.DateUtil.formatSvrHourByLocalTimeZone(leveeTime[1]).hour;   
		tipTxt.text = LanguageManager.getlocal("decreePaperTipTxt",[""+time1,""+time2]);
		tipTxt.anchorOffsetX = tipTxt.width/2;
		tipTxt.x = GameConfig.stageWidth/2;
		tipTxt.y =GameConfig.stageHeigth - 50;
		this._nodeContainer.addChild(tipTxt);

		let tipTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW);
		if(isDissTime ){
			tipTxt2.text = LanguageManager.getlocal("decreePaperTipTxt2");
		}else{
			tipTxt2.text = LanguageManager.getlocal("decreePaperTipTxt3");
		}
		tipTxt2.anchorOffsetX = tipTxt2.width/2;
		tipTxt2.x = GameConfig.stageWidth/2;
		tipTxt2.y = paperbg.y + paperbg.height ;
		this._nodeContainer.addChild(tipTxt2);

		this._nodeRightContainer.addChild(clostBtn);
		
		let moveT = 1000;
		egret.Tween.get(this._nodeRightContainer,{loop:false}).to({x:0},moveT);
		egret.Tween.get(clostBtn,{loop:false}).wait(moveT).to({alpha:1},300);
    }

	protected PaperImgClickHandler(obj:any,param:number)
	{
		let isInDuss = Api.promoteVoApi.isDuringDiscussionTime();
		if(!isInDuss)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERCHOOSEPOPUPVIEW,{gdid:param});
			return;
		}
		this._selGdid = ""+param;
		let gdCfg = Config.PolicyCfg.getGovDecreeById(""+param);
		let costGold = gdCfg.gdCost;
		let leveeGemDiscount = Config.PolicyCfg.leveeGemDiscount;
		if(isInDuss)
		{
			costGold = Math.ceil(leveeGemDiscount * costGold);
		}
		if(costGold > Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("decreePaperSetNotEnoughTip"));
			return;
		}
		let costStr = ""+costGold;
		if(costGold == 0)
		{
			costStr = LanguageManager.getlocal("sysFreeDesc");
		}
		let gdName = LanguageManager.getlocal("decreePaper_Name"+gdCfg.type) +"-" + LanguageManager.getlocal("decreePaper_subName"+gdCfg.sort);
		let mesObj = {
			confirmCallback: this.doChangeRequest,
			handler : this, 
			icon : "itemicon1",
			iconBg:"itembg_1", 
			num: Api.playerVoApi.getPlayerGem(), 
			msg: LanguageManager.getlocal("decreeChooseTxt1",[costStr,gdName]),
			id : 1,
			useNum : costGold,
			linespacing : 6,
			height : 250
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
		
	}
	protected doChangeRequest()
	{
		let gdCfg = Config.PolicyCfg.getGovDecreeById(this._selGdid);
		NetManager.request(NetRequestConst.REQUEST_POLICY_SETGD,{gdid:this._selGdid,gdtype:gdCfg.type});
	}
	protected isetGDCallback(event:egret.Event)
    {
        if(event && event.data && event.data.ret)
        {
			let rData = event.data.data;
			App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_setSuccessTip"));
			ViewController.getInstance().openView(ViewConst.POPUP.DECREEPAPERDETAILPOPUPVIEW);
			ViewController.getInstance().hideView(ViewConst.BASE.DECREEPAPERVIEW);
			this.hide();
		}
		else{
			// App.CommonUtil.showTip(LanguageManager.getlocal("decree_paper_setFailedTip"));
			// return;
		}
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_paper2","decree_paper_open","decree_book","decree_paper_listbg","decree_arrow2",
		]);
	}
	protected getTitleStr():string
	{
		return "";
	}
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETGD),this.isetGDCallback,this);
		this._nodeContainer = null;
		this._selGdid = "";
		this._nodeRightContainer = null;

		super.dispose();
	}
}