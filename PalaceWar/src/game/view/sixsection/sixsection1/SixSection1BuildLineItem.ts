/**
* 兵部 边线 item
* date 2020.5.9
* author ycg
* @name SixSection1BuildLineItem
*/
class SixSection1BuildLineItem extends ScrollListItem{
    private _lineBg:BaseBitmap = null;
    private _lineNum:BaseTextField = null;
    private _data:any = null;
    private _seatH:number = 0;
    private _itemHeightArr:any = {};

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        this.width = 30;
        this._data = data;
        let isBig = param.isBig;
        let scale = 1;
        if (isBig){
            scale = 2;
        }

        let itemH = 0;
        let seatH = 0;
        if (param.itemArr){
            this._itemHeightArr = param.itemArr;
            let itemHData = this.getSeatItemHeight();
            itemH = itemHData.itemH;
            seatH = itemHData.seatH;
        }
        else{
            let buildItem = new SixSection1BuildScrollItem();
            buildItem.initItem(0, data, {isBig: isBig});
            itemH = buildItem.height;
            seatH = buildItem.getSeatItemHeight();
        }
        // let buildItem = new SixSection1BuildScrollItem();
        // buildItem.initItem(0, data, {isBig: isBig});
        // let itemH = buildItem.height;
        // let seatH = buildItem.getSeatItemHeight();
        this._seatH = seatH;
        // App.LogUtil.log("seatH "+seatH);
        
        
        let lineBg = BaseBitmap.create("public_9_bg92");;
        lineBg.width = 30;
        lineBg.height = itemH + 0.5;
        this.addChild(lineBg);
        lineBg.alpha = 0.6;
        this._lineBg = lineBg;

        let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, lineBg.y + seatH/2 - lineNum.height/2 + 15);
        if (isBig){
            lineNum.y = lineBg.y + seatH/2 - lineNum.height/2 + 15 * scale + 30;
        }
        let baseIndex = data.baseCfg.index;
        if (baseIndex == 0){
            lineNum.y = 280 * scale;
        }
        this._lineNum = lineNum;
        this.addChild(lineNum);
        this.height = itemH;
        
        // App.LogUtil.log("iemH: "+itemH + data.lineNum);
        // lineContainer.addChild(lineNum);
        // App.LogUtil.log("lineitem h "+this.height);
    }

    private getSeatItemHeight():any{
        let line = this._data.lineNum;
        let itemH = 0;
        let seatH = 0;
        for (let i=0; i < line; i++){
            if (this._itemHeightArr[i] && this._itemHeightArr[i].itemH){
                itemH = this._itemHeightArr[i].itemH;
                seatH = this._itemHeightArr[i].seatH;
            }
        }
        return {itemH: itemH, seatH: seatH};
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }

    public dispose():void{
        this._lineBg = null;
        this._lineNum = null;
        this._data = null;
        this._itemHeightArr = {};

        super.dispose();
    }
}