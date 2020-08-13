/*
    author : shaoliang
    date : 2019.10.25
    desc : 天下至尊-战斗
*/

class LadderBattleView extends BaseBattleView
{	
	//第几场
	private _type:number = 0;
	//第几轮
	private _curRound:number = 0;
	private _curIdex:number = 0;
	private _curRoundFirst:number = 0;
	private _reportVoApi:LadderTournamentReportVoApi = null;

	private _beginAnimNode:BaseDisplayObjectContainer = null;

	private _fuction:Function = null;
	private _obj:any = null;
	
	private _topIcons:LadderBattleServantIcon[] = [];
	private _bottomIcons:LadderBattleServantIcon[] = [];
	private _isEnd:boolean = false;

	private _skipBtn:BaseButton = null;
	private _skip = false;
	private _isPause:boolean = false;

    public constructor() {
		super();
	}

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_CHALLENGE;
	}

	protected getCloseBtnName():string
	{
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}
	protected getTitleBgName():string
	{
		return null;
	}

	protected getResourceList():string[]{
        
        return super.getResourceList().concat([
			"ladder_bg2","atkrace_skip",'specialview_commoni_namebg',
            "ladderbattle","atkrace_battle_info","progress7_bg","progress8",
        ]);
	}
	
	protected getBgName():string
	{
		return "ladder_bg2";
	}
	
    protected initView():void
    {
		this._type = this.param.data.type;
		this._fuction = this.param.data.f;
		this._obj = this.param.data.o;
		this._reportVoApi = Api.laddertournamentVoApi.reportVoApi;

		if (this.param.data.f2 && this.param.data.o2)
		{
			this.param.data.f2.apply(this.param.data.o2);
		}

		this._skip = false;
		this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,200);
		if (this._type == 1)
		{
			this._skipBtn.y = 40;
		}
		this.addChild(this._skipBtn);
		this._skipBtn.visible = false;

		this.initBattleInfo();
	}

	private skipBattle():void
	{
		if (this._isEnd != true) {
			if(!this._skip){
				if (this._type!=1)
				{
					this._curRound = 5;
				}
				this.showLoadingMask();
				this._skip = true;
				this._isPause = true;
				
			}
		}
	}
	
	private initBattleInfo():void
	{	
		if (this._type == 1)
		{
			
		}
		else
		{
			let topBg = BaseBitmap.create("public_9_bg89");
			topBg.width = GameConfig.stageWidth;
			topBg.height = 194;
			this.addChildToContainer(topBg);

			let downBg = BaseBitmap.create("public_9_bg89");
			downBg.width = GameConfig.stageWidth;
			downBg.height = 194;
			downBg.y = GameConfig.stageHeigth-downBg.height;
			this.addChildToContainer(downBg);

			let topInfo:any[] = this._reportVoApi.getServantInfo(this._type,2);
			let bottomInfo:any[] = this._reportVoApi.getServantInfo(this._type,1);

			for (let i=0; i<5; i++)
			{
				let topServant = new LadderBattleServantIcon();
				topServant.init(topInfo[i]);
				topServant.anchorOffsetX = topServant.width/2;
				topServant.anchorOffsetY = topServant.height/2;
				topServant.setPosition(70+ i*124 ,83);
				this.addChildToContainer(topServant);

				let bottomServant = new LadderBattleServantIcon();
				bottomServant.init(bottomInfo[i]);
				bottomServant.anchorOffsetX = bottomServant.width/2;
				bottomServant.anchorOffsetY = bottomServant.height/2;
				bottomServant.setPosition(topServant.x ,GameConfig.stageHeigth - 85);
				this.addChildToContainer(bottomServant);

				this._topIcons.push(topServant);
				this._bottomIcons.push(bottomServant);
			}
		}

		this.roundBeginAnim();
	}

	private roundBeginAnim():void
	{	
		this._curRound++;
		
		if (this._upHero)
		{
			this._upHero.visible = false;
		}
		if (this._downHero)
		{
			this._downHero.visible = false;
		}
		if (this._bottomProgress)
		{
			this._bottomProgress.visible = false;
		}
		if (this._topProgress)
		{
			this._topProgress.visible = false;
		}
		this._skipBtn.visible = false;


		this._beginAnimNode = new BaseDisplayObjectContainer();
		this.addChild(this._beginAnimNode);

		let view = this;

		if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("ladderTournament_BattleIcon_ske")) {
			
			let idleNameTab = ["jiang","qinglong","baihu","zhuque","xuanwu"];

			let bone = App.DragonBonesUtil.getLoadDragonBones("ladderTournament_BattleIcon",1,idleNameTab[this._type-1]);
			bone.x = GameConfig.stageWidth/2;
			bone.y = GameConfig.stageHeigth/2;
			this._beginAnimNode.addChild(bone);
			bone.setDragonBoneEventListener(dragonBones.EventObject.START, ()=>{
				
				let oneNode = new BaseDisplayObjectContainer();
				view._beginAnimNode.addChild(oneNode);
				let roundBg = BaseBitmap.create("ladder_battle_typebg"+view._type);
				oneNode.addChild(roundBg);
				let picstr = "ladder_battle_round"+view._curRound;
				if (view._type==1)
				{
					picstr = "ladder_battle_round0";
				}
				let roundBitmap = BaseBitmap.create(picstr);
				roundBitmap.setPosition(roundBg.width/2-roundBitmap.width/2, roundBg.height/2 - roundBitmap.height/2);
				oneNode.addChild(roundBitmap);
				roundBg.alpha =0;


				oneNode.setScale(GameConfig.stageWidth/roundBg.width);
				oneNode.y = GameConfig.stageHeigth/2 - roundBg.height*oneNode.scaleY/2;

				egret.Tween.get(oneNode).
				to({x:GameConfig.stageWidth/2-roundBg.width/2,
					y:GameConfig.stageHeigth/2-roundBg.height/2,
					scaleX:1,scaleY:1
					},150).
			
				wait(1500).call(view.roundBegin,view);
			}, this);
			// bone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
			// 	this.roundBegin();
			// }, this);
			

        } else {
			let oneNode = new BaseDisplayObjectContainer();
			this._beginAnimNode.addChild(oneNode);
            let roundBg = BaseBitmap.create("ladder_battle_typebg"+this._type);
			oneNode.addChild(roundBg);

			let picstr = "ladder_battle_round"+this._curRound;
			if (this._type==1)
			{
				picstr = "ladder_battle_round0";
			}
			let roundBitmap = BaseBitmap.create(picstr);
			roundBitmap.setPosition(roundBg.width/2-roundBitmap.width/2, roundBg.height/2 - roundBitmap.height/2);
			oneNode.addChild(roundBitmap);

			oneNode.setScale(GameConfig.stageWidth/roundBg.width);
			oneNode.y = GameConfig.stageHeigth/2 - roundBg.height*oneNode.scaleY/2;

			egret.Tween.get(oneNode).
			to({x:GameConfig.stageWidth/2-roundBg.width/2,
				y:GameConfig.stageHeigth/2-roundBg.height/2,
				scaleX:1,scaleY:1
				},500).
		
			wait(300).call(this.roundBegin,this);
        }


		
	}	

	private removeRoundAnim():void
	{
		if (this._beginAnimNode)
		{
			egret.Tween.removeTweens(this._beginAnimNode);
			this.removeChild(this._beginAnimNode);
			this._beginAnimNode=null;
		}
	}

	private roundBegin():void	{	

		this._skipBtn.visible = true;
		this._isPause= false;
		this.removeRoundAnim();
		
		this._curIdex = 1;
		this._curRoundFirst = this._reportVoApi.getFirstHandByRound(this._type,this._curRound)%2;

		let bloods:number[] = this._reportVoApi.getBattleBloodByRound(this._type,this._curRound);
		this._topMaxValue= bloods[1]==null?0:bloods[1];
		this._bottomMaxValue=bloods[0]==null?0:bloods[0];
		this.setTopProgress(bloods[1],bloods[1]);
		this.setBottomProgress(bloods[0],bloods[0]);
		

		let playerInfo:any[] = this._reportVoApi.getCompetitorInfo(this._type,this._curRound);
		if (this._type == 1)
		{
			this.setUpHero(null,playerInfo[1],4);
			this.setDownHero(null,playerInfo[0],4);

			this._upHero.x = 17;
			this._downHero.x = 280;
			this._upHero.y = 140;
			this._downHero.y = GameConfig.stageHeigth - 420;
		}
		else
		{
			if (playerInfo[1].sid)
			{
				let flag = false;
				let upHeroPic:string = ``;
				if(playerInfo[1].equip){
					upHeroPic = `skin_full_${playerInfo[1].equip}`;
					flag = true;
				}
				else{
					upHeroPic = Config.ServantCfg.getServantItemById(playerInfo[1].sid).fullIcon;
				}
				this.setUpHero(upHeroPic,{level:playerInfo[1].lv,name:LanguageManager.getlocal("servant_name"+playerInfo[1].sid),quality:playerInfo[1].quality,pos:this._type-1},0,flag);
			}
			else
			{
				this.setUpHero(null);
			}

			if (playerInfo[0].sid)
			{
				let downPic:string ;
				let flag = false;
				if(playerInfo[0].equip){
					flag = true;
					downPic = `skin_full_${playerInfo[0].equip}`
				}
				else{
					downPic = Config.ServantCfg.getServantItemById(playerInfo[0].sid).fullIcon;
				}
				this.setDownHero(downPic,{level:playerInfo[0].lv,name:LanguageManager.getlocal("servant_name"+playerInfo[0].sid),quality:playerInfo[0].quality,pos:this._type-1},0,flag);
			}
			else
			{
				this.setDownHero(null);
			}

			this._upHero.x = 17;
			this._downHero.x = 280;
			this._upHero.y = 190;
			this._downHero.y = GameConfig.stageHeigth - 600;

			this._topProgress.y = 162;
			this._bottomProgress.y = GameConfig.stageHeigth - 194+4;
		}

		
		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._upHero.visible = true;
		this._downHero.visible = true;
		this._topProgress.visible = true;
		this._bottomProgress.visible = true;


		egret.Tween.get(this._upHero).wait(600).call(this.showRound,this);


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

	/**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
		if (this._topCurValue >0 && this._bottomCurValue >0) {

			let round = 5;
			if(this._curRound > 0 && this._curIdex > 1 && ((this._curIdex-1) % (2*round) == 0))
			{
				this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip7`, [String(Math.floor(this._curIdex/2))]), false, true);
				egret.Tween.get(this).wait(1300).call(()=>{
					let area:number = 1;
					if (this._curRoundFirst != this._curIdex%2)
					{
						area = 2;
					}
					let reportInfo:number[]=this._reportVoApi.getReportByRoundAndIndex(this._type,this._curRound, this._curIdex);
					this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
					this._curIdex++;
				});
			}
			else
			{
				let area:number = 1;
				if (this._curRoundFirst != this._curIdex%2)
				{
					area = 2;
				}
				let reportInfo:number[]=this._reportVoApi.getReportByRoundAndIndex(this._type,this._curRound, this._curIdex);
				this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
				this._curIdex++;
			}
		}
		else {
			this.showEndGameBefore();
		}
	}

	protected atkEndCallback():void
	{	

		if(this._isPause && this._skip){
			this.hideLoadingMask();
			this.showEndGame();
			this._skip = false;
		}
		if (this._isEnd != true && this._isPause!=true) {
			this.showRound();
		}
	}

	private showEndGameBefore():void
	{
		let failMan:BattleHero;
		if (this._reportVoApi.getBattleResultByRound(this._type,this._curRound) == 1) {
			failMan = this._upHero;
		}
		else {
			
			failMan = this._downHero;
		}
		egret.Tween.get(failMan).to({alpha:0},800).call(this.showEndGame,this);
	}


	private showEndGame():void
	{	
		if (this._isEnd )
		{
			return;
		}

		if (this._type == 1)
		{
			this.battleEnd();
			return;
		}

		this.removeRoundAnim();
		this._upHero.clearHero();
		this._downHero.clearHero();
		this.showMaskAndWin(this._curRound);

		

		if (this._curRound>=5) 
		{	
			this.battleEnd();
		}
		else {
			this.roundBeginAnim()
		}
	}

	//真结束
	private battleEnd():void
    {	
		this._isEnd = true;
		let curRoundResult:number = this._reportVoApi.getBattleWinByType(this._type) ? 1 : 2;
		let socretab = this._reportVoApi.getBattleResultByType(this._type);
		ViewController.getInstance().openView(ViewConst.BASE.LADDERBATTLEWIN,
			{	f:this.battleCallbackEnd,
				o:this,
				result:curRoundResult,
				score:socretab,
				type:this._type
			});
	}

	private battleCallbackEnd():void
	{
		this._fuction.apply(this._obj,[this._type]);

		this.hide();
	}
	
	//给icon贴上 胜 或 负
	private showMaskAndWin(round:number):void
	{	
		for (let r = 1; r<=round; r++)
		{
			if ( this._reportVoApi.getBattleResultByRound(this._type,r)==1)
			{
				this._topIcons[r-1].setResult(2);
				this._bottomIcons[r-1].setResult(1);
			}
			else 
			{
				this._topIcons[r-1].setResult(1);
				this._bottomIcons[r-1].setResult(2);
			}
		}
	}


	public dispose() 
    {	
		this._isEnd = false;

		this._type = 0;
		this._curRound = 0;
		this._reportVoApi = null;
		this._fuction = null;
		this._obj = null;
		this._beginAnimNode = null;
		this._curIdex = 0;
		this._curRoundFirst = 0;
		this._topIcons.length = 0;
		this._bottomIcons.length = 0;
		this._isPause = false;
		this._skipBtn = null;
		this._skip = false;

		super.dispose();
	}
}