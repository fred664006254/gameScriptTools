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

		if(allianceMemberVo.donate != "0" || allianceMemberVo.monthcardDonate != 0)
		{	
			let type:number  = Math.max(Number(allianceMemberVo.donate), allianceMemberVo.monthcardDonate? 3 : 0 );

			let textColor = TextFieldConst.COLOR_WARN_GREEN2;
			if(type == 1)
			{
				textColor = TextFieldConst.COLOR_WARN_GREEN2;
			}else if(type == 2){
				textColor = TextFieldConst.COLOR_QUALITY_BLUE;
			}else if(type == 3){
				textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
			}else if(type == 4){
				textColor = TextFieldConst.COLOR_WARN_RED2;
			}else if(type == 5){
				textColor = TextFieldConst.COLOR_WARN_YELLOW2;
			}
			
			let donatetStr = LanguageManager.getlocal("allianceBuildName" + type);
			let donatetTF = ComponentManager.getTextField(donatetStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			donatetTF.x = this.width - donatetTF.width - 25;
			donatetTF.textColor = textColor;
			donatetTF.y = this._nameTf.y;
			this.addChild(donatetTF);
		}

		let lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = 40;
        this.addChild(lineImg);

		let iconContainer = Api.playerVoApi.getPlayerCircleHead(allianceMemberVo.pic, allianceMemberVo.ptitle);
		this.addChild(iconContainer);
		iconContainer.x = 20;
		iconContainer.y = 50;

		// let posBg:BaseBitmap = BaseBitmap.create("public_chatheadbg");
		// // posBg.x = 20;
		// // posBg.y = 50;
        // iconContainer.addChild(posBg)

        // // this.addTouch(this.eventHandler,this,null);	

		// let rect1:egret.Rectangle=egret.Rectangle.create();
		// rect1.setTo(0,0,136,143);
		// let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(allianceMemberVo.pic),rect1);
		// posBB.x = 0;
		// posBB.y =-7;
        // posBB.setScale(2/3);
		// iconContainer.addChild(posBB);


		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);

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

		//职位管理
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo()
		if((myAllianceVo.po == 1 || (myAllianceVo.po == 2&&allianceMemberVo.po!=1&&allianceMemberVo.po!=2))&& allianceMemberVo.uid != Api.playerVoApi.getPlayerID()){
			//choose
			let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceMemberChangePo",this.chooseBtnClick,this);
			chooseBtn.x = 360;
			chooseBtn.y = 95;
			this.addChild(chooseBtn);
			chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		//帮众退帮
		if(myAllianceVo.po != 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID()){
			//choose
			let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceMemberQuit",this.quitBtnClick,this);
			quitBtn.x = 360;
			quitBtn.y = 95;
			this.addChild(quitBtn);
			quitBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		//帮主退帮
		let nums = Api.allianceVoApi.getAllianceMemberInfoVoList().length;
		if(myAllianceVo.po == 1 && allianceMemberVo.uid == Api.playerVoApi.getPlayerID() && nums == 1){
			//choose
			let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceManageBtn4",this.quitBtnClick2,this);
			quitBtn.x = 360;
			quitBtn.y = 95;
			this.addChild(quitBtn);
			quitBtn.setColor(TextFieldConst.COLOR_BLACK);

		}
		
		
	}

	 protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
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
		if(!App.CommonUtil.canNotQuitAlliance()){
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"allianceMemberQuit",
				msg:LanguageManager.getlocal("allianceMemberQuitTip1") + ((Api.switchVoApi.checkOpenKickLimit() && (Api.gameinfoVoApi.getRegdt() + Config.AlliancebaseCfg.freeTime) < GameData.serverTime)? ("\n" + LanguageManager.getlocal("allianceQuitTip")):""),
				callback:this.doQuit,
				handler:this,
				needCancel:true
			});
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceBattleTip"));
		}
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
	
	private doDis(){	
		if(!App.CommonUtil.canNotQuitAlliance()){
			ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:"",title:"allianceManageBtn4"});	
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceKickBattleTip2"));
		}
	}

	private doQuit(){
		if(Api.switchVoApi.checkOpenKickLimit() && (Api.gameinfoVoApi.getRegdt() + Config.AlliancebaseCfg.freeTime) < GameData.serverTime && GameData.serverTime < Api.allianceVoApi.getJoinTime() + Config.AlliancebaseCfg.quitNeedTime) {
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceQuitWithTip", [App.DateUtil.getFormatBySecond((Api.allianceVoApi.getJoinTime() + Config.AlliancebaseCfg.quitNeedTime) - GameData.serverTime)]));
		}
		else {
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_EXITALLIANCE,{});
		}
	}

	private doQuit2(){
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETIMEPOPUPVIEW,{type:2,pswd:"",title:"allianceManageBtn4"});
	}

	private refreshData(){
		let aVo = Api.allianceVoApi.getAllianceMemberInfoById(this._applyData.uid);
		this._applyData = aVo;
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