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
	private _countDownLb:BaseTextField = undefined;
	protected _challengeConfig:any = undefined;
	public static curChannelId = null;
	public static curBgName = null;
	/**
	 * 倒计时 0时候出发事件，默认-1
	 */
	private _countDownTime:number = -1;

	private _lossTipContainer:BaseDisplayObjectContainer = undefined;
	private _tiptxt:BaseTextField = undefined;

	//秒杀
	private _miaoshaBtn:BaseButton = null;
	private _miaoshaTipBg:BaseBitmap = null;
	private _miaoshaNewTip:BaseTextField = null;
	private _battleBiginCid:number = 0;
	private _isMiaoshaStart:boolean = false;
	private _miaoshaStartPlayerSoldier:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		if(Api.challengeVoApi.getCurBigChannelId() == FightView.curChannelId){
			if(!FightView.curBgName){
				FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
			}

		} else {
			// FightView.curChannelId = Api.challengeVoApi.getCurBigChannelId();
			FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
		}

		let typeArr = [`attack-3`,`walk-6`,`death-1`,`standby`]
		
		return super.getResourceList().concat([
				// "battlebg",
				"battle_dot_full",
				"battle_preBg",
				"battle_preIcon",
				"battle_preIv1",
				"battle_preIv2",
				"battle_preIv3",
				"battle_dot_none",
				ButtonConst.BATTLE_START_BTN_1,
				
	
				FightView.curBgName,
			
				"battle_info_bg",
				"progress_type1_red",
				"progress_type1_yellow",
				"progress_type1_bg2",


				
				"progress_type3_red",
				"progress_type1_yellow2",
				"progress_type3_bg",

				"challenge_officebg",
				"battle_luanz",
				// "prisonview_1",
				"atkrace_skip",

				"fightview_miaohsabutton","fightview_miaoshatxt",'fightview_miaoshabg'
		]);
	}
	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_LEVY_CALC,requestData:{}};
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

		this.calculateSoldierNumber();
		this.initRightSoldiers();
		this.initLeftSoldiers();
		this.calculateMeetPoint();

		this.removeChild(this._battleInfoTab[0]);
		this.addChild(this._battleInfoTab[0]);

		this._gameBtn.touchEnabled = true;
		this._gameBtn.visible = true;
		this.resetFightTiptxt();
		this._lossTipContainer.visible = true;
		for (var k8 in this._battleInfoTab) {
            var v8 = this._battleInfoTab[k8];
            v8.resetInfo(this._totalOldNum[k8]);
			this._battleInfoTab[k8].curNumber = this._totalNum[k8];
        }
		this._rattle = new BattleRattle();
		this._rattle.init(this,350,2);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();
		
		this.setMiaoshaVisible(true);
		

		if (Api.playerVoApi.getSoldier() > 0 && Api.rookieVoApi.isInGuiding!=true ) {
			this.resetCountDown();
		}
	}
	protected battleBgName():string
	{

		if(Api.challengeVoApi.getCurBigChannelId() == FightView.curChannelId){
			// if(!FightView.curBgName){
			// 	FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
			// }

		} else {
			FightView.curChannelId = Api.challengeVoApi.getCurBigChannelId();
			// FightView.curBgName = "battlebg"+(Math.floor(Math.random() * 8) + 1);
		}
		return FightView.curBgName;

	}

	private resetFightTiptxt()
	{

		// let rate = (this._totalOldNum[1] + 1000)/(this._totalOldNum[0] + 1000);
		// let rate = (this._challengeConfig.atk + 1)/(Api.playerVoApi.getAtk() + 1);
		// // this._challengeConfig
		// let pcfg = Config.GameprojectCfg;
		// let txtStr = "";
		// if(rate <= pcfg.challengeRatio1){
		// 	txtStr = "fight_tiptxt1";
		// }else if(rate <= pcfg.challengeRatio2 && rate > pcfg.challengeRatio1){
		// 	txtStr = "fight_tiptxt2";
		// }else if(rate <= pcfg.challengeRatio3 && rate > pcfg.challengeRatio2){
		// 	txtStr = "fight_tiptxt3";
		// }else if(rate <= pcfg.challengeRatio4 && rate > pcfg.challengeRatio3){
		// 	txtStr = "fight_tiptxt4";
		// }else if( rate > pcfg.challengeRatio4){
		// 	txtStr = "fight_tiptxt5";
		// }
		
		// this._tiptxt.text = LanguageManager.getlocal(txtStr);

		let txtStr = '';
		

		let levelBg = <BaseBitmap>this._lossTipContainer.getChildByName(`levelBg`);
		let npclv = this._challengeConfig.personLv;
		let leftlv = Api.composemapVoApi.getMaxLv();
		let bgres = '';
		let param = ``;
		param = `${Math.min(Math.abs(leftlv - npclv), 3) * 10}%`;
		if(leftlv > npclv){
			bgres = `battle_preIv1`;
			txtStr = `fight_txttip1`;
		}
		else if(leftlv == npclv){
			bgres = `battle_preIv2`;
			txtStr = `fight_txttip2`;
		}
		else{
			bgres = `battle_preIv3`;
			txtStr = `fight_txttip3`;
		}
		levelBg.setRes(bgres);
		this._tiptxt.text = LanguageManager.getlocal(txtStr, [param]);
	}

	protected init():void
	{	
		super.init();
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK,this.miaoshaHandler,this);

		Api.mainTaskVoApi.checkShowGuide("FightView");
		
		//初始化 双方信息
		for (let i:number = 0; i<=1; i++) 
		{
			this._battleInfoTab[i] = new BattleInfo();
			this._battleInfoTab[i].init(this._totalOldNum[i],i==0);
			if (i == 0) {
				this._battleInfoTab[i].x = 15;
				this._battleInfoTab[i].y = GameConfig.stageHeigth - 50 - this._battleInfoTab[i].height;
			}
			else {
				this._battleInfoTab[i].x = GameConfig.stageWidth - 13 -this._battleInfoTab[i].width - 52;
				this._battleInfoTab[i].y = 195;
			}
			
			this.addChild(this._battleInfoTab[i]);
			this._battleInfoTab[i].curNumber = this._totalNum[i];
		}

		this.titleTF.text = Api.challengeVoApi.getCurBigChannelId().toString() + ". "+LanguageManager.getlocal("challengeTitle" + Api.challengeVoApi.getCurBigChannelId());
		this.titleTF.x = GameConfig.stageWidth/2 - this.titleTF.width/2;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);

		this._lossTipContainer = new BaseDisplayObjectContainer();
		this.addChild(this._lossTipContainer);
		this._lossTipContainer.y = this._gameBtn.y + 66 + this._gameBtn.anchorOffsetY//+ this._gameBtn.height + 36 + this._gameBtn.anchorOffsetY;

		let losstipbg = BaseBitmap.create("battle_preBg");
		// losstipbg.height = 30;
		losstipbg.x = GameConfig.stageWidth/2 - losstipbg.width/2; //this._battleInfoTab[0].x + this._battleInfoTab[0].width/2 - losstipbg.width/2;
		losstipbg.y = 0;
		this._lossTipContainer.addChild(losstipbg);

		let levelBg = BaseBitmap.create(`battle_preIv1`);
		levelBg.name = 'levelBg';
		this._lossTipContainer.addChild(levelBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelBg, losstipbg, [168,1]);
		
		this._tiptxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this.resetFightTiptxt();
		this._tiptxt.setPosition(levelBg.x + levelBg.width + 24,levelBg.y + levelBg.height/2 - this._tiptxt.height/2);
		this._lossTipContainer.addChild(this._tiptxt);

		let icon = BaseBitmap.create(`battle_preIcon`);
		this._lossTipContainer.addChild(icon);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, losstipbg, [0,16]);

		let leftNameTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`composePersonLv${Api.composemapVoApi.getMaxLv()}`)}\nLV.${Api.composemapVoApi.getMaxLv()}`,22,0xfdf3b5);
		leftNameTxt.lineSpacing = 5;
		leftNameTxt.textAlign = egret.HorizontalAlign.CENTER;
		this._lossTipContainer.addChild(leftNameTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, leftNameTxt, levelBg, [0,levelBg.height+15]);

		let npclv = this._challengeConfig.personLv;
		let rightNameTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`composePersonLv${npclv}`)}\nLV.${npclv}`,22,0xfdf3b5);
		rightNameTxt.lineSpacing = 5;
		rightNameTxt.textAlign = egret.HorizontalAlign.CENTER;
		this._lossTipContainer.addChild(rightNameTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, rightNameTxt, this._tiptxt, [0]);
		rightNameTxt.y = leftNameTxt.y;

		this._lossTipContainer.x = GameConfig.stageWidth/2 - this._lossTipContainer.width/2;

		this._dotBar = new BattleDotBar();
		let curChannel:number = Api.challengeVoApi.getCurChannelId();
		let smallNum = ChallengeCfg.getChallengeCfgById(curChannel).smallNum;
		if(!smallNum)
		{
			smallNum = 8;
		}
		this._dotBar.init(smallNum);
		this.addChildToContainer(this._dotBar);
		this.container.y = this.getTitleButtomY()-3;
		this._dotBar.curNum = Api.challengeVoApi.getCurSmallChannelId();



		this._rattle = new BattleRattle();
		this._rattle.init(this,350,2);
		this._rattle.setPosition(280,this._battleInfoTab[1].y + 110);
		this._rattle.resetString();

		if (Api.playerVoApi.getSoldier() > 0  && Api.rookieVoApi.isInGuiding!=true && Api.challengeVoApi.getCurSmallChannelId()!=0) {
			this.resetCountDown();
		}
		if (Api.rookieVoApi.curGuideKey != "aotoPush") {
			Api.rookieVoApi.checkNextStep();
		}

		// this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		// this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,GameConfig.stageHeigth - 115);
		// this.addChild(this._skipBtn);	
		// this._skipBtn.visible = false;


		if(Api.challengeVoApi.getCurBigChannelId() >= 3){
			this._miaoshaBtn = ComponentManager.getButton('fightview_miaohsabutton',"",this.miaoshaClick,this);
			this._miaoshaBtn.setPosition(GameConfig.stageWidth - this._miaoshaBtn.width - 30,GameConfig.stageHeigth - this._miaoshaBtn.height - 80)
			this.addChild(this._miaoshaBtn);
			if(Api.otherInfoVoApi.checkCanUseMiaosha()){
				App.DisplayUtil.changeToNormal(this._miaoshaBtn);
			}else{
				App.DisplayUtil.changeToGray(this._miaoshaBtn);
			}
			if(Api.otherInfoVoApi.getMiaoshaLeftTime()){
	
				this._miaoshaTipBg = BaseBitmap.create("fightview_miaoshabg");
				this._miaoshaTipBg.setPosition(this._miaoshaBtn.x + this._miaoshaBtn.width/2 - this._miaoshaTipBg.width/2 ,this._miaoshaBtn.y + this._miaoshaBtn.height+3);
				this.addChild(this._miaoshaTipBg);
	
				this._miaoshaNewTip = ComponentManager.getTextField(Api.otherInfoVoApi.getMiaoshaLeftTime(),16,TextFieldConst.COLOR_LIGHT_YELLOW);
				this._miaoshaNewTip.width = this._miaoshaTipBg.width;
				this._miaoshaNewTip.textAlign = egret.HorizontalAlign.CENTER;
				this._miaoshaNewTip.x = this._miaoshaTipBg.x;
				this._miaoshaNewTip.y = this._miaoshaTipBg.y + 5;
				this.addChild(this._miaoshaNewTip);
	
			}
		}



		
	}

	private miaoshaClick(){
		if(this._isMiaoshaStart){
			return;
		}
		if (this._totalNum[0] <= 0) {

			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:3,f:this.hide,o:this});
			App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));

			return;
		}
		if(Api.otherInfoVoApi.checkCanUseMiaosha()){
			this.resetMiaosha();
			this.closeBtn.setEnable(false);
			if (this._countDown) {
				this.removeChild(this._countDown);
				this._countDown=null;
			}
			this._gameBtn.touchEnabled = false;
			this._gameBtn.visible = false;
			this._lossTipContainer.visible = false;
			this.setMiaoshaVisible(false);
			this._isMiaoshaStart = true;
			Api.rookieVoApi.checkNextStep();
			this.showCritAnim();
		}else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`miaoshaNeedBuy`));
		}
	}
	private showCritAnim(){
		if(App.CommonUtil.check_dragon()){
			let miaoshaDro = App.DragonBonesUtil.getLoadDragonBones(`miaosha`,1);
			this.addChild(miaoshaDro);
			miaoshaDro.setScale(1.5);
			miaoshaDro.setPosition(320,GameConfig.stageHeigth/2)
			miaoshaDro.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, (param1:dragonBones.EgretEvent)=>{
				NetManager.request(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK,{});
				miaoshaDro.dispose();
				miaoshaDro = null;
			}, this); 
		}else{
			NetManager.request(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK,{});
		}

	}

	

	private miaoshaHandler(p:egret.Event){
		if (p.data.ret == true) {
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);


			this._isAttackWin = p.data.data.data.success;
			this._rewards = p.data.data.data.rewards;
			let addCid = p.data.data.data.nowcid - this._battleBiginCid;
			//let loseSoldier = p.data.data.data.losesoldier||0;
			let loseSoldier = this._totalNum[0] - Api.playerVoApi.getSoldier();
			if(!this._isAttackWin){
				loseSoldier = this._totalNum[0];
			}

			let myLostSoldier:number = Math.max(0,loseSoldier);

			let npcOldLost:number = Math.max(0,this._totalNum[1]);

			if (this._isAttackWin) {
				this._lostNum = [ myLostSoldier, npcOldLost];
			}
			else {
				let leftSmallList = ChallengeCfg.getCurMiddleLeftCfgList();
				let miaoshaSoldier = 0;
				for (let i = 0; i < leftSmallList.length; i++) {
					miaoshaSoldier += leftSmallList[i].soldier;
				}
				this._lostNum = [ myLostSoldier,npcOldLost -(miaoshaSoldier-Api.challengeVoApi.getCurKilledNum())];
			}

			this.calculateLostSoldierNumber();
			this.calculateLostTab();
			this.gameBegin();
			this._gameBtn.touchEnabled = false;
			this._gameBtn.visible = false;
			this._lossTipContainer.visible = false;
			this.setMiaoshaVisible(false);

			//制作死亡频率，防止动画过快
			let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
			this._deathRate = Math.ceil(3000/(totolCount+1));
			if (this._deathRate > 600) {
				this._deathRate = 600;
			}
			this._lastDeathTime = egret.getTimer() + this._deathRate *3;
			this._dotBar.miaoshaSetNum(Api.challengeVoApi.getCurSmallChannelId(),addCid);

		}else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`requestLoadErrorTip`));
			this.hide();
		}
	}
	

	private resetCountDown():void
	{
		if (!this._countDown) {
			this._countDown = new BaseDisplayObjectContainer();
			let countDownBg:BaseBitmap = BaseBitmap.create("prisonview_1");
			this._countDown.addChild(countDownBg);
			this._countDown.setPosition(GameConfig.stageWidth/2-countDownBg.width/2 + 20, this._gameBtn.y + 98);

			let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("countDown"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			timeDesc.setPosition(countDownBg.x+ countDownBg.width/2 -timeDesc.width/2 + 10, countDownBg.y + countDownBg.height/2 - timeDesc.height/2);
			this._countDown.addChild(timeDesc);
	
			if(PlatformManager.checkIsViSp()){
				this._countDownLb = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			} else {
				this._countDownLb = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_COMMON);
			}
			
			this._countDownLb.setPosition(timeDesc.x - 5 - this._countDownLb.width , timeDesc.y + timeDesc.height/2 - this._countDownLb.height/2);
			this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
			this._countDown.addChild(this._countDownLb);
			
		}
		this._countDownLb.text = "1";
		this._countDownTime = 1;

		this.addChild(this._countDown);
	}

	protected resetConfig():void
	{
		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		this._totalOldNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier];
		this._totalNum = [Api.playerVoApi.getSoldier(), this._challengeConfig.soldier - Api.challengeVoApi.getCurKilledNum()];
	}
	private resetMiaosha(){
		this._battleBiginCid = Api.challengeVoApi.getCurChannelId()-1;
		this._dotBar.isMiaosha = true;
		let leftSmallList = ChallengeCfg.getCurMiddleLeftCfgList();
		this._challengeConfig = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
		let miaoshaSoldier = 0;
		for (let i = 0; i < leftSmallList.length; i++) {
			miaoshaSoldier += leftSmallList[i].soldier;
		}
		this._miaoshaStartPlayerSoldier = Api.playerVoApi.getSoldier();
		this._totalOldNum = [Api.playerVoApi.getSoldier(), miaoshaSoldier];
		this._totalNum = [Api.playerVoApi.getSoldier(), miaoshaSoldier - Api.challengeVoApi.getCurKilledNum()];
		this._battleInfoTab[0].resetInfo(Api.playerVoApi.getSoldier());
		this._battleInfoTab[0].curNumber = Api.playerVoApi.getSoldier();
		this._battleInfoTab[1].resetInfo(miaoshaSoldier);
		this._battleInfoTab[1].curNumber = miaoshaSoldier - Api.challengeVoApi.getCurKilledNum();
		
		this.calculateSoldierNumber();
		this.clearRightSoldiers();
		this.clearLeftSoldiers();
		this.initRightSoldiers();
		this.initLeftSoldiers();
		this.calculateMeetPoint();
	}


	protected btnClick():void
	{	
		this.setMiaoshaVisible(false);
		if (this._totalNum[0] <= 0) {

			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:3,f:this.hide,o:this});
			App.CommonUtil.showTip(LanguageManager.getlocal("noSoldiersTip"));

			return;
		}
		this.closeBtn.setEnable(false);

		this._countDownTime = -1;

		if (this._countDown) {
			this.removeChild(this._countDown);
			this._countDown=null;
		}
		Api.rookieVoApi.checkNextStep();
		
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_ATTACK,null);
	}

	private intoBattle(p:any):void
	{
		if (p.data.ret == true) {

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);


			this._isAttackWin = p.data.data.data.battleReport.success;
			this._rewards = p.data.data.data.rewards;

			let myLostSoldier:number = Math.max(0,this._totalNum[0] - Api.playerVoApi.getSoldier());

			let npcOldLost:number = Math.max(0,this._totalNum[1]);

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
			this._lossTipContainer.visible = false;
			this.setMiaoshaVisible(false);

			if(!(PlatformManager.checkIsWxCfg()))
			{
				// if (Api.switchVoApi.checkJumpBattle()) {

					let unlockCfg = MainUIUnLockCfg.getMainUIUnLockCfg();
					let unlockIndex = MainUI.getInstance().getUnlockIndex();
					// this._skipBtn.visible = unlockIndex >= unlockCfg["mainuiCity"];


					let isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
					let isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
					if (isBuyMonthCard || isBuyYearCard) 
					{
						// this._skipBtn.setEnable(true);
					}
					else 
					{
						// App.DisplayUtil.changeToGray(this._skipBtn);
					}

				// }
			}


			//制作死亡频率，防止动画过快
			let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
			this._deathRate = Math.ceil(3000/(totolCount+1));
			if (this._deathRate > 600) {
				this._deathRate = 600;
			}
			this._lastDeathTime = egret.getTimer() + this._deathRate *3;
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
		this._isMiaoshaStart = false;
		let lastChannelId = Api.challengeVoApi.getCurChannelId()-1;
		if(Api.rookieVoApi.isInGuiding || (lastChannelId && ChallengeCfg.getChallengeCfgById(lastChannelId).unlockMapGroup))
		{
			this.hide(true);
			return;
		}
		if (this._isAttackWin) {
			let smallChannel:number = Api.challengeVoApi.getCurSmallChannelId();
			if (smallChannel == 0 ) {
				this.hide();
			}
			else {
				this.resetGameAfterWin();
			}
			
		}
		else {
			this.hide();
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
			this._countDownLb.text = this._countDownTime.toPrecision();
		}
		else if ( this._countDownTime == 0 &&Api.challengeVoApi.getCurSmallChannelId()!=0 &&!this._isMiaoshaStart) {
			this.btnClick();
		}

		if(this._miaoshaNewTip){
			this._miaoshaNewTip.text = 	Api.otherInfoVoApi.getMiaoshaLeftTime();
			if(!Api.otherInfoVoApi.getMiaoshaLeftTime()){
				this.setMiaoshaVisible(false);
				this._miaoshaNewTip.dispose();
				this._miaoshaTipBg.dispose();
				this._miaoshaNewTip = null;
				this._miaoshaTipBg = null;
			}
		}
	}

	private setMiaoshaVisible(visible:boolean){
		if(this._miaoshaBtn){
			this._miaoshaBtn.visible = this._gameBtn.visible;
			if(Api.otherInfoVoApi.checkCanUseMiaosha()){
				App.DisplayUtil.changeToNormal(this._miaoshaBtn);
			}else{
				App.DisplayUtil.changeToGray(this._miaoshaBtn);
			}
		}
		if(this._miaoshaNewTip){
			this._miaoshaNewTip.visible = visible  && Boolean(Api.otherInfoVoApi.getMiaoshaLeftTime()) ;
		}
		if(this._miaoshaTipBg){
			this._miaoshaTipBg.visible = visible  && Boolean(Api.otherInfoVoApi.getMiaoshaLeftTime());
		}

	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_AUTOSMALLATTACK,this.miaoshaHandler,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_CHALLENGE_ATTACK),this.intoBattle,this);

		Api.mainTaskVoApi.hideGuide();
		this._dotBar = null;
		if(this._rattle)
		{
			this._rattle.dispose();
			this._rattle = undefined;
		}
		

		if (this._countDown) {
			this._countDown.dispose();
		}
		this._countDown = undefined;
		this._countDownLb = undefined;
		this._countDownTime = -1;
		this._challengeConfig = undefined;

		this._lossTipContainer = null;
		this._tiptxt = null;

		this._miaoshaBtn = null;
		this._miaoshaNewTip = null;
		this._miaoshaTipBg = null;
		this._battleBiginCid = 0;
		this._isMiaoshaStart = false;
		this._miaoshaStartPlayerSoldier = 0;
		super.dispose();
	}

}