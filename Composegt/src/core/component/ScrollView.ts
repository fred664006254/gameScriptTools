/**
 * author 陈可
 * date 2017/9/20
 * @class ScrollView
 */
class ScrollView extends egret.ScrollView implements base.Ibase
{
	protected content:egret.DisplayObject=undefined;
	protected _touchTapHelper: TouchHelper.Touch = null;
	private _touchHelper:TouchHelper.Touch=null;
	private _moveCallBack:Function;
	private _moveCallBackObj:any;
	private _arrow : BaseLoadBitmap = null;
	public constructor(content?:egret.DisplayObject)
	{
		super(content);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStageHandler,this);
		this.addEventListener(egret.Event.COMPLETE,this.moveHandler,this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	//添加到舞台，然后初始化
	private onAddToStage(event:egret.Event) {
		// this.setArrow();
	}

	private removeFromStageHandler(e:egret.Event):void
	{
		egret.ScrollTween.removeTweens(this);
	}

	public setContent(content?:egret.DisplayObject):void
	{
		super.setContent(content);
		this.content=content;
	}

	public set x(value:number){
		let tmpX = this.x;
		egret.superSetter(ScrollView,this,"x",value);
		if(tmpX !== value){
			if(this._arrow && this._arrow.stage){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._arrow, this);
			}
		}
	}

	public set y(value:number){
		let tmpY = this.y;
		egret.superSetter(ScrollView,this,"y",value);
		if(tmpY !== value){
			if(this._arrow && this._arrow.stage){
				App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._arrow, this);
				let startY = this._arrow.y;
				egret.Tween.removeTweens(this._arrow);
				egret.Tween.get(this._arrow,{loop : true}).to({y : startY - 10, alpha : 0}, 800).to({y : startY,  alpha : 1}, 800);
			}
		}
	}

	public get x() : number{
		return egret.superGetter(ScrollView,this,"x");
	}

	public get y() : number{
		return egret.superGetter(ScrollView,this,"y");
	}

	public get scrollLeft() : number{
		return egret.superGetter(ScrollView,this,"scrollLeft");
	}

	public set scrollLeft(flag){
		egret.superSetter(ScrollView,this,"scrollLeft",flag);
		if(this._moveCallBack)
		{
			this._moveCallBack.call(this._moveCallBackObj);
		}
	}

	public set visible(flag){
		egret.superSetter(ScrollView,this,"visible",flag);
		if(this._arrow){
			this._arrow.visible = this.visible;
			if(this._arrow.visible){
				this._arrow.visible = this.checkShowArrow();
			}
		}
	}

	public get visible() : boolean{
		return egret.superGetter(ScrollView,this,"visible");
	}

	public setArrow():void{
		let content = this.parent;
		if(content){
			if(this._arrow){
				App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._arrow, this);
				egret.Tween.removeTweens(this._arrow);
			}
			else{
				let arrow = BaseLoadBitmap.create("popupview_rulearrow");
				arrow.width = 31;
				arrow.height = 27;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, arrow, this, [0,0]);
				content.addChild(arrow);
				this._arrow = arrow;
			}
			this._arrow.visible = this.visible;
			if(this._arrow.visible){
				this._arrow.visible = this.checkShowArrow();
			}
			let startY = this._arrow.y;
			egret.Tween.get(this._arrow,{loop : true}).to({y : startY - 10, alpha : 0}, 800).to({y : startY, alpha : 1}, 800);
		}
	}

	public removeContent():egret.DisplayObject
	{
		egret.ScrollTween.removeTweens(this);
		super.removeContent();
		let content:egret.DisplayObject=this.content;
		this.content=null;
		return content;
	}

	public setPosition(x:number,y:number):void
	{
		this.x=x;
		this.y=y;
		this.checkShowArrow();
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchTapHandler:(evet:egret.TouchEvent,...args)=>void,touchTapHandlerThisObj:any,touchTapHandlerParams?:any[])
    {
		let ths=this;
        if(this._touchTapHelper==null)
        {
			//局部调用，勿改
			let tapHandler=function(event:egret.TouchEvent,...args):void
			{
				if(event.type==egret.TouchEvent.TOUCH_END)
				{
					if(touchTapHandler)
					{
						let params:any[]=[event];
						if(args&&args.length>0)
						{
							params.concat(args);
						}
						touchTapHandler.apply(touchTapHandlerThisObj,params);
					}
				}
			}
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler,this,touchTapHandlerParams);
        }
	}
	
	/**
     * 箭头翻阅提示
     */
	public checkShowArrow():boolean{
		let view = this;
		let flag = false;
		let content : any = view.content;
		let height = content.height - view.height;
		if(this.verticalScrollPolicy != 'off'){
			if(height > 0 && view.scrollTop < height){
				flag = true;
			}
		}
		return flag;
	}


	public bindMoveCompleteCallback(callback:Function,callbackObj:any):void
	{
		this._moveCallBack=callback;
		this._moveCallBackObj=callbackObj;
		if(this._arrow){
			this._arrow.visible = this.checkShowArrow();
		}
	}

	private moveHandler(e:egret.Event):void
	{
		if(this._moveCallBack)
		{
			this._moveCallBack.call(this._moveCallBackObj);
		}
		if(this._arrow){
			this._arrow.visible = this.checkShowArrow();
		}
	}


	/**
     * 移除触摸
     */
    public removeTouchTap()
    {
        if(this._touchTapHelper)
        {
            this._touchTapHelper.removeTouch();
            this._touchTapHelper = null;
        }
    }

	public addTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams?:any[]):void
	{
		if(!this._touchHelper)
		{
			this._touchHelper = TouchHelper.addTouch(this.content,touchHandler,touchHandlerThisObj,touchHandlerParams);
		}
	}

	public removeTouch():void
	{
		if(this._touchHelper)
		{
			this._touchHelper.removeTouch();
			this._touchHelper=null;
		}
	}
	public setContentPosY(posy : number):void{
		if(this.content){
			this.content.y = posy;
		}
	}


	public dispose():void
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeFromStageHandler,this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.removeEventListener(egret.Event.COMPLETE,this.moveHandler,this);
		try
		{
			this._removeEvents();
			this._onTouchEnd(null);
		}
		catch(e)
		{
			
		}
		if(this._arrow){
			this._arrow.dispose();
		}
		this._arrow = null;

		egret.ScrollTween.removeTweens(this);
		this._moveCallBack=null;
		this._moveCallBackObj=null;
		if(this.numChildren>0)
		{
			let content:egret.DisplayObject = this.removeContent();
			if(content instanceof egret.DisplayObjectContainer)
			{
				App.DisplayUtil.destory(content);
			}
		}
		this._content=null;
	}
}