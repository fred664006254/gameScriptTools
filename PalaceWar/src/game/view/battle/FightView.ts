/**
 * 关卡战斗view
 * author shaoliang
 * date 2018/1/3
 * @class FightView
 */

class FightView extends BattleView
{

	/**
	 * 当前第几关的小点点
	 */
	private _dotBar:BattleDotBar = undefined;
	private _rattle:BattleRattle = undefined;
	private _countDown:BaseDisplayObjectContainer = undefined;
	// private _countDownLb:BaseTextField = undefined;
	protected _challengeConfig:any = undefined;

	private _timeDesc:BaseTextField;
	private _quickBtn:BaseButton = undefined;
	private _quickTxt:BaseTextField = undefined;
	private _quickCon:BaseDisplayObjectContainer = undefined;
	private _preMyNum:number=0;
	private _disNumArr:number[] = null;
	private _disFlag:number=-1;
	private _battleMc:CustomMovieClip=null;
	private _isQuickBattle:boolean = false;
	private _timer : egret.Timer = null;
	
	/**
	 * 倒计时 0时候出发事件，默认-1
	 */
	private _countDownTime:number = -1;

	public constructor() {
		super();
	}
    private effectRes(name:string,num:number):string[]
    {
        let arr = [];
        for(let i = 1; i <= num; i++)
        {
            arr.push(name+String(i));
        }
        return arr;
    }
	protected getResourceList():string[]
	{
		let arr1 = this.effectRes("fastbattleeffect_",20);
		let arr2 = this.effectRes("fastbattleprogress_",10);
		return super.getResourceList().concat([
				"hero_anim_1",
				"npc_anim_1",
				"battlebg",
				ButtonConst.BATTLE_START_BTN_1,
				"exp_progress_bg",
				"battle_dot_none",
				"battle_dot_full",
				"battle_hero_bar",
				"battle_info_bg",
				"battle_npc_bar",
				"battle_luanz",
				"promotion_officerbg1",
				"atkrace_skip",
				"battle_info_costbg",
				"battle_quickbtn"
		]).concat(arr1).concat(arr2);
	}

	/**
	 * 胜利之后刷新 战斗view
	 */
	protected resetGameAfterWin():void
	{	
		this.resetConfig();
		this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();

		for (var k1 in this._leftSoldiers) {
            var v1 = this._leftSoldiers[k1];
            v1.dispose();
        }
        for (var k2 in this._rightSoldiers) {
            var v2 = this._rightSoldiers[k2];
            v2.dispose();
        }
		this._curLost.length = 0;
		this._curLost = [0,0];
		this._lostSoldier.length = 0;
		this._lostSoldier = [0,0];

		this._leftSoldiers.length = 0;
		this._rightSoldiers.length = 0;
		this._meetPointTab.length = 0;
		this._lostOrder.length = 0;

		this._leftSoCon.visible = true;
		this._rightSoCon.visible = true;
		this.calculateSoldierNumber();
		this.initRightSoldiers();
		this.initLeftSoldiers();
		this.calculateMeetPoint();

		this.removeChild(this._battleInfoTab[0]);
		this.addChild(this._battleInfoTab[0]);

		this._gameBtn.touchEnabled = true;
		this._gameBtn.visible = true;
		for (var k8 in this._battleInfoTab) {
            var v8 = this._battleInfoTab[k8];
            v8.resetInfo(this._totalOldNum[k8]);
			this._battleInfoTab[k8].curNumber = this._totalNum[k8];
        }
		this._rattle = new BattleRattle();
		this._rattle.init(this);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();


		if (Api.playerVoApi.getSoldier() > 0 && Api.rookieVoApi.isInGuiding!=true ) {
			this.resetCountDown();
		}
	}

	protected init():void
	{	
		super.init();

		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOFASTATTACK, this.quickAttackCallback, this);

		Api.mainTaskVoApi.checkShowGuide("FightView");
		//初始化 双方信息
		for (let i:number = 0; i<=1; i++) 
		{
			this._battleInfoTab[i] = new BattleInfo();
			this._battleInfoTab[i].init(this._totalOldNum[i],i==0);
			if (i == 0) {
				this._battleInfoTab[i].x = 15;
				this._battleInfoTab[i].y = GameConfig.stageHeigth - 35 - this._battleInfoTab[i].height;
			}
			else {
				this._battleInfoTab[i].x = GameConfig.stageWidth - 13 -this._battleInfoTab[i].width;
				this._battleInfoTab[i].y = 195;
			}
			
			this.addChild(this._battleInfoTab[i]);
			this._battleInfoTab[i].curNumber = this._totalNum[i];
		}
		this.titleTF.size = 24;
		this.titleTF.bold = true;
		this.titleTF.y+=3;
		this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
		this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);


		this._dotBar = new BattleDotBar();
		this._dotBar.init(8);
		this.addChildToContainer(this._dotBar);
		this.container.y = this.getTitleButtomY()-3;
		this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();

		this._rattle = new BattleRattle();
		this._rattle.init(this);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();

		if (Api.playerVoApi.getSoldier() > 0  && Api.rookieVoApi.isInGuiding!=true ) {
			this.resetCountDown();
		}
		Api.rookieVoApi.checkNextStep();

		this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,GameConfig.stageHeigth - 115);
		this.addChild(this._skipBtn);	
		this._skipBtn.visible = false;

		if(Api.switchVoApi.checkOpenFastFight() && Api.rookieVoApi.isInGuiding!=true)
		{
			let state = this.getQuickState();
			if(state < 2)
			{
				this._quickCon = new BaseDisplayObjectContainer();

				let quickbg = BaseBitmap.create("public_9_mainicontimebg");
				quickbg.width = 100;
				quickbg.height = 26;
				this._quickCon.addChild(quickbg);
				if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp()){
					quickbg.height = 52;
				}

				this._quickTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_GREEN);
				this._quickTxt.width = 100;
				this._quickTxt.textAlign = egret.HorizontalAlign.CENTER;
				this._quickTxt.x = quickbg.x;
				this._quickTxt.y = 4;
				this._quickCon.addChild(this._quickTxt);

				this._quickCon.x = this._skipBtn.x + this._skipBtn.width/2 - this._quickCon.width/2;
				this._quickCon.y = GameConfig.stageHeigth - 90;
				this.addChild(this._quickCon);

				this.freshQuickTxt();
			}
			this._quickBtn = ComponentManager.getButton("battle_quickbtn",null,this.quickBattle,this);
			this._quickBtn.x = this._skipBtn.x + this._skipBtn.width/2 - this._quickBtn.width/2;
			if(this._quickCon)
			{
				this._quickBtn.y = this._quickCon.y - this._quickBtn.height+5;
			}else
			{
				this._quickBtn.y = GameConfig.stageHeigth - 90 - this._quickBtn.height;
			}
			this.addChild(this._quickBtn);
			if(state == 0)
			{
				this._quickBtn.setGray(true);
			}
		}
	}

	private getQuickState():number
	{
		let bigid = Api.challengeVoApi.getCurBigChannelId();
		let vip = Api.playerVoApi.getPlayerVipLevel();
		if(bigid < 6)
		{
			return 0;   //第6章解锁
		}else if(vip < 3)
		{
			return 1;  //试用
		}else
		{
			return 2;
		}
	}
	private freshQuickTxt():void
	{
		if(this._quickTxt)
		{
			let state = this.getQuickState();
			if(state == 0)
			{
				this._quickTxt.text = LanguageManager.getlocal("quickBattleDesc1");
			}else if(state == 1)
			{
				let num = Api.otherInfoVoApi.getAutoFastNum();
				if(num > 0)
				{
					this._quickTxt.text = LanguageManager.getlocal("quickBattleDesc4",[String(num),"10"]);
				}else
				{
					this._quickTxt.text = LanguageManager.getlocal("quickBattleDesc3");
				}
			}else
			{
				this._quickTxt.text = "";
			}
		}
	}
	private quickBattle():void
	{
		if(this._isQuickBattle)
		{
			return;
		}		
		if (Api.playerVoApi.getSoldier() <= 0)
		{
			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:3,f:this.hide,o:this});
			App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));
			return;
		}
		if(Api.challengeVoApi.getCurBigChannelId() < 6)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("quickBattleDesc6"));
			return;			
		}
		if(Api.playerVoApi.getPlayerVipLevel() < 3 && Api.otherInfoVoApi.getAutoFastNum() < 1)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("quickBattleDesc5"));
			return;
		}
		this._preMyNum = Api.playerVoApi.getSoldier();
		this._isQuickBattle = true;
		this.closeBtn.setEnable(false);
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_AUTOFASTATTACK,null);
	}

	//一键快速战斗
	private quickAttackCallback(event:egret.Event):void
	{
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		this._rewards = rData.rewards;
		this._isAttackWin = rData.firstbattleSuccess;
		this.freshQuickTxt();
		if (rData.firstbattleSuccess)
		{
			this.handQuickAttackGame(rData);
		}
		else
		{
			this._battleInfoTab[1].visible = false;
			this._gameBtn.touchEnabled = false;
			this._gameBtn.visible = false;
			this._leftSoCon.visible = false;
			this._rightSoCon.visible = false;
			this._countDown.visible = false;
			this._rattle.visible = false;

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);

			if(!this._battleMc)
			{
				this._battleMc = ComponentManager.getCustomMovieClip("fastbattleeffect_", 20, 100);
				this._battleMc.setScale(2);
				this._battleMc.x = GameConfig.stageWidth/2 - 210;
				this._battleMc.y = GameConfig.stageHeigth/2 - 70;
				this._battleMc.playWithTime(0);
				this.addChild(this._battleMc);
			}else
			{
				this._battleMc.visible = true;
				this._battleMc.playWithTime(0);
			}
			egret.setTimeout(()=>
			{
				this._battleInfoTab[1].visible = true;
				this._battleMc.stop();
				this._battleMc.visible = false;
				this._rattle.visible = true;
				this.closeBtn.setEnable(true);
				ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:1,f:this.endCallBack,o:this});
			},this,1000);
		}		
	}
	private handQuickAttackGame(rData:any):void
	{
		this._battleInfoTab[1].visible = false;
		this._gameBtn.touchEnabled = false;
		this._gameBtn.visible = false;
		this._leftSoCon.visible = false;
		this._rightSoCon.visible = false;
		this._countDown.visible = false;
		this._rattle.visible = false;

		SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
		SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);

		if(!this._battleMc)
        {
            this._battleMc = ComponentManager.getCustomMovieClip("fastbattleeffect_", 20, 100);
			this._battleMc.setScale(2);
			this._battleMc.x = GameConfig.stageWidth/2 - 210;
			this._battleMc.y = GameConfig.stageHeigth/2 - 70;
            this._battleMc.playWithTime(0);
            this.addChild(this._battleMc);
        }else
		{
			this._battleMc.visible = true;
			this._battleMc.playWithTime(0);
		}

		this._disNumArr = rData.useSoldierData;
		this._disFlag = 0;

		if(!this._timer)
		{
			this._timer = new egret.Timer(500);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
			this._timer.start();
			this.timerHandle();
		}else
		{
			this._timer.reset();
			this.timerHandle();
		}
	}
	private timerHandle():void
	{
		this.freshQuickTxt();
		if(this._disFlag >= 0)
		{
			this.disMySolider();
			this._disFlag++;
			if(this._disFlag >= this._disNumArr.length)
			{
				this._disFlag = -1;
				this._timer.stop();
				egret.setTimeout(()=>
				{
					this.resetQuickAttack();
				},this,500);
			}
		}
	}
	private clearTimer():void{
		if(this._timer){
            this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
			this._timer = null;
		}
	}	
	private disMySolider():void
	{
		let cur = this._battleInfoTab[0].curNum - this._disNumArr[this._disFlag];
		this._battleInfoTab[0].curNumber = cur < 0 ? 0 : cur;
		this._dotBar.setNumEff(this._dotBar.curNum+1);
	}
	private resetQuickAttack():void
	{
		this._battleInfoTab[1].visible = true;
		this._battleMc.stop();
		this._battleMc.visible = false;
		this._rattle.visible = true;
		this.closeBtn.setEnable(true);

		ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:this._rewards,f:this.endCallBack,o:this,type:1});

		// this.resetGameAfterWin();
	}
	private resetCountDown():void
	{
		this._countDownTime = 1;
		if (!this._countDown) {
			this._countDown = new BaseDisplayObjectContainer();
			let countDownBg:BaseBitmap = BaseBitmap.create("promotion_officerbg1");
			this._countDown.addChild(countDownBg);
			this._countDown.setPosition(GameConfig.stageWidth/2-countDownBg.width/2 + 20, this._gameBtn.y + 98);

			this._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDown",[this._countDownTime.toPrecision()]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._timeDesc.setPosition(countDownBg.width/2 -this._timeDesc.width/2, countDownBg.height/2 - this._timeDesc.height/2);
			this._countDown.addChild(this._timeDesc);

			// this._countDownLb = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_BIG);
			// this._countDownLb.setPosition(countDownBg.width/2 -timeDesc.width/2 - 30 , countDownBg.height/2 - this._countDownLb.height/2);
			// this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
			// this._countDown.addChild(this._countDownLb);
			
		}
		// this._countDownLb.text = "1";


		this.addChild(this._countDown);

		if(this._quickBtn)
		{
			this._quickBtn.visible = true;
		}
		if(this._quickCon)
		{
			this._quickCon.visible = true;
		}
	}

	protected resetConfig():void
	{
		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		this._totalOldNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier];
		this._totalNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier - Api.challengeVoApi.getCurKilledNum()];
	}

	protected btnClick():void
	{	
		if(this._isQuickBattle)
		{
			return;
		}
		if (Api.playerVoApi.getSoldier() <= 0) {

			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:3,f:this.hide,o:this});
			App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));

			this._countDownTime = -1;
			return;
		}
		this.closeBtn.setEnable(false);

		this._countDownTime = -1;

		if (this._countDown) {
			this.removeChild(this._countDown);
			this._countDown=null;
		}
		if(this._quickBtn)
		{
			this._quickBtn.visible = false;
		}
		if(this._quickCon)
		{
			this._quickCon.visible = false;
		}		
		Api.rookieVoApi.checkNextStep();
		
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK,null);

		// this._isAttackWin = true;
		// this._lostNum = [ 10000, this._totalOldNum[1]];
		// this.calculateLostSoldierNumber();
		// this.calculateLostTab();
		// this.gameBegin();
		// this._gameBtn.touchEnabled = false;
		// this._gameBtn.visible = false;

		// //制作死亡频率，防止动画过快
		// let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
		// this._deathRate = Math.ceil(3000/(totolCount+1));
		// if (this._deathRate > 1000) {
		// 	this._deathRate = 1000;
		// }
		// this._lastDeathTime = egret.getTimer() + this._deathRate *3;

		//👇 test code
		// ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:"5_1_5",f:this.resetGameAfterWin,o:this,type:1});
		// ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:2});
	}

	private intoBattle(p:any):void
	{
		if (p.data.ret == true) {

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);


			this._isAttackWin = p.data.data.data.battleReport.success;
			this._rewards = p.data.data.data.rewards;

			let myLostSoldier:number = this._totalNum[0] - Api.playerVoApi.getSoldier();

			let npcOldLost:number = this._totalNum[1];

			if (this._isAttackWin) {
				this._lostNum = [ myLostSoldier, npcOldLost];
			}
			else {
				this._lostNum = [ myLostSoldier, Api.challengeVoApi.getCurKilledNum() - (this._challengeConfig.soldier - npcOldLost)];
			}

			this.calculateLostSoldierNumber();
			this.calculateLostTab();
			this.gameBegin();
			this._gameBtn.touchEnabled = false;
			this._gameBtn.visible = false;

			if (Api.switchVoApi.checkJumpBattle() && Api.rookieVoApi.isInGuiding == false) {

				this._skipBtn.visible = true;

				let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
				let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
				if (isBuyMonthCard || isBuyYearCard) 
				{
					// this._skipBtn.setEnable(true);
				}
				else 
				{
					App.DisplayUtil.changeToGray(this._skipBtn);
				}

			}

			//制作死亡频率，防止动画过快
			let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
			this._deathRate = Math.ceil(3000/(totolCount+1));
			if (this._deathRate > 600) {
				this._deathRate = 600;
			}
			this._lastDeathTime = egret.getTimer() + this._deathRate *2;
		}
		else
		{
			this.closeBtn.setEnable(true);
		}
	}

	protected skipBattle():void
	{	
		let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
		let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
		if (isBuyMonthCard || isBuyYearCard) 
		{	
			this.gameEnd(true);
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("challengeSkipInfo"));
		}
	}

	protected endCallBack():void
	{	
		if(Api.rookieVoApi.isInGuiding)
		{
			this.hide(true);
			return;
		}
		if (this._isAttackWin) {
			let smallChannel:number = Api.challengeVoApi.getCurSmallChannelId();
			if (smallChannel == 0 ) {
				this.hide();
			}
			// 关卡版本2
			// else if (smallChannel == 7) {
			// 	let f:Function = this._callbackF;
			// 	let o:any = this._obj;
			// 	ViewController.getInstance().openView(ViewConst.BASE.BOSSVIEW,{f:f,o:o});
			// 	this.hide();
			// }
			else {
				this.resetGameAfterWin();
			}
			
		}
		else {
			this.hide();
		}
		if(this._isQuickBattle)
		{
			this._isQuickBattle = false;
			this._countDownTime = -1;
		}
	}

	protected showResultView():void
	{
		if (this._isAttackWin) {
			ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{award:this._rewards,f:this.endCallBack,o:this,type:1});
		}
		else {
			 ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:1,f:this.endCallBack,o:this});
		}
	}

	private tick():void
	{
		if (this._countDownTime >0) {
			this._countDownTime--;
			// this._countDownLb.text = this._countDownTime.toPrecision();
			this._timeDesc.setString(LanguageManager.getlocal("countDown",[this._countDownTime.toPrecision()]));
		}
		else if ( this._countDownTime == 0 ) {
			this.btnClick();
		}
	}

	public dispose():void
	{
		Api.mainTaskVoApi.hideGuide();
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOFASTATTACK, this.quickAttackCallback, this);
		this._dotBar = null;
		this._rattle.dispose();
		this._rattle = undefined;
		this.clearTimer();
		if(this._quickBtn)
		{
			this._quickBtn.dispose();
			this._quickBtn = null;
		}
		this._quickTxt = null;
		this._quickCon = null;
		this._isQuickBattle = false;
		if(this._battleMc)
		{
			this._battleMc.dispose();
			this._battleMc = null;
		}

		if (this._countDown) {
			this._countDown.dispose();
		}
		this._countDown = undefined;
		// this._countDownLb = undefined;
		this._timeDesc = null;
		this._countDownTime = -1;
		this._challengeConfig = undefined;
		

		super.dispose();
	}

}