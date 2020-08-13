/**
 * 仇人
 */
class AtkraceVisitViewTab2 extends PopupViewTab
{

    private einList: AtkraceEnemyInfo[] =[];
	private _scrollList: ScrollList=null;
	private _bg:BaseBitmap=null;

	private noDataTxt:BaseTextField =null;

    public constructor() 
	{
		super();
        this.initView();
	} 

	protected initView():void
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

		// AtkraceVisitViewTab1.AtkaceType =1;
		NetManager.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
    }

	/**
	 * 切换页签
	 */
	public refreshWhenSwitchBack(): void {

	}

	public  useCallback(data:any):void
	{
		if(data.data.ret) {
			this.refreshViews();
		} else {	
			this.noDataTxt.text = LanguageManager.getlocal("atkracedes2");
		}	
	}

	private refreshViews() {
		this.einList = Api.atkraceVoApi.getEnemyInfo();
		if (this.einList.length > 0) {
			this.showList();
			this.noDataTxt.text = "";
		} else {
			this.noDataTxt.text = LanguageManager.getlocal("atkracedes2");
		}
	}
	
    public showList():void
    {
		if (!this._scrollList) {
			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 640, 655);
			this._scrollList = ComponentManager.getScrollList(ActrackVisitTab2Item, [], rect);
			this.addChild(this._scrollList);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5, 85); 
		}
		this._scrollList.refreshData(this.einList);
    }


    public dispose():void
	{
		this._scrollList = null;
		this.noDataTxt = null;
		this.einList=[];
		this._bg =null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
		super.dispose();
		// AtkraceVisitViewTab1.AtkaceType=1;
   	}

}