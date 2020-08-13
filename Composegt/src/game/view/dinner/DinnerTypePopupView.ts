/**
 * 选择参加宴会的方式
 * date 2017/10/31
 * @class DinnerTypePopupView
 */

class DinnerTypePopupView extends PopupView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _scrollContainer:BaseDisplayObjectContainer=null;

	public constructor() {
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"dinner_gems_1",
			"dinner_gems_2",
			"dinner_gems_3",
        ]);
	}
	protected initView():void
	{
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}


		let goldBar:ResBar = ComponentManager.getResBar(ItemEnums.gem,true);
		goldBar.setPosition(40,15);
		this.addChildToContainer(goldBar);

		let typeBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		typeBg.width = 528;
		typeBg.height = 626;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 60);
		this.addChildToContainer(typeBg);

		let rect2:egret.Rectangle=egret.Rectangle.create();
		rect2.setTo(0,0,this.viewBg.width,typeBg.height + typeBg.y);
		this._scrollContainer = new BaseDisplayObjectContainer();
		let scrollView = ComponentManager.getScrollView(this._scrollContainer,rect2);
		this.addChildToContainer(scrollView);
		this._scrollContainer.setPosition(0, typeBg.y);

		let itemsInfo = Config.DinnerCfg.getFeastItemList();
		for (let k in itemsInfo) 
		{	
			let idx:number = Number(k);
			let bgContainer:BaseDisplayObjectContainer = this.getDinnerTypeContainer(idx);
			bgContainer.setPosition( this.viewBg.width/2 - 518/2 +4, (idx-1)*155 + 10);
			this._scrollContainer.addChild(bgContainer);
		}

	}
	// idx  1~4
	private getDinnerTypeContainer(idx:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let itemBg:BaseBitmap = BaseBitmap.create("public_listbg");
		itemBg.width = 508;
		itemBg.height = 145;
		bgContainer.addChild(itemBg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 129;
		leftBg.height = itemBg.height - 19;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		bgContainer.addChild(leftBg);


		let itemName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType"+idx),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		itemName.setPosition(140, 15);
		bgContainer.addChild(itemName);


		let expendText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("expend"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		expendText.setPosition(itemName.x, itemName.y + itemName.height + 12);
		bgContainer.addChild(expendText);

		let itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(idx);
		if(idx == 2){
			if(Api.switchVoApi.checkOpen1524JoinDinner()){
				itemCfg.needGem = null;
			}
		}
		if (itemCfg.needGem) {

			let iconBg:BaseBitmap = BaseBitmap.create("itembg_5");
			iconBg.setPosition(14, itemBg.height/2 - iconBg.height/2 - 3);
			bgContainer.addChild(iconBg);
			
			let icon:BaseBitmap = BaseBitmap.create("dinner_gems_"+idx);
			icon.setPosition(iconBg.x + iconBg.width/2 - icon.width/2, iconBg.y + iconBg.height/2 - icon.height/2);
			bgContainer.addChild(icon);

			let rect:egret.Rectangle=egret.Rectangle.create();
			// rect.setTo(0,0,45,45);
			let goldIcon:BaseBitmap = BaseBitmap.create("public_icon1");
			goldIcon.setPosition(expendText.x + expendText.width + 10 , expendText.y+expendText.height/2 - 45/2 + 5);
			goldIcon.setScale(0.6);
			bgContainer.addChild(goldIcon);

			let costText:BaseTextField = ComponentManager.getTextField(itemCfg.needGem.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			costText.setPosition(goldIcon.x + 35, expendText.y);
			bgContainer.addChild(costText);


			
		}
		else {
			let iconCfg = Config.ItemCfg.getItemCfgById(Number(itemCfg.needItem));

			let icon:BaseDisplayObjectContainer = GameData.getItemIcon(iconCfg);
			icon.setPosition(14, itemBg.height/2 - icon.height/2 - 3);
			bgContainer.addChild(icon);

			let costText:BaseTextField = ComponentManager.getTextField(iconCfg.name + "x1",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			costText.setPosition(expendText.x + expendText.width + 10, expendText.y);
			bgContainer.addChild(costText);

			
		}


		
		let effectTitle:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		effectTitle.setPosition(expendText.x, expendText.y + expendText.height + 23);
		bgContainer.addChild(effectTitle);

		let effectText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect1",["+"+itemCfg.getScore.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		effectText.setPosition(effectTitle.x+effectTitle.width, expendText.y + expendText.height + 10);
		bgContainer.addChild(effectText);

		if (itemCfg.getPoint > 0) {


			let effectText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect2",["+"+itemCfg.getPoint.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
			effectText2.setPosition(effectTitle.x+effectTitle.width, expendText.y + expendText.height + 35);
			bgContainer.addChild(effectText2);

			let gotoFeastBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "dinnerFeast", this.touchTap, this,[idx]);
			gotoFeastBtn.setPosition(itemBg.width - gotoFeastBtn.width - 10, 20);
			// gotoFeastBtn.setColor(TextFieldConst.COLOR_BLACK);
			bgContainer.addChild(gotoFeastBtn);

		}
		else {

			let effectText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect2",[itemCfg.getPoint.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
			effectText2.setPosition(effectTitle.x+effectTitle.width, expendText.y + expendText.height + 35);
			bgContainer.addChild(effectText2);

			let gotoFeastBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_BLUE, "dinnerType4", this.touchTap, this,[idx]);
			gotoFeastBtn.setPosition(itemBg.width - gotoFeastBtn.width - 10, 20);
			// gotoFeastBtn.setColor(TextFieldConst.COLOR_BLACK);
			bgContainer.addChild(gotoFeastBtn);
		}


		return bgContainer;
	}

	private touchTap(idx:number):void
	{

		let itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(idx);
		if(idx == 2){
			if(Api.switchVoApi.checkOpen1524JoinDinner()){
				itemCfg.needGem = null;
			}
		}
		if (itemCfg.needGem) {
			if(itemCfg.needGem > Api.playerVoApi.getPlayerGem())
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
				return;
			}
		}
		else {
			let needItem:string = itemCfg.needItem;
			let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(Number(needItem));
			if (1 > hasNum) {
				App.CommonUtil.showTip(LanguageManager.getlocal("dinnerTimesFull"));
				return;
			}
		}


		let feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);
		
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj,[idx]);
		}
		this.hide();
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}