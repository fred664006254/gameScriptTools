class CollectEffect extends BaseClass
{
	private _bitmapList:BaseBitmap[]=[];
	private _maxNum:number=20;
	private _endPoint:egret.Point;
	private _startPoint:egret.Point;
	private _callback:Function;
	private _callbackThisObj:any;
	private _callbackParams:any[];
	private _speed : 1.2;
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
		// App.DisplayUtil.addFactorFunc(BaseBitmap);
		let showWidth:number=250;
		for(var i:number=0;i<this._maxNum;i++)
		{
			let startX = startPoint.x;
			let startY = startPoint.y;
			let bmp:BaseBitmap=BaseBitmap.create(resKey);
			// bmp.alpha=1;
			bmp.anchorOffsetX = bmp.width / 2;
			bmp.anchorOffsetY = bmp.height / 2;
			bmp.setScale(App.MathUtil.getRandom(5,7)/10);
			bmp.setPosition(startX,startY);

			let disX = App.MathUtil.getRandom(-120,120);
			let disY = App.MathUtil.getRandom(-120,120);

			let randX = startX + disX;
			let randY = startY + disY;
			let randRotation = App.MathUtil.getRandom(-720,720);

			// let endX = randX+(disX >= 0 ? 30 : -30);
			// let endY = randY+(disY >= 0 ? 30 : -30);
			
			// let minX:number=Math.max(0,Math.min(startPoint.x,endPoint.x)-100);
			// let maxX:number=Math.min(GameConfig.stageWidth,Math.max(startPoint.x,endPoint.x)+100);
			// let randX:number=minX+Math.random()*(maxX-minX);
			// let randValueY:number=Math.random()>0.5?1:-1;
			// let randY:number=startPoint.y+randValueY*Math.random()*30;
			// bmp.setPosition(randX,randY);
			bmp["tweenMoveList"]=[egret.Point.create(randX,randY),egret.Point.create(endPoint.x,randY),egret.Point.create(endPoint.x,endPoint.y)];
			egret.Tween.get(bmp).to({x:randX,y:randY, rotation:randRotation},600).wait(30).call(this.startMove,this);
			LayerMgr.msgLayer.addChild(bmp);
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
				let unit = this._bitmapList[i];
				egret.Tween.removeTweens(unit);
				let endPoint = unit[`tweenMoveList`][2];
				egret.Tween.get(unit).to({x : endPoint.x, y : endPoint.y, rotation : 0},Math.abs(App.MathUtil.getDistance(endPoint, unit[`tweenMoveList`][0]))).call(function(bmp:BaseBitmap){
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

	public dispose():void{
	}
}