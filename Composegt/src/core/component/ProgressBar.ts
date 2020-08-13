/**
 * author shaoliang
 * date 2017/9/12
 * @class ProgressBar
 */
class ProgressBar extends BaseDisplayObjectContainer
{
	/** 进度条进度 0～1 */
    private percents:number;

	private plusPercent:number;

	/** 进度条遮罩 */
    private _mask:egret.Rectangle;
	/** 进度条背景图片 */
	protected _progressBarBg:BaseBitmap;
	/** 进度条背景图片名 */
	private _progressBarBgResName:string;

	/** 进度条增加资源名*/
	private _plusBarResName:string;
	/** 进度条增加图片资源*/
	private _plusBar:BaseBitmap;
	/** 进度条增加特效 */
	private _plusEffectResName: string;
	/** 进度条增加特效 */
	private _plusEffect: BaseBitmap;

	/** 进度条宽度 */
	private _barWidth:number;
	/** 进度条高度 */
	private _barHeight:number;
	/** 进度条中间的显示标签 */
	private _textLb:BaseTextField;
	/** 进度条图片 */
	protected progressBar:BaseBitmap;
	/** 进度条图片名 */
	protected progressBarResName:string;

	private progressBarLight:BaseBitmap;

	private _tweenTo:egret.Tween;

	private _endPercent:number=-1;

	/** 进度标记 */
	protected _dragIcon:BaseBitmap;
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
		this._textLb=  ComponentManager.getTextField("0/0",TextFieldConst.FONTSIZE_CONTENT_SMALL-2); //new BaseTextField();
		this._textLb.width = this._barWidth-20;
		this._textLb.textAlign = egret.HorizontalAlign.CENTER;
		this._textLb.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.setTextPos();
		this.addChild(this._textLb);
		this._textLb.text="";
		if(RES.hasRes(this.progressBarResName+"_light"))
		{
			this.progressBarLight=BaseBitmap.create(this.progressBarResName+"_light");
			this.progressBarLight.setPosition(this.progressBar.x-this.progressBarLight.width/2,this.progressBar.y+(this.progressBar.height-this.progressBarLight.height)/2);
			this.addChild(this.progressBarLight);
		}
	}
	//设置增加效果
	public setPlusEffect(plusBarResName:string ,effectResName?:string):void
	{
		this._plusBarResName = plusBarResName;
		this._plusEffectResName = effectResName;
		//增加bar
		if(this._plusBarResName != null){
			this._plusBar = BaseBitmap.create(this._plusBarResName);
			this._plusBar.y = this._progressBarBg.y+(this._progressBarBg.height-this._plusBar.height)*0.5;
			this._plusBar.visible = false;
			
			let textIndex: number = this.getChildIndex(this._textLb);
			this.addChildAt(this._plusBar,textIndex-1);
		}
		//增加光特效
		if(this._plusEffectResName != null){
			this._plusEffect = BaseBitmap.create(this._plusEffectResName);
			this._plusEffect.y = this._progressBarBg.y+(this._progressBarBg.height-this._plusEffect.height)*0.5;
			this._plusEffect.visible = false;
			let textIndex: number = this.getChildIndex(this._textLb);
		
			this.addChildAt(this._plusEffect,textIndex-1);
		}
	}
	public setPlusValue(percentFrom: number, percentTo:number):void
	{
		if(percentFrom < percentTo){
			this._plusBar.width = this.progressBar.width * (percentTo - percentFrom);
			// this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
		}

	}

	private getType():string
	{
		try
		{
			if(this._progressBarBgResName)
			{
				return String(this._progressBarBgResName.split("_")[1].substr(4));
			}
		}
		catch(e)
		{
			return "";
		}
	}

	private checkScale9Rect():void
	{	
		if(this.getType()=="1")
		{ 
			this.progressBar.width = this._barWidth - 18*2;
			this._progressBarBg.width=this._barWidth;
		}
		else if(this.getType()=="3")
		{
			this.progressBar.width = this._barWidth-18;
			this._progressBarBg.width=this._barWidth
		 
		}
		else
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
	}

	private setTextPos():void
	{
		if(this._textLb)
		{
			if(this.getType()=="1")
			{
				this._textLb.setPosition((this._progressBarBg.width-this._textLb.width)*0.5,3);
			}
			else
			{
				this._textLb.setPosition((this._progressBarBg.width-this._textLb.width)*0.5,(this._progressBarBg.height-this._textLb.height)*0.5);
			}
		}
	}

	/**
	 * 设置进度
	 * @param percent 	进度 0～1
	 * @param textStr 	文字
	 * @param textColor 文字颜色
	 * @param plusPercent 进度显示增加 0～1
	 */
	public setPercentage(percent:number,textStr?:string,textColor?:number,plusPercent?:number)
    {
		
		this.percents = percent;
		this.plusPercent = plusPercent;

		//当前进度大于等于1  重置进度增加值和进度
		if(plusPercent != null && percent >= 1){
			let oldV = percent - plusPercent;
			plusPercent = oldV >= 1 ? 0 : 1 - oldV;
			percent = 1;
			
		}				
		//如果有增加bar的时候 
		if(plusPercent != null && this._plusBar != null && plusPercent >0){
			if(this._mask==null)
			{
				this._mask = new egret.Rectangle(0, 0, this.progressBar.width * (percent - plusPercent), this.progressBar.height);
			}
			else
			{
				this._mask.setTo(0, 0, this.progressBar.width * (percent - plusPercent), this.progressBar.height);
			}
			this.progressBar.mask = this._mask;
			this._plusBar.x = this.progressBar.x + this._mask.x + this._mask.width-1;
			this._plusBar.width = 0;
			this._plusBar.visible = true;
			

			if(this._plusEffect != null){
				this._plusEffect.visible = true;
				this._plusEffect.x = this._plusBar.x + this._plusBar.width - this._plusEffect.width + 6;
			}
			//增长 并显示光
			egret.Tween.get(this._plusBar,{loop:false,onChange:()=>{
				
				if(this._plusEffect != null){
					this._plusEffect.x = this._plusBar.x + this._plusBar.width - this._plusEffect.width + 6;
				}
			}})
			.wait(100)
			.to({width:this.progressBar.width * plusPercent+1},200)
			.wait(200)
			.call(()=>{
				if(this._mask==null)
				{
					this._mask = new egret.Rectangle(0, 0, this.progressBar.width * this.percents, this.progressBar.height);
				}
				else
				{
					this._mask.setTo(0, 0, this.progressBar.width * this.percents, this.progressBar.height);
				}
		
				this.progressBar.mask = this._mask;
			})
			.to({alpha:0},100)
			.call(()=>{
				this._plusBar.visible = false;
				if(this._plusEffect != null){
					this._plusEffect.visible = false;
				}
			});
			
			
			

		} else {
			if(this._mask==null)
			{
				this._mask = new egret.Rectangle(0, 0, this.progressBar.width * percent, this.progressBar.height);
			}
			else
			{
				this._mask.setTo(0, 0, this.progressBar.width * percent, this.progressBar.height);
			}
			this.progressBar.mask = this._mask;
		}


        
		if(this.progressBarLight)
		{
			if(this._mask.width <= this.progressBarLight.width ){
				//进度为0的时候，光效的位置，需要保证在起点右侧 20190429
				this.progressBarLight.x=0;
			}else{
				this.progressBarLight.x=this.progressBar.x+this._mask.width-this.progressBarLight.width/2;
			}
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
			this._dragIcon.setPosition(this.progressBar.x+this.progressBar.width * percent -this._dragIcon.width/2,this._dragIcon.y);
		}
    }


	public resetIconPosition(xPosition):void{
		this._dragIcon.x = xPosition;
	}

	public setIconVisible(flag):void{
		this._dragIcon.visible = flag;
	}

	public setDragIcon(resstr:string):void{
		this._dragIcon = BaseBitmap.create(resstr);
		this._dragIcon.setPosition(this.progressBar.x-this._dragIcon.width/2,this.progressBar.y+(this.progressBar.height-this._dragIcon.height)/2-10);
		this.addChild(this._dragIcon);
		this.height =  this.progressBar.height; 
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
				this.setTextPos();
				this._textLb.text = "";
			}
			else {
				this.setTextPos();
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
				this._textLb.x = (this._progressBarBg.width-this._textLb.width)*0.5;

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
	 * @param ruduce 是否是减少，如减少则从右到左走进度条，默认增加，增加是从左到右走进度条
	 */
	public tweenTo(endPercent:number,time:number,stepNum?:number,callback?:Function,callbackThisObj?:any,ruduce?:boolean,fixedTime?:boolean):void
	{
		if(this._endPercent>-1)
		{
			egret.Tween.removeTweens(this);
			this._tweenTo=null;
			this.setPercentage(this._endPercent);
		}
		this._endPercent=endPercent;
		if(stepNum)
		{
			let ths=this;
			let toPercent=ruduce?0:1;
			let timeScale=ruduce?this.percent:(1-this.percent);
			if(fixedTime&&timeScale>0)
			{
				timeScale=1;
			}
			egret.Tween.get(this).to({percent:toPercent},timeScale*time).call(function(stepNum:number){
				egret.Tween.removeTweens(ths);
				ths.tweenNext(time,endPercent,stepNum,callback,callbackThisObj,ruduce);
			},this,[stepNum-1]);
		}
		else
		{
			let nextTime = endPercent-this.percent;
			if(nextTime <0)
			{
				nextTime = Math.abs(nextTime);
				// if(type == 1){
				// } else {
				// 	nextTime = 0;
				// }
			} 
			if(fixedTime&&nextTime>0)
			{
				nextTime=1;
			}
			egret.Tween.get(this).to({percent:endPercent},nextTime*time).call(function(){
				this._endPercent=-1;
				if(callback)
				{
					callback.apply(callbackThisObj);
				}
			},this);
		}
	}

	private tweenNext(time:number,endPercent:number,stepNum?:number,callback?:Function,callbackThisObj?:any,ruduce?:boolean):void
	{
		let ths=this;
		egret.Tween.removeTweens(this);
		this._tweenTo=null;
		if(!this._tweenTo)
		{
			this._tweenTo=egret.Tween.get(this);
		}
		this.percent=ruduce?1:0;
		if(stepNum>0)
		{
			let stepEtPercent=ruduce?0:1;
			this._tweenTo.to({percent:stepEtPercent},time).call(this.tweenNext,this,[time,endPercent,stepNum-1,callback,callbackThisObj,ruduce]);
		}
		else
		{
			this._tweenTo.to({percent:endPercent},time*endPercent).call(function(){
				egret.Tween.removeTweens(ths);
				ths._tweenTo=null;
				this._endPercent=-1;
				if(callback)
				{
					callback.apply(callbackThisObj);
				}
			},this);
		}
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

		if(this._plusBar != null){
			egret.Tween.removeTweens(this._plusBar);
		}
		/** 进度条增加资源名*/
		this._plusBarResName = null;
		/** 进度条增加图片资源*/
		this._plusBar = null;
		/** 进度条增加特效 */
		this._plusEffectResName = null;
		/** 进度条增加特效 */
		this._plusEffect = null;
		this._endPercent=-1;
		
		super.dispose();
	}
}