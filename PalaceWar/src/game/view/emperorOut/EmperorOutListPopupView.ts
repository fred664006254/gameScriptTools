/**
 * 出巡帝王列表
 * date 2019.12.12
 * author ycg
 * @class EmperorOutListPopupView
 */
class EmperorOutListPopupView extends PopupView{
    private _scrollList:ScrollList = null;

    public constructor(){
        super();
    }
 
    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.sendBarrageCallback, this);
        
        let data = Api.emperorAchieveVoApi.getOutList();
        let rect = new egret.Rectangle(0, 0, 548, 685);
        let list = ComponentManager.getScrollList(EmperorOutListScrollItem, data, rect);
        list.setPosition(11+GameData.popupviewOffsetX, 5);
        this.addChildToContainer(list);
        this._scrollList = list;
    }

    private sendBarrageCallback():void{
        let data = Api.emperorAchieveVoApi.getOutList();
        this._scrollList.refreshData(data);
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "emperorout_wishitembg1", "emperorout_wishitembg2", "emperorout_wishbtn", "emperorout_empvisitbtn"
        ]);
    }

    protected getTitleStr():string{
        return "emperorOutListTitle";
    }

    protected getShowHeight():number{
        return 760;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.sendBarrageCallback, this);
        this._scrollList = null;
        super.dispose();
    }
}