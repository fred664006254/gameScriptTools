
class ItemScrollItem extends ScrollListItem
{
	private _numTF:BaseTextField = null;
	private _itemInfoVo:ItemInfoVo|TitleInfoVo = null;
	private _isGray:boolean = false;

	private _equipedIcon:BaseBitmap = null;
	private _shinneIcon:BaseBitmap = null;
	protected _itembg:BaseBitmap = null;
	private _iconItem:BaseDisplayObjectContainer =null;
	protected _item:any =null;
	private _numbg:BaseBitmap = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,itemInfoVo:ItemInfoVo|TitleInfoVo,type:number=0):void
	{

		if (!itemInfoVo || !itemInfoVo.id)
		{	
			let itembg:BaseLoadBitmap = BaseLoadBitmap.create("itembg_0");
			itembg.x = itembg.y = 5;
			itembg.width =itembg.height = 108;
			this.addChild(itembg); 
			return;
		}

		let unit = null;
		if(type==1)
		{
			let itemCfg =  Config.ItemCfg.getItemCfgById(itemInfoVo.id);  
			let iconItem = GameData.getItemIcon(itemCfg,false,false); 
			iconItem.x =4;
			iconItem.y =4; 
			this.addChild(iconItem);
			this._iconItem = iconItem;
			this._item = iconItem;
		}
		else
		{		
			let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
			itembg.x = itembg.y = 5;
			this.addChild(itembg); 
			this._item = itembg;
			this._itembg = itembg;
			
			let cfg = Config.TitleCfg.getTitleCfgById(itemInfoVo.id);
			if(cfg && cfg.isChangePic()){

			}
			else{
				let item = BaseLoadBitmap.create(itemInfoVo.icon); 
				item.x = itembg.x + itembg.width/2 - 100/2;
				item.y = itembg.y + itembg.height/2 - 100/2;
				unit = item;
				this.addChild(item); 
			}

		}
		this._itemInfoVo = itemInfoVo;
	

		// let itembg:BaseBitmap = BaseBitmap.create(itemInfoVo.iconBg);
		// iconItem.x 0//.x = itembg.y = 5;

		// let item:BaseBitmap = BaseLoadBitmap.create(itemInfoVo.icon); 
		// item.x = itembg.x + itembg.width/2 - 100/2;
		// item.y = itembg.y + itembg.height/2 - 100/2;
		// this.addChild(item);

		// if (itemInfoVo.icon == "itemicon4016")
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("headcircle_anim",10,100);
		// 	headEffect.x = 4;
		// 	headEffect.y = 4; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// if (itemInfoVo.icon == "itemicon4020")
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("title_effect4020_",10,100);
		// 	headEffect.x = 4;
		// 	headEffect.y = 4; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if (itemInfoVo.icon == "itemicon4026")
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4026_effect",12,100);
		// 	headEffect.x = -9;
		// 	headEffect.y = -9; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if (itemInfoVo.icon == "itemicon4031")
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4031_effect",8,100);
		// 	headEffect.x = 5;
		// 	headEffect.y = 0; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4032" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4032_effect",8,100);
		// 	headEffect.x = 13;
		// 	headEffect.y = 8; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4035" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4035_effect",8,100);
		// 	headEffect.x = 17;
		// 	headEffect.y = 10; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4034" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4034_effect",10,100);
		// 	headEffect.x = 17;
		// 	headEffect.y = 10; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4036" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4036_effect",10,100);
		// 	headEffect.x = 17;
		// 	headEffect.y = 10; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4037" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4037_effect",8,100);
		// 	headEffect.x = 17;
		// 	headEffect.y = 10; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4039" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4039_effect",8,100);
		// 	headEffect.x = 25;
		// 	headEffect.y = 18; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		// else if ("itemicon4041" == itemInfoVo.icon)
		// {
		// 	let headEffect = ComponentManager.getCustomMovieClip("head_4041_effect",10,100);
		// 	headEffect.x = 15;
		// 	headEffect.y = 15; 
		// 	headEffect.setScale(0.76);
		// 	this.addChild(headEffect);
		// 	headEffect.playWithTime(0);
		// }
		let eff = App.CommonUtil.getHeadEffect(itemInfoVo.id.toString());
		if(eff && unit){
			this.addChild(eff);
			eff.setScale(0.78);
			eff.setPosition(unit.x + 100 / 2 + 4, (unit.y + 100 / 2 - 1));
		}
		

		this._numTF = ComponentManager.getTextField(String(itemInfoVo.num),16,TextFieldConst.COLOR_WHITE);
		this._numTF.x = this._item.x + this._item.width - this._numTF.width - 5;
		this._numTF.y = this._item.y + this._item.height - this._numTF.height - 5;
		

		let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
		if (itemInfoVo.num>99)
		{
			numbg.width = this._numTF.width+18;
		}
		numbg.name="numbg";
		numbg.setPosition(112-numbg.width-4,112-numbg.height-4);
		this._numTF.setPosition(112-this._numTF.width-12, numbg.y+numbg.height/2-this._numTF.height/2 );
		this._numbg = numbg;
		// numbg.visible = false;

		this.addChild(numbg);
		this.addChild(this._numTF);

		if (this._itemInfoVo.type == 3 || this._itemInfoVo.type == 4 ) {
			this.setIsGray(this._itemInfoVo.num == -1);
			this._numTF.visible = false;
			numbg.visible = false;
			if (this._itemInfoVo.num == 0) {
				this._shinneIcon = BaseBitmap.create("itemicon_shinne");
				this._shinneIcon.x = this._shinneIcon.y = 5;
				this.addChild(this._shinneIcon);
				egret.Tween.get(this._shinneIcon,{loop:true}).to({alpha:0.2},500).to({alpha:1},500);
			}
			else if (this._itemInfoVo.num == 2){
				this._equipedIcon = BaseBitmap.create("itemicon_equiped");
				this._equipedIcon.x = this._equipedIcon.y = 5;
				this.addChild(this._equipedIcon);
			}
		}

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
			if (this._itemInfoVo.num>99)
			{
				this._numbg.width = this._numTF.width+18;
			}
			else
			{
				this._numbg.width = 35;
			}
			this._numbg.setPosition(112-this._numbg.width-4,112-this._numbg.height-4);
			this._numTF.setPosition(112-this._numTF.width-12, this._numbg.y+this._numbg.height/2-this._numTF.height/2 );
			
		}
		if (this._itemInfoVo && this._itemInfoVo.type == 3 ) {
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
		this._numbg = null;
	
		super.dispose();
	}
}