/**
 * author shaoliang
 * date 2017/9/12
 * @class ProgressBar
 */
class NewProgressBar extends BaseDisplayObjectContainer
{
	/** 进度条进度 0～1 */
    private percents:number;
	/** 进度条遮罩 */
    private _mask:egret.Rectangle;
	/** 进度条背景图片 */
	protected _progressBarBg:BaseBitmap;
	/** 进度条背景图片名 */
	private _progressBarBgResName:string;
	/** 进度条宽度 */
	private _barWidth:number;
	/** 进度条高度 */
	private _barHeight:number;
	/** 进度条中间的显示标签 */
	private _textLb:BaseTextField;
	/** 进度条图片 */
	protected progressBar:BaseBitmap;
	protected progressBarClip:CustomMovieClip;
	/** 进度条图片名 */
	protected progressBarResName:string;

	private progressBarLight:BaseBitmap;
	/** 进度标记 */
	public _dragIcon:BaseBitmap;

	private _tweenTo:egret.Tween;

	public constructor() 
	{
		super();
	}

	/**
	 * 获取ProgressBar组件
	 * @param barName     	进度条图片名称
	 * @param barBgName     进度条背景图片名称
	 * @param barWidth      进度条宽度
	 * @param barHeight     进度条高度
	 */
	public init(progressBar:string,progressBarBg:string,barWidth?:number,barHeight?:number):void
	{
		this._barWidth=barWidth;
		this._barHeight=barHeight;
		this._progressBarBgResName = progressBarBg;
		this.progressBarResName = progressBar;
		this.initUI();
	}
	protected initUI():void
	{	
		
		this._progressBarBg = BaseBitmap.create(this._progressBarBgResName);
		this.addChild(this._progressBarBg);
		this.progressBar = BaseBitmap.create(this.progressBarResName);
		this.checkScale9Rect();
		this.progressBar.x=this._progressBarBg.x+(this._progressBarBg.width-this.progressBar.width)*0.5;
		this.progressBar.y=this._progressBarBg.y+(this._progressBarBg.height-this.progressBar.height)*0.5;
		this.addChild(this.progressBar);
		this._textLb=  ComponentManager.getTextField("0/0",TextFieldConst.FONTSIZE_CONTENT_SMALL); //new BaseTextField();
		this._textLb.width = this._barWidth-20;
		this._textLb.textAlign = egret.HorizontalAlign.CENTER;
		this._textLb.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._textLb.anchorOffsetX = this._textLb.width / 2;
		this._textLb.anchorOffsetY = 20 / 2;
		this._textLb.setPosition((this._progressBarBg.width-this._textLb.width)*0.5 + this._textLb.anchorOffsetX,(this._progressBarBg.height-this._textLb.height)*0.5 + this._textLb.anchorOffsetY);
		this.addChild(this._textLb);
		this._textLb.text="";
		if(RES.hasRes(this.progressBarResName+"_light"))
		{
			this.progressBarLight=BaseBitmap.create(this.progressBarResName+"_light");
			this.progressBarLight.setPosition(this.progressBar.x-this.progressBarLight.width/2,this.progressBar.y+(this.progressBar.height-this.progressBarLight.height)/2);
			this.addChild(this.progressBarLight);
		}
	}

	private checkScale9Rect():void
	{	
		var offX=this._progressBarBg.width-this.progressBar.width;
		var offY=this._progressBarBg.height-this.progressBar.height;
		if(offX<0)
		{
			offX=4;
		}
		if(offY<0)
		{
			offY=4;
		}
		if(this._barWidth<this._progressBarBg.width)
		{
			this._barWidth=this._progressBarBg.width;
		}
		if(this._barHeight<this._progressBarBg.height)
		{
			this._barHeight=this._progressBarBg.height;
		}

		if (!this._barWidth) 
		{
			this._barWidth = this._progressBarBg.width;
		}
		if (!this._barHeight) 
		{
			this._barHeight = this._progressBarBg.height;
		}

		this._progressBarBg.width=this._barWidth;
		this._progressBarBg.height=this._progressBarBg.height;
		this.progressBar.width=this._barWidth-offX;
		this.progressBar.height=this._barHeight-offY;
	}

	/**
	 * 设置进度
	 * @param percent 	进度 0～1
	 * @param textStr 	文字
	 * @param textColor 文字颜色
	 */
	public setPercentage(percent:number,textStr?:string,textColor?:number)
    {
		this.percents = percent;
        if(this._mask==null)
		{
			this._mask = new egret.Rectangle(0, 0, this.progressBar.width * percent, this.progressBar.height);
		}
		else
		{
			this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
		}
		if(this.progressBarClip){
			this._mask.setTo(0, 0, this.progressBarClip.width * percent, this.progressBarClip.height);
			this.progressBarClip.mask = this._mask;
		}
		else{
			this.progressBar.mask = this._mask;
		}
        
		if(this.progressBarLight)
		{
			this.progressBarLight.x=this.progressBar.x+this._mask.width-this.progressBarLight.width/2;
		}

		if(this._textLb)
		{
			if(textStr!=null)
			{
				this.setText(textStr);
			}
			if(textColor)
			{
				this.setTextColor(textColor);
			}
		}
		if(this._dragIcon){
			this.checkDragIcon(percent);
		}
	}

	private checkDragIcon(percent:number):void
	{	
		if (percent<0)
		{
			percent = 0;
			this._dragIcon.visible = false;
		}
		else if (percent>1)
		{
			percent =1;
			this._dragIcon.visible = false;
		}
		else
		{
			this._dragIcon.visible = true;
		}

		this._dragIcon.setPosition(this.progressBar.x+this.progressBar.width * percent -this._dragIcon.width/2,this._dragIcon.y);
	}
	
	public resetIconPosition(xPosition):void{
		this._dragIcon.x = xPosition;
	}

	public setIconVisible(flag):void{
		this._dragIcon.visible = flag;
	}

	public getBgWidth():number
	{
		return this._progressBarBg?this._progressBarBg.width:0;
	}
	public getBgHeight():number
	{
		return this._progressBarBg?this._progressBarBg.height:0;
	}

	private set percent(percent:number)
	{
		this.setPercentage(percent);
	}

	private get percent():number
	{
		return this.percents;
	}

	public getPercent():number
	{
		return this.percents;
	}

	/**
	 * 设置文字大小
	 * @param s 文字大小
	 */
	public setTextSize(s:number):void
	{
		if(s!=null&&this._textLb)
		{
			this._textLb.size=s;
			if (this._textLb.text == "") {
				this._textLb.text = "0/0";
				this._textLb.setPosition((this._progressBarBg.width-this._textLb.width)*0.5+this._textLb.anchorOffsetX,(this._progressBarBg.height-this._textLb.height)*0.5+this._textLb.anchorOffsetY);
				this._textLb.text = "";
			}
			else {
				this._textLb.setPosition((this._progressBarBg.width-this._textLb.width)*0.5+this._textLb.anchorOffsetX,(this._progressBarBg.height-this._textLb.height)*0.5+this._textLb.anchorOffsetY);
			}
		}
	}

	/**
	 * 设置文字
	 * @param textStr 	文字
	 */
	public setText(textStr:string):void
	{
		if(textStr!=null&&this._textLb)
		{
			try
			{
				this._textLb.text=textStr;
				this._textLb.x = (this._progressBarBg.width-this._textLb.width)*0.5 + this._textLb.anchorOffsetX;

			}
			catch(e)
			{
				App.LogUtil.log(e)
			}
		}
	}


	/**
	 * 设置文字颜色
	 * @param textColor 文字颜色
	 */
	public setTextColor(textColor:number):void
	{
		if(textColor&&this._textLb)
		{
			this._textLb.textColor=textColor;
		}
	}

	/**
	 * 进度条添加动画
	 */
	public TweenTxt(time : number):void{
		let self = this;
		egret.Tween.get(self._textLb).to({scaleX : 1.3, scaleY : 1.3}, time).to({scaleX : 0.8, scaleY : 0.8}, time).to({scaleX : 1, scaleY : 1}, time);
	}

	/**
	 * 进度条添加动画
	 * @param endPercent 结束进度
	 * @param time 一整次从0到1播放的时间毫秒
	 * @param stepNum 播放几个整次，适用于升级时候传差值，不传只播放一次动画
	 * @param callback完成回调
	 * @param callbackThisObj 回调拥有对象
	 */
	public tweenTo(endPercent:number,time:number,stepNum?:number,callback?:Function,callbackThisObj?:any,type?:number):void
	{
		if(stepNum)
		{
			let ths=this;
			egret.Tween.get(this).to({percent:1},(1-this.percent)*time).call(function(stepNum:number){
				egret.Tween.removeTweens(ths);
				ths.tweenNext(time,endPercent,stepNum,callback,callbackThisObj);
			},this,[stepNum-1]);
		}
		else
		{
			let nextTime = endPercent-this.percent;
			if(nextTime <0)
			{
				if(type == 1){
					nextTime = Math.abs(nextTime);
				} else {
					nextTime = 0;
				}
			}
			egret.Tween.get(this).to({percent:endPercent},nextTime*time).call(function(){
				if(callback)
				{
					callback.apply(callbackThisObj);
				}
			},this);
		}
	}

	private tweenNext(time:number,endPercent:number,stepNum?:number,callback?:Function,callbackThisObj?:any):void
	{
		let ths=this;
		egret.Tween.removeTweens(this);
		this._tweenTo=null;
		if(!this._tweenTo)
		{
			this._tweenTo=egret.Tween.get(this);
		}
		this.percent=0;
		if(stepNum>0)
		{
			this._tweenTo.to({percent:1},time).call(this.tweenNext,this,[time,endPercent,stepNum-1,callback,callbackThisObj]);
		}
		else
		{
			this._tweenTo.to({percent:endPercent},time*endPercent).call(function(){
				egret.Tween.removeTweens(ths);
				ths._tweenTo=null;
				if(callback)
				{
					callback.apply(callbackThisObj);
				}
			},this);
		}
	}

	public setDragIcon(resstr:string):void{
		this._dragIcon = BaseBitmap.create(resstr);
		this._dragIcon.setPosition(this.progressBar.x-this._dragIcon.width/2,this.progressBar.y+(this.progressBar.height-this._dragIcon.height)/2);
		this.addChild(this._dragIcon);
		this.height =  this.progressBar.height; 
	}

	public changeRes(res : string, res2 : string, isClip : boolean = false, clipNum? : number, duration? : number, width?:number, height?:number):void{
		if(isClip){
			if(!this.progressBarClip){
				let progressFire = ComponentManager.getCustomMovieClip(res, clipNum, duration);
				progressFire.width = width;
				progressFire.height = height;
				progressFire.x = this._progressBarBg.x+(this._progressBarBg.width-progressFire.width)*0.5;
				progressFire.y=this._progressBarBg.y+(this._progressBarBg.height-progressFire.height)*0.5-5;
				this.progressBarClip = progressFire;
				this.addChild(progressFire);
				progressFire.playWithTime(-1);
			}
			this.progressBar.visible = false;
		}
		else{
			this.progressBar.setRes(res);
			this.progressBar.visible = true;
		}
		this._progressBarBg.setRes(res2);
	}

	public dispose():void
	{
		
		BaseBitmap.release(this._progressBarBg);
		this._progressBarBg = null;
		BaseBitmap.release(this.progressBar);
		this.progressBar = null;
		this.progressBarResName = null;
		this._progressBarBgResName = null;
		this._barWidth = null;
		this._barHeight = null;
		this._textLb.dispose();
		this._textLb = null;
		this.percents = null;
		this._mask = null;
		this._tweenTo=null;
		this.progressBarLight=null;
		this._dragIcon = null;
		if(this.progressBarClip){
			this.progressBarClip.dispose();
			this.progressBarClip = null;
		}
		super.dispose();
	}
}