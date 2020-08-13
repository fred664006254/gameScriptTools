/**
 * 红颜技能
 * author dky
 * date 2017/11/18
 * @class WifeSkillPopupView
 */
class WifeSkillPopupView extends PopupView
{
	
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _wifeInfoVo: WifeInfoVo;

	private _text1:BaseTextField;
	// private _text2:BaseTextField;

	private _index:number = 0;

	public static wifeId:string = null;

	public constructor() 
	{
		super();
	}

	protected getTabbarTextArr():Array<string>
	{
		//添加开关
		if(Api.switchVoApi.checkOpenWifeBattle()){
			return [
				"wifeSkillPopupViewTabTitle1",
				"wifeSkillPopupViewTabTitle2",
			
			];
		} else {
			return [
				"wifeSkillPopupViewTabTitle1",
			];
		}

	}	
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
	protected getTabbarGroupX():number
    {
        return 17;
    }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"commonview_woodbg",
			"popupview_bg4"
		]);
	}
	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 0;
	}

	public initView():void
	{		


		this.tabbarGroup.setSpace(10);





		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);

		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;

		let id = this.param.data.id;
		WifeSkillPopupView.wifeId = id;

		// this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		// let cfg = Config.WifeCfg.getWifeCfgById(id);
		// let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)

		let bottomBg = BaseBitmap.create("commonview_woodbg");
		bottomBg.width = 546;
		bottomBg.height = 803;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = 0;//this.tabbarGroup.y + 10;//55;
		this.addChildToContainer(bottomBg);

		// let topBg = BaseBitmap.create("public_tc_bg03");
		// topBg.width = 515;
		// topBg.height = 130;
		// topBg.x = this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
		// topBg.y = bottomBg.y + 15;
		// this.addChildToContainer(topBg);

		// let cor1 = BaseBitmap.create("public_tcdw_bg01");
		// cor1.skewX = 180;
		// cor1.x = topBg.x;
		// cor1.y = topBg.y + topBg.height;
		// this.addChildToContainer(cor1);

		// let cor2 = BaseBitmap.create("public_tcdw_bg02");
		// cor2.x = topBg.x + topBg.width-cor2.width;
		// cor2.y = topBg.y;
		// this.addChildToContainer(cor2);

		// let serBg = serCfg.qualityBoxImgPath;
		// if(Api.servantVoApi.getServantObj(cfg.servantId)){
		// 	let serVo = Api.servantVoApi.getServantObj(cfg.servantId);
		// 	serBg = serVo.qualityBoxImgPath;
		// }
		// let temW:number = 108;
		// let iconBgBt:BaseBitmap = BaseLoadBitmap.create(serBg);
		// iconBgBt.x = topBg.x + 15;
		// iconBgBt.y = topBg.y + 12;
		// this.addChildToContainer(iconBgBt);
		// iconBgBt.scaleX = temW/194;
		// iconBgBt.scaleY = temW/192;
		
		// let obj = Api.servantVoApi.getServantObj(cfg.servantId);
		// let halfIcon = obj ? obj.halfImgPath : serCfg.halfIcon
		// let iconBt:BaseBitmap = BaseLoadBitmap.create(halfIcon);
		// iconBt.x = iconBgBt.x + 1.5;
		// iconBt.y = iconBgBt.y + 2;
		// this.addChildToContainer(iconBt);
		// iconBt.scaleX = (temW-10)/180;
		// iconBt.scaleY = (temW-10)/177;

		// let nameStr = LanguageManager.getlocal("wifeSkillServant",[serCfg.name]);
		// let nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		// nameTF.x = iconBt.x + 130 ;
		// nameTF.y = topBg.y + 25;
		// this.addChildToContainer(nameTF);

		// if(!Api.servantVoApi.getServantObj(cfg.servantId))
		// {
		// 	let getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
		// 	getTF.x = nameTF.x + nameTF.width + 5;
		// 	getTF.y = nameTF.y;
		// 	this.addChildToContainer(getTF);

		// 	let maskBt:BaseBitmap = BaseBitmap.create("wifeview_mask");
		// 	maskBt.x = iconBgBt.x;
		// 	maskBt.y = iconBgBt.y;
		// 	this.addChildToContainer(maskBt);
		

		// }
		
		// let expStr = LanguageManager.getlocal("wifeExp") +  " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
		// this._text1 = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		// this._text1.x = nameTF.x;
		// this._text1.y = nameTF.y + nameTF.height + 10;
		// this.addChildToContainer(this._text1);

		// let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		// tipTF.x = nameTF.x;
		// tipTF.y = this._text1.y + this._text1.height + 10;
		// this.addChildToContainer(tipTF);




		// let list1: Array<number> = new Array();

		// for (var index = 0; index < this._wifeInfoVo.cfg.wifeSkill.length; index++) {
		// 	list1.push(index)
			
		// } 
		// let list =this._wifeInfoVo.cfg.wifeSkill; 
		// let newList:Array<any> =[]; 
		// if(PlatformManager.checkIsWxCfg())
		// {
		// 	newList = list;
		// }
		// else 
		// {
		// 	for(var i:number=0; i<list.length; i++)
		// 	{
		// 		if(list[i].condition)
		// 		{
		// 			newList.push(list[i]);
		// 		}
		// 	} 
		// } 
		// let rect = egret.Rectangle.create();
		// rect.setTo(0,0,515,480);
		// this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem,newList,rect);
		// this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bottomBg.x + 10 ,topBg.y + topBg.height + 5);

	}

	// private doGive(event:egret.Event){
	// 	let data  = event.data;
	// 	this._index = data.index;
	// 	this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(),key:data.index});
	// }

	//请求回调
	// protected receiveData(data: { ret: boolean, data: any }): void {

		
	// 	if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
	// 		if(data.data.data && data.data.data.rewards)
	// 		{
	// 			let rewards= GameData.formatRewardItem(data.data.data.rewards);
	// 			if(rewards&&rewards.length>0)
	// 			{
	// 				App.CommonUtil.playRewardFlyAction(rewards);
	// 			}
	// 		}
	// 		let index = this._index;
	// 		let wideItem = <WifeSkillScrollItem>this._scrollList.getItemByIndex(index);
		
	// 		wideItem.refreshData(index);

	// 		let id = this.param.data.id
	// 		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
	// 		let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
	// 		this._text1.text = expStr;
	// 		// this._text2.text = this._wifeInfoVo.glamour.toString();
	// 		App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			
	// 	}

		
	// }
	private refreshHandler()
	{

	}


	public hide():void
	{
		super.hide();
	}
	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	public dispose():void
	{
	
		
		// 未婚滑动列表
		this._scrollList = null;


		this._confirmCallback = null;
		this._handler = null;
		this._wifeInfoVo = null;
		this._text1 = null;
		// this._text2 = null;
		this._index = null;

		WifeSkillPopupView.wifeId = null;

		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);

		super.dispose();
	}
}