class ComposeMultiPopupView extends PopupView
{
	private _itemCfg:Config.ComposeItemCfg;
	private _numTxtArr:BaseTextField[]=[];
	private _leftTimeTxt:BaseTextField;
	private _composeLimitTxt:BaseTextField;
	private _dragProgressBar : DragProgressBar = null;
	private _numTxt:BaseTextField=null;
	private _numBg:BaseBitmap=null;
	private _curNum=0;

	public constructor()
	{
		super();
	}

	protected getBgName():string{
		return `popupview_bg3`;
	}

	protected initView():void
	{
		this._itemCfg=Config.ComposeCfg.getItemCfgById(this.getId(),Api.itemVoApi.getComposeVersion());

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg93");
		bg.width=530;
		//bg.height=292;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this.addChildToContainer(bg);
		
		let txtBg:BaseBitmap = BaseBitmap.create("public_9_bg94");
		txtBg.width = 510;
		// txtBg.height = 142;
		txtBg.setPosition(bg.x+(bg.width-txtBg.width)/2,bg.y+10);
		this.addChildToContainer(txtBg);

		let icon:BaseDisplayObjectContainer=this._itemCfg.getIconContainer();
		icon.setPosition(txtBg.x+10,txtBg.y+10);
		this.addChildToContainer(icon);
		txtBg.height = icon.y + icon.height + 15 - txtBg.y;

		//public_titlebg
		let namebg = BaseBitmap.create(`public_titlebg`);
		namebg.setPosition(icon.x+icon.width+10,icon.y);
		this.addChildToContainer(namebg);

		let nameTxt:BaseTextField=ComponentManager.getTextField(this._itemCfg.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, namebg, [10,0]);
		this.addChildToContainer(nameTxt);

		let offY:number=nameTxt.y+nameTxt.height;

		let descTxt:BaseTextField=ComponentManager.getTextField((LanguageManager.getlocal("effectTitle")+this._itemCfg.desc),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		descTxt.lineSpacing=2;//this._itemCfg.getDescTxt(true);
		descTxt.width=txtBg.width-icon.x+txtBg.x-icon.width-10-10;
		descTxt.setPosition(nameTxt.x,offY+10);
		this.addChildToContainer(descTxt);
		txtBg.height = Math.max(descTxt.y + descTxt.textHeight + 15 - txtBg.y,txtBg.height);
		
		let composeUseTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_BLACK);
		composeUseTxt.setPosition(icon.x,txtBg.y+txtBg.height+15);
		this.addChildToContainer(composeUseTxt);

		let line = BaseBitmap.create("public_cut_line");
		this.addChildToContainer(line);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, bg, [0,65]);

		let needItemCfgList:Config.ItemItemCfg[]=this._itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		for(let i:number=0;i<l;i++)
		{
			let icon:BaseDisplayObjectContainer = needItemCfgList[i].getIconContainer(true);
			icon.setPosition(composeUseTxt.x+15+(icon.width+5)*i,composeUseTxt.y+composeUseTxt.height+10);
			this.addChildToContainer(icon);
			icon.name = `icon${i}`;

			let num:number=Api.itemVoApi.getItemNumInfoVoById(needItemCfgList[i].id);
			let numTxt:BaseTextField=ComponentManager.getTextField(this.getComposeItemNumLocalStr(needItemCfgList[i].id),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// numTxt.width=icon.width+10;
			if(numTxt.width>icon.width+10)
			{
				numTxt.scaleX=(icon.width+10)/numTxt.width;
			}
			numTxt.textAlign=egret.HorizontalAlign.CENTER;
			numTxt.setPosition(icon.x+(icon.width-numTxt.width*numTxt.scaleX)/2,icon.y+icon.height+2);
			numTxt.bindData=needItemCfgList[i].id;
			this.addChildToContainer(numTxt);
			this._numTxtArr.push(numTxt);
			if(i == l - 1){
				line.y = numTxt.y + numTxt.textHeight + 5;
			}
		}

		// if(i == l - 1){
		// 	bg.height = numTxt.y + numTxt.textHeight + 10 - bg.y;
		// }
		let needId = this._itemCfg.needItemCfgList[0].id;
		let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(needId);
		let needNum:number=this._itemCfg.getNeedItemNumById(needId);
		let maxNum = Math.min(Math.floor(ownNum/needNum), 100);
		let minNum = maxNum == 0 ? 0 : 1;
		this._curNum = minNum;
		let dragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg", maxNum, this.dragCallback, this, null, 1, 285);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, line, [-5,line.height+10]);
		dragProgressBar.anchorOffsetX = -41;
		dragProgressBar.setDragPercent(1, maxNum, minNum);
		this.addChildToContainer(dragProgressBar);
		if(maxNum == 0){
			dragProgressBar.touchEnabled = false;
			dragProgressBar.touchChildren = false;
		}

		let numBg = BaseBitmap.create("public_9_bg5");
		this.addChildToContainer(numBg);
		this._numBg = numBg;

		let numStr = `${minNum}/<font color=0xffffff>${maxNum}</font>`;
		let selectedNumTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		this.addChildToContainer(selectedNumTF);
		this._numTxt = selectedNumTF;

		numBg.width = selectedNumTF.textWidth + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numBg, dragProgressBar, [350,-5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectedNumTF, numBg);	

		this.addChildToContainer(dragProgressBar);
		this._dragProgressBar = dragProgressBar;

		bg.height = dragProgressBar.y + dragProgressBar.height + 20 - bg.y;
		
		let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"composeBtn",this.composeHandler,this);
		composeBtn.setPosition(bg.x+(bg.width-composeBtn.width)/2,bg.y+bg.height+5);
		this.addChildToContainer(composeBtn);
	}

	private dragCallback(curNum:number):void{
		let view = this;
		view._curNum = curNum;
		view.refresh(true);
		// let needId = this._itemCfg.needItemCfgList[0].id;
		// let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(needId);
		// let needNum:number=this._itemCfg.getNeedItemNumById(needId);
		// let maxNum = Math.floor(ownNum/needNum);
		// let minNum = maxNum == 0 ? 0 : 1;
		// view._dragProgressBar.setDragPercent(curNum,maxNum,minNum);
		// // view._gemNumBitMapTxt.text = (curNum * param).toString();
		// let numStr = `${curNum}/<font color=0xffffff>${maxNum}</font>`;
		// view._numTxt.text = numStr;
		// view._numBg.width = view._numTxt.textWidth + 30;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._numBg, view._dragProgressBar, [350,-5]);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._numTxt, view._numBg);
	}

	private composeHandler():void
	{
		let needItemNameStr:string=this.checkNeedItemName();
		if(needItemNameStr || this._curNum == 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("resNotEnoughDesc",[needItemNameStr]));
			return;
		}
		else
		{
			if(this._itemCfg.composeLimit)
			{
				if(Api.itemVoApi.getComposeNumById(this._itemCfg.id)>=this._itemCfg.composeLimit)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxNumDesc"));
					return;
				}
			}
			if(this._itemCfg.timeLimit)
			{
				let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
				if(leftTime<=0)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("composeLimitTimeEndDesc"));
					return;
				}
			}
			let version = Api.itemVoApi.getComposeVersion();
			this.request(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,{version:version,composeid:this._itemCfg.id, num : this._curNum});
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret)
		{
			if(data.data.data.rewards)
			{
				App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.data.data.rewards));
			}
			App.MessageHelper.dispatchNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE+this._itemCfg.id);
			this.refresh();
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,{});
		}
	}

	private refresh(bool : boolean = false):void
	{
		if(this._numTxtArr)
		{
			let l:number=this._numTxtArr.length;
			for(let i:number=0;i<l;i++)
			{
				let numTxt = this._numTxtArr[i];
				let icon =this.container.getChildByName(`icon${i}`);
				numTxt.text=this.getComposeItemNumLocalStr(this._numTxtArr[i].bindData);
				if(numTxt.width>icon.width+10)
				{
					numTxt.scaleX=(icon.width+10)/numTxt.width;
				}
				numTxt.setPosition(icon.x+(icon.width-numTxt.width*numTxt.scaleX)/2,icon.y+icon.height+2);
			}
		}
		let needId = this._itemCfg.needItemCfgList[0].id;
		let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(needId);
		let needNum:number=this._itemCfg.getNeedItemNumById(needId);
		let maxNum = Math.min(Math.floor(ownNum/needNum), 100);
		let minNum = maxNum == 0 ? 0 : 1;
		if(!bool){
			this._curNum = minNum;
			this._dragProgressBar.setDragPercent(this._curNum, maxNum, minNum);
		}
		if(maxNum == 0){
			this._dragProgressBar.touchEnabled = false;
			this._dragProgressBar.touchChildren = false;
		}
		// view._gemNumBitMapTxt.text = (curNum * param).toString();
		let numStr = `${this._curNum}/<font color=0xffffff>${maxNum}</font>`;
		this._numTxt.text = numStr;
		this._numBg.width = this._numTxt.textWidth + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._numBg, this._dragProgressBar, [350,-5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._numTxt, this._numBg);
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	private checkNeedItemName():string
	{
		let needItemCfgList:Config.ItemItemCfg[]=this._itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		let isEnough:boolean=true;
		let needItemNameStr:string="";
		for(let i:number=0;i<l;i++)
		{
			let itemId=needItemCfgList[i].id;
			let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
			let needNum:number=this._itemCfg.getNeedItemNumById(itemId);
			if(ownNum<needNum)
			{
				if(needItemNameStr=="")
				{
					needItemNameStr+=needItemCfgList[i].name;
				}
				else
				{
					needItemNameStr+=","+needItemCfgList[i].name;
				}
			}
		}
		if(this._itemCfg.needGem)
		{
			let ownNum:number=Api.playerVoApi.getPlayerGem();
			let needNum:number=this._itemCfg.needGem;
			if(ownNum<needNum)
			{
				if(needItemNameStr=="")
				{
					needItemNameStr+=Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
				}
				else
				{
					needItemNameStr+=","+Config.RewardCfg.getNameByTypeAndId(ItemEnums.gem);
				}
			}
		}
		return needItemNameStr;
	}

	private getComposeItemNumLocalStr(itemId:string|number):string
	{
		let str:string="";
		let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
		let needNum:number=this._itemCfg.getNeedItemNumById(itemId) * Math.max(this._curNum,1);
		str=ownNum+"/"+needNum;
		if(ownNum>=needNum)
		{
			str = App.StringUtil.formatStringColor(str,0x167b2e);
		}
		else
		{
			str = App.StringUtil.formatStringColor(str,TextFieldConst.COLOR_WARN_RED);
		}
		return str;
	}

	private getId():string|number
	{
		return this.param.data;
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 15;
	}


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_namebg","progress2","progress2_bg"
		]);
	}

	public dispose():void
	{
		if(this._itemCfg.timeLimit)
		{
			let leftTime:number=Api.itemVoApi.getComposeLimitLeft(this._itemCfg.id);
			if(leftTime<=0)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
			}
		}
		this._itemCfg=null;
		this._numTxtArr.length=0;
		this._leftTimeTxt=null;
		this._composeLimitTxt=null;
		this._dragProgressBar = null;
		this._numTxt = null;
		this._numBg = null;
		this._curNum = 0;
		super.dispose();
	}
}