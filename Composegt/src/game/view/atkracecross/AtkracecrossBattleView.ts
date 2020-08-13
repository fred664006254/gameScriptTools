class AtkracecrossBattleView extends BaseBattleView
{
	
	private _isAttackWin:boolean = null;
	private _isEnd:boolean = false;
	//胜利刷新
	private _callbackF:Function = null;
	//完成或失败关闭
	private _callbackF2:Function = null;
	private _obj:any = null;
	private _rewards:string = null;

	private _battleInfo:any[] = null;

	//本场战斗第几回合
	private _curRound:number = 0;

	//战斗之前胜利了几场
	private _winNumber:number = 0;
	private _totalNumber:number = 0;

	private _oldInfo:any[] = [];


	public constructor() {
		super();
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	


		let servantId:string = this.param.data.servantid;
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkracecrossVoApi.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;

		this._oldInfo[0] = {max:myInfo.fullattr,cur:myInfo.attr,level:myInfo.lv,sid:myInfo.sid,ability:myInfo.ability,skin:myInfo.skin};
		let enemyInfo = myAtkInfo.fids[servantId];
		this._oldInfo[1] = {max:enemyInfo.fullattr,cur:enemyInfo.attr,level:enemyInfo.lv,sid:servantId,ability:enemyInfo.ability,name:myAtkInfo.getFName(),skin:enemyInfo.skin};

		this._winNumber = myAtkInfo.fightnum;
		this._totalNumber = myAtkInfo.total;
		
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");		
		return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_FIGHT,requestData:{servantid:servantId,activeId:crossVo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.ret == true) {
			this._battleInfo = data.data.data.atkreports;
			this._isAttackWin = (data.data.data.win==1);
		}
		else {
			this.hide();
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkrace_battle_info","atkrace_skip"
		]);
	}

	protected getBgName():string
	{
		return "arena_bg";
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640*1.3,1136*1.3);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0-640*0.15,(GameConfig.stageHeigth-this.viewBg.height)*0.2);
			this.addChild(this.viewBg); 
		}
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
			this._callbackF2 = this.param.data.f2;
		}
		this._isEnd = false;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.hide,this);

		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - maskDown.height;
        this.addChildToContainer(maskDown);

		let maskUp:BaseBitmap = BaseBitmap.create("servant_mask");
        maskUp.width = GameConfig.stageWidth;
		maskUp.scaleY = -1;
        maskUp.y = maskUp.height;
        this.addChildToContainer(maskUp);

		this.setTopProgress(this._oldInfo[1].cur,this._oldInfo[1].max);
		this.setBottomProgress(this._oldInfo[0].cur,this._oldInfo[0].max);

		

		let upHeroPic:string = Config.ServantCfg.getServantItemById(this._oldInfo[1].sid).fullIcon;
		let skin = this._oldInfo[1].skin;
		if( skin && skin != ""){
			upHeroPic = Config.ServantskinCfg.getServantSkinItemById(skin).body;
		}
		// let downPic:string = Config.ServantCfg.getServantItemById(this._oldInfo[0].sid).fullIcon;
		let downPic:string = Api.servantVoApi.getFullImgPathWithId(this._oldInfo[0].sid);//Config.ServantCfg.getServantItemById(this._oldInfo[0].sid).fullIcon;
		this.setUpHero(upHeroPic,{level:this._oldInfo[1].level,name:LanguageManager.getlocal("servant_name"+this._oldInfo[1].sid),ability:this._oldInfo[1].ability});
		this.setDownHero(downPic,{level:this._oldInfo[0].level,name:LanguageManager.getlocal("servant_name"+this._oldInfo[0].sid),ability:this._oldInfo[0].ability});
		
		this._upHero.x = 17;
		this._downHero.x = 280;
		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);
		let skipBtn:BaseButton = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		skipBtn.setPosition(GameConfig.stageWidth-skipBtn.width-12,65);
		this.addChild(skipBtn);
		this.showRound();
	}

	/**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
		if (this._battleInfo.length > this._curRound) {
			let curInfo:any = this._battleInfo[this._curRound];
			this.attackHandle(curInfo[0],curInfo[2],curInfo[1]);
			this._curRound++;
		}
		else {
			this.showEndGameBefore();
		}
	}

	private showEndGameBefore():void
	{	
		let failMan:BattleHero;
		if (this._isAttackWin) {
			failMan = this._upHero;
		}
		else {
			
			failMan = this._downHero;
		}
		egret.Tween.get(failMan).to({alpha:0},800).call(this.showEndGame,this);
	}

	private skipBattle():void
	{
		if (this._isEnd != true) {
			this.showEndGame();
		}
	}

	private showEndGame():void
	{
		this._isEnd = true;

		if (this._isAttackWin) {
			ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{f:this.endCallBack,o:this,num:this._winNumber,type:2});
		}
		else {
			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:4,f:this.endCallBack,o:this});
		}
	}

	//战斗结束
	private endCallBack():void
	{	
		
		if (this._isAttackWin) {

			//是否抽奖
			if (this._winNumber % 3 == 2) {
				//抽奖
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSREWARDPOPUPVIEW,{f:this.winHandle,o:this});
			}
			else {
				this.winHandle();
			}

		}
		else {
			//失败 
			let nameStr:string = this._oldInfo[1].name;
			let sidStr:string = this._oldInfo[0].sid;
			if (this._winNumber > 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:3 , name: nameStr, sid:sidStr});
			}
			else {
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:2 , name: nameStr, sid:sidStr});
			}

			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
			this._callbackF2.apply(this._obj);
			this.hide();
		}

	}

	//胜利
	private winHandle():void
	{
		if (this._winNumber + 1 == this._totalNumber) {

			let nameStr:string = this._oldInfo[1].name;
			let sidStr:string = this._oldInfo[0].sid;
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:4 , name: nameStr, sid:sidStr});
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACECROSS);
			this._callbackF2.apply(this._obj);

		}
		else {
			this._callbackF.apply(this._obj);
		}

		this.hide();
	}

	protected atkEndCallback():void
	{	
		if (this._isEnd != true) {
			this.showRound();
		}
		
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND,this.hide,this);
		this._battleInfo = null;
		this._isEnd = false;
		this._isAttackWin = null;
		this._rewards = null;
		this._oldInfo.length = 0;
		this._winNumber = 0;
		this._callbackF2 = null;
		this._callbackF = null;
		this._obj = null;
		this._totalNumber = 0;
		this._curRound = 0;

		super.dispose();
	}
}