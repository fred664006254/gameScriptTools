class NewAtkracecrossBuyPopupView  extends PopupView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _buyInfo:any[] = [];

	private _buyBtnTab:BaseButton[] = [];
	private _containerTab:BaseDisplayObjectContainer[] = [];

	private _clickIndex:number = 0;
	private _goldText:BaseTextField = null;
	private _moraleText:BaseTextField = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "atkraceBuyPopupViewTitle";
	}


	protected getRequestData():{requestType:string,requestData:any}
	{	
		let tmpattr:any = Api.atkracecrossVoApi.getMyFightInfo().tmpattr;
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		if (myAtkInfo.fightnum == 0 ) {
			return null;
		}
		else {
			if (tmpattr && tmpattr.list && Object.keys(tmpattr.list).length > 0) {
				return null;
			}
			else {
				return {requestType:NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUYLIST,requestData:{}};
			}
			
		}
	}

	protected initView():void
	{
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.hide,this);

		let gemsBg:BaseBitmap = BaseBitmap.create("public_9_resbg");
		gemsBg.setPosition(32+GameData.popupviewOffsetX,12);
		this.addChildToContainer(gemsBg);

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,45,45);
		let goldIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1",rect);
		goldIcon.setPosition(gemsBg.x -1, gemsBg.y+gemsBg.height/2 - 45/2);
		this.addChildToContainer(goldIcon);

		this._goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._goldText.setPosition(goldIcon.x +50, gemsBg.y+gemsBg.height/2 - this._goldText.height/2);
		this.addChildToContainer(this._goldText);
		gemsBg.width = this._goldText.width + 70;
		
		let moraleBg:BaseBitmap = BaseBitmap.create("public_9_resbg");
		moraleBg.setPosition(280+GameData.popupviewOffsetX,12);
		this.addChildToContainer(moraleBg);

		let moraleIcon:BaseBitmap = BaseBitmap.create("atkrace_morale");
		moraleIcon.setPosition(moraleBg.x +3 , moraleBg.y+moraleBg.height/2 - 45/2);
		this.addChildToContainer(moraleIcon);

	
		this._moraleText = ComponentManager.getTextField( Api.atkracecrossVoApi.getMyInfo().morale.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._moraleText.setPosition(moraleIcon.x +50, moraleBg.y+moraleBg.height/2 - this._moraleText.height/2);
		this.addChildToContainer(this._moraleText);

		moraleBg.width = this._moraleText.width + 70;

		let typeBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		typeBg.width = 528;
		typeBg.height = 404;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 60);
		this.addChildToContainer(typeBg);


		let infoDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		infoDesc2.setPosition(50+GameData.popupviewOffsetX, typeBg.y + typeBg.height + 18);
		this.addChildToContainer(infoDesc2);

		let infoDesc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		infoDesc3.setPosition(280, infoDesc2.y);
		this.addChildToContainer(infoDesc3);

		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;

		let tmpatt:any = myAtkInfo.tmpattr;
		let atkAdd:number =  0;
		let skillAdd:number = 0;
		if (tmpatt) {
			if (tmpatt.atk) {
				atkAdd=Math.floor(tmpatt.atk*100);
			}
			if (tmpatt.skill) {
				skillAdd=Math.floor(tmpatt.skill*100);
			}
		}
		let infoText2:BaseTextField = ComponentManager.getTextField(atkAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
		infoText2.setPosition(infoDesc2.x + infoDesc2.width , infoDesc2.y);
		this.addChildToContainer(infoText2);

		let infoText3:BaseTextField = ComponentManager.getTextField(skillAdd.toString() + "%",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
		infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
		this.addChildToContainer(infoText3);

		let bloodText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		bloodText.setPosition(infoDesc2.x , infoDesc2.y + 35);
		this.addChildToContainer(bloodText);

		let progressBar:ProgressBar=ComponentManager.getProgressBar("progress8","progress7_bg",410);
		progressBar.x = bloodText.x + bloodText.width + 20;
		progressBar.y = bloodText.y - progressBar.height/2 + bloodText.height/2;
		this.addChildToContainer(progressBar);

		let attrValue:number = Math.ceil(myInfo.attr);
		progressBar.setText( String(attrValue) + "/"+ myInfo.fullattr);
		progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
		
		let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("newCrossServerAtkRace", Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code);
		if (myAtkInfo.fightnum == 0) {
			
			for (let i:number=1; i<=3; i++)
			{
				this._buyInfo.push([itemCfg.buff[0][i.toString()],1,i.toString()]);
			}
		}
		else {
			let tmpattr:any = Api.atkracecrossVoApi.getMyFightInfo().tmpattr.list;
			this._buyInfo.push([itemCfg.buff[1][tmpattr["2"]],2,tmpattr["2"]]);
			this._buyInfo.push([itemCfg.buff[2][tmpattr["3"]],3,tmpattr["3"]]);
			this._buyInfo.push([itemCfg.buff[3][tmpattr["4"]],4,tmpattr["4"]]);
		}

		for (let i:number=1; i<=3; i++)
		{
			let bgContainer:BaseDisplayObjectContainer = this.getBuyTypeContainer(this._buyInfo[i-1][0],i,this._buyInfo[i-1][1]);
			bgContainer.setPosition( this.viewBg.width/2 - 518/2 +4, (i-1)*130 + 73);
			this.addChildToContainer(bgContainer);
			this._containerTab.push(bgContainer);
		}
	}


	/**
	 * idx `1~3 初中高   type `1~4
	 */
	private getBuyTypeContainer(info:any, idx:number , type:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let itemBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		itemBg.width = 508;
		itemBg.height = 118;
		bgContainer.addChild(itemBg);




		let name:string = LanguageManager.getlocal("atkrace_property_lv"+idx,[LanguageManager.getlocal("atkrace_property"+info.att)]);
		let itemName:BaseTextField = ComponentManager.getTextField(name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_BLUE);
		itemName.setPosition(130, 15);
		bgContainer.addChild(itemName);

		let effect:number = Math.floor(info.effect*100);
		let desc:string = LanguageManager.getlocal("atkrace_add_property",[LanguageManager.getlocal("atkrace_property"+info.att),effect.toString()]);
		let descText:BaseTextField = ComponentManager.getTextField(desc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descText.setPosition(itemName.x, itemName.y + itemName.height + 12);
		bgContainer.addChild(descText);

		let expendText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("adultChooseCost")+":",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		expendText.setPosition(itemName.x, descText.y + descText.height + 12);
		bgContainer.addChild(expendText);

		let rectIcon:egret.Rectangle=egret.Rectangle.create();
		rectIcon.setTo(0,0,100,100);
		let attIconName:string;
		if (type == 1) {
			attIconName = "atkrace_icon_1_"+idx;
		}
		else {
			attIconName = "atkrace_icon_"+info.att+"_"+idx;
		}
		let attIcon:BaseLoadBitmap = BaseLoadBitmap.create(attIconName,rectIcon);
		attIcon.setPosition(11, itemBg.height/2 - attIcon.height/2);
		bgContainer.addChild(attIcon);

		let rect:egret.Rectangle=egret.Rectangle.create();
		let icon:string ;
		let cost:number;
		let moraleIcon:any;
		if (info.costGem) {
			icon = "itemicon1";
			rect.setTo(0,0,45,45);
			cost = info.costGem;
			 moraleIcon = BaseLoadBitmap.create(icon,rect);
		}
		else {
			icon = "atkrace_morale";
			rect.setTo(0,0,36,40);
			cost = info.costPoint;
			moraleIcon = BaseBitmap.create(icon);
		}
		moraleIcon.setPosition(expendText.x + expendText.width , expendText.y+expendText.height/2 - moraleIcon.height/2);
		bgContainer.addChild(moraleIcon);

		
		let expend:BaseTextField = ComponentManager.getTextField(cost.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		expend.setPosition(moraleIcon.x +45, expendText.y);
		bgContainer.addChild(expend);

		let tmpattr:any = Api.atkracecrossVoApi.getMyFightInfo().tmpattr;
		let isBuy:string;
		if (tmpattr) {
			isBuy = tmpattr.isbuy;
		}
		 
		

		if (isBuy == "0" || !isBuy) {
			let buyBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyClick, this,[idx]);
			buyBtn.setPosition(itemBg.width - buyBtn.width - 10, itemBg.height/2-buyBtn.height/2);
			buyBtn.setColor(TextFieldConst.COLOR_BLACK);
			bgContainer.addChild(buyBtn);

			this._buyBtnTab.push(buyBtn);
		}
		else {
			let isBuyArray:string[] = isBuy.split("_");
			if ((isBuyArray[0] == "1"  )  ) {
				if (Number(isBuyArray[1]) == idx) {
					let hasGetSp = BaseBitmap.create("public_buy");
					hasGetSp.setPosition(itemBg.width - hasGetSp.width - 10, itemBg.height/2-hasGetSp.height/2);
					bgContainer.addChild(hasGetSp);
					// let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
					// hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
					// bgContainer.addChild(hasGetSp);
				}
			}
			else if ( Number(isBuyArray[0]) == type  ) {
				let hasGetSp = BaseBitmap.create("public_buy");
				hasGetSp.setPosition(itemBg.width - hasGetSp.width - 10, itemBg.height/2-hasGetSp.height/2);
				bgContainer.addChild(hasGetSp);
				// let hasGetSp:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_buy_already"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				// hasGetSp.setPosition(itemBg.width - hasGetSp.width - 30, itemBg.height/2-hasGetSp.height/2);
				// bgContainer.addChild(hasGetSp);
			}
		}
		return bgContainer;
	}

	private buyClick(idx:number):void
	{
		let info:any = this._buyInfo[idx-1];
		let attrInfo:any = info[0];
		
		if (attrInfo.costGem) {
			if(attrInfo.costGem > Api.playerVoApi.getPlayerGem())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return;
			}
		}
		else {
			let needItem:number = attrInfo.costPoint;
			let hasNum:number =Api.atkracecrossVoApi.getMyInfo().morale;
			if (needItem > hasNum) {
				App.CommonUtil.showTip(LanguageManager.getlocal("atkRace_buy_NotEnough"));
				return;
			}
		}
		this._clickIndex = idx;
		// this.showBuyAnim();
		this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUY,{ atttype: info[1].toString(), attid:info[2]});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false || data.data.data.fightExpired == 1)
		{	
			Api.atkracecrossVoApi.dateErrorHandle(2);
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUYLIST)
		{
			
		}
		else if(rData.cmd==NetRequestConst.REQUEST_NEWATKRACECROSS_ATTRBUY)
		{
			if (this._obj && this._callbackF) {
				this._callbackF.apply(this._obj);
			}

			this.showBuyAnim();
			this._goldText.text = Api.playerVoApi.getPlayerGem().toString();
			this._moraleText.text = Api.atkracecrossVoApi.getMyInfo().morale.toString();
		}
	}

	private showBuyAnim():void
	{
		for (let key in this._buyBtnTab) 
		{
			this._buyBtnTab[key].visible = false;
		}
		let collectFlag:BaseBitmap = BaseBitmap.create("public_buy")
        collectFlag.anchorOffsetX = collectFlag.width/2;
        collectFlag.anchorOffsetY = collectFlag.height/2;
		collectFlag.setPosition(508 - collectFlag.width/2 - 10, 118/2);
        collectFlag.setScale(1.5);
        this._containerTab[this._clickIndex-1].addChild(collectFlag);
		egret.Tween.get(collectFlag,{loop:false}).to({scaleX:1,scaleY:1},400).wait(300).call(this.hide,this);
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.hide,this);
		this._callbackF = null;
		this._obj = null;
		this._buyInfo.length = 0;
		this._buyBtnTab.length = 0;
		this._clickIndex = 0;
		this._containerTab.length = 0;
		this._goldText = null;
		this._moraleText = null;

		super.dispose();
	}
}