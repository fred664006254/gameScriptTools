 //帮会累计充值
class AcAlliaceToTalRankListPopupView  extends PopupView
{
    private _aid:string = "";
	private _code:string = "";
	private _nodeContainer:BaseDisplayObjectContainer;
    private _acRankInfoVo:AcRankInfoVo = null;
    private _allirank:AcRankInfoVo = null;
    private _scrollView:ScrollList;
    private dataList=null;
	public constructor() {
		super();
	}

	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        let startY = 20;
        
        let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 700-5;
        bg1.x = this.viewBg.width/2 - bg1.width/2; 
        this._nodeContainer.addChild(bg1); 
        let titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
       
        
        let bg2= BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        
        let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acAlliance_Serial"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt1.x = bg2.x+40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(titleTxt2Str,titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.name = "titleTxt2"
        titleTxt2.x = bg2.x+195;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);


        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acAlliance_pos"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt3.name = "titleTxt3"
        titleTxt3.x = bg2.x+365;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);

        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height -  60); 
        let scrollView = ComponentManager.getScrollList(AcAlliaceTotalListScrollItem,this.dataList,rect);
        scrollView.y = bg2.y+50;
        scrollView.x = GameData.popupviewOffsetX;
        this._nodeContainer.addChild(scrollView);
       	scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
        this._scrollView = scrollView;



        let downDes = ComponentManager.getTextField(LanguageManager.getlocal("acAlliaceRechargeDes"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
        downDes.name = "titleTxt3";
        downDes.x =bg1.x+bg1.width/2-downDes.width/2;
        downDes.y = bg1.height+30;
        this._nodeContainer.addChild(downDes);
    } 

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGETOTALINFO,requestData:{activeId: AcConst.AID_AllIANCERECHARGETOTAL+"-"+this.param.data.code}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if(data.ret)
        { 
            this.dataList = data.data.data.chargeList;
        } 
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}
    public dispose()
    {
        this._aid = "";
        this._code = "";
        this._nodeContainer =null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._allirank = null;

        super.dispose()
    }
}