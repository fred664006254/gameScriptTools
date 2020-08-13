

class ConquestFightView extends BattleView
{
	private _conquestConfig:any = undefined;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["hero_anim_1",
				"npc_anim_1",
				"conquest_fightbg",
				ButtonConst.BATTLE_START_BTN_1,
				
		
				"battle_info_bg",	
				"battle_luanz",
				"progress_type3_red",
				"progress_type1_yellow2",
				"progress_type3_bg",

				"challenge_officebg",
		
		]);
	}

	protected battleBgName():string
	{
		return "conquest_fightbg";
	}

	protected getTitleStr():string
	{
		return "conquestTitle";
	}

	protected resetConfig():void
	{	
		let data = this.param.data;

		this._isAttackWin = data.fightflag == 1;
		this._rewards = data.rewards;
		this._conquestConfig = Config.ConquestCfg.getConquestCfgById(data.info.cid);
		this._totalOldNum = [data.info.oldSilder, data.info.enemySoldier];
		this._totalNum = this._totalOldNum;
	}

	protected init():void
	{	
		super.init();

		//初始化 双方信息
		for (let i:number = 0; i<=1; i++) 
		{
			this._battleInfoTab[i] = new BattleInfo();
			
			if (i == 0) {
				this._battleInfoTab[i].init(this._totalOldNum[i],true,null,true);
				this._battleInfoTab[i].x = 15;
				this._battleInfoTab[i].y = GameConfig.stageHeigth - 35 - this._battleInfoTab[i].height;
			}
			else {
				let cidd = this.param.data.info.cid;
				let index = this.param.data.info.idx;
				let persionId = Config.ConquestCfg.getConquestCfgById(cidd + "")["person" + index];
				let info:any = {show:persionId,cid:cidd,idx:index};
				this._battleInfoTab[i].init(this._totalOldNum[i],false,info,true);
				this._battleInfoTab[i].x = GameConfig.stageWidth - 60 -this._battleInfoTab[i].width;
				this._battleInfoTab[i].y = 130;
			}
			
			this.addChild(this._battleInfoTab[i]);
			this._battleInfoTab[i].curNumber = this._totalNum[i];
		}

		this.intoBattle();
	}

	private intoBattle():void
	{
		
		SoundManager.playEffect(SoundConst.EFFECT_BATTLE);
		SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);


		let myLostSoldier:number = Math.max(0,this._totalNum[0] - Api.playerVoApi.getSoldier());

		let npcOldLost:number = Math.max(0,this._totalNum[1]);

		if (this._isAttackWin) {
			this._lostNum = [ myLostSoldier, npcOldLost];
		}
		else {
			let info:any = this.param.data.info;
			let soldier1:number = this._totalNum[0];
			let soldier2:number = this._totalNum[1];
			let atk1:number = Api.playerVoApi.getAtk();
			let atk2:number = soldier2/10;
			let lostSold2 = Math.ceil(soldier1 * (atk1+1000)/(atk2+1000));
			if (lostSold2> soldier2) 
			{
				lostSold2 = soldier2;
			}
			this._lostNum = [ myLostSoldier, lostSold2];
		}

		this.calculateLostSoldierNumber();
		this.calculateLostTab();
		this.gameBegin();
		this._gameBtn.touchEnabled = false;
		this._gameBtn.visible = false;

		//制作死亡频率，防止动画过快
		let totolCount:number = this._lostSoldier[0] + this._lostSoldier[1];
		this._deathRate = Math.ceil(3000/(totolCount+1));
		if (this._deathRate > 1000) {
			this._deathRate = 1000;
		}
		this._lastDeathTime = egret.getTimer() + this._deathRate *3;
	}

	protected endCallBack():void
	{	
		this.hide();
	}

	protected showResultView():void
	{
		if (this._isAttackWin) {
			let cidd = this.param.data.info.cid;
			let index = this.param.data.info.idx;
			let persionId = Config.ConquestCfg.getConquestCfgById(cidd + "")["person" + index];
			let infoTab:any = {show:persionId,cid:cidd};
			ViewController.getInstance().openView(ViewConst.POPUP.CONQUESTWINPOPUPVIEW,{award:this._rewards,f:this.endCallBack,o:this,info:infoTab});
		}
		else {
			 ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:1,f:this.endCallBack,o:this});
		}
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	public dispose():void
	{
		this._conquestConfig = null;

		super.dispose();
	}
}