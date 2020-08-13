/**
 * 特惠礼包 item
 * author ycg
 * date 2019.11.28
 * @class AcAnniversaryShop2020Tab1ScrollItem
 */
class AcAnniversaryShop2020Tab1ScrollItem extends ScrollListItem{
    private _aid:string;
    private _code:string;
    private _data:any;
    private _vo:any;

    public constructor() {
		super();
	}
	
	public initItem(index: number, data: any, param: any): void {
        this._aid = param.aid;
        this._code = param.code;
        this._data = data;
        let view = this;
        let vo = <AcAnniversaryShop2020Vo>Api.acVoApi.getActivityVoByAidAndCode(param.aid, param.code);
        let cfg = <Config.AcCfg.AnniversaryShop2020Cfg>Config.AcCfg.getCfgByActivityIdAndCode(param.aid, param.code);
        this._vo = vo;

        let giftType = data.giftTpye;
        let bgStr = ResourceManager.hasRes("anniversaryshop_gift_itembg-"+this.getTypeCode()+"_"+giftType) ? "anniversaryshop_gift_itembg-"+this.getTypeCode()+"_"+giftType : "anniversaryshop_gift_itembg-1_"+giftType;
        let bg = BaseBitmap.create(bgStr);
        this.addChild(bg);
        this.height = bg.height;

        if (index == param.dataLength){
            this.height += 100;
        }

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_giftName"+giftType+"-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,13]);
        
        let iconBgStr = ResourceManager.hasRes("anniversaryshop_gift_bg-"+this.getTypeCode()+"_"+giftType) ? "anniversaryshop_gift_bg-"+this.getTypeCode()+"_"+giftType : "anniversaryshop_gift_bg-1_"+giftType;
        let iconBg =  BaseBitmap.create(iconBgStr);
        this.addChild(iconBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, iconBg, bg, [45,40]);

        let iconStr = ResourceManager.hasRes("anniversaryshop_gift-"+this.getTypeCode()+"_"+giftType) ? "anniversaryshop_gift-"+this.getTypeCode()+"_"+giftType : "anniversaryshop_gift-1_"+giftType;
        let icon =  BaseBitmap.create(iconStr);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconBg);
        let showBgName = ResourceManager.hasRes("anniversaryshop_giftshowbg-"+this.getTypeCode()+"_"+giftType) ? "anniversaryshop_giftshowbg-"+this.getTypeCode()+"_"+giftType : "anniversaryshop_giftshowbg-1_"+giftType;
        icon.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020GIFTPOPUPVIEW,{
                titleName : "acAnniversaryShop2020_giftName"+giftType+"-"+this.getTypeCode(),
                reward : data.item,
                bgName: showBgName
            });
        }, view);

        if (data.rebate){
            let discountgroup = new BaseDisplayObjectContainer();
            discountgroup.x = iconBg.x + 5;
            discountgroup.y = iconBg.y + 10;
            this.addChild(discountgroup);
            
            let mark:BaseBitmap=BaseBitmap.create("common_shopmark");
            discountgroup.addChild(mark);

            let markNum = data.rebate*10;
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                markNum = (10 - data.rebate*10)*10;
            }
            let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`acAnniversaryShop2020_discount-`+this.getTypeCode(), [""+markNum]), 12,TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, markTxt, mark);
            discountgroup.addChild(markTxt);
            markTxt.anchorOffsetX = markTxt.width / 2;
            markTxt.anchorOffsetY = markTxt.height / 2;
            markTxt.x = 25;
            markTxt.y = 20;
            markTxt.rotation = -45;
            discountgroup.setScale(1.3);
        }

        let descBgStr = ResourceManager.hasRes("anniversaryshop_giftinfobg-"+this.getTypeCode()) ? "anniversaryshop_giftinfobg-"+this.getTypeCode() : "anniversaryshop_giftinfobg-1";
        let descBg = BaseBitmap.create(descBgStr);
        this.addChild(descBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descBg, iconBg, [iconBg.width-10,0]);

        let descText = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_giftInfo"+giftType+"-"+this.getTypeCode()), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        descText.width = 200;
        descText.lineSpacing = 5;
        this.addChild(descText);
        descText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descText, descBg, [5, 0]);
        
        let originTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acAnniversaryShop2020_originPrice-`+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        let gemicon = BaseBitmap.create(`public_icon1`);
        let originPriceNum = Math.floor(data.price / data.rebate);
        let originPrice = ComponentManager.getTextField(LanguageManager.getlocal("acAnniversaryShop2020_price-"+this.getTypeCode(), [""+originPriceNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
        let line = BaseBitmap.create(`shopview_line`);
        this.addChild(originTxt);
        this.addChild(gemicon);
        this.addChild(originPrice);
        this.addChild(line);

        let priceW = originTxt.width + gemicon.width + originPrice.width;
        line.width = priceW + 16;
        originTxt.setPosition(bg.x + 516 - priceW/2, 70);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemicon, originTxt, [originTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPrice, gemicon, [gemicon.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line, originTxt, [-8, 0]);

        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, ``, ()=>{
            if(!vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            let limitNum = data.limit - vo.getBuyShopList1(data.id);
            if(limitNum <= 0){
                let limitStr = "acAnniversaryShop2020_notBuy-"+this.getTypeCode()+"_"+data.limitType;
                App.CommonUtil.showTip(LanguageManager.getlocal(limitStr));
                return;
            }
            let voucherNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemId);
            let needVocherNum = Math.ceil(data.price * data.maxDiscount / cfg.exchangeGem);
            if (needVocherNum > voucherNum){
                needVocherNum = voucherNum;
            }
            let currGem = Api.playerVoApi.getPlayerGem();
            if (currGem + needVocherNum * cfg.exchangeGem < data.price){
                App.CommonUtil.showTip(LanguageManager.getlocal("acAnniversaryShop2020_buyFail"));
                return;
            }
            //打开购买面板
            // this.buyShopHandler();
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW, {aid: this._aid, code: this._code, type:1, id: data.id, callback: this.buyShopHandler, obj: this});

        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, line, [0, line.height + 20]);
        this.addChild(btn);
        btn.setText(LanguageManager.getlocal("acAnniversaryShop2020_price-"+this.getTypeCode(), [""+data.price]), false);
        btn.addTextIcon(`public_icon1`);
        if(data.limit){
            let limitNum = data.limit - vo.getBuyShopList1(data.id);
            if(limitNum <= 0){
                btn.setGray(true);
            }
        }

        let limitNum = data.limit - vo.getBuyShopList1(data.id);
        let limitStr = "acAnniversaryShop2020_limit-"+this.getTypeCode();
        if (data.limitType == 2){
            limitStr = "acAnniversaryShop2020_dayLimit-"+this.getTypeCode();
        }
        let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(limitStr, [limitNum.toString()]), 18, 0x167b2e);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, descBg, [4, -limitTxt.height-3]);
        limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
    }

    public buyShopHandler(param?:any):void{
        let couponNum = 0;
        if (param){
            couponNum = param;
        }
        App.LogUtil.log("buyShopHandler parma: "+param);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, {activeId: this._vo.aidAndCode, mType: 1, itemKey: this._data.id, couponNum: couponNum});
    }

    private getTypeCode():string{
        return this._code;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._data = null;
        this._vo = null;
        this._aid = null;
        this._code = null;

        super.dispose();
    }
}