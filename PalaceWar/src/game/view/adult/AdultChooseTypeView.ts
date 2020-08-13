/**
 * 选择提亲道具
 * author dky
 * date 201710/30
 * @class AdultChooseTypeView
 */
class AdultChooseTypeView  extends PopupView
{   
    private _type:number;
	private _useCallback:Function;
	private _handler:any;


    private _cancelBtn:BaseButton;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

        let childId = this.param.data.childId
		let childInfo = Api.adultVoApi.getAdultInfoVoById(childId);

		let costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;

		let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
		let itemListCfg = Config.ItemCfg.getItemCfgById
		let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
		let itemNum = 0;
		if(itemInfo){
			itemNum = itemInfo.num;
		}
		
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 270;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 45;
		this.addChildToContainer(bg);

				
		let descText = ComponentManager.getTextField(LanguageManager.getlocal("adultChooseTypeDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		descText.x = 30+GameData.popupviewOffsetX;
		descText.y = 15;
		this.addChildToContainer(descText);

		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg1.width = 500;
		bg1.height = 120;
		bg1.x = this.viewBg.x + this.viewBg.width/2 - bg1.width/2;
		bg1.y = 58;
		this.addChildToContainer(bg1);

		let bg2:BaseBitmap = BaseBitmap.create("public_9_bg1");
		bg2.width = 500;
		bg2.height = 120;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = bg1.y + bg1.height + 5;
		this.addChildToContainer(bg2);


		let selecte1dIconBg = BaseBitmap.create("itembg_1");
		selecte1dIconBg.x = bg1.x + 8;
		selecte1dIconBg.y = bg1.y + 8;
		this.addChildToContainer(selecte1dIconBg);

		let selected1Icon = BaseLoadBitmap.create("itemicon1");
		selected1Icon.x = selecte1dIconBg.x + 5;
		selected1Icon.y = selecte1dIconBg.y + 5;
		this.addChildToContainer(selected1Icon);

		let selecte2dIconBg = BaseBitmap.create(itemCfg.iconBg);
		selecte2dIconBg.x = bg2.x + 8;
		selecte2dIconBg.y = bg2.y + 8;
		this.addChildToContainer(selecte2dIconBg);

		let selected2Icon = BaseLoadBitmap.create(itemCfg.icon);
		selected2Icon.x = selecte2dIconBg.x + 5;
		selected2Icon.y = selecte2dIconBg.y + 5;
		this.addChildToContainer(selected2Icon);

		let cost1Str = LanguageManager.getlocal("adultChooseCost")+Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem + LanguageManager.getlocal("gemName");
		let cost1TF = ComponentManager.getTextField(cost1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		cost1TF.x = selecte1dIconBg.x + selecte1dIconBg.width + 15;
		cost1TF.y = selecte1dIconBg.y + 20;
		this.addChildToContainer(cost1TF);

		let cost2Str = LanguageManager.getlocal("adultChooseCost")+itemCfg.name;
		let cost2TF = ComponentManager.getTextField(cost2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		cost2TF.x = cost1TF.x;
		cost2TF.y = selecte2dIconBg.y + 20;
		this.addChildToContainer(cost2TF);

		let have1Str = LanguageManager.getlocal("adultChooseNum") + Api.playerVoApi.getPlayerGem();
		let have1TF = ComponentManager.getTextField(have1Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		have1TF.x = selecte1dIconBg.x + selecte1dIconBg.width + 15;
		have1TF.y = selecte1dIconBg.y + 70;
		this.addChildToContainer(have1TF);

		let have2Str = LanguageManager.getlocal("adultChooseNum") + itemNum;
		let have2TF = ComponentManager.getTextField(have2Str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		have2TF.x = cost1TF.x;
		have2TF.y = selecte2dIconBg.y + 70;
		this.addChildToContainer(have2TF);
		
        let choose1Btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultChoose",this.choose1Handler,this);
		choose1Btn.x = 370+GameData.popupviewOffsetX;
		choose1Btn.y = bg1.y + bg1.height/2 - choose1Btn.height/2;

		choose1Btn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(choose1Btn);

		 let choose2Btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultChoose",this.choose2Handler,this);
		choose2Btn.x = 370+GameData.popupviewOffsetX;
		choose2Btn.y = bg2.y + bg2.height/2 - choose2Btn.height/2;
		choose2Btn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(choose2Btn);

		if(PlatformManager.checkIsEnLang()){
			choose1Btn.y += 20;
			choose2Btn.y += 20;
		}
		
	}

    private choose1Handler(param:any):void
	{
		let childId = this.param.data.childId
		let childInfo = Api.adultVoApi.getAdultInfoVoById(childId);


		let cost = Config.AdultCfg.getItemCfgById(childInfo.aquality).needGem;

		if(cost > Api.playerVoApi.getPlayerGem()){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return ;
		}

		this.param.data.confirmCallback.apply(this.param.data.handler,[1]);
		this.hide();
	}
	 private choose2Handler(param:any):void
	{	

		let childId = this.param.data.childId
		let childInfo = Api.adultVoApi.getAdultInfoVoById(childId);

		let costItemId = Config.AdultCfg.getItemCfgById(childInfo.aquality).needItem;

		let itemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
		let itemListCfg = Config.ItemCfg.getItemCfgById
		let itemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
		let itemNum = 0;
		if(itemInfo){
			itemNum = itemInfo.num;
		}
		if(itemNum <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
			return ;
		}
		
		this.param.data.confirmCallback.apply(this.param.data.handler,[2]);
		this.hide();
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }
    // protected resetBgSize():void
	// {
	// 	super.resetBgSize();
	// 	this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	// }

    // protected getConfirmBtnStr():string
	// {
	// 	return "sysConfirm";
	// }
    // protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }
    protected getTitleStr(){
        //  this._type = this.param.data.type 
        return "adultChooseTypeViewTitle";
    }

	// protected getResourceList():string[]
	// {
	// 	return super.getResourceList().concat(["shield_cn"]);
	// }

	public dispose():void
	{
		this._type = null;
		this._useCallback = null;
		this._handler = null;
		this._cancelBtn = null;

		super.dispose();
	}
}