class AcLimitGiftView extends AcCommonView {
    public constructor() {
        super();
    }

    private _volist: AcLimitGiftVo[];
    protected param: {Vo: AcLimitGiftVo};

    protected initView() {
        let _banner = BaseLoadBitmap.create("ac_limitgift_banner");
        this.addChildToContainer(_banner);
        _banner.height = 212;
        _banner.setPosition(0, 92 - this.container.y);

        let _tips = ComponentManager.getTextField(
            LanguageManager.getlocal("acLimitGiftText7"),
            20, 0xf1d27f
        );
        this.addChildToContainer(_tips);
        _tips.setPosition(_banner.x + 288, _banner.y + 140);

        let _border = BaseLoadBitmap.create("ac_limitgift_border");
        this.addChildToContainer(_border);
        _border.height = GameConfig.stageHeigth - _banner.height - _banner.y + this.container.y;
        _border.setPosition(0, _banner.height + _banner.y);

        // let _bottom = BaseLoadBitmap.create("ac_limitgift_bg2");
        // this.addChildToContainer(_bottom);
        // _bottom.height = 32;
        // _bottom.setPosition(0, GameConfig.stageHeigth - 32 - this.container.y);

        let tab_bg = BaseLoadBitmap.create("ac_limitgift_bg3");
        tab_bg.width = 620;
        tab_bg.height = 61;
        this.addChildToContainer(tab_bg);
        tab_bg.setPosition((GameConfig.stageWidth - 620)/2, _border.y);

        this.refershTabRedPot();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.refershTabRedPot, this);
    }

    private initVoList() {
        if (!this._volist) {
            this._volist = <AcLimitGiftVo[]>Api.acVoApi.getActivityVoListByAid(this.aid).filter(v => !v.isEnd);
        }
    }

    private initParams() {
        this.param.Vo = this._volist[this.selectedTabIndex];
    }

    public tick() {
        let __endVo = this._volist.filter(v => v.isEnd);
        if (__endVo.length > 0) {
            this.refershTabRedPot();
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGR_LIMITGIFT_DJS);
    }

    private refershTabRedPot() {
        this._volist.forEach((v, i) => {
            if (v.isHasFreeCharge && !v.isEnd) {
                this.tabbarGroup.addRedPoint(i);
            } else {
                this.tabbarGroup.removeRedPoint(i);
            }
        })
    }

    protected changeTab() {
        super.changeTab();
        if (this.TabViewInstance && !this.TabViewInstance.Vo) {
            this.TabViewInstance.Vo = this._volist[this.selectedTabIndex];
        }
        this.TabViewInstance.refreshView();
    }

    protected initTabbarGroup() {
        this.initVoList();
        super.initTabbarGroup();
    }

    private get TabViewInstance(): AcLimitGiftBaseTab {
        return this.tabViewData[this.selectedTabIndex] || null;
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = 20;
        this.tabbarGroup.y = 296;
    }

    protected getTabbarTextArr():Array<string>{
        let list: string[] = this._volist.map(v => {
            return App.CommonUtil.getCnByCode("acLimitGiftText1", ""+v.config.limitType);
        })
		return list;
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
    }

    protected initTitle() {
        super.initTitle();
        this.titleBgShadow.dispose();
    }

    protected getBgName(): string {
        return "ac_limitgift_bg1";
    }
    protected getTitleBgName(): string {
        return "ac_limitgift_title1";
    }
    protected getTitlePic() : string {
        return "";
    }

    protected getTitleStr():string {
        return "";
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "ac_limitgift_banner", "dailyactivity_fnt"
		]);
    }

    public dispose() {
        this._volist = null;

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.refershTabRedPot, this);
        super.dispose();
    }
}
