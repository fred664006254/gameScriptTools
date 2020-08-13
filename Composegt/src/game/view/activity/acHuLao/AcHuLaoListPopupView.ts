/**
 * 虎牢关兑换
 * author 赵占涛
 * @class AcHuLaoListPopupView
 */

class AcHuLaoListPopupView  extends PopupView
{
    private _aid:string = "";
	private _code:string = "";
    private _list:ScrollList;

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN),this.exchangeCallback,this);

        let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height =620
        bg1.x =42;
        bg1.y =10;
        this.addChildToContainer(bg1);

		let scroRect = new egret.Rectangle(0, 0, 518, 680);
        let scrollList = ComponentManager.getScrollList(AcHuLaoListScrollItem, [1], scroRect);
		this.addChildToContainer(scrollList);
		scrollList.x = 53;
        scrollList.y = 20;
		this._list = scrollList;
    }
    private exchangeCallback(data) {
        if (data.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip"));
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("candyGetTip2"));
        }
        this._list.refreshData([1]);
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
        this._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN),this.exchangeCallback,this);
        super.dispose()
    }
}