class ResBar extends BaseDisplayObjectContainer
{
	private _bg:BaseBitmap;
	private _numTxt:BaseTextField;
	private _type:string|number;
	public constructor()
	{
		super();
	}

	public init(type:string|number,isAutoRefresh?:boolean,width?:number):void
	{
		if(typeof(type)!="number")
		{
			type=ItemEnums[type];
		}
		this._type=type;
		this._bg=BaseBitmap.create("public_9_resbg");
		this.addChild(this._bg);

		let resIcon:BaseBitmap=BaseBitmap.create("public_icon"+this._type);
		this.addChild(resIcon);
		
		this._numTxt=ComponentMgr.getTextField(String(this.getResNum()),TextFieldConst.SIZE_CONTENT_COMMON);
		this._numTxt.setPosition(50,this._bg.y+(this._bg.height-this._numTxt.height)/2);

		// if(this._type==3)
		// {
		// 	let str =Api.playerVoApi.getFoodStr();
		// 	this._numTxt.text =str;
		// }

		// if(this._type==2)
		// {
		// 	let str =Api.playerVoApi.getPlayerGoldStr();
		// 	this._numTxt.text =str;
		// }
		// if(this._type==1)
		// {
		// 	let str =Api.playerVoApi.getPlayerGemStr();
		// 	this._numTxt.text =str;
		// }

		this.addChild(this._numTxt)

		if(width)
		{
			this._bg.width=width;
		}
		if(isAutoRefresh)
		{
			App.MsgHelper.addEvt(MsgConst.MODEL_USERINFO,this.refresh,this);
		}
	}
	private getResNum():number
	{
		// return Api.playerVoApi.getValueByResType(this._type);
		return 1;
	}

	private refresh():void
	{
		if(this._numTxt)
		{
			// this._numTxt.text=String(this.getResNum());
			// if(this._type==3)
			// {
			// 	let str =Api.playerVoApi.getFoodStr();
			// 	this._numTxt.text =str;
			// }

			// if(this._type==2)
			// {
			// 	let str =Api.playerVoApi.getPlayerGoldStr();
			// 	this._numTxt.text =str;
			// }
			// if(this._type==1)
			// {
			// 	let str =Api.playerVoApi.getPlayerGemStr();
			// 	this._numTxt.text =str;
			// }
		}
	}

	public setResNum(resNum:number):void
	{

	}

	public dispose():void
	{
		this._bg=null;
		this._numTxt=null;
		App.MsgHelper.removeEvt(MsgConst.MODEL_USERINFO,this.refresh,this);
		super.dispose();
	}
}