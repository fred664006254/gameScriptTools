/**
 * 暴击虎牢关礼包
 * author 赵占涛
 */

class AcHuLaoGiftListPopupView  extends PopupView
{
    private _aid:string = "";
	private _code:string = "";
    private _list:ScrollList;

    private get cfg() : Config.AcCfg.HuLaoCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
    }
	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT),this.buyCallback,this);

        let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height =620
        bg1.x =42;
        bg1.y =10;
        this.addChildToContainer(bg1);

		let scroRect = new egret.Rectangle(0, 0, 518, 680);
        this.cfg.vipshopNum
        let scrollList = ComponentManager.getScrollList(AcHuLaoGiftListScrollItem, this.cfg.vipshopNum, scroRect);
		this.addChildToContainer(scrollList);
		scrollList.x = 53;
        scrollList.y = 20;
		this._list = scrollList;
    }
    private buyCallback(data) {
        if (data.data.ret) {            
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.data.data.data.rewards,"otherRewards":data.data.data.data.otherrewards,"isPlayAni":true});
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
        }
        this._list.refreshData(this.cfg.vipshopNum);
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "activity_charge_red"
		]);
	}
    public dispose()
    {
        this._aid = "";
        this._code = "";
        this._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT),this.buyCallback,this);
        super.dispose()
    }
}