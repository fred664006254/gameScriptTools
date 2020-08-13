class BureaucratGuideView extends CommonView {

    private _scrollList: ScrollList;
    constructor() {
        super();
    }
    public getTitleStr() {
        return App.StringUtil.firstCharToLower(this.getClassName()) + "Title";
    }
    public initView(): void {
        let bottomBg: BaseBitmap = BaseBitmap.create("public_9_bg22");
        bottomBg.y = -15;
        bottomBg.height = GameConfig.stageHeigth - this.getTitleButtomY() - 5;
        this.addChildToContainer(bottomBg);
        let pic = BaseBitmap.create("bureaucrat_guide_pic");
        pic.x = 20; pic.y = 109;
        this.addChild(pic);
        //列表
        let item1 = { index: ("bureaucratGuide_step1"), des: ("bureaucratGuide_step1_des"), url: "https://dwz.cn/GTvdFGly" };
        let item2 = { index: ("bureaucratGuide_step2"), des: ("bureaucratGuide_step2_des"), bg: "bureaucrat_guide_pic1" };
        let item3 = { index: ("bureaucratGuide_step3"), des: ("bureaucratGuide_step3_des"), bg: "bureaucrat_guide_pic2" };
        let item4 = { index: ("bureaucratGuide_step4"), des: ("bureaucratGuide_step4_des"), bg: "bureaucrat_guide_pic3" };
        let item5 = { index: ("bureaucratGuide_step5"), des: ("bureaucratGuide_step5_des"), bg: "bureaucrat_guide_pic4" };
        let item6 = { index: ("bureaucratGuide_step6"), des: ("bureaucratGuide_step6_des"), bg: "bureaucrat_guide_pic5" };
        let list = [item1, item2, item3, item4, item5, item6];
        let _scroRect = new egret.Rectangle(20, 256, 600, 680);
        this._scrollList = ComponentManager.getScrollList(BureauceratGuideItem, list, _scroRect);
        this._scrollList.x = 20;
        this._scrollList.y = 256;
        this.addChild(this._scrollList);
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "bureaucrat_guide_pic", "bureaucrat_guide_pic1", "bureaucrat_guide_pic2", "bureaucrat_guide_pic3",
            "bureaucrat_guide_pic4", "bureaucrat_guide_pic5", "common_titlebg", "public_9_bg20"
        ]);
    }
    public dispose(): void {
        super.dispose();
        this._scrollList = null;
    }
}