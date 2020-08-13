/**
 *副本
 * author yanyuling
 * date 2017/12/06
 * @class AllianceBossScrollItem
 */
class AllianceBossScrollItem extends ScrollListItem
{
	private _bossCfgData:any = null;
	private _bossId:string;
	private _mask:BaseBitmap;
	private _logBtn:BaseButton;
	private _enterBtn:BaseButton;
	private _rankBtn:BaseButton;
	private _openBtn:BaseButton;
	private _progress:ProgressBar;
	private _cdTxt:BaseTextField;
	private _leftHp:number;

	private _eliteBossCfgData:Config.AllianceEliteBossItemCfg = null;
	private _eliteBossId:string = null;

	private _nameTF:BaseTextField = null;
	private _rewardDesTF:BaseTextField = null;
	private _rewardTF:BaseTextField = null;
	/**开启精英的按钮 */
	private _openeliteBtn:BaseButton = null;

	private _bg:BaseBitmap = null;
	private _limitlessBossTf:BaseTextField = null;

	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);

		this._bossId = data;
		this._bossCfgData = Config.AlliancebossCfg.getAllianceCfgByLv(this._bossId);

		this._eliteBossId = "e" + data;
		this._eliteBossCfgData = Config.AllianceelitebossCfg.getAllianceCfgByLv(this._eliteBossId);
		
		let bgImg = "allianceBossbg";
		let bg:BaseBitmap =  BaseBitmap.create(bgImg);
		this.addChild(bg);
		this._bg = bg;

		let monsterImg = BaseLoadBitmap.create("alliance_monster" + this._bossCfgData.bossPic);
		monsterImg.width = 405;
		monsterImg.height = 467;
		let scaV = 0.5
		monsterImg.setScale(scaV);
		monsterImg.x = 132 - monsterImg.width/2*scaV;
		monsterImg.y =  bg.height/2 - monsterImg.height/2*scaV;
		this.addChild(monsterImg);

		let nameTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.textColor = 0xFCD64A;
		nameTF.text =LanguageManager.getlocal("allianceBoss_monsterName"+(this._bossId));
		nameTF.x = 265;
		nameTF.y = 35;
		this.addChild(nameTF);
		this._nameTF = nameTF;

		let rewardTF = ComponentManager.getTextField("",18);
		rewardTF.text = LanguageManager.getlocal("allianceBoss_rewardTxt");
		rewardTF.x = nameTF.x ;
		rewardTF.y = nameTF.y + 30;
		this.addChild(rewardTF);
		this._rewardTF = rewardTF;

		let rewardTF2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rewardTF2.text = LanguageManager.getlocal("allianceBoss_rewardTxt2",[this._bossCfgData.addAsset,this._bossCfgData.addExp]);
		rewardTF2.x = rewardTF.x +rewardTF.width;
		rewardTF2.y = rewardTF.y;
		this.addChild(rewardTF2);
		this._rewardDesTF = rewardTF2;

		let limitlessBossTf = ComponentManager.getTextField(LanguageManager.getlocal("allianceBoss_limitlessTxt", [LanguageManager.getlocal("allianceBoss_monsterName"+this._bossId)]), 18);
		limitlessBossTf.x = nameTF.x;
		limitlessBossTf.y = nameTF.y + 30;
		limitlessBossTf.lineSpacing = 6;
		this.addChild(limitlessBossTf);
		this._limitlessBossTf = limitlessBossTf;
		limitlessBossTf.visible = false;
	
		//伤害排行
		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"allianceBoss_btn1",this.rankBtnhandler,this);
		rankBtn.x = bg.width -143 - rankBtn.width;
		rankBtn.y = 156;
		this.addChild(rankBtn);
		this._rankBtn = rankBtn;
		if(Api.switchVoApi.checkOpenShenhe()&&this._rankBtn)
		{
		   this._rankBtn.visible=false;
		}

		//进入副本
		let enterBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn2",this.enterBtnhandler,this);
		enterBtn.x = bg.width -143;
		enterBtn.y = 156;//rankBtn.y;
		this.addChild(enterBtn);
		this._enterBtn = enterBtn;

		//开启精英的按钮
		this._openeliteBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn5",this.openBtnhandler,this,[this._eliteBossId]);
		this._openeliteBtn.setPosition(this._enterBtn.x ,this._enterBtn.y);
		this.addChild(this._openeliteBtn);
		this._openeliteBtn.setVisible(false);

		let logBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn3",this.logBtnhandler,this);
		logBtn.x = bg.width -143 -logBtn.width/2 ;
		logBtn.y = 156;
		this.addChild(logBtn);
		this._logBtn = logBtn;
		if(Api.switchVoApi.checkOpenShenhe())
		{
			this._logBtn.visible=false;
		}

		let openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBoss_btn4",this.openBtnhandler,this,[this._bossId]);
		openBtn.x = logBtn.x ;
		openBtn.y = logBtn.y;
		this.addChild(openBtn);
		this._openBtn = openBtn;
		
		this._cdTxt = ComponentManager.getTextField("",18);
		this._cdTxt.text = this.getEndStr();
		this._cdTxt.x = bg.width -148 -this._cdTxt.width/2 -10 ;
		this._cdTxt.y = this._openBtn.y + 57;
		this._cdTxt.visible = false;
		this.addChild(this._cdTxt);

		let progress = ComponentManager.getProgressBar("progress5","progress3_bg",510);
        progress.x = 5;
		progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",["100"]));
        progress.y = bg.height - 35;
		this._progress = progress;

        this.addChild(progress);

		this._mask = BaseBitmap.create("alliance_effect");
		this._mask.width = bg.width;
		this._mask.height = bg.height;
		this._mask.visible = false;
		this.addChild(this._mask);
		/**
		 * 23:30 以后
		 */
		let lastS = GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime) ;
		if(lastS  > 84600 )
		{
			openBtn.setEnable(false);
			enterBtn.setEnable(false);
		}else{
			openBtn.setEnable(true);
			enterBtn.setEnable(true);
		}
		TimerManager.doTimer(1000,0,this.tick,this);
		this.refreshUI();
	}

	protected refreshUI()
	{
		if(!this._cdTxt)
		{
			return;
		}
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		this._cdTxt.visible = false;
		this._leftHp = 0;
		let isOpenLimitlessBoss = Api.allianceVoApi.checkOpenLimitlessBoss();
		let limitBossId = Api.allianceVoApi.getLimitlessBossId();
		if (this._bossId == limitBossId){
			this._bg.setRes("allianceBossbg_limitless");
			this._rewardTF.setVisible(false);
			this._rewardDesTF.setVisible(false);
			this._limitlessBossTf.visible = true;
		}
		else if(this.isOpenElite())
		{
			this._nameTF.text = LanguageManager.getlocal("allianceBoss_monsterName"+(this._eliteBossId));
			this._nameTF.y = 75;
			this._rewardTF.setVisible(false);
			this._rewardDesTF.setVisible(false);
			this._limitlessBossTf.visible = false;
			this._bg.setRes("allianceview_itembossbg");
		}
		else
		{
			this._nameTF.text = LanguageManager.getlocal("allianceBoss_monsterName"+(this._bossId));
			this._nameTF.y = 35;
			this._rewardTF.setVisible(true);
			this._rewardDesTF.setVisible(true);
			this._limitlessBossTf.visible = false;
			this._bg.setRes("allianceBossbg");
		}

		if(this._bossCfgData.needAllianceLv <= alliVo.level)
		{
			let boss = alliVo.boss;
			let leftHp = null;
			if (this._bossId == limitBossId){
				leftHp = boss[this._bossCfgData.id];
			}
			else if(this.isOpenElite())
			{
				leftHp = boss[this._eliteBossCfgData.id];
			}
			else
			{
				leftHp = boss[this._bossCfgData.id];
			}

			
			this._leftHp = leftHp;
			if(leftHp != null)
			{
				this._openBtn.visible = false;
				let bossHp = null
				if (isOpenLimitlessBoss){
					bossHp = 1;
				}
				else if(this.isOpenElite())
				{
					bossHp = this._eliteBossCfgData.eliteBossHp;
				}
				else
				{
					bossHp = this._bossCfgData.bossHp
				}
				let perc = leftHp/bossHp; 
				if (limitBossId && this._bossId == limitBossId){
					this._progress.setPercentage(1);
				}
				else{
					this._progress.setPercentage(perc);
				}
				
				if(leftHp == 0)
				{
					this._mask.visible = false;
					if(!Api.switchVoApi.checkOpenShenhe())
					{
						this._logBtn.visible = true;
						
					}
					let eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
					let isOpenEBoss = Api.allianceVoApi.checkBossCanOpenElite(this._bossId);
					if(isOpenEBoss)
					{
						this._logBtn.x = this._rankBtn.x;
						this._openeliteBtn.visible= true;
					}
					else
					{
						this._logBtn.x = this._openBtn.x;
						this._openeliteBtn.visible= false;
					}

					this._rankBtn.visible = false;
					this._enterBtn.visible = false;
					this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt2"));
				}else{
					this._mask.visible = true;
					this._logBtn.visible = false;
					if(!Api.switchVoApi.checkOpenShenhe())
					{
						this._rankBtn.visible = true;
					}
					this._openeliteBtn.visible= false;
					this._enterBtn.visible = true;
					if (this._bossId == limitBossId){
						this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt3"));
					}
					else{
						this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",[(perc*100).toFixed(0)+"%"]));
					}
					this._cdTxt.visible = true;
				}
			}else
			{
				if (this._bossId == limitBossId){
					this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt3"));
				}
				else{
					this._progress.setText(LanguageManager.getlocal("allianceBoss_progressTxt1",["100%"]));
				}
				this._progress.setPercentage(1.0);
				this._openBtn.visible = true;
				this._logBtn.visible = false;
				this._rankBtn.visible = false;
				this._enterBtn.visible = false;
				this._mask.visible = false;
				this._openeliteBtn.visible= false;
			}
		}else
		{
			this._logBtn.visible = false;
			this._enterBtn.visible = false;
			this._rankBtn.visible = false;
			this._openBtn.visible = true;
		}
	}

	protected getEndStr()
	{
		
		let ZeroStr = App.DateUtil.getWeeTs(GameData.serverTime) + 84600 - GameData.serverTime
		if(ZeroStr >= 0 )
		{
			let timeStr = App.DateUtil.getFormatBySecond(ZeroStr,8);
			return LanguageManager.getlocal("allianceBoss_endTimeStr",[timeStr]);
		}else
		{
			return ""
		}
	}
	public tick(): boolean {
		let str = this.getEndStr();
		if(str != "" && this._leftHp > 0)
		{
			this._cdTxt.text = this.getEndStr();
			this._cdTxt.visible = true;
			return true;
		}else{
			this._cdTxt.visible = false;
			return false;
		}
	}
	protected openBtnHandlerCallBack(event:egret.Event)
	{
		if (!event.data.ret){
			return;
		}
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
			this.refreshUI();
		}
	}
	/**
	 * 开启副本
	 */
	protected openBtnhandler(data:any)
	{
		let limitBossId = Api.allianceVoApi.getLimitlessBossId();
		if (this._bossId == limitBossId && (Api.allianceVoApi.checkLimitlessBossIsEnd() || !Api.allianceVoApi.checkOpenLimitlessBoss())){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBoss_limitlessTip"));
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_LIMITLESSBOSS_REFRESH);
			return ;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSOPENPOPUPVIEW,data);
	}
	protected rankBtnhandler()
	{
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
		let id = null
		if(alliVo.level >= eliteNeedLv && alliVo.boss.clear == 1 && alliVo.boss[this._eliteBossId] != null)
		{
			id = this._eliteBossId;
		}
		else
		{
			id = this._bossId;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW,id);
	}
	protected enterBtnhandler()
	{
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{bossId:String(this._itemIndex+1),servantId:"1001"});
		let eliteidx = null;
		if(this.isOpenElite())
		{
			eliteidx = this._eliteBossId;
		}
		ViewController.getInstance().openView(ViewConst.BATTLE.ALLIANCEBOSSBATTLEVIEW,{idx:this._bossId,f:this.refreshUI,o:this,eliteidx:eliteidx});
	}
	protected logBtnhandler()
	{
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		let eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
		let id = null
		if(alliVo.level >= eliteNeedLv && alliVo.boss.clear == 1 && alliVo.boss[this._eliteBossId] != null)
		{
			id = this._eliteBossId;
		}
		else
		{
			id = this._bossId;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEBOSSRANKOPUPVIEW,id);
	}
	/** 是否开启精英 */
	private isOpenElite():boolean
	{
		let eliteNeedLv = Config.AlliancebaseCfg.eliteNeedLv;
		let alliVo:AllianceVo = Api.allianceVoApi.getAllianceVo();
		if(alliVo.level >= eliteNeedLv && alliVo.boss.clear == 1 && alliVo.boss[this._bossCfgData.id] == 0 &&alliVo.boss[this._eliteBossId] != null )
		{
			return true;
		}
		else
		{
			return false;
		}

	}
	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_OPENBOSS),this.openBtnHandlerCallBack,this);
		TimerManager.remove(this.tick,this);
		this._bossCfgData = null;
		this._bossId = null;
		this._mask = null;
		this._logBtn = null;
		this._enterBtn = null;
		this._rankBtn = null;
		this._openBtn = null;
		this._progress = null;
		this._cdTxt = null;
		this._leftHp = 0;
		this._eliteBossCfgData = null;
		this._eliteBossId = null;

		this._nameTF = null;
		this._rewardDesTF = null;
		this._rewardTF= null;
		this._openeliteBtn = null;
		this._bg = null;
		this._limitlessBossTf = null;
		super.dispose();
	}
}