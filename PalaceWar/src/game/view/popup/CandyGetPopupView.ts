/**
 * 领取糖果
 * author dukunyang
 * date 2018/1/08
 * @class CandyGetPopupView
 */

class CandyGetPopupView extends PopupView
{
	// private _useCallback:Function;
	// private _handler:any;
	private _bgHeight:number = 0
	private _getBtn:BaseButton;
	private _stateContanier:BaseDisplayObjectContainer;
	private _candyList = ["100","100","100","150","150","150","200"]
	public constructor() 
	{
		super();
	}

	// 打开该面板时，需要传参数msg
	public initView():void
	{

		let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("candyGetTitleTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		tipTF.textColor = TextFieldConst.COLOR_BROWN;
		this.addChildToContainer(tipTF);
		tipTF.x = 30+GameData.popupviewOffsetX;
		tipTF.y = 15;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 300;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 47;
		this.addChildToContainer(bg);

		this._bgHeight = bg.height;


		let line:BaseBitmap = BaseBitmap.create("candyline");
		line.width = 450;
		line.x = 60+GameData.popupviewOffsetX;
		line.y = 130;
		this.addChildToContainer(line);

		for (var index = 0; index < 7; index++) {
			let numBg:BaseBitmap = BaseBitmap.create("candynumbg");
			numBg.x =(numBg.width+3)*index + 33+GameData.popupviewOffsetX;
			numBg.y = bg.y + 20;
			this.addChildToContainer(numBg);

			let candyIcon:BaseBitmap = BaseBitmap.create("candyicon2");
			candyIcon.x = numBg.x + 5;
			candyIcon.y = numBg.y + 3;
			this.addChildToContainer(candyIcon);

			let numTF = ComponentManager.getTextField(this._candyList[index],18);
			this.addChildToContainer(numTF);
			numTF.x = numBg.x + 31;
			numTF.y = numBg.y + 7;

			let boxBg:BaseBitmap = BaseBitmap.create("candybg");
			boxBg.x = numBg.x + 12;
			boxBg.y = numBg.y + 45;
			this.addChildToContainer(boxBg);

			let dayTF = ComponentManager.getTextField((index+1).toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			dayTF.textColor = TextFieldConst.COLOR_BLACK;
			this.addChildToContainer(dayTF);
			dayTF.x = numBg.x + 31;
			dayTF.y = numBg.y + 100;
			
		}


		this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.clickConHandler,this);
		this._getBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._getBtn.x = this.getShowWidth()/2 - this._getBtn.width/2;
		this._getBtn.y = bg.y + bg.height - 120;
		this.addChildToContainer(this._getBtn);

		let getData = Api.otherInfoVoApi.getCandyGetInfo();
		// let day = getData.get;
		if(getData.today == App.DateUtil.getWeeTs(GameData.serverTime)){
			this._getBtn.setEnable(false);
			this._getBtn.setText("candyGetAlready");
		}
		
		let msgTF = ComponentManager.getTextField(LanguageManager.getlocal("candyGetTitleMsg"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.textColor = TextFieldConst.COLOR_WARN_RED;
		this.addChildToContainer(msgTF);
		msgTF.x = bg.x + bg.width/2 - msgTF.width/2;
		msgTF.y = this._getBtn.y + this._getBtn.height + 20;

		this.setState()

	}

	private setState()
	{
		if(this._stateContanier)
		{
			this.removeChildFromContainer(this._stateContanier);
			this._stateContanier = null;
		}
		this._stateContanier = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._stateContanier);
		let getData = Api.otherInfoVoApi.getCandyGetInfo();
		let day = getData.get;
		for (var index = 0; index < 7; index++) {
			let img = "candybox";
			if(index < day){
				img = "candycheck";
			}
			else{
				
			}
			let candyIcon:BaseBitmap = BaseBitmap.create(img);
			candyIcon.x =(72)*index + 46;
			candyIcon.y = 117;
			this._stateContanier.addChild(candyIcon)
		}
		// let getData = Api.otherInfoVoApi.getCandyGetInfo();
		// let day = getData.get;
		if(getData.today == App.DateUtil.getWeeTs(GameData.serverTime)){
			this._getBtn.setEnable(false);
			this._getBtn.setText("candyGetAlready");
		}
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(data.data.ret < 0){
			return;
		}
		
		if(data.data.cmd == NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip"));
			this.setState();
		}


	}
	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		
	}

	protected clickConHandler(data:any):void
	{

		let getData = Api.otherInfoVoApi.getCandyGetInfo();
		let day = getData.get;
		if(day >= 7){
			return;
		}
		let num = this._candyList[day] ;
		PlatformManager.sendCandy(num, this.sendCallback,this);
		// this.request(NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD, null);

	}
	private sendCallback(code:string)
	{
		if (String(code) == "0") {
			this.request(NetRequestConst.REQUEST_OTHERINFO_GETCANDYREWARD, null);

		}
		else if (String(code) == "-2"){
			//取消
			App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip1"));
		}
		else { 
			//失败
			App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
		}
	}

	protected clickCancelHandler(data:any):void
	{
		// if(this.param.data.callback){
		// 	this.param.data.callback.apply(this.param.data.handler,null);
		// }
		
		this.hide();
	}
    // protected getConfirmBtnStr():string
	// {
	// 	return "sysConfirm";
	// }
    // protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }
    protected getTitleStr(){
        
        return "candyGetTitle";
    }
	// protected getCloseBtnName():string
	// {
	// 	return  null;
	// }

	public hide()
	{

		super.hide()
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		
			"candybg","candybox","candycheck",
			"candyicon2","candyline","candynumbg",
		
		]);
	}
	public dispose():void
	{
		this._bgHeight = 0
		this._stateContanier = null;
		super.dispose();
		
	}
}