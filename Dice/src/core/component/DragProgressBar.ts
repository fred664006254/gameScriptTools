/**
 * 滑动进度条
 * author 陈可
 * date 2017/9/26
 * @class DragProgressBar
 */
class DragProgressBar extends ProgressBar
{
	private _callback:Function;
	private _callbackThisObj:any;
	private _callbackParams:any[];
	private _maxNum:number=1;
	private _curNum:number=1;
	private _minNum:number=1;
	private _addBtn:BaseButton;
	private _reduceBtn:BaseButton;
	private _isTouch:boolean = true;
	public constructor()
	{
		super();
	}

	protected initUI():void
	{
		super.initUI();
		this._dragIcon=BaseBitmap.create("public_dot1");
		this._dragIcon.addTouch(this.dragTouchHandler,this);
		this._dragIcon.setPosition(this.progressBar.x-this._dragIcon.width/2,this.progressBar.y+(this.progressBar.height-this._dragIcon.height)/2);
		this.addChild(this._dragIcon);

		this._reduceBtn=ComponentMgr.getButton("button_del1","",this.checkBtnHandler,this,[0]);
		this._reduceBtn.setPosition(-this._reduceBtn.width - 12,this._progressBarBg.y+(this._progressBarBg.height-this._reduceBtn.height)/2);
		this.addChild(this._reduceBtn);
		this._addBtn=ComponentMgr.getButton("button_add1","",this.checkBtnHandler,this,[1]);
		this._addBtn.setPosition(this._progressBarBg.width + 12,this._progressBarBg.y+(this._progressBarBg.height-this._addBtn.height)/2);
		this.addChild(this._addBtn);
	}

	public getReduceX():number
	{
		return -this._reduceBtn.width - 12;
	}

	private checkBtnHandler(value:number):void
	{
		if (this._maxNum <= 0){
			return;
		}
		let num:number;
		if(value)
		{
			num=Math.min(this._maxNum,this._curNum+1);
		}
		else
		{
			num=Math.max(this._minNum,this._curNum-1);
		}
		this.setDragPercent(num,this._maxNum,this._minNum);
	}

	private _startPoint:egret.Point;
	private dragTouchHandler(event:egret.TouchEvent):void
	{
		if (this._maxNum <= 0){
			return;
		}
		if (!this._isTouch){
			return;
		}
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				if(!this._startPoint)
				{
					this._startPoint=egret.Point.create(event.stageX,event.stageY);
				}
				else
				{
					this._startPoint.setTo(event.stageX,event.stageY);
				}
				break;
			case egret.TouchEvent.TOUCH_MOVE:
				let offX:number=event.stageX-this._startPoint.x;
				let readX:number=this.getDragCenterX()+offX;
				if(readX<this.progressBar.x+this._minNum*this.getEverSpace())
				{
					readX=this.progressBar.x+this._minNum*this.getEverSpace();
				}
				if(readX>this.progressBar.x+this.progressBar.width)
				{
					readX=this.progressBar.x+this.progressBar.width;
				}
				this._startPoint.x+=readX-this.getDragCenterX();
				let per = (readX-this.progressBar.x)/this.progressBar.width;
				this.setDragPercent( per*this._maxNum,this._maxNum, this._minNum);
				break;
			default:
				egret.Point.release(this._startPoint);
				this._startPoint=null;
				break;
			
		}
	}
	private getEverSpace():number
	{
		return this.progressBar.width/this._maxNum;
	}

	private getDragCenterX():number
	{
		return this._dragIcon.x+this._dragIcon.width/2;
	}

	public setDragPercent(curNumber:number,maxNum:number,minNum:number=1)
    {
		if (maxNum <= 0){
			this.setPercentage(1,null,null);
			return;
		}
		this._minNum=minNum;
		this._maxNum=maxNum;
		this.setPercentage(curNumber/maxNum,null,null);
		this._dragIcon.setPosition(this.progressBar.x+this.progressBar.width * (curNumber/maxNum)-this._dragIcon.width/2,this._dragIcon.y);
		curNumber = Math.floor(curNumber+0.001);
		if(curNumber>=0&&curNumber<=maxNum)
		{
			if(curNumber!=this._curNum)
			{
				this._curNum=curNumber;
				if(this._callback)
				{
					let params:any[]=[this._curNum];
					if(this._callbackParams)
					{
						params=params.concat(this._callbackParams);
					}
					this._callback.apply(this._callbackThisObj,params);
				}
			}
		}
	}

	public setCallBack(callback:Function,callbackThsObj:any,callbackParams?:any[]):void
	{
		this._callback=callback;
		this._callbackThisObj=callbackThsObj;
		this._callbackParams=callbackParams;
	}

	public setBtnVisible(flag : boolean):void{
		this._reduceBtn.visible = this._addBtn.visible /*= this._progressBarBg.visible */= flag;
	}

	//设置最小值 外部调用setDragPercent 需传入最小值，否则默认为1
	public setMinNum(min:number):void{
		this._minNum = min;
	}

	public setBtnEnable(isEnable:boolean):void{
		this._reduceBtn.setEnable(isEnable);
		this._addBtn.setEnable(isEnable);
	}

	public setGray(isGray:boolean):void{
		if (isGray){
			App.DisplayUtil.changeToGray(this);
			this.setBtnEnable(false);
		}
		else{
			App.DisplayUtil.changeToNormal(this);
			this.setBtnEnable(true);
		}
	}

	public isTouch(touch:boolean):void{
		this._isTouch = touch;
	}

	public dispose():void
	{
		this._dragIcon=null;
		this._callback=null;
		this._callbackThisObj=null;
		this._callbackParams=null;
		this._curNum=undefined;
		this._maxNum=undefined;
		this._isTouch=true;
		super.dispose();
	}
}