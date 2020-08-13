/**
 * 拉霸机 -记录
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameLogView
 */
class AcArcadeGameLogView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let logs = this.param.data.logs;
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 700;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 520, 690);
		if (logs.length > 1) {
			logs.sort((a, b) => {
				return b[0] - a[0];
			});
		}
		let scrollList = ComponentManager.getScrollList(AcArcadeGameLogsScrollItem, logs, rect, { aid: aid, code: code });
		scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChildToContainer(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"accarnivalview_tab_red", "acarcadeview_logdown-1", "acarcadeview_logup-1"
		]);
	}
	protected getTitleStr(): string {
		return "acArcadeGameLogViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		super.dispose();
	}
}