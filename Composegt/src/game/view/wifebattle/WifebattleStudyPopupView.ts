/**
 * 永乐大典
 * author jiangliuyang
 * @class StudyatkBookPopupView
 */

class WifebattleStudyPopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList;
	private _tipTxt:BaseTextField;
	private _tipTxt1:BaseTextField;
	public static lastUpgradeId:string = "0";
	public constructor() {
		super();
	}

	protected initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP),this.upgradeCallback,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let txtBg = BaseBitmap.create("public_tc_bg02");
		txtBg.x = this.viewBg.width/2 - txtBg.width/2;
		txtBg.y = 15;
		this._nodeContainer.addChild(txtBg);

		let exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp:0;
		this._tipTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1",[String(exp)]);
		this._tipTxt1.x = this.viewBg.width/2 - 40 - this._tipTxt1.width;
		this._tipTxt1.y = txtBg.y + txtBg.height/2 - this._tipTxt1.height/2+2;
		this._nodeContainer.addChild(this._tipTxt1);


		this._tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        let itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
		this._tipTxt.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt",[String(itemNum)]);
		this._tipTxt.x = this.viewBg.width/2 + 40; //this.viewBg.width/2 - this._tipTxt.width/2;
		this._tipTxt.y = txtBg.y + txtBg.height/2 - this._tipTxt.height/2+2;

		this._nodeContainer.addChild(this._tipTxt);

		let bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 540;
        bottomBg.height = 610+27;
		bottomBg.name = "bottomBg"
		// bottomBg.height = 240;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = this._tipTxt.y + this._tipTxt.height + 30;
        this._nodeContainer.addChild(bottomBg);

		// let dataList =  Config.StudyatkCfg.getStudyatkList();
        let dataList = Config.WifebattleCfg.getWifeStudyCfgList();
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,600+10);
		let scrollList = ComponentManager.getScrollList(WifebattleStudyScrollItem,dataList,rect);
		scrollList.x = bottomBg.x + 5;
		scrollList.y = bottomBg.y + 5 + 7;

		this._scrollList = scrollList;
		this._nodeContainer.addChild(scrollList);
		this.scrollPos();
		this.upgradeCallback(null);
	}
	protected scrollPos()
	{
		// let idx  = Api.studyatkVoApi.getStudySkillInfoLv() ;
		let idx = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.lv:0;
		this._scrollList.setScrollTopByIndex(idx);
	}
	protected upgradeCallback(event:egret.Event)
	{
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.itemCostID);
		this._tipTxt.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt",[String(itemNum)]);

		let exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp:0;
		this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1",[String(exp)]);
		this._tipTxt1.x = this.viewBg.width/2 - 40 - this._tipTxt1.width;
		this._tipTxt.x = this.viewBg.width/2 + 40;
		if(event){
			let rData = event.data.data;
			if(rData.ret == 0 )
			{
				App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_successTip',[WifebattleStudyPopupView.lastUpgradeId]));
			} else {
				App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_failedTip',[WifebattleStudyPopupView.lastUpgradeId]));
			}
		}

	}
	protected getShowHeight():number
	{
		return 851.5;
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }
	// protected getBgExtraHeight():number
	// {
	// 	return 70;
	// }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"public_unlock",
		]);
	}
	public hide():void
	{
		AcCrossServerWifeBattleView.isOpenWin = false;
		super.hide();
	}
	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP),this.upgradeCallback,this);
		this._nodeContainer = null;
		this._scrollList = null;
			
		this._tipTxt = null;
		this._tipTxt1 = null;
		WifebattleStudyPopupView.lastUpgradeId= null;
		super.dispose();
	}
}