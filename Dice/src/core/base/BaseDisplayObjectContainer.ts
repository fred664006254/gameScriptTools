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
	/**
	 * 请求type列表
	 */
	protected _requestTypeList:string[]=[];

	/**
	 * 是否已经请求过
	 */
	protected _isRequesed:boolean=false;

	protected _curRequestData:{requestType:string,requestData:any};

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
            point.x -= GameData.layerPosX;
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
	 * 网络消息:维护NetEventCallBack, 回调走netEventCallBack
	 * 非网络消息:维护MsgConstEventArr, 回调走msgEventCallBack
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{
		return null;
	}

	protected request(requestType:string,requestData:any,addQueue:boolean=true):void
	{
		if(!requestType)
		{
			return;
		}
		
		let eventType:string=requestType;
		if(this._requestTypeList.indexOf(eventType)<0)
		{
			App.MsgHelper.addEvt(eventType,this.receiveEvent,this);
			this._requestTypeList.push(requestType);
		}
		NetManager.request(requestType,requestData,addQueue);
	}
	
	protected receiveEvent(event:egret.Event):void
	{

		let requestData=this._curRequestData;

		if(requestData)
		{
			if(event.type==requestData.requestType)
			{
				this._curRequestData=null;
				if(event.data&&event.data.ret==false)
				{
					if(this._isRequesed==false)
					{//首次
						this.requestLoadError();
					}
					return;
				}
			}
		}

		this.netEventCallBack(event);
		if(requestData)
		{
			// if(event.type==requestData.requestType)
			// {
			// 	if(this._isRequesed==false&&this.isShow())
			// 	{//首次
			// 		this._isRequesed=true;
			// 		if(this.isLoaded&&this._isRequesed)
			// 		{
			// 			this.preInit();
			// 		}
			// 	}
			// }
		}
	}

	protected requestLoadError():void
	{
		let requestErrorTip:string=this.getRequestErrorTip();
		if(requestErrorTip)
		{
			App.CommonUtil.showTip(requestErrorTip);
		}
		// this.hideLoadingMask();
		// this.hide();
	}

	/**	
	 * 请求失败的提示
	 */
	protected getRequestErrorTip():string
	{
		return LangMger.getlocal("requestLoadErrorTip");
	}

	protected removeAllRequestEvents():void
	{
		let l:number=this._requestTypeList.length;
		if(l>0)
		{
			for(let i:number=l-1;i>=0;i--)
			{
				this.removeRequestEvent(this._requestTypeList[i]);
			}
		}
	}

	protected removeRequestEvent(requestType:string):void
	{
		let index:number=this._requestTypeList.indexOf(requestType);
		if(index>-1)
		{
			App.MsgHelper.removeEvt(requestType,this.receiveEvent,this);
			this._requestTypeList.splice(index,1);
		}
	}


	protected netEventCallBack(evt : egret.Event):void
	{

	}

    protected initEventListener():void{
		let view = this;
		let msgConstArr = view.getMsgConstEventArr();
		let len = msgConstArr.length;
		for(let i = 0; i < len; ++ i){
			App.MsgHelper.addEvt(msgConstArr[i], view.msgEventCallBack, view);
		}

		let netConstArr = view.getNetConstEventArr();
		len = netConstArr.length;
		for(let i = 0; i < len; ++ i){
			App.MsgHelper.addEvt(netConstArr[i], view.receiveEvent, view);
		}
	}

	protected msgEventCallBack(evt : egret.Event):void{
		switch(evt.type){
			default:
				break;
		}
	}

	protected diposeEventListener():void{
		let view = this;
		let msgConstArr = view.getMsgConstEventArr();
		let len = msgConstArr.length;
		for(let i = 0; i < len; ++ i){
			App.MsgHelper.removeEvt(msgConstArr[i], view.msgEventCallBack, view);
		}

		let netConstArr = view.getNetConstEventArr();
		len = netConstArr.length;
		for(let i = 0; i < len; ++ i){
			App.MsgHelper.removeEvt(netConstArr[i], view.receiveEvent, view);
		}
	}

	protected getMsgConstEventArr():string[]{
		return [];
	}
	
	protected getNetConstEventArr():string[]{
		return [];
    }
    
	/**
     * 销毁对象
     */ 
    public dispose()
    {
        this.diposeEventListener();
        this.stopAllActions();
        this.removeTouchTap();
        this.removeTouch();
        App.DisplayUtil.destory(this);
		this.bindData=null;
		this._isRequesed=false;
		this._curRequestData=null;
		this._requestTypeList = [];
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