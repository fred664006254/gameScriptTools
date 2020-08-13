class AcActivityExchangeItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private _aid: string;
    private _code: number;
    private _itemInfo: Config.AcCfg.ActivityExchangeCfgItem;

    private _sortId: number;

    private _costs: string[];
    private _reward: string;

    private _limitNum: number;
    private _limitTip: BaseTextField;
    private _getRewBtn: BaseButton;

    public get Vo(): AcActivityExchangeVo {
        return <AcActivityExchangeVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code.toString());
    }

    protected initItem(index: number, data: {aid: string, code: number, itemCfg: Config.AcCfg.ActivityExchangeCfgItem}, param?: any) {
        this.initData(data);

        this.width = 602;
        this.height = 142 + this.getSpaceY();
        let _bg: BaseLoadBitmap = BaseLoadBitmap.create("public_popupscrollitembg");
        this.addChild(_bg);
        _bg.width = 602;
        _bg.height = 142;


        for (let i=0;i<this._costs.length;i++) {
            let _icon_: BaseDisplayObjectContainer = GameData.getRewardItemIcons(this._costs[i], true)[0];
            this.addChild(_icon_);
            _icon_.x = 116 * i + 8;
            _icon_.y = 28;
            _icon_.setScale(84 / _icon_.width);

            let _numLabel_: BaseTextField = ComponentManager.getTextField(this.getNumText(this._costs[i]), 
                16, 0x301e19);
            this.addChild(_numLabel_);
            _numLabel_.width = 100;
            _numLabel_.textAlign = TextFieldConst.ALIGH_CENTER;
            _numLabel_.x = 116 * i;
            _numLabel_.y = 116;

            if (i > 0) {
                let _plus: BaseLoadBitmap = BaseLoadBitmap.create("acactivityexchange_plus");
                this.addChild(_plus);
                _plus.width = 32;
                _plus.height = 30;
                _plus.y = 55;
                _plus.x = _icon_.x - 32;
            }
        }

        let _rewIcon: BaseDisplayObjectContainer = GameData.getRewardItemIcons(this._reward, true)[0];
        this.addChild(_rewIcon);
        _rewIcon.x = 116 * this._costs.length + 8;
        _rewIcon.y = 28;
        _rewIcon.setScale(84 / _rewIcon.width);
        let _arrow: BaseLoadBitmap = BaseLoadBitmap.create("acactivityexchange_arrow");
        this.addChild(_arrow);
        _arrow.width = 32;
        _arrow.height = 22;
        _arrow.y = 59;
        _arrow.x = _rewIcon.x - 32;

        // 领取按钮和限制次数
        this._getRewBtn = ComponentManager.getButton("btn2_small_yellow", "acActivityExchangeText1", this.Buy, this);
        this.addChild(this._getRewBtn);
        this._getRewBtn.setPosition(452, 56);
        // this._getRewBtn.setEnable(this.isCanBuy());
        this._getRewBtn.setGray(!this.isCanBuy());

        if (this._itemInfo.limit > 0) {
            let _tip_params = [this._limitNum > 0? "0x3e9b00" : "0xbb2800", this._limitNum.toString()];
            this._limitTip = ComponentManager.getTextField(LanguageManager.getlocal("acActivityExchangeText2", _tip_params),
                TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0x301e19);
            this.addChild(this._limitTip);
            this._limitTip.width = 140;
            this._limitTip.textAlign = TextFieldConst.ALIGH_CENTER;
            this._limitTip.setPosition(452, 30);
        }
    }

    private initData(data: {aid: string, code: number, itemCfg: Config.AcCfg.ActivityExchangeCfgItem}) {
        [this._aid, this._code, this._itemInfo] = [data.aid, data.code, data.itemCfg];

        this._costs = [...data.itemCfg.costItems];
        this._reward = data.itemCfg.getReward;

        this._sortId = data.itemCfg.sortId;
        this._limitNum = this.Vo.getSurNumById(this._sortId);
    }

    private getNumText(msg: string): string {
        let [_hasNum, _needNum, _hasNumStr] = this.getHasNum(msg);
        
        const _color = _hasNum >= _needNum ? "0x3e9b00" : "0xbb2800";
        
        return `<font color=${_color}>${_hasNum}</font>/${_needNum}`;
    }

    private getHasNum(msg: string): [number, number, string] {
        let [__type, __id, _needNum] = msg.split("_").map(v => parseInt(v));
        let _hasNum = 0;
        let _hasNumStr = "0";
        switch (__type) {
            case 1:
                _hasNum = Api.playerVoApi.getPlayerGem();
                _hasNumStr = Api.playerVoApi.getPlayerGemStr();
                break;
            case 2:
                _hasNum = Api.playerVoApi.getPlayerGold();
                _hasNumStr = Api.playerVoApi.getPlayerGoldStr();
                break;
            case 6:
                _hasNum = Api.itemVoApi.getItemNumInfoVoById(__id);
                _hasNumStr = _hasNum.toString();
                break;
            default:
                break;
        }

        return [_hasNum, _needNum, _hasNumStr];
    }

    private Buy() {
        if (this.Vo.isEnd) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("acActivityExchangeText5"),
                callback:()=>{
                    ViewController.getInstance().hideView(ViewConst.COMMON.ACACTIVITYEXCHANGEVIEW);
                },
                handler: this
            });
            return;
        }
        if (this._itemInfo.limit > 0 && (!this._limitNum || this._limitNum <= 0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acActivityExchangeText3"));
            return;
        }
        
        for (let i=0;i<this._costs.length;i++) {
            let [_has, _need] = this.getHasNum(this._costs[i]);
            if (_has < _need) {
                let _itemVo = GameData.formatRewardItem(this._costs[i])[0];
                App.CommonUtil.showTip(LanguageManager.getlocal("acActivityExchangeText4", [_itemVo.name]));
                return;
            }
        }

        this.Vo.buyPoint = this._getRewBtn.localToGlobal(this._getRewBtn.width - 40, 20);
        NetManager.request(NetRequestConst.REQUEST_ACEXCHANGE_EXCHANGE, {
            "activeId": `${this._aid}-${this._code}`,
            "rkey": this._sortId,
            "num": 1
        });
    }

    private isCanBuy() {
        let rsl = true;
        if (this._itemInfo.limit > 0 && (!this._limitNum || this._limitNum <= 0)) {
            rsl = false;
        } else {
            for (let i=0;i<this._costs.length;i++) {
                let [_has, _need] = this.getHasNum(this._costs[i]);
                if (_has < _need) {
                    rsl = false;
                    break;
                }
            }
        }

        return rsl;
    }

    public getSpaceX(): number {
        return 0;
    }

    public getSpaceY(): number {
        return 6;
    }

    public get index(): number {
        return this._index;
    }

    public dispose(): void {
        this._aid = null;
        this._code = null;
        this._itemInfo = null;
        this._sortId = null;
        this._costs = null;
        this._reward = null;
        this._limitNum = null;
        this._limitTip = null;
        this._getRewBtn = null;
        
        super.dispose();
    }
}