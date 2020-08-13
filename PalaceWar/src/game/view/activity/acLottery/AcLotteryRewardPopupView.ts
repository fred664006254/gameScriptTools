/**
 *  充值奖励
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryPopupView
 */
class AcLotteryRewardPopupView extends PopupView
{
    
    private _scrollList:ScrollList = null; 
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
	}

	public initView():void
	{  
		this._nodeContainer = new BaseDisplayObjectContainer();
		this._nodeContainer.x = GameData.popupviewOffsetX;
        this.addChildToContainer(this._nodeContainer);

        let bg1= BaseBitmap.create("public_9_bg32");
        bg1.width = 532;
		bg1.height = 700;
		bg1.x =18;
		bg1.y =10;
		this._nodeContainer.addChild(bg1); 

        var keys  =this.cfg.recharge; 
        let tmpRect = new egret.Rectangle(0,0,522,690);
        this._scrollList = ComponentManager.getScrollList(AcLotteryScrollItem,keys,tmpRect,this.param.data.code);
        this._scrollList.setPosition(23,15);  
		this._nodeContainer.addChild(this._scrollList);
		 
	}  

	protected getShowHeight():number
	{
		return 790;
	} 

	protected getTitleStr():string
	{
		return "inviteViewTab3Title";
	}   
    private get cfg() : Config.AcCfg.LotteryCfg{
   
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

	public dispose():void
	{ 
		this._nodeContainer =null;
		this._scrollList  =null;
		super.dispose();
	}
}