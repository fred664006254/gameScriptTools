class CheckBox extends BaseDisplayObjectContainer
{
	private _isSelected:boolean=false;
	private _selectBox:BaseBitmap;
	private _txt:BaseTextField;

	private _selectDownRes = "public_select_down";
	private _selectRes = "public_select";

	private _callback = null;
	private _target = null;
	public constructor() 
	{
		super();
	}

	/**
	 * desc 描述
	 * notouch 是否添加点击事件
	 * textsize 描述尺寸
	 * textcolor 描述颜色
	 * selectdownres 点击后的图片
	 * selectres 点击前的图片
	 */
	public init(desc:string,noTouch?:boolean,textSize?:number,textColor?:number,selectDownRes?:string,selectRes?:string):void
	{
		if(selectDownRes){
			this._selectDownRes = selectDownRes;
		}
		if(selectRes){
			this._selectRes = selectRes;
		}


		this._selectBox=BaseBitmap.create(this._selectRes);
		
		if(! noTouch)
		{
			this._selectBox.addTouchTap(this.selectHandler,this);
		}
		this.addChild(this._selectBox);
		if(desc)
		{
			this._txt=ComponentManager.getTextField(desc,textSize?textSize:TextFieldConst.FONTSIZE_CONTENT_SMALL,textColor?textColor:TextFieldConst.COLOR_WARN_YELLOW);
			this._txt.setPosition(this._selectBox.x+this._selectBox.width+5,this._selectBox.y+(this._selectBox.height-this._txt.height)/2);
			this.addChild(this._txt);
		}
	}
	public setCallback(callback:any, target:any){
		this._callback = callback;
		this._target = target;
	}
	private selectHandler():void
	{
		this.isSelected=!this.isSelected;
		SoundManager.playEffect(SoundConst.EFFECT_CLICK);

		if(this._callback && this._target){
			this._callback.apply(this._target,[this.isSelected]);
		}
	}

	private set isSelected(_isSelected:boolean)
	{
		this._isSelected=_isSelected;
		this._selectBox.texture=ResourceManager.getRes(this._isSelected?this._selectDownRes:this._selectRes);
	}
	private get isSelected():boolean
	{
		return this._isSelected;
	}

	public checkSelected():boolean
	{
		return this.isSelected;
	}

	public setSelected(_isSelected:boolean):void
	{
		this.isSelected=Boolean(_isSelected);
	}

	public dispose():void
	{
		this._isSelected=false;
		this._selectBox=null;
		this._txt=null;
		this._callback = null;
		this._target = null;
		super.dispose();
	}
}