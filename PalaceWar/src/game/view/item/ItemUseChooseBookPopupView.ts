class ItemUseChooseBookPopupView extends PopupView
{
    private _skinId:string = null;
    private _itemId:number = 0;
    private _scrollContainer:BaseDisplayObjectContainer=null;
    private _hadBooks:string[] = [];
    private _clickBookId:number = null;

    public constructor()
    {
        super();
    }

    protected getTitleStr():string
    {
        return "itemChooseBook";
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "servant_star","skin_bookbg","skin_detail_probg","public_got",
            "servant_infoPro1","servant_infoPro2","servant_infoPro3","servant_infoPro4",
		]);
	}


    public initView():void
    {
        this._skinId = this.param.data.skinId;
        this._itemId = this.param.data.itemid;
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId);

        let servant:ServantInfoVo = Api.servantVoApi.getServantObj(skincfg.servantId);
        let skinvo : ServantSkinVo = servant.skin[Number(this._skinId)];
        if (skinvo)
        {
            this._hadBooks = skinvo.getbookIdList();
        }

        let desc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("itemChooseBookDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        desc.width = 490;
        desc.lineSpacing = 5;
        desc.setPosition(this.viewBg.width/2-desc.width/2, 16);
        this.addChildToContainer(desc);

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 522;
		itemBg.height = 482;
        itemBg.setPosition(this.viewBg.width/2-itemBg.width/2, desc.y+desc.height+10);
		this.addChildToContainer(itemBg);

        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,this.viewBg.width,itemBg.height-20);
		// 中部可滑动区域
		this._scrollContainer = new BaseDisplayObjectContainer();
		let scrollView = ComponentManager.getScrollView(this._scrollContainer,rect);
		this.addChildToContainer(scrollView);
		scrollView.setPosition(0, itemBg.y+10);


        for (let k in skincfg.ability) 
		{	
			let idx:number = Number(k);
			let bgContainer:BaseDisplayObjectContainer = this.getBookInfoContainer(skincfg.ability[k]);
			bgContainer.setPosition( 57+ 255 * (idx%2) + GameData.popupviewOffsetX,8+ 230 * Math.floor(idx/2) );
			this._scrollContainer.addChild(bgContainer);
		}

        if (this._hadBooks.length>0)
        {   
            let rewardvo = GameData.formatRewardItem(skincfg.returnItem)[0];
            let fragment = ComponentManager.getTextField(LanguageManager.getlocal("itemChooseBookFragment",[String(rewardvo.num),rewardvo.name]),
            TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
            fragment.width = 490;
            fragment.lineSpacing = 5;
            fragment.setPosition(this.viewBg.width/2-fragment.width/2, itemBg.y+itemBg.height+10);
            this.addChildToContainer(fragment);
        }
    }

    private getBookInfoContainer(bookid:string):BaseDisplayObjectContainer
    {
        let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

        let itemBg:BaseBitmap = BaseBitmap.create("skin_detail_probg");
		itemBg.width = 197;
		itemBg.height = 217;
		bgContainer.addChild(itemBg);

        let itemName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt"+bookid),
        TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
        itemName.width = itemBg.width;
        itemName.textAlign = egret.HorizontalAlign.CENTER;
        itemName.lineSpacing = 2;
        itemName.verticalAlign = egret.VerticalAlign.BOTTOM;
		itemName.setPosition(itemBg.width/2 - itemName.width/2, 13);
		bgContainer.addChild(itemName);

        let bookcfg = GameConfig.config.abilityCfg[bookid];

        let biconBg = BaseBitmap.create("skin_bookbg");
        biconBg.setPosition(itemBg.width/2 - biconBg.width/2, itemName.y+itemName.height+15);
        bgContainer.addChild(biconBg);

        let bicon =  BaseBitmap.create("servant_infoPro"+bookcfg.type); 
        bicon.setPosition(itemBg.width/2 - bicon.width/2, itemName.y+itemName.height+18);
        bgContainer.addChild(bicon);

        let starsp = this.getServantBookStars(bookcfg.num);
        starsp.x = bicon.x +bicon.width/2 - starsp.width/2;
        starsp.y = bicon.y + 70;
        bgContainer.addChild(starsp);

        if (GameData.isInArray(bookid,this._hadBooks))
        {
            let gotpic = BaseBitmap.create("public_got");
            gotpic.setPosition(itemBg.width/2 - gotpic.width/2, itemBg.height-gotpic.height - 12);
            bgContainer.addChild(gotpic);
        }
        else
        {
            let exchangeBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "adultChoose", this.chooseItem, this,[bookid]);
            exchangeBtn.setPosition(itemBg.width/2 - exchangeBtn.width/2, itemBg.height-exchangeBtn.height - 12);
            exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(exchangeBtn);
        }
        

        return bgContainer;
    }

    protected getServantBookStars(num:number)
	{
		let objContainer = new BaseDisplayObjectContainer;
		for (let index = 1; index <= num; index++) {
			let starImg = BaseBitmap.create("servant_star")
			starImg.setScale(0.5);
			starImg.x = (index-1) * starImg.width*0.5;
			starImg.y = 0;
			objContainer.addChild(starImg);
		}
		return objContainer;
	}

    private chooseItem(bookid:number):void
	{	
		this._clickBookId = bookid;

        let bookName = LanguageManager.getlocal("servant_attrNameTxt"+bookid);
        let tipKey:string;
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId);
        if (this._hadBooks.length >= skincfg.ability.length-1)
        {
            tipKey = "itemChooseBookTip2";
        }
        else
        {
            tipKey = "itemChooseBookTip1";
        }

        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal(tipKey,[bookName]),
            callback:this.realChoose,
            handler:this,
            needCancel:true,
            txtcolor: 0x000000
        });

		
	}

    private realChoose():void
    {
        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{"itemId":this._itemId,"chooseId":this._clickBookId});
        this.hide();
    }

    protected getBgExtraHeight():number
	{
		return 20;
	}

    public dispose():void
    {
        this._skinId = null;
        this._itemId = 0;
        this._scrollContainer = null;
        this._hadBooks.length = 0;
        this._clickBookId = null;

        super.dispose();
    }
}
