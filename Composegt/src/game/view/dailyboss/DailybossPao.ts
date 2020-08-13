class DailybossPao extends BaseDisplayObjectContainer
{
	private posArr:{x:number,y:number}[]=[{x:0,y:79},{x:53,y:0}];
	private _angle:number;
	private _paotong:BaseBitmap;
	private _moveData:{distance:number,x:number,y:number};
	public constructor()
	{
		super();
		this.init();
	}

	private init():void
	{
		for(let i:number=1;i<3;i++)
		{
			let bmp:BaseBitmap=BaseBitmap.create("dailybossbattle_pao"+i);
			bmp.setPosition(this.posArr[i-1].x,this.posArr[i-1].y);
			if(i==2)
			{
				this._paotong=bmp;
				this._angle=Math.atan2(this._paotong.height,this._paotong.width);
				let distance:number=100;
				let x:number=Math.cos(this._angle)*distance;
				let y:number=Math.sin(this._angle)*distance;
				this._moveData={distance:distance,x:0,y:y};
			}
			this.addChild(bmp);
		}
	}

	public getAngle():number
	{
		return this._angle;
	}

	public kaiPao(callBack?:Function,callBackThisObj?:any):void
	{
		let ths=this;
		let paoguanPos:{x:number,y:number}=this.posArr[1];
		egret.Tween.get(this._paotong).to({x:paoguanPos.x+this._moveData.x,y:paoguanPos.y+this._moveData.y,scaleX:1.02,scaleY:1.02},50).call(function(){
			let kaipaoEffect:CustomMovieClip=ComponentManager.getCustomMovieClip("dailyboss_kaopao_",8);
			kaipaoEffect.setPosition(-38,-127);
			kaipaoEffect.setEndCallBack(function(kaipaoEffect:CustomMovieClip){
				if(kaipaoEffect)
				{
					kaipaoEffect.dispose();
				}
			}.bind(ths,kaipaoEffect,ths),ths);
			
			kaipaoEffect.playWithTime(1);
			ths.addChildAt(kaipaoEffect,0);
		},this).to({x:paoguanPos.x,y:paoguanPos.y,scaleX:1,scaleY:1},100).call(function(paoguan:BaseBitmap){
			if(paoguan)
			{
				egret.Tween.removeTweens(paoguan);
				// ths.kaiPao();
			}
		},this,[this._paotong]);
	}

	public dispose():void
	{
		this._paotong=null;
		super.dispose();
	}
}