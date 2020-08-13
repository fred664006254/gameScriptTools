class ZhenqifangShopItem extends ScrollListItem{
    private _limitTxt : BaseTextField = null;
    private _cdTxt : BaseTextField = null;
    private _itemCfg:any = null;
    private _composeBtn:BaseButton;
    private _flag : BaseBitmap = null;

    public constructor() 
    {
        super();
    }

    private get api(){
		return Api.zhenqifangVoApi;
	}

    protected initItem(index:number, data:Config.ServantWeaponShopItemCfg, item):void{
        let view = this;
        view.width = 205;
        let itemCfg = data;
        view._itemCfg = itemCfg;

        let bg:BaseBitmap = BaseBitmap.create(data.limitType == 1 ? "zqfshopitembg2" : "acsingledayitembg");//public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3,3);
        view.addChild(bg);

        if(data.limitType == 1)
        {
            let itemId = itemCfg.item.split("_")[1];
            let cfg = Config.ItemCfg.getItemCfgById(itemId);
            let weapon = Api.weaponVoApi.getWeaponInfoVoById(cfg.getRewards.split("_")[1]);
            let tipStr = "";
            let color = 0x3e9b00;
            if(weapon)
            {
                tipStr = LanguageManager.getlocal(`ZhenqifangShopExchangeWeaponTip`, [weapon.skill2.toString()]);
            }else
            {
                tipStr = LanguageManager.getlocal(`ZhenqifangShopExchangeWeaponNoTip`);
                color = 0xce1515;
            }
            let tipTxt:BaseTextField=ComponentManager.getTextField(tipStr, 18, color);
            tipTxt.setPosition(bg.x+(bg.width-tipTxt.width)/2,bg.y+58);
            view.addChild(tipTxt);
        }
        
        let rewardvo = GameData.formatRewardItem(itemCfg.item)[0];
        let nameTxt : BaseTextField = ComponentManager.getTextField(rewardvo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON, data.limitType == 1 ? rewardvo.nameColor : TextFieldConst.COLOR_BROWN);
        nameTxt.setPosition(bg.x+(bg.width-nameTxt.width)/2,bg.y+30); 
        view.addChild(nameTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardvo, true);
        if(data.limitType == 1)
        {
            icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nameTxt.y+nameTxt.height+22);
        }else
        {
            icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nameTxt.y+nameTxt.height+5);
        }
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();
    
        let limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
        let str = ``;
        if(limitNum == 0){
            str = LanguageManager.getlocal(`ZhenqifangShopExchangeNot${itemCfg.limitType}`, [limitNum.toString()])
        }
        else{
            str = LanguageManager.getlocal(`ZhenqifangShopExchange${itemCfg.limitType}`, [limitNum.toString()])
        }
        let limitTxt:BaseTextField=ComponentManager.getTextField(str, 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
        view._limitTxt = limitTxt;

        //周刷新
        if(itemCfg.limitType == 2){
            limitTxt.visible = limitNum > 0;
            let date: Date = App.DateUtil.getServerDate();
            let year:number = date.getFullYear();
            let month:number = date.getMonth() + 1;
            let weekday = date.getDay();
            if(weekday == 0){
                weekday = 7;
            }
            let endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;
            // 
            let num = endtime - GameData.serverTime;
            if(GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)){
                num = 0;
                Api.zhenqifangVoApi.freshshop = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
            let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : `ZhenqifangShopTip4`, [App.DateUtil.getFormatBySecond(num, 17)]),22,TextFieldConst.COLOR_WARN_RED2);
            this.addChild(cdTxt);
            this._cdTxt = cdTxt;
            cdTxt.visible = limitNum == 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cdTxt, limitTxt);
        }
        
        let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.composeHandler,this);
        composeBtn.setPosition(bg.x+(bg.width-composeBtn.width * composeBtn.scaleX)/2,bg.y+bg.height-composeBtn.height-20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;

        let cost = itemCfg.price;
        let reward = GameData.formatRewardItem(cost)[0];
        let rectd = new egret.Rectangle(0,0,38,38);
        let costicon = BaseLoadBitmap.create(reward.icon,rectd);
        costicon.setPosition(70,composeBtn.y-rectd.height+8);
		view.addChild(costicon);

        //原价
        let needNum = reward.num;
        let originPriceTxt = ComponentManager.getTextField(needNum+"", 20, data.limitType == 1 ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, costicon, [costicon.width, 0]);


        let flag = BaseBitmap.create(`zqfshopflag`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;

        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;
        TickManager.addTick(view.tick,view);
    }

    public refreshItem(rewards : string):void{
        let view = this;
        let itemCfg = view._itemCfg;
        if(view._limitTxt){
            let limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
            let str = ``;
            if(limitNum == 0){
                str = LanguageManager.getlocal(`ZhenqifangShopExchangeNot${itemCfg.limitType}`, [limitNum.toString()])
            }
            else{
                str = LanguageManager.getlocal(`ZhenqifangShopExchange${itemCfg.limitType}`, [limitNum.toString()])
            }
            view._limitTxt.text = str;
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.setVisible(limitNum > 0);
            view._flag.visible = !view._composeBtn.visible;
            view._limitTxt.x = view._composeBtn.x + (view._composeBtn.width - view._limitTxt.textWidth) / 2;

            if(itemCfg.limitType == 2 && limitNum == 0 && view._cdTxt){
                view._limitTxt.visible = false;
                let date: Date = App.DateUtil.getServerDate();
                let year:number = date.getFullYear();
                let month:number = date.getMonth() + 1;
                let weekday = date.getDay();
                if(weekday == 0){
                    weekday = 7;
                }
                let endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;
                this._cdTxt.visible = true;

                let num = endtime - GameData.serverTime;
                if(GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)){
                    num = 0;
                    Api.zhenqifangVoApi.freshshop = true;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
                }
                this._cdTxt.text = LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : `ZhenqifangShopTip4`, [App.DateUtil.getFormatBySecond(num, 17)]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._cdTxt, this._limitTxt);
            }

        }
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

    private composeHandler():void{
        let view = this;
        let itemcfg = this._itemCfg;

        let limitNum = itemcfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemcfg.id);
        if(limitNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        let costreward = itemcfg.price;
        let reward = GameData.formatRewardItem(costreward)[0];
        let hasNum:number = reward.id == 1 ? Api.playerVoApi.getPlayerGem() : Api.itemVoApi.getItemNumInfoVoById(reward.id);
        let needNum = reward.num;
        let cost = hasNum - Number(needNum);
        if(cost < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(reward.id == 1 ? `allianceBossOpen_tip5` : `itemNumNotEnough`));
            return;
        }

        let rewardvo = GameData.formatRewardItem(itemcfg.item)[0];
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"itemUseConstPopupViewTitle",
            msg:LanguageManager.getlocal(reward.id == 1 ? "zhenqifangtip7" : "zhenqifangtip6", [needNum.toString(), rewardvo.name]),
            callback:()=>{
                view.api.selIdx = view._index;
        
                var date: Date = App.DateUtil.getServerDate();
                var year:number = date.getFullYear();
                var month:number = date.getMonth() + 1;
                NetManager.request(NetRequestConst.REQUEST_ZQF_SHOPBUY,{
                    idx : itemcfg.id, 
                    month : month
                });
            },
            handler:this,
            needCancel:true
        });
    }
    
    /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    
    }
    private tick():void{
        let view = this;
        let itemCfg = view._itemCfg;
        let limitNum = itemCfg.limit[view.api.ZhenqifangLevel ? (view.api.ZhenqifangLevel - 1) : 0] - view.api.getShopNum(itemCfg.id);
        if(itemCfg.limitType == 2 && limitNum == 0 && view._cdTxt){
            view._limitTxt.visible = false;
            let date: Date = App.DateUtil.getServerDate();
            let year:number = date.getFullYear();
            let month:number = date.getMonth() + 1;
            let weekday = date.getDay();
            if(weekday == 0){
                weekday = 7;
            }
            let endtime = App.DateUtil.getWeeTs(GameData.serverTime) + (7 - weekday + 1) * 86400;

            let num = endtime - GameData.serverTime;
            if(GameData.serverTime == App.DateUtil.getWeeTs(GameData.serverTime)){
                num = 0;
                Api.zhenqifangVoApi.freshshop = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
            this._cdTxt.text = LanguageManager.getlocal(num == 0 ? "ZhenqifangShopTip3" : `ZhenqifangShopTip4`, [App.DateUtil.getFormatBySecond(num, 17)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._cdTxt, this._limitTxt);
        }
    }

	public dispose():void{
        TickManager.removeTick(this.tick,this);
        this._itemCfg = null;
        this._cdTxt = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
		super.dispose();
	}
}