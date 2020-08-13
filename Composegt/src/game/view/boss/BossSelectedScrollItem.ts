/**
 * 关卡boss战 选择门客cell
 * author shaoliang
 * date 2017/10/10
 * @class BossSelectedScrollItem
 */

class BossSelectedScrollItem extends ServantSelectedScrollItem
{
	// 属性文本
	private _selectedIndex2:number = 0;
	protected _servantInfo:any;
	protected _useBtn:BaseButton;
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this._selectedIndex2 = index;
		this._servantInfo = data;
		let bg:BaseBitmap = BaseBitmap.create("public_listbg3");
		bg.width = 524;
		bg.height = 135;
		this.height = bg.height + this.getSpaceY();
		this.addChild(bg);

		// let leftBg = BaseBitmap.create("public_left");
		// leftBg.width = 129;
		// leftBg.height = 106.5;
		// leftBg.x = 5.5;//17;
		// leftBg.y = 5.5;
		// this.addChild(leftBg);

		let servantInfoVo:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantInfo[0]);
		this.initServantIcon(servantInfoVo);

		this.initServantInfo();
		this.checkUseBtn(bg);
		
	}
	public getSpaceY():number
	{
		return 5;
	}
	protected checkUseBtn(bg:BaseBitmap):void
	{	
		if (this._servantInfo[1] ==1){
			let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.confirmRecoveryHandler,this);
			// useBtn.setColor(TextFieldConst.COLOR_BLACK);
			useBtn.x = bg.width - useBtn.width - 15;
			useBtn.y = bg.height/2 - useBtn.height * useBtn.scaleY /2;
			this.addChild(useBtn);
			this._useBtn=useBtn;
		}
		else if(this._servantInfo[1]==2)
		{
			let goneIcon:BaseBitmap = BaseBitmap.create("boss_gotowar");
			goneIcon.setPosition(375,23);
			this.addChild(goneIcon);
		}
		else {
			let useBtn:BaseButton = ComponentManager.getButton(this.getBtnResName(),this.getBtnLocalName(),this.clickBtnHandler,this);
			// useBtn.setColor(TextFieldConst.COLOR_BLACK);
			useBtn.x = bg.width - useBtn.width - 15;
			useBtn.y = bg.height/2 - useBtn.height * useBtn.scaleY /2;
			this.addChild(useBtn);
			this._useBtn=useBtn;
		}
	}

	protected confirmRecoveryHandler():void
	{
		let itemId:string=Config.DailybossCfg.needItem;
		let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
		let itemUseCount = 1;
		let itemCount = hasNum;
		let itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
		let message: string = LanguageManager.getlocal("useItemMsg", [itemCfg.name + "x" +itemUseCount, LanguageManager.getlocal("dailybossRecoveryBattleNumDesc")]);
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.recoveryHandler, handler: this, icon: itemCfg.icon,iconBg: itemCfg.iconBg, num: itemCount, useNum:itemUseCount,msg: message,id : itemId});
	}

	protected receiveData(e:egret.Event):void
	{
		let data:{ret:boolean,data:any}=e.data;
		if(data.ret)
		{
			if(this._useBtn)
			{
				let {x,y}=this._useBtn;
				this._useBtn.dispose();
				let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"gotowar",this.clickBtnHandler,this);
				useBtn.setPosition(x,y);
				this.addChild(useBtn);
				this._useBtn=useBtn;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("dailybossRecoveryBattleSuccessDesc"));
		}
	}

	protected recoveryHandler():void
	{	
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_RECOVER,this.receiveData,this);
		NetManager.request(NetRequestConst.REQUEST_CHALLENGE_RECOVER,{servantId:this._servantInfo[0]});
	}

		/** 按钮图片 */
	protected getBtnResName():string
	{	
		if (this._servantInfo[1] == 1){
			return ButtonConst.BTN_SMALL_ORANGE;
		}
		else {
			return ButtonConst.BTN_SMALL_YELLOW;
		}
		
	}
	/**按钮文字 */
	protected getBtnLocalName():string
	{
		if (this._servantInfo[1] == 1){
			return "manageRecoveryBtn";
		}
		else {
			return "gotowar";
		}
	}

	/**等级按钮事件，可重写 */
	protected clickBtnHandler(param:any):void
	{	
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT,{"key":this._servantInfo[0]});
	}

	/**重写该方法 */
	protected initServantInfo():void
	{
		let servantInfoVo:ServantInfoVo = Api.servantVoApi.getServantObj(this._servantInfo[0]);

        // let nameBg = BaseBitmap.create("public_biaoti2");
        // nameBg.x = 160;
        // nameBg.y = 10 ;

		let nameTF:BaseTextField = ComponentManager.getTextField( servantInfoVo.servantName,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		nameTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		// nameTF.x = 120;
		// nameTF.y = 15;

		// nameBg.width = 140;
		nameTF.x = 160;//nameBg.x + nameBg.width/2 - nameTF.width/2;
		nameTF.y = 20;//nameBg.y + nameBg.height/2 - nameTF.height/2;


		// this.addChild(nameBg);
		this.addChild(nameTF);

		let levelTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + servantInfoVo.level,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		levelTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		levelTF.x = nameTF.x;//120;
		levelTF.y = 50;
		this.addChild(levelTF);

		let attrTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("fightForce")+ ":" + this._servantInfo[2],TextFieldConst.FONTSIZE_CONTENT_SMALL);
		attrTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		attrTF.x = levelTF.x;
		attrTF.y = 80;
		this.addChild(attrTF);

	}	

	public dispose():void
    {	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_RECOVER,this.receiveData,this);
		this._selectedIndex2 = null;
		this._servantInfo = null;
		this._useBtn=null;

        super.dispose();
    }

}