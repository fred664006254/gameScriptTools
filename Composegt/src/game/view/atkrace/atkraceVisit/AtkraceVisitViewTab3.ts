/**
 * 追杀
 */
class AtkraceVisitViewTab3 extends CommonViewTab
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
	

	// "atkraceErrordes1":"当前ID不存在",
    // "atkraceErrordes2":"请输入查询ID",
    public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{

		this.bg = BaseBitmap.create("public_9v_bg12");
		this.bg.width = 530;
		this.bg.height = 180;
		this.bg.x = GameConfig.stageWidth/2 - this.bg.width/2 -5;
		this.bg.y =75;
		this.addChild(this.bg);

		let bg2 = BaseBitmap.create("public_9v_bg12");
		bg2.width = 530;
		bg2.height = 445;
		bg2.x = this.bg.x;
		bg2.y = this.bg.y + this.bg.height + 10; 
		this.addChild(bg2);

		let killTextBg = BaseBitmap.create("public_ts_bg01");
		this.addChild(killTextBg);

		//文字:追杀对象
		let killText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceKillText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		killText.x = GameConfig.stageWidth/2 - killText.width/2 -5;
		killText.y = this.bg.y + 30;
		this.addChild(killText);

		killTextBg.width = killText.width + 160;
		killTextBg.x = killText.x + killText.width/2 - killTextBg.width/2;
		killTextBg.y = killText.y + killText.height/2 - killTextBg.height/2;
		


		//查询输入框的底图
		let bg1: BaseBitmap = BaseBitmap.create("public_tc_srkbg06");
		bg1.width = 340;
		bg1.height = 60;
		bg1.x= this.bg.x + 25;
		bg1.y= this.bg.y + 110 - bg1.height/2;
		this.addChild(bg1);

		//输入文本
		var userIdInput:BaseTextField = new BaseTextField();
		userIdInput.type = egret.TextFieldType.INPUT;
		userIdInput.width = bg1.width;
		userIdInput.height = bg1.height;
		userIdInput.x = bg1.x//+10;
		userIdInput.y = bg1.y+20;
		userIdInput.maxChars = 11;
		userIdInput.textAlign =TextFieldConst.ALIGH_CENTER;
		userIdInput.restrict="0-9";
		userIdInput.text=LanguageManager.getlocal("inputPlayerId");
		userIdInput.size=24;
		userIdInput.textColor = TextFieldConst.COLOR_INPUT;
		this.addChild(userIdInput);
		this.userIdInput=userIdInput;

		this.userIdInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
		this.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		this._userIdtxt =userIdInput.text;
	



		//查询按钮
		let queryBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.queryBtnHandler,this);
		// queryBtn.setScale(0.85);
		queryBtn.x = bg1.x+bg1.width+20;
		queryBtn.y = bg1.y + bg1.height/2 - queryBtn.height/2;
		this.addChild(queryBtn);

		
		let otherPartyTextBg = BaseBitmap.create("public_ts_bg01");
		this.addChild(otherPartyTextBg);
		//文字:对方信息
		let otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		otherPartyText.x = GameConfig.stageWidth/2 - otherPartyText.width/2 -5;
		otherPartyText.y = bg2.y + 35;
		this.addChild(otherPartyText);

		otherPartyTextBg.width = otherPartyText.width + 160;
		otherPartyTextBg.x = otherPartyText.x + otherPartyText.width/2 - otherPartyTextBg.width/2;
		otherPartyTextBg.y = otherPartyText.y + otherPartyText.height/2 - otherPartyTextBg.height/2;
		


		let bgImag: BaseBitmap = BaseBitmap.create("atkraceVisitbg");
		bgImag.x= GameConfig.stageWidth/2 - bgImag.width/2 - 5;
		bgImag.y= bg2.y + 85;
		this.addChild(bgImag);


		let playerContainer: BaseDisplayObjectContainer= new BaseDisplayObjectContainer();
		this.addChild(playerContainer);
		this.playerContainer =playerContainer;


	


		//黑色长条背景
		let blackBgRect: BaseBitmap = BaseBitmap.create("playerview_centerinfobg");
		blackBgRect.width = 490;
		blackBgRect.height = 70;
		blackBgRect.x= bgImag.x+5;
		blackBgRect.y= bgImag.y+bgImag.height-blackBgRect.height-4;
		this.addChild(blackBgRect);
		this.blackBgRect = blackBgRect;
		

		// //人物名字底图
		let bottomNameImag: BaseBitmap = BaseBitmap.create("public_lockbg");
		bottomNameImag.x=GameConfig.stageWidth/2 - bottomNameImag.width * bottomNameImag.scaleX /2 - 5;
		bottomNameImag.y=bg2.y + 305;
		this.addChild(bottomNameImag);
		bottomNameImag.visible =false;
		this.bottomNameImag =bottomNameImag;

		//官衔背景图
		let officialRankbottom: BaseBitmap = BaseBitmap.create("atkracevipbg");
		if(PlatformManager.checkIsTextHorizontal()){
			officialRankbottom.rotation = -90;
			officialRankbottom.height = 150;
			officialRankbottom.x = this.bottomNameImag.x + this.bottomNameImag.width/2 - officialRankbottom.height/2;
			officialRankbottom.y = this.bottomNameImag.y - 10;
		} else {
			officialRankbottom.x=bgImag.x+30;
			officialRankbottom.y=bgImag.y+30;
		}
		
		this.addChild(officialRankbottom);
		officialRankbottom.visible =false;
		this.officialRankbottom =officialRankbottom;
		this.showText();
		//人物名字
		let nameText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		nameText.x = this.bottomNameImag.x + this.bottomNameImag.width/2 - nameText.width/2;
		nameText.y = this.bottomNameImag.y + this.bottomNameImag.height/2 - nameText.height/2;
		this.nameText = nameText;
		nameText.width = 180;
		this.nameText.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChild(nameText);

		//追杀按钮
		let killBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceVisitTab3",this.killBtnHandler,this);
		killBtn.x = bgImag.width/2-killBtn.width/2+50;//+30;
		killBtn.y = bgImag.height+bgImag.y+25;;
		this.addChild(killBtn);
		killBtn.visible =false;
		this.killBtn = killBtn;

		//追杀文字
		let atkraceTracingdesTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkraceTracingdescription"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		// atkraceTracingdesTxt.x = 180;
		atkraceTracingdesTxt.y = killBtn.y+killBtn.height+30;
		atkraceTracingdesTxt.width =640;
		atkraceTracingdesTxt.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChild(atkraceTracingdesTxt);
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
		}
	}

	public showText():void
	{
		//势力    
		this.powerText = ComponentManager.getTextField("atkracepowerText",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this.powerText.text ="";//LanguageManager.getlocal("atkracepowerText",["2222"])
		this.powerText.x = this.blackBgRect.x+50
		this.powerText.y = this.blackBgRect.y+this.blackBgRect.height-50-10;
		this.addChild(this.powerText);


		//门客数量    
		this.menkeText = ComponentManager.getTextField("atkracemenkeText",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this.menkeText.text ="";//LanguageManager.getlocal("atkracemenkeText",["6666"])
		this.menkeText.x = this.powerText.x+240;
		this.menkeText.y = this.powerText.y;
		this.addChild(this.menkeText);

		//衙门分数    
		this.yamunText = ComponentManager.getTextField("atkraceyamunText",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this.yamunText.text ="";//LanguageManager.getlocal("atkraceyamunText",["3333"]);
		this.yamunText.x = this.powerText.x;
		this.yamunText.y =this.powerText.y+30;
		this.addChild(this.yamunText);

		//分数排行    
		this.scoreRankText = ComponentManager.getTextField("atkracescoreRankText",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this.scoreRankText.text = "";//LanguageManager.getlocal("atkracescoreRankText",["6789"])
		this.scoreRankText.x = this.menkeText.x;
		this.scoreRankText.y = this.menkeText.y+30;
		this.addChild(this.scoreRankText);


		var str =LanguageManager.getlocal("officialTitle"+1);
		let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(str + "", "office_fnt");
		if(PlatformManager.checkIsTextHorizontal()){


			numLb.x =this.officialRankbottom.x + this.officialRankbottom.height / 2 - numLb.width/2;
			numLb.y =this.officialRankbottom.y + this.officialRankbottom.width / 2 - numLb.height/2 - this.officialRankbottom.width;
		} else {
			numLb.width=35;
			numLb.height=this.officialRankbottom.height;
			numLb.x =this.officialRankbottom.x+3;
			numLb.y =this.officialRankbottom.y+10;
		}

		numLb.visible =false; 
		this.addChild(numLb);
		this.numLb =numLb;

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
			NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETINFO, {"fuid":this._userIdtxt});
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETINFO), this.useCallback, this);
		}
	}
	private useCallback(data:any):void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETINFO), this.useCallback, this);
		AtkraceChallengeItem.searchuid =null;
		 if(data.data.data.ret==-2)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
			this.refreshView()
		}
		else if(data.data.data.data.atkraceinfo)
		{ 

			
			let atkraceinfo =data.data.data.data.atkraceinfo; 
		
			var str =LanguageManager.getlocal("officialTitle"+ atkraceinfo.level);
			AtkraceChallengeItem.searchuid = atkraceinfo.uid+""; 
			if(this.numLb&&this.numLb.parent)
			{
				this.removeChild(this.numLb);
				this.numLb =null;
			}
			if(this.numLb ==null)
			{
				this.numLb = ComponentManager.getBitmapText(str + "", "office_fnt");
		
			


				if(PlatformManager.checkIsTextHorizontal()){


					this.numLb.x =this.officialRankbottom.x + this.officialRankbottom.height / 2 - this.numLb.width/2;
					this.numLb.y =this.officialRankbottom.y + this.officialRankbottom.width / 2 - this.numLb.height/2 - this.officialRankbottom.width;
				} else {
					this.numLb.width=35;
					this.numLb.height=102;//this.officialRankbottom.height;
					// this.numLb.x = 133;//this.officialRankbottom.x+3;
					// this.numLb.y =270;
					this.numLb.x =this.officialRankbottom.x + this.officialRankbottom.width / 2 - this.numLb.width/2;
					this.numLb.y =this.officialRankbottom.y + this.officialRankbottom.height / 2 - this.numLb.height/2 + 5;


				}
				this.addChild(this.numLb);
			} 
		

			if(this.officialRankbottom)
			{
				this.officialRankbottom.visible =true;
			}
			if(this.bottomNameImag)
			{
				this.bottomNameImag.visible =true;
			} 
		
			if(Api.playerVoApi.getPlayerID()==Number(this._userIdtxt)||atkraceinfo.iscankill==0)
			{
				this.killBtn.visible =false;
			}
			else
			{
				this.killBtn.visible =true;
			}
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
			if(this.playerContainer&&this.playerContainer.parent)
			{ 
			 
				this.playerContainer.mask =null;
				this.playerContainer.parent.removeChild(this.playerContainer);
				this.playerContainer = null; 
			}
			if(	this.bgImag2)
			{
				this.removeChild(this.bgImag2);
				this.bgImag2 =null;
			}
			if(this.playerContainer ==null)
			{
				this.playerContainer = Api.playerVoApi.getPlayerPortrait(atkraceinfo.level,atkraceinfo.pic);
				this.playerContainer.x=160;
				this.playerContainer.y=220 + 70 + 70;
				this.addChild(this.playerContainer);
				this.setChildIndex(this.playerContainer,this.getChildIndex(this.blackBgRect));
				// this.setChildIndex(this.playerContainer,this.getChildIndex(this.blackBgRect)-1);

				this.bgImag2= BaseBitmap.create("public_9v_bg01");
				// this.bgImag2.x=35;
				// this.bgImag2.y=210;
				this.bgImag2.width = 501;
				this.bgImag2.height = 335 - 4;
				this.bgImag2.x= GameConfig.stageWidth/2 - this.bgImag2.width/2 - 5;
				this.bgImag2.y= this.bg.y + this.bg.height + 10 + 85;
				this.addChild(this.bgImag2);
				this.playerContainer.mask = this.bgImag2;
			}
		
			
			this.nameText.text = atkraceinfo.name;
			this.nameText.x = this.bottomNameImag.x + this.bottomNameImag.width/2 - this.nameText.width/2;
			this.nameText.y = this.bottomNameImag.y + this.bottomNameImag.height/2 - this.nameText.height/2;
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
				this.yamunText.text =LanguageManager.getlocal("atkraceyamunText",[atkraceinfo.point]);
			}
			if(this.powerText)
			{
				this.powerText.text =LanguageManager.getlocal("atkracepowerText",[App.StringUtil.changeIntToText(atkraceinfo.power,2)]);
			}
			
		}
	}

	//追杀
	private killBtnHandler(evt:egret.TouchEvent):void
	{
		if(this._userIdtxt.length<7)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
		}
		else
		{
			// var data:any =[];
			// data.type=3;
			// data.uid= this._userIdtxt;

			// AtkraceChallengeItem.data =data;
			// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
				fightType: AtkraceFightTypes.kill,
				fightUid: this._userIdtxt
			})
		} 
	}
	public refreshView():void
	{
		this.officialRankbottom.visible =false;
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
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETINFO), this.useCallback, this);
		this.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		this.officialRankbottom =null;
		this.bottomNameImag=null
        this.powerText =null;
		this.menkeText =null;
		this.yamunText =null;
		this.scoreRankText =null;
		this.blackBgRect  =null;
		this.bgImag2 =null;
		this.numLb =null;
		this._userIdtxt ="";
		this.bg=null;
		this.playerContainer.mask=null;
		AtkraceChallengeItem.searchuid = null;
		this.killBtn = null;
		super.dispose();
			
    }
}