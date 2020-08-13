/**
 * 门客羁绊buff详情
 */

class ServantJibanBuffPopView extends PopupView
{
	public constructor() {
		super();
    }
    
    private _list : ScrollList = null;

	public initView():void
	{
        // public_tcdw_bg01
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, view.callBack, view);
        let servantId = this.param.data.sid;
        let num = Config.ServentcombinationCfg.getCombineNums(servantId);
        let arr = [];
        for(let i = 1; i <= num; ++ i){
            arr.push(i);
        }
        let list = ComponentManager.getScrollList(ServantJibanBuffItem, arr, new egret.Rectangle(0,0,526,690), servantId);
        this.addChildToContainer(list);
        list.x = 53;
        list.y = 26;
        view._list = list;
    }

    private callBack(evt : egret.Event){
        let view = this;
        if(evt.data.ret){
            let servantId = this.param.data.sid;
            let num = Config.ServentcombinationCfg.getCombineNums(servantId);
            let arr = [];
            for(let i = 1; i <= num; ++ i){
                arr.push(i);
            }
            view._list.refreshData(arr,servantId);
        }
    }
    protected getShowHeight():number{
        return 820;
    }

    public dispose()
    {
        let view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, view.callBack, view)
        super.dispose();
    }
}