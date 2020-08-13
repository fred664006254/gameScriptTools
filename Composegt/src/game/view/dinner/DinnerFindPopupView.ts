/**
 * 编号查找玩家
 * author shaoliang
 * date 2017/10/31
 * @class DinnerFindPopupView
 */

class DinnerFindPopupView extends PopupView
{

	private _inputTextField:BaseTextField = null;

	private _dinnerInfoContainer:BaseDisplayObjectContainer = null;;
	private _dinnerInfo:any = null;
	private _gotoBtn:BaseButton = null;
	private _rankBg:BaseBitmap;
	private _timeCountDown:BaseTextField = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "codeToDinner";
	}

	protected initView():void
	{	
		
		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 520;
		typeBg.height = 600;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("playerIdFind"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText.setPosition(70 , 27 + typeBg.y);
		this.addChildToContainer(titleText);

		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,490,44,"public_tc_srkbg05",LanguageManager.getlocal("inputPlayerId"),TextFieldConst.COLOR_WHITE);
		inputTF.x = this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = typeBg.y + 55;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict = "0-9";
		this._inputTextField.maxChars = 40;

		//查找按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.findHandle,this);
		confirmBtn.setPosition(this.viewBg.width - confirmBtn.width - 70, inputTF.y+inputTF.height+12);
		this.addChildToContainer(confirmBtn);

		//宴会信息
		let infoText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerInfo")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText.setPosition(titleText.x , 155 + typeBg.y);
		this.addChildToContainer(infoText);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rankBg.width = 496;
		rankBg.height = 300;
		this._rankBg = rankBg;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, infoText.y + infoText.height + 8);
		this.addChildToContainer(rankBg);

		this._gotoBtn=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",this.gotoHandle,this);
		this._gotoBtn.setPosition(confirmBtn.x, rankBg.y+rankBg.height+22);
		this.addChildToContainer(this._gotoBtn);
		this._gotoBtn.visible = false;

	}

	private findHandle():void
	{
		if (this._inputTextField.text.length < 5) {
			App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
			return;
		}
		if (Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
			return;
		}
		this.request(NetRequestConst.REQUEST_DINNER_GETDINNER,{"getuid":Number(this._inputTextField.text)});

	}

	private gotoHandle():void
	{
		let info:any =this._dinnerInfo;
		
		ViewController.getInstance().openView(ViewConst.BASE.GOTODINNEREDVIEW, {"info":info});
		this.hide();
	}

	protected receiveData(data: { ret: boolean, data: any }): void 
	{
		
		if (data.ret == true && data.data.ret == 0) {
			if (data.data.data.dinnerinfo && !data.data.data.dinnerinfo.dtype) {
				App.CommonUtil.showTip(LanguageManager.getlocal("playerIdIsNoDinner"));
				return;
			}
			if (data.data.data.proflag == 1 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
				return;
			}

			this._gotoBtn.visible = true;
			this._dinnerInfo = data.data.data.dinnerinfo;
			// this._dinnerInfo["uid"] = Number(this._inputTextField.text);
			// this._dinnerInfo["uid"] = da
			this.showFindInfo();
		}
	}

	private showFindInfo():void
	{
		if (this._dinnerInfoContainer) {
			this.removeChildFromContainer(this._dinnerInfoContainer);
			this._dinnerInfoContainer = null;
		}
		this._dinnerInfoContainer = new BaseDisplayObjectContainer();
		this._dinnerInfoContainer.setPosition(this._rankBg.x + 20, 215);
		this.addChildToContainer(this._dinnerInfoContainer);

		let dinnerHost:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerHost"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._dinnerInfoContainer.addChild(dinnerHost);

		let dinnerType:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		dinnerType.y = 33;
		this._dinnerInfoContainer.addChild(dinnerType);

		let dinnerSeat:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerSeat")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		dinnerSeat.y = 66;
		this._dinnerInfoContainer.addChild(dinnerSeat);

		let dinnerCountDown:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerCountDown"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		dinnerCountDown.y = 99;
		this._dinnerInfoContainer.addChild(dinnerCountDown);
		
		let hostName:BaseTextField = ComponentManager.getTextField(this._dinnerInfo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		hostName.x = dinnerHost.width + 10;
		this._dinnerInfoContainer.addChild(hostName);


		let typeName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType"+this._dinnerInfo.dtype),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		typeName.setPosition(dinnerType.width+10, dinnerType.y);
		this._dinnerInfoContainer.addChild(typeName);

		let num:number = this._dinnerInfo.join_num;
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this._dinnerInfo.dtype).contain;
		let seat:BaseTextField = ComponentManager.getTextField(num + "/" + totalNum,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		seat.setPosition(dinnerSeat.width+10, dinnerSeat.y);
		this._dinnerInfoContainer.addChild(seat);

		this._timeCountDown = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		this._timeCountDown.setPosition(dinnerCountDown.width+10, dinnerCountDown.y);
		this._dinnerInfoContainer.addChild(this._timeCountDown);
		this.tick();
	}

	private tick():void
	{	
		if (this._dinnerInfo && this._timeCountDown) {
			let time:number = this._dinnerInfo.end_time - GameData.serverTime;
			if (time < 0) {
				time = 0;
			}
			this._timeCountDown.text =  App.DateUtil.getFormatBySecond(time);
		}
	}

	public dispose():void
	{	 
		this._inputTextField = null;
		this._dinnerInfoContainer =null;
		this._gotoBtn = null;
		this._rankBg = null;
		super.dispose();
	}
}