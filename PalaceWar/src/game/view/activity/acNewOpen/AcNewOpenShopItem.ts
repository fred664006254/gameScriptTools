class AcNewOpenShopItem extends ScrollListItem
{   
    private _code : string = '';
    //购买按钮
	private _buyBtn:BaseButton = null;
    private _cfg:Config.AcCfg.NewOpenShopItemCfg= null;
    private _limitNumTF:BaseTextField = null;
    private _isRequesting:boolean = false;

    public constructor() 
	{
		super();
	}

    private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_NEWOPEN;
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
            case 3:
            case 4:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected initItem(index:number,data:Config.AcCfg.NewOpenShopItemCfg,itemparam:any)
    {   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY),this.buyHandlerCallback,this);

        this._cfg = data;
        let view = this;
		view._code = itemparam;
		let code = view.getUiCode();

        let wordsBg:BaseBitmap = BaseBitmap.create("public_scrollitembg");  
		wordsBg.height = 150; 
        wordsBg.x = GameConfig.stageWidth/2-wordsBg.width/2;
		this.addChild(wordsBg); 

        let rewardItemVo = data.rewardIcons;
        let icon = GameData.getItemIcon(rewardItemVo,true);
        icon.x = 15+wordsBg.x;
        icon.y = 24;
        this.addChild(icon);

        let itemNameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
        itemNameBg.x = icon.x + 115;
        itemNameBg.y = icon.y;
        let itemNameBgWidth:number = 240;
        itemNameBg.width = itemNameBgWidth;
        this.addChild(itemNameBg);

        let itemNameTF:BaseTextField = ComponentManager.getTextField(rewardItemVo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNameTF.x = itemNameBg.x + 15;
        itemNameTF.y = itemNameBg.y + itemNameBg.height/2 - itemNameTF.height/2;
        this.addChild(itemNameTF);

        let itemDescTF:BaseTextField = ComponentManager.getTextField(rewardItemVo.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        itemDescTF.x = itemNameBg.x;
        itemDescTF.y = itemNameBg.y + itemNameBg.height + 7;
        itemDescTF.width = 280;
        this.addChild(itemDescTF);

        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"nothing",this.buyHandler,this)
        var str = ""+data.specialCost;
        this._buyBtn.setText(str,false);
        this._buyBtn.addTextIcon(App.CommonUtil.getResByCode("acnewopen_specialitem2",code),1);
        this._buyBtn.x = wordsBg.x+wordsBg.width - this._buyBtn.width -12;
        this._buyBtn.y = wordsBg.height/2 - this._buyBtn.height/2;
        this.addChild(this._buyBtn);

        this._limitNumTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._limitNumTF.y = this._buyBtn.y + this._buyBtn.height + 7;
        this.addChild(this._limitNumTF);


        this.update();

        this.height = 156;
    }

    public update():void
    {
        let buyNum = this._cfg.limit-this.vo.getShopByNum(this._cfg.id);
        this._limitNumTF.text = LanguageManager.getlocal("acNewOpenShopbuy",[buyNum.toString()]);
        if(	buyNum>0)
        {
            this._limitNumTF.textColor =TextFieldConst.COLOR_WARN_GREEN2;// 0x00ff00;
        } 
        else
        {
            this._limitNumTF.textColor = TextFieldConst.COLOR_WARN_RED;
            this._buyBtn.setEnable(false);
        }
        this._limitNumTF.x = this._buyBtn.x + this._buyBtn.width/2 - this._limitNumTF.width/2;
    }

    private buyHandler(param:any):void
	{
        if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
		let limitNum = this.vo.getSpecialNum()-this._cfg.specialCost;
		if(limitNum < 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acNewOpenNotEnough"));
			return;
		}
        
        this._isRequesting = true;
		this.vo.lastidx = this._cfg.id;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY, { activeId: this.vo.aidAndCode, rkey: this._cfg.id,num:1}); 
	}

    private buyHandlerCallback(event:egret.Event):void
	{
		if(this._isRequesting == false)
		{
			return;
		}
		this._isRequesting = false;
		if (event && event.data && event.data.ret){
			let rData = event.data.data;
			if(rData.ret == 0)
			{   
                let rewards = rData.data.rewards;
		        let rewardList =  GameData.formatRewardItem(rewards);
		        App.CommonUtil.playRewardFlyAction(rewardList);
				this.update();
				
			}else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("shopBuyFailure"));
			}
		}
	}

    public getSpaceY():number
	{
		return 8;
	}

    public dispose(): void {

         App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_NEWOPENSHOPBUY),this.buyHandlerCallback,this);

        this._code = null;
        this._buyBtn = null;
        this._cfg = null;
        this._limitNumTF = null;
        this._isRequesting = false;

        super.dispose();
    }
}