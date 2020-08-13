/**
 * 编号查找玩家
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkCreatePopupView
 */

class StudyatkCreatePopupView extends PopupView
{
	static itemId = "1751";
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	protected initView():void
	{	
	    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE),this.studyBtnHandlerCallback,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let addExp = GameConfig.config.studyatkbaseCfg.addExp;
		let tipTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
		tipTxt.multiline = true;
		tipTxt.width = 500;
		tipTxt.lineSpacing = 5;
		tipTxt.text = LanguageManager.getlocal("studyatk_createTipTxt",[String(addExp+1)]);
		tipTxt.x = this.viewBg.width/2 - tipTxt.width/2;
		tipTxt.y = 20;
		this._nodeContainer.addChild(tipTxt);

		let bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 520;
        bottomBg.height = 154;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = tipTxt.y +tipTxt.height+ 15;
        this._nodeContainer.addChild(bottomBg);

		let txt1 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt1.text = LanguageManager.getlocal("studyatk_createTxt1",[Api.playerVoApi.getPlayerOffice()]);
		txt1.x = bottomBg.x  +30;
		txt1.y = bottomBg.y + 30;
		this._nodeContainer.addChild(txt1);

		let studyatkbaseCfg = GameConfig.config.studyatkbaseCfg ;
		let  addPerMin = studyatkbaseCfg.levelList[String(Api.playerVoApi.getPlayerLevel())];
		let txt2 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt2.text = LanguageManager.getlocal("studyatk_createTxt2",[addPerMin]);
		txt2.x = txt1.x  + 250;
		txt2.y = txt1.y 
		this._nodeContainer.addChild(txt2);

		let itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
		let txt3 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
		if (itemNum >= 1)
		{
			txt3.text = LanguageManager.getlocal("studyatk_createTxt3",[String(itemNum)]);
		}else{
			txt3.text = LanguageManager.getlocal("studyatk_createTxt4");
		}
		txt3.x = txt1.x ;
		txt3.y = txt1.y + 50;
		this._nodeContainer.addChild(txt3);

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"cancelBtn",this.cancelHandler,this);
		cancelBtn.x = 100;
		cancelBtn.y = bottomBg.y + bottomBg.height + 20;
		this._nodeContainer.addChild(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"studyatkCreatePopupViewTitle",this.confirmHandler,this);
		confirmBtn.x = this.viewBg.width - confirmBtn.width - cancelBtn.x ;
		confirmBtn.y = cancelBtn.y ;
		this._nodeContainer.addChild(confirmBtn);
		
	}

	protected resetBgSize()
	{
		super.resetBgSize()
		if(Api.switchVoApi.checkOpenStudyatkExp())
		{
			let buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("studyatkAddExp"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width,this.viewBg.y + this.viewBg.height);
			this.addChild(buttomTip);
		}

	}
	 protected studyBtnHandlerCallback(event:egret.Event)
     {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip2"));
        }
		this.hide();
     }

	protected confirmHandler()
	{
		
        let itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        if(itemNum > 0)
        {
           NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE,{});
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip1"));
        }
	}
	protected cancelHandler()
	{
		this.hide()
	}

	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE),this.studyBtnHandlerCallback,this);
		this._nodeContainer = null;

		super.dispose();
	}
}