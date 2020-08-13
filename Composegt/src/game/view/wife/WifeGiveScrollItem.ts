/**
 * 赏赐Item
 * author dky
 * date 2017/11/4
 * @class WifeGiveScrollItem
 */
class WifeGiveScrollItem extends ScrollListItem
{

	// 数量
	private _numTF:BaseTextField;
	private _numTF2:BaseTextField;
	private _itemIndex:number;

	private _key :string;
	private _itemId;
	private _mainTaskHandKey:string = null;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		let cfg = Config.WifebaseCfg.wifeGift
		
		this._itemIndex = index;
		this.width = 515;
		this.height = 145 + this.getSpaceY();

		let key = (index+1).toString();

		let bgBg:BaseBitmap = BaseBitmap.create("public_listbg3");
		bgBg.width = this.width;
		bgBg.height = 145;
		// bgBg.scaleY = 126/148;
		this.addChild(bgBg);

		// let leftBg = BaseBitmap.create("public_left");
		// leftBg.width = 129;
		// leftBg.height = 126;
		// leftBg.x = 5.5;
		// leftBg.y = 5.5;
		// this.addChild(leftBg);

		this._key = key;
		this._itemId = cfg[key].item
		let itemCfg = Config.ItemCfg.getItemCfgById(cfg[key].item);
		let itemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(itemCfg,true,true);;
		itemIcon.setPosition(18, bgBg.height/2*bgBg.scaleY - itemIcon.width/2 -2);
		itemIcon.name = "icon";
		this.addChild(itemIcon);

		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));

		this._numTF2 = ComponentManager.getTextField(String(hasNum),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		this._numTF2.x = itemIcon.x + itemIcon.width - this._numTF2.width - 5;
		this._numTF2.y = itemIcon.y + itemIcon.height - this._numTF2.height - 5;
		this.addChild(this._numTF2);

		
		// let nameBg = BaseBitmap.create("public_biaoti2");
		// let nameSize = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		// if(PlatformManager.checkIsViSp()){
		// 	nameBg.width = 170;
		// 	nameSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
		// } else {
		// 	nameBg.width = 150;
		// }
		
		// nameBg.x = itemIcon.x + itemIcon.width + 15;
		// nameBg.y = 15;
		// this.addChild(nameBg);

		let itemName:BaseTextField = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		itemName.x = itemIcon.x + itemIcon.width + 25;//nameBg.x + nameBg.width/2 - itemName.width/2;
		itemName.y = 25;//nameBg.y + nameBg.height/2 - itemName.height/2;
		this.addChild(itemName);
		
		let numTF = ComponentManager.getTextField(LanguageManager.getlocal("numTitle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		numTF.setPosition(itemIcon.x + itemIcon.width + 25,itemName.y + itemName.height + 10);
		this.addChild(numTF);


		
		
		let numStr = hasNum + "";
		let color = TextFieldConst.COLOR_WARN_GREEN_NEW;
		if(hasNum<=0)
		{
			color = TextFieldConst.COLOR_WARN_RED_NEW;
		}
		this._numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,color);
		this._numTF.setPosition(numTF.x + numTF.width ,numTF.y);
		this.addChild(this._numTF);

		let itemDescStr = ""
		if(cfg[key].intimacy ){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd1",[cfg[key].intimacy])
		}
		else if(cfg[key].glamour){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd2",[cfg[key].glamour])
		} 
		else if(cfg[key].artistry){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd3",[cfg[key].artistry])
		}
		let itemDesc:BaseTextField = ComponentManager.getTextField(itemDescStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		if(PlatformManager.checkIsViSp()){
			itemDesc.setPosition(itemIcon.x + itemIcon.width + 25,this._numTF.y + this._numTF.height + 25);
		} else {
			itemDesc.setPosition(itemIcon.x + itemIcon.width + 25,this._numTF.y + this._numTF.height + 10);
		}
		
		this.addChild(itemDesc);

		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"useBtn",this.chooseBtnClick,this);
		chooseBtn.x = 360;
		chooseBtn.y = bgBg.height/2*bgBg.scaleY - chooseBtn.height/2;
		this.addChild(chooseBtn);
		// chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

        egret.callLater(function() {
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(chooseBtn, chooseBtn.width/2, chooseBtn.height/2, [chooseBtn], 306, true, function() {
				if (data.isMaxIntimacyWife && data.isFirstHasNumIndex) {
					this.parent.setChildIndex(this, 100);
					return true;
				} else {
					return false;
				}	
            }, this);
        }, this);

	}

	private chooseBtnClick(){
		
		let cfg = Config.WifebaseCfg.wifeGift

		let key = (this._itemIndex+1).toString();
		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
		if(hasNum <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
			return ;
		}
		else{
			if(hasNum < 5)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,{"key":this._key,"index":this._itemIndex,"num":1});
			}	
			else{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._itemId,maxNum:null,callback:this.useItem,handler:this});
			}
		}
		
		
	}

	private useItem(itemNum:number,itemId:number)
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,{"key":this._key,"index":this._itemIndex,"num":itemNum});
	}

	public refreshData(index:number)
	{	
		let cfg = Config.WifebaseCfg.wifeGift

		let key = (index+1).toString();
		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
		let numStr = "" + hasNum;
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(hasNum<=0)
		{
			color = TextFieldConst.COLOR_WARN_RED;
		}
		this._numTF.text = numStr;
		this._numTF2.text = numStr;
		this._numTF.setColor(color);
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
		
		this._numTF = null;
		this._numTF2 = null;
		this._key = null;
		this._itemId  = null;

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
		super.dispose();
	}
}