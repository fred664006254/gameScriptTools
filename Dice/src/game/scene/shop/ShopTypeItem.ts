
class ShopTypeItem extends ScrollListItem {
    private _type : string = ``;
    private _titleBg : BaseBitmap = null;
    private _titleTxt : BaseTextField = null;
    private _dailyShoptipTxt : BaseTextField = null;
    private _discountShoptipTxt : BaseTextField = null;

    private _dailyShopList : ScrollList = null;
    private _specialVipList : ScrollList = null;
    private _discountShopList : ScrollList = null;
    private _timest : number = 0;
    private _wacthadv1: BaseButton = null;
    private _wacthadv2: BaseButton = null;
    private _wacthstatusadv1: boolean = true;
    private _wacthstatusadv2: boolean = true;
    private _stresslight:BaseBitmap = null;


	public constructor() {
		super();
    }

    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.SHOWSTRESSLIGHT
		];
    }
    
    protected getNetConstEventArr():string[]{
		return [
            NetConst.ADVERTISE_WATCH,
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.SHOWSTRESSLIGHT:
                view.showStressLight(evt);
                break;
        }
    }

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.ADVERTISE_WATCH:
                view.wacthAdsuccess(evt);
                break;
        }
    }
    
	protected initItem(index : number, data : any) {
        let view = this;
        view.initEventListener();
        view.width = GameConfig.stageWidth;
        let type = data.type;
        view._type = type;

        let titleBg = BaseBitmap.create(`shop_item_title_bg3`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleBg, view, [0,0], true);
        view.addChild(titleBg);
        view._titleBg = titleBg;

        let titleTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopitemtype${type}`), 32);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, view._titleBg, [0,0]);
        view.addChild(titleTxt);
        view._titleTxt = titleTxt;

        if(LangMger.checkHasKey(`shopruledesc_${type}`)){
            let ruleBtn = ComponentMgr.getButton(`ab_public_rulebtn`, ``, ()=>{
                //弹说明
                ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                    title : LangMger.getlocal("sysTip"),
                    msg : LangMger.getlocal(`shopruledesc_${type}`),
                    needCancel : false,
                    needClose : 1,
                    
                });
            }, view)
            ruleBtn.width = ruleBtn.height = 46;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, ruleBtn, titleBg, [10,0], true);
            view.addChild(ruleBtn);
            ruleBtn.setScale(0.9);
        }

        switch(type){
            //钻石
            case ShopConst.SHOP_GEM:
                view.initBuyGem();
                break;
            //金币
            case ShopConst.SHOP_GOLD:
                view.initBuyGold();
                break;
            //特权
            case ShopConst.SHOP_SPECIALVIP:
                view.initSpecialVip();
                break;
            //皇家宝箱
            case ShopConst.SHOP_SPECIALBOX:
                view.initSpecialBox();
                break;
            //每日商店
            case ShopConst.SHOP_DAILYSHOP:
                view.initDailyShop();
                break;
            //特价商店
            case ShopConst.SHOP_DISCOUNTSHOP:
                view.initDiscountShop();
                break;
        }

        let mask = BaseBitmap.create(`public_alpha`);
        mask.width = view.width;
        mask.height = view.height;
        view.addChildAt(mask, 1);
    }
    
    //钻石购买栏即充值
    private initBuyGem():void{
        let view = this;
        // view._titleBg.setRes(`shopitemtitlebg3`); 
        view._titleBg.setRes(`shop_item_title_bg1`); 
        view._titleTxt.strokeColor = ColorEnums.strokeBlue;
        view._titleTxt.stroke = 2;

        let cfg = Config.RechargeCfg.getNormalRechargeCfg();
        let arr = [];
        for(let i in cfg){
            let unit = cfg[i];
            if(unit.gemCost){
                arr.push(unit);
            }
        }
        arr.sort((a,b)=>{
            return a.sortId - b.sortId;
        });
        let row = Math.ceil(arr.length / 3);

        let stresslight = BaseBitmap.create(`stresslight`);
        this.addChild(stresslight);
        stresslight.x = 0;
        stresslight.y = 52;
        stresslight.alpha = 1;
        stresslight.width = 647;
        stresslight.height  = 530;
        let dtnum = 30;
        let ft = BattleStatus.timeparam;
        egret.Tween.get(stresslight,{loop:true})
            .to({alpha:0}, dtnum*4*ft).to({alpha:1}, dtnum*ft);
        this._stresslight = stresslight;
        stresslight.visible = Api.ShopVoApi.getLightType() == this._type;

        let list = ComponentMgr.getScrollList(ShopBuyGemItem, arr, new egret.Rectangle(0,0,618,(row * 235 + (row - 1) * 10)));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [15,view._titleBg.height+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;
        // stresslight.x = list.x -10;
        // stresslight.y = list.y - 20;
        view.height = list.y + list.height + 42;
    }

    //金币购买栏
    private initBuyGold():void{
        let view = this;
        view._titleBg.setRes(`shop_item_title_bg2`); 
        view._titleTxt.strokeColor = ColorEnums.strokeOrange;
        view._titleTxt.stroke = 2;

        let cfg = Config.ShopCfg.getBuyGoldShopList();
        let row = Math.ceil(cfg.length / 3);

        let stresslight = BaseBitmap.create(`stresslight`);
        this.addChild(stresslight);
        stresslight.x = 0;
        stresslight.y = 52;
        stresslight.alpha = 1;
        stresslight.width = 647;
        stresslight.height = 287;
        let dtnum = 30;
        let ft = BattleStatus.timeparam;
        egret.Tween.get(stresslight,{loop:true}).wait(dtnum*ft)
            .to({alpha:0}, dtnum*4*ft).to({alpha:1}, dtnum*ft);
        this._stresslight = stresslight;
        stresslight.visible = Api.ShopVoApi.getLightType() == this._type;

        let list = ComponentMgr.getScrollList(ShopBuyGoldItem, cfg, new egret.Rectangle(0,0,618,(row * 235 + (row - 1) * 10)));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [15,view._titleBg.height+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;

        view.height = list.y + list.height + 70;
    }

    //特权购买栏
    private initSpecialVip():void{
        let view = this;
        view._titleBg.setRes(`shop_item_title_bg1`); 
        let cfg = Config.RechargeCfg.getSpecailVipList();
        let row = Math.ceil(cfg.length / 2);

        view._titleTxt.strokeColor = ColorEnums.strokePurple;
        view._titleTxt.stroke = 1.5;

        let list = ComponentMgr.getScrollList(ShopBuySpecialVipItem, cfg, new egret.Rectangle(0,0,622,(row * 255 + (row - 1) * 10)));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [10,view._titleBg.height+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;

        view.height = list.y + list.height + 37;
        view._specialVipList = list;
    }
    //特权刷新逻辑
    public freshSpecialVip():void{
        let view = this;
        let cfg = Config.RechargeCfg.getSpecailVipList();
        for(let i = 0; i < cfg.length; ++ i){
            let item = <ShopBuySpecialVipItem>view._specialVipList.getItemByIndex(i);
            if(item){
                item.refreshView();
            }
        }
    }

    //宝箱购买
    private initSpecialBox():void{
        let view = this;
        view._titleBg.setRes(`shop_item_title_bg4`); 
        view._titleTxt.strokeColor = ColorEnums.strokeRed;
        view._titleTxt.stroke = 1.3;

        let cfg = Config.ShopCfg.getSpecialBoxShopList();
        let row = Math.ceil(cfg.length / 3);

        let tipTxt =  ComponentMgr.getTextField(LangMger.getlocal(`boxnametip1`),TextFieldConst.SIZE_20,ColorEnums.white);
        tipTxt.bold = true;
        tipTxt.stroke = 1;
        tipTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._titleBg, [0,view._titleBg.height+6]);
        view.addChild(tipTxt);

        let list = ComponentMgr.getScrollList(ShopBuySpecialBoxItem, cfg, new egret.Rectangle(0,0,618,(row * 235 + (row - 1) * 10)));
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [16,view._titleBg.height+6+tipTxt.textHeight+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;

        view.height = list.y + list.height + 47;
    }

    //每日商店
    private initDailyShop():void{
        let view = this;
        view._titleTxt.strokeColor = ColorEnums.strokeRed;
        view._titleTxt.stroke = 1.5;

        let num = Api.ShopVoApi.getTodayRefresLimitTime();
        let str = ``;
        if(num <= 0){
            str = `shopdailyshopfresh`;
        }
        else{
            str = `shopdailyshopcd`;
        }

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(str, [App.DateUtil.getFormatBySecond(num)]),TextFieldConst.SIZE_20, ColorEnums.white);
        tipTxt.bold = true;
        tipTxt.stroke = 1;
        tipTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._titleBg, [0,view._titleBg.height+6]);
        view.addChild(tipTxt);
        view._dailyShoptipTxt = tipTxt;

        let arr = Api.ShopVoApi.getTodayDailyShopList();
        let list = ComponentMgr.getScrollList(ShopDailyShopItem, arr, new egret.Rectangle(0,0,621,(2 * 235 + (2 - 1) * 10)));
        let viewX = (GameConfig.stageWidth - 621) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [7,view._titleBg.height+6+tipTxt.textHeight+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;
        view._dailyShopList = list;

        let watchAd = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("shopfreshdailyshop"), this.wacthADhander, this, [AdConst.ADV_2]);
        this.addChild(watchAd);
        this._wacthadv2 = watchAd;
        this._wacthstatusadv2 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_2);
        watchAd.setEnable(this._wacthstatusadv2);
        watchAd.setGray(!this._wacthstatusadv2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, watchAd, list, [0,0]);

        let adIcon = BaseBitmap.create("watching_ad_icon2");
        watchAd.addChild(adIcon);
        adIcon.anchorOffsetX = adIcon.width / 2;
        adIcon.anchorOffsetY = adIcon.height / 2;
        adIcon.x = 5; 
        adIcon.y = 10;
        //IOS提审时不显示广告按钮
        if(PlatMgr.checkIsIOSShenheSp())
		{
			watchAd.visible = false;
		}

        App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, watchAd, list, [0, - watchAd.height - 35]);

        view.height = watchAd.y + watchAd.height - 20;

        //每日商店出售道具位置受限制，6个格子内，每个格子刷新的道具不同，每个格子的属性也不同
        //第一格：固定出免费道具
        //第二格至第五格：会刷新出除免费道具，以及传说道具以外的所有道具。主要出售的位置就在这里
        //第六格：会刷新出除免费外、其他品质的道具，包含传说道具
        TickMgr.addTick(view.tick, view);
        view.tick();
    }
    //每日商店刷新逻辑
    //全刷新
    public freshDailyShopAll():void{
        let view = this;
        let arr = Api.ShopVoApi.getTodayDailyShopList();
        view._dailyShopList.refreshData(arr);
    }
    //单个刷新
    public freshDailyShop():void{
        let view = this;
        let arr = Api.ShopVoApi.getTodayDailyShopList();
        for(let i = 0; i < arr.length; ++ i){
            let item = <ShopDailyShopItem>view._dailyShopList.getItemByIndex(i);
            if(item){
                item.refreshView();
            }
        }
    }

    //特价商店
    private initDiscountShop():void{
        let view = this;

        view._titleTxt.strokeColor = ColorEnums.strokeRed;
        view._titleTxt.stroke = 1.5;

        let num = Api.ShopVoApi.getTodayRefresLimitTime();
        let str = ``;
        if(num <= 0){
            str = `shopdailyshopfresh`;
        }
        else{
            str = `shopdailyshopcd`;
        }

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(str, [App.DateUtil.getFormatBySecond(num)]),TextFieldConst.SIZE_20, ColorEnums.white);
        tipTxt.bold = true;
        tipTxt.stroke = 1;
        tipTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._titleBg, [0,view._titleBg.height+6]);
        view.addChild(tipTxt);
        view._discountShoptipTxt = tipTxt;

        let arr = Api.ShopVoApi.getTodayDiscountShopList();

        let list = ComponentMgr.getScrollList(ShopDiscountShopItem, arr, new egret.Rectangle(0,0,628,323));
        let viewx = (GameConfig.stageWidth - view._titleBg.width) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view._titleBg, [viewx,view._titleBg.height+6+tipTxt.textHeight+10]);
        view.addChild(list);
        list.horizontalScrollPolicy = `off`;
        list.verticalScrollPolicy = `off`;
        view._discountShopList = list;

        let watchAd = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("shopfreshdiscount"), this.wacthADhander, this, [AdConst.ADV_1]);
        this.addChild(watchAd);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, watchAd, list, [0, - watchAd.height]);
        this._wacthadv1 = watchAd;
        this._wacthstatusadv1 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_1);
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, watchAd, list, [0,0]);

        let adIcon = BaseBitmap.create("watching_ad_icon2");
        watchAd.addChild(adIcon);
        adIcon.anchorOffsetX = adIcon.width / 2;
        adIcon.anchorOffsetY = adIcon.height / 2;
        adIcon.x = 5;
        adIcon.y = 10;

         //IOS提审时不显示广告按钮
        if(PlatMgr.checkIsIOSShenheSp())
		{
			adIcon.visible = false;
		}
        else
        {
            watchAd.setGray(!this._wacthstatusadv1);
        }
        // adIcon.rotation = -25; 
        App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, watchAd, list, [0, - watchAd.height - 35]);

        view.height = watchAd.y + watchAd.height - 20;
        TickMgr.addTick(view.tick, view);
        view.tick();
    }

    //特价商店刷新逻辑
    //全刷新
    public freshDiscountShopAll():void{
        let view = this;
        let arr = Api.ShopVoApi.getTodayDiscountShopList();
        view._discountShopList.refreshData(arr);
    }

    private showStressLight(event:any){
        if(!this._stresslight)
            return;

        egret.Tween.removeTweens(this._stresslight);
        if(event.data.index == this._type){
            let stresslight = this._stresslight;
            this._stresslight.visible = true;
            this._stresslight.alpha = 1;
            let dtnum = 30;
            let ft = BattleStatus.timeparam;
            egret.Tween.get(stresslight,{loop:true}).wait(dtnum*ft)
            .to({alpha:0}, dtnum*4*ft).to({alpha:1}, dtnum*ft);
        } else {
            this._stresslight.visible = false;
        }
    }

    //单个刷新
    public freshDiscountShop():void{
        let view = this;
        let arr = Api.ShopVoApi.getTodayDiscountShopList();
        for(let i = 0; i < arr.length; ++ i){
            let item = <ShopDiscountShopItem>view._discountShopList.getItemByIndex(i);
            if(item){
                item.refreshView();
            }
        }
    }

    public wacthADhander(params:any){
        if(PlatMgr.checkIsIOSShenheSp())
        {
            NetManager.request(NetConst.ADVERTISE_WATCH, {advType:parseInt(params[params.length - 1])});
            if(params == AdConst.ADV_1)
            {
                this._wacthadv1.setEnable(false);
                egret.Tween.get(this._wacthadv1).wait(1000).call(()=>{
                    this._wacthadv1.setEnable(true);
                });
            }
        }
        else
        {
            let re =  App.CommonUtil.watchAd(params);
        }
        // if (re) {
        //     // 观看成功
        //     this["_wacth"+params].setGray(true);
        // } else {

        // }
    }

    private wacthAdsuccess(evt){
        console.log("game:wacthAdsuccess");
        if(evt.data && evt.data.ret){
            let adtype = Api.AdvertiseVoApi.getAdtype();
			let rewards = evt.data.data.data.rewards;
            let type = Api.AdvertiseVoApi.getAdtype();
            switch (type) {
                case AdConst.ADV_1:
                    // this["_wacth"+type]&&this["_wacth"+type].setGray(true);
                    this._wacthstatusadv1 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_1);
                    this["_wacth"+type]&&this["_wacth"+type].setEnable(this._wacthstatusadv1);
                    break;
                case AdConst.ADV_2:
                    // this["_wacth"+type]&&this["_wacth"+type].setGray(true);
                    this._wacthstatusadv2 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_2);
                    this["_wacth"+type]&&this["_wacth"+type].setEnable(this._wacthstatusadv2);
                    break
                default:
                    break;
            }
        }
    }

    private tick():void{
        let view = this;
        let num = Api.ShopVoApi.getTodayRefresLimitTime();
        let str = ``;
        if(num <= 0){
            str = `shopdailyshopfresh`;
        }
        else{
            str = `shopdailyshopcd`;
        }

        if(view._dailyShoptipTxt){
            view._dailyShoptipTxt.text = LangMger.getlocal(str, [App.DateUtil.getFormatBySecond(num)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._dailyShoptipTxt, view._titleBg, [0,view._titleBg.height+6]);
        }
        if(view._discountShoptipTxt){
            view._discountShoptipTxt.text = LangMger.getlocal(str, [App.DateUtil.getFormatBySecond(num)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._discountShoptipTxt, view._titleBg, [0,view._titleBg.height+6]);
        }
        if(this._wacthadv1 && !this._wacthstatusadv1){
            this._wacthstatusadv1 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_1);
            if(Api.AdvertiseVoApi.getAdNumByID(AdConst.ADV_1) <= 0 || Api.AdvertiseVoApi.getAdCurCD(AdConst.ADV_1) <= 0){
                this._wacthadv1.setText(LangMger.getlocal("shopfreshdiscount"));
            } else {
                if(!PlatMgr.checkIsIOSShenheSp())
                {
                    this._wacthadv1.setText(App.DateUtil.getFormatBySecond(Api.AdvertiseVoApi.getAdCurCD(AdConst.ADV_1)));
                }
            }
            
            if(!PlatMgr.checkIsIOSShenheSp())
            {
                this._wacthadv1.setEnable(this._wacthstatusadv1);
            }
        }
        if(this._wacthadv2 && !this._wacthstatusadv2){
            this._wacthstatusadv2 = Api.AdvertiseVoApi.canWatchAdId(AdConst.ADV_2);
            if(Api.AdvertiseVoApi.getAdNumByID(AdConst.ADV_2) <= 0 ||Api.AdvertiseVoApi.getAdCurCD(AdConst.ADV_2)<=0){
                this._wacthadv2.setText(LangMger.getlocal("shopfreshdailyshop"));
            } else {
                this._wacthadv2.setText(App.DateUtil.getFormatBySecond(Api.AdvertiseVoApi.getAdCurCD(AdConst.ADV_2)));
            }
            
            if(!PlatMgr.checkIsIOSShenheSp())
            {
                this._wacthadv2.setEnable(this._wacthstatusadv2);
            }
        }
    }

    public get type():string{
        return this._type;
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        if(view.type == ShopConst.SHOP_DAILYSHOP || view.type == ShopConst.SHOP_DISCOUNTSHOP){
            TickMgr.removeTick(view.tick, view);
        }
        if(view._dailyShoptipTxt){
            view._dailyShoptipTxt = null;
        }
        if(view._discountShoptipTxt){
            view._discountShoptipTxt = null;
        }
        if(view._stresslight){
            egret.Tween.removeTweens(this._stresslight);
            view._stresslight = null;
        }
        view._wacthadv1 = null;
        view._wacthadv2 = null;
        view._type = ``;
        view._titleBg = null;
        view._dailyShopList = null;
        view._specialVipList = null;
        view._timest = 0;
        view._titleTxt = null;
		super.dispose();
	}
}