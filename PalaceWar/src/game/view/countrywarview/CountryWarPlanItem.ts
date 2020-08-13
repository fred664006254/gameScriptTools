/**
 * 	计策item相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarPlanItem
 */
class CountryWarPlanItem extends ScrollListItem {

    private _data = null;
    private _cityId = null;
    public constructor() {
        super();
    }

    protected initItem(index: number, data: any, itemParam: any) {

        this._cityId = itemParam.cityId;
        this._data = data;
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 530;
        bg.height = 105;
        this.addChild(bg);

        let itemNum = Api.itemVoApi.getItemNumInfoVoById(data.item);
        let itemCfg = Config.ItemCfg.getItemCfgById(data.item);

         let itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemDescTxt.width = 260;
        let num = Math.floor(itemDescTxt.height / itemDescTxt.size);
        if(num > 2)
        {
            let offNum = num - 2;
            bg.height += offNum * ((itemDescTxt.size + 3) * offNum);
        }
        itemDescTxt.lineSpacing = 3;
         

        let scaleValue = 0.75;
        let itemDB = itemCfg.getIconContainer();
        itemDB.setScale(scaleValue);
        itemDB.setPosition(bg.x + 20, bg.y + bg.height / 2 - itemDB.height * scaleValue / 2);
        this.addChild(itemDB);

        if (itemNum && itemNum > 0) {
			let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
			itemDB.addChild(numbg)

            let itemNumTxt = ComponentManager.getTextField(String(itemNum), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            itemDB.addChild(itemNumTxt);

			if (itemNum>99)
			{
				numbg.width = itemNumTxt.width+18;
			}
			numbg.name="numbg";
			numbg.setPosition(68,85);
			itemNumTxt.setPosition(numbg.x+15,numbg.y);
            // itemNumTxt.setPosition(itemDB.x + itemDB.width * scaleValue - 6 - itemNumTxt.width, itemDB.y + itemDB.height * scaleValue - 6 - itemNumTxt.height);
        }

        let itemNameTxt = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        itemNameTxt.setPosition(itemDB.x + itemDB.width * scaleValue + 15, bg.y + 15);
        this.addChild(itemNameTxt);

        // let itemDescTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // itemDescTxt.width = 260;
        // itemDescTxt.lineSpacing = 3;
        itemDescTxt.setPosition(itemNameTxt.x, itemNameTxt.y + itemNameTxt.height + 5);
        this.addChild(itemDescTxt);

        let useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "useBtn", () => {
            //使用计策
            if(Api.switchVoApi.checkOpenServerMaintain()){
                App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
                return;
            }
            let desc1 = LanguageManager.getlocal("countryWarPlanDesc1");
            let titleKey = "countryWarOrderUseTitle";
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCONFIRMPOPUPVIEW, { type: 3, desc1: desc1, titleKey:titleKey,callbackHandle: this.usePlanCallback, handle: this })

        }, this);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 15, bg.y + bg.height / 2 - useBtn.height / 2);
        this.addChild(useBtn);

        let buyBtn: BaseButton = null;
        if (data.cost && itemNum <= 0) {
            
            //购买计策
            let playerNum = Api.playerVoApi.getPlayerGem();
            buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", () => {
                if(Api.countryWarVoApi.isPlanLimit(this._data.id,data.limit))
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarPlanLimitTip"));
                    return;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMSLIDERPOPUPVIEW,
                    {
                        "confirmCallback": this.buyPlanCallback,	//确认回调函数
                        "maxNum": data.limit,						//物品的限制数量
                        "shopItemCost": data.cost,			        //物品的价格
                        "shopItemName": itemCfg.name,				//物品的名字
                        "handler": this,							//target
                        "playerNum": playerNum,						//当前的拥有的元宝数
                        "id": 1,									//消耗物品的id
                    }
                );
                
                // NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM,{straId:data.id});
            }, this);
            buyBtn.setPosition(useBtn.x + useBtn.width / 2 - buyBtn.width / 2, useBtn.y + useBtn.height / 2 - buyBtn.height / 2);
            buyBtn.setText(String(data.cost), false)
            buyBtn.addTextIcon("public_icon1");
            this.addChild(buyBtn);
        }

        let useBM = BaseBitmap.create("awused");
        useBM.setPosition(useBtn.x + useBtn.width / 2 - useBM.width / 2, useBtn.y + useBtn.height / 2 - useBM.height / 2);
        this.addChild(useBM);

        let servant = Api.countryWarVoApi.isCityHaveServant(Api.countryWarVoApi.getServerCityId(this._cityId));
        if (servant.stra && servant.stra == data.id) {
            useBM.setVisible(true);
            useBtn.setVisible(false);
            if (buyBtn) {
                buyBtn.setVisible(false);
            }
        }
        else {
            useBM.setVisible(false);
            if (itemNum <= 0) {
                if (buyBtn) {
                    buyBtn.setVisible(true);
                    useBtn.setVisible(false);
                }
                else {
                    useBtn.setVisible(true);
                    useBtn.setEnable(false);
                }
            }
            else {
                if (buyBtn) {
                    buyBtn.setVisible(false);
                }
                useBtn.setVisible(true);
            }
        }

    }
    /**
     * 使用计策回调
     */
    private usePlanCallback() {
        if(Api.switchVoApi.checkOpenServerMaintain()){
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSTRATAGEM, { straId: this._data.id, city: Api.countryWarVoApi.getServerCityId(this._cityId) });
    }
    /**
     * 买计策回调
     */
    private buyPlanCallback() {
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_BUYSTRATAGEM,{straId:this._data.id});
    }
    public dispose(): void {
        this._data = null;
        this._cityId = null;
        super.dispose();
    }
}