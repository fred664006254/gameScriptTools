/**
 * 编号查找玩家
 * author shaoliang
 * date 2017/10/31
 * @class AllianceFindPopupView
 */

class AllianceFindPopupView extends PopupView
{

	private _inputTextField:BaseTextField = null;

	private _dinnerInfoContainer:BaseDisplayObjectContainer = null;
	private _scrollView:ScrollView = null;;
	private _allianceInfo:any = null;
	private _gotoBtn:BaseButton = null;

	// private _timeCountDown:BaseTextField = null;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "allianceCreateSearchBtn";
	}

	protected initView():void
	{	
		
		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 520;
		typeBg.height = 500;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let titleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceFindId"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText.setPosition(62 , 27 + typeBg.y);
		this.addChildToContainer(titleText);

		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,500,44,"public_tc_srkbg05",LanguageManager.getlocal("allianceFindInputHolder"),TextFieldConst.COLOR_WHITE);
		inputTF.x = this.viewBg.width/2 - inputTF.width/2;
		inputTF.y = typeBg.y + 55;
		
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict = "0-9";
		this._inputTextField.maxChars = 40;

		//查找按钮
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.findHandle,this);
		confirmBtn.setPosition(this.viewBg.width - confirmBtn.width - 65, inputTF.y+inputTF.height+12);
		this.addChildToContainer(confirmBtn);

		//宴会信息
		let infoText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceFindIInfo"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		infoText.setPosition(titleText.x , 155 + typeBg.y);
		this.addChildToContainer(infoText);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rankBg.width = 500;
		rankBg.height = 228;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, infoText.y + infoText.height + 8);
		this.addChildToContainer(rankBg);

		this._gotoBtn=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceRankApply",this.gotoHandle,this);
		this._gotoBtn.setPosition(confirmBtn.x, rankBg.y+rankBg.height+12);
		this.addChildToContainer(this._gotoBtn);
		this._gotoBtn.visible = false;

	}

	private findHandle():void
	{
		if (!this._inputTextField.bindData) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceFindInputHolder"));
			return;
		}

		this.request(NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE,{"aid":Number(this._inputTextField.text)});

	}

	private gotoHandle():void
	{
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();

		if(myAllianceVo.nextt - GameData.serverTime > 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip"));
			return;
		}

		if(this._allianceInfo.mn >= this._allianceInfo.maxmn)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_joinNumMax"));
			return;
		}


		this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE,{aid:this._allianceInfo.id});
	}

	protected receiveData(data: { ret: boolean, data: any }): void 
	{
		if (data.ret == true) {
			if (data.data.data.allianceFlag == 2 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
				return;
			}
			if (data.data.data.allianceFlag == 3 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
				return;
			}
			if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_FINDALLIANCE) {
				this._gotoBtn.visible = true;
				this._allianceInfo = data.data.data.falliance;
				// this._allianceInfo["uid"] = Number(this._inputTextField.text);
				this.showFindInfo();
			}
			if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplySuccess"));
			}

			
		}
	}

	private showFindInfo():void
	{
		if (this._scrollView) {
			this.removeChildFromContainer(this._scrollView);
			this._scrollView = null;
		}
		let container = new BaseDisplayObjectContainer();
		
		// this.addChildToContainer(container);

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,500,200);
		// 中部可滑动区域
		this._scrollView = ComponentManager.getScrollView(container,rect);
		this._scrollView.setPosition(70, 210);
		// scrollView.y= 100;
		this.addChildToContainer(this._scrollView);

		let nameStr = LanguageManager.getlocal("allianceFindInfo12",[this._allianceInfo.name,this._allianceInfo.level])
		let info1TF:BaseTextField = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info1TF.y = 5;
		container.addChild(info1TF);

		let info2Str = LanguageManager.getlocal("allianceFindInfo2",[this._allianceInfo.creatorname])
		let info2TF:BaseTextField = ComponentManager.getTextField(info2Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info2TF.y = info1TF.y + info1TF.height + 10;
		container.addChild(info2TF);

		let allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(this._allianceInfo.level);
		let info3Str = LanguageManager.getlocal("allianceFindInfo3",[this._allianceInfo.exp + "/" + allianceCfg.exp])
		let info3TF:BaseTextField = ComponentManager.getTextField(info3Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info3TF.y = info2TF.y + info2TF.height + 10;
		container.addChild(info3TF);

		let info4Str = LanguageManager.getlocal("allianceFindInfo4",[this._allianceInfo.wealth])
		let info4TF:BaseTextField = ComponentManager.getTextField(info4Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info4TF.y = info3TF.y + info3TF.height + 10;
		container.addChild(info4TF);

		let info5Str = LanguageManager.getlocal("allianceFindInfo5",[this._allianceInfo.affect])
		let info5TF:BaseTextField = ComponentManager.getTextField(info5Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info5TF.y = info4TF.y + info4TF.height + 10;
		container.addChild(info5TF);

		let info6Str = LanguageManager.getlocal("allianceFindInfo6",[this._allianceInfo.mn + "/" + this._allianceInfo.maxmn])
		let info6TF:BaseTextField = ComponentManager.getTextField(info6Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info6TF.y = info5TF.y + info5TF.height + 10;
		container.addChild(info6TF);

		let info7Str = LanguageManager.getlocal("allianceFindInfo7",[this._allianceInfo.cqq])
		let info7TF:BaseTextField = ComponentManager.getTextField(info7Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info7TF.y = info6TF.y + info6TF.height + 10;
		container.addChild(info7TF);

		let info8Str = LanguageManager.getlocal("allianceFindInfo8",[this._allianceInfo.intro])
		let info8TF:BaseTextField = ComponentManager.getTextField(info8Str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		info8TF.y = info7TF.y + info7TF.height + 10;
		info8TF.width = 480;
		container.addChild(info8TF);
		container.height = container.height + 10;


	}



	public dispose():void
	{	 
		this._inputTextField = null;
		this._dinnerInfoContainer =null;
		this._gotoBtn = null;
		this._scrollView = null;
		this._allianceInfo = null;

		super.dispose();
	}
}