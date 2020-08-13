class AcLimitGiftItem extends ScrollListItem {
    public constructor() {
        super();
    }

    public get Vo(): AcLimitGiftVo {
        return <AcLimitGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code.toString());
    }

    private data: AcLimitGiftItemInfo;
    private rechargeInfo: Config.RechargeItemCfg;
    private _rewards: string;
    private _djsLabel: BaseTextField;

    private buyBtn: BaseButton;

    protected initItem(index: number, data: AcLimitGiftItemInfo, param?: any) {
        this.data = data;
        this.rechargeInfo = Config.RechargeCfg.getRechargeItemCfgByKey(this.data.cost);
        this._rewards = this.data.getReward || (this.rechargeInfo ? this.rechargeInfo.getReward : "");
        let _icons = GameData.getRewardItemIcons(this._rewards, true);
        

        this.width = GameConfig.stageWidth - 20;
        this.height = 318 + Math.floor((_icons.length-1)/5) * 112;

        let _bg: BaseLoadBitmap = BaseLoadBitmap.create("ac_limitgift_bg5");
        this.addChild(_bg);
        _bg.width = 608;
        _bg.height = this.height - 40;
        _bg.setPosition((this.width - _bg.width)/2, 12);

        if (!this.rechargeInfo) {
            let _mianf = BaseLoadBitmap.create("ac_limitgift_icon1");
            this.addChild(_mianf);
            _mianf.setPosition(_bg.x - 4, _bg.y - 4);
        }

        let _itemBg = BaseLoadBitmap.create("public_scrolllistbg");
        _itemBg.width = 564;
        _itemBg.height = 116 + Math.floor((_icons.length-1)/5) * 112;
        this.addChild(_itemBg);
        _itemBg.setPosition((this.width - _itemBg.width)/2, _bg.y + 54);

        for (let i=0;i<_icons.length;i++) {
            let __icon = _icons[i];
            this.addChild(__icon);
            __icon.setPosition(i%5*108+_itemBg.x+17, Math.floor(i/5)*112+_itemBg.y+8);
            __icon.setScale(98/__icon.width);
        }

        let _titleBg: BaseLoadBitmap = BaseLoadBitmap.create("ac_limitgift_title2");
        _titleBg.width = 459;
        _titleBg.height = 76;
        this.addChild(_titleBg);
        _titleBg.setPosition((this.width-_titleBg.width)/2, 0);

        if (this.data.show) {
            let _show1 = BaseLoadBitmap.create("ac_limitgift_bg6");
            _show1.width = 94;
            this.addChild(_show1);
            _show1.setPosition(_bg.x + 508, _bg.y - 35);

            let _show2 = BaseLoadBitmap.create("ac_limitgift_icon2");
            this.addChild(_show2);
            _show2.setPosition(_show1.x, _show1.y + 12);

            let _show3 = ComponentManager.getBitmapText(`${this.data.show * 100}%`, "dailyactivity_fnt", TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(_show3);
            _show3.setPosition(_show1.x + ((_show1.width - _show3.width) / 2), _show1.y + 43);
        }


        let __cost = this.rechargeInfo ? this.rechargeInfo.cost : 0;
        let _title = ComponentManager.getTextField(
            this.getGiftName(),
            22, 0xf1ebc9
        );
        this.addChild(_title);
        _title.width = this.width;
        _title.textAlign = TextFieldConst.ALIGH_CENTER;
        _title.setPosition(-6, _bg.y + 16);

        let _costBg = BaseLoadBitmap.create("ac_limitgift_bg4");
        this.addChild(_costBg);
        _costBg.setPosition(_bg.x + 26, _itemBg.y + _itemBg.height + 14);
        let costStr = PlatformManager.getMoneySign()+__cost;
        if (PlatformManager.checkIsKRSp()){
            costStr = __cost + PlatformManager.getMoneySign();
        }
        let _costLabel = ComponentManager.getTextField(costStr, 22, 0xf1ebc9);
        this.addChild(_costLabel);
        _costLabel.setPosition(_costBg.x + 98, _costBg.y + 16);

        let _djsBg = BaseLoadBitmap.create("public_9_bg45");
        _djsBg.width = 220;
        _djsBg.height = 30;
        this.addChild(_djsBg);
        _djsBg.setPosition(_bg.x + 32, _itemBg.y + _itemBg.height + 64);

        this._djsLabel = ComponentManager.getTextField(this.Vo.getAcCountDown(), 18, 0xf1ebc9);
        this.addChild(this._djsLabel);
        this._djsLabel.setPosition(_djsBg.x + 6, _djsBg.y + 6);

        let _surNum: number = this.data.limit - this.data.has;
        // let _xgStr: string = App.CommonUtil.getCnByCode("acLimitGiftText1", ""+this.Vo.config.limitType) + ": " + _surNum;
        let _xgStr: string = LanguageManager.getlocal("acLimitGiftText1-"+this.Vo.config.limitType) + ": " + _surNum;
        let _xgLabel = ComponentManager.getTextField(_xgStr, 18, _surNum > 0 ? 0x3e9b00 : 0xbb2800);
        this.addChild(_xgLabel);
        _xgLabel.setPosition(_bg.x + 454, _itemBg.y + _itemBg.height + 70);

        this.buyBtn = ComponentManager.getButton("btn2_small_yellow", this.rechargeInfo ? "acLimitGiftText3" : "acLimitGiftText4", this.Buy, this);
        this.addChild(this.buyBtn);
        this.buyBtn.setPosition(_bg.x + 432, _itemBg.y + _itemBg.height + 11);
        this.buyBtn.setGray(_surNum <= 0);

        App.MessageHelper.addEventListener(MessageConst.MESSAGR_LIMITGIFT_DJS, this.tick, this);
    }

    private getGiftName(): string {
        if (this.rechargeInfo) {
            return LanguageManager.getlocal("rechargeName_"+this.data.cost, [""+this.rechargeInfo.cost]);
        } else {
            return LanguageManager.getlocal("acLimitGift_freeName-"+this.data.code);
        }
    }

    private tick() {
        this._djsLabel.text = this.Vo.getAcCountDown();
    }

    private Buy() {
        if (this.Vo.isEnd) {
            // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            //     title: "itemUseConstPopupViewTitle",
            //     msg: LanguageManager.getlocal("acLimitGiftText6"),
            //     callback:()=>{
            //         ViewController.getInstance().hideView(ViewConst.COMMON.ACLIMITGIFTVIEW);
            //     },
            //     handler: this
            // });
            this.Vo.showAcEndTip();
            return;
        }

        if (this.data.limit - this.data.has <= 0) {
            // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            //     title: "itemUseConstPopupViewTitle",
            //     msg: LanguageManager.getlocal("acLimitGiftText5"),
            //     handler: this
            // });
            App.CommonUtil.showTip(LanguageManager.getlocal(this.rechargeInfo ? "acLimitGiftText5" : "acLimitGiftText8"));
            return;
        }

        if (this.rechargeInfo) {
            PlatformManager.checkPay(this.rechargeInfo.id);
        } else {
            // todo
            NetManager.request(NetRequestConst.REQUEST_ACLIMITGIFT_FREE, {
                "activeId": `${this.data.aid}-${this.data.code}`
            });
        }
    }
    
    public dispose() {
        this.data = null;
        this.rechargeInfo = null;
        this._rewards = null;
        this._djsLabel = null;


        App.MessageHelper.removeEventListener(MessageConst.MESSAGR_LIMITGIFT_DJS, this.tick, this);
        super.dispose();
    }

}

interface AcLimitGiftItemInfo {
    aid: string,
    code: number,
    cost: string,
    getReward: string,
    show: number,
    limit: number,
    has: number
}