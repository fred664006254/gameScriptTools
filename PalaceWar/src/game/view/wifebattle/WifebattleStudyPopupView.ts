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

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			'wifebattleyonglelistbg',`wifebattleyongletitlebg`,`wifebattleyonglestudybtn`,`countrywarrewardview_itembg`,
		]);
	}
	
	protected initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIFEBATTLE_YONGLEUP),this.upgradeCallback,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let txtBg = BaseBitmap.create("countrywarrewardview_itembg");
		txtBg.x = this.viewBg.width/2 - txtBg.width/2;
		txtBg.y = 15;
		this._nodeContainer.addChild(txtBg);

		let itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
		this._tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleStudy_score",[itemNum.toString()]),20,TextFieldConst.COLOR_WHITE);
		this._tipTxt1.setPosition(txtBg.x + 60, txtBg.y+(txtBg.height - this._tipTxt1.height)/2);
		this._nodeContainer.addChild(this._tipTxt1);

		this._tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleStudy_unlock",[Api.wifestatusVoApi.getStatusWifeNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		this._tipTxt.setPosition(txtBg.x + txtBg.width - this._tipTxt.width - 60, txtBg.y+(txtBg.height - this._tipTxt1.height)/2);
		this._nodeContainer.addChild(this._tipTxt);

		let bottomBg = BaseBitmap.create("public_9_bg4");
        bottomBg.width = 542-20;
        bottomBg.height = 720;
		bottomBg.name = "bottomBg"
		// bottomBg.height = 240;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = txtBg.y + txtBg.height + 10;
        this._nodeContainer.addChild(bottomBg);

		// let dataList =  Config.StudyatkCfg.getStudyatkList();
        let dataList = Config.WifebattleCfg.getWifeStudyCfgList();
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,532-20,bottomBg.height - 10);
		let scrollList = ComponentManager.getScrollList(WifebattleStudyScrollItem,dataList,rect);
		scrollList.x = bottomBg.x + 5;
		scrollList.y = bottomBg.y + 3;

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
		let itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
		this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_score",[String(itemNum)]);

		let exp = Api.wifebattleVoApi.wifebattleVo.info.ylinfo?Api.wifebattleVoApi.wifebattleVo.info.ylinfo.upexp:0;
		//this._tipTxt1.text = LanguageManager.getlocal("wifeBattleStudy_tipTxt1",[String(exp)]);
		// this._tipTxt1.x = this.viewBg.width/2 - 40 - this._tipTxt1.width;
		// this._tipTxt.x = this.viewBg.width/2 + 40;
		if(event){
			let rData = event.data.data;
			if(rData.ret == 0 )
			{
				App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_successTip',[`${Number(WifebattleStudyPopupView.lastUpgradeId) + 1}`]));
			} else {
				App.CommonUtil.showTip(LanguageManager.getlocal('wifeBattleStudy_failedTip',[`${Number(WifebattleStudyPopupView.lastUpgradeId) + 1}`]));
			}
		}

	}
	protected getShowHeight():number
	{
		return 851.5+8;
	}
	protected getShowWidth():number
	{
		return 580;
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }
	// protected getBgExtraHeight():number
	// {
	// 	return 70;
	// }
	public hide():void
	{
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