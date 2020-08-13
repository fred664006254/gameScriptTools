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
		this.width = 525;
		this.height = 126 + this.getSpaceY();

		let key = (index+1).toString();

		let bgBg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bgBg.width = this.width;
		bgBg.height = 148;
		bgBg.scaleY = 126/148;
		this.addChild(bgBg);

		this._key = key;
		this._itemId = cfg[key].item
		let itemCfg = Config.ItemCfg.getItemCfgById(cfg[key].item);
		let itemIcon:BaseDisplayObjectContainer = itemCfg.getIconContainer(true);
		itemIcon.setPosition(15, bgBg.height/2*bgBg.scaleY - itemIcon.width/2);
		itemIcon.name = "icon";
		this.addChild(itemIcon);

		let itemName:BaseTextField = ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW2);
		itemName.setPosition(itemIcon.x + itemIcon.width + 10,18);
		this.addChild(itemName);
		

		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(cfg[key].item));
		let numStr = LanguageManager.getlocal("numTitle") + hasNum;
		this._numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		if(PlatformManager.checkIsEnLang()|| PlatformManager.checkIsRuLang()){
			this._numTF.setPosition(itemName.x,itemName.y + itemName.height + 15);
		} else {
			this._numTF.setPosition(itemName.x,itemName.y + itemName.height + 10);
		}
		
		this.addChild(this._numTF);

		let itemDescStr = ""
		if(cfg[key].intimacy ){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd1",[cfg[key].intimacy])
		}
		else if(cfg[key].glamour){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd2",[cfg[key].glamour])
		}
		else if(cfg[key].accomplishment){
			itemDescStr = LanguageManager.getlocal("wifeGiveAdd3",[cfg[key].accomplishment])
		}
		let itemDesc:BaseTextField = ComponentManager.getTextField(itemDescStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		if(PlatformManager.checkIsEnLang()|| PlatformManager.checkIsRuLang()){
			itemDesc.setPosition(itemName.x,this._numTF.y + this._numTF.height + 15);
		} else {
			itemDesc.setPosition(itemName.x,this._numTF.y + this._numTF.height + 10);
		}
		
		this.addChild(itemDesc);

		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"useBtn",this.chooseBtnClick,this);
		chooseBtn.x = 390-20;
		chooseBtn.y = bgBg.height/2*bgBg.scaleY - chooseBtn.height/2;
		this.addChild(chooseBtn);
		chooseBtn.setColor(TextFieldConst.COLOR_BLACK);

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
		let numStr = LanguageManager.getlocal("numTitle") + hasNum;
		this._numTF.text = numStr;
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
		this._key = null;
		this._itemId  = null;

		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
		super.dispose();
	}
}