/**
 * 编号查找玩家
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkFindPopupView
 */

class StudyatkFindPopupView extends PopupView
{

	private _inputTextField:BaseTextField = null;

	private _findInfo:any = null;
	private _gotoBtn:BaseButton = null;
	private _rankBg:BaseBitmap;
	private _findTxtNodeControler:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	protected initView():void
	{	
		
		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 520;
		typeBg.height = 600;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);
		this._findTxtNodeControler = new BaseDisplayObjectContainer();
		

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
		let infoText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("studyatk_find_teamInfo"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
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
		this.addChildToContainer(this._findTxtNodeControler);

	}

	private findHandle():void
	{
		if (this._inputTextField.text.length < 5 || this._inputTextField.text == LanguageManager.getlocal("inputPlayerId")) {
			App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
			return;
		}
		if (Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
			return;
		}
		this.request(NetRequestConst.REQUEST_STUDYATK_GETATK,{"fuid":Number(this._inputTextField.text)});

	}

	private gotoHandle():void
	{
		let lastTime = GameConfig.config.studyatkbaseCfg.lastTime;
		if(this._findInfo.create_time + lastTime < GameData.serverTime)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_joincode-2"));
			return;
		}
		let info:any =this._findInfo;
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW,info)
		this.hide();
	}

	protected receiveData(data: { ret: boolean, data: any }): void 
	{
		
		if (data.ret == true) {
			if (data.data.data.dinnerinfo && !data.data.data.dinnerinfo.dtype) {
				App.CommonUtil.showTip(LanguageManager.getlocal("playerIdIsNoDinner"));
				return;
			}
			if (data.data.data.proflag == 1 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
				return;
			}

			this._gotoBtn.visible = true;
			this._findInfo = data.data.data.getatk;
			this.showFindInfo();
		}
	}

	private showFindInfo():void
	{
		this._findTxtNodeControler.removeChildren();
		let txtCfg=undefined;
		/**
		 * 有房间
		 */
		if (this._findInfo.create_time)
		{
			/**
			 * 自己创建
			 */
			let studyatkbaseCfg = GameConfig.config.studyatkbaseCfg ;
			let  addPerMin = studyatkbaseCfg.levelList[String(this._findInfo.level)];
			let lastT = this._findInfo.create_time + studyatkbaseCfg.lastTime - GameData.serverTime;
			let lastTStr = App.DateUtil.getFormatBySecond(lastT,3);
			let mLen = String(Object.keys(this._findInfo.minfo).length);
			if(this._findInfo.dtype == 1 )
			{
				txtCfg=[
					LanguageManager.getlocal("studyatk_find_txt1",[this._findInfo.name]),
					LanguageManager.getlocal("studyatk_find_txt2",[LanguageManager.getlocal("officialTitle"+this._findInfo.level)]),
					LanguageManager.getlocal("studyatk_find_txt3",[mLen]),
					LanguageManager.getlocal("studyatk_find_txt4",[addPerMin]),
					LanguageManager.getlocal("studyatk_find_txt5",[lastTStr]),
				]
			} else if(this._findInfo.dtype == 2 ){
				txtCfg=[
					LanguageManager.getlocal("studyatk_find_txt6"),
					LanguageManager.getlocal("studyatk_find_txt3",[mLen]),
					LanguageManager.getlocal("studyatk_find_txt5",[lastTStr]),
				]
			}

		}else
		{
			this._gotoBtn.visible = false;
			if(this._findInfo.dtype==3){
				txtCfg=[
					LanguageManager.getlocal("studyatk_find_txt8"),
				]
			} else {
				txtCfg=[
					LanguageManager.getlocal("studyatk_find_txt7"),
				]
			}

		}
		
		let startY = this._rankBg.y + 15;
		for (var index = 0; index < txtCfg.length; index++) {
			let findText:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			findText.text = txtCfg[index];
			findText.width = 450;
			findText.lineSpacing = 6;
			findText.setPosition(this._rankBg.x + 20, startY);
			startY += findText.height + 10;
			this._findTxtNodeControler.addChild(findText);
		}
	}

	public dispose():void
	{	 
		this._inputTextField = null;
		this._findInfo =null;
		this._gotoBtn = null;
		this._rankBg = null;
		this._findTxtNodeControler = null;

		super.dispose();
	}
}