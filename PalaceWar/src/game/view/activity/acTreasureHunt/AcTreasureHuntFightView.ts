
class AcTreasureHuntFightView extends BaseBattleView
{
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let tempArray:string[] = super.getResourceList()

		return tempArray.concat([
            `treasurebg-${this.param.data.code}`,'atkrace_battle_info','progress8','progress7_bg'
		]);
    }

	protected getBgName():string
	{
		return `treasurebg-${this.param.data.code}`;
    }
    
    // 标题背景名称
	protected initTitle():void
	{				
		return null;
	}

	// 标题背景名称
	protected getTitleStr():string
	{				
		return null;
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.y = (GameConfig.stageHeigth - 1136)/2;
		}
	}

	protected getCloseBtnName():string{
		return null;
	}


	protected initView():void{	
		let view = this;

        let upHeroPic:string = view.param.data.npc;
        let upInfo = [
            [view.param.data.npcName,TextFieldConst.COLOR_WHITE],
        ];
		this.setUpHero(upHeroPic,upInfo,2);
		this.setTopProgress(1000000, 1000000 , GameConfig.stageWidth, 2);
		this._topProgress.y = 0;

		this._upHero.setScale(0.8);
		this._upHero.x = GameConfig.stageWidth/2 - this._upHero.width * this._upHero.scaleX / 2;

		let downHeroPic:string = null;
        let downInfo:any = null;
        let attrV:number[] = Api.practiceVoApi.geAbilityValues();
		let totalV = String(attrV[0]+attrV[1]+attrV[2]+attrV[3]);
        downInfo = {
            level : Api.playerVoApi.getPlayerLevel(),
            title : Api.playerVoApi.getTitleid(),
            pic : Api.playerVoApi.getPlayePicId(),
            quality : totalV,
            name : Api.playerVoApi.getPlayerName(),
            plevel : Api.playerVoApi.getPlayerLevel(),
        };
		this.setDownHero(null,downInfo,4);
		this._downHero.setScale(1);
		this._downHero.x = GameConfig.stageWidth/2 - this._downHero.width * this._downHero.scaleX / 2+20;
		this._downHero.y = GameConfig.stageHeigth - 350;//- this.getTitleButtomY();

		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
        this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);
        
        egret.Tween.get(this._heroArray).wait(1500).call(()=>{
           view.gameBegin();
        },view);
    }


	private gameBegin():void{
		this.attackHandle(1,1000000);
	}

	protected attackHandle(area:number,damage:number,isCrit?:boolean):void
	{
		if (this._isMoving == true) {
			return;
		}
		this._isMoving = true;
		this._heroArray.length = 0;
		this._damage = damage;
		this._area = area;
		let offsetY:number; 
		let moveY:number;
		let scaleTo:number = 0.75;
		let offsetX:number;
		if (area == 1) {
			this._heroArray=[this._downHero,this._upHero];
			offsetY = 50;
			moveY = this._upHero.y+100;
			offsetX= offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}
		else {
			this._heroArray=[this._upHero,this._downHero];
			offsetY = -50;
			moveY = this._downHero.y-100 + this._downHero.height*(1-scaleTo);
			offsetX = offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}

		if (this.container.getChildIndex(this._heroArray[0])< this.container.getChildIndex(this._heroArray[1])) {
			this.container.swapChildren(this._heroArray[0],this._heroArray[1]);
		}

		let critTime:number = 0;
		let moveTime1:number = 60;
		let moveTime2:number = 260;
		
		let moveTo:egret.Point = egret.Point.create( this._heroArray[1].x + (1-scaleTo)*this._heroArray[0].width/2 ,moveY);

		let scaleBig:number = 1.06;
		let moveFirst:egret.Point = egret.Point.create( this._heroArray[0].x - (scaleBig-1)*this._heroArray[0].width/2 ,this._heroArray[0].y - (scaleBig-1)*this._heroArray[0].height/2);
		//hero
		egret.Tween.get(this._heroArray[0]).wait(critTime).
		to({y : this._heroArray[0].y + (area == 1 ? 20 : -20), },300).//后移
		//to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
		to({y:moveTo.y}, moveTime1).
		//to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
		to({y:this._heroArray[0].y},moveTime2);
		TimerManager.doTimer(critTime + 300 + moveTime1,1,this.showBeAttackAnim,this);
	}

	protected atkEndCallback():void{	
		this._upHero.setScale(0.8);
		this._upHero.x = GameConfig.stageWidth/2 - this._upHero.width * this._upHero.scaleX / 2;
		this._downHero.x = GameConfig.stageWidth/2 - this._downHero.width * this._downHero.scaleX / 2+20;
        this._downHero.y = GameConfig.stageHeigth - 350;//- this.getTitleButtomY();
        this.hide();
	}

	public hide():void{
		this.param.data.callBack.apply(this.param.data.obj);
		super.hide();
	}

	public dispose():void
	{
		let view = this;
		super.dispose();
	}
}