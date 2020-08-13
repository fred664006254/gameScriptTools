/**
 玩家信息列表
 * author qianjun
 * date 2017/10/30
 * @class AdultPlayerInfoScrollItem
 */
class AdultPlayerInfoScrollItem extends ScrollListItem
{
	private _data:any = null;
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
		this.width = 520;
		this.height = 130  + this.getSpaceY();
		// childInfo.total
		this._data = bData;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = this.width;
		bg.height = 130;
		this.addChild(bg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);

		let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic),bData.title);
		iconContainer.addChild(headContainer);
		iconContainer.width = 103;
		iconContainer.height = 100;

		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);

		let nameStr = bData.name;
		this._nameTf = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xa87e00);
		this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [iconContainer.x + iconContainer.width + 20,10]);
		this.addChild(this._nameTf);

		this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15,4]);

		if((bData.type == 'choosevisit') && bData.laifang){
			let descbg = BaseBitmap.create('public_9_bg15');
			descbg.width = 114;
			descbg.height = 24;
			this.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, iconContainer, [-4,0]);
			this.addChild(descbg);

			let havevisitTxt = ComponentManager.getTextField(LanguageManager.getlocal('adulthavevisited'),18);
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, havevisitTxt, descbg);
			this.addChild(havevisitTxt);
		}
		if (bData.type == "yyuanrecord")
		{
			let laifang = false;
			if(Api.adultVoApi.isLaifang(bData.uid)){
				laifang = true;
			}
			if (laifang)
			{
				let descbg = BaseBitmap.create('public_9_bg15');
				descbg.width = 114;
				descbg.height = 24;
				this.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, iconContainer, [-4,0]);
				this.addChild(descbg);

				let havevisitTxt = ComponentManager.getTextField(LanguageManager.getlocal('adulthavevisited'),18);
				this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, havevisitTxt, descbg);
				this.addChild(havevisitTxt);
			}
		}
		if(bData.type == 'marry'){
			let info = Api.adultVoApi.getAdultInfoVoById(bData.childid);
			let str = '';//Api.adultVoApi.getVisitLevel(childInfo);
			let baifang = false;
			let laifang = false;
			let hufang = false;
			if(info.visit == bData.uid){
				baifang = true;
			}
			if(Api.adultVoApi.isLaifang(bData.uid)){
				laifang = true;
			}
			hufang = baifang && laifang;
			if(hufang){
				str = 'adulthavehufang';
			}else if(baifang){
				str = 'adulthavevisit';
			}else if(laifang){
				str = 'adulthavevisited';
			}
			// if(visitlevel){
			// 	let arrtnum = Config.SadunCfg[`addExtent${visitlevel == 3 ? 2 : 1}`] * 100;
			// 	let attradd = ComponentManager.getTextField(LanguageManager.getlocal(`adultVisitLevel${visitlevel}`,[arrtnum.toString()]), 20, 0x3e9b00);
			// 	this.setLayoutPosition(LayoutConst.lefttop, attradd, attrTF, [attrTF.textWidth + 10,0]);
			// 	this.addChild(attradd);
			// }
			if(str != ''){
				let descbg = BaseBitmap.create('public_9_bg15');
				descbg.width = 114;
				descbg.height = 24;
				this.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, iconContainer, [-4,0]);
				this.addChild(descbg);

				let havevisitTxt = ComponentManager.getTextField(LanguageManager.getlocal(str),18);
				this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, havevisitTxt, descbg);
				this.addChild(havevisitTxt);
			}
		}

		let lineImg = BaseBitmap.create("public_line1");
		lineImg.width = 400;
        this.setLayoutPosition(LayoutConst.lefttop, lineImg, this._nameTf, [-10,this._nameTf.textHeight + 5]);
        this.addChild(lineImg);

		let leadStr = LanguageManager.getlocal("allianceMemberInfo1",[ bData.power]);
		let leadTF = ComponentManager.getTextField(leadStr,18,TextFieldConst.COLOR_BROWN);
		leadTF.x = 120;
		leadTF.y = this._nameTf.y + this._nameTf.height + 14;
		this.addChild(leadTF);

		let attrStr = LanguageManager.getlocal("allianceMemberInfo2",[Api.playerVoApi.getPlayerOfficeByLevel(bData.level)]);
		let attrTF = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
		attrTF.x = 120;
		attrTF.y = leadTF.y + leadTF.height + 7;
		this.addChild(attrTF);

		let conStr = LanguageManager.getlocal("chatblockAlliance",[bData.mygname == '' ? LanguageManager.getlocal('nothing') : bData.mygname]);
		let conrTF = ComponentManager.getTextField(conStr,18,TextFieldConst.COLOR_BROWN);
		conrTF.x = 120;
		conrTF.y = attrTF.y + attrTF.height + 7;
		this.addChild(conrTF);

		let timeDis = GameData.serverTime - bData.offtime;
		let timeStr = LanguageManager.getlocal(timeDis <= 0 ? "chatblockonline" : "chatblockoffline",[App.DateUtil.getFormatBySecond(timeDis,4)]);
		if(timeStr == LanguageManager.getlocal('chat_time4')){
			timeStr = LanguageManager.getlocal('chat_time3', ['1'])
		}
		else{
			//timeStr = timeStr.substring(0, timeStr.length - 1);
		}
		let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
		timeTF.setColor(timeDis <= 0 ? TextFieldConst.COLOR_WARN_GREEN :  0x858583);
		timeTF.visible = false;
		// timeTF.x = 120;
		// timeTF.y = conrTF.y + conrTF.height + 7;
        // timeTF.x = this.width - timeTF.width - 25;
        // // timeTF.textColor = textColor;
		// timeTF.y = this._nameTf.y;
		
		let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.cancelBlock,this);
        this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, bg, [20, 10]);
        this.addChild(quitBtn);
		quitBtn.setColor(TextFieldConst.COLOR_BLACK);
		
		this.setLayoutPosition(LayoutConst.horizontalCentertop, timeTF, quitBtn, [0, -timeTF.textHeight - 40]);
		this.addChild(timeTF);

		//离线时间
		let offtime = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(GameData.serverTime-bData.offtime,4), 20, TextFieldConst.COLOR_BLACK);
		

		let textStr =  App.DateUtil.getFormatBySecond(GameData.serverTime-bData.offtime,4);  
		if(textStr == LanguageManager.getlocal("chat_time4")){
			offtime.text = LanguageManager.getlocal("friends_onLine");
			offtime.textColor = TextFieldConst.COLOR_WARN_GREEN2;
		}
		
		this.setLayoutPosition(LayoutConst.righttop, offtime, bg, [20,12]);
		this.addChild(offtime);

		if(bData.type == 'choosevisit'){
			let adultbfzhong = BaseBitmap.create('adultbfzhong');
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, adultbfzhong, quitBtn);
			this.addChild(adultbfzhong);
			adultbfzhong.visible = Api.adultVoApi.isUidInVisit(bData.uid);

			quitBtn.setText('adultchoosevisitviewTitle');
			quitBtn.visible = !adultbfzhong.visible;

			let friendTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultfriendnum', [bData.friend]),18,TextFieldConst.COLOR_BLACK);
			this.setLayoutPosition(LayoutConst.horizontalCentertop, friendTxt, quitBtn, [0,-18 - 3]);
			this.addChild(friendTxt);
		}
		else{
			quitBtn.visible = false;
			//新增亲家
			let info = Api.adultVoApi.getFreiendNums(this._data.uid);
			let progress = null;
			let friendnum = null;
			let lynumTxt = null;
			if(Api.adultVoApi.judgeIsSudan(this._data.uid)){
				progress = ComponentManager.getProgressBar("progress11","progress11_bg",102);
				this.setLayoutPosition(LayoutConst.rightbottom, progress, bg, [30,20]);
				this.addChild(progress);
				progress.setPercentage(info.percent, LanguageManager.getlocal(`adultFriendDesc${info.quality}`), TextFieldConst.COLOR_WHITE);
				progress.setTextSize(18);
				
				friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums',[info.num.toString()]), 20, TextFieldConst.COLOR_BLACK);
				this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, progress, [0,-friendnum.textHeight - 5]);
				this.addChild(friendnum);
			}
			else{
				lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums',[Api.adultVoApi.getLyinnum(this._data.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
				this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lynumTxt, quitBtn, [0,-15]);
				this.addChild(lynumTxt);
			}

			if(bData.type == 'marry'){
				this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, this, [20,20]);
				quitBtn.visible = true;
				quitBtn.setText('adultMarry');
				if(progress){
					progress.visible = false;
				}
				if(lynumTxt){
					this.setLayoutPosition(LayoutConst.horizontalCentertop, lynumTxt, quitBtn, [0,-lynumTxt.textHeight-3]);
				}
				else if(friendnum){
					this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, quitBtn, [0,-friendnum.textHeight-3]);
				}
			}
		}
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
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
		let data = this._data;
		if(data.type == 'choosevisit'){
			let itemid = 1411;
			let info = Api.adultVoApi.getAdultInfoVoById(this._data.childid);
			let itemUseCount = Api.adultVoApi.getVisitUseByQuality(info.aquality);
			let itemCount = Api.itemVoApi.getItemNumInfoVoById(itemid);
			let itemCfg = Config.ItemCfg.getItemCfgById(itemid);
			let message: string = LanguageManager.getlocal("adultvisiconfirm", [itemCfg.name + "x" +itemUseCount, this._data.name]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {	
				confirmCallback: this.useItemConfirmCallbackHandler, 
				handler: this, 
				icon: itemCfg.icon,
				iconBg:itemCfg.iconBg, 
				num: itemCount, 
				useNum:itemUseCount,
				msg: message, 
				id : itemid
			});
		}
		else{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY,{"fuid":this._data.uid,"childId":this._data.id});
		}
	}
	
	private useItemConfirmCallbackHandler(evt : egret.Event){
		NetManager.request(NetRequestConst.REQUEST_SADUN_VISIT, {
			childId : this._data.childid,
			fuid : this._data.uid,
			protype : 3
		});
		Api.adultVoApi.setVisitId(this._data.uid);
		//App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
	}

	private doShield()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CANCEBLOCK,{"uid":this._data.uid,"name":this._data.name});
	}


	public getSpaceY():number
	{
		return 1;
	}

	public dispose():void
	{

		this._data = null;
		// this._applyBtn = null;
		// this._cancelApplyBtn = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}