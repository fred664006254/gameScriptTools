class SearchLuckPopupView extends PopupView
{
	private _curShowNum:number;
	private _luckProgress:ProgressBar;
	private _itemList:SearchLuckDonateItem[]=[];
	private _numTxt:BaseTextField;
	private _goldCheckBox:CheckBox;
	private _foodCheckBox:CheckBox;
	private _curTxt:BaseTextField;
	public constructor() 
	{
		super();
	}

	protected isShowOpenAni():boolean
	{	
		if (Api.rookieVoApi.isGuiding)
		{
			return false;
		}
		return true;
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"progress3"
		]);
	}
	/**
	 * 需要屏蔽的cn字库
	 */
	public shieldCn():boolean
	{
		return PlatformManager.checkIsThSp()||PlatformManager.checkIsEnLang();
	}
	protected initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		let resArr:number[]=[ItemEnums.gold,ItemEnums.food,ItemEnums.gem];
		for(let i:number=0;i<3;i++)
		{
			let resBar:ResBar = ComponentManager.getResBar(resArr[i],true,175);
			resBar.setPosition(20+i*(resBar.width+5)+GameData.popupviewOffsetX,5);
			this.addChildToContainer(resBar);
		}
		let bg1:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		bg1.width=this.viewBg.width-40-GameData.popupviewOffsetX*2;
		bg1.height=151;
		bg1.setPosition((this.viewBg.width-bg1.width)/2,55);
		this.addChildToContainer(bg1);

		let icon:BaseBitmap=BaseBitmap.create("searchluckicon");
		icon.setPosition(bg1.x+5+GameData.popupviewOffsetX,bg1.y+(bg1.height-icon.height)/2);
		this.addChildToContainer(icon);

		let iconEffect:BaseBitmap=BaseBitmap.create("searchluckiconbg");
		iconEffect.anchorOffsetX=iconEffect.width/2;
		iconEffect.anchorOffsetY=iconEffect.height/2;
		egret.Tween.get(iconEffect,{loop:true}).to({rotation:360},8000);
		iconEffect.setPosition(icon.x+icon.width/2-0.5,icon.y+icon.height/2-3);
		this.addChildToContainer(iconEffect);

		let curTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckcurNum")+Api.searchVoApi.getCurLuckNum(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		curTxt.setPosition(icon.x+icon.width+10,icon.y+20);
		this.addChildToContainer(curTxt);
		this._curTxt=curTxt;

		let luckProgress:ProgressBar=ComponentManager.getProgressBar("progress3","progress3_bg",300);
		luckProgress.setPosition(curTxt.x,curTxt.y+curTxt.height+10);
		this.addChildToContainer(luckProgress);
		let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
		luckProgress.setPercentage(value);
		this._luckProgress=luckProgress;

		let luckDesc:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		luckDesc.setPosition(curTxt.x,luckProgress.y+luckProgress.height+20);
		this.addChildToContainer(luckDesc);

		let bg2:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		bg2.width=bg1.width;
		bg2.height=105;
		bg2.setPosition(bg1.x,bg1.y+bg1.height+5);
		this.addChildToContainer(bg2);
		
		let autoLuckTxt:BaseTextField=null;
		if(this.shieldCn()){
			autoLuckTxt=ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);

		} else {
			autoLuckTxt=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonate"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);

		}
		autoLuckTxt.lineSpacing=2;
		autoLuckTxt.width=TextFieldConst.FONTSIZE_CONTENT_SMALL+4;
		autoLuckTxt.setPosition(bg2.x+15,bg2.y+(bg2.height-autoLuckTxt.height)/2);
		this.addChildToContainer(autoLuckTxt);

		let luckSetTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckSetNumDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		let numBg:BaseBitmap=BaseBitmap.create("public_9_bg5");
		numBg.width=100;
		numBg.setPosition(120+GameData.popupviewOffsetX,bg2.y+bg2.height-numBg.height-20);
		this.addChildToContainer(numBg);

		if(!this._curShowNum)
		{
			this._curShowNum=Api.searchVoApi.getAutosetValue();
		}
		let numTxt:BaseTextField=ComponentManager.getTextField(String(this._curShowNum),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WHITE);
		numTxt.textAlign=egret.HorizontalAlign.CENTER;
		numTxt.setPosition(numBg.x+(numBg.width-numTxt.width)/2,numBg.y+(numBg.height-numTxt.height)/2);
		numTxt.name="numTxt";
		this.addChildToContainer(numTxt);
		this._numTxt=numTxt;

		luckSetTxt.setPosition(numBg.x+(numBg.width-luckSetTxt.width)/2,numBg.y-luckSetTxt.height-5);
		this.addChildToContainer(luckSetTxt);

		let reduceBtn:BaseButton = ComponentManager.getButton("button_del1","",this.checkNumBtnHandler,this,[-1]);
		reduceBtn.setPosition(numBg.x-reduceBtn.width - 8,numBg.y+(numBg.height-reduceBtn.height)/2);
		this.addChildToContainer(reduceBtn);

		let addBtn=ComponentManager.getButton("button_add1","",this.checkNumBtnHandler,this,[1]);
		addBtn.setPosition(numBg.x+numBg.width + 8,reduceBtn.y);
		this.addChildToContainer(addBtn);

		let selectBox:CheckBox=ComponentManager.getCheckBox();
		selectBox.setPosition(addBtn.x+addBtn.width+40,bg2.y+10);
		this.addChildToContainer(selectBox);
		selectBox.setSelected(Boolean(Api.searchVoApi.getGoldOpen()));
		this._goldCheckBox=selectBox;
		let select1Txt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateFood"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		select1Txt.setPosition(selectBox.x+selectBox.width+5,selectBox.y+(selectBox.height-select1Txt.height)/2);
		this.addChildToContainer(select1Txt);

		let select2Box:CheckBox=ComponentManager.getCheckBox();
		select2Box.setPosition(selectBox.x,selectBox.y+selectBox.height+10);
		this.addChildToContainer(select2Box);
		select2Box.setSelected(Boolean(Api.searchVoApi.getFoodOpen()));
		this._foodCheckBox=select2Box;
		let select2Txt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateGold"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		select2Txt.setPosition(select1Txt.x,select2Box.y+(select2Box.height-select2Txt.height)/2);
		this.addChildToContainer(select2Txt);
		
		let searchLuckFreeLocalStr:string=Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).searchLuckFreeLocalStr;
		let changeLuckTxt:BaseTextField=ComponentManager.getTextField(searchLuckFreeLocalStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		changeLuckTxt.setPosition(bg2.x+bg2.width-changeLuckTxt.width,bg2.y+bg2.height+5);
		this.addChildToContainer(changeLuckTxt);

		let bg3:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		bg3.width=bg1.width;
		bg3.height=406;
		bg3.setPosition(bg1.x,changeLuckTxt.y+changeLuckTxt.height+5);
		this.addChildToContainer(bg3);

		let types:string[]=Api.searchVoApi.getDonateTypes();
		let l:number=types.length;
		let itemsH:number=0;
		for(let i:number=0;i<l;i++)
		{
			let item:SearchLuckDonateItem=new SearchLuckDonateItem(i,this.donateHandler,this);
			item.setPosition(bg3.x+(bg3.width-item.width)/2,bg3.y+5+(item.height+3)*i)
			this.addChildToContainer(item);
			itemsH+=item.height+3;
			this._itemList.push(item);
		}
		bg3.height=5+itemsH+5;
	}

	private _lastDonateIndex:number=-1;
	private donateHandler(index:number):void
	{
		this._lastDonateIndex=index;
		this.request(NetRequestConst.REQUEST_SEARCH_BUY,{useflag:index+1});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(!data.ret)
		{
			return;
		}
		if(NetRequestConst.REQUEST_SEARCH_BUY)
		{
			if(this._itemList)
			{
				let l:number=this._itemList.length;
				for(let i:number=0;i<l;i++)
				{
					this._itemList[i].refresh();
				}
				if(this._lastDonateIndex>-1)
				{
					this._itemList[this._lastDonateIndex].showRewardTip();
				}
			}
			this._curTxt.text=LanguageManager.getlocal("searchLuckcurNum")+Api.searchVoApi.getCurLuckNum();

			egret.Tween.removeTweens(this._luckProgress);
			let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
			egret.Tween.get(this._luckProgress).to({percent:value},200);
		}
	}

	private checkNumBtnHandler(valueNum:number):void
	{
		if(this._numTxt)
		{
			let num:number=Number(this._numTxt.text);
			num+=valueNum;
			if(num>Config.SearchbaseCfg.resAddMax)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("searchLuckAutoMaxNumDesc",[Config.SearchbaseCfg.resAddMax.toString()]));
			}
			num=Math.max(1,Math.min(Config.SearchbaseCfg.resAddMax,num));
			this._numTxt.text=String(num);
			this._curShowNum=num;
		}
	}

	protected getTitleStr():string
	{
		return "searchLuck";
	}

	private doGuide()
    {
       this.hide();
    }

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		if(this._curShowNum)
		{
			let isChange:boolean=false;
			if(Api.searchVoApi.getAutosetValue()!=this._curShowNum)
			{
				isChange=true;
			}
			let foodOpen:number=this._foodCheckBox.checkSelected()?1:0;
			if(foodOpen!=Api.searchVoApi.getFoodOpen())
			{
				isChange=true;
			}
			let goldOpen:number=this._goldCheckBox.checkSelected()?1:0;
			if(goldOpen!=Api.searchVoApi.getGoldOpen())
			{
				isChange=true;
			}
			if(isChange)
			{
				this.request(NetRequestConst.REQUEST_SEARCH_SET,{luckynum:this._curShowNum,foodopen:foodOpen,goldopen:goldOpen});
			}
		}
		this._curShowNum=NaN;
		this._luckProgress=null;
		this._itemList.length=0;
		this._goldCheckBox=null;
		this._foodCheckBox=null;
		this._curTxt=null;
		super.dispose();
	}
}

class SearchLuckDonateItem extends BaseDisplayObjectContainer
{
	private _index:number;
	private _donateHandler:Function;
	private _donateThisObj:any;
	private _donateNumTxt:BaseTextField;
	private _donateBtn:BaseButton;
	public constructor(index:number,donateHandler:Function,donateThisObj:any)
	{
		super()
		this._index=index;
		this._donateHandler=donateHandler;
		this._donateThisObj=donateThisObj;
		this.init();
	}

	private init():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg14");
		bg.width=520;
		bg.height=128
		this.addChild(bg);

		let type:string = Api.searchVoApi.getDonateTypes()[this._index];
		let icon:BaseDisplayObjectContainer = GameData.getRewardItemIconByIdAndType(ItemEnums[type]);
		icon.setPosition(20,bg.y+(bg.height-icon.height)/2);
		this.addChild(icon);
		let itemVo:RewardItemVo=<RewardItemVo>icon.bindData;

		let txtSpaceY:number=10;
		let titleTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDonateTypeDesc",[itemVo.name]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		titleTxt.setPosition(icon.x+icon.width+5,icon.y+txtSpaceY);
		this.addChild(titleTxt);

		let donateNumTxt:BaseTextField=ComponentManager.getTextField(this.getDonateNumDesc(type),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		donateNumTxt.setPosition(titleTxt.x,titleTxt.y+titleTxt.height+txtSpaceY);
		this.addChild(donateNumTxt);
		this._donateNumTxt=donateNumTxt;

		let addValue:number=Config.SearchbaseCfg.resAddLuck;
		if(type=="gem")
		{
			addValue=Config.SearchbaseCfg.gemAddLuck;
		}
		let luckEffectTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckEffectDesc",[LanguageManager.getlocal("searchLuck")+"+"+addValue]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		luckEffectTxt.setPosition(donateNumTxt.x,donateNumTxt.y+donateNumTxt.height+txtSpaceY);
		this.addChild(luckEffectTxt);

		let donateBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"searchLuckDonateBtn",this.donateHandler,this);
		donateBtn.setPosition(bg.x+bg.width-donateBtn.width-20,bg.y+(bg.height-donateBtn.height)/2);
		this.addChild(donateBtn);
		this._donateBtn=donateBtn;

	}

	private getDonateNumDesc(type):string
	{
		let color:number=TextFieldConst.COLOR_BLACK;
		let costStr:string;
		if(type==ItemEnums[RewardItemConst.TYPE_GEM]&&Api.searchVoApi.getSearchLuckFreeNum()>0)
		{
			costStr=LanguageManager.getlocal("sysFreeDesc");
		}
		else
		{
			if(!Api.searchVoApi.checkCostEnough(type))
			{
				color=TextFieldConst.COLOR_WARN_RED2;
			}
			costStr=App.StringUtil.formatStringColor(Api.searchVoApi.getDonateCost(type).toString(),color);
		}
		let paramsArr:string[]=[Config.RewardCfg.getNameByTypeAndId(type),costStr];
		return LanguageManager.getlocal("searchLuckDonateNumDesc",paramsArr);
	}

	public refresh():void
	{
		let type:string = Api.searchVoApi.getDonateTypes()[this._index];
		if(this._donateNumTxt)
		{
			this._donateNumTxt.text=this.getDonateNumDesc(type);
		}

		if(this._donateBtn&&type==ItemEnums[RewardItemConst.TYPE_GEM])
		{
			this._donateBtn.setText("searchLuckDonateBtn");
		}
	}

	public showRewardTip():void
	{
		let type:string = Api.searchVoApi.getDonateTypes()[this._index];
		let addValue:number=Config.SearchbaseCfg.resAddLuck;
		if(type=="gem")
		{
			addValue=Config.SearchbaseCfg.gemAddLuck;
		}
		let pos:egret.Point=this.localToGlobal(this.width/2,this.height/2);
		App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("searchLuck")+"+"+addValue}],pos);	
	}

	private donateHandler():void
	{
		let type:string = Api.searchVoApi.getDonateTypes()[this._index];
		let addValue:number=Config.SearchbaseCfg.resAddLuck;
		if(type=="gem")
		{
			addValue=Config.SearchbaseCfg.gemAddLuck;
		}
		if(Api.searchVoApi.getCurLuckNum()>=Api.searchVoApi.getMaxLuckByType(type))
		{
			let tipStr:string;
			if(type=="gem")
			{
				tipStr=LanguageManager.getlocal("searchLuckGemMaxDesc");
			}
			else
			{
				tipStr=LanguageManager.getlocal("searchLuckResMaxDesc");
			}
			App.CommonUtil.showTip(tipStr);
		}
		else
		{
			if(type==ItemEnums[RewardItemConst.TYPE_GEM]&&Api.searchVoApi.getSearchLuckFreeNum()>0)
			{
				this.confirmDonateHandler();
			}
			else
			{
				if(Api.searchVoApi.checkCostEnough(type,true))
				{
					if(type==ItemEnums[RewardItemConst.TYPE_GEM])
					{
						let gem = Api.playerVoApi.getPlayerGem();
						let needGem = Api.searchVoApi.getDonateCost(type)
						let message:string = LanguageManager.getlocal("useItemGemConfirmDesc",[App.StringUtil.toString(needGem)+Config.RewardCfg.getNameByTypeAndId(type)]);
						ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:this.confirmDonateHandler,handler:this,icon:Config.RewardCfg.getIconByTypeAndId(type),iconBg: "itembg_1",num:gem,msg:message, id : 1});
					}
					else
					{
						this.confirmDonateHandler();
					}
				}
			}
		}
	}

	private confirmDonateHandler():void
	{
		if(this._donateHandler)
		{
			this._donateHandler.call(this._donateThisObj,this._index);
		}
	}
	public dispose():void
	{	
	
		this._donateHandler=null;
		this._donateThisObj=null;
		this._donateNumTxt=null;
		this._index=NaN;
		this._donateBtn=null;
		super.dispose();
	}
}