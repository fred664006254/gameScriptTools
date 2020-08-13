/**
 * author 陈可
 * date 2017/9/4
 * @class BaseBitmapText
 */
class BaseBitmapText extends egret.BitmapText implements base.Iinteractive,base.Ibase
{
	public bindData: any = null;
    private _touchTapHelper: TouchHelper.Tap = null;
	private _touchHelper:TouchHelper.Touch=null;
	public constructor() 
	{
		super();
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerParams:any[],touchHandlerThisObj:any)
    {
        if(this._touchTapHelper==null)
        {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler,touchHandlerThisObj,touchHandlerParams);
        }
    }
    /**
     * 移除触摸
     */ 
    public removeTouchTap()
    {
        if(this._touchTapHelper)
        {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    }

	/**
     * 设置坐标
     */ 
    public setPosition(posX:number,posY:number)
    {
        this.x = posX;
        this.y = posY;
    }

	public stopAllActions() 
    {
        egret.Tween.removeTweens(this);
    }

	public setVisible(visible:boolean)
	{
		this.visible=visible;
	}
    public setScale(scale:number):void
    {
        this.scaleX=this.scaleY=scale;
    }
    public localToGlobal(localX?: number, localY?: number, resultPoint?: egret.Point): egret.Point
	{
		let point:egret.Point=super.localToGlobal(localX,localY,resultPoint);
		if(this.parent&&this.parent!=GameConfig.stage)
		{
			point.y-=GameData.layerPosY;
		}
		return point;
    }
    
    public get cacheAsBitmap(): boolean 
    {
        return egret.superGetter(BaseTextField,this,"cacheAsBitmap");
    }

    public set cacheAsBitmap(value: boolean) 
    {
        if(App.DeviceUtil.isRuntime2())
        {
            return;
        }
        egret.superSetter(BaseTextField,this,"cacheAsBitmap",value);
    }
	/**
     * 销毁对象
     */ 
     public dispose()
    {
        this.stopAllActions();
        this.removeTouchTap();
        this.bindData=null;
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}