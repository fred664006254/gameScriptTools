/**
 *兑换
 * author dky
 * date 2017/11/21
 * @class AcPunishExScrollItem
 */
class AcPunishExScrollItem extends ScrollListItem
{

	// 数量
	private _numTF:BaseTextField;
	private _itemIndex:number;

	private _key :string;
	private _itemData:any;

	private _exchangeBtn:BaseButton;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		this.width = 172 + this.getSpaceX();
		this.height = 229 + this.getSpaceY();;
		
		// let key = (index+1).toString();
		this._key = data.key;
		this._itemIndex = index;
		this._itemData = data;
		
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 170;
		itemBg.height = 228;
		bgContainer.addChild(itemBg);

		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_cell_title");
		itemBg2.width = 170 - 6;
		itemBg2.x = 3;
		itemBg2.y = 3;
		// itemBg2.height = 218;
		bgContainer.addChild(itemBg2);

		let shopId:string = data.sell;
		let itemCfg = data;

		let iconModel:RewardItemVo = GameData.formatRewardItem(itemCfg.sell)[0];

		let itemName:BaseTextField = ComponentManager.getTextField(iconModel.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		itemName.setPosition(itemBg.width/2 - itemName.width/2, 7);
		bgContainer.addChild(itemName);

		let itemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(iconModel,true);
		itemIcon.setPosition(itemBg.width/2 - itemIcon.width/2, 35);
		itemIcon.name = "icon";
		bgContainer.addChild(itemIcon);
		itemIcon.getChildByName("numLb").visible = false;

		if (itemIcon.getChildByName("numbg"))
		{
			itemIcon.getChildByName("numbg").visible = false;
		}

		let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemData.aid,this._itemData.code);
		
		let maxNum = data.limit;
		let num = 0;
		if(acVo.shop[(this._key).toString()]){
			num = acVo.shop[(this._key).toString()];
		}
		let leftNum = maxNum -num;

		if(Api.wifeVoApi.getWifeInfoVoById(iconModel.id))
		{
			leftNum=0;
		}
		//头像框
		// let itemvo = Api.itemVoApi.getTitleInfoVoById(iconModel.id);
		// if(itemvo && itemvo.num > 0)
		// {
		// 	leftNum=0;
		// }
		let color = TextFieldConst.COLOR_QUALITY_GREEN;
		if(leftNum <= 0){
			color = TextFieldConst.COLOR_WARN_RED;
		}

		let numStr = LanguageManager.getlocal("buyNum",[color.toString(),leftNum.toString()]);

		// this._numTF = ComponentManager.getTextField(leftNum.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		// // this._numTF.setPosition(itemName.x + itemName.width + 5,itemName.y);
		// this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
		// bgContainer.addChild(this._numTF);
		// redSp.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
		this._numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._numTF.setPosition(itemBg.width/2 - this._numTF.width/2, itemIcon.y + itemIcon.height +3);
		bgContainer.addChild(this._numTF);

		this._exchangeBtn = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "exchange", this.chooseBtnClick, this);
		this._exchangeBtn.setText(itemCfg.cost + LanguageManager.getlocal("pointNumber"),false);
		this._exchangeBtn.setPosition(itemBg.width/2 - this._exchangeBtn.width/2, itemBg.height-this._exchangeBtn.height - 8);
		this._exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
		bgContainer.addChild(this._exchangeBtn);

		if(leftNum <= 0){
			// this._exchangeBtn.setEnable(false);
			this._exchangeBtn.setGray(true);
		}

		// if ( Api.dinnerVoApi.getBuyInfo()[key+1] == 1) {
		// 	App.DisplayUtil.changeToGray(itemIcon);
		// 	App.DisplayUtil.changeToGray(this._exchangeBtn);
		// }
		this.addChild(bgContainer);
	}


	 private chooseBtnClick()
    {
		let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemData.aid,this._itemData.code);

		let maxNum = this._itemData.limit;

		let num = 0;
		if(acVo.shop[(this._key).toString()]){
			num = acVo.shop[(this._key).toString()];
		}
		let leftNum = maxNum -num;

		let iconModel:RewardItemVo = GameData.formatRewardItem(this._itemData.sell)[0];
		if(Api.wifeVoApi.getWifeInfoVoById(iconModel.id))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishGetWife"));
			return ;
		}
		//头像框
		// let itemvo = Api.itemVoApi.getTitleInfoVoById(iconModel.id);
		// if(itemvo && itemvo.num > 0)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip4"));
		// 	return ;
		// }
		if(leftNum <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}

		if(this._itemData.cost > acVo.score){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,{"key":this._key,"index":this._itemIndex});
    }

	public refreshData(index:number)
	{	
		let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._itemData.aid,this._itemData.code);

		let maxNum = this._itemData.limit;

		let num = 0;
		if(acVo.shop[(this._key).toString()]){
			num = acVo.shop[(this._key).toString()];
		}
		let leftNum = maxNum -num;
		let color = TextFieldConst.COLOR_QUALITY_GREEN;
		if(leftNum <= 0){
			color = TextFieldConst.COLOR_WARN_RED;
		}

		let numStr = LanguageManager.getlocal("buyNum",[color.toString(),leftNum.toString()]);
		
		// let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);

		this._numTF.text = numStr;
		if(leftNum <= 0){
			this._exchangeBtn.setEnable(false);
		}
	}
	public getSpaceY():number
	{
		return 5;
	}
	public getSpaceX():number
	{
		return 5;
	}

	public dispose():void
	{

		this._numTF = null;
		this._key = null;
		this._itemData = null;
		this._itemIndex = null;

		super.dispose();
	}
}