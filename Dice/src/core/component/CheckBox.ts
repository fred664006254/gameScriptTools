class CheckBox extends BaseDisplayObjectContainer
{
	private _isSelected:boolean=false;
	private _selectBox:BaseBitmap;
	private _txt:BaseTextField;
	private _resurl = '';
	private _handler:(target:CheckBox,params:any[])=>void=null;
	private _handlerObj:any=null;
	private _params:any[]=null;
	public constructor() 
	{
		super();
		// x90,
	}

	public init(desc:string,res?:string,fontsize?:number):void
	{
		if(!res){
			res = `public_select`;
		}
		if(!fontsize){
			fontsize = TextFieldConst.SIZE_CONTENT_COMMON;
		}
		this._resurl = res;
		this._selectBox=BaseBitmap.create(res);
		this._selectBox.addTouchTap(this.selectHandler,this);
		this.addChild(this._selectBox);

		if(desc)
		{
			this._txt=ComponentMgr.getTextField(desc,fontsize);
			this._txt.setPosition(this._selectBox.x+this._selectBox.width+5,this._selectBox.y+(this._selectBox.height-this._txt.height)/2);
			this.addChild(this._txt);
		}
	}
	
	public selectHandler():void
	{
		this.isSelected=!this.isSelected;
		if(this._handler)
		{
			this._handler.apply(this._handlerObj,[this,this._params]);
		}
		SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
	}

	public addChangeStatusHanlder(handler:(target:CheckBox,params:any[])=>void,hanlderObj:any,params?:any[]):void
	{
		this._handler=handler;
		this._handlerObj=hanlderObj;
		this._params=params;
	}

	private set isSelected(_isSelected:boolean)
	{
		this._isSelected=_isSelected;
		this._selectBox.texture=ResMgr.getRes(this._isSelected?`${this._resurl}_down`:this._resurl);
	}
	private get isSelected():boolean
	{
		return this._isSelected;
	}

	public removeClilck():void{
		this._selectBox.removeTouchTap();
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
		this._handler=this._handlerObj=this._params=null;
		super.dispose();
	}
}