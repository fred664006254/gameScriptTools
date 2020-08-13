/**
  * 国庆活动充值奖励Groupitem
  * author yangchengguo
  * date 2019.9.9
  * @class AcNationalDayRechargeGroupScrollItem
  */
class AcNationalDayRechargeGroupScrollItem extends ScrollListItem {
    private _data:any= [];
    private _aid:string = null;
    private _code:string = null;
    private _chargeItems:AcNationalDayRechargeScrollItem[] = [];

	  public constructor() {
		    super();
	  }
    /**
     * 初始化itemview
     */
    public initItem(index: number, itemData:any, itemParam: any): void {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = itemData;
        this._chargeItems = [];

        let topBgStr = ResourceManager.hasRes("acnationalday_charge_item_flag-"+this.getTypeCode()+"_"+itemData.id) ? "acnationalday_charge_item_flag-"+this.getTypeCode()+"_" +itemData.id : "acnationalday_charge_item_flag-1_"+itemData.id;
        let topBg = BaseBitmap.create(topBgStr);
        this.addChild(topBg);
        if (index > 0 ){
            topBg.y = 20;
        }

        let topTf = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayChargeItemTitle-"+this.getTypeCode()+"_"+itemData.id), 42, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTf.setPosition(topBg.x + 15, topBg.y + topBg.height/2 - topTf.height/2);
        this.addChild(topTf);

        let itemY = topBg.y + topBg.height + 10;
        for (let i = 0; i < itemData.data.length; i++){
            let item = new AcNationalDayRechargeScrollItem();
            item.initItem(i, itemData.data[i], {aid:this._aid, code:this._code});
            if (i > 0) {
                itemY = this._chargeItems[i-1].y + this._chargeItems[i-1].height + 8;
            }
            else{
                itemY = topBg.y + topBg.height + 10;
            }
            
            item.setPosition(topBg.x, itemY);
            this.addChild(item);
            this._chargeItems[i] = item;
        } 
    }

    public getChargeItems():AcNationalDayRechargeScrollItem[]{
        return this._chargeItems;
    }

    public getTypeCode():string{
        if (this._code == "2"){
           return "1";
        }
        return this._code;
    }

    public dispose():void{
        this._aid = null;
        this._code = null;
        this._chargeItems = [];
        this._data = [];
        super.dispose();
    }
}