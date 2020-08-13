class AcCrossOneServerView extends AcCommonView {
    public constructor() {
        super();
    }

    public get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private _servantImg: BaseLoadBitmap;
    private _servantDragon: BaseLoadDragonBones;

    private _rankBtn: BaseButton;
    private _taskBtn: BaseButton;

    private _djsLabel: BaseTextField;
    private _msgLabel: BaseTextField;

    protected initView() {
        this.initServantImage();
        
        let _mask = BaseLoadBitmap.create("ac_crossoneserver_mask1");
        _mask.height = 275;
        this.addChildToContainer(_mask);
        _mask.y = GameConfig.stageHeigth - 166 - _mask.height;

        this._rankBtn = ComponentManager.getButton("ac_crossoneserver_rank1", "", this.onRankTap, this);
        this.addChildToContainer(this._rankBtn);
        this._rankBtn.setPosition(20, GameConfig.stageHeigth - 186 - this._rankBtn.height);

        this._taskBtn = ComponentManager.getButton("ac_crossoneserver_task1", "", this.onTaskTap, this);
        this.addChildToContainer(this._taskBtn);
        this._taskBtn.setPosition(GameConfig.stageWidth - this._taskBtn.width - 20, GameConfig.stageHeigth - 186 - this._taskBtn.height);

        let _bottomBg = BaseLoadBitmap.create("public_9_wordbg");
        _bottomBg.height = 166;
        this.addChildToContainer(_bottomBg);
        _bottomBg.y = GameConfig.stageHeigth - 166;

        this._djsLabel = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this._djsLabel.width = GameConfig.stageWidth;
        this._djsLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChildToContainer(this._djsLabel);
        this._djsLabel.setPosition(0, _bottomBg.y + 16);

        this._msgLabel = ComponentManager.getTextField(this.Vo.MsgText, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        this._msgLabel.width = GameConfig.stageWidth - 32;
        this.addChildToContainer(this._msgLabel);
        this._msgLabel.setPosition(16, _bottomBg.y + 40);
        this._msgLabel.lineSpacing = 6;

        let groupLabel = ComponentManager.getTextField(this.Vo.getServerGroupText(), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, 0xfdf3b5);
        groupLabel.width = GameConfig.stageWidth - 32;
        this.addChildToContainer(groupLabel);
        groupLabel.setPosition(16, _bottomBg.y + 46 + this._msgLabel.height);
        groupLabel.lineSpacing = 6;
        groupLabel.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title: "acCrossOneServerText27",
                msg: this.Vo.getServerGroup(),
                handler: this
            });
        }, this, null);

        this.refreshView();

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
    }

    private refreshView() {
        if (this.Vo.TaskHasRewGet() && !this.Vo.isEnd) {
            App.CommonUtil.addIconToBDOC(this._taskBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this._taskBtn);
        }
    }

    private initServantImage() {
        const _dragonPath = this.Vo.CurrServantDragon;
        if (Api.switchVoApi.checkCloseBone() || !RES.hasRes(_dragonPath + "_ske") || !App.CommonUtil.check_dragon()) {
            this._servantImg = BaseLoadBitmap.create(this.Vo.CurrServantImg);
            this._servantImg.width = 405;
            this._servantImg.height = 467;
            this._servantImg.anchorOffsetX = this._servantImg.width / 2;
            this._servantImg.anchorOffsetY = this._servantImg.height;
            this.addChildToContainer(this._servantImg);
            this._servantImg.x = GameConfig.stageWidth / 2;
            this._servantImg.y = GameConfig.stageHeigth - 166;
            this._servantImg.setScale(1.3);
        } else {
            this._servantDragon = App.DragonBonesUtil.getLoadDragonBones(_dragonPath);
            this._servantDragon.visible = true;
            this._servantDragon.anchorOffsetX = this._servantDragon.width / 2;
            this._servantDragon.anchorOffsetY = this._servantDragon.height;
            this.addChildToContainer(this._servantDragon);
            this._servantDragon.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 166);
            this._servantDragon.setScale(1.3);
        }
    }

    private onRankTap() {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSRANKREWPOPUPVIEW, {
            aid: this.aid,
            code: this.code
        })
    }

    private onTaskTap() {
        if (this.Vo.isEnd) {
            this.Vo.showAcEndTip();
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSTASKPOPUPVIEW, {
            aid: this.aid,
            code: this.code
        })
    }

    protected initTitle() {
        super.initTitle();
        this.titleBgShadow.dispose();
    }

    public tick() {
        if (this.Vo.checkIsAtEndShowTime()) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSSONESERVER_END);
        }
        this._djsLabel.text = this.Vo.getAcCountDown();
    }

    protected getBgName(): string {
        return "ac_crossoneserver_bg";
    }
    protected getTitleBgName(): string {
        return "ac_crossoneserver_title";
    }
    protected getTitlePic() : string {
        return "";
    }

    protected getTitleStr():string {
        return "";
    }

    protected getRuleInfo():string{
		return "acCrossOneServerRule";
    }

    protected getRuleBtnName(): string{	
		return ButtonConst.BTN2_RULE;
	}

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "ac_crossoneserver_rank1",
            "ac_crossoneserver_task1",
            "ac_crossoneserver_rank1_down",
            "ac_crossoneserver_task1_down",
            "ac_crossoneserver_mask1",
            "progress7",
            "progress7_bg"
		]);
    }

    public dispose() {
        this._servantImg = null;
        this._servantDragon = null;
        this._rankBtn = null;
        this._taskBtn = null;
        this._djsLabel = null;
        this._msgLabel = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        super.dispose();
    }
}