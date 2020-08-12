/**
 * 首冲
 */
class firstRecPopupView extends PopupView {
    public constructor() {
        super();
    }

    private _rewList: any[];

    private _rechargeBtn: BaseButton;
    private _reciveBtn: BaseButton;

    private _ruleTipBox: BaseDisplayObjectContainer;
    private _effect: CustomMovieClip;

    protected initView() {
        this._effect = ComponentMgr.getCustomMovieClip("firstrec_effect3_", 15, 70);
        this._effect.scaleX = this._effect.scaleY = 2;
        this._effect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._effect);
        this._effect.playWithTime(0);
        this._effect.y = -269;

        let _bird: BaseLoadBitmap = BaseLoadBitmap.create("firstrec_bird");
        this.addChildToContainer(_bird);
        _bird.x = 320;
        _bird.y = -35;

        egret.Tween.get(_bird, {loop: true})
        .to({y: -45}, 2000)
        .to({y: -35}, 2000)

        let _ruleBtn: BaseButton = ComponentMgr.getButton("ab_public_rulebtn", "", this.onRuleBtnTap, this)
        _ruleBtn.setBtnSize(36, 36);
        this.addChildToContainer(_ruleBtn);
        _ruleBtn.x = 380;
        _ruleBtn.y = 194;

        this._ruleTipBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._ruleTipBox);
        this._ruleTipBox.x = _ruleBtn.x - 167;
        this._ruleTipBox.y = _ruleBtn.y - 115;
        this._ruleTipBox.visible = false;

        let _tipBg: BaseLoadBitmap = BaseLoadBitmap.create("firstrec_tipBg");
        this._ruleTipBox.addChild(_tipBg);
        let _tipLabel: BaseTextField = ComponentMgr.getTextField(LangMger.getlocal("firstRecText4"), TextFieldConst.SIZE_20, 0x000000);
        this._ruleTipBox.addChild(_tipLabel);
        _tipLabel.width = 382;
        _tipLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        _tipLabel.y = (109 - _tipLabel.height)/2;


        this.initRewList();
    }

    private onRuleBtnTap() {
        this._ruleTipBox.visible = !this._ruleTipBox.visible;
    }

    private initRewList() {
        const __rews = Config.FirstrechargeCfg.getFirstRecReward();
        this._rewList = this.rewSort(GameData.formatRewardItem(__rews));
        
        const _rewHeight: number = 135;
        const _rewWidth: number = 133;
        const _rewY: number = 275;
        const _lw = _rewWidth * this._rewList.length + (24 * (this._rewList.length - 1));
        const _rewX: number = (this.getShowWidth() - _lw) / 2;
        const _item_d: number = 24;

        for (let i=0;i<this._rewList.length;i++) {
            let _item: firstRectItem = new firstRectItem(this._rewList[i]);
            _item.x = _rewX + (_rewWidth + _item_d) * i;
            _item.y = _rewY;
            this.addChildToContainer(_item);
        }
    }

    private rewSort(rew: RewardItemVo[]) {
        const _format = [100, 1, 2];
        let _rsl = [];
        for (let i=0;i<_format.length;i++) {
            _rsl = _rsl.concat(rew.filter(v => {return v.type == _format[i]}))
        }
        return _rsl;
    }

    protected initTitle() {
        return;
    }

    protected initBg() {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
    }

    protected getNetConstEventArr(): string[] {
        return [
            NetConst.SIGNINFO_GETFIRSTRECHARGE
        ];
    }

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.SIGNINFO_GETFIRSTRECHARGE:
                this.onRewardGet(evt);
                break;
            default:
                break;
		}
    }

    protected getBgName():string {
        return "firstrec_bg";
    }

    protected getCloseBtnName() {
        return "firstrec_closeBtn"
    }

    protected getShowWidth():number
	{
		return 636;
	}

    protected getShowHeight():number {
        return 598;
    }

    protected getConfirmBtnStr():string {
        const _status = Api.SigninfoVoApi.isFirstRecharge();
		return LangMger.getlocal(_status == 0 ? "firstRecText1" : "firstRecText2");
	}

    private updateConfirmBtnStatus() {
        const _status = Api.SigninfoVoApi.isFirstRecharge();
        this._confirmBtn.setEnable(_status != 2);
    }

    protected clickConfirmHandler(data: any) {
        const _status = Api.SigninfoVoApi.isFirstRecharge();
        switch (_status) {
            case 0:
                App.MsgHelper.dispEvt(MsgConst.GOSHOP, {index: ShopConst.SHOP_GEM_INDEX, type: ShopConst.SHOP_GEM});
                super.clickConfirmHandler(data);
                break;
            case 1:
                this.getRewards();
                break;
            default:
                super.clickConfirmHandler(data);
                break;
        }
    }

    protected getRewards() {
        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth/2, GameConfig.stageHeigth/2));
        NetManager.request(NetConst.SIGNINFO_GETFIRSTRECHARGE, {});
    }

    private onRewardGet(e) {
        const view  = this;
        if (e.data.ret) {
            const __rews = e.data.data.data.rewards;
            ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
				rewards : __rews,
				title : LangMger.getlocal(`sysGetReward`),
				handler : view,
				callback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    this.updateConfirmBtnStatus();
                    ViewController.getInstance().hideView(ViewConst.FIRSTRECPOPUPVIEW);
				},
				closecallback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    this.updateConfirmBtnStatus();
                    ViewController.getInstance().hideView(ViewConst.FIRSTRECPOPUPVIEW);
				},
			}); 
        }
    }

    protected isTouchMaskClose(){
		return false;
	}

    public getResourceList(){
        let effs = [];
        for (let i=1;i<=15;i++) {
            if (i<=8) {
                effs.push(`firstrec_effect1_${i}`);
                effs.push(`firstrec_effect2_${i}`);
            }
            effs.push(`firstrec_effect3_${i}`);
        }
		return super.getResourceList().concat(
            [
                "firstrec_bg",
                "firstrec_btnBg",
                "firstrec_closeBtn",
                "firstrec_rewardBg",
                "firstrec_bird",
                "firstrec_tipBg",
                "ab_public_rulebtn"
            ]
        ).concat(effs);
	}

    protected resetBgSize():void {
        super.resetBgSize();

        this.closeBtn.x = 555;
        this.closeBtn.y = this.viewBg.y - 40;

        this._confirmBtn.setBtnBitMap("firstrec_btnBg");
        this._confirmBtn.setBtnSize(240, 77);
        this._confirmBtn.x = (this.getShowWidth() - 240)/2;
        this._confirmBtn.y -= 60;
        this._confirmBtn.setTextPos(0, 20);
        this._confirmBtn.setTextSize(30);
        this._confirmBtn.setTextStrokeColor(0x0665c3, 2);
        this.updateConfirmBtnStatus();
    }

    public dispose() {
        this._rewList = null;
        this._rechargeBtn = null;
        this._reciveBtn = null;
        this._ruleTipBox = null;
        this._effect = null;
        super.dispose();
    }
}