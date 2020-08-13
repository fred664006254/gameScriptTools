/**
 *帮会成员
 * author dky
 * date 2017/12/2
 * @class AllianceTurnScrollItem
 */
class AllianceTurnScrollItem extends ScrollListItem
{

	private _applyData:AllianceMemberInfoVo = null;
	// private _applyBtn:BaseButton;
	// private _cancelApplyBtn:BaseButton;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,allianceMemberVo:AllianceMemberInfoVo):void
	{
		this.width = 510;
		this.height = 156  + this.getSpaceY();
		
		// childInfo.total
		this._applyData = allianceMemberVo;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = this.width;
		bg.height = 156;
		// bg.x = 5;

		this.addChild(bg);



		let nameStr = allianceMemberVo.name + "(" + LanguageManager.getlocal("allianceMemberPo" + allianceMemberVo.po) +")"
		this._nameTf = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._nameTf.x = 23;
		this._nameTf.y = 15;
		this.addChild(this._nameTf);

		if(allianceMemberVo.uid == Api.playerVoApi.getPlayerID()){
			this._nameTf.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
		}

		let lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = 40;
        this.addChild(lineImg);

		let posBg:BaseBitmap = BaseBitmap.create("public_chatheadbg");
		posBg.x = 20;
		posBg.y = 50;
        this.addChild(posBg)

        // this.addTouch(this.eventHandler,this,null);	

		let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(allianceMemberVo.pic),rect1);
		posBB.x = 20;
		posBB.y = 50 -7;
        posBB.setScale(2/3);
		this.addChild(posBB);

		let leadStr = LanguageManager.getlocal("allianceMemberInfo1",[ allianceMemberVo.power.toString()]);
		let leadTF = ComponentManager.getTextField(leadStr,18,TextFieldConst.COLOR_BROWN);
		leadTF.x = 120;
		leadTF.y = this._nameTf.y + this._nameTf.height + 14;
		this.addChild(leadTF);

		let attrStr = LanguageManager.getlocal("allianceMemberInfo2",[Api.playerVoApi.getPlayerOfficeByLevel(allianceMemberVo.level)]);
		let attrTF = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
		attrTF.x = 120;
		attrTF.y = leadTF.y + leadTF.height + 7;
		this.addChild(attrTF);


		let conStr = LanguageManager.getlocal("allianceMemberInfo3",[allianceMemberVo.ctv + "/" + allianceMemberVo.tctv]);
		let conrTF = ComponentManager.getTextField(conStr,18,TextFieldConst.COLOR_BROWN);
		conrTF.x = 120;
		conrTF.y = attrTF.y + attrTF.height + 7;
		this.addChild(conrTF);

		 let timeDis = GameData.serverTime - allianceMemberVo.logindt;
		let timeStr = LanguageManager.getlocal("allianceMemberInfo4",[App.DateUtil.getFormatBySecond(timeDis,4)]);
		let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
		timeTF.x = 120;
		timeTF.y = conrTF.y + conrTF.height + 7;
		this.addChild(timeTF);


		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo()
		// if(myAllianceVo.po == 1 && allianceMemberVo.uid != Api.playerVoApi.getPlayerID()){
			//choose
			let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"alliance_turn",this.chooseBtnClick,this);
			chooseBtn.x = 360;
			chooseBtn.y = 95;
			this.addChild(chooseBtn);
			chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

		// }
		
		
	}


	 private chooseBtnClick()
    {
		let rewardStr = LanguageManager.getlocal("alliance_turnTip",["10000"]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"alliance_changePo1",
			msg:rewardStr,
			callback:this.doTurn,
			handler:this,
			needCancel:true
		});
		
    }
	private doTurn()
	{	
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		if(allianceVo.wealth < 10000){
			App.CommonUtil.showTip(LanguageManager.getlocal("alliance_turnTip1"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:1,auid:this._applyData.uid,title:"alliance_changePo1"});
	}

	private refreshData()
	{
		let aVo = Api.allianceVoApi.getAllianceMemberInfoById(this._applyData.uid);
		let nameStr = aVo.name + "(" + LanguageManager.getlocal("allianceMemberPo" + aVo.po) +")";
		this._nameTf.text = nameStr;

	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		this._applyData = null;
		// this._applyBtn = null;
		// this._cancelApplyBtn = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}