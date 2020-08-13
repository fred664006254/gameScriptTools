/**
 * 特惠礼包 tab1
 * date 2019.11.28
 * author ycg
 * @class AcAnniversaryShop2020ViewTab1
 */
class AcAnniversaryShop2020ViewTab1 extends AcCommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(){
        super();
        this.initView();
    }

    public initView(){
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
    
        let parentView = <AcAnniversaryShop2020View>ViewController.getInstance().getView("AcAnniversaryShop2020View");
        this.width = GameConfig.stageWidth;
        this.height = parentView.getTabViewHeight();

        let dataList = this.cfg.shop1DataList;
        App.LogUtil.log("datalist.lenth:"+dataList.length + "this.height: "+this.height);
        let rect =  new egret.Rectangle(0, 0, this.width, this.height - 13);
        let scrollList = ComponentManager.getScrollList(AcAnniversaryShop2020Tab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code, dataLength: dataList.length - 1});
        scrollList.setPosition(0, 0);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        // let itemNumBg = BaseBitmap.create("public_9_bg80");
        // this.addChild(itemNumBg);
        // itemNumBg.name = "itemNumBg";

        // let currNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        // let itemNum = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_price-"+this.getTypeCode(), [""+currNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        // itemNumBg.setPosition(this.width - itemNumBg.width + 35, this.height - 80);
        // itemNum.setPosition(itemNumBg.x + itemNumBg.width - 45 - itemNum.width, itemNumBg.y + itemNumBg.height/2 - itemNum.height/2);
        // this.addChild(itemNum);
        // itemNum.name = "itemNum";

        let itemCfg = Config.ItemCfg.getItemCfgById(this.cfg.itemId);
        let icon = BaseLoadBitmap.create(itemCfg.icon);
        icon.width = 100;
        icon.height = 100;
        // icon.setPosition(itemNum.x - icon.width, itemNumBg.y + itemNumBg.height/2 - icon.height/2);
        icon.setPosition(this.width - icon.width - 20, this.height - 120);
        icon.name = "icon";
        this.addChild(icon);

        let itemNumBg = BaseBitmap.create("public_9_bg80");
        this.addChild(itemNumBg);
        itemNumBg.name = "itemNumBg";

        let currNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        let itemNum = ComponentManager.getTextField(""+currNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        itemNumBg.setPosition(icon.x + icon.width/2 - itemNumBg.width/2, icon.y + icon.height - itemNumBg.height + 15);
        itemNum.setPosition(itemNumBg.x + itemNumBg.width/2 - itemNum.width/2, itemNumBg.y + itemNumBg.height/2 - itemNum.height/2);
        this.addChild(itemNum);
        itemNum.name = "itemNum";
    }

    public getTypeCode():string{
        return this.code;
    }

    private refreshView():void{
        if (this._scrollList){
            let data = this.cfg.shop1DataList;
            this._scrollList.refreshData(data, {aid:this.aid, code:this.code, dataLength: data.length - 1});
            this.freshItemInfo();
        }
    }

    private freshItemInfo():void{
        let icon = <BaseLoadBitmap>this.getChildByName("icon");
        let itemNumBg = <BaseBitmap>this.getChildByName("itemNumBg");
        let itemNum = <BaseTextField>this.getChildByName("itemNum");
        let currNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemId);
        itemNum.text = ""+currNum;
        // itemNum.text = LanguageManager.getlocal("acAnniversaryShop2020_price-"+this.getTypeCode(), [""+currNum]);
        // itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        // itemNumBg.x = this.width - itemNumBg.width + 35;
        // itemNum.x = itemNumBg.x + itemNumBg.width - 45 - itemNum.width;
        // icon.x = itemNum.x - icon.width;
        itemNumBg.width = itemNum.width + 40 > itemNumBg.width ? itemNum.width + 40 : itemNumBg.width;
        itemNumBg.setPosition(icon.x + icon.width/2 - itemNumBg.width/2, icon.y + icon.height - itemNumBg.height + 15);
        itemNum.setPosition(itemNumBg.x + itemNumBg.width/2 - itemNum.width/2, itemNumBg.y + itemNumBg.height/2 - itemNum.height/2);
    }

    private get cfg():Config.AcCfg.AnniversaryShop2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcAnniversaryShop2020Vo{
        return <AcAnniversaryShop2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;

        super.dispose();
    }
}