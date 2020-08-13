/**
 * author : qianjun
 * desc : item
 */
class AcSingleDay2019ShopItem  extends ScrollListItem
{
    private _limitTxt : BaseTextField = null;
    private _btn : BaseButton = null;
    private _data : Config.AcCfg.SingleDayNewShop2Item = null;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_SINGLEDAY2019;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
    protected initItem(index:number,data:Config.AcCfg.SingleDayNewShop2Item, item):void{
        let view = this;
        view._code = item;
        let itemCfg = data;
        view._data = itemCfg;
        let bg:BaseBitmap=BaseBitmap.create("acsingledayitembg");//public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3,3);
        view.addChild(bg);
        
        let rIcon = itemCfg.item;
        let itemInfo = Config.ItemCfg.getItemCfgById(itemCfg.item.split('_')[1]);
        let nametTxt:BaseTextField=itemInfo.nameTxt;

        nametTxt.setPosition(bg.x+(bg.width-nametTxt.width)/2,bg.y+30); 
        nametTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nametTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(GameData.formatRewardItem(itemCfg.item)[0], true);
        icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nametTxt.y+nametTxt.height+5);
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();

        if(itemCfg.limit){
            let tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
			view.addChild(tag);
			
            let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle',[(itemCfg.rebate * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
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
            
            let limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]),18,0xa87e00);
            view.addChild(limitTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
            // let mark:BaseBitmap=BaseBitmap.create("common_shopmark");
            // mark.setPosition(5.5,5.5);
            // this.addChild(mark);
            // let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("composeTimeLimitDesc"),12,TextFieldConst.COLOR_BROWN);
            // markTxt.anchorOffsetX=markTxt.width/2;
            // markTxt.anchorOffsetY=markTxt.height/2;
            // markTxt.rotation=-45;
            // markTxt.setPosition(mark.width/3+7,mark.height/3+7);
            // this.addChild(markTxt);
            view._limitTxt = limitTxt;
        }

        //原价
        let originTxt = ComponentManager.getTextField(LanguageManager.getlocal('originalPriceTitle') + "：", 20, 0xbb2800);
        view.addChild(originTxt);
        
        let goldGemBM = BaseBitmap.create("public_icon1")
		goldGemBM.width = 30;
        goldGemBM.height = 30;
        view.addChild(goldGemBM);

        let originPriceTxt = ComponentManager.getTextField(itemCfg.price.toString(), 20, 0xbb2800);
        view.addChild(originPriceTxt);

        let distance = (bg.width - originTxt.textWidth - 30 - 5 - originPriceTxt.textWidth) / 2; 
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, originTxt, bg, [distance, icon.y + icon.height + 25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldGemBM, originTxt, [originTxt.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width + 5, 0]);

        let shopline = BaseBitmap.create("shopview_line")
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, goldGemBM);
        view.addChild(shopline);
        shopline.visible = itemCfg.rebate < 1;

        let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.composeHandler,this);
        composeBtn.setPosition(bg.x+(bg.width-composeBtn.width * composeBtn.scaleX)/2,bg.y+bg.height-composeBtn.height-20);
        view.addChild(composeBtn);

        let oneGemBM = BaseBitmap.create("public_icon1")
		oneGemBM.width = 30;
        oneGemBM.height = 30;
        view.addChild(oneGemBM);
        
        let priceTxt = ComponentManager.getTextField(Math.ceil(itemCfg.rebate * itemCfg.price).toString(), 20, TextFieldConst.COLOR_BLACK);
        view.addChild(priceTxt);
        distance = (composeBtn.width - priceTxt.textWidth - 30 - 5)/2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, oneGemBM, composeBtn, [distance,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, priceTxt, oneGemBM, [oneGemBM.width + 5,0]);
        view._btn=composeBtn;

        if(itemCfg.limit){
            let limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            if(limitNum <= 0){
                view._btn.setGray(true);
            }
        }
    }

    public refresh():void{
        let view = this;
        let itemCfg = view._data;
        if(view._limitTxt){
            let limitNum = itemCfg.limit - view.vo.getBuyShopList2(itemCfg.id);
            view._limitTxt.text= LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
            view._btn.setGray(limitNum <= 0);
        }
    }

    private composeHandler():void{
        let view = this;
        let data = view._data;

        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        let limitNum = data.limit - view.vo.getBuyShopList2(data.id);
        if(limitNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        if(Api.playerVoApi.getPlayerGem() < (data.price * data.rebate)){
            App.CommonUtil.showTip(LanguageManager.getlocal(`practice_batchBuyNotenoughdes`));
        }
        else{
            this.vo.lastidx = this._index;
            this.vo.lasttype = 2;
            this.vo.buytype = data.type;
            this.vo.lastpos = view._btn.localToGlobal(view._btn.width/2 + 50,20);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY,{
                mType:2,
                itemKey:data.id,
                activeId:this.aid + "-" + this._code
            })
        }
	}


	/**
	 * 不同格子X间距
	 */
	public getSpaceX():number{
		return 5;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number{
		return 5;
	}

	public dispose():void{
		this._data=null;
        this._limitTxt=null;
        this._btn = null;
		super.dispose();
	}
}