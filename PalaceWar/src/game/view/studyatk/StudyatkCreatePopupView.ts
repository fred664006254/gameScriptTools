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
	private _dragProgressBar:DragProgressBar = null;
	private _useNum = 0;
	private _text : BaseTextField = null;
	private _timetext : BaseTextField = null;
	private maxnum = 0;
	private _havetxt:BaseTextField=null;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "progress2","progress2_bg"
        ]);
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

		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 520;
        bottomBg.height = 170;
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
		// this.maxnum = Math.min(3,itemNum);
		if (itemNum >= 1)
		{
			txt3.text = LanguageManager.getlocal("studyatk_createTxt3",['1']);
		}else{
			txt3.text = LanguageManager.getlocal("studyatk_createTxt4", [`1`]);
		}
		txt3.x = txt1.x ;
		txt3.y = txt1.y + 50;
		this._nodeContainer.addChild(txt3);
		this._text = txt3;

		let txt4 = ComponentManager.getTextField(LanguageManager.getlocal("studyatk_createTxt5",[App.DateUtil.getFormatBySecond(studyatkbaseCfg.lastTime * 1, 16)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt4.x = txt2.x ;
		txt4.y = txt3.y;
		this._timetext = txt4;
		this._nodeContainer.addChild(txt4);

		//
		this._useNum = 1;

	    this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", 3, this.dragCallback, this, null, 1, 380);
        this._dragProgressBar.setPosition(90+GameData.popupviewOffsetX+5, txt3.y + txt3.height + 20);
        this._nodeContainer.addChild(this._dragProgressBar);
		this._dragProgressBar.setMinNum(0);
	
		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.cancelHandler,this);
		cancelBtn.x = 80+GameData.popupviewOffsetX;
		cancelBtn.y = bottomBg.y + bottomBg.height + 36;
		this._nodeContainer.addChild(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"studyatkCreatePopupViewTitle",this.confirmHandler,this);
		confirmBtn.x = this.viewBg.width - confirmBtn.width - cancelBtn.x;
		confirmBtn.y = cancelBtn.y ;
		this._nodeContainer.addChild(confirmBtn);

		let icon = BaseLoadBitmap.create(`itemicon${StudyatkCreatePopupView.itemId}`);
		icon.width = 100;
		icon.height = 100;
		this._nodeContainer.addChild(icon);
		icon.setScale(0.3);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop,icon,confirmBtn,[confirmBtn.width/2-icon.scaleX*icon.width-3,-(icon.height*icon.scaleY)+2]);

		let havetxt = ComponentManager.getTextField(this._useNum + "/" + itemNum, 20, itemNum>=this._useNum?TextFieldConst.COLOR_BLACK:TextFieldConst.COLOR_WARN_RED);
		this._nodeContainer.addChild(havetxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,havetxt,icon,[icon.width*icon.scaleX-3,0]);
		this._havetxt = havetxt;
	}

	private dragCallback(curNum: number): void {
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
		this._useNum = curNum;
		if(this._useNum == 0) {
			this._dragProgressBar.setDragPercent(1, 3);
			this._useNum = 1;
		}
		this._havetxt.text = this._useNum + "/" + itemNum;
		this._havetxt.setColor(itemNum>=this._useNum?TextFieldConst.COLOR_BLACK:TextFieldConst.COLOR_WARN_RED);
		// let numStr = String(this._useNum) + "/" + String(3);
		this._text.text = LanguageManager.getlocal((itemNum > 0 && itemNum >= curNum) ? "studyatk_createTxt3" : "studyatk_createTxt4",[String(this._useNum)]);
		let studyatkbaseCfg = GameConfig.config.studyatkbaseCfg;
		this._timetext.text = LanguageManager.getlocal("studyatk_createTxt5",[App.DateUtil.getFormatBySecond(studyatkbaseCfg.lastTime * this._useNum, 16)])
		// this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2, this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
	}

	protected resetBgSize()
	{
		super.resetBgSize();
		this.viewBg.height = 445;
		if(Api.switchVoApi.checkOpenStudyatkExp())
		{	
			let textKey:string ;
			if (Api.switchVoApi.checkIsSceneState("202"))
			{
				textKey= "studyatkCreatePopupViewButtom_withHouseSkin";
			}
			else
			{
				textKey= "studyatkCreatePopupViewButtom";
			}
			let buttomTip = ComponentManager.getTextField(LanguageManager.getlocal(textKey),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width-GameData.popupviewOffsetX,this.viewBg.y + this.viewBg.height+10);
			if(PlatformManager.checkIsEnLang())
			{
				buttomTip.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomTip.width / 2,this.viewBg.y + this.viewBg.height);
			}
			this.addChild(buttomTip);
		}
	}
	 protected studyBtnHandlerCallback(event:egret.Event)
     {
		if(event.data.ret){
			let rdata = event.data.data;
			if(rdata.ret == 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip2"));
			}
			this.hide();
		}
		else{
			//兼容处理
		}
     }

	protected confirmHandler()
	{
		
        let itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        if(itemNum >= this._useNum)
        {
           NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE,{
			   itemNum : this._useNum
		   });
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
		this._dragProgressBar = null;
		this._text = null;
		this._timetext = null;
		super.dispose();
	}
}