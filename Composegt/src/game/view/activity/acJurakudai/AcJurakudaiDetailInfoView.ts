class AcJurakudaiDetailInfoView  extends PopupView{
    public constructor() {
		super();
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acVo() : AcJurakudaiVo{
		return <AcJurakudaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
	// private get cfg() : Config.AcCfg.JurakudaiCfg{
    //     return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    // }

    /**门客列表 */
    private _servantList: string[] = [];
    /**正在展示 */
    private onShowIndex: number = 0;

    /**门客立绘 */
    private npc: BaseLoadBitmap;
    /**门客品质图标 */
    private npcQuality: BaseDisplayObjectContainer;
    /**门客名字 */
    private npcName: BaseTextField;
    private npcNameBg: BaseBitmap;
    /**羁绊入口 */
    private fetterBtn: BaseButton;
    /**技能条 */
    private skillBar: ServantSkillBar;
    /**提示（还差XX次） */
    private tipLabel: BaseTextField;
    /**领取按钮 */
    private getBtn: BaseButton;
    /**特长 */
    private techangLabel: BaseTextField;
    /**资质 */
    private zizhiLabel: BaseTextField;

	public initView():void{
        this.initData();
        // this.container.setPosition(0, 0);

        let view = this;
        let sid = 1;
        let uicode = this.code;
        let arr = [2015,2016,2017,2018,2014];
        let cfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(this._servantList[this.onShowIndex]);
        this.npc = BaseLoadBitmap.create(cfg.fullIcon);
        this.addChildToContainer(this.npc);
        this.npc.anchorOffsetY = this.npc.height;
        this.npc.anchorOffsetX = this.npc.width/2;
        this.npc.setPosition(this.getShowWidth()/2, 500);
        this.npc.setScale(0.8);

        let namebg = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudainamebg`, uicode));
        this.addChildToContainer(namebg);
        namebg.setPosition(114, 98);
        this.npcNameBg = namebg;

        this.npcName = ComponentManager.getTextField(cfg.name, 28, 0xFFF0BB);
        this.npcName.width = 28;
        this.npcName.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.npcName, this.npcNameBg, [0,0]);
        this.addChildToContainer(this.npcName);

        this.npcQuality = GameData.getServantQualityIconBySid(cfg.id);
        if (this.npcQuality) {
            this.addChildToContainer(this.npcQuality);
            this.npcQuality.setPosition(0, 0);
        }

        let leftbtn = ComponentManager.getButton("btn_leftpagenew", '', this.switchServant, this, [-1]);
        leftbtn.anchorOffsetX = leftbtn.width / 2;
        this.addChildToContainer(leftbtn);
        leftbtn.setPosition(74, this.npc.y - 250);

        let rightbtn = ComponentManager.getButton("btn_leftpagenew", '', this.switchServant, this, [1]);
        rightbtn.anchorOffsetX = rightbtn.width / 2;
        rightbtn.scaleX = -1;
        this.addChildToContainer(rightbtn);
        rightbtn.setPosition(this.getShowWidth() - 74, this.npc.y - 250);


        let bg1 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaipopbg`, uicode));
        this.addChildToContainer(bg1);
        bg1.setPosition((this.getShowWidth() - bg1.width)/2, this.npc.y - 40);

        this.fetterBtn = GameData.getServantFetterBtn(cfg.id);
        if (this.fetterBtn) {
            this.addChildToContainer(this.fetterBtn);
            this.fetterBtn.setScale(90/this.fetterBtn.width);
            this.fetterBtn.setPosition(538, this.npc.y - 164);
        }

        let bg2 = BaseBitmap.create(App.CommonUtil.getResByCode(`jurakudaipopskillbg`, uicode));
        bg2.height = 141;
        this.addChildToContainer(bg2);
        bg2.setPosition((this.getShowWidth() - bg2.width)/2, bg1.y + 177);

        this.skillBar = ComponentManager.getSkillBar(cfg.id, 97, true, true, true);
        this.addChildToContainer(this.skillBar);
        this.skillBar.setPosition(bg2.x, bg2.y+8);
        this.skillBar.labelWidth = bg2.width;

        this.zizhiLabel = ComponentManager.getTextField(LanguageManager.getlocal('acJurakudaiText7', [cfg.getStarNums().toString()]), 24, 0x420e00);
        this.zizhiLabel.width = bg2.width;
        this.addChildToContainer(this.zizhiLabel);
        this.zizhiLabel.setPosition(bg2.x, bg2.y - 38);

        this.techangLabel = ComponentManager.getTextField(LanguageManager.getlocal('acJurakudaiText8', [cfg.specialityStr.join(",")]), 24, 0x420e00);
        this.techangLabel.width = bg2.width;
        this.techangLabel.textAlign = TextFieldConst.ALIGH_RIGHT;
        this.addChildToContainer(this.techangLabel);
        this.techangLabel.setPosition(bg2.x, bg2.y - 38);

        this.tipLabel = ComponentManager.getTextField("", 24, 0x420e00);
        this.tipLabel.width = 218;
        this.tipLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChildToContainer(this.tipLabel);
        this.tipLabel.setPosition((this.getShowWidth() - this.tipLabel.width)/2, bg1.y + 100);

        this.getBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudaibtn1", uicode), "acJurakudaiText9", this.onGetTap, this);
        this.addChildToContainer(this.getBtn);
        this.getBtn.setPosition((this.getShowWidth() - this.getBtn.width)/2, bg2.y + 124);
        this.getBtn.setColor(0x6f2f00);
        this.getBtn.setTextOffY(11);

        this.getBtn.visible = false;
        if (cfg.id != this.acVo.awardServantId) {
            this.tipLabel.text = "";
        } else if (this.acVo.lotteryNeedNum > 0) {
            this.tipLabel.text = LanguageManager.getlocal("acJurakudaiText5", [""+this.acVo.lotteryNeedNum]);
        } else {
            this.tipLabel.text = LanguageManager.getlocal("acJurakudaiText6");
            this.getBtn.visible = true;
        }

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIBOXREWARD), this.onGetRequest, this);
    }

    private initData() {
        this._servantList = this.acVo.config.servantID.map(v => v.toString());
        this.onShowIndex = 0;
        for (let i=0;i<this._servantList.length;i++) {
            if (this.acVo.awardServantId == this._servantList[i]) {
                this.onShowIndex = i;
                break;
            }
        }
    }

    private refreshView() {
        let cfg = Config.ServantCfg.getServantItemById(this._servantList[this.onShowIndex]);
        this.npc.setload(cfg.fullIcon);
        this.npc.setScale(0.8);
        this.npcName.text = cfg.name;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.npcName, this.npcNameBg, [0,0]);

        this.npcQuality && this.npcQuality.dispose();
        this.npcQuality = GameData.getServantQualityIconBySid(cfg.id);
        if (this.npcQuality) {
            this.addChildToContainer(this.npcQuality);
            this.npcQuality.setPosition(0, 0);
        }
        this.fetterBtn && this.fetterBtn.dispose();
        this.fetterBtn = GameData.getServantFetterBtn(cfg.id);
        if (this.fetterBtn) {
            this.addChildToContainer(this.fetterBtn);
            this.fetterBtn.setScale(90/this.fetterBtn.width);
            this.fetterBtn.setPosition(538, this.npc.y - 164);
        }

        this.skillBar.changeServant(cfg.id);

        this.zizhiLabel.text = LanguageManager.getlocal('acJurakudaiText7', [cfg.getStarNums().toString()]);

        this.techangLabel.text = LanguageManager.getlocal('acJurakudaiText8', [cfg.specialityStr.join(",")]);

        this.getBtn.visible = false;
        if (cfg.id != this.acVo.awardServantId) {
            this.tipLabel.text = "";
        } else if (this.acVo.lotteryNeedNum > 0) {
            this.tipLabel.text = LanguageManager.getlocal("acJurakudaiText5", [""+this.acVo.lotteryNeedNum]);
        } else {
            this.tipLabel.text = LanguageManager.getlocal("acJurakudaiText6");
            this.getBtn.visible = true;
        }
    }

    private switchServant(k: number) {
        this.onShowIndex += k;
        if (this.onShowIndex < 0) this.onShowIndex = this._servantList.length - 1;
        if (this.onShowIndex >= this._servantList.length) this.onShowIndex = 0;
        this.refreshView();
    }

    private onGetTap() {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIBOXREWARD, {
            activeId: this.acVo.aidAndCode
        })
    }

    private onGetRequest(e: egret.Event) {
        if (e.data.ret) {
            this.initData();
            this.refreshView();

            let data = e.data.data.data;
            if (data.rewards && !data.unlockServant) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.rewards);
            }
        }
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "commonview_woodbg","shopview_redbg"
		]);
    }

    protected getShowHeight():number{
        return 920;
    }

    protected getShowWidth():number{
		return 640;
	}

    protected getTitleStr():string{
        return null;
    }

    protected getBgName():string{
        return null;
    }

    protected getCloseBtnName():string{
		return "btn_win_closebtn";
	}

    protected getTitleBgName():string{
        return null;
    }

    protected resetBgSize() {
        this.container.y = (GameConfig.stageHeigth - this.getShowHeight())/2;
        this.closeBtn.y = this.container.y;
    }

	public dispose():void{
        this._servantList = [];
        this.onShowIndex = 0;
        this.npc = null;
        this.npcName = null;
        this.npcNameBg = null;
        this.npcQuality = null;
        this.fetterBtn = null;
        this.skillBar = null;
        this.tipLabel = null;
        this.getBtn = null;
        this.techangLabel = null;
        this.zizhiLabel = null;

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAIBOXREWARD), this.onGetRequest, this);
        super.dispose();
    }
}