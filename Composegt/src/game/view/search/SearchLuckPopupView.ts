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

	protected isHaveTitle():boolean
	{
		return true;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			// "progress_type1_bg","progress_type1_yellow",
			"progress_type1_yellow2","progress_type3_bg",
			"searchluckicon"
		]);
	}
	protected initView():void
	{
		let resArr:number[]=[ItemEnums.gold,ItemEnums.food,ItemEnums.gem];
		
		// let titleBg = BaseBitmap.create("public_tc_bg02");
		// titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
		// titleBg.y = 10;
		// this.addChildToContainer(titleBg);

		for(let i:number=0;i<3;i++)
		{
			let resBar:ResBar = ComponentManager.getResBar(resArr[i],true,175);
			// resBar.setPosition(20+i*(resBar.width+5),15);
			resBar.x = 40+i*(resBar.width+2);
			resBar.y = 30;
			this.addChildToContainer(resBar);
		}

		let bg1:BaseBitmap=BaseBitmap.create("public_9v_bg12");
		bg1.width = 530;
		bg1.height = 684;
		bg1.x = (this.viewBg.width-bg1.width)/2;
		bg1.y = 75;
		this.addChildToContainer(bg1);

		// let innerBg = BaseBitmap.create("public_tc_bg03");
		// innerBg.width = 517;
		// innerBg.height = 115;
		// innerBg.x = this.viewBg.width/2 - innerBg.width/2;
		// innerBg.y = bg1.y + 10;
		// this.addChildToContainer(innerBg);

		// let innerLeftBg = BaseBitmap.create("public_left");
		// innerLeftBg.width = 130;
		// innerLeftBg.height = innerBg.height - 11;
		// innerLeftBg.x = innerBg.x + 5.5;
		// innerLeftBg.y = innerBg.y + 5.5;
		// this.addChildToContainer(innerLeftBg);


		let icon:BaseBitmap=BaseBitmap.create("searchluckicon");
		icon.setScale(0.73);
		icon.x = this.viewBg.width/2- icon.width * icon.scaleX / 2;
		icon.y = bg1.y + 10;
		this.addChildToContainer(icon);

		// let iconEffect:BaseBitmap=BaseBitmap.create("searchluckiconbg");
		// iconEffect.anchorOffsetX=iconEffect.width/2;
		// iconEffect.anchorOffsetY=iconEffect.height/2;
		// egret.Tween.get(iconEffect,{loop:true}).to({rotation:360},8000);
		// iconEffect.setPosition(icon.x+icon.width/2-0.5,icon.y+icon.height/2-3);
		// this.addChildToContainer(iconEffect);
		//App.StringUtil.formatStringColor(Api.searchVoApi.getDonateCost(type).toString(),color);


		let luckProgress:ProgressBar=ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",340);
		// luckProgress.setTextSize(10);	
		luckProgress.x = this.viewBg.width/2 - luckProgress.width/2;
		luckProgress.y = icon.y + icon.height*icon.scaleY + 3;
		this.addChildToContainer(luckProgress);
		
		let value:number=Api.searchVoApi.getCurLuckNum()/Api.searchVoApi.getMaxLuckNum();
		luckProgress.setPercentage(value);
	
		this._luckProgress=luckProgress;


		let curTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckcurNum",[String(Api.searchVoApi.getCurLuckNum())]),14,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		curTxt.x = luckProgress.x + luckProgress.width/2 - curTxt.width/2;
		curTxt.y = luckProgress.y + luckProgress.height/2 - curTxt.height/2;
		this.addChildToContainer(curTxt);
		this._curTxt=curTxt;


		let luckDesc:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN_NEW);
		luckDesc.x = luckProgress.x + luckProgress.width/2 - luckDesc.width/2;
		luckDesc.y = luckProgress.y + luckProgress.height + 5;
		this.addChildToContainer(luckDesc);

		// let bg2:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		// bg2.width=bg1.width;
		// bg2.height=105;
		// bg2.setPosition(bg1.x,bg1.y+bg1.height+5);
		// this.addChildToContainer(bg2);

		// if(!PlatformManager.checkIsViSp()){
		// 	let autoLuckTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonate"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		// 	autoLuckTxt.lineSpacing=2;
		// 	autoLuckTxt.width=TextFieldConst.FONTSIZE_CONTENT_SMALL+4;
		// 	autoLuckTxt.setPosition(innerBg.x + 15,innerBg.y + innerBg.height + 10);
		// 	this.addChildToContainer(autoLuckTxt);
		// }



		let types:string[]=Api.searchVoApi.getDonateTypes();
		let l:number=types.length;
		let itemsH:number=0;
		for(let i:number=0;i<l;i++)
		{
			let item:SearchLuckDonateItem=new SearchLuckDonateItem(i,this.donateHandler,this);
			// item.setPosition(bg3.x+(bg3.width-item.width)/2,bg3.y+ 10 +(item.height+5)*i)
			item.x = this.viewBg.width/2 - item.width/2;
			item.y = luckDesc.y + luckDesc.height + (item.height+5)*i + 8;
			this.addChildToContainer(item);
			itemsH+=item.height;
			this._itemList.push(item);
		}
		// bg3.height=10+itemsH+5;

		// let line = BaseBitmap.create("public_line4");
		// line.width = 500;
		// line.x = this.viewBg.width/2 - line.width/2;
		// line.y = luckDesc.y + luckDesc.height + 2;
		// this.addChildToContainer(line);





		let selectBox:CheckBox=ComponentManager.getCheckBox();
		// selectBox.setPosition(addBtn.x+addBtn.width+25,innerBg.y + innerBg.height + 10);
		selectBox.x = bg1.x + 366;
		selectBox.y = luckDesc.y + luckDesc.height + 85;
		this.addChildToContainer(selectBox);
		selectBox.setSelected(Boolean(Api.searchVoApi.getGoldOpen()));
		this._goldCheckBox=selectBox;

		let select1Txt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateFood"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		select1Txt.setPosition(selectBox.x+selectBox.width+5,selectBox.y+(selectBox.height-select1Txt.height)/2);
		this.addChildToContainer(select1Txt);

		let select2Box:CheckBox=ComponentManager.getCheckBox();
		// select2Box.setPosition(selectBox.x,selectBox.y+selectBox.height+10);

		select2Box.x = bg1.x + 366;
		select2Box.y = luckDesc.y + luckDesc.height + 220;
		this.addChildToContainer(select2Box);
		select2Box.setSelected(Boolean(Api.searchVoApi.getFoodOpen()));
		this._foodCheckBox=select2Box;
		let select2Txt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckAutoDonateGold"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		select2Txt.setPosition(select1Txt.x,select2Box.y+(select2Box.height-select2Txt.height)/2);
		this.addChildToContainer(select2Txt);
		
		let searchLuckFreeLocalStr:string=Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).searchLuckFreeLocalStr;

		let changeLuckTxt:BaseTextField=ComponentManager.getTextField(searchLuckFreeLocalStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		// changeLuckTxt.setPosition(innerBg.x+innerBg.width-changeLuckTxt.width,innerBg.y+innerBg.height+5);
		changeLuckTxt.textAlign = egret.HorizontalAlign.CENTER;
		changeLuckTxt.x = bg1.x + 366 + 60 - changeLuckTxt.width/2 ;
		changeLuckTxt.y = luckDesc.y + luckDesc.height + 353;
		this.addChildToContainer(changeLuckTxt);


		let line = BaseBitmap.create("public_line4");
		line.width = 502;
		line.x = this.viewBg.width/2 - line.width/2;
		line.y = luckDesc.y + luckDesc.height + 400;
		this.addChildToContainer(line);

		//	设置
		let numBg:BaseBitmap=BaseBitmap.create("public_tc_srkbg06");//
		
		numBg.width = 140;
		numBg.height = 36;
		numBg.setPosition(this.viewBg.width/2 - numBg.width/2,line.y + line.height + 10);
		this.addChildToContainer(numBg);

		if(!this._curShowNum)
		{
			this._curShowNum=Api.searchVoApi.getAutosetValue();
		}
		let numTxt:BaseTextField=ComponentManager.getTextField(String(this._curShowNum),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		numTxt.textAlign=egret.HorizontalAlign.CENTER;
		numTxt.setPosition(numBg.x+(numBg.width-numTxt.width)/2,numBg.y+(numBg.height-numTxt.height)/2);
		numTxt.name="numTxt";
		this.addChildToContainer(numTxt);
		this._numTxt=numTxt;


		let reduceBtn:BaseButton = ComponentManager.getButton("btn_jian","",this.checkNumBtnHandler,this,[-1]);
		reduceBtn.setPosition(numBg.x-reduceBtn.width - 5,numBg.y+(numBg.height-reduceBtn.height)/2);
		this.addChildToContainer(reduceBtn);

		let addBtn=ComponentManager.getButton("btn_jia","",this.checkNumBtnHandler,this,[1]);
		addBtn.setPosition(numBg.x+numBg.width + 5,reduceBtn.y);
		this.addChildToContainer(addBtn);


		let luckSetTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckSetNumDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		luckSetTxt.x = this.viewBg.width/2 - luckSetTxt.width/2;
		luckSetTxt.y = addBtn.y + addBtn.height + 10;
		this.addChildToContainer(luckSetTxt);
		// let bg3:BaseBitmap=BaseBitmap.create("public_tc_bg01");
		// bg3.width=bg1.width;
		// bg3.height=421;
		// bg3.setPosition(bg1.x,changeLuckTxt.y + changeLuckTxt.height + 10);
		// this.addChildToContainer(bg3);

		// let types:string[]=Api.searchVoApi.getDonateTypes();
		// let l:number=types.length;
		// let itemsH:number=0;
		// for(let i:number=0;i<l;i++)
		// {
		// 	let item:SearchLuckDonateItem=new SearchLuckDonateItem(i,this.donateHandler,this);
		// 	item.setPosition(bg3.x+(bg3.width-item.width)/2,bg3.y+ 10 +(item.height+5)*i)
		// 	this.addChildToContainer(item);
		// 	itemsH+=item.height+5;
		// 	this._itemList.push(item);
		// }
		// bg3.height=10+itemsH+5;
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
			this._curTxt.text=LanguageManager.getlocal("searchLuckcurNum",[String(Api.searchVoApi.getCurLuckNum())]);//LanguageManager.getlocal("searchLuckcurNum")+Api.searchVoApi.getCurLuckNum();

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

	public dispose():void
	{
		Api.rookieVoApi.checkNextStep();
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
				this.request(NetRequestConst.REQUEST_SEARCH_SET,{luckynum:this._curShowNum,foodopen:foodOpen,goldopen:goldOpen})
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
		let bg:BaseBitmap=BaseBitmap.create("public_line4");
		bg.width=502;
		bg.y = -bg.height/2;
		// bg.height=130
		this.height = 130;
		this.addChild(bg);

		// let leftBg = BaseBitmap.create("public_left");
		// leftBg.x = bg.x + 5.5;
		// leftBg.y = bg.y + 5.5;
		// leftBg.width =  135;
		// leftBg.height = bg.height - 11 - 5 - 2.5;
		// this.addChild(leftBg);

        // let nameBg = BaseBitmap.create("public_biaoti2");
        // nameBg.x = leftBg.x + leftBg.width + 7;
        // nameBg.y = leftBg.y + 8 ;
		// this.addChild(nameBg);

		let type:string = Api.searchVoApi.getDonateTypes()[this._index];
		let icon:BaseDisplayObjectContainer = GameData.getRewardItemIconByIdAndType(ItemEnums[type]);
		// icon.setPosition(20,leftBg.y+(leftBg.height-icon.height)/2);
		icon.x = 20;
		icon.y = this.height/2 - icon.height/2;
		this.addChild(icon);
		let itemVo:RewardItemVo=<RewardItemVo>icon.bindData;

		let txtSpaceY:number=10;
		let titleTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckDonateTypeDesc",[itemVo.name]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		
		// nameBg.width = titleTxt.width + 70;

		titleTxt.x = 133;   //nameBg.x + nameBg.width / 2 - titleTxt.width / 2;//setPosition(icon.x+icon.width+5,icon.y+txtSpaceY);
		titleTxt.y = 20;    //nameBg.y + nameBg.height/ 2 - titleTxt.height / 2;
		this.addChild(titleTxt);

		let donateNumTxt:BaseTextField=ComponentManager.getTextField(this.getDonateNumDesc(type),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		donateNumTxt.setPosition(titleTxt.x,titleTxt.y+titleTxt.height+txtSpaceY);
		this.addChild(donateNumTxt);
		this._donateNumTxt=donateNumTxt;

		let addValue:number=Config.SearchbaseCfg.resAddLuck;
		if(type=="gem")
		{
			addValue=Config.SearchbaseCfg.gemAddLuck;
		}
		let luckEffectTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("searchLuckEffectDesc",[LanguageManager.getlocal("searchLuck")+"+"+addValue]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		luckEffectTxt.setPosition(donateNumTxt.x,donateNumTxt.y+donateNumTxt.height+txtSpaceY);
		this.addChild(luckEffectTxt);

		let donateBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"searchLuckDonateBtn",this.donateHandler,this);
		donateBtn.setPosition(352,20);
		this.addChild(donateBtn);
		this._donateBtn=donateBtn;

	}

	private getDonateNumDesc(type):string
	{
		let color:number=TextFieldConst.COLOR_BROWN_NEW;
		let costStr:string;
		if(type==ItemEnums[RewardItemConst.TYPE_GEM]&&Api.searchVoApi.getSearchLuckFreeNum()>0)
		{
			costStr=LanguageManager.getlocal("sysFreeDesc");
		}
		else
		{
			if(!Api.searchVoApi.checkCostEnough(type))
			{
				color=TextFieldConst.COLOR_WARN_RED_NEW;
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
	protected isShowOpenAni():boolean
	{
		return false;
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