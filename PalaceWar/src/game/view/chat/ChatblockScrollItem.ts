/**
 *屏蔽成员
 * author dky qianjun
 * date 2018/3/14
 * @class ChatblockScrollItem
 */
class ChatblockScrollItem extends ScrollListItem
{

	private _blockData:any = null;
	// private _applyBtn:BaseButton;
	// private _cancelApplyBtn:BaseButton;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,bData:any):void
	{
		this.width = GameConfig.stageWidth - 30;
		this.height = 146  + this.getSpaceY();
		
		// childInfo.total
		this._blockData = bData;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = this.width;
		bg.height = 146;
		// bg.x = 5;

		this.addChild(bg);



		let nameStr = bData[4];
		this._nameTf = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._nameTf.x = 23;
		this._nameTf.y = 15;
		this.addChild(this._nameTf);


		let lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = 40;
        this.addChild(lineImg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);
		iconContainer.x = 20;
		iconContainer.y = 40;

		let posBg:BaseBitmap = BaseBitmap.create("public_chatheadbg");
		// posBg.x = 20;
		// posBg.y = 50;
        iconContainer.addChild(posBg)

        // this.addTouch(this.eventHandler,this,null);	

		let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(bData[5]),rect1);
		posBB.x = 0;
		posBB.y =-7;
        posBB.setScale(2/3);
		iconContainer.addChild(posBB);

		let leadStr = LanguageManager.getlocal("allianceMemberInfo1",[ bData[3]]);
		let leadTF = ComponentManager.getTextField(leadStr,18,TextFieldConst.COLOR_BROWN);
		leadTF.x = 120;
		leadTF.y = this._nameTf.y + this._nameTf.height + 14;
		this.addChild(leadTF);

		let attrStr = LanguageManager.getlocal("allianceMemberInfo2",[Api.playerVoApi.getPlayerOfficeByLevel(bData[2])]);
		let attrTF = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
		attrTF.x = 120;
		attrTF.y = leadTF.y + leadTF.height + 7;
		this.addChild(attrTF);


		let conStr = LanguageManager.getlocal("chatblockAlliance",[bData[6] == '' ? LanguageManager.getlocal('nothing') : bData[6]]);
		let conrTF = ComponentManager.getTextField(conStr,18,TextFieldConst.COLOR_BROWN);
		conrTF.x = 120;
		conrTF.y = attrTF.y + attrTF.height + 7;
		this.addChild(conrTF);

		let timeDis = GameData.serverTime - bData[1];
		let timeStr = LanguageManager.getlocal(timeDis <= 0 ? "chatblockonline" : "chatblockoffline",[App.DateUtil.getFormatBySecond(timeDis,4)]);
		if(timeStr == LanguageManager.getlocal('chat_time4')){
			timeStr = LanguageManager.getlocal('chat_time3', ['1'])
		}
		else{
			timeStr = timeStr.substring(0, timeStr.length - 1);
		}
		let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
		timeTF.setColor(timeDis <= 0 ? TextFieldConst.COLOR_WARN_GREEN :  TextFieldConst.COLOR_WARN_RED);
		// timeTF.x = 120;
		// timeTF.y = conrTF.y + conrTF.height + 7;
        // timeTF.x = this.width - timeTF.width - 25;
        // // timeTF.textColor = textColor;
		// timeTF.y = this._nameTf.y;

		let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"chatCancelShield",this.cancelBlock,this);
        quitBtn.x = 450;
        quitBtn.y = 65;
        this.addChild(quitBtn);
        quitBtn.setColor(TextFieldConst.COLOR_BLACK);
		
		this.setLayoutPosition(LayoutConst.horizontalCentertop, timeTF, quitBtn, [0, -timeTF.textHeight - 32]);
		this.addChild(timeTF);
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


	private cancelBlock()
    {
		// ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
		// 	title:"allianceMemberQuit",
		// 	msg:LanguageManager.getlocal("allianceMemberQuitTip2"),
		// 	callback:this.doQuit2,
		// 	handler:this,
		// 	needCancel:true
		// });
		let dis = Config.AlliancebaseCfg.reduceContribution*100 + "%"
		let rewardStr = LanguageManager.getlocal("chatCancelBlockDesc",[this._blockData[4]]);
		// let msg = LanguageManager.getlocal("adultMarryCancalMsg",[rewardStr])
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"chatCancelShield",
			msg:rewardStr,
			callback:this.doShield,
			handler:this,
			needCancel:true
		});
    }

	private doShield()
	{
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK,{"uid":this._blockData[0],"name":this._blockData[4]});
	}


	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		this._blockData = null;
		// this._applyBtn = null;
		// this._cancelApplyBtn = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}