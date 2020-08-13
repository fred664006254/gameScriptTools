class BaseLoadDragonBones extends BaseDisplayObjectContainer
{
	private _dragonBonesName:string;
	private _dragonBones:dragonBones.EgretArmatureDisplay;
	private _groupName:string;
	private _isLoaded:boolean=false;
	private _isInit:boolean=false;
	private _isStop:boolean=false;
	private static cacheDic:Object={};
	private _playTimes:number = 0;
	private _eventDeal : any = {};
	private addEvent = '';
	private _loadCompleteCallData:{call:Function,callObj:any}=null;

	public constructor(dragonBonesName:string,playTimes?:number,idle:string="idle",loadCompleteCallBack?:any,loadCompleteCallBackThisObj?:any)
	{
		super();
		this._dragonBonesName=dragonBonesName;
		if(playTimes)
		{
			this._playTimes = playTimes;
		}else{
			this._playTimes = 0;
		}
		this.idle = idle;
		this.addEvent = '';
		if(loadCompleteCallBack)
		{
			this._loadCompleteCallData={call:loadCompleteCallBack,callObj:loadCompleteCallBackThisObj};
		}
		this.init();
	}

	private init():void
	{
		this._isInit=true;
		this.loadRes();
	}

	private getBonesResArr():string[]
	{
		return [this._dragonBonesName+"_ske",this._dragonBonesName+"_tex_json",this._dragonBonesName+"_tex_png"];
	}

	private loadRes():void
	{
		this._groupName=ResourceManager.loadResources(this.getBonesResArr(),null,this.dailyLoadComplete,null,this);
	}

	private idle = 'idle';
	public setIdle(str){
		this.idle = str;
	}

	private dailyLoadComplete():void
	{
		egret.callLater(this.loadComplete,this);
	}

	private loadComplete():void
	{
		if(this._isInit)
		{
			this._isLoaded=true;
			this._dragonBones=App.DragonBonesUtil.getDragonBones(this._dragonBonesName);
			if(this._dragonBones==null)
			{
				this._isLoaded=false;
				return;
			}
			if(!BaseLoadDragonBones.cacheDic[this._dragonBonesName])
			{
				BaseLoadDragonBones.cacheDic[this._dragonBonesName]=1;
			}
			else
			{
				BaseLoadDragonBones.cacheDic[this._dragonBonesName]++;
			}
			this.addChild(this._dragonBones);
			if(this.addEvent && this.addEvent != ''){
				for(let i in this._eventDeal){
					let unit = this._eventDeal[i];
					if(unit && this._dragonBones){
						this._dragonBones.addEventListener(i, unit.func, unit.obj);
					}
				}
				this.addEvent = '';
			}
			if(this.anchor){
				this._dragonBones.anchorOffsetX = this.anchorInfo.x;
        		this._dragonBones.anchorOffsetY =  this.anchorInfo.y;
			}
			if(this._isStop==false)
			{
				this._dragonBones.animation.play(this.idle,this._playTimes);
			}
			if(this._loadCompleteCallData)
			{
				this._loadCompleteCallData.call.call(this._loadCompleteCallData.callObj);
			}
		}
		else
		{
			if(this._groupName)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=null;
			}
		}
	}

	/**
	 * 停止播放骨骼动画
	 */
	public stop():void
	{
		if(this._isInit)
		{
			this._isStop=true;
			if(this._dragonBones&&this._dragonBones.animation.isPlaying)
			{
				this._dragonBones.animation.stop(this.idle);
			}
		}
	}

	/**
	 * 恢复播放骨骼动画
	 */
	public resume():void
	{
		if(this._isInit)
		{
			this._isStop=false;
			if(this._dragonBones&&!this._dragonBones.animation.isPlaying)
			{
				this._dragonBones.animation.play(this.idle,0);
			}
		}
	}
	
	public isLoaded():boolean
	{
		return this._isLoaded;
	}

	public playDragonMovie(frame:string, times:number):void{
		if(this._dragonBones){
			this._dragonBones.armature.animation.play(frame,times);
		}
	}

	public getLastFrameName():any{
		if(this._dragonBones){
			return this._dragonBones.animation.lastAnimationName;
		}else{
			return null;
		}
		
	}

	public setFrameAndNum(idle : string, times : number){
		this.idle = idle;
		this._playTimes = times;
	}

	private anchor = false;
	private anchorInfo = null;
	public setAnchorOffset(x:number, y :number):void{
		if(this._dragonBones){
			this._dragonBones.anchorOffsetX = x;
        	this._dragonBones.anchorOffsetY = y;
		}
		else{
			this.anchor = true;
			this.anchorInfo = {
				x : x,
				y : y
			}
		}
	}
	/**
	 * 龙骨监听事件，已考虑异步加载情况
	 * evt : 龙骨动画事件 包含但不限于 播放一次完成、播放一次循环完成等	dragonBones.AnimationEvent.COMPLETE,LOOP_COMPLETE
	 * func : 自定义函数
	 * obj : 自定义对象
	 * */
	public setDragonBoneEventListener(evt : string, func: any, obj : any ):void{
		if(!this._eventDeal[evt]){
			this._eventDeal[evt] = {};
			this._eventDeal[evt].func = func;
			this._eventDeal[evt].obj = obj;
			if(this._dragonBones){
				this.addEvent = '';
				this._dragonBones.addEventListener(evt, func, obj);
			}
			else{
				this.addEvent = evt;
			}
		}
	}

	public getBoneName():string
	{
		return this._dragonBonesName;
	}

	public dispose():void
	{
		this.stop();
		this._isInit=false;
		this._isStop=false;
		if(this._isLoaded&&BaseLoadDragonBones.cacheDic[this._dragonBonesName])
		{
			BaseLoadDragonBones.cacheDic[this._dragonBonesName]--;
		}
		if(this._dragonBonesName)
		{
			if(this._isLoaded&&!BaseLoadDragonBones.cacheDic[this._dragonBonesName])
			{
				App.DragonBonesUtil.removeDragonBones(this._dragonBonesName);
			}
		}
		this._dragonBonesName=null;
		if(this._groupName)
		{
			if(this._isLoaded)
			{
				ResourceManager.destroyRes(this._groupName);
				this._groupName=null;
			}
		}
		for(let i in this._eventDeal){
			let unit = this._eventDeal[i];
			if(unit && this._dragonBones){
				this._dragonBones.removeEventListener(i, unit.func, unit.obj);
			}
		}
		this._eventDeal = {};
		this._dragonBones=null;
		this._isLoaded=false;
		this._playTimes = 0;
		this.addEvent = '';
		this.anchor = false;
		this.anchorInfo = null;
		this._loadCompleteCallData=null;
		super.dispose();
	}
}