/**
 * 编号查找玩家
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkCreatePopupView
 */

class StudyatkAllCreatePopupView extends PopupView
{
	static itemId = "1751";
    private needItem:string = null;
    private needAllianceItem:string = null;
    
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}

	protected initView():void
	{	
        this.needItem = GameConfig.config.studyatkbaseCfg.needItem;
        this.needAllianceItem = GameConfig.config.studyatkbaseCfg.needAllianceItem;

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
        bottomBg.height = 80;
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

        //anniu
		let needItemNum = Api.itemVoApi.getItemNumInfoVoById(this.needItem);

        let icon3 = BaseLoadBitmap.create("itemicon" + this.needItem);
        icon3.width = 100;
        icon3.height = 100;
        icon3.scaleX = 0.7;
        icon3.scaleY = 0.7;
        this._nodeContainer.addChild(icon3);
        
		let txt3 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
		if (needItemNum >= 1)
		{
			txt3.text = LanguageManager.getlocal("studyatk_allcreateTxt3",[String(needItemNum)]);
		}else{
			txt3.text = LanguageManager.getlocal("studyatk_allcreateTxt4");
		}
		this._nodeContainer.addChild(txt3);

        icon3.x = 170 - (icon3.width * 0.7 + txt3.width)/2;
        icon3.y = bottomBg.y + bottomBg.height + 5;


        txt3.x = icon3.x + icon3.width * 0.7;
        txt3.y = icon3.y + icon3.height * 0.7/2 - txt3.height/2;

        //-------------
		let needAllianceItemNum = Api.itemVoApi.getItemNumInfoVoById(this.needAllianceItem);

        let icon4 = BaseLoadBitmap.create("itemicon" + this.needAllianceItem);
        icon4.width = 100;
        icon4.height = 100;
        icon4.scaleX = 0.7;
        icon4.scaleY = 0.7;
        this._nodeContainer.addChild(icon4);
        
		let txt4 = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
		if (needAllianceItemNum >= 1)
		{
			txt4.text = LanguageManager.getlocal("studyatk_allcreateTxt3",[String(needAllianceItemNum)]);
		}else{
			txt4.text = LanguageManager.getlocal("studyatk_allcreateTxt4");
		}
		this._nodeContainer.addChild(txt4);

        icon4.x = this.viewBg.width - 170 - (icon4.width * 0.7 + txt4.width)/2;
        icon4.y = icon3.y;

        txt4.x = icon4.x + icon4.width * 0.7;
        txt4.y = icon4.y + icon4.height * 0.7/2 - txt4.height/2;
        //-------


		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"studyatkCreatePopupViewTitle",this.confirmHandler,this);
		confirmBtn.x = 170 - confirmBtn.width/2;//this.viewBg.width - confirmBtn.width - cancelBtn.x ;
		confirmBtn.y = icon3.y + icon3.height * 0.7 + 5;//cancelBtn.y ;
		this._nodeContainer.addChild(confirmBtn);

        let confirmAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"studyatkAllCreatePopupViewTitle",this.confirmAllHandler,this);
		confirmAllBtn.x = this.viewBg.width - 170 - confirmAllBtn.width/2;    //this.viewBg.width - confirmBtn.width - cancelBtn.x ;
		confirmAllBtn.y = confirmBtn.y;//cancelBtn.y ;
		this._nodeContainer.addChild(confirmAllBtn);
		
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
		
        let itemNum = Api.itemVoApi.getItemNumInfoVoById(this.needItem);
        if(itemNum > 0)
        {
           NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE,{});
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip1"));
        }
	}
	protected confirmAllHandler()
	{
		
		let id = Api.playerVoApi.getPlayerAllianceId();
		if((!id) || id <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip4"));
			return;
		}
        let itemNum = Api.itemVoApi.getItemNumInfoVoById(this.needAllianceItem);
        if(itemNum > 0)
        {
			//帮会聊天发消息
			let txtStr:string=LanguageManager.getlocal("allinaceChatMsg4");

			let chatData:any = {};
			chatData.channel = Api.playerVoApi.getPlayerAllianceId();
			chatData.message = txtStr;
			NetManager.requestChat(chatData);

            NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE,{ctype:1});
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip3"));
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