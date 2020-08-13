/**
 * 武穆遗书
 * author yanyuling
 * date 2017/11/30
 * @class StudyatkBookPopupView
 */

class StudyatkBookPopupView extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _scrollList:ScrollList;
	private _tipTxt:BaseTextField;
	public constructor() {
		super();
	}

	protected initView():void
	{	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE),this.upgradeCallback,this);

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let txtBg = BaseBitmap.create("public_tc_bg02");
		txtBg.x = this.viewBg.width/2 - txtBg.width/2;
		txtBg.y = 15;
		this._nodeContainer.addChild(txtBg);


		this._tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt",[App.StringUtil.changeIntToText(Api.studyatkVoApi.getStudySkillInfoTotalExp())]);
		this._tipTxt.x = this.viewBg.width/2 - this._tipTxt.width/2;
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

		let dataList =  Config.StudyatkCfg.getStudyatkList();
		
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,600+10);
		let scrollList = ComponentManager.getScrollList(StudyatkBookScrollItem,Object.keys(dataList),rect);
		scrollList.x = bottomBg.x + 5;
		scrollList.y = bottomBg.y + 5 + 7;

		this._scrollList = scrollList;
		this._nodeContainer.addChild(scrollList);
		this.scrollPos();
		this.upgradeCallback();
	}
	protected scrollPos()
	{
		let idx  = Api.studyatkVoApi.getStudySkillInfoLv() ;
		this._scrollList.setScrollTopByIndex(idx);
	}
	protected upgradeCallback()
	{
		this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt",[App.StringUtil.changeIntToText(Api.studyatkVoApi.getStudySkillInfoTotalExp())]);
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
			"public_grasp"
		]);
	}
	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE),this.upgradeCallback,this);
		this._nodeContainer = null;
		this._scrollList = null;

		super.dispose();
	}
}