/**
 * author ck
 * date 2017/8/9
 * @class BaseTextField
 */
class BaseTextField extends egret.TextField implements base.Iinteractive,base.Ibase
{
	public bindData: any = null;
    private _touchTapHelper: TouchHelper.Tap = null;
    private _beginColor: number = 0x000000;
    private _endColor: number = 0x000000;
    private _isUseGradient: boolean = false;
    private _maxChars:number=0;
    private _originalTxt:string='';

    /** 正在format 俄语换行 */
    private _inFormatWordWarp:boolean=false;
	public constructor() 
	{
		super();
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerThisObj:any,touchHandlerParams:any[])
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
    
    private removeStageHandler(event:egret.Event)
    {
        this.dispose();
    }
    
    /**
     * 设置坐标
     */ 
    public setPosition(posX:number,posY:number)
    {
        this.x = posX;
        this.y = posY;
    }

    public setColor(color:number)
    {
        this.textColor=color;
    }

    public setVisible(v:boolean)
    {
        this.visible=v;
    }

    public setString(str:string)
    {
        this.text=str;
    }

    public stopAllActions() 
    {
        egret.Tween.removeTweens(this);
    }

    public setScale(scale:number):void
    {
        this.scaleX=this.scaleY=scale;
    }

    public set text(value:string)
    {
        value=String(value);
        let reg=new RegExp("\\s","g");
        let tmpvalue = value.replace(reg,"");
        this.textFlow=[];
        if(value&&tmpvalue.indexOf("<")>-1 && tmpvalue.indexOf(">")>-1)
        {
            try
            {
                this.textFlow = (new egret.HtmlTextParser).parser(value);
            }
            catch(e)
            {
                egret.superSetter(BaseTextField,this,"text",value);
            }
        }
        else
        {
            egret.superSetter(BaseTextField,this,"text",value);
        }
        this._originalTxt=value;
        this.formatWordWrap();
        this._refreshGradient();
    }

    public get text():string
    {
        return egret.superGetter(BaseTextField,this,"text");
    }

    public get lineSpacing():number
    {
        return egret.superGetter(BaseTextField,this,"lineSpacing");
    }

    public set lineSpacing(value:number)
    {
        if(value === this.lineSpacing) return;
        egret.superSetter(BaseTextField,this,"lineSpacing",value);
        this._refreshGradient();
    }
    public get verticalAlign():string
    {
        return egret.superGetter(BaseTextField,this,"verticalAlign");
    }

    public set verticalAlign(value:string)
    {
        if(value === this.verticalAlign) return;
        egret.superSetter(BaseTextField,this,"verticalAlign",value);
        this._refreshGradient();
    }

    /**
     * 文本字段中最多可包含的字符数（即用户输入的字符数）。
     * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
     * @default 0
     * @language zh_CN
     */
    public get maxChars(): number {
        let chars:number = egret.superGetter(BaseTextField,this,"maxChars");
        if(App.DeviceUtil.isRuntime2())
        {
            chars = this._maxChars;
        }
        return chars;
    }

    public set maxChars(value: number) {
        egret.superSetter(BaseTextField,this,"maxChars",value);
        if(App.DeviceUtil.isRuntime2())
        {
            this._maxChars=value;
            // this.addEventListener(egret.Event.CHANGE,this._textChangeHandler,this);
            this.addEventListener(egret.Event.FOCUS_OUT,this._textChangeHandler,this);
        }
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
     * 一个布尔值，表示文本字段是否按单词换行。如果值为 true，则该文本字段按单词换行；俄语为单词加中划线换行
     * 如果值为 false，则该文本字段按字符换行。
     * @default false
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    public get wordWrap(): boolean {
        return egret.superGetter(BaseTextField,this,"wordWrap");
    }

    public set wordWrap(value: boolean) {
        egret.superSetter(BaseTextField,this,"wordWrap",value);
        if(value)
        {
            this.formatWordWrap();
        }
    }

    public get size(): number {
        return egret.superGetter(BaseTextField,this,"size");
    }

    public set size(value: number) {
        egret.superSetter(BaseTextField,this,"size",value);
        this.formatWordWrap();
    }

    public get width(): number {
        return egret.superGetter(BaseTextField,this,"width");
    }

    public set width(value: number) {
        egret.superSetter(BaseTextField,this,"width",value);
        this.formatWordWrap();
    }

    private _textChangeHandler(e:egret.Event):void
    {
        this.text=App.StringUtil.formatStrToLength(this.text,this._maxChars);
    }

    public localToGlobal(localX?: number, localY?: number, resultPoint?: egret.Point): egret.Point
	{
		let point:egret.Point=super.localToGlobal(localX,localY,resultPoint);
        if(this.type==egret.TextFieldType.INPUT&&localX==0&&localY==0)
        {}
        else
        {
            if(this.parent&&this.parent!=GameConfig.stage)
            {
                point.y-=GameData.layerPosY;
            }
        }
		return point;
    }
    
    /**
     *
     * 设置文字渐变,shader实现,文字本来的颜色会被置为白色
     * @param {number} beginColor 渐变初始颜色 16进制颜色值
     * @param {number} endColor 渐变结束颜色 16进制颜色值
     * @memberof BaseTextField
     */
    public setGradient(beginColor:number,endColor:number)
    {
        this.textColor = TextFieldConst.COLOR_WHITE;
        this._beginColor = beginColor;
        this._endColor = endColor;
        this._isUseGradient = true;
        this._refreshGradient();
    }
    //移除文字渐变
    public removeGradient()
    {
        if(this._isUseGradient){
            this._removeGradient();
        }

    }

    private _refreshGradient(){
        if(!this._isUseGradient) return;

        App.ShaderUtil.setGradientColor(this,this._beginColor,this._endColor);
    }
    private _removeGradient(){
        this._beginColor = 0x000000;
        this._endColor = 0x000000;
        this._isUseGradient = false;
        App.ShaderUtil.removeGradientColor(this);
    }

    /**
     * 文字换行处理，俄语添加-
     * @param textStr 赋值的字符
     */
    private formatWordWrap(textStr?:string):void
    {
        if(this._inFormatWordWarp)
        {
            return;
        }
        if(PlatformManager.checkIsRuLang())
        {
            if(textStr==null)
            {
                textStr=this._originalTxt;
            }
            if(this.wordWrap)
            {
                this._inFormatWordWarp=true;
                App.DisplayUtil.formatWordWrap(this,textStr);
                this._inFormatWordWarp=false;
            }
        }
    }

    /**
     * 销毁对象
     */ 
    public dispose()
    {
        // this.removeEventListener(egret.Event.CHANGE,this._textChangeHandler,this);
        this.removeEventListener(egret.Event.FOCUS_OUT,this._textChangeHandler,this);
        this._maxChars=0;
        this.stopAllActions();
        this.removeTouchTap();
        this.bindData=null;
        this._originalTxt='';
        if(this.cacheAsBitmap)
        {
            this.cacheAsBitmap=false;
        }
        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}