/**
 * 追杀
 */
class NewAtkraceCrossVisitViewTab3 extends CommonViewTab
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
	
	private lastKillText:BaseTextField =null;
	private _targetId:string = "";
	private _info:any = null;

	// "atkraceErrordes1":"当前ID不存在",
    // "atkraceErrordes2":"请输入查询ID",
    public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{

		this.bg = BaseBitmap.create("public_9_probiginnerbg");
		this.bg.width=516;
		this.bg.height=502;
		this.bg.x =25;
		this.bg.y =55;
		this.addChild(this.bg);

		//文字:追杀对象
		let killText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceKillText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		killText.x = 62;
		killText.y = 80;
		this.addChild(killText);


		//查询输入框的底图
		let bg1: BaseBitmap = BaseBitmap.create("public_9_bg5");
		bg1.width = 346;
		bg1.height = 44;
		bg1.x=killText.x;
		bg1.y=killText.y+35;
		this.addChild(bg1);

		//输入文本
		var userIdInput:BaseTextField = new BaseTextField();
		userIdInput.type = egret.TextFieldType.INPUT;
		userIdInput.width = bg1.width;
		userIdInput.height = bg1.height;
		userIdInput.x = bg1.x//+10;
		userIdInput.y = bg1.y+10;
		userIdInput.maxChars = 11;
		userIdInput.textAlign =TextFieldConst.ALIGH_CENTER;
		userIdInput.restrict="0-9";
		userIdInput.text=LanguageManager.getlocal("inputPlayerId");
		userIdInput.size=20;
		this.addChild(userIdInput);
		this.userIdInput=userIdInput;

		this.userIdInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
		this.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		this._userIdtxt =userIdInput.text;
	

		//文字:对方信息
		let otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		otherPartyText.x = bg1.x;
		otherPartyText.y = bg1.height+bg1.y+35;
		this.addChild(otherPartyText);

		this.lastKillText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_last_kill"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.lastKillText.setPosition(otherPartyText.x+otherPartyText.width+5,otherPartyText.y);
		this.addChild(this.lastKillText);

		//查询按钮
		let queryBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.queryBtnHandler,this);
		queryBtn.setScale(0.85);
		queryBtn.x = bg1.x+bg1.width+15;
		queryBtn.y = bg1.y;
		this.addChild(queryBtn);

		
		let bgImag: BaseBitmap = BaseBitmap.create("atkraceVisitbg");
		bgImag.x=this.bg.x+this.bg.width/2- bgImag.width/2;
		bgImag.y=220;
		this.addChild(bgImag);


		let playerContainer: BaseDisplayObjectContainer= new BaseDisplayObjectContainer();
		this.addChild(playerContainer);
		this.playerContainer = playerContainer;


	
		//官衔背景图
		let officialRankbottom: BaseBitmap = BaseBitmap.create("atkracevipbg");
		officialRankbottom.x=bgImag.x+70;
		officialRankbottom.y=bgImag.y+50;
		this.addChild(officialRankbottom);
		officialRankbottom.visible =false;
		this.officialRankbottom =officialRankbottom;

		if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp())
		{
			officialRankbottom.rotation = -90;
			officialRankbottom.x -= 30;
			officialRankbottom.y += 40;


		}

		//黑色长条背景
		let blackBgRect: BaseBitmap = BaseBitmap.create("public_9_bg20");
		blackBgRect.width = 490;
		blackBgRect.height = 62;
		blackBgRect.x= bgImag.x+5;
		blackBgRect.y= bgImag.y+bgImag.height-blackBgRect.height-11;
		this.addChild(blackBgRect);
		this.blackBgRect = blackBgRect;
		this.showText();

		//人物名字底图
		let bottomNameImag: BaseBitmap = BaseBitmap.create("public_resnumbg");
		bottomNameImag.x=180+GameData.popupviewOffsetX;
		bottomNameImag.y=440;
		this.addChild(bottomNameImag);
		bottomNameImag.visible =false;
		this.bottomNameImag =bottomNameImag;
		
		//人物名字
		let nameText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.x = bottomNameImag.x+60;
		nameText.y = bottomNameImag.y+5;
		this.nameText =nameText;
		this.addChild(nameText);

		//追杀按钮
		let killBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceVisitTab3",this.killBtnHandler,this);
		killBtn.x = bgImag.x+bgImag.width/2-killBtn.width/2+20;
		killBtn.y = bgImag.height+bgImag.y+20;;
		this.addChild(killBtn);
		killBtn.visible =false;
		this.killBtn =killBtn;

		//追杀文字
		let atkraceTracingdesTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkraceTracingdescription"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		atkraceTracingdesTxt.x = 300;
		atkraceTracingdesTxt.y = 640;
		this.addChild(atkraceTracingdesTxt);

		let lastKillerInfo:any = Api.atkracecrossVoApi.getLastKillerInfo();
		if (lastKillerInfo && lastKillerInfo.uid)
		{	
			this.userIdInput.text = lastKillerInfo.uid;
			this._userIdtxt = lastKillerInfo.uid;
			NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, {"fuid":lastKillerInfo.uid});
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		}
		else
		{
			this.lastKillText.visible = false;
		}
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
		//势力    
		this.powerText = ComponentManager.getTextField("atkracepowerText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.powerText.text ="";//LanguageManager.getlocal("atkracepowerText",["2222"])
		this.powerText.x = this.blackBgRect.x+50
		this.powerText.y = this.blackBgRect.y+this.blackBgRect.height-50;
		this.addChild(this.powerText);


		//门客数量    
		this.menkeText = ComponentManager.getTextField("atkracemenkeText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.menkeText.text ="";//LanguageManager.getlocal("atkracemenkeText",["6666"])
		this.menkeText.x = this.powerText.x+240;
		this.menkeText.y = this.powerText.y;
		this.addChild(this.menkeText);

		//衙门分数    
		this.yamunText = ComponentManager.getTextField("atkraceyamunText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.yamunText.text ="";//LanguageManager.getlocal("atkraceyamunText",["3333"]);
		this.yamunText.x = this.powerText.x;
		this.yamunText.y =this.powerText.y+30;
		this.addChild(this.yamunText);

		//分数排行    
		this.scoreRankText = ComponentManager.getTextField("atkracescoreRankText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.scoreRankText.text = "";//LanguageManager.getlocal("atkracescoreRankText",["6789"])
		this.scoreRankText.x = this.menkeText.x;
		this.scoreRankText.y = this.menkeText.y+30;
		this.addChild(this.scoreRankText);

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
			this.lastKillText.visible = false;
			NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, {"fuid":this._userIdtxt});
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		}
	}
	private useCallback(data:any):void
	{
		if(data.data.data.ret==-2)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
			this.refreshView();
		}
		else if(data.data.data.ret ==-3)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes4");
			App.CommonUtil.showTip(str);
			this.refreshView();
		}
		else if (data.data.data.ret < 0)
		{
			var str:string =LanguageManager.getlocal("requestLoadErrorTip");
			App.CommonUtil.showTip(str);
			this.refreshView();
		}
		else if(data.data.data.data.atkraceinfo)
		{
			AtkraceCrossChallengeItem.zid = data.data.data.data.fzid;
			if (this.numLb) {
				this.removeChild(this.numLb);
				this.numLb = null;
			}
			if (this.playerContainer) {
				this.removeChild(this.playerContainer);
				this.playerContainer = null;
			}
			if (this.bgImag2) {
				this.removeChild(this.bgImag2);
				this.bgImag2 = null;
			}
			this._targetId = this.userIdInput.text;
			let atkraceinfo =data.data.data.data.atkraceinfo; 
			this._info = atkraceinfo;
			var str =LanguageManager.getlocal("officialTitle"+atkraceinfo.level);
			let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(str + "", "office_fnt",0xfff000);
			if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp())
			{
				let scaleVale = 0.8;
				numLb.setScale(scaleVale);
				this.officialRankbottom.height = numLb.width + 10;
				numLb.setPosition(this.officialRankbottom.x + this.officialRankbottom.height / 2 - numLb.width / 2 * scaleVale,this.officialRankbottom.y - this.officialRankbottom.width  + numLb.height / 2 * scaleVale - 3);
			}
			else
			{
				numLb.width=35;
				numLb.height=this.officialRankbottom.height;
				numLb.x =this.officialRankbottom.x+3;
				numLb.y =this.officialRankbottom.y;
			}
			
			this.addChild(numLb);
			this.numLb =numLb;
			
			this.officialRankbottom .visible =true;
			this.bottomNameImag.visible =true;
			if(Api.playerVoApi.getPlayerID()==Number(this._userIdtxt)||atkraceinfo.iscankill==0)
			{
				this.killBtn.visible =false;
			}
			else
			{
				this.killBtn.visible =true;
			}
			this.nameText.visible =true;
			this.nameText.visible =true;
			if(this.powerText)
			{
				this.powerText.visible =true;
			}
			if(this.menkeText)
			{
				this.menkeText.visible =true;
			}
			if(this.yamunText)
			{
				this.yamunText.visible =true;
			}
			if(this.scoreRankText)
			{
				this.scoreRankText.visible =true;
			}
			
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

			 this.playerContainer=Api.playerVoApi.getPlayerPortrait(curLv,atkraceinfo.pic);
			 this.playerContainer.x=110+GameData.popupviewOffsetX;
			 this.playerContainer.y=220;
			 this.addChild(this.playerContainer);
			 this.setChildIndex(this.playerContainer,this.getChildIndex(this.blackBgRect)-1);

			this.bgImag2= BaseBitmap.create("atkraceVisitbg");
			this.bgImag2.x=this.bg.x+this.bg.width/2- this.bgImag2.width/2;
			this.bgImag2.y=210;
			this.addChild(this.bgImag2);
			this.playerContainer.mask = this.bgImag2;
			
			this.nameText.text = atkraceinfo.name;
			this.nameText.x = this.bottomNameImag.x+this.bottomNameImag.width/2-this.nameText.width/2
			if(this.scoreRankText)
			{
				this.scoreRankText.text =LanguageManager.getlocal("atkracescoreRankText",[""+atkraceinfo.rank]);
			}
			if(this.menkeText)
			{
				this.menkeText.text =LanguageManager.getlocal("atkracemenkeText",[atkraceinfo.snum]);
			}
			if(this.yamunText)
			{	
				let pointstr = String(atkraceinfo.point);
				if (atkraceinfo.point<-8888)
				{
					pointstr = LanguageManager.getlocal("newatkraceRankLess");
				}
				this.yamunText.text =LanguageManager.getlocal("atkraceyamunText",[pointstr]);
			}
			if(this.powerText)
			{
				this.powerText.text =LanguageManager.getlocal("atkracepowerText",[atkraceinfo.power]);
			}
			
		}
	}

	//追杀
	private killBtnHandler(evt:egret.TouchEvent):void
	{	
		if(Api.atkracecrossVoApi.isCanJoin==false)
        {
			let crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`atkraceNoDes`,crossVo.isCrossLeague())));
            return; 
        }
		if (this._info.point < -8888)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceServantLess30"));
			return; 
		}

		


		
		if(this._targetId.length<7)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
		}
		else
		{	
			let acCfg = Api.atkracecrossVoApi.getNewCrossCfg();
			let pointDiff = Api.atkracecrossVoApi.getPoint() - this._info.point;
			if (this._info.rank>acCfg.lowerLimit3 && this._info.point<=acCfg.lowerLimit1)
			{
				let tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp2",[String(acCfg.lowerLimit1)]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"acthrowstoneTipTitle",
					msg:tipstr,
					callback:this.realKill,
					handler:this,
					needCancel:true,
				}); 
			}
			
			else if (this._info.rank>acCfg.lowerLimit3 &&  pointDiff>=acCfg.lowerLimit2)
			{
				let tipstr = LanguageManager.getlocal("newatkraceServantChallengeTp1",[String(acCfg.lowerLimit2)]);
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"acthrowstoneTipTitle",
					msg:tipstr,
					callback:this.realKill,
					handler:this,
					needCancel:true,
				}); 
			}
			else
			{
				this.realKill();
			}

		/**
		 * "atkraceinfo":{"allianceId":1100004,"level":20,"power":5615925218,"snum":83,"pic":3906,"rank":3,"name":"vip","iscankill":0,"point":-83},"fzid":11},
		 * 
		 */

			
		} 
	}

	private realKill():void
	{
		let data:any =[];
		data.type=3;
		data.uid=this._targetId;
		AtkraceCrossChallengeItem.data =data;
		ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW,{info : this._info});
	}

	public refreshView():void
	{
		this.officialRankbottom .visible =false;
		this.bottomNameImag.visible =false;
		this.killBtn.visible =false;
		if(this.nameText)
		{
			this.nameText.visible =false;
		}
		if(this.powerText)
		{
			this.powerText.visible =false;
		}
		if(	this.menkeText)
		{
			this.menkeText.visible =false;
		}
		if(this.yamunText)
		{
			this.yamunText.visible =false;
		}
		if(	this.scoreRankText)
		{
			this.scoreRankText.visible =false;
		}
	
		if(this.numLb)
		{
			this.numLb.visible =false;
		}
	
		if(this.playerContainer)
		{
			this.playerContainer.visible =false;
		}
	}
    public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		this.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		this.officialRankbottom .visible =false;
		this.bottomNameImag.visible =false;
        this.powerText =null;
		this.menkeText =null;
		this.yamunText =null;
		this.scoreRankText =null;
		this.blackBgRect  =null;
		this.bgImag2 =null;
		this.numLb  =null;
		this.playerContainer.mask = null;
		this.playerContainer = null;
		this._userIdtxt ="";
		this.lastKillText = null;
		this._targetId = null;
		this._info = null;
		super.dispose();
			
    }
}