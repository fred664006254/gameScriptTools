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

		this._tipTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
		this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt",[Api.studyatkVoApi.getStudySkillInfoTotalExp()]);
		this._tipTxt.x = this.viewBg.width/2 - this._tipTxt.width/2;
		this._tipTxt.y = 20;
		this._nodeContainer.addChild(this._tipTxt);

		let bottomBg = BaseBitmap.create("public_9_bg39");
        bottomBg.width = 520;
        bottomBg.height = 522;
		bottomBg.name = "bottomBg"
		// bottomBg.height = 240;
		bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = 50;
        this._nodeContainer.addChild(bottomBg);

		let dataList =  Config.StudyatkCfg.getStudyatkList();
		
		let rect = egret.Rectangle.create();
		 rect.setTo(0,0 ,bottomBg.width,bottomBg.height-10);
		let scrollList = ComponentManager.getScrollList(StudyatkBookScrollItem,Object.keys(dataList),rect);
		scrollList.y = bottomBg.y + 5;
		scrollList.x = bottomBg.x;
		this._scrollList = scrollList;
		this._nodeContainer.addChild(scrollList);
		this.scrollPos();
		this.upgradeCallback();
	}
	protected scrollPos()
	{
		let idx  = Api.studyatkVoApi.getStudySkillInfoLv() ;
		let topH = idx * 120;
		this._scrollList.setScrollTopByIndex(idx);
	}
	protected upgradeCallback()
	{
		this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt",[Api.studyatkVoApi.getStudySkillInfoTotalExp()]);
	}
	protected getShowHeight():number
	{
		return 660;
	}
	// protected getBgExtraHeight():number
	// {
	// 	return -130;
	// }
	public dispose():void
	{	 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE),this.upgradeCallback,this);
		this._nodeContainer = null;
		this._scrollList = null;

		super.dispose();
	}
}