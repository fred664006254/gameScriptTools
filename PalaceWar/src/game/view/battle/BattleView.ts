/**
 * 小兵战基类
 * author shaoliang
 * date 2017/9/14
 * @class BattleView
 */

class BattleView extends CommonView
{
	public constructor() {
		super();
	}

	protected _leftSoldiers:Soldier[] = [];
	protected _rightSoldiers:Soldier[] = [];
	
	/**
	 *  当前死亡数量
	 */
	protected _curLost:number[] = [0,0];

	/**
	 *  每条线上相遇点的坐标
	 */
	protected _meetPointTab:egret.Point[] = [];

	//固定数据
	private _preLineNum:number = 8;
	private _maxLineNum:number = 5;
	private _unitNunberTab:number[] = [30000,500000,250000];

	
	/**
	 * 原始数量
	 */
	protected _totalNum:number[] = [];
	/**
	 * 原始总数量
	 */
	protected _totalOldNum:number[] = [];
	/**
	 * 原始损伤数量
	 */
	protected _lostNum:number[] = [];

	/**
	 * 显示的数量
	 */
	private _showCount:number[] = [];

	/**
	 * 死亡士兵数量
	 */
	protected _lostSoldier:number[] = [];

	/**
	 * 平均数
	 */
	private _averageNum:number[] = [];

	/**
	 * 死亡顺序
	 */
	protected _lostOrder:number[] = [];
	/**
	 * 当前死亡哪方  负数=左边   正数=右边 ， 0=需要获取下个
	 */
	private _curOrder:number = 0;


	protected _isAttackWin:boolean;
	protected _gameBtn:BaseBitmap;
	protected _battleInfoTab:BattleInfo[] = [];

	private _luanziClip:CustomMovieClip;
	private _isLuanzPlay:boolean = false;
	//震动开始时间
	private _shakeStTime:number = 0;
	private _isShakeing:boolean = false;
	private _battleBg:BaseDisplayObjectContainer;
	protected _leftSoCon:BaseDisplayObjectContainer;
	protected _rightSoCon:BaseDisplayObjectContainer;
	

	private _callbackF:Function = null;
	private _obj:any = null;

	protected _lastDeathTime:number=0;
	protected _deathRate:number = 0;

	protected _rewards:string = null;
	protected _skipBtn:BaseButton = undefined;

	protected _isGameEnd:boolean = false;

	protected _bgPosY:number = 0;

	// 背景图名称
	protected getBgName():string
	{
		return null;
	}

	protected resetConfig():void
	{
	
	}

	protected battleBgName():string
	{
		return "battlebg";
	}

	protected init():void
	{	
		super.init();

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		this._battleBg = new BaseDisplayObjectContainer();
		this.addChildAt(this._battleBg,1);

		let battleBg:BaseBitmap =BaseBitmap.create(this.battleBgName());
		battleBg.scaleX = (battleBg.width+30)/battleBg.width;
		battleBg.scaleY = (battleBg.height+30)/battleBg.height;
		battleBg.x = -10;
		battleBg.y = -10;
		this._battleBg.addChild(battleBg);

		if (GameConfig.stageHeigth < 1060) {
			this._battleBg.y -= (1060 - GameConfig.stageHeigth);
		}
		this._bgPosY = this._battleBg.y;
		
		this.resetConfig();

		this._leftSoCon = new BaseDisplayObjectContainer();
		this._rightSoCon = new BaseDisplayObjectContainer();
		this._battleBg.addChild(this._leftSoCon);
		this._battleBg.addChild(this._rightSoCon);

		this.calculateSoldierNumber();
		this.initRightSoldiers();
		this.initLeftSoldiers();
		this.calculateMeetPoint();


		// 开始游戏
		this._gameBtn = BaseBitmap.create(ButtonConst.BATTLE_START_BTN_1);
		this._gameBtn.addTouchTap(this.btnClick,this)
		this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 + 20);
		this.addChild(this._gameBtn);
		this._gameBtn.anchorOffsetX = this._gameBtn.width/2;
		this._gameBtn.anchorOffsetY = this._gameBtn.height/2;
		this.btnAnim();


	}

	protected subclassInit():void
	{	
	}

	private btnAnim():void
	{
		if (this._gameBtn) {
			egret.Tween.get(this._gameBtn).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600).call(this.btnAnim,this);
		}
	}

	private clipAnim():void
	{
		if (this._luanziClip) {
			egret.Tween.get(this._luanziClip).to({scaleX:2.5,scaleY:2.5}, 500).to({scaleX:2,scaleY:2}, 500).call(this.clipAnim,this);
		}
	}

	protected btnClick():void
	{	
	}



	protected initLeftSoldiers():void 
	{	
		var nameTab = this.getSoldierKinds();
		let totalLine:number = Math.floor((this._showCount[0]-1)/this._preLineNum);
		for (var i:number = 1; i <= this._showCount[0]; i++)
		{	
			 var h:number = (i-1) % this._preLineNum + 1;
			 var v:number = Math.floor((i-1)/this._preLineNum);

			 var oneMan:Soldier = new Soldier();
			 oneMan.init(nameTab[i-1]);
			 this._leftSoldiers.push(oneMan);
			 oneMan.speed = 250 + App.MathUtil.getRandom(0,50);
			 oneMan.area = SoldierArea.LEFT;
			
			 //斜着跑
			//  oneMan.x = 10 + h * 50 - v * 50;
			//  oneMan.y = 530 + h * 30  + v * 30;
			//横着跑
			 oneMan.myIndex = i;

			 if (v == totalLine) { //最后一列
				 let gapNum:number = this._preLineNum - (this._showCount[0] - this._preLineNum*v);
				 h = Math.floor(gapNum/2) + h;
			 }
			 oneMan.endlong = v+1;
			 oneMan.lineNumber = h;
			 oneMan.x = 15 - v * 50 -   (h-1) * 10;
			 oneMan.y = GameConfig.stageHeigth/2 - 60 + (h-1) * 45;
			 oneMan.standBy();
		}

		for (let i:number = totalLine+1; i>=1; i--)
		{	
			for (let k in this._leftSoldiers)
			{
				let v:Soldier = this._leftSoldiers[k];
				if (v.endlong == i) {
					this._leftSoCon.addChild(v);
				}
			}
		}		 

	}

	protected initRightSoldiers():void 
	{
		let totalLine:number = Math.floor((this._showCount[1]-1)/this._preLineNum);
		for (var i:number = 1; i <= this._showCount[1]; i++)
		{	
			 var h:number = (i-1) % this._preLineNum + 1;
			 var v:number = Math.floor((i-1)/this._preLineNum);

			 var oneMan:Soldier = new Soldier();
			 oneMan.init("npc1");
			 this._rightSoldiers.push(oneMan);
			 oneMan.speed = 200 + App.MathUtil.getRandom(0,50);
			 oneMan.myIndex = i;
			
			 //斜着跑
			//  oneMan.x = 350 + h * 50 + v * 50;
			//  oneMan.y = 350 + h * 30 - v * 30;
			//横着跑
			if (v == totalLine) { //最后一列
				 let gapNum:number = this._preLineNum - (this._showCount[1] - this._preLineNum*v);
				 h = Math.floor(gapNum/2) + h;
			 }
			 oneMan.lineNumber = h;
			 oneMan.endlong = v+1;
			 oneMan.area = SoldierArea.RIGHT;
			 oneMan.x = 310 + v * 50 +  (h-1) * 10;
			 oneMan.y = GameConfig.stageHeigth/2 - 60  + (h-1) * 45;
			 oneMan.standBy();
			 //横跑
			 this.addChild(oneMan);

		}

		for (let i:number = totalLine+1; i>=1; i--)
		{	
			for (let k in this._rightSoldiers)
			{
				let v:Soldier = this._rightSoldiers[k];
				if (v.endlong == i) {
					this._rightSoCon.addChild(v);
				}
			}
		}	

		// 斜跑时用
		// for (var i:number = this._showCount[1]-1; i>=0 ; i--) {
		// 	var oneMan:Soldier = this._rightSoldiers[i];
		// 	this.addChild(oneMan);
		// }
	}

	protected calculateMeetPoint():void
	{
		//计算所有相遇点的坐标
		for (var i:number = 0; i < this._preLineNum; i++)
		{
			var l:Soldier = this.getSoldierWithLineNumber(i+1,0);
			var r:Soldier =  this.getSoldierWithLineNumber(i+1,1);
			if (l && r) {
				var d:number = App.MathUtil.getDistance(egret.Point.create(l.x,l.y),egret.Point.create(r.x,r.y));
				var dl:number = d / ( l.speed + r.speed ) * l.speed;

				//写着跑
				// var mx = Math.sqrt(dl * dl / 34 * 25);
				// var my = Math.sqrt(dl * dl / 34 * 9);
				//横着跑
				let mx = dl;
				let my = 0;  // ((this._preLineNum - 1) / 2 - i) * 20 ;
				this._meetPointTab.push(egret.Point.create(l.x + mx, l.y + my));
			}
			else {
				this._meetPointTab.push(egret.Point.create(GameConfig.stageWidth/2, GameConfig.stageHeigth/2 - 60  + i * 45));
			}
		}
	}

	private getSoldierWithLineNumber(n:number,a:number):Soldier
	{
		var s:Soldier = null;

		for (var i:number = 0; i < this._preLineNum; i++)
		{
			if (a==0) {
				if ( this._leftSoldiers[i] && this._leftSoldiers[i].lineNumber == n) {
					s = this._leftSoldiers[i];
					break;
				}
			}
			else if (a==1) {
				if ( this._rightSoldiers[i] && this._rightSoldiers[i].lineNumber == n) {
					s = this._rightSoldiers[i];
					break;
				}
			}
		}

		return s;
	}

	protected gameBegin():void
	{	
		this._isGameEnd = false;
		for (var k in this._leftSoldiers)
		{
			var v = this._leftSoldiers[k];
			this.gotoFight(v);
		}

		for (var k in this._rightSoldiers)
		{
			var v = this._rightSoldiers[k];
			this.gotoFight(v);
		}
	}

	/**
	 * @param sa 攻击者方位
	 * @param index 被攻击者的 index
	 */
	private getBeattacker(sa:SoldierArea,index:number):Soldier
	{	
		if (sa == SoldierArea.LEFT) {
			return  this._rightSoldiers[index-1];
		}
		else {
			return  this._leftSoldiers[index-1];
		}
	}

	private gotoFight(s:Soldier):void
	{

		var targetSoldierIndex:number = this.getTagetEnemy(s);

		if (targetSoldierIndex == 0) {
			s.standBy();
			return;
		}
		var t:Soldier = this.getBeattacker(s.area,targetSoldierIndex)
		
		s.lineNumber = t.lineNumber;
		s.targetIndex = targetSoldierIndex;
		t.attackerTab.push(s.myIndex);


		if (s.lineNumber == s.curMeetIndex)
		{	
			s.attack(this.attackCallBack,this);
			return;
		}
		s.curMeetIndex=0;

		var targetPonint:egret.Point = this._meetPointTab[s.lineNumber -1];
		
		var realPoint:egret.Point = egret.Point.create(targetPonint.x,targetPonint.y);


		//随机坐标
		if (s.x >  realPoint.x) {
			realPoint.x += App.MathUtil.getRandom(30,45);
		}
		else {
			realPoint.x -= App.MathUtil.getRandom(30,45);
		}

		realPoint.y += (App.MathUtil.getRandom(0,30) - 15);
		// if (s.y >  realPoint.y) {
		// 	realPoint.y += App.MathUtil.getRandom(10,20);
		// }
		// else {
		// 	realPoint.y -= App.MathUtil.getRandom(10,20);
		// }

		s.run(realPoint,this.attackCallBack,this);
	}



	private getTagetEnemy(s:Soldier):number 
	{	
		var lessIndex:number = 0;
		var lessDis:number ;
		if (s.area == SoldierArea.LEFT) {
			
			for (var k in this._rightSoldiers)
			{	
				var v = this._rightSoldiers[k];

				if (v.myStatus == SoldierStatus.GODIE) {
					continue;
				}

				if (v.lineNumber == s.lineNumber) {
					lessIndex = v.myIndex;
					break;
				}

				var tempDis:number = App.MathUtil.getDistance(egret.Point.create(s.x,s.y),egret.Point.create(v.x,v.y));
				if (!lessDis || tempDis < lessDis) {
					lessDis = tempDis;
					lessIndex = v.myIndex;
				}	
			} 
		}
		else {
			for (var k in this._leftSoldiers)
			{	
				var v = this._leftSoldiers[k];

				if (v.myStatus == SoldierStatus.GODIE) {
					continue;
				}

				if (v.lineNumber == s.lineNumber) {
					lessIndex = v.myIndex;
					break;
				}

				var tempDis = App.MathUtil.getDistance(egret.Point.create(s.x,s.y),egret.Point.create(v.x,v.y));
				if (!lessDis || tempDis < lessDis) {
					lessDis = tempDis;
					lessIndex = v.myIndex;
				}	
			} 
		}

		return lessIndex;
	}

	private attackCallBack(s:Soldier):void 
	{	
		if (this._isLuanzPlay == false) {
			this.showLuanziClip();
		}

		if (this._lastDeathTime > egret.getTimer() ) {
			s.attack(this.attackCallBack,this);
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK2);
		}
		else {

			var targetSoldier:Soldier = this.getBeattacker(s.area,s.targetIndex);
			if (this._curOrder == 0) {
				this._curOrder = this._lostOrder[0];
				this._lostOrder.splice(0,1);
			}

			if ( targetSoldier.area == SoldierArea.LEFT && this._curOrder < 0 ) {
				this._curOrder++;
				this.killedTarget(s);
				SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK1);
			}
			else if ( targetSoldier.area == SoldierArea.RIGHT && this._curOrder > 0 ) {
				this._curOrder--;
				this.killedTarget(s);
				SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK1);
			}
			else {
				s.attack(this.attackCallBack,this);
				SoundManager.playEffect(SoundConst.EFFECT_BATTLE_ATTACK2);
				this.checkEnd();
			}
		}

		

	}

	private killedTarget(s:Soldier):void
	{

		var t:Soldier = this.getBeattacker(s.area,s.targetIndex);

		this._curLost[t.area]++;
		
		t.goDie();

		for (var k in t.attackerTab) {
			var v:number = t.attackerTab[k];
			var a:Soldier = this.getBeattacker(t.area,v);
			if (a.myStatus != SoldierStatus.GODIE) {
				this.gotoFight(a);
			}
		}

		let curResidue:number = this._totalNum[t.area] - this._curLost[t.area] * this._averageNum[t.area];
		if (curResidue < 0) {
			curResidue = 0;
		}
		this._battleInfoTab[t.area].curNumber = curResidue;

		this.checkEnd();
	}

	private checkEnd():void
	{	
		if (this._curLost[0] == this._lostSoldier[0] && this._curLost[1] == this._lostSoldier[1]) 
		{
			TimerManager.doTimer(300,1,this.gameEnd,this);
			return ;
		}
	}

	protected calculateSoldierNumber():void
	{
				//最大的小人总数
		var maxNumber = this._preLineNum * this._maxLineNum;

		//计算显示数量，一个兵代表数量，
		for (var i:number = 0; i<=1; i++) 
		{
			if (i==0  &&  this._totalOldNum[0] <= 0) {
				this._showCount[i]=0;
				this._averageNum[i]=0;
				continue;
			}

			this._showCount[i] = 3 + Math.ceil(this._totalNum[i] / this._unitNunberTab[0]) - 1;
			this._showCount[i] = this._showCount[i] > maxNumber ? maxNumber : this._showCount[i];

			this._averageNum[i] = Math.ceil( this._totalNum[i] / this._showCount[i] );

		}
	}

	protected calculateLostSoldierNumber():void
	{
		//计算，死亡数量
		for (var i:number = 0; i<=1; i++) 
		{
			if (this._totalNum[i] <= this._lostNum[i]) {
				this._lostSoldier[i] = this._showCount[i];
			}
			else {
				this._lostSoldier[i] = Math.floor( this._lostNum[i] / this._averageNum[i]);
			}
		}
	}


	private getSoldierKinds():string[]
	{
		//士兵图片数组
		var maxLevel:number = 2;
		var maxNum:number = 0;
		var tempTotalNum = this._totalNum[0] + this._unitNunberTab[0] * 2;
		if ( tempTotalNum >= (this._unitNunberTab[1] * (this._showCount[0] - 1) +  this._unitNunberTab[2]) ) {
			maxLevel = 3;
			maxNum = Math.floor((tempTotalNum - this._unitNunberTab[1] * this._showCount[0]) / this._unitNunberTab[2] );
		}
		else if ( tempTotalNum >= (this._unitNunberTab[0] * (this._showCount[0] - 1) +  this._unitNunberTab[1]) ) {
			maxLevel = 2;
			maxNum = Math.floor((tempTotalNum - this._unitNunberTab[0] * this._showCount[0]) / this._unitNunberTab[1] );
		}

		var nameTab:string[] = [];
		for (var i:number = 1; i<= this._showCount[0]; i++) {
			
			var level ;
			if ( maxNum >= i  ) {
				level = maxLevel - 1;
			}
			else {
				level = maxLevel;
			}
			//test code
			level=1;
			nameTab.push( "hero"+level );
		} 
		return nameTab;
	}

	//计算死亡顺序
	protected calculateLostTab():void
	{
		 
		 //最大回合数 可调
		 var maxRound:number = 10;
		 //平均每回合死亡数量 向上取整
		 var lostAverageTab:number[] = [];
		 
		 for (var i:number = 0; i<=1; i++) 
		 {
			 lostAverageTab[i] = Math.ceil( this._lostSoldier[i] / maxRound );
		 }

		 var leftOrder:number[] = [];

		 //临时的 
		 var tempLeftLost:number = this._lostSoldier[0];
		 var tempRightLost:number = this._lostSoldier[1];
		 // 两边的死亡数组 循环里可以加随机
		 while (tempLeftLost > 0) {

			 var value:number = tempLeftLost >=  lostAverageTab[0] ? lostAverageTab[0] : tempLeftLost;
			 value *= -1;
			 leftOrder.push(value);
			 tempLeftLost += value;
		 }
		 while (tempRightLost > 0) {

			 var value:number = tempRightLost >=  lostAverageTab[1] ? lostAverageTab[1] : tempRightLost;
			 this._lostOrder.push(value);
			 tempRightLost -= value;
		 }
	
		// 把左边的数组随机插入
		let ll:number = leftOrder.length -1;
		 if (leftOrder.length > 0) {

			 for (var i:number = 0; i < leftOrder.length ; i++ )
			 {	
				var tempValue:number = leftOrder[i];
				if (this._isAttackWin) {
					var randIdx:number = App.MathUtil.getRandom(0,(this._lostOrder.length-1));
					this._lostOrder.splice(randIdx,0,tempValue);
				}
				else {

					var randIdx:number = App.MathUtil.getRandom(0,this._lostOrder.length);
					if (ll == i) {
						  this._lostOrder.push(tempValue);
						    //  randIdx = this._lostOrder.length;
					}
					else {
						this._lostOrder.splice(randIdx,0,tempValue);
					}
					
				}
			 }
		 }
	}

	protected skipBattle():void
	{
	}

	protected gameEnd(isSkip:boolean = false):void
	{	
		if (this._isGameEnd)
		{
			return;
		}

		this._isGameEnd = true;

		if (this._skipBtn) {
			this._skipBtn.visible = false;
		}

		for (var k in this._leftSoldiers)
		{
			var v = this._leftSoldiers[k];
			if (v.myStatus != SoldierStatus.GODIE) {
				v.standBy();
			}
		}

		for (var k in this._rightSoldiers)
		{
			var v = this._rightSoldiers[k];
			if (v.myStatus != SoldierStatus.GODIE) {
				v.standBy();
			}
		}

		this._battleInfoTab[0].curNumber = Api.playerVoApi.getSoldier();
		this._battleInfoTab[1].curNumber = this._totalNum[1] - this._lostNum[1];

		if (this.closeBtn) {
			this.closeBtn.setEnable(true);
		}
		
		this.hiddenLuanziClip();

		SoundManager.stopEffect(SoundConst.EFFECT_BATTLE);

		if (isSkip == true) {
			this.showResultView();
		}
		else {
			TimerManager.doTimer(500,1,this.showResultView,this);
		}
		

	}

	protected showResultView():void
	{
	}

	protected endCallBack():void
	{	
	}
	
	private showLuanziClip():void 
	{	
		if (!this._luanziClip) {

			let tempBitmap:BaseBitmap = BaseBitmap.create("luanz_1");
			this._luanziClip = ComponentManager.getCustomMovieClip("luanz_",14,100);
			this._luanziClip.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2  + tempBitmap.height/2 + 50);
			this._luanziClip.anchorOffsetX = tempBitmap.width/2;
			this._luanziClip.anchorOffsetY = tempBitmap.height/2;
			// this._luanziClip.x = GameConfig.stageWidth/2 - tempBitmap.width;
			// this._luanziClip.y = GameConfig.stageHeigth/2 - tempBitmap.height/2 + 50;
			BaseBitmap.release(tempBitmap);
			this._luanziClip.setScale(2);
		}
		this.addChild(this._luanziClip);
		this._luanziClip.playWithTime(0);
		this._isLuanzPlay = true;
		this._luanziClip.alpha = 0.9;
		this.clipAnim();

		 egret.startTick(this.shakeScreen,this);
	}

	private disappear():void 
	{	
		if (this._luanziClip) {
			this._luanziClip.stop();
			egret.Tween.removeTweens(this._luanziClip);
			this.removeChild(this._luanziClip);
			this._luanziClip=null;
		}
		this._isLuanzPlay = false;
	}

	private hiddenLuanziClip():void
	{	
		if (!this._luanziClip) {
			return;
		}

		egret.stopTick(this.shakeScreen,this);
		egret.Tween.removeTweens(this._luanziClip);
		let picArray:string[] = [];
		for (let i:number=13; i<=16; i++)
		{
			picArray.push("luanz_"+i);
		}
		this._luanziClip.stop();
		this._luanziClip.goToAndPlay(0);
		this._luanziClip.frameImages = picArray;
		this._luanziClip.playFrameRate = 150;
		this._luanziClip.playWithTime(1);

		egret.Tween.get(this._luanziClip).to({alpha:0,scale: 4},800).call(this.disappear,this);
	}

	private shakeScreen(timeStamp:number):boolean
	{
		var spaceTime:number = 100;
		if (timeStamp < this._shakeStTime)
        {   
			 if (this._isShakeing==true && (timeStamp - this._shakeStTime) > spaceTime/5){
                this._battleBg.x = -10;
                this._battleBg.y = this._bgPosY;
                this._isShakeing=false;
            }
        }
		else {
			this._shakeStTime =  timeStamp + 100;
			this._isShakeing=true;
            this._battleBg.x =-5-App.MathUtil.getRandom(0,10);
            this._battleBg.y =this._bgPosY+5-App.MathUtil.getRandom(0,10);
		}
		 return false;
	}	

	protected initView():void
	{
		
	}

	protected resetGameAfterWin():void
	{
	}

	public hide(isGuid?:boolean):void
	{	
		if (Api.rookieVoApi.isInGuiding == true && isGuid == null) {
			return;
		}

		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
		Api.rookieVoApi.checkNextStep();
	}

	public dispose():void
	{
		if (this.closeBtn) {
			this.closeBtn.setEnable(true);
		}

		egret.stopTick(this.shakeScreen,this);
		TimerManager.remove(this.gameEnd,this);
		TimerManager.remove(this.showResultView,this);

		for (var k1 in this._leftSoldiers) {
            var v1 = this._leftSoldiers[k1];
			egret.Tween.removeTweens(v1);
            v1.dispose();
        }
        for (var k2 in this._rightSoldiers) {
            var v2 = this._rightSoldiers[k2];
			egret.Tween.removeTweens(v2);
            v2.dispose();
        }
		this._leftSoCon = null;
		this._rightSoCon = null;
		this._leftSoldiers.length = 0;
		this._rightSoldiers.length = 0;
		this._curLost.length = 0;
		this._curLost = [0,0];
		this._meetPointTab.length = 0;
		this._showCount.length = 0;
		egret.Tween.removeTweens(this._gameBtn);
		this._gameBtn.dispose();
		this._gameBtn = null;
		this._averageNum.length = 0;
		this._lostOrder.length = 0;
		this._totalOldNum.length = 0;
		this._totalNum.length = 0;
		if (this._luanziClip) {
			this._luanziClip.stop();
			egret.Tween.removeTweens(this._luanziClip);
			this._luanziClip.dispose();
		}
		this._luanziClip = null;
		this._isLuanzPlay = false;
		this._shakeStTime = 0;
		this._isShakeing = false;
		this._battleBg=null;
		this._curOrder = 0;
		 for (var k3 in this._battleInfoTab) {
            var v3 = this._battleInfoTab[k3];
            v3.dispose();
        }
		this._battleInfoTab.length = 0;
		
		
		
		this._callbackF = null;
		this._obj = null;
		this._isAttackWin = null;
		this._lastDeathTime = 0;
		this._deathRate = 0;
		this._rewards = null;
		if (this._skipBtn) {
			this._skipBtn.dispose();
		}
		this._skipBtn = undefined;
		this._isGameEnd =false;

		super.dispose();
	}
}