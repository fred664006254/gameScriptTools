/**
 * 帝位称号 tab2
 * date 2019.12.10
 * author ycg
 * @class EmperorAchieveViewTab1
 */
class EmperorAchieveViewTab2 extends AcCommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.refreshView, this);
        this.height = 650;
        this.width = 532;
        let data = Config.EmperorachieveCfg.getKing1CfgList();
        let rect =  new egret.Rectangle(0, 0, this.width, this.height - 15);
        let scrollList = ComponentManager.getScrollList(EmperorAchieveViewScrollItem, data, rect, {type:1});
        scrollList.setPosition(0, 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        // let scorIndex = Api.emperorAchieveVoApi.getCurrKingAchieveId(1);
        // App.LogUtil.log("scrollindex: "+scorIndex);
        // if (scorIndex > 0){
        //     scrollList.setScrollTopByIndex(scorIndex, 500);
        // }
    }

    private refreshView(evt:egret.Event){
        if (this._scrollList){
            let data = Config.EmperorachieveCfg.getKing1CfgList();
            this._scrollList.refreshData(data, {type: 1});
        } 
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.refreshView, this);
        this._scrollList = null;
        super.dispose();
    }
}