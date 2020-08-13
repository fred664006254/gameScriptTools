/**
 * author 陈可
 * date 2017/9/4
 * @class BaseDisplayObjectContainer
 */
class BaseDisplayObjectContainer extends egret.DisplayObjectContainer implements base.Iinteractive,base.Ibase
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
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerThisObj:any,touchHandlerParams?:any[])
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

    public addTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams?:any[],isMoveCancel?:boolean):void
	{
		if(!this._touchHelper)
		{
			this._touchHelper = TouchHelper.addTouch(this,touchHandler,touchHandlerThisObj,touchHandlerParams,isMoveCancel);
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

    protected getClassName():string
    {
        return egret.getQualifiedClassName(this);
    }

    /**
	 * 相对布局
	 * @param style   对齐方式 |分割 left right horizontal ｜ top bottom vertical
	 * @param self    本身对象
	 * @param base      相对参考对象
	 * @param distance 位置距离
	 */
	public setLayoutPosition(style:string,self:any,base:any,distance:Array<number>=[0,0],local:boolean = false) : egret.Point{
		let view = this;
		let _x = 0;
		let _y = 0;
		let style_arr = style.split('|');
		for(let layout of style_arr){
			switch(layout){
				case LayoutConst.left:
					_x = base.x + distance[0];
					break;	
				case LayoutConst.right:
					_x = base.x + base.width * base.scaleX - distance[0] - self.width * self.scaleX;
					break;	
				case LayoutConst.top:
					_y = base.y + distance[1];
					break;	
				case LayoutConst.bottom:
					_y = base.y + base.height * base.scaleY - distance[1] - self.height * self.scaleY;
					break;
				case LayoutConst.horizontalCenter:
					_x = base.x + (base.width * base.scaleX - self.width * self.scaleX)  / 2 + distance[0];
					break;	
				case LayoutConst.verticalCenter:
					_y = base.y + (base.height * base.scaleY - self.height * self.scaleY) / 2 + distance[1];
					break;	
			}
        }
        if(local){
            _x -= base.x;
            _y -= base.y;
        }
		self.setPosition(_x, _y);
		return new egret.Point(_x,_y);
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
	 * 从 BaseDisplayObjectContainer 实例的子级列表中删除并释放所有 child DisplayObject 实例。
	 */
	public removeChildren(): void
	{
		App.DisplayUtil.removeChildren(this);
		super.removeChildren();
	}
	/**
     * 销毁对象
     */ 
    public dispose()
    {
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        App.DisplayUtil.destory(this);
        this.bindData=null;
        if(this.parent)
        {
            if(this.parent instanceof ScrollView)
            {
                this.parent.dispose();
            }
            else
            {
                this.parent.removeChild(this);
            }
        }
    }
}