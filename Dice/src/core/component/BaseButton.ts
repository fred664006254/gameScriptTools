/**
 * 按钮
 * author dmj
 * date 2017/9/11
 * @class BaseButton
 */
class BaseButton extends BaseDisplayObjectContainer
{
	/**按钮图片实例 */
	private _buttonImage:BaseBitmap;
	/**按钮图片名称 */
	protected _buttonName:string;
	/**按钮状态 */
	private _enable:boolean;
	/**回调函数 */
	private _callback:Function;
	/**按钮所属对下 */
	private _handler:any;
	/**文本实例 */
	private _textLb:BaseTextField;
	/**文本内容 */
	private _textStr:string = "";
	/**字体 */
	private _font:string = null;
	/**字体大小 */
	private _fontSize:number = TextFieldConst.SIZE_BUTTON_COMMON;
	/**是否换图 */
	private _isChangeRes:boolean;
	/**按钮参数 */
	private _param:any[];
	/**缩放比例 */
	private _type1Scale:number = 0.9;
	/**没有按下资源时候显示状态类型0,没有状态,1缩放状态 2半透状态 */
	private _noDownImgType:number = 0;

	private _isBegin:boolean;
	/**state 1：正常状态，2：按下状态，3：不可用状态  */
	public static BTN_STATE1:number = 1;
	public static BTN_STATE2:number = 2;
	public static BTN_STATE3:number = 3;

	/**文本前加icon */
	private _textIconSp:BaseBitmap = null;
	/**按钮置灰状态 */
	private _isGray:boolean;
	/**
	 * 状态icon，如：红点
	 */
	private _statusIconSp:BaseBitmap = null;

	/**
	 * 禁止点击事件冒泡
	 */
	public forbidClickBubble = false;

	//按钮冷却时间默认秒数
	private _btnCdSecond: number = 0;
	//当前按钮冷却时间秒数
	private _curBtnCdSecond: number = 0;
	//使用按钮冷却功能倒计时的时候保存按钮之前的文本
	private _btnCdOldStr: string = null;
	//倒计时回调
	private _btnCdCallback: Function = null;
	private _btnCdTarget: any = null;
	//倒计时回调秒数
	private _btnCdCallbackSec: number = 0;
	public constructor() 
	{
		super();
	}

	/**
	 * 初始化按钮
	 * @param buttonName   按钮图片名称
	 * @param textStr      按钮文字，注意是最终文字
	 * @param callback     点击回调函数
	 * @param handler      
	 * @param param        参数
	 * @param fontSize     字体大小
	 * @param noDownImgType 没有按钮资源时候，按下状态处理 0缩放处理，1透明处理，3不处理
	 */
	public init(buttonName:string,textStr:string,callback:Function,handler:any,param?:any[],fontSize?:number,noDownImgType?:number,buttonWidth?:number):void
	{
		this._buttonName = buttonName;
		this._textStr = textStr;
		this._callback =callback;
		this._handler = handler;
		this._fontSize = fontSize;
		this._param = param;
		if(isNaN(noDownImgType))
		{
			this._noDownImgType=0;
		}
		else
		{
			this._noDownImgType=noDownImgType;
		}
		this.touchEnabled = true;
		this.addTouch(this.eventHandler,this);

		this._buttonImage = BaseBitmap.create(buttonName);
		this._buttonImage.x = 0;
		this._buttonImage.y = 0;
		this.addChild(this._buttonImage);

		if (buttonWidth)
		{
			this._buttonImage.width = buttonWidth;
		}		

		this._textLb = new BaseTextField(false);
		this._textLb.name = "btnTxt";
		this._textLb.bold = true;
		if(this._font)
		{
			this._textLb.fontFamily = this._font;
		}
		if(this._fontSize)
		{
			this._textLb.size = this._fontSize;
		}
		let strokeColor = ColorEnums.strokeBlack;
		let size = this._textLb.size;
		switch(buttonName){
			case ButtonConst.BTN_COMMON_RED:
				size = 28;
			case ButtonConst.BTN_SMALL_RED:
				strokeColor = ColorEnums.btnStrokeRed;
				break;
			case ButtonConst.BTN_COMMON_YELLOW:
				size = 28;
			case ButtonConst.BTN_LONG_YELLOW:
				strokeColor = ColorEnums.btnStrokeOrange;
				break;
			case ButtonConst.BTN_COMMON_BLUE:
				size = 28;
			case ButtonConst.BTN_LONG_BLUE:
				strokeColor = ColorEnums.btnStrokeBlue;
				break;
			case ButtonConst.BTN_COMMON_PURPLE:
				size = 28;
			case ButtonConst.BTN_SMALL_PURPLE:
				strokeColor = ColorEnums.btnStrokePurple;
				break;
			case ButtonConst.BTN_LONG_GREEN:
				size = 28;
				strokeColor = 0x0d831d;
				break;
			case `invitefriendtabbg`:
				strokeColor = 0x156ea6;
				break;
		}
		// 描边颜色
		switch (buttonName) {
			case ButtonConst.BTN_BIG_YELLOW:
			case ButtonConst.BTN_BIG_YELLOW_AB:
			case ButtonConst.BTN_LONG_YELLOW:
			case ButtonConst.BTN_CONFIRM:
			case ButtonConst.BTN_COMMON_YELLOW:
				strokeColor = ColorEnums.btnStrokeOrange;
				break;
			case ButtonConst.BTN_LONG_BLUE:
			case ButtonConst.BTN_COMMON_BLUE:
			case ButtonConst.BTN_CANCEL:
				strokeColor = ColorEnums.btnStrokeBlue;
				break;
			default:
				break;
		}
		this._textLb.strokeColor = strokeColor;
		this._textLb.stroke = 2;
		this._textLb.size = size;

		this.addChild(this._textLb);
		this.updateButtonImage(BaseButton.BTN_STATE1,true);
		this.setText(this._textStr);
	}

	public isEnable():boolean
	{
		return this._enable;
	}

	public callbackHanler(param?:any[]):void
	{
		if(param)
		{
			this._param = param;
		}
		if(this._callback)
		{

			this._callback.apply(this._handler,this._param);
			//如果设置了冷却时间
			if(this._btnCdSecond > 0){
				this._btnCdOldStr = this._textStr;
				this._curBtnCdSecond = this._btnCdSecond;
				this.setEnable(false);
				let text =  App.DateUtil.getFormatBySecond(this._curBtnCdSecond,3);
				this.setText(text);
				TickMgr.removeTick(this.tick,this);
				//启动定时器
				TickMgr.addTick(this.tick,this);
			}
		}
	}

	public startCd():void{
		if(this._btnCdSecond > 0){
			this._btnCdOldStr = this._textStr;
			this._curBtnCdSecond = this._btnCdSecond;
			this.setEnable(false);
			let text =  App.DateUtil.getFormatBySecond(this._curBtnCdSecond,3);
			this.setText(text);
			TickMgr.removeTick(this.tick,this);
			//启动定时器
			TickMgr.addTick(this.tick,this);
		}
	}

	public getCallbackFunc():Function
	{
		return this._callback;
	}

	/**
	 * 设置文本文字
	 * @param textStr 文本文字key
	 * @param onlykey 是否是key,false：不是key，可以直接赋值
	 */
	public setText(textStr:string):void
	{
		if(this._textLb)
		{
			if(textStr)
			{
				this._textLb.setString(textStr);
				this._textStr = textStr;
				
			}
			if(this._buttonImage)
			{
				if(this._textLb.width > this._buttonImage.width)
				{
					this._textLb.width = this._buttonImage.width;
					
				}
				this._textLb.textAlign = egret.HorizontalAlign.CENTER;
				var lbX = this._buttonImage.x + this._buttonImage.width/2 - this._textLb.width/2 + this.getTextOffX();
				var lbY = this._buttonImage.y + this._buttonImage.height/2 - this._textLb.height/2 + this.getTextOffY();
				this._textLb.setPosition(lbX,lbY);
			}
			// App.LogUtil.log("textStr:" + this._textLb.text + " x:" + lbX + " y:" + lbY);
		}
	}

	/**
	 * 设置点击按钮回调参数
	 * @param param 参数
	 */
	public setParams(param:any[]):void
	{
		this._param = param;
	}

	/**
	 * 设置文字颜色
	 * @param color 色标志，通过TextFieldConst.ts获取
	 */
	public setColor(color:number):void
	{
		this._textLb.textColor = color;
	}

	/**
	 * 设置按钮操作状态
	 * @param isEnable true：可操作，false：不可操作
	 */
	public setEnable(isEnable:boolean):void
	{
		this._enable = isEnable;
		this.touchEnabled = isEnable;
		if(isEnable)
		{
			App.DisplayUtil.changeToNormal(this._buttonImage);
			App.DisplayUtil.changeToNormal(this._textLb);
		}
		else
		{
			App.DisplayUtil.changeToGray(this._buttonImage);
			App.DisplayUtil.changeToGray(this._textLb);
		}
	}

	/**
	 * 根据状态更新按钮资源
	 * @param state 1：正常状态，2：按下状态，3：不可用状态 
	 */
	protected updateButtonImage(state:number = BaseButton.BTN_STATE1,isInit?:boolean):void
	{
		// App.LogUtil.log("state:" + state);
		if(this._buttonImage)
		{
			var curButtonName:string = "";
			switch(state)
			{
				case BaseButton.BTN_STATE1:
					
					curButtonName = this._buttonName;
					break;
				case BaseButton.BTN_STATE2:
					curButtonName = this._buttonName + "_down";
					break;
				case BaseButton.BTN_STATE3:
					curButtonName = this._buttonName + "disabled";
					break;
			}
			
			if(curButtonName == ButtonConst.BTN_BIG_TAB){
				this._textLb.strokeColor = ColorEnums.strokeBlack;
			}
			else if(curButtonName == (ButtonConst.BTN_BIG_TAB + "_down")){
				this._textLb.strokeColor = ColorEnums.btnStrokeOrange;;
			}

			if(curButtonName == `tabbar`){
				this._textLb.strokeColor = ColorEnums.btnStrokeBlue;
			}
			else if(curButtonName == `tabbar_down`){
				this._textLb.strokeColor = ColorEnums.btnStrokeOrange;
			}

			if(curButtonName == `invitefriendtabbg`){
				this._textLb.strokeColor = 0x156ea6;
			}
			else if(curButtonName == `invitefriendtabbg_down`){
				this._textLb.strokeColor = 0x773c00;
			}
			
			var tmpTexture: egret.Texture = ResMgr.getRes(curButtonName);
			let isNoDownBmp:boolean=false;
			if(tmpTexture == null)
			{
				// 如果没有按下状态，就用正常状态，但是需要按下时，需要进行缩放
				tmpTexture = ResMgr.getRes(this._buttonName);
			}
			if(!this.checkHasDownImg())
			{
				isNoDownBmp=true;
			}
            if (this._buttonImage.texture != tmpTexture)
            {
                this._buttonImage.texture = tmpTexture;
				this.width = this._buttonImage.width;
				this.height = this._buttonImage.height;
            }
			if(this._textLb)
			{
				
				if(this._textIconSp)
				{

				}
				else
				{
					// this._textLb.x = 0.5 + this._buttonImage.width / 2 - this._textLb.width / 2;
               		// this._textLb.y = 0.5 + this._buttonImage.height / 2 - this._textLb.height / 2+this.getTextOffY();
				}
			}
			if(isNoDownBmp&&(!isInit))
			{
				this.checkNoDownImageState();
			}
		}
	}

	private checkHasDownImg():boolean
	{
		if(ResMgr.hasRes(this._buttonName + "_down"))
		{
			return true;
		}
		return false;
	}
	/**
	 * 文本前添加icon
	 * @param icon icon资源名称
	 */
	public addTextIcon(icon:string,type:number=0,width?):void
	{
		this._textIconSp = BaseBitmap.create(icon);
		this._textIconSp.name = "btnIcon";
		if(this._textIconSp)
		{
			let iconW = 0;
			if(!width){
				iconW = 33;
				this._textIconSp.scaleX = iconW/this._textIconSp.width;
				this._textIconSp.scaleY = iconW/this._textIconSp.height;
				let newW = iconW + this._textLb.width; 
				this._textIconSp.x = (this.width - newW)/2; 
				this._textIconSp.y = (this.height - iconW)/2;		
				if(type==1){
					this._textLb.x = this._textIconSp.x + iconW+10;
				}
				else{
					this._textLb.x = this._textIconSp.x + iconW;
				}
			}
			else{
				this._textIconSp.x = (this.width - this._textIconSp.width)/2; 
				this._textIconSp.y = (this.height - this._textIconSp.height)/2;	
			}
			this.addChild(this._textIconSp);
		}
	}

	public addGroup(group : BaseDisplayObjectContainer, ):void{
		this.addChild(group);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, this, [0,0], true);
	}

	public removeTextIcon():void
	{
		this.removeChild(this._textIconSp);
		this._textIconSp = null;
	}
	
	public eventHandler(event:egret.TouchEvent):void
	{
		if(this._enable == false)
		{
			return;
		}
		if(this.forbidClickBubble){
			event.stopPropagation();
		}
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._isBegin = true;
				this.updateButtonImage(BaseButton.BTN_STATE2);
				SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
				break;
			case egret.TouchEvent.TOUCH_END:
				if(this._isBegin)
				{
					this._isBegin = false;
					this.updateButtonImage(BaseButton.BTN_STATE1);
					this.callbackHanler();
				}
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
				this._isBegin = false;
				this.updateButtonImage(BaseButton.BTN_STATE1);
				break;
		}
	}

	private checkNoDownImageState():void
	{
		if(this._noDownImgType==0)
		{
			this.scaleState();
		}
		else if(this._noDownImgType==1)
		{
			this.alphaState();
		}
	}

	private alphaState():void
	{
		if(this._noDownImgType == 1)
		{
			if(this._isBegin == true)
			{
				this.alpha=0.8;
			}
			else
			{
				this.alpha=1;
			}
		}
	}
	
	private scaleState():void
	{
		if(this._noDownImgType == 0)
		{
			let lastScaleX:number=this.scaleX;
			let lastScaleY:number=this.scaleY;
			if(this._isBegin == true)
			{
				this.scaleX*=this._type1Scale;
				this.scaleY*=this._type1Scale;

			}
			else
			{
				this.scaleX /=this._type1Scale;
				this.scaleY /=this._type1Scale;
			}
			this.x+=(this.width*lastScaleX-this.width*this.scaleX)/2;
			this.y+=(this.height*lastScaleY-this.height*this.scaleY)/2;
		}
	}

	public setScale(scale:number):void
	{
		this.scaleX = this.scaleY = scale;
	}

	public setTextSize(s:number):void
	{
		this._textLb.size = s;
		this.setText(this._textLb.text);
	}

	public leaveStageHandler(event:egret.Event):void
	{
		if(this._isBegin)
		{
			this._isBegin = false;
			this.updateButtonImage(BaseButton.BTN_STATE1);
		}
	}

	public isBegin():boolean
	{
		return this._isBegin;
	}

	public setBigin(isBegin):void
	{
		this._isBegin = isBegin;
	}

	private _x : number = 0;
	/**文本相对按钮的X坐标偏移量 */
	public setTextOffX(value):void
	{
		this._x = value;
	}

	public getTextOffX():number
	{
		return this._x;
	}

	private _y : number = 0;
	/**文本相对按钮的X坐标偏移量 */
	public setTextOffY(value):void
	{
		this._y = value;
	}


	/**文本相对按钮的Y坐标偏移量 */
	public getTextOffY():number
	{
		return this._y;
	}

	/*返回当前按钮资源名*/
	public get resourceName():string{
		return this._buttonName;
	}

	/*重新设按钮图片*/
	public setBtnBitMap(res):void{
		this._buttonName = res;
		this._buttonImage.texture = ResMgr.getRes(res);
		this.width = this._buttonImage.width;
		this.height = this._buttonImage.height;
	}

	/**
	 * 设置点击区域为背景图
	 * setBtnTouchOnbg
	 */
	public setBtnTouchOnbg() {
		this._buttonImage.addTouch(this.eventHandler,this);
		this.removeTouch();
	}

	/*置灰按钮 可以点击*/
	public setGray(isGray:boolean)
	{
		this._isGray = isGray;
		if(isGray)
		{
			App.DisplayUtil.changeToGray(this._buttonImage);
			App.DisplayUtil.changeToGray(this._textLb);
		}else{
			App.DisplayUtil.changeToNormal(this._buttonImage);
			App.DisplayUtil.changeToNormal(this._textLb);
		}
	}

	/**设置按钮冷却时间 单位秒 ,只有当前秒数为0的时候才能修改
	 * 设置num＝0的时候关闭
	*/
	public setBtnCdSecond(num:number){



		if(this._curBtnCdSecond == 0){
			this._btnCdSecond = num;
		}
	}
	/**
	 * 清除tick 倒计时
	 */
	public clearBtnTick()
	{
		this.setText(this._btnCdOldStr);
		this._curBtnCdSecond = 0;
		this.setEnable(true);
		TickMgr.removeTick(this.tick,this);
	}
	/**
	 * 设置冷却时间在多少秒的时候调用回调
	 */
	public setBtnCdCallback(second:number,callback:Function,target:any){
		this._btnCdCallback = callback;
		this._btnCdTarget = target;
		this._btnCdCallbackSec = second;

	}


	//按钮cd倒计时
	public tick(): boolean
	{	
		if(this._curBtnCdSecond > 0){
			this._curBtnCdSecond --;
			let text =  App.DateUtil.getFormatBySecond(this._curBtnCdSecond,3);
			this.setText(text);

			if(this._btnCdCallbackSec > 0 && (this._btnCdCallbackSec == this._btnCdSecond - this._curBtnCdSecond)){
				if(this._btnCdCallback && this._btnCdTarget){
					this._btnCdCallback.apply(this._btnCdTarget);
				}
			}

			return true;
		} else {
			//倒计时结束
			this.setText(this._btnCdOldStr);
			this._curBtnCdSecond = 0;
			this.setEnable(true);
			TickMgr.removeTick(this.tick,this);
			return false;
		}
	}


	public getIsGray():boolean{
		return this._isGray;
	}


	public setTextPos(x:number, y : number):void
	{
		if(this._textLb){
			if(x != null){
				this._textLb.x = x;
			}
			if(y != null){
				this._textLb.y = y;
			}
		}
	}

	public setTextStrokeColor(color : number, num : number = 1):void
	{
		if(this._textLb){
			this._textLb.strokeColor = color;
			this._textLb.stroke = num;
		}
	}

	public setBtnSize(width:number, height:number):void{
		this.width = this._buttonImage.width = width;
		this._textLb.width = width;
		this.height =this._buttonImage.height = height;
	}

	public dispose():void
	{
		if(this._btnCdSecond > 0){
			TickMgr.removeTick(this.tick,this);
		}
		

		if(this._buttonImage)
		{
			App.DisplayUtil.changeToNormal(this._buttonImage);
			this._isGray = false;
		}
		if(this._buttonImage )
		{
			this._buttonImage = null;
		}
		if(this._textLb)
		{
			this._textLb = null;
		}
		if(this._textIconSp)
		{
			this._textIconSp = null;
		}

		this.forbidClickBubble = false;
		this._buttonName = null;
		this._enable = null;
		this._callback = null;
		this._handler = null;
		this._textStr = null;
		this._font = null;
		this._fontSize = null;
		this._isChangeRes = null;
		this._noDownImgType=0;
		this._statusIconSp = null;


		//按钮冷却时间默认秒数
		this._btnCdSecond = 0;
		//当前冷却时间读秒
		this._curBtnCdSecond = 0;


		this._btnCdOldStr = null;

		//倒计时回调
		this._btnCdCallback = null;

		this._btnCdTarget = null;
		//倒计时回调秒数
		this._btnCdCallbackSec = 0;
		this._x = this._y = 0;
		super.dispose();
	}
}