/**
 * 首冲--奖励物品icon
 */
class firstRectItem extends BaseDisplayObjectContainer {
    public constructor (rewData?: any) {
        super();
        this.rewData = rewData;
        this.initView();
    }

    private rewData: RewardItemVo;
    private itemId: number;

    private _effect: CustomMovieClip;

    private initView() {
        let _bg: BaseLoadBitmap = BaseLoadBitmap.create("firstrec_rewardBg");
        this.addChild(_bg);
        _bg.width = 133;
        _bg.height = 135;

        let _icon = GameData.getItemIcon(this.rewData, this.rewData.num, false);
        this.addChild(_icon);
        _icon.x = (_bg.width - _icon.width)/2;
        let numTxt = <BaseTextField>_icon.getChildByName("numTxt");
        numTxt.size = 22;
        numTxt.y -= 10;
        numTxt.stroke = 2;
        numTxt.strokeColor = 0xb7410f;

        this.initLightEffect();

        _bg.addTouchTap(this.showDetails, this);
    }

    /**
     * 光圈动画
     */
    private initLightEffect() {
        const _pre: string = this.rewData.type == 100? "firstrec_effect1_":"firstrec_effect2_";
        this._effect = ComponentMgr.getCustomMovieClip(_pre, 8, 120);
        if (this.rewData.type != 100) {
            this._effect.scaleX = this._effect.scaleY = 1.4;
        }
        this._effect.blendMode = egret.BlendMode.ADD;
        this.addChild(this._effect);
        this._effect.playWithTime(0);
        this._effect.x -= 67;
        this._effect.y -= 67;
    }

    private showDetails() {
        if (this.rewData.type == 100) {
            const diceInfo = Config.DiceCfg.getCfgById(this.rewData.id);
            ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
                title : diceInfo.name,
                handler : null,
                needCancel : false,
                needClose : 1,
                id : `100_${diceInfo.id}_${this.rewData.num}`,
                costnum :LangMger.getlocal("sysconfirm"),
                // costIcon : `ab_mainui_gem`
                touchMaskClose:true,
            });
        } else if (this.rewData.type == 1 || this.rewData.type == 2) {
            ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                title : this.rewData.name,
                handler : null,
                needCancel : false,
                needClose : 1,
                param : this.rewData,
                costnum :LangMger.getlocal("sysconfirm"),
                // costIcon : `ab_mainui_gem`
            });
        }
    }

    public dispose() {
        this.removeTouchTap();
        this.rewData = null;
        this.itemId = null;
        this._effect = null;
        super.dispose();
    }
}