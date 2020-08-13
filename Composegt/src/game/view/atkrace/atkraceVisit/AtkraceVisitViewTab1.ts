/**
 * 防守消息
 */
class AtkraceVisitViewTab1 extends PopupViewTab
{

	public defenseList: AtkraceDefendInfo[] = [];
	public _scrollList: ScrollList=null;

	private noDataTxt:BaseTextField =null;
	/**
	 * 这个参数没啥卵用还碍事，干掉
	 */
	// public static AtkaceType:number =0;
	public  _bg:BaseBitmap=null;
    public constructor() 
	{
		super();
		this.initView();
	}
	
	public initView():void
	{
		this._bg= BaseBitmap.create("public_9v_bg12");
		this._bg.width=530;
		this._bg.height=678;
		this._bg.x =GameConfig.stageWidth/2 - this._bg.width/2 -5;
		this._bg.y =75;
		this.addChild(this._bg);

		this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		this.noDataTxt.x =this._bg.x;
		this.noDataTxt.width =this._bg.width;
		this.noDataTxt.textAlign ="center";
		this.noDataTxt.y = 300;
		this.addChild(this.noDataTxt);
		
		// AtkraceVisitViewTab1.AtkaceType =0;
		NetManager.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
    }

	/**
	 * 切换页签
	 */
	public refreshWhenSwitchBack(): void {
		this.refreshViews();
	}

	public useCallback(data:any):void {
		if(data.data.ret) {
			this.refreshViews();
		} else {
			this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
		}
	}

	private refreshViews() {
		this.defenseList = Api.atkraceVoApi.getDefendInfo();
		if (this.defenseList.length > 0) {
			this.showList();
			this.noDataTxt.text = "";
		}
		else 
		{
			this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
		}	
	}

   public  showList(): void 
   {
	   if(this._scrollList==null)
	   {	
		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 640, 655);
			this._scrollList = ComponentManager.getScrollList(ActrackVisitTab1Item, [], rect);
			this.addChild(this._scrollList);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5, 85);
	   }
	   this._scrollList.refreshData(this.defenseList);
	}

    public dispose():void
	{

		this.noDataTxt  =null;
		this.defenseList =[];
		this._scrollList=null;
   		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
		// AtkraceVisitViewTab1.AtkaceType =0;
		this._bg = null;
		super.dispose();
   }
}