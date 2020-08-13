/**
 * 拉霸机 -奖池
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameRewardView
 */
class AcArcadeGameRewardView extends PopupView {


	public constructor() {
		super();
	}
	protected getCnCode(): string {
		let code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 540;
		bg.height = 700;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 520, 680);
		let scrollList = ComponentManager.getScrollList(AcArcadeGameRewardScrollItem, cfg.poolListItemCfg, rect, { aid: aid, code: code });
		scrollList.setPosition(bg.x + 10, bg.y + 10);
		this.addChildToContainer(scrollList);

	}
	protected getTitleStr(): string {
		return "acArcadeGameRewardViewTitle-" + this.getCnCode();
	}
	protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "activity_db_01","acarcadeview_machine-1","acarcadeview_logdown-1","acarcadeview_arrow",
          
        ]);
    }

	public dispose(): void {
		super.dispose();
	}
}