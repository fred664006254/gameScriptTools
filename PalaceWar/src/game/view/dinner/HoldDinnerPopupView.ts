/**
 * 创建宴会，选择宴会类型
 * date 2017/10/31
 * @class HoldDinnerPopupView
 */

class HoldDinnerPopupView extends PopupView
{
	//家宴是否公开
	private _isOpen:boolean = false;
	private _nikeIcon:BaseBitmap = null;

	private _callbackF:Function = null;
	private _obj:any = null;
	private _clickedIdx:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{	
		let picArray:string[] = ["hold_dinner_bg1",
					"hold_dinner_bg2",
					"hold_dinner_box",
					"hold_dinner_check",
					"hold_title_bg1",
					"dinner_open_bg",
					"hold_title_bg2",];

		return super.getResourceList().concat(picArray);
	}

	protected initView():void
	{
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CREATDINNER),this.requiestCallback,this);
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshView,this);

		let grayBg:BaseBitmap = BaseBitmap.create("public_9_bg8");
		grayBg.width = 524;
		grayBg.height = 540;
		grayBg.setPosition(this.viewBg.width/2 - grayBg.width/2 , 20);
		this.addChildToContainer(grayBg);
		
		let goldBg = BaseBitmap.create("public_9_resbg");
		goldBg.setPosition(grayBg.x + 12, grayBg.y +12);
		this.addChildToContainer(goldBg);

		let goldIcon = BaseLoadBitmap.create("itemicon1");
		goldIcon.setScale(0.5);
		goldIcon.x = goldBg.x - 3 ;
		goldIcon.y = goldBg.y + goldBg.height/2 - 100/2 + 25;
		this.addChildToContainer(goldIcon);

		let goldText:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		goldText.setPosition(goldBg.x + 50, goldBg.y+goldBg.height/2 - goldText.height/2);
		this.addChildToContainer(goldText);

		goldBg.width = goldText.width + 70;

		let holdDinnerInfoContainer1:BaseDisplayObjectContainer = this.getHoldDinnerInfoContainer(1);
		holdDinnerInfoContainer1.setPosition(this.viewBg.width/2 - holdDinnerInfoContainer1.width/2 , 80);
		this.addChildToContainer(holdDinnerInfoContainer1);
		holdDinnerInfoContainer1.name = "holdDinnerInfoContainer1";

		let holdDinnerInfoContainer2:BaseDisplayObjectContainer = this.getHoldDinnerInfoContainer(2);
		holdDinnerInfoContainer2.setPosition(holdDinnerInfoContainer1.x , 70 + holdDinnerInfoContainer1.height + 10);
		this.addChildToContainer(holdDinnerInfoContainer2);
		holdDinnerInfoContainer2.name = "holdDinnerInfoContainer2";

	}

	private getHoldDinnerInfoContainer(idx:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let holdBg:BaseBitmap = BaseBitmap.create("hold_dinner_bg"+idx);
		bgContainer.addChild(holdBg);

		let holdTitle:BaseBitmap = BaseBitmap.create("hold_title_bg"+idx);
		holdTitle.setPosition(5,5);
		bgContainer.addChild(holdTitle);

		let feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);

		let holdTitleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("holdDinnerTitle",[LanguageManager.getlocal("dinnerTitle"+idx), feastCfg.contain.toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL);
		holdTitleText.setPosition(holdTitle.x +17 , holdTitle.y+holdTitle.height/2 - holdTitleText.height/2);
		bgContainer.addChild(holdTitleText);

		let gemBg:BaseBitmap = BaseBitmap.create("public_numbg");
		gemBg.setPosition(357, 8);
		bgContainer.addChild(gemBg);

		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,35,35);
		let gemIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1",rect);
		gemIcon.setPosition(gemBg.x , gemBg.y+3);
		bgContainer.addChild(gemIcon);

		let gemText:BaseTextField = ComponentManager.getTextField(feastCfg.needGem.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		gemText.setPosition(gemIcon.x +gemIcon.width+5, gemBg.y+gemBg.height/2 - gemText.height/2);
		bgContainer.addChild(gemText);

		let holdConditionText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("holdDinnerCondition"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		holdConditionText.setPosition(20,64);
		bgContainer.addChild(holdConditionText);

		let holdBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "holdDinner", this.holdDinner, this,[idx]);
		holdBtn.setPosition(355, holdBg.height - holdBtn.height - 20);
		holdBtn.setColor(TextFieldConst.COLOR_BLACK);
		bgContainer.addChild(holdBtn);

		//材料
		let xPos = holdConditionText.x;
		for (let k in feastCfg.needItem)
		{	
			let needNum:number = feastCfg.needItem[k];
			let itemstr = "6_"+k+"_"+needNum;
			let icon =  GameData.getRewardItemIcons(itemstr,true)[0];//GameData.getItemIcon(Config.ItemCfg.getItemCfgById(Number(k)),true);
			icon.setPosition(xPos,holdConditionText.y + holdConditionText.height +8);
			icon.setScale(75/icon.width);
			bgContainer.addChild(icon);

			
			// let numLb:BaseTextField = ComponentManager.getTextField( needNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			// numLb.setPosition(icon.width - 3 - numLb.width, icon.height - 3 - numLb.height );
			// icon.addChild(numLb);
			
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(k));
			let hasNumText:BaseTextField = ComponentManager.getTextField( "(" + hasNum +"/" +needNum+ ")",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			hasNumText.setPosition(xPos + 75/2 - hasNumText.width/2 , icon.y + 78);
			if (needNum > hasNum) {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_RED3;
			}
			else {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_GREEN;
			}
			bgContainer.addChild(hasNumText);
			hasNumText.name = "hasNum"+k;

			xPos += 85;
		}

		//公开宴会
		if (idx == 1) {

			let openBg:BaseBitmap = BaseBitmap.create("dinner_open_bg");
			openBg.setPosition(200,155);
			bgContainer.addChild(openBg);

			let openText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("openDinner"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			openText.setPosition(openBg.x + 15, openBg.y+openBg.height/2 - openText.height/2);
			bgContainer.addChild(openText);

			let openBtn:BaseButton = ComponentManager.getButton("hold_dinner_box",null,this.openDinnerClick,this,null,3);
			openBtn.setPosition(openBg.x + 100, openBg.y + openBg.height/2 - openBtn.height/2);
			bgContainer.addChild(openBtn);

			this._nikeIcon = BaseBitmap.create("hold_dinner_check");
			this._nikeIcon.setPosition(openBtn.x,openBtn.y);
			bgContainer.addChild(this._nikeIcon);

			this.openDinnerClick();
		}

		return bgContainer;
	}

	private openDinnerClick():void
	{	
		this._isOpen = !this._isOpen;
		this._nikeIcon.visible = this._isOpen;
	}

	private holdDinner(idx:number):void
	{
		let feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);
		if(feastCfg.needGem > Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		for (let k in feastCfg.needItem)
		{
			let needNum:number = feastCfg.needItem[k];
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(k));
			if (needNum > hasNum) {
				App.CommonUtil.showTip(LanguageManager.getlocal("goodsNotEnough"));
				return;
			}
		}
		this._clickedIdx = idx;
		NetManager.request(NetRequestConst.REQUEST_DINNER_CREATDINNER,{"dtype":idx,"isopen":(this._isOpen || idx == 2)?1:0});


	}

	private requiestCallback(p:any):void
	{
		if (p.data.ret == true) {

			if (this._obj && this._callbackF) {
				this._callbackF.apply(this._obj,[this._clickedIdx]);
			}

			this.hide();
		}
	}

	private refreshView():void{
		let holdContainer1 = <BaseDisplayObjectContainer>this.container.getChildByName("holdDinnerInfoContainer1");
		let feast1Cfg = Config.DinnerCfg.getFeastItemCfg(1);
		for (let k in feast1Cfg.needItem){
			let hasNumText = <BaseTextField>holdContainer1.getChildByName("hasNum"+k);
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(k));
			let needNum:number = feast1Cfg.needItem[k];
			hasNumText.text = "(" + hasNum +"/" +needNum+ ")";
			if (needNum > hasNum) {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_RED3;
			}
			else {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_GREEN;
			}
		}

		let holdContainer2 = <BaseDisplayObjectContainer>this.container.getChildByName("holdDinnerInfoContainer2");
		let feast2Cfg = Config.DinnerCfg.getFeastItemCfg(2);
		for (let k in feast2Cfg.needItem){
			let hasNumText = <BaseTextField>holdContainer2.getChildByName("hasNum"+k);
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(k));
			let needNum:number = feast2Cfg.needItem[k];
			hasNumText.text = "(" + hasNum +"/" +needNum+ ")";
			if (needNum > hasNum) {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_RED3;
			}
			else {
				hasNumText.textColor = TextFieldConst.COLOR_WARN_GREEN;
			}
		}
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_CREATDINNER),this.requiestCallback,this);
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshView,this);

		this._nikeIcon = null;
		this._isOpen = false;

		this._callbackF = null;
		this._obj = null;
		this._clickedIdx = 0;
	
		super.dispose();
	}
}