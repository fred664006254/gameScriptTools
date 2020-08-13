/**
 *帮会任务buff
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskBuffListPopupView

 */
class AllianceTaskBuffListPopupView extends PopupView
{
	private _scrollView:ScrollList = null;
	private _wealthTxt:BaseTextField;
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF),this.refreshWealth,this);

		let wealthTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_BROWN);
        this._wealthTxt = wealthTxt;
		wealthTxt.x = 28 +GameData.popupviewOffsetX;
		wealthTxt.y = 10;
        this.addChildToContainer(wealthTxt);
		

		let rect = new egret.Rectangle(0,0,530, 530);
		let list = Config.AlliancetaskCfg.getAllianceTaskBuffIdList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskBuffScrollItem,list,rect);
		this._scrollView.y = wealthTxt.y + 30;
		this._scrollView.x = this.viewBg.width/2 - this._scrollView.width/2;
		this.addChildToContainer(this._scrollView);

		let tipbg = BaseBitmap.create("public_searchdescbg");
		tipbg.width = 500;
		// tipbg.height = 50;
		tipbg.x = this.viewBg.width/2 - tipbg.width/2;
		tipbg.y = 610;
		this.addChildToContainer(tipbg);

		let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("allianceTaskbuffTip1",[String(App.DateUtil.formatSvrHourByLocalTimeZone(0).hour)]);
		tipTxt.x = this.viewBg.width/2  - tipTxt.width/2 ;
		tipTxt.y = tipbg.y + tipbg.height/2 - tipTxt.height/2 ;
        this.addChildToContainer(tipTxt);

		this.refreshWealth();
	}
	
	protected refreshWealth()
	{
		let wealth = Api.allianceVoApi.getAllianceVo().wealth;
		this._wealthTxt.text = LanguageManager.getlocal("allianceTaskBuffValue",["" + wealth ]);
	}
	
	protected getShowHeight():number
	{
		return 660;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF),this.refreshWealth,this);
		this._scrollView = null;
		this._wealthTxt = null;
		
		super.dispose();
	}
}