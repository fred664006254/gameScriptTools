/**
 * 查找玩家
 */
class AdultSearchView extends PopupView
{
    public constructor() 
	{
		super();
    }
    
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
	private numLb:BaseTextField | BaseBitmapText= null;
	private _userIdtxt:string ="";
	private _bottomGroup : BaseDisplayObjectContainer = null;

	// private get api(){
    //     return Api.promoteVoApi;
    // }
    
    protected getResourceList(): string[] {
		return super.getResourceList().concat([
		    "atkraceVisitbg","atkracevipbg","servant_middlebg",
		]);
    }
    
    protected getTitleStr():string{
        return 'adultMarryOne';
    }
	
	protected initView():void
	{
		let view = this;
        // view.viewBg.width = 610;
        view.viewBg.height = 730;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

        let bg : BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// bg.width = view.viewBg.width - 40;
		bg.height = 565
		bg.width = 540;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0,50]);
		view.addChild(bg);

		
		//文字:追杀对象
		let killText = ComponentManager.getTextField(LanguageManager.getlocal("adultyinyuanrecordTitle2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.lefttop, killText, bg, [25,20]);
		view.addChild(killText);

		//查询输入框的底图
		let bg1: BaseBitmap = BaseBitmap.create("public_tc_srkbg05");
		bg1.width = 346;
		bg1.height = 44;
		view.setLayoutPosition(LayoutConst.lefttop, bg1, killText, [0,killText.textHeight + 10]);
		view.addChild(bg1);

		//输入文本
		var userIdInput:BaseTextField = new BaseTextField();
		userIdInput.type = egret.TextFieldType.INPUT;
		userIdInput.width = bg1.width;
		userIdInput.height = bg1.height;
		userIdInput.maxChars = 11;
		userIdInput.textAlign = egret.HorizontalAlign.LEFT
		userIdInput.verticalAlign = egret.VerticalAlign.MIDDLE;
		userIdInput.restrict="0-9";
		userIdInput.text=LanguageManager.getlocal("inputPlayerId");
		userIdInput.size=24;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, userIdInput, bg1,[10,0]);
		view.addChild(userIdInput);
		view.userIdInput=userIdInput;
		view.userIdInput.addEventListener(egret.TextEvent.CHANGE, view.callbackInput, view, false, 2);
		view.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN,view.foucusHandler,view);
		view._userIdtxt = userIdInput.text;

		//查询按钮
		let queryBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.queryBtnHandler,this);
		// queryBtn.setScale(0.85);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, queryBtn, bg1, [bg1.width + 15,0]);
		view.addChild(queryBtn);
	
		//文字:对方信息
		let otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		view.setLayoutPosition(LayoutConst.lefttop, otherPartyText, bg1, [0,bg1.height + 20]);
		view.addChild(otherPartyText);
		
		let bgImag: BaseBitmap = BaseBitmap.create("atkraceVisitbg"); 
        bgImag.scaleX = 1.08;
        bgImag.scaleY = 1.2;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bgImag, bg, [0, otherPartyText.y + otherPartyText.textHeight + 10 - bg.y]);
		view.addChild(bgImag);

		view._bottomGroup = new BaseDisplayObjectContainer();
		view._bottomGroup.width = bgImag.width * 1.1;
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
		if(PlatformManager.checkIsTextHorizontal())
		{
			view.officialRankbottom.y += view.officialRankbottom.height / 2;
		}
		//黑色长条背景
		let blackBgRect: BaseBitmap = BaseBitmap.create("servant_middlebg");
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
		let killBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultrequestlyin",view.appointConfirm,view);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, killBtn, view.viewBg, [0,45]);
        view.addChild(killBtn);
        killBtn.visible = false;
        view.killBtn = killBtn;
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
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
			NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {ruid:this._userIdtxt,rzid:ServerCfg.selectServer.zid});
			// NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETINFO, {"fuid" : this._userIdtxt});
		}
    }
    
    private _info : any;
	private useCallback(data:any):void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
		let view = this;
		if(data.data.data.ret == -3)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
			view.refreshView()
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
			this._info = atkraceinfo;
			var str =LanguageManager.getlocal("officialTitle"+atkraceinfo.level);
			let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(str + "", "office_fnt");//0xfff000
			if(PlatformManager.checkIsTextHorizontal())
			{
				view.officialRankbottom.rotation = -90;
				let scaleVale = 1;
				if(PlatformManager.checkIsEnSp())
				{
					scaleVale = 0.8; 
					numLb.setScale(scaleVale);
				}
				numLb.setPosition(view.officialRankbottom.x + view.officialRankbottom.height / 2 - numLb.width / 2 * scaleVale,view.officialRankbottom.y + view.officialRankbottom.width / 2 - view.officialRankbottom.height / 2);
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
			view.killBtn.visible = true;
			view._bottomGroup.visible = true;

			view.playerContainer = Api.playerVoApi.getPlayerPortrait(atkraceinfo.level,atkraceinfo.pic);
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
				view.yamunText.text = LanguageManager.getlocal("adultfeizinum",[atkraceinfo.wifenum]);
				view.setLayoutPosition(LayoutConst.lefttop, view.yamunText, view.powerText, [0,view.powerText.textHeight + desc]);
			}
			if(view.scoreRankText)
			{
				view.scoreRankText.text = LanguageManager.getlocal("adultchildnum",[""+atkraceinfo.childnum]);
				view.setLayoutPosition(LayoutConst.lefttop, view.scoreRankText, view.menkeText, [0,view.menkeText.textHeight + desc]);
			}
		}
	}

	//分封
	private appointConfirm():void{
		let view = this;
		if(Number(view._userIdtxt) == Api.playerVoApi.getPlayerID())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip3") );
			return;
		}
		this.param.data.confirmCallback.apply(this.param.data.handler,[view._userIdtxt]);
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
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
		
		view.userIdInput.removeEventListener(egret.TextEvent.CHANGE, view.callbackInput, view);
		view.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN,view.foucusHandler,view);
		view.officialRankbottom.visible =false;
		view.bottomNameImag.visible =false;
		view.bottomNameImag = null;
        view.powerText =null;
		view.menkeText =null;
		view.yamunText =null;
		view.nameText = null;
		view.scoreRankText =null;
		view.bg = null;
		view.blackBgRect  =null;
		view.bgImag2 =null;
		view.numLb  =null;
		view._userIdtxt ="";
		view.userIdInput = null;
		view.officialRankbottom = null;
		view.killBtn = null;
		view.numLb = null;
		view._userIdtxt= '';
		view.playerContainer = null;
		view._bottomGroup.visible = false;
		view._bottomGroup = null;
		super.dispose();
			
    }
}