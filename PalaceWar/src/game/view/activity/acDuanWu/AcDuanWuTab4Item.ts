
class AcDuanWuTab4Item extends ScrollListItem
{
    private _data : Config.AcCfg.DWShopItemCfg = null; 
    private _curIdx:number=0;
    private _buyBtn:BaseButton = null;

    public constructor() 
	{
		super();
	}

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DUANWU;
    }

    private _code : string = '';
    private _uicode : string = '';
    private get code() : string{
        return this._code;
    }

    private get uicode() : string{
        return this._uicode;
    }
    protected initItem(index:number,data:Config.AcCfg.DWShopItemCfg,itemparam:any)
    {
        let view = this;
        view._code = itemparam[0];
        view._uicode = itemparam[1];
		view.width = 174;
		view.height = 237;
		this._data = data;
		this._curIdx = Number(data.id);

        let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height; 
        wordsBg.alpha = 0.4;
		this.addChild(wordsBg); 

         let topbg:BaseBitmap = BaseBitmap.create("fourpeople_bottom");
        topbg.width = view.width-20;
        topbg.height = 30;
        topbg.setPosition(10,10);
        this.addChild(topbg);

        let rewardVo:RewardItemVo = GameData.formatRewardItem(this._data.item)[0];
        let rewardName:BaseTextField = ComponentManager.getTextField(rewardVo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,rewardVo.nameColor);
        rewardName.setPosition(view.width/2 -rewardName.width/2, topbg.y+topbg.height/2-rewardName.height/2);
        this.addChild(rewardName); 

        let icon: BaseDisplayObjectContainer = this._data.rewardIcons; 
        icon.setPosition(35, 47);
        this.addChild(icon); 
        icon.getChildByName("numLb").visible = false;
        if (icon.getChildByName("numbg"))
		{
			icon.getChildByName("numbg").visible = false;
		}

        let tag = BaseBitmap.create('shopview_corner');
        view.setLayoutPosition(LayoutConst.lefttop, tag, icon);
        view.addChild(tag);
        
        let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle',[(this._data.rebate * 10).toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
        let tagnum = 10 - this._data.rebate * 10;
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


        let curNum = view._data.limit - view.vo.getShop(view._data.id);
        let buystr:string;
        if (curNum>0)
        {
            buystr = LanguageManager.getlocal("acDuanWuBuyTimes",[String(curNum)]);
        }
        else
        {
            buystr = LanguageManager.getlocal("acDuanWuBuyTimes2",[String(curNum)]);
        }
        let buyTims:BaseTextField = ComponentManager.getTextField(buystr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        buyTims.setPosition(view.width/2 -buyTims.width/2, icon.y+icon.height+5);
        this.addChild(buyTims); 

        let realPrice:number = data.price*data.rebate;
        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"nothing",this.buyHandler,this)
        let str = String(realPrice); 
		btn.setText(str,false);
		btn.addTextIcon("public_icon1",1);
		btn.setPosition(view.width/2 -btn.width/2, 179);
		view.addChild(btn);
		view._buyBtn = btn;
		if(curNum<=0){
			btn.setEnable(false);
		}
        if (!view.vo.isInActivity())
        {
            App.DisplayUtil.changeToGray(btn);
        }
    }

    private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(!vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		let view = this;
        let curNum = view._data.limit - view.vo.getShop(view._data.id);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        let num = view._data.price*view._data.rebate;
        if(Api.playerVoApi.getPlayerGem() < num){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
		}

		view.checkNeedWarnPopup();
	}

    	//检查是否需要弹出消费提示框
	private checkNeedWarnPopup(): void
    {
		//物品价格
		let view = this;
		let num = view._data.price*view._data.rebate;
		//检查价格是否超过购买警告阈值
		if (num >= Config.ShopCfg.buyItemCheckVal)
		{
			let contentList:Array<RewardItemVo> = GameData.formatRewardItem(this._data.item);

			let rewardItemVo = contentList[0];
			//展示信息
			let message:string = LanguageManager.getlocal("shopBuyUseGem2",[num.toString(),rewardItemVo.name]);
			//玩家所持有的元宝数
			let playerGem = Api.playerVoApi.getPlayerGem();

			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
				goods:this._data.item,						//物品价格
				confirmCallback: this.confirmCallbackHandler,	//确认回调函数
				handler: this,									//target
				num: playerGem,									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});			
		} else {
			this.confirmCallbackHandler();
		}
	}

    //弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
		view.vo.lastidx = this._curIdx;
        this.vo.lastpos = this._buyBtn.localToGlobal(this._buyBtn.width/2 + 50,20);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYDUANWUSHOP, {
            activeId : view.acTivityId,
            shopId : view._data.id
        });	
	}

    public getSpaceY():number
	{
		return 5;
	}

    public dispose():void
    {		
		this._data =null;
        this._curIdx = 0; 

		super.dispose();
	}
}