/**
 * DinnerView 上的桌子
 * author shaoliang
 * date 2017/11/4
 * @class DinnerDesk
 */

class DinnerDesk extends BaseDisplayObjectContainer
{
	private _uid:number = 0;
	private _dtype:number = 0;
	private _numText:BaseTextField = null;
	private _numBg:BaseBitmap = null;

	private _callbackF:Function = null;
	private _obj:any = null;
	private _clickedIdx:number = 0;

	public constructor() {
		super();
	}

	public init(info:any,f:Function,o:any,idx:number):void
	{
		this._obj = o;
		this._callbackF = f;
		this._clickedIdx = idx;

		this._dtype = info.dtype;
		this._uid = info.uid;

		let deskStr:string = "dinner_desk"+this._dtype;
		let nameBgStr:string = "dinner_name_bg"+this._dtype;
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;

		let nameBg = BaseBitmap.create(nameBgStr);
		nameBg.width = 190;
		nameBg.height = 44;

		let desk:BaseButton = ComponentManager.getButton(deskStr,null,f,o,[idx],1);

		// if (idx < 2) {
		// 	desk.setScale(130/desk.width);
		// 	// nameBg.setScale(0.8);
		// }
		// else if (idx < 2) {
		// 	desk.setScale(148/desk.width);
		// 	// nameBg.setScale(0.9);
		// }
		// else {
			
		// }

		if (this._dtype ==1) {
			desk.setScale(175/desk.width);
		}
		else {
			desk.setScale(195/desk.width);
		}

		desk.x = nameBg.width/2 - desk.width/2*desk.scaleX +11;

		this.addChild(desk);

		if (this._dtype ==1) {
			nameBg.y = desk.height*desk.scaleY - nameBg.height*nameBg.scaleY;
		}
		else {
			nameBg.y = desk.height*desk.scaleY - nameBg.height*nameBg.scaleY;
		}
		
		this.addChild(nameBg);

		let nameText:BaseTextField = ComponentManager.getTextField(info.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameText.setPosition(nameBg.width/2 - nameText.width/2 , nameBg.y + nameBg.height/2 - nameText.height/2);
		this.addChild(nameText);

		if (this._dtype == 1) {
			nameText.textColor = TextFieldConst.COLOR_QUALITY_BLUE;
		}
		else {
			nameText.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
		}

		this._numBg = BaseBitmap.create("public_itemtipbg2");
		this._numBg.setPosition(nameBg.width/2 - this._numBg.width/2, nameBg.y - this._numBg.height);
		this.addChild(this._numBg);
		

		this._numText = ComponentManager.getTextField(info.num + "/" + totalNum,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._numText.x = this._numBg.x + this._numBg.width/2 - this._numText.width/2;
		this._numText.y = this._numBg.y + this._numBg.height/2 - this._numText.height/2;
		this.addChild(this._numText);

		if (info.uid == Api.playerVoApi.getPlayerID())
		{
			let interDinner:BaseBitmap = BaseBitmap.create("dinner_tip");
			interDinner.setPosition(95-interDinner.width/2,0);
			this.addChild(interDinner);

			let itismine:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinner_mine"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			itismine.setPosition(interDinner.x+interDinner.width/2 - itismine.width/2 , interDinner.y + interDinner.height/2 - itismine.height/2 -6);
			this.addChild(itismine);
		}

	}

	public setCurNum(num:number):void
	{	
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;
		this._numText.text =num + "/" + totalNum;
		this._numText.x = this._numBg.x + this._numBg.width/2 - this._numText.width/2;
	}

	public get uid():number
	{
		return this._uid;
	}
	public get dtype():number
	{
		return this._dtype;
	}

	public dispose():void 
	{	
		this._uid = 0;
		this._dtype = 0;
		this._numText =null;
		this._numBg = null;

		this._callbackF = null;
		this._obj = null;
		this._clickedIdx = 0;

		super.dispose();
	}
}