class CollectEffect extends BaseClass
{
	private _bitmapList:BaseBitmap[]=[];
	private _maxNum:number=20;
	private _endPoint:egret.Point;
	private _startPoint:egret.Point;
	private _callback:Function;
	private _callbackThisObj:any;
	private _callbackParams:any[];
	public constructor() 
	{
		super();
	}

	public start(resKey:string,startPoint:egret.Point,endPoint:egret.Point,endCallback?:Function,endCallbackThisObj?:any,endCallbackParams?:any[]):void
	{
		this._startPoint=startPoint;
		this._endPoint=endPoint;
		this._numCount=0;
		this._callback=endCallback;
		this._callbackThisObj=endCallbackThisObj;
		this._callbackParams=endCallbackParams;
		App.DisplayUtil.addFactorFunc(BaseBitmap);
		let showWidth:number=250;
		for(var i:number=0;i<this._maxNum;i++)
		{
			let bmp:BaseBitmap=BaseBitmap.create(resKey);
			bmp.alpha=0;
			let minX:number=Math.max(0,Math.min(startPoint.x,endPoint.x)-100);
			let maxX:number=Math.min(GameConfig.stageWidth,Math.max(startPoint.x,endPoint.x)+100);
			let randX:number=minX+Math.random()*(maxX-minX);
			let randValueY:number=Math.random()>0.5?1:-1;
			let randY:number=startPoint.y+randValueY*Math.random()*30;
			bmp.setPosition(randX,randY);
			bmp["tweenMoveList"]=[egret.Point.create(bmp.x,bmp.y),egret.Point.create(endPoint.x,bmp.y),egret.Point.create(endPoint.x,endPoint.y)];
			egret.Tween.get(bmp).to({alpha:1},0+Math.random()*100).call(this.startMove,this);
			LayerManager.msgLayer.addChild(bmp);
			this._bitmapList.push(bmp);
		}
	}

	private _numCount:number=0;
	private startMove():void
	{
		let ths=this;
		this._numCount++;
		if(this._numCount==this._maxNum)
		{
			let l=this._bitmapList.length;
			for(var i:number=l-1;i>=0;i--)
			{
				egret.Tween.removeTweens(this._bitmapList[i]);
				egret.Tween.get(this._bitmapList[i]).wait(10+Math.random()*300).to({factor:1},450).call(function(bmp:BaseBitmap){
					bmp.dispose();
					bmp["tweenMoveList"]=undefined;
					BaseBitmap.release(bmp);
					ths._bitmapList.splice(i,1);
					ths._numCount--;
					if(ths._numCount==0)
					{
						if(ths._callback)
						{
							ths._callback.apply(ths._callbackThisObj,ths._callbackParams);
						}
						ths._callback=null;
						ths._callbackThisObj=null;
						ths._callbackParams=null;
					}
				}.bind(this,this._bitmapList[i]));
			}
		}
	}

	public dispose():void
	{
	}
}