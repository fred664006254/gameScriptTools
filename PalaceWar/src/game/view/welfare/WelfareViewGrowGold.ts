//管家一键事务
//shaoliang 2020.4.22

class WelfareViewGrowGold extends WelfareViewTab
{   
    private _buyBtn:BaseButton = null;
    private _hasBuy:BaseLoadBitmap = null;
    private _showTime:BaseTextField = null;
    private _list : ScrollList = null;

    public constructor() {
		super();
	}

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "growgold_buy_btn","growgold_fnt","growgold_bg","shopview_itemtitle","public_titlebg",
            "collectflag","public_popupscrollitembg"
			]);
	}

    protected init():void
    {
		super.init();
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_GETGROWGOLD),this.rewardCallBack,this);

		let topbg = BaseBitmap.create("growgold_bg");
		topbg.width = 492;
		topbg.height = 333;
		topbg.setPosition(0,0);
		this.addChild(topbg);

        this.bottomBg.visible = false;

        let powerText:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(Config.GrowgoldCfg.power),"growgold_fnt",TextFieldConst.COLOR_LIGHT_YELLOW, 32);
		powerText.setPosition(290-powerText.width,65);
        this.addChild(powerText);

        if (!Api.switchVoApi.checkOpenBMFont()){
            let powerTf = <BaseTextField>powerText;
            powerTf.bold = true;
            if (PlatformManager.checkIsThSp()){
                powerTf.setPosition(280-powerText.width, 95);
            }
            else if (PlatformManager.checkIsRuLang()){
                powerTf.setPosition(370, 85);
            }
        }
        
        // let validityTime = ComponentManager.getTextField(LanguageManager.getlocal("growGold_validity_time"),18,TextFieldConst.COLOR_QUALITY_YELLOW);
        // validityTime.setPosition(450-validityTime.width,150);
        // this.addChild(validityTime);

        let time = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_LIGHT_YELLOW);
        time.setPosition(20,240);
        this.addChild(time);
        this._showTime = time;
        let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(Config.GrowgoldCfg.unlockRecharge);
        let validityDesc = ComponentManager.getTextField(LanguageManager.getlocal("growGold_validity_desc",[String(rechargeItemCfg.getVipExp)]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        validityDesc.width = 485;
        validityDesc.lineSpacing = 3;
        validityDesc.setPosition(2,277);
        validityDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(validityDesc);

        let hasbuy = BaseLoadBitmap.create("growgold_got");
        hasbuy.width = 147;
        hasbuy.height = 96;
        hasbuy.setPosition(310,180);
        this.addChild(hasbuy);
        this._hasBuy = hasbuy;

        
        let buystr = (PlatformManager.checkisLocalPrice()&&rechargeItemCfg.platFullPrice)?rechargeItemCfg.platFullPrice:App.CommonUtil.getMoneyString(rechargeItemCfg.cost);
        let buybtn = ComponentManager.getButton("growgold_buy_btn","",this.buyGrowGold,this,null,1);
        buybtn.setText(buystr,false);
        buybtn.setPosition(280,190);
        this.addChild(buybtn);
        this._buyBtn = buybtn;

        let rect = new egret.Rectangle(0,0,490,GameConfig.stageHeigth - 418)
        let list = ComponentManager.getScrollList(GrowGoldScrollItem, [],rect );
		list.setPosition(3,topbg.y+topbg.height);
		this.addChild(list);
		this._list = list;

        this.resetBtn();
        this.resetList();
        this.tick();
    }

    private buyGrowGold():void
    {
        PlatformManager.checkPay(Config.GrowgoldCfg.unlockRecharge);
    }

    private resetBtn():void
    {
        this._buyBtn.visible = !Api.shopVoApi.ifBuyGrowGold();
        this._hasBuy.visible = Api.shopVoApi.ifBuyGrowGold();
    }

    private resetList():void
    {
        this._list.refreshData(Config.GrowgoldCfg.task);
    }

    public tick():void
    {   

        if ( !this._showTime)
        {
            return;
        }
        let time = 0;
        if (Api.shopVoApi.ifBuyGrowGold())
        {
            this._showTime.visible = false;
            // if (Api.shopVoApi.ifBuyGrowGoldTimeout())
            // {
            //     App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);
            //     return;
            // }
        }
        else
        {   
            let regdt = Api.gameinfoVoApi.getRegdt();
            time =  regdt - GameData.serverTime + 86400*Config.GrowgoldCfg.showTime;
            if (time<0)
            {   
                let n =  1 - Math.ceil(time/(86400*Config.GrowgoldCfg.showTime));
                time += n*86400*Config.GrowgoldCfg.showTime;

                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);
                // return;
            }
            let timestr = LanguageManager.getlocal("acChess_timeCount",[App.DateUtil.getFormatBySecond(time, 1)]);
            this._showTime.text = timestr;
        }
        
    }

    protected receivePushData(event: egret.Event): void {
        let data: { ret: boolean, data: any } = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
           
            if (data.data.data.rewards) {
                let itemid = data.data.data.rewards;
				let rList = GameData.formatRewardItem(itemid);
				App.CommonUtil.playRewardFlyAction(rList);                
            }
			this.resetBtn();
            this.resetList();
        }
    }

    private rewardCallBack(evt : egret.Event):void{
		let view = this;
		if(!evt.data.ret){
            return;
        }
		let rData = evt.data.data.data;
        if(!rData){
            return;
        }
		let rewards = rData.rewards;
		let rewardList =  GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardList);
        this.resetList();
	}

    public dispose():void{

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_GETGROWGOLD),this.rewardCallBack,this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);
        this._buyBtn = null;
        this._hasBuy = null;
        this._showTime = null;
        this._list = null;

		super.dispose();
	}
}