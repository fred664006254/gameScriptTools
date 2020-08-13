class ResBar extends BaseDisplayObjectContainer
{
	private _bg:BaseBitmap;
	private _numTxt:BaseTextField;
	private _type:string|number;
	private _isPlaying:boolean = false;
	private _isShowAni:boolean = false;
	public _levyRate:number = 0;
	public constructor()
	{
		super();
	}

	public init(type:string|number,isAutoRefresh?:boolean,width?:number,color?:number):void
	{
		if(typeof(type)!="number")
		{
			type=ItemEnums[type];
		}
		this._type=type;
		this._bg=BaseBitmap.create("public_hb_bg03");
		this._bg.x = 10
		this.addChild(this._bg);

		let resIcon:BaseBitmap=BaseBitmap.create("public_icon"+this._type);
		resIcon.y = -10
		this.addChild(resIcon);
		
		this._numTxt=ComponentManager.getTextField(String(this.getResNum()),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._numTxt.setPosition(55,this._bg.y+(this._bg.height-this._numTxt.height)/2+2);
		if(this._type==2)
		{
			let str =Api.playerVoApi.getPlayerGoldStr();
			this._numTxt.text =str;
		}
		if(this._type==1)
		{
			let str =Api.playerVoApi.getPlayerGemStr();
			this._numTxt.text =str;
		}

		this.addChild(this._numTxt)

		if(width)
		{
			this._bg.width=width;
		}
		if(isAutoRefresh)
		{
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.refresh,this);
			App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		}
	}
	private getResNum():string
	{
		return Api.playerVoApi.getValueByResType(this._type);
	}

	private refresh():void
	{
		this.setResNum(this.getResNum());
	}

	public setResNum(resNum:string):void
	{
		if(this._numTxt && !this._isPlaying)
		{
			if(this._numTxt.text != String(resNum)){
				this._numTxt.text=String(resNum);
				if(this._isShowAni){
					this._isPlaying = true;
					this._numTxt.anchorOffsetX = this._numTxt.width/2;
					this._numTxt.anchorOffsetY = this._numTxt.height/2;
					this._numTxt.setPosition(55+this._numTxt.width/2,this._bg.y+(this._bg.height-this._numTxt.height)/2+2+this._numTxt.height/2);
					egret.Tween.get(this._numTxt)
					.to({scaleX:1.1,scaleY:1.1},200)
					.to({scaleX:1,scaleY:1},200)
					.call(()=>{
						this._isPlaying = false;
						egret.Tween.removeTweens(this._numTxt);
					},this)
				}
			}
		}
	}

	public set levyRate(levyRate:number){
		if(levyRate>this._levyRate){
			let addRateStr = LanguageManager.getlocal("levy_addnum",["+",App.StringUtil.changeIntToText3(levyRate - this._levyRate)]);
			this.setRateAddEffect(addRateStr);
		}
		this._levyRate = levyRate;
	}

	public setRateAddEffect(addRateStr:string):void
	{

		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		// this.addChild(container);
		LayerManager.msgLayer.addChild(container);
		let pos = this.localToGlobal(0,0)

		let bgPic = "public_itemtipbg";
		let numBg = BaseBitmap.create(bgPic);
		container.addChild(numBg);

		let iconBt = BaseBitmap.create("public_icon"+this._type);
		iconBt.setScale(0.7);
		iconBt.x = -10;
		container.addChild(iconBt);

		let msgTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(addRateStr,TextFieldConst.FONTNAME_ITEMTIP);
		msgTF.setScale(0.7);
		msgTF.x = iconBt.width * iconBt.scaleX;
		msgTF.y = numBg.y + numBg.height/2 - msgTF.height*msgTF.scaleY/2;

		numBg.width = msgTF.width + 50;
		container.addChild(msgTF);
		container.x = this.width/2 - container.width/2 + 10+pos.x;
		container.y = 60+pos.y;
		egret.Tween.get(container).to({y:20},1000).call(()=>{
			container.dispose();
			container = null;
		},this);
	}
	public changeResBgY(offsetY:number){
		this._bg.y += offsetY;
		this._numTxt.y += offsetY;
	}

	public set isShowAni(isShowAni){
		if(this._isShowAni != isShowAni){
			this._isShowAni = isShowAni;
		}
	}

	public dispose():void
	{
		this._bg=null;
		this._numTxt=null;
		this._type = null;
		this._isPlaying= false;
		this._isShowAni = false;
		this._levyRate = 0;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.refresh,this);
		super.dispose();
	}
}