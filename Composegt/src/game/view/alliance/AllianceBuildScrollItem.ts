/**
 * 每日建设
 * author dky
 * date 2017/12/6
 * @class AllianceBuildScrollItem
 */
class AllianceBuildScrollItem extends ScrollListItem
{

	// 数量
	private _itemIndex:number;

	private _key :string;
	private _itemData:any;
	private _numTF:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		// let cfg = Config.WifebaseCfg.wifeGift

		this._itemIndex = index;
		this._itemData = data;
		this.width = 510;
		this.height = 160 + this.getSpaceY();

		let key = (index+1).toString();

		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = 160;
		// bg.x = 5;
		this.addChild(bg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 129;
		leftBg.height = bg.height - 19;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);

		let nameBg = BaseBitmap.create("public_biaoti2");
		nameBg.width = 200;
		nameBg.x = leftBg.x + leftBg.width + 15;
		nameBg.y = 15;
		this.addChild(nameBg);

		this._key = key;
		
		let textColor = TextFieldConst.COLOR_BROWN;
			// if(key == "1")
			// {
			// 	textColor = TextFieldConst.COLOR_WARN_GREEN2;
			// }else if(key == "2"){
			// 	textColor = TextFieldConst.COLOR_QUALITY_BLUE;
			// }else if(key == "3"){
			// 	textColor = TextFieldConst.COLOR_QUALITY_PURPLE;
			// }else if(key == "4"){
			// 	textColor = TextFieldConst.COLOR_WARN_RED2;
			// }else if(key == "5"){
			// 	textColor = TextFieldConst.COLOR_WARN_YELLOW2;
			// }
		let itemName:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		itemName.text = LanguageManager.getlocal("allianceBuildName" + key);
		// itemName.textColor = textColor;
		itemName.x = nameBg.x + nameBg.width/2 - itemName.width/2;
		itemName.y = nameBg.y + nameBg.height/2 - itemName.height/2;
		this.addChild(itemName);

		let score = LanguageManager.getlocal("allianceBuildCost") ;
		let itemScore:BaseTextField = ComponentManager.getTextField(score,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemScore.setPosition(nameBg.x,itemName.y + itemName.height + 17);
		this.addChild(itemScore);

		if(index < 3){

			let iconBg:BaseBitmap = BaseBitmap.create("itembg_5");
			iconBg.setPosition(15, leftBg.y + leftBg.height/2*leftBg.scaleY - iconBg.width/2);
			this.addChild(iconBg);


			let itemBB:BaseBitmap = BaseBitmap.create("dinner_gems_" + key);
			itemBB.setPosition(18, leftBg.y + leftBg.height/2*leftBg.scaleY - itemBB.width/2);
			this.addChild(itemBB);

			let costIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			costIcon.x = itemScore.x + itemScore.width + 5;
			costIcon.setScale(0.8);
			costIcon.y = itemScore.y-5;
			// costIcon.setScale(0.4)
			this.addChild(costIcon);
			let costNum:BaseTextField = ComponentManager.getTextField(data.needGem.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			costNum.setPosition(costIcon.x + costIcon.width*costIcon.scaleX + 10,itemScore.y );
			costNum.width = 260; 
			this.addChild(costNum);
		}
		else{
			let itemCfg = Config.ItemCfg.getItemCfgById(data.needItem);
			let itemIcon:BaseDisplayObjectContainer = itemCfg.getIconContainer(true);
			itemIcon.setPosition(15, leftBg.y + leftBg.height/2*leftBg.scaleY - itemIcon.width/2 + 1);
			itemIcon.name = "icon";
			this.addChild(itemIcon);

			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(data.needItem));
			this._numTF = ComponentManager.getTextField( hasNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width,itemIcon.y + itemIcon.height - 8 - this._numTF.height );
			this.addChild(this._numTF);
			// itemName.text = itemCfg.name;

			// let score =  ;
			let it:BaseTextField = ComponentManager.getTextField(itemCfg.name + "x1",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
			it.setPosition(itemScore.x + itemScore.width + 0,itemScore.y);
			this.addChild(it);

		}



		let itemDescStr = LanguageManager.getlocal("allianceBuildGet",[data.exp,data.asset,data.contribution])

		//acPunishBuyItemGet
		let itemDesc:BaseTextField = ComponentManager.getTextField(itemDescStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemDesc.setPosition(nameBg.x,itemScore.y + itemScore.height + 7);
		itemDesc.width = 360; 
		this.addChild(itemDesc);

		
		if(Api.allianceVoApi.getIsDonatet()){
			let mVo = Api.allianceVoApi.getMyAllianceVo();
			if(this._key == mVo.donate.id){
				let donatetDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceBuildToday"),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_WARN_RED);
				donatetDesc.x = 400;
				donatetDesc.y = 25;
				this.addChild(donatetDesc);
			}
		
		}
		else{
			let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBuild",this.chooseBtnClick,this);
			chooseBtn.x = 370;
			chooseBtn.y = 30;
			this.addChild(chooseBtn);
			// chooseBtn.setColor(TextFieldConst.COLOR_BROWN);
		}
		

	}

	private chooseBtnClick(){

		if(this._itemIndex > 2){
			let hasNum:number=Api.itemVoApi.getItemNumInfoVoById(Number(this._itemData.needItem));
			if(hasNum <= 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
				return ;
			}
		}
		else{
			let cost = this._itemData.needGem.toString();

			if(cost > Api.playerVoApi.getPlayerGem()){
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return ;
			}
		}

		let allianceVo = Api.allianceVoApi.getAllianceVo();
		let bNum = allianceVo.info.donateNum?allianceVo.info.donateNum:0;
		if(bNum >= allianceVo.maxmn)
			{
				let rewardStr = GameData.getRewardsStr(Api.adultVoApi._refuseData);
				let msg = LanguageManager.getlocal("allianceBuildTip")
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"dailyTaskName19",
					msg:msg,
					callback:this.doBuild,
					handler:this,
					needCancel:true
				});
			return ;	
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,{"key":this._key,"index":this._itemIndex});
		
	}
	private doBuild()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ALLIANCE_BUILD,{"key":this._key,"index":this._itemIndex});
	}




	private getBtnClickHandler()
	{
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this._key = null;
		this._itemData = null;
		this._itemIndex = null;
		this._numTF = null;

		super.dispose();
	}
}