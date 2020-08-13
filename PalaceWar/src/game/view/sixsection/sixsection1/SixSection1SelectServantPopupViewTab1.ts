/**
* 门客选择
* date 2020.
* author ycg
* @name SixSection1SelectServantPopupViewTab1
*/
class SixSection1SelectServantPopupViewTab1 extends CommonViewTab{
    private _scrollList:ScrollList = null;
    private _servantData:any[] = [];
    private _selList:any[] = [];

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        this.width = 530;
        this.height = 400;
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 360;
        bg.x = 26;
        bg.y = 0;
        this.addChild(bg);

        let servantList = this.freshServantListData();
        this._servantData = servantList;
        let scrollList = ComponentManager.getScrollList(SixSection1SelectServantScrollItem1, servantList, new egret.Rectangle(0, 0, 510, 350), {callback: this.isCanSel, obj: this});
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    public freshServantListData():any[]{
        let list:any[] = [];
        // let servantList = Api.sixsection1VoApi.getServantInfoIdListWithSort();
        let servantList = Api.sixsection1VoApi.getSortServantList();
        let useList:any[] = [];
        for (let i=0; i < servantList.length; i++){
            if (Api.sixsection1VoApi.isUsedServant(servantList[i])){
                useList.push(servantList[i]);
            }
            else{
                list.push(servantList[i]);
            }
        }
        let data:any[] = list.concat(useList);
        return data;
    }

    //派遣
    public selServantRefresh(evt:egret.Event){
        if (evt && evt.data){
            if (evt.data.type == "servant"){
                let isFind = false;
                let index = this._selList.length > 0 ? this._selList.length : 0;;
                for (let i=0; i < this._selList.length; i++){
                    if (this._selList[i] && this._selList[i] < 0){
                        this._selList[i] = Number(evt.data.id); 
                        isFind = true;
                        index = i;
                        break;
                    }
                }
                if (!isFind){
                    this._selList[index] = Number(evt.data.id);
                } 
            }
        }
    }

    //取消派遣
    public cancelSelServant(id:number){
        for (let i=0; i < this._selList.length; i++){
            if (id == this._selList[i]){
                this._selList[i] = -1;
            }
        }
        let index = 0;
        for (let i=0; i < this._servantData.length; i++){
            if (id == Number(this._servantData[i])){
                index = i;
                break;
            }
        }
        let item = <SixSection1SelectServantScrollItem1>this._scrollList.getItemByIndex(index);
        item.update(false);
    }

    public isCanSel():boolean{
        let count = 0;
        for (let i=0; i < this._selList.length; i++){
            if (this._selList[i] > 0){
                count +=1;
            }
        }
        if (count >= 5){
            return false;
        }
        return true;
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        this._scrollList = null;
        this._servantData = [];
        this._selList = [];
        super.dispose();
    }
}