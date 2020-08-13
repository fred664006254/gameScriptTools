/**
 * 追杀
 */
class AcGroupWifeBattleVisitViewTab3 extends CommonViewTab
{

	private powerText:BaseTextField =null;
	private menkeText:BaseTextField =null;
	private yamunText:BaseTextField =null;
	private nameText:BaseTextField =null;
	private tipsText:BaseTextField =null;

	
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
	public constructor(data?) 
	{
		super();
		this.param = data;
		this.initView();
	}


    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected initView():void
	{
		let code = this.getUiCode();

		this.bg = BaseBitmap.create("public_9_probiginnerbg");
		this.bg.width=520;
		this.bg.height=502;
		this.bg.x = 25;
		this.bg.y = 60;
		this.addChild(this.bg);

		//文字:追杀对象
		let killText = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleVisitTip2-${code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
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

		//查询按钮
		let queryBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"find",this.queryBtnHandler,this);
		queryBtn.setScale(0.85);
		queryBtn.x = bg1.x+bg1.width+7;
		queryBtn.y = bg1.y;
		this.addChild(queryBtn);

		
		let bgImag: BaseBitmap = BaseBitmap.create("atkraceVisitbg");
		bgImag.x=35;
		bgImag.y=220;
		this.addChild(bgImag);


		let playerContainer: BaseDisplayObjectContainer= new BaseDisplayObjectContainer();
		this.addChild(playerContainer);
		this.playerContainer =playerContainer;


	
		//官衔背景图
		let officialRankbottom: BaseBitmap = BaseBitmap.create("atkracevipbg");
		officialRankbottom.x=bgImag.x+70;
		officialRankbottom.y=bgImag.y+50;
		this.addChild(officialRankbottom);
		officialRankbottom.visible =false;
		if(PlatformManager.checkIsTextHorizontal())
		{
			officialRankbottom.rotation = -90;
			officialRankbottom.y += 30; 
			officialRankbottom.x -= 5;
		}
		this.officialRankbottom = officialRankbottom;

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
		bottomNameImag.x=180;
		bottomNameImag.y=440;
		this.addChild(bottomNameImag);
		bottomNameImag.visible =false;
		this.bottomNameImag =bottomNameImag;
		
		//人物名字
		let nameText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.x = bottomNameImag.x;	//+10;
		nameText.y = bottomNameImag.y+5;
		this.nameText =nameText;
		nameText.width = 180;
		this.nameText.textAlign = TextFieldConst.ALIGH_CENTER;
		this.addChild(nameText);

		//追杀按钮
		let killBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acGroupWifeBattleAvengerBtn",this.killBtnHandler,this);
		killBtn.x = bgImag.width/2-killBtn.width/2+20;
		killBtn.y = bgImag.height+bgImag.y+30;;
		this.addChild(killBtn);
		killBtn.visible =false;
		this.killBtn = killBtn;

		//追杀文字
		let atkraceTracingdesTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleVisitTip3-${code}`),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		atkraceTracingdesTxt.x = 570 - atkraceTracingdesTxt.width  - 30;
		atkraceTracingdesTxt.y = 660;
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
		this.powerText = ComponentManager.getTextField("acGroupWifeBattleInfoPowerText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.powerText.text ="";
		this.powerText.x = this.blackBgRect.x+50
		this.powerText.y = this.blackBgRect.y+this.blackBgRect.height-50;
		this.addChild(this.powerText);


		//门客数量    
		this.menkeText = ComponentManager.getTextField("acGroupWifeBattleInfoWifeText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.menkeText.text ="";
		this.menkeText.x = this.powerText.x+240;
		this.menkeText.y = this.powerText.y;
		this.addChild(this.menkeText);

		//衙门分数    
		this.yamunText = ComponentManager.getTextField("acGroupWifeBattleInfoNumText",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.yamunText.text ="";
		this.yamunText.x = this.powerText.x;
		this.yamunText.y =this.powerText.y+30;
		this.addChild(this.yamunText);
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
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETINFO, {
				fuid : this._userIdtxt,
				activeId : this.acTivityId 
			});
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETINFO), this.useCallback, this);
		}
	}
	private useCallback(evt:egret.Event):void
	{
		if (evt.data.ret == false)
        {
            return;
        }

		let data = evt.data.data.data;
		if(data){
			if(data.bgstats){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleBgStasTip${data.bgstats}-${this.getUiCode()}`));
				this.refreshView()
				return;
			}
			if(data.atkraceinfo)
			{ 
	
				let atkraceinfo = data.atkraceinfo; 
				var str =LanguageManager.getlocal("officialTitle"+ atkraceinfo.level);
				
				if(this.numLb&&this.numLb.parent)
				{
					this.removeChild(this.numLb);
					this.numLb =null;
				}
				if(this.numLb ==null)
				{
					this.numLb = ComponentManager.getBitmapText(str + "", "office_fnt",0xfff000);
					if(!PlatformManager.checkIsTextHorizontal())
						this.numLb.width=35;
					
					if(PlatformManager.checkIsEnLang()){
						this.numLb.setScale(0.8);
					}
					this.numLb.height=102;//this.officialRankbottom.height;
					this.numLb.x = 108;//this.officialRankbottom.x+3;
					this.numLb.y =270;//this.officialRankbottom.y;
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

					if(atkraceinfo.pUid)
					{
						let tips = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleProtectTips3-1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
						tips.setPosition(this.killBtn.x+this.killBtn.width/2-tips.width/2,this.killBtn.y - tips.height);
						this.addChild(tips);
						this.tipsText = tips;
					}
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
					let userContainer = null;
					let isnew = Api.playerVoApi.getNewPalaceRole(curLv);

					this.playerContainer = Api.playerVoApi.getPlayerPortrait(curLv,atkraceinfo.pic);
					this.playerContainer.x=110+GameData.popupviewOffsetX;
					this.playerContainer.y=220;
					this.addChild(this.playerContainer);
					this.setChildIndex(this.playerContainer,this.getChildIndex(this.blackBgRect)-1);
	
					this.bgImag2= BaseBitmap.create("atkraceVisitbg");
					this.bgImag2.x=35;
					this.bgImag2.y=210;
					this.addChild(this.bgImag2);
					this.playerContainer.mask = this.bgImag2;
				}
			
				
				this.nameText.text = atkraceinfo.name;
				if(this.menkeText)
				{
					this.menkeText.text =LanguageManager.getlocal("acGroupWifeBattleInfoWifeText",[atkraceinfo.snum]);
				}
				if(this.yamunText)
				{
					this.yamunText.text =LanguageManager.getlocal("acGroupWifeBattleInfoNumText",[atkraceinfo.totalnum]);
				}
				if(this.powerText)
				{
					this.powerText.text =LanguageManager.getlocal("acGroupWifeBattleInfoPowerText",[atkraceinfo.totaltalent]);
				}
				
			}
		}
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETINFO), this.useCallback, this);
	}

	//追杀
	private killBtnHandler(evt:egret.TouchEvent):void
	{
		if(this.vo.getCurperiod() == 1){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNotStart-${this.getUiCode()}}`));
			return;
		}
		if(!this.vo.getAttendQuality()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
			return;
		}
		if(this.vo.isActyEnd()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
			return;
		}
		if(this.vo.getCurperiod() == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
			return;
		}
		if(!this.vo.getJoinIn()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${this.getUiCode()}`));
			return;
		}
		if(this.vo.isOut())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip16-${this.getUiCode()}`));
			return;			
		}
		if(this._userIdtxt.length<7)
		{
			var str:string =LanguageManager.getlocal("atkraceErrordes3");
			App.CommonUtil.showTip(str);
		}
		else
		{
			let cfg = Config.ItemCfg.getItemCfgById(this.cfg.needItem.chanllge);
			let have = Api.itemVoApi.getItemNumInfoVoById(cfg.id);
			if(have > 0)
			{
				if(this.tipsText)
				{
					let message: string = LanguageManager.getlocal(`acGroupWifeBattleFightSure-${this.getUiCode()}`);
					ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
						msg : message,
						title : "itemUseConstPopupViewTitle",
						touchMaskClose : true,
						callback : ()=>
						{
							NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE,{activeId:this.vo.aidAndCode,fuid:this._userIdtxt,protect:this.tipsText&&this.tipsText.visible ? 1 : 0});
						},
						handler : this,
						needClose : 1,
						needCancel : true
					});						
				}else
				{
					NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE,{activeId:this.vo.aidAndCode,fuid:this._userIdtxt});
				}
			}else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleItemNoEnoughTip`,[cfg.name]));
			}			
		} 
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
		if(this.tipsText)
		{
			this.tipsText.visible =false;
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
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETINFO), this.useCallback, this);
		this.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN,this.foucusHandler,this);
		this.officialRankbottom =null;
		this.bottomNameImag=null
        this.powerText =null;
		this.menkeText =null;
		this.yamunText =null;
		this.blackBgRect  =null;
		this.bgImag2 =null;
		this.numLb =null;
		this.tipsText = null;
		this._userIdtxt ="";
		this.bg=null;
		this.playerContainer.mask=null;
		super.dispose();
			
    }
}