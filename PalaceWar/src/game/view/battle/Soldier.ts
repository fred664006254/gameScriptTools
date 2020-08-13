/**
 * author shaoliang
 * date 2017/9/15
 * @class Soldier
 */

enum SoldierArea {
    LEFT = 0,
    RIGHT = 1,
} 

enum SoldierStatus {
    STANDBY = 1,
    RUNING ,
	ATTACKING ,
	GODIE ,
} 

class Soldier extends BaseDisplayObjectContainer 
{

	private _myClip:CustomMovieClip;
	private _namePre:string;
	private _runFrames:string[] = [];
	private _deathFrames:string[] = [];
	private _standByFrames:string[] = [];
	private _attackFrames:string[] = []; 
	/**
	 * 帧频 毫秒
	 */
	private _frameRate = 70; 

	private _endFunc:Function=null;
    private _endObj:any;

	/**
	 * 区域 左下0，右上1
	 */
	public area:SoldierArea;
	public myIndex:number;
	public myStatus:SoldierStatus;
	/**
	 * 每秒移动距离 像素
	 */
	public speed:number; 
	/**
	 * 在第几条横线上
	 */
	public lineNumber:number; 
	/**
	 * 在第几条纵线上
	 */
	public endlong:number;

	/**
	 * 我的攻击目标
	 */
	public targetIndex:number = null;
	/**
	 * 攻我的人们
	 */
	public attackerTab:number[] = [];
	/**
	 * 已经到达第几个相遇点
	 */
	public curMeetIndex:number;

	private _slowDownValue:number = 0;

	public constructor() 
	{
		super();
	}

	/**
	 * 初始化
	 * @param namePer 名称前缀
	 */
	public init(namePer:string):void
	{
		
		this._namePre = namePer;

		this._standByFrames = [this._namePre+"_standby"];
		this._deathFrames= [this._namePre+"_death"];
		this._myClip = ComponentManager.getCustomMovieClip();
		this._myClip.frameRate = this._frameRate;
		this._myClip.frameImages = this._standByFrames;
		this.addChild(this._myClip);
		this._myClip.playWithTime(1);

		var randFrame:number = App.MathUtil.getRandom(1,6);
		for(var i:number=randFrame;i<=6;i++)
		{
			this._runFrames.push(this._namePre+"_move_"+i);
		}
		for(var i:number=1;i<randFrame;i++)
		{
			this._runFrames.push(this._namePre+"_move_"+i);
		}
		
		for(var i:number=1;i<=3;i++)
		{
			this._attackFrames.push(this._namePre+"_attack_"+i);
		}
	}

	private reset():void
	{
		if (this._myClip.isPlaying == true)
		{
			this._myClip.stop();
		}
		this._myClip.setEndCallBack(null,null);
		egret.Tween.removeTweens(this);
	}

	/**
	 * 跑向哪里
	 * @param p:坐标
	 */
	public run(p:egret.Point,f:Function,o:any):void 
	{	
		this.reset();
		
		this._myClip.frameImages = this._runFrames;
		this._myClip.playFrameRate = this._frameRate;
		this._myClip.playWithTime(0);
		this._myClip.name = "soldier_"+this.area+"_"+this.myIndex;

		this.myStatus = SoldierStatus.RUNING;

		var moveDis:number = App.MathUtil.getDistance(p,egret.Point.create(this.x,this.y));
		var moveTime:number = moveDis / this.speed * 1000 + 200;

		egret.Tween.get(this).to({x:p.x,y:p.y},moveTime ).call(this.attack,this,[f,o]);

	}

	private playAttackEnd():void
	{
		if (this._endFunc && this._endObj) {
			this._endFunc.apply(this._endObj,[this]);
		}
	}

	public attack(f:Function,o:any):void
	{
		this.reset();
		
		this._myClip.frameImages = this._attackFrames;
		this._myClip.playFrameRate = this._frameRate;
		this._myClip.goToAndPlay(0);

		this.curMeetIndex = this.lineNumber;

		this._endFunc = f;
		this._endObj = o;
		this._myClip.playWithTime(1);
		this._myClip.setEndCallBack(this.playAttackEnd,this);
		
		this.myStatus = SoldierStatus.ATTACKING;

	}

	public standBy():void
	{
		this.reset();
		this._myClip.frameImages = [this._namePre+"_standby"];
		this._myClip.playFrameRate = this._frameRate;
		this._myClip.goToAndPlay(0);
		this._myClip.playWithTime(1);

		this.myStatus = SoldierStatus.STANDBY;
	}

	public goDie():void
	{	
		this.reset();
		this._myClip.frameImages = this._deathFrames;
		this._myClip.playFrameRate = this._frameRate;

		if (this.area == SoldierArea.LEFT ) {
			this.x -= 20;
		}	
		else {
			this.x += 20;
		}

		this._myClip.goToAndPlay(0);
		this._myClip.setEndCallBack(this.disappear,this);
		this._myClip.playWithTime(1);

		this.myStatus = SoldierStatus.GODIE;

		
	}

	//
	private disappear():void
	{	

		this._slowDownValue = 1.5;
		TimerManager.doTimer(30, 15, this.slowDownMove, this);

		egret.Tween.get(this._myClip).wait(500).to({alpha:0},1000);
	}

	private slowDownMove():void
	{	
		if (this._slowDownValue > 0) {
			if (this.area == SoldierArea.LEFT) {
				this._myClip.x -= this._slowDownValue;
			} 
			else {
				this._myClip.x += this._slowDownValue;
			}
		}
		this._slowDownValue-=0.1;		
	}

	public dispose():void
	{	
		this.reset();
		egret.Tween.removeTweens(this._myClip);
		this._myClip.dispose();
		this._myClip = null;
		this._namePre = null;
		this._runFrames.length = 0;
		this._deathFrames.length = 0;
		this._standByFrames.length = 0;
		this._attackFrames.length = 0;
		this._frameRate = null;
		this.myStatus = null;
		this.area = null;
		this.targetIndex = null;
		this.attackerTab.length = 0;
		this.myIndex = null;
		this._endFunc = null;
		this._endObj = null;
		this.curMeetIndex = null;
		this._slowDownValue=0;

		super.dispose();
	}
}