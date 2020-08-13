/**
 * 一键贸易  选择攻打多少关
 */
class TradeOneKeyPopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	private _carNumTF:BaseTextField;
	private _costNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _currId:string ="";

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;

		this._currId  = Api.tradeVoApi.getCurrentCid();
		let maxNum = Api.tradeVoApi.getAttNum(Number(this._currId));
		this._maxNum = maxNum;
		if(this._maxNum >200)
		{
			this._maxNum = 200;
		}

		let iconBg3:BaseBitmap=BaseBitmap.create("public_hb_bg01");
		iconBg3.setPosition(60,20);
		this.addChildToContainer(iconBg3);
		
		let resImg3 = BaseBitmap.create("public_icon2");
		resImg3.setPosition(iconBg3.x-resImg3.width/2+10,iconBg3.y + iconBg3.height/2 - resImg3.height/2);//iconBg3.y+iconBg3.height-resImg3.height+5);
		this.addChildToContainer(resImg3);

		let GoldNum = App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
		let attText =ComponentManager.getTextField(GoldNum ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		attText.setPosition(90,iconBg3.y + iconBg3.height/2 - attText.height/2);
		this.addChildToContainer(attText);

		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let cu_bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		cu_bg.width = 520;
		cu_bg.height = 220;
		cu_bg.x = this.viewBg.x + this.viewBg.width/2 - cu_bg.width/2;
		cu_bg.y = 70;
		this.addChildToContainer(cu_bg);


		let tip =ComponentManager.getTextField(LanguageManager.getlocal("conquestChooseAtt") ,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		tip.setPosition(70,cu_bg.y + 15);
		this.addChildToContainer(tip);

		let bottomBg = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 500;
		bottomBg.height = 150;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = cu_bg.y + 50;
		this.addChildToContainer(bottomBg);

		let car1 =this._currId;
		let car2 = Number(this._currId) + Api.tradeVoApi.getAttNum(Number(this._currId)) -1;
		var catNumStr = LanguageManager.getlocal("tradeChooseNum",[car1.toString(),car2.toString()]);
		
		this._carNumTF = ComponentManager.getTextField(catNumStr ,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._carNumTF.setPosition(80,bottomBg.y + 15);
		this.addChildToContainer(this._carNumTF);

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01","progress4tc_02",this._maxNum,this.dragCallback,this,null,1,300);
		dragProgressBar.x = 158;
		dragProgressBar.y = 170;
		this.addChildToContainer(dragProgressBar);


		let cost1 =	 App.StringUtil.changeIntToText(Api.tradeVoApi.getAttCostNum(Number(this._currId),1));
		let cost2 =  App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
		let costNumStr = LanguageManager.getlocal("tradeCostNum",[cost1.toString(),cost2.toString()]);
		this._costNumTF =ComponentManager.getTextField(costNumStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._costNumTF.setPosition(this.viewBg.width/2 - this._costNumTF.width/2,dragProgressBar.y + dragProgressBar.height + 10);
		this.addChildToContainer(this._costNumTF);


		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = cu_bg.x + cu_bg.width/2 - useBtn.width/2;
		useBtn.y = cu_bg.y + cu_bg.height + 15;
		// useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		this._useNum = curNum;
		let _currentCid = Number(Api.tradeVoApi.getCurrentCid());
		let car1 = _currentCid -1 + curNum;
		let car2 = _currentCid -1 + Api.tradeVoApi.getAttNum(_currentCid);
		let catNumStr = LanguageManager.getlocal("tradeChooseNum",[car1.toString(),car2.toString()]);
		this._carNumTF.text = catNumStr;

		let cost1 = App.StringUtil.changeIntToText(Api.tradeVoApi.getAttCostNum(_currentCid,curNum));
		let cost2 =  App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
		let costNumStr = LanguageManager.getlocal("tradeCostNum",[cost1.toString(),cost2.toString()]);
		this._costNumTF.text = costNumStr;
	}

	public getTitleStr():string
	{
		return "tradeBatchBtn";
	}
	private useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum - 1]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress4tc_01","progress4tc_02"
		]);
	}

	public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		this._carNumTF = null;
		this._costNumTF = null;
		this._maxNum = 0;
		this._handler = null;
		super.dispose();
	}
}