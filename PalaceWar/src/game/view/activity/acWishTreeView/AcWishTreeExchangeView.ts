/**
 * 红颜许愿兑换
 * author yanyuling
 * date 2018/03/13
 * @class AcWishTreeExchangeView
 */
class AcWishTreeExchangeView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _curownTxt:BaseTextField;
    private _scrollList:ScrollList;

	public constructor() 
	{
		super();
	}

    public initView()
    {  
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE),this.exchangeHandler,this);
        this._nodeContainer = new  BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);
        
        this._curownTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curownTxt.x = 8
        this._curownTxt.y = 5;
        this._nodeContainer.addChild(this._curownTxt);
   
        let maskbg = BaseBitmap.create("public_9_bg23");
        maskbg.width = GameConfig.stageWidth;
        maskbg.height = GameConfig.stageHeigth - this.container.y - this._curownTxt.y - 30;
        maskbg.y = this._curownTxt.y +35;
        this._nodeContainer.addChild(maskbg);

        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,maskbg.height-8);
        let scrollList = ComponentManager.getScrollList(AcWishTreeExchangeItem,[],rect);
        scrollList.y = maskbg.y + 4;
        scrollList.x = 10;
        this._scrollList = scrollList;
        scrollList.bounces = false;
        this._nodeContainer.addChild(scrollList);
        this.refreshUI();
    }

    protected refreshUI()
    {
        let aid = this.param.data.aid;
        let code = this.param.data.code;
        let acVo = Api.acVoApi.getActivityVoByAidAndCode(aid,code);
		this._curownTxt.text   = LanguageManager.getlocal("acWishTreeown",["" + Api.itemVoApi.getItemNumInfoVoById("2102")]);
        
        let cfg  = <Config.AcCfg.WishTreeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
        let list = cfg.getWishWifeIdList();
        this._scrollList.refreshData(list);
    }

    protected exchangeHandler(event:egret.Event)
    {
        let rdata = event.data.data
        if(rdata.ret != 0)
        {
            return;
        }
        this.refreshUI();
    }

    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE),this.exchangeHandler,this);
        this._nodeContainer = null;
        this._curownTxt = null;
        this._scrollList = null;

		super.dispose();
	}

}