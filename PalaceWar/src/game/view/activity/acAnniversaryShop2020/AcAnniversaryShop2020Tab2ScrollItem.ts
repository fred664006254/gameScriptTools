/**
 * 超值礼包 item
 * author ycg
 * date 2019.11.28
 * @class AcAnniversaryShop2020Tab2ScrollItem
 */
class AcAnniversaryShop2020Tab2ScrollItem extends ScrollListItem{
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

        let vo = <AcAnniversaryShop2020Vo>Api.acVoApi.getActivityVoByAidAndCode(param.aid, param.code);
        let cfg = <Config.AcCfg.AnniversaryShop2020Cfg>Config.AcCfg.getCfgByActivityIdAndCode(param.aid, param.code);
        this._vo = vo;
        this._data = data;
        let view = this;
        let itemCfg = data;
        let bgStr = "acsingledayitembg";
        if (itemCfg.showType == 1){
            bgStr = ResourceManager.hasRes("anniversaryshop_singlegiftbg-"+this.getTypeCode()+"_2") ? "anniversaryshop_singlegiftbg-"+this.getTypeCode()+"_2" : "anniversaryshop_singlegiftbg-1_2";
        }
        let bg:BaseBitmap=BaseBitmap.create(bgStr);
        bg.setPosition(3,3);
        view.addChild(bg);
        
        if (index == param.dataLength){
            view.height = bg.height + 100;
        }
        
        let itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.item.split('_')[1]);
        let nametTxt:BaseTextField=itemInfo.nameTxt;
        nametTxt.setPosition(bg.x+(bg.width-nametTxt.width)/2, bg.y+32); 
        nametTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nametTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.item)[0], true);
        icon.setPosition(bg.x+(bg.width-icon.width)/2, bg.y+nametTxt.y+nametTxt.height+3);
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();

        if(itemCfg.rebate){
            let tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
			view.addChild(tag);
			
            let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('acAnniversaryShop2020_discount-'+this.getTypeCode(),[(itemCfg.rebate * 10).toString()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            let tagnum = 10 - itemCfg.rebate * 10;
            if(PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()){
                tagTxt.text = LanguageManager.getlocal('discountTitle',[(tagnum * 10).toString()]);
            }
            tagTxt.width = 70;
            tagTxt.height = 20;
            tagTxt.textAlign = egret.HorizontalAlign.CENTER;
            tagTxt.anchorOffsetX = tagTxt.width / 2;
            tagTxt.anchorOffsetY = tagTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX+24,-tagTxt.anchorOffsetY+22]);
            tagTxt.rotation = -45;
            view.addChild(tagTxt);
        }

        if (itemCfg.limit){
            let limitNum = itemCfg.limit - vo.getBuyShopList2(itemCfg.id);
            let limitStr = "acAnniversaryShop2020_limit-"+this.getTypeCode();
            if (itemCfg.limitType == 2){
                limitStr = "acAnniversaryShop2020_dayLimit-"+this.getTypeCode();
            }
            let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(limitStr, [limitNum.toString()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW2);
            view.addChild(limitTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
            if (itemCfg.showType == 1){
                limitTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }

        //原价
        let originTxt = ComponentManager.getTextField(LanguageManager.getlocal('acAnniversaryShop2020_originPrice-'+ this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        view.addChild(originTxt);
        
        let goldGemBM = BaseBitmap.create("public_icon1");
		goldGemBM.width = 30;
        goldGemBM.height = 30;
        view.addChild(goldGemBM);

        let originPrice = Math.floor(itemCfg.price / itemCfg.rebate);
        let originPriceTxt = ComponentManager.getTextField(originPrice.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        view.addChild(originPriceTxt);

        let priceW = originTxt.width + goldGemBM.width + originPriceTxt.width;
        originTxt.setPosition(bg.x + bg.width/2 - priceW/2, icon.y + icon.height + 25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldGemBM, originTxt, [originTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width, 0]);
        
        let shopline = BaseBitmap.create("shopview_line")
        shopline.width = priceW + 16;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, shopline, originTxt, [-8, 0]);
        view.addChild(shopline);
        shopline.visible = itemCfg.rebate < 1;

        let buyBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"", ()=>{
            if(!vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            let limitNum = data.limit - vo.getBuyShopList2(data.id);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACANNIVERSARYSHOP2020BUYITEMPOPUPVIEW, {aid: this._aid, code: this._code, type:2, id: data.id, callback: this.buyShopHandler, obj: this});
            // this.buyShopHandler();

        },this);
        buyBtn.setPosition(bg.x+(bg.width-buyBtn.width * buyBtn.scaleX)/2, bg.y+bg.height-buyBtn.height-20);
        view.addChild(buyBtn);
        buyBtn.setText(itemCfg.price.toString(), false);
        buyBtn.addTextIcon(`public_icon1`);

        // let oneGemBM = BaseBitmap.create("public_icon1");
		// oneGemBM.width = 30;
        // oneGemBM.height = 30;
        // view.addChild(oneGemBM);
        
        // let priceTxt = ComponentManager.getTextField(itemCfg.price.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        // view.addChild(priceTxt);
        // let distance = (buyBtn.width - priceTxt.textWidth - 30 - 5)/2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneGemBM, buyBtn, [distance, 0]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, priceTxt, oneGemBM, [oneGemBM.width + 5, 0]);

        if(itemCfg.limit){
            let limitNum = itemCfg.limit - vo.getBuyShopList2(itemCfg.id);
            if(limitNum <= 0){
                buyBtn.setGray(true);
            }
        }
    }

    public buyShopHandler(param?:any):void{
        let couponNum = 0;
        if (param){
            couponNum = param;
        }
        App.LogUtil.log("buyShopHandler parma: "+param);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ANNIVERSARYSHOP2020_BUY, {activeId: this._vo.aidAndCode, mType: 2, itemKey: this._data.id, couponNum: couponNum});
    }

    private getTypeCode():string{
        return this._code;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._aid = null;
        this._code = null;
        this._data = null;
        this._vo = null;

        super.dispose();
    }
}