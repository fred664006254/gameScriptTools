
class AcSingleDayCouponItem extends ScrollListItem
{
	private _numTF:BaseTextField = null;
	private _itemInfoVo:ItemInfoVo = null;
	private _isGray:boolean = false;

	private _equipedIcon:BaseBitmap = null;
	private _shinneIcon:BaseBitmap = null;
	private _itembg:BaseBitmap = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any):void
	{
		this._itemInfoVo = data;

		if (data.id == -1){
			let itembg: BaseBitmap = BaseBitmap.create("itembg_0");
			itembg.x = itembg.y = 5;
			this.addChild(itembg);
			return;
		}
		let icon = GameData.getRewardItemIcons(`1002_${data.id}_${data.num}_${data.value}`)[0];
		icon.x = icon.y = 5;
		this.addChild(icon);

		// this._numTF = ComponentManager.getTextField(data.num,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		// this._numTF.x = icon.x + icon.width - this._numTF.width - 5;
		// this._numTF.y = icon.y + icon.height - this._numTF.height - 5;
		//this.addChild(this._numTF);
	}

	public setIsGray(isGray:boolean):void
	{
		if (isGray != this._isGray) {

			if (isGray) {
				App.DisplayUtil.changeToGray(this);
			}
			else {
				App.DisplayUtil.changeToNormal(this);
			}
			this._isGray = isGray;
		}
	}

	public update():void
	{
		if(this._numTF)
		{
			this._numTF.text = String(this._itemInfoVo.num);
			this._numTF.x = this._itembg.x + this._itembg.width - this._numTF.width - 5;
		}
		if (this._itemInfoVo.type == 3 ) {
			this.setIsGray(this._itemInfoVo.num == -1);

			if (this._itemInfoVo.num > 0  && this._shinneIcon) {
				egret.Tween.removeTweens(this._shinneIcon);
				this.removeChild(this._shinneIcon);
				this._shinneIcon=null;
			}
			else if (this._itemInfoVo.num == 1 && this._equipedIcon ){
				this.removeChild(this._equipedIcon);
				this._equipedIcon=null;
			}
			else if (this._itemInfoVo.num == 2 && this._equipedIcon == null ){
				this._equipedIcon = BaseBitmap.create("itemicon_equiped");
				this._equipedIcon.x = this._equipedIcon.y = 5;
				this.addChild(this._equipedIcon);
			}

		}
	}

	public getSpaceX():number
	{
		return 13;
	}

	public getSpaceY():number
	{
		return 18;
	}

	public dispose():void
	{	
		if (this._isGray) {
			App.DisplayUtil.changeToNormal(this);
		}
		this._isGray = false;

		if(this._numTF)
		{
			this.removeChild(this._numTF);
			this._numTF.dispose();
			this._numTF = null;
		}
		this._itemInfoVo = null;
		this._equipedIcon = null;
		if (this._shinneIcon) {
			egret.Tween.removeTweens(this._shinneIcon);
		}
		this._shinneIcon = null;
		this._itembg = null;
		super.dispose();
	}
}