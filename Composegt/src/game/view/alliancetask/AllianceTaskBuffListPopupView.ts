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
		wealthTxt.y = 10;
        this.addChildToContainer(wealthTxt);
		
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 540;
		bg.height = 560;
		bg.x = this.viewBg.width/2 - bg.width/2;
		bg.y = wealthTxt.y + 30;
		this.addChildToContainer(bg);

		wealthTxt.x = bg.x  ;

		let rect = new egret.Rectangle(0,0,bg.width-20, bg.height - 20);
		let list = Config.AlliancetaskCfg.getAllianceTaskBuffIdList();
		this._scrollView = ComponentManager.getScrollList(AllianceTaskBuffScrollItem,list,rect);
		this._scrollView.y = bg.y + 10;
		this._scrollView.x = bg.x + 10;;
		this.addChildToContainer(this._scrollView);

		let tipbg = BaseBitmap.create("public_searchdescbg");
		tipbg.width = 550;
		// tipbg.height = 50;
		tipbg.x = this.viewBg.width/2 - tipbg.width/2;
		tipbg.y = 650;
		this.addChildToContainer(tipbg);

		let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("allianceTaskbuffTip1");
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
		return 700;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"alliance_taskIcon1",
			"alliance_taskIcon2",
			"alliance_taskIcon3",
			"alliance_taskIcon4",
			"alliance_taskIcon5",
		]);
	}
	
	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_BUFF),this.refreshWealth,this);
		this._scrollView = null;
		this._wealthTxt = null;
		
		super.dispose();
	}
}