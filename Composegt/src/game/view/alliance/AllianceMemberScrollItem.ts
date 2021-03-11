/**
 *帮会成员
 * author dky
 * date 2017/11/29
 * @class AllianceMemberScrollItem
 */
class AllianceMemberScrollItem extends ScrollListItem
{

	private _applyData:AllianceMemberInfoVo = null;
	// private _applyBtn:BaseButton;
	// private _cancelApplyBtn:BaseButton;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	private _posTF:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,allianceMemberVo:AllianceMemberInfoVo):void
	{	
		// childInfo.total
		this._applyData = allianceMemberVo;
		this._itemIndex = index;
		
		this.width = 510;
		this.height = 170  + this.getSpaceY();
		
		// childInfo.total
		this._applyData = allianceMemberVo;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = 170;
		// bg.x = 5;
		this.addChild(bg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 129;
		leftBg.height = bg.height - 19;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);

		let nameBg = BaseBitmap.create("public_biaoti2");
		nameBg.width = 180;
		nameBg.x = leftBg.x + leftBg.width + 15;
		nameBg.y = 15;
		this.addChild(nameBg);



		let nameStr = allianceMemberVo.name 
		this._nameTf = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._nameTf.x = nameBg.x + nameBg.width/2 - this._nameTf.width/2;
		this._nameTf.y = nameBg.y + nameBg.height/2 - this._nameTf.height/2;
		this.addChild(this._nameTf);

		this._posTF = ComponentManager.getTextField( "(" + LanguageManager.getlocal("allianceMemberPo" + allianceMemberVo.po) +")",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._posTF.x = nameBg.x + nameBg.width + 20;
		this._posTF.y = nameBg.y + nameBg.height/2 - this._posTF.height/2;
		this.addChild(this._posTF);

		if(allianceMemberVo.uid == Api.playerVoApi.getPlayerID()){
			this._nameTf.textColor = TextFieldConst.COLOR_WARN_GREEN;
			this._posTF.textColor = TextFieldConst.COLOR_WARN_GREEN;
		}

		if(allianceMemberVo.donate != "0")
		{
			let textColor = TextFieldConst.COLOR_BROWN;
			// if(allianceMemberVo.donate == "1")
			// {
			// 	textColor = TextFieldConst.COLOR_WARN_GREEN2;
			// }else if(allianceMemberVo.donate == "2"){
			// 	textColor = TextFieldConst.COLOR_QUALITY_BLUE;
			// }else if(allianceMemberVo.donate == "3"){
			// 	textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
			// }else if(allianceMemberVo.donate == "4"){
			// 	textColor = TextFieldConst.COLOR_WARN_RED2;
			// }else if(allianceMemberVo.donate == "5"){
			// 	textColor = TextFieldConst.COLOR_WARN_YELLOW2;
			// }
			
			let donatetStr = LanguageManager.getlocal("allianceBuildName" + allianceMemberVo.donate);
			let donatetTF = ComponentManager.getTextField(donatetStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			donatetTF.x = this.width - donatetTF.width - 25;
			donatetTF.textColor = textColor;
			donatetTF.y = this._nameTf.y + 30;
			this.addChild(donatetTF);
		}

		// let lineImg = BaseBitmap.create("public_line1");
        // lineImg.x = this.width/2 - lineImg.width/2;
        // lineImg.y = 40;
        // this.addChild(lineImg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);
		iconContainer.x = 20;
		iconContainer.y = 30;

		let posBg:BaseBitmap = BaseBitmap.create("public_chatheadbg");
		// posBg.x = 20;
		// posBg.y = 50;
        iconContainer.addChild(posBg)

        // this.addTouch(this.eventHandler,this,null);	

		let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(allianceMemberVo.pic),rect1);
		posBB.x = 0;
		posBB.y =-7;
        posBB.setScale(2/3);
		iconContainer.addChild(posBB);


		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);

		let leadStr = LanguageManager.getlocal("allianceMemberInfo1",[ App.StringUtil.changeIntToText(allianceMemberVo.power)]);
		let leadTF = ComponentManager.getTextField(leadStr,18,TextFieldConst.COLOR_BROWN);
		leadTF.x = nameBg.x;
		leadTF.y = this._nameTf.y + this._nameTf.height + 14;
		this.addChild(leadTF);

		let attrStr = LanguageManager.getlocal("allianceMemberInfo2",[Api.playerVoApi.getPlayerOfficeByLevel(allianceMemberVo.level)]);
		let attrTF = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
		attrTF.x = nameBg.x;
		attrTF.y = leadTF.y + leadTF.height + 7;
		this.addChild(attrTF);


		let conStr = LanguageManager.getlocal("allianceMemberInfo3",[allianceMemberVo.ctv + "/" + allianceMemberVo.tctv]);
		let conrTF = ComponentManager.getTextField(conStr,18,TextFieldConst.COLOR_BROWN);
		conrTF.x = nameBg.x;
		conrTF.y = attrTF.y + attrTF.height + 7;
		this.addChild(conrTF);

		 let timeDis = GameData.serverTime - allianceMemberVo.logindt;
		let timeStr = LanguageManager.getlocal("allianceMemberInfo4",[App.DateUtil.getFormatBySecond(timeDis,4)]);
		let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
		timeTF.x = nameBg.x;
		timeTF.y = conrTF.y + conrTF.height + 7;
		this.addChild(timeTF);

		//职位管理
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo()
		if(myAllianceVo.po == 1 && allianceMemberVo.uid != Api.playerVoApi.getPlayerID()){
			//choose
			let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceMemberChangePo",this.chooseBtnClick,this);
			chooseBtn.x = 360;
			chooseBtn.y = 95;
			this.addChild(chooseBtn);
			// chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		//帮众退帮
		if(myAllianceVo.po != 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID()){
			//choose
			let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceMemberQuit",this.quitBtnClick,this);
			quitBtn.x = 360;
			quitBtn.y = 95;
			this.addChild(quitBtn);
			// quitBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		//帮主退帮
		let nums = Api.allianceVoApi.getAllianceMemberInfoVoList().length;
		if(myAllianceVo.po == 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID() && nums == 1){
			//choose
			let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceManageBtn4",this.quitBtnClick2,this);
			quitBtn.x = 360;
			quitBtn.y = 95;
			this.addChild(quitBtn);
			// quitBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		
		
	}

	 protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}
	 private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._applyData.uid});
    }

	 private chooseBtnClick()
    {
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCESETPOPOPUPVIEW,{allianceMemberVo:this._applyData,callback: this.refreshData, handler: this});
    }

	 private quitBtnClick()
    {
		let baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive","14");
		//有展示期 所以 - 86400
		if(Api.switchVoApi.checkOpenRankActive()&&baseVo&&baseVo.et - 86400 > GameData.serverTime)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
			return;
		}
		//风云擂台不可以踢人
		let arr = [AcConst.AID_BATTLEGROUND];
		for(let i in arr){
			let vo : any = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
			if(vo&&vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
				return;
			}
		}

		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"allianceMemberQuit",
			msg:LanguageManager.getlocal("allianceMemberQuitTip1"),
			callback:this.doQuit,
			handler:this,
			needCancel:true
		});
    }

	private quitBtnClick2()
    {
		// ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
		// 	title:"allianceMemberQuit",
		// 	msg:LanguageManager.getlocal("allianceMemberQuitTip2"),
		// 	callback:this.doQuit2,
		// 	handler:this,
		// 	needCancel:true
		// });
		let baseVo = Api.acVoApi.checkActivityStartByAidAndType("rankActive","14");
		//有展示期 所以 - 86400
		if(Api.switchVoApi.checkOpenRankActive()&&baseVo&&baseVo.et - 86400 > GameData.serverTime)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceRankActiveTip"));
			return;
		}
		//风云擂台不可以踢人
		let arr = [AcConst.AID_BATTLEGROUND];
		for(let i in arr){
			let vo : any = Api.acVoApi.getActivityVoByAidAndCode(arr[i]);
			if(vo&&vo.isInActy())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip"));
				return;
			}
		}
		let dis = Config.AlliancebaseCfg.reduceContribution*100 + "%"
		let rewardStr = LanguageManager.getlocal("alliance_disTip",[dis]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"allianceManageBtn4",
			msg:rewardStr,
			callback:this.doDis,
			handler:this,
			needCancel:true
		});
    }
	private doDis()
	{	
		// this.hide();
		// ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEPSWDPOPUPVIEW,{});
		// this.hide();
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:"",title:"allianceManageBtn4"});
		
	}
	private doQuit()
	{
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE,{});
	}
	private doQuit2()
	{
		
		// ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEPSWDPOPUPVIEW,{});
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:"",title:"allianceManageBtn4"});
	}

	private refreshData()
	{
		let aVo = Api.allianceVoApi.getAllianceMemberInfoById(this._applyData.uid);
		this._applyData = aVo;
		let nameStr = "(" + LanguageManager.getlocal("allianceMemberPo" + aVo.po) +")";
		this._posTF.text = nameStr;

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