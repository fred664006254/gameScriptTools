/**
 * 查找玩家
 */
class PromotePlayerPopViewTab4 extends CommonViewTab
{

	private powerText:BaseTextField =null;
	private menkeText:BaseTextField =null;
	private yamunText:BaseTextField =null;
	private nameText:BaseTextField =null;
	
	private scoreRankText:BaseTextField =null;
	private bg:BaseBitmap =null;
	// private _userId:string =null;
	private blackBgRect:BaseBitmap =null;
	private playerContainer:BaseDisplayObjectContainer =null;
	private userIdInput:BaseTextField;
	private bgImag2:BaseBitmap =null;
	private officialRankbottom:BaseBitmap =null;
	private bottomNameImag:BaseBitmap =null;
	private killBtn:BaseButton =null;
	private numLb:BaseBitmapText|BaseTextField= null;
	private _userIdtxt:string ="";
	private _bottomGroup : BaseDisplayObjectContainer = null;
	

	// "atkraceErrordes1":"当前ID不存在",
    // "atkraceErrordes2":"请输入查询ID",
    public constructor() 
	{
		super();
		this.initView();
	}

	private get api(){
        return Api.promoteVoApi;
	}
	
	protected initView():void
	{
		let view = this;
		view.width = GameConfig.stageWidth - 40;
		view.height = GameConfig.stageHeigth - 370;
		//文字:追杀对象
		let killText = ComponentManager.getTextField(LanguageManager.getlocal("PromotePlayersPopViewFindTarget"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.lefttop, killText, view, [15,30]);
		view.addChild(killText);

		//查询输入框的底图
		let bg1: BaseBitmap = BaseBitmap.create("public_9_bg5");
		bg1.width = 346;
		bg1.height = 44;
		view.setLayoutPosition(LayoutConst.leftverticalCenter, bg1, killText, [killText.textWidth + 20,0]);
		view.addChild(bg1);

		//输入文本
		var userIdInput:BaseTextField = new BaseTextField();
		userIdInput.type = egret.TextFieldType.INPUT;
		userIdInput.width = bg1.width;
		userIdInput.height = bg1.height;
		userIdInput.maxChars = 11;
		userIdInput.textAlign = egret.HorizontalAlign.CENTER
		userIdInput.verticalAlign = egret.VerticalAlign.MIDDLE;
		userIdInput.restrict="0-9";
		userIdInput.text=LanguageManager.getlocal("inputPlayerId");
		userIdInput.size=24;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, userIdInput, bg1);
		view.addChild(userIdInput);
		view.userIdInput=userIdInput;
		view.userIdInput.addEventListener(egret.TextEvent.CHANGE, view.callbackInput, view, false, 2);
		view.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN,view.foucusHandler,view);
		view._userIdtxt = userIdInput.text;

		//查询按钮
		let queryBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.queryBtnHandler,this);
		queryBtn.setScale(0.85);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, queryBtn, bg1, [bg1.width + 15,0]);
		view.addChild(queryBtn);
	
		//文字:对方信息
		let line: BaseBitmap = BaseBitmap.create("public_line3");
		line.width = 400;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg1, [0,bg1.height+30]);
		view.addChild(line);

		let otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, otherPartyText, line);
		view.addChild(otherPartyText);
		
		let bgImag: BaseBitmap = BaseBitmap.create("atkraceVisitbg");
		bgImag.setScale(1.2);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bgImag, otherPartyText, [0, otherPartyText.textHeight + 15]);
		if(PlatformManager.checkIsTextHorizontal())
		{
			bgImag.x = 10;
		}
		view.addChild(bgImag);
		


		view._bottomGroup = new BaseDisplayObjectContainer();
		view._bottomGroup.width = bgImag.width * 1.2;
		view._bottomGroup.height = bgImag.height * 1.2;
		view.setLayoutPosition(LayoutConst.lefttop, view._bottomGroup, bgImag);
		view.addChild(view._bottomGroup);
		let group = view._bottomGroup;

		let playerContainer : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		group.addChild(playerContainer);
		view.playerContainer = playerContainer;

		//官衔背景图
		let officialRankbottom: BaseBitmap = BaseBitmap.create("atkracevipbg");
		view.setLayoutPosition(LayoutConst.lefttop, officialRankbottom, view._bottomGroup, [70,50], true);
		group.addChild(officialRankbottom);
		view.officialRankbottom = officialRankbottom;
		// if(PlatformManager.checkIsThSp())
		// {
		// 	view.officialRankbottom.rotation = -90;
		// 	view.officialRankbottom.y +=view.officialRankbottom.height / 2;
		// }
	 
		// if(PlatformManager.checkIsEnSp())
		// {
		// 	view.officialRankbottom.rotation = -90;
		// 	view.officialRankbottom.width=view.officialRankbottom.width+10;
		// 	view.officialRankbottom.y +=view.officialRankbottom.height / 2; 
		// }
		if(PlatformManager.checkIsTextHorizontal())
		{
			officialRankbottom.rotation = -90;
			officialRankbottom.y += 30; 
			officialRankbottom.x -= 5;
		}
		//黑色长条背景
		let blackBgRect: BaseBitmap = BaseBitmap.create("public_9_bg20");
		blackBgRect.width = 490;
		blackBgRect.height = 80;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, blackBgRect, view._bottomGroup, [0,10], true);
		group.addChild(blackBgRect);
		view.blackBgRect = blackBgRect;
		view.showText();
		//人物名字底图
		let bottomNameImag: BaseBitmap = BaseBitmap.create("public_resnumbg");
		bottomNameImag.height = 50;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomNameImag, blackBgRect, [0,blackBgRect.height + 10]);
		group.addChild(bottomNameImag);
		view.bottomNameImag = bottomNameImag;
		//人物名字
		let nameText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		view.nameText = nameText;
		group.addChild(nameText);
		group.visible = false;
		//追杀按钮
		let killBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"promotePlayerPopViewTitle",view.appointConfirm,view);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, killBtn, view, [0,10]);
		view.addChild(killBtn);
		view.killBtn = killBtn;
		view.killBtn.visible = false;
    }
	
	private callbackInput(event:egret.TextEvent)
	{
		this._userIdtxt = event.target.text;
		App.LogUtil.log("event.target.text:" + event.target.text);
	}

	private foucusHandler(event:egret.TextEvent):void
	{
		var str = LanguageManager.getlocal("inputPlayerId");
		if(	this._userIdtxt==str)
		{
			this.userIdInput.text ="";
			// this._userId="";
		}
	}

	public showText():void
	{
		let view = this;
		let group = view._bottomGroup;
		
		//势力    
		view.powerText = ComponentManager.getTextField("atkracepowerText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		view.powerText.text ="";
		group.addChild(this.powerText);
		//门客数量    
		view.menkeText = ComponentManager.getTextField("atkracemenkeText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		view.menkeText.text ="";
		group.addChild(this.menkeText);
		//衙门分数    
		view.yamunText = ComponentManager.getTextField("atkraceyamunText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		view.yamunText.text ="";
		group.addChild(this.yamunText);
		//分数排行    
		view.scoreRankText = ComponentManager.getTextField("atkracescoreRankText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		view.scoreRankText.text = "";
		group.addChild(this.scoreRankText);
	}

	//查询
	private queryBtnHandler(evt:egret.TouchEvent):void
	{	
		var str = LanguageManager.getlocal("inputPlayerId");
		if(this._userIdtxt.length<=0||this._userIdtxt ==str)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes2");
			App.CommonUtil.showTip(str);
			this.refreshView();
			return
		}
		if(this._userIdtxt.length<7)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes1");
			App.CommonUtil.showTip(str);
			this.refreshView();
		}
		else
		{
			NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {ruid:this._userIdtxt,rzid:ServerCfg.selectServer.zid});
			// etManager.request(NetRequestConst.REQUEST_ATKRACE_GETINFO, {"fuid" : this._userIdtxt});
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
			// NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETINFO, {"fuid" : this._userIdtxt});
			// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETINFO), this.useCallback, this);
		}
	}

	private useCallback(data:any):void
	{
		let view = this;
		if (!data || !data.data){
			view.refreshView();
			return;
		}
		if(data.data.data.ret == -3)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
			view.refreshView()
			return;
		}
		else if(data.data.data.data)
		{
			let selfZid = Api.mergeServerVoApi.getTrueZid();
			let targetZid = Api.mergeServerVoApi.getTrueZid(data.data.data.data.ruid);
			if(Api.mergeServerVoApi.judgeIsSameServer(selfZid,targetZid)==false){
				var str:string =LanguageManager.getlocal("atkraceErrordes3");
				App.CommonUtil.showTip(str);
				view.refreshView()
				return;
			}
			if (view.numLb) {
				view.numLb.dispose();
				view.numLb = null;
			}
			if (view.playerContainer) {
				view.playerContainer.dispose();
				view.playerContainer = null;
			}
			if (view.bgImag2) {
				view.bgImag2.dispose();
				view.bgImag2 = null;
			}
	
			let atkraceinfo = data.data.data.data; 
			var str =LanguageManager.getlocal("officialTitle"+atkraceinfo.level);
			let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(str + "", "office_fnt",0xfff000);
			if(PlatformManager.checkIsTextHorizontal())
			{
				numLb.setPosition(view.officialRankbottom.x + view.officialRankbottom.height / 2 - numLb.width/2,view.officialRankbottom.y - view.officialRankbottom.width / 2 - numLb.height/2);
			}
			else
			{
				numLb.width = 35;
				numLb.height = view.officialRankbottom.height;
				numLb.setScale(0.8);
				view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numLb, view.officialRankbottom);
			}
			
			view._bottomGroup.addChild(numLb);
			view.numLb =numLb;	
			
			//已经是分封大臣
			view.killBtn.visible = !view.api.isInPromoteList(view._userIdtxt);
			view._bottomGroup.visible = true;

			let tinfo = App.CommonUtil.getTitleData(atkraceinfo.title);
			let curLv = atkraceinfo.level;
			let posX = 20;
			if (tinfo.clothes != "")
			{	
				if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes))
				{
					curLv = tinfo.clothes;
					let isnew = Api.playerVoApi.getNewPalaceRole(curLv);
					posX = isnew ? -160 : -10;
				}
			}

			view.playerContainer = Api.playerVoApi.getPlayerPortrait(curLv,atkraceinfo.pic);
			view.setLayoutPosition(LayoutConst.horizontalCentertop, view.playerContainer, view._bottomGroup, [0,100], true);
			view._bottomGroup.addChild(this.playerContainer);
			view._bottomGroup.setChildIndex(this.playerContainer,view._bottomGroup.getChildIndex(this.blackBgRect)-1);

			view.bgImag2 = BaseBitmap.create("atkraceVisitbg");
			view.bgImag2.setScale(1.2);
			view.bgImag2.height -= 10;
			view.setLayoutPosition(LayoutConst.horizontalCentertop, view.playerContainer, view._bottomGroup, [0,0], true);
			view._bottomGroup.addChild(view.bgImag2);
			view.playerContainer.mask = view.bgImag2;
			
			view.nameText.text = atkraceinfo.name;
			view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.nameText, view.bottomNameImag);
			let desc = (view.blackBgRect.height - 22 * 2) / 3;
			if(view.powerText)
			{
				view.powerText.text = LanguageManager.getlocal("atkracepowerText",[atkraceinfo.power]);
				view.setLayoutPosition(LayoutConst.lefttop, view.powerText, view.blackBgRect, [50,desc]);
			}
			if(view.menkeText)
			{
				view.menkeText.text = LanguageManager.getlocal("chatblockAlliance2",[atkraceinfo.gname == '' ? LanguageManager.getlocal('nothing') : atkraceinfo.gname]);
				view.setLayoutPosition(LayoutConst.righttop, view.menkeText, view.blackBgRect, [50,desc]);
			}
			if(view.yamunText)
			{
				view.yamunText.text = LanguageManager.getlocal("atkraceLevelText",[Api.playerVoApi.getPlayerOfficeByLevel(atkraceinfo.level)]);
				view.setLayoutPosition(LayoutConst.lefttop, view.yamunText, view.powerText, [0,view.powerText.textHeight + desc]);
			}
			if(view.scoreRankText)
			{
				view.scoreRankText.text = LanguageManager.getlocal("atkraceVipText",[""+atkraceinfo.vip]);
				view.setLayoutPosition(LayoutConst.lefttop, view.scoreRankText, view.menkeText, [0,view.menkeText.textHeight + desc]);
			}
		}
	}

	//分封
	private appointConfirm():void{
		let view = this;
		if(Number(view._userIdtxt) == Api.playerVoApi.getPlayerID()){
			App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewAppointFail2'));
            return;
		}
		let parent:any = ViewController.getInstance().getView('PromotePlayerPopView');
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal("PromotePlayersPopViewRmConfirm",[view.nameText.text, LanguageManager.getlocal(`promoteType${parent.promoteType}`)]),
            callback:this.appoint,
            handler:this,
            needCancel:true,
            txtcolor: 0xffffff
        });
    }

    private appoint():void{
        let view = this;
		let parent:any = ViewController.getInstance().getView('PromotePlayerPopView');
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_APPOINT, {
            position : parent.promoteType,
            auid : view._userIdtxt,
        });
    }

	public refreshView():void
	{
		let view = this;
		view.userIdInput.text = LanguageManager.getlocal("inputPlayerId");
		view._userIdtxt = view.userIdInput.text;
		view.killBtn.visible = view._bottomGroup.visible = false;
	}

	public refreshWhenSwitchBack():void{
		let view = this;
		view.refreshView();
	}

    public dispose():void
	{
	// 	private powerText:BaseTextField =null;
	// private menkeText:BaseTextField =null;
	// private yamunText:BaseTextField =null;
	// private nameText:BaseTextField =null;
	
	// private scoreRankText:BaseTextField =null;
	// private bg:BaseBitmap =null;
	// // private _userId:string =null;
	// private blackBgRect:BaseBitmap =null;
	// private playerContainer:BaseDisplayObjectContainer =null;
	// private userIdInput:BaseTextField;
	// private bgImag2:BaseBitmap =null;
	// private officialRankbottom:BaseBitmap =null;
	// private bottomNameImag:BaseBitmap =null;
	// private killBtn:BaseButton =null;
	// private numLb:BaseBitmapText= null;
	// private _userIdtxt:string ="";
	// private _bottomGroup : BaseDisplayObjectContainer = null;

		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
		view.userIdInput.removeEventListener(egret.TextEvent.CHANGE, view.callbackInput, view);
		view.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN,view.foucusHandler,view);
		view.officialRankbottom.visible =false;
		view.bottomNameImag.visible =false;
        view.powerText =null;
		view.menkeText =null;
		view.yamunText =null;
		view.scoreRankText =null;
		view.blackBgRect  =null;
		view.bgImag2 =null;
		this.numLb  =null;
		view._userIdtxt ="";
		view._bottomGroup.visible = false;
		view.playerContainer = null;
		view._bottomGroup.visible = false;
		view._bottomGroup = null;
		super.dispose();
			
    }
}