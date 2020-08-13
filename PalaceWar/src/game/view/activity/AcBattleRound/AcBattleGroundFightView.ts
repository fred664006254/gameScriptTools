

class AcBattleGroundFightView extends BaseBattleView
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
	private _servantId:string = null;
	private _servantId2:string = null;

	private _oldInfo:any[] = [];


	public constructor() {
		super();
	}

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
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

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
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
		let myAtkInfo:AtkraceAtkInfoVo = this.vo.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;

		this._oldInfo[0] = {max:myInfo.fullattr,cur:myInfo.attr,level:myInfo.lv,sid:myInfo.sid,ability:myInfo.ability,equip :myInfo.equip};
		let enemyInfo = myAtkInfo.fids[servantId];
		this._oldInfo[1] = {max:enemyInfo.fullattr,cur:enemyInfo.attr,level:enemyInfo.lv,sid:servantId,ability:enemyInfo.ability,name:myAtkInfo.getFName(),
			equip : enemyInfo.equip,weaponDps:enemyInfo.weaponDps};
		this._winNumber = myAtkInfo.fightnum;
		this._totalNumber = myAtkInfo.total;
		this._servantId = myInfo.sid;
		this._servantId2 = servantId;
		return {requestType:NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_FIGHT,requestData:{servantid:servantId, activeId : this.acTivityId}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.data.data.newRound){
			this.param.data.f3.apply(this._obj);
			this.hideLoadingMask();
			this.hide();
		}
		else{
			if (data.ret == true) {
				this._battleInfo = data.data.data.atkreports;
				this._isAttackWin = (data.data.data.win==1);
				this.vo.setRaceInfo(data.data.data.battleground);
			}
			else {
				this.hide();
			}
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkrace_battle_info","atkrace_skip","specialview_commoni_namebg"
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

		

		let upHeroPic:string = ``;
		if(this._oldInfo[1].equip && this._oldInfo[1].equip != ``){
			upHeroPic = `skin_full_${this._oldInfo[1].equip}`;
		}
		else{
			upHeroPic = Config.ServantCfg.getServantItemById(this._oldInfo[1].sid).fullIcon;
		}
		
		let downPic:string = ``;
		let ishelp = this.param.data.support;
		let showeff1 = false;
		let showeff2 = false;
		if(this._oldInfo[1].equip && this._oldInfo[1].equip != ``){
			showeff1 = true;
		}

		if(ishelp){
			downPic = Config.ServantCfg.getServantItemById(this._oldInfo[0].sid).fullIcon;
			if(this._oldInfo[0].equip && this._oldInfo[0].equip != ``){
				downPic = `skin_full_${this._oldInfo[0].equip}`;
				showeff2 = true;
			}
		}
		else{
			downPic = Api.servantVoApi.getFullImgPathWithId(this._oldInfo[0].sid);
			let servantvo =  Api.servantVoApi.getServantObj(this._oldInfo[0].sid);
			if(servantvo.equip && servantvo.equip != ``){
				showeff2 = true;
			}
		}
		
		//
		this.setUpHero(upHeroPic,{level:this._oldInfo[1].level,name:LanguageManager.getlocal("servant_name"+this._oldInfo[1].sid),ability:this._oldInfo[1].ability},0,showeff1);
		this.setDownHero(downPic,{level:this._oldInfo[0].level,name:LanguageManager.getlocal("servant_name"+this._oldInfo[0].sid),ability:this._oldInfo[0].ability},0,showeff2);
		this._upHero.x = 17;
		this._downHero.x = 280;
		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		let skipBtn:BaseButton = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn()?12:(GameConfig.stageWidth-skipBtn.width-12),45);
		this.addChild(skipBtn);
		this.showSkin();

		if (PlatformManager.hasSpcialCloseBtn())
		{
			skipBtn.x = 12;
		}
	}

	private showSkin():void{
		let view = this;
		let equip = [];
		let ishelp = this.param.data.support;
		if(ishelp){
			if(this._oldInfo[0].equip && this._oldInfo[0].equip != ``){
				equip.push(this._oldInfo[0].equip);
			}
		}
		else{
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._oldInfo[0].sid);
			if (servant && servant.equip && servant.equip != "")
			{
				equip.push(servant.equip);
			}
		}
		
		if (this._oldInfo[1].equip && this._oldInfo[1].equip != "")
		{
			equip.push(this._oldInfo[1].equip);
		}
		
		equip = [];
		if(equip.length){
			ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
				callback : ()=>{
					if(equip[1]){
						ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
							callback : ()=>{
								this.checkWeapon();
							},
							callbackThisObj : this,
							skinId : equip[1]
						});
					}
					else{
						this.checkWeapon();
					}
				},
				callbackThisObj : this,
				skinId : equip[0]
			});
		}
		else{
			this.checkWeapon();
		}
	}

	private checkWeapon():void
	{	
		let serId = this._servantId;
		let serId2 = this._servantId2;
		// serId = "1001";
		// serId2 = "1001";

		let weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(serId);
		let value2 = 0;
		if (this._oldInfo[1].weaponDps)
		{
			value2 = this._oldInfo[1].weaponDps;
		}

		if (weaponVo)
		{
			this.setDownWeaponInfo(serId,0,1);
		}
		if (value2)
		{
			this.setUpWeaponInfo(serId2,value2,1);
		}
		this.checkWeaponBack();

		// value2 = 888;
		
		// if (!weaponVo && !value2)
		// {	
		// 	this.checkWeaponBack();
		// 	return;
		// }		

		// ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
		// 	sid:serId,
		// 	type:1,
		// 	atype:7,
		// 	sid2:serId2,
		// 	type2:4,
		// 	atype2:7,
		// 	value2:value2,
		// 	f:this.checkWeaponBack,
		// 	o:this,
		// 	auto: false,
		// });
	}

	private checkWeaponBack(skip:number = 0):void
	{	
		if (this && this.isShow())
		{
			if (skip == 0)
			{
				this.showRound();
			}
			else if (skip == 1)
			{
				this._downHero.showLight(this.showRound,this);
			}
			else if (skip == 2)
			{
				this._upHero.showLight(this.showRound,this);
			}
			else if (skip == 3)
			{	
				this._upHero.showLight();
				this._downHero.showLight(this.showRound,this);
			}
			else
			{
				this.showRound();
			}
		}
		
	}

	/**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
		if (this._battleInfo.length > this._curRound) {
			let round = 5*2;
			if(this._curRound > 0 && this._curRound%round == 0)
			{
				this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip7`, [String(Math.floor(this._curRound/2))]), false, true);
				egret.Tween.get(this).wait(1300).call(()=>{
					let curInfo:any = this._battleInfo[this._curRound];
					this.attackHandle(curInfo[0],curInfo[2],curInfo[1]);
					this._curRound++;
					});	
			}else
			{
				let curInfo:any = this._battleInfo[this._curRound];
				this.attackHandle(curInfo[0],curInfo[2],curInfo[1]);
				this._curRound++;
			}
		}
		else {
			this.showEndGameBefore();
		}
	}
	 private showWinBattle(str : string, isup : boolean, ismiddle = false):void{
        let view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        let descbg = BaseBitmap.create(`specialview_commoni_namebg`);
        let tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;

        if(ismiddle){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [-40,0]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0,150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChildToContainer(descbg);
        this.addChildToContainer(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;

        egret.Tween.get(descbg).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            descbg.dispose();
            descbg = null;
        },this);

        egret.Tween.get(tipTxt).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            tipTxt.dispose();
            tipTxt = null;
        },this);
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
		if (this._isEnd == true)
		{
			return;
		}
		this._isEnd = true;

		if (this._isAttackWin) {
			ViewController.getInstance().openView(ViewConst.BASE.BATTLEWIN,{
				f:this.endCallBack,
				o:this,
				num:this._winNumber,
				type:2,
				victory : this.cfg.victory,
				battleground : true,
				ishelp : this.param.data.support,
				fameAdd:5
			});
		}
		else {
			ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW,{type:4,f:this.endCallBack,o:this});
		}
	}

	//战斗结束
	private endCallBack():void
	{	
		if (this._oldInfo.length ==0)
		{
			return;
		}
		if (this._isAttackWin) {
			//别人支援门客不抽奖
			let ishelp = this.param.data.support;
			//是否抽奖
			if (this._winNumber % 3 == 2 && !ishelp) {
				//抽奖
				ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW,{
					f:this.winHandle,
					o:this,
					battleground:true,
					code:this.code,
				});
			}
			else {
				this.winHandle();
			}

		}
		else {
			//失败 
			if (this._oldInfo.length == 0)
			{
				return;
			}

			let nameStr:string = this._oldInfo[1].name;
			let sidStr:string = this._oldInfo[0].sid;
			if (this._winNumber > 0) {
				ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG,{
					type:3 , 
					name: nameStr, 
					sid:sidStr,
					aid : this.aid,
					code : this.code,
					ishelp : this.param.data.support,
					equip : this._oldInfo[0].equip
				});
			}
			else {
				ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG,{
					type:2 , 
					name: nameStr, 
					sid:sidStr,
					aid : this.aid,
					code : this.code,
					ishelp : this.param.data.support,
					equip : this._oldInfo[0].equip
				});
			}

			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
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
			ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG,{
				type:4 , 
				name: nameStr, 
				sid:sidStr,
				aid : this.aid,
				code : this.code,
				ishelp : this.param.data.support,
				equip : this._oldInfo[0].equip
			});
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESET_ATKRACE);
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
		this._servantId = null;
		this._servantId2 = null;

		super.dispose();
	}
}