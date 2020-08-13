/**
 * 江湖名望 修身战斗
 * date 2020.7.9
 * author ycg
 */

class NewAtkraceCrossFameBattleView extends BaseBattleView
{
    //第几场
	private _type:number = 0;
	//第几轮
	private _curRound:number = 0;
	private _curIdex:number = 0;
	private _curRoundFirst:number = 0;

	private _beginAnimNode:BaseDisplayObjectContainer = null;

	private _fuction:Function = null;
	private _obj:any = null;
	
	private _isEnd:boolean = false;

	private _skipBtn:BaseButton = null;
	private _skip = false;
    private _isPause:boolean = false;
    
    private _winFlag:number = 1;

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
			"arena_bg","atkrace_skip",'specialview_commoni_namebg',"atkrace_battle_info","progress7_bg","progress8",
        ]);
	}
	
	protected getBgName():string
	{
		return "arena_bg";
    }
    
    protected isShowOpenAni():boolean
	{
		return false;
    }
	
    protected initView():void
    {
		this._winFlag = this.param.data.winuid == this.downPlayerInfo.uid ? 1 : 2;

		this._skip = false;
		this._skipBtn = ComponentManager.getButton("atkrace_skip",null,this.skipBattle,this);
		this._skipBtn.setPosition(GameConfig.stageWidth-this._skipBtn.width-12,200);
		this._skipBtn.y = 40;
		this.addChild(this._skipBtn);
		this._skipBtn.visible = false;

		this.initBattleInfo();
    }
    
    private get upPlayerInfo():any{
        //上方信息 敌对
        return this.param.data.finfo;
    }

    private get downPlayerInfo():any{
        //下方玩家 自己 主视角
        return this.param.data.minfo;
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

        this.roundBegin();
		
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

		this._curIdex = 1;
        let info = this.getCurRoundData();
        this._curRoundFirst = info.firstflag == 1 ? 1 : 0; 
        let ainfo = info.ainfo;
        let binfo = info.binfo;

        this._topMaxValue = binfo.fullattr;
        this._bottomMaxValue =ainfo.fullattr;
        this.setBottomProgress(ainfo.fightattr?ainfo.fightattr:ainfo.fullattr, ainfo.fullattr);
        this.setTopProgress(binfo.fightattr?binfo.fightattr:binfo.fullattr, binfo.fullattr);

        this.setUpHero(null,this.upPlayerInfo,4);
        this.setDownHero(null,this.downPlayerInfo,4);

        this._upHero.x = 17;
        this._downHero.x = 280;
        this._upHero.y = 140;
        this._downHero.y = GameConfig.stageHeigth - 420;
		
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

        // if(ismiddle){
		// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [0,0]);
        // }
        // else{
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0,150]);
		// }
		descbg.setPosition(GameConfig.stageWidth/2 - descbg.width/2, GameConfig.stageHeigth/2 - descbg.height/2);
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

    private getCurRoundData(round : number = 0):{firstflag:number,win:number,reports:any[],ainfo:any,binfo:any}{
        if(!round){
            round = this._curRound;
        }
        let log = this.param.data.pklogs[round- 1];
        if(log){
            return{
                firstflag:log[0],//表示主视角先手
                win:log[1],//表示主视角获胜
                reports:log[2],//[hit1,hit2,hit3...] ，hit1为先手攻击，hit2为后手，以此类推hit = [isCri,damage]  isCri=1表示暴击了，damage伤害
                ainfo:log[3],//主视角门客信息
                binfo:log[4],//对手门客信息
            };
        }
        else{
            return null;
        }
        
    }

	/**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
        let curRoundData = this.getCurRoundData();
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
                    let reportInfo = curRoundData.reports[this._curIdex - 1];
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
                let reportInfo = curRoundData.reports[this._curIdex - 1];
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
		if (this._winFlag == 1) {
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

		// if (this._type == 1)
		// {
		// 	this.battleEnd();
		// 	return;
		// }

		this.removeRoundAnim();
		this._upHero.clearHero();
		this._downHero.clearHero();
		this.showMaskAndWin(this._curRound);

        this.battleEnd();
		// if (this._curRound>=5) 
		// {	
		// 	this.battleEnd();
		// }
		// else {
		// 	this.roundBeginAnim()
		// }
	}

	//真结束
	private battleEnd():void
    {	
        this._isEnd = true;
        this._isPause = true;
		ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSFAMEBATTLERESULTVIEW, { f: this.hide, o: this, type: this._winFlag });
	}

	private battleCallbackEnd():void
	{
		this._fuction.apply(this._obj,[this._type]);

		this.hide();
	}
	
	//给icon贴上 胜 或 负
	private showMaskAndWin(round:number):void
	{	
		
	}


	public dispose() 
    {	
		this._isEnd = false;

		this._type = 0;
		this._curRound = 0;
		this._fuction = null;
		this._obj = null;
		this._beginAnimNode = null;
		this._curIdex = 0;
		this._curRoundFirst = 0;
		this._isPause = false;
		this._skipBtn = null;
        this._skip = false;
        
        this._winFlag = 1;

		super.dispose();
	}
}