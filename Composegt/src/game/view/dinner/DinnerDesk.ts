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
	// private _zid:string = null;

	public constructor() {
		super();
	}

	public init(info:any,f:Function,o:any,idx:number):void
	{
		if(this._dtype == 1){
			this.width = 194;
			this.height = 193;
		}
		else
		{
			this.width = 204;
			this.height = 205;
		}
		this._obj = o;
		this._callbackF = f;
		this._clickedIdx = idx;

		this._dtype = info.dtype;
		this._uid = info.uid;
		// this._zid = info.zid;
		

		let deskStr:string = "dinner_desk"+this._dtype;
		let nameBgStr:string = "dinner_name_bg"+this._dtype;
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;

		let nameBg = BaseBitmap.create(nameBgStr);
		nameBg.width = 190;
		// nameBg.height = 44;

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
			desk.y = -10;
		}

		desk.x = nameBg.width/2 - desk.width/2*desk.scaleX +11;


		this.addChild(desk);

		if (this._dtype ==1) {
			nameBg.y = desk.height*desk.scaleY - nameBg.height*nameBg.scaleY;
		}
		else {
			nameBg.y = desk.y+ desk.height*desk.scaleY - nameBg.height*nameBg.scaleY;
		}
		
		this.addChild(nameBg);
		let showName = info.name;
		//是否显示服务器
		if(Api.switchVoApi.checkCrossDinner() && !Api.mergeServerVoApi.judgeIsSameServer(Api.mergeServerVoApi.getTrueZid(this._uid), ServerCfg.selectServer.zid)){
			showName = showName + "("+Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.mergeServerVoApi.getTrueZid(this._uid))+")";
		}
		let nameText:BaseTextField = ComponentManager.getTextField(showName,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameText.setPosition(nameBg.width/2 - nameText.width/2 , nameBg.y + nameBg.height/2 - nameText.height/2);
		this.addChild(nameText);

		if (this._dtype == 1) {
			nameText.textColor = TextFieldConst.COLOR_WARN_YELLOW;
		}
		else {
			nameText.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
		}

		this._numBg = BaseBitmap.create("rank_display_namebg");//rank_display_namebg public_itemtipbg2  36 * 30
		this._numBg.scaleX = 0.4;
		this._numBg.scaleY = 0.7;
		this._numBg.setPosition(nameBg.width/2 - this._numBg.width * this._numBg.scaleX / 2, nameBg.y - this._numBg.height * this._numBg.scaleY);
		this.addChild(this._numBg);
		

		this._numText = ComponentManager.getTextField(info.num + "/" + totalNum,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._numText.x = this._numBg.x + this._numBg.width * this._numBg.scaleX / 2 - this._numText.width/2;
		this._numText.y = this._numBg.y + this._numBg.height * this._numBg.scaleY / 2 - this._numText.height/2;
		this.addChild(this._numText);

		//自己的桌子
		if(this._uid == Api.playerVoApi.getPlayerID())
		{
			let myTip = BaseBitmap.create("dinner_mytip");
			myTip.x = nameBg.width / 2 - myTip.width / 2;
			myTip.y = desk.y - myTip.height +30;
			this.addChild(myTip);

			let myText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerMyDesk"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
			myText.x = myTip.x + myTip.width/2 - myText.width/2;
			myText.y = myTip.y + 10;
			this.addChild(myText);
		}


	}

	public setCurNum(num:number):void
	{	
		let totalNum:number = Config.DinnerCfg.getFeastItemCfg(this._dtype).contain;
		this._numText.text =num + "/" + totalNum;
		this._numText.x = this._numBg.x + this._numBg.width * this._numBg.scaleX / 2 - this._numText.width/2;
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
		// this._zid = null;

		super.dispose();
	}
}