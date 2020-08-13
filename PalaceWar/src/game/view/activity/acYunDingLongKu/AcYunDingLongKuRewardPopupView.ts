/**
  * 比武招亲额外奖励
  * @author 张朝阳
  * date 2018/12/18
  * @class AcMarryRewardPopupView
  */
class AcYunDingLongKuRewardPopupView extends PopupView {

	public constructor() {
		super();
	}
	public initView() {
		let aid = this.param.data.aid;
		let code = this.param.data.code;

		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 646;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let cfg = <Config.AcCfg.YunDingLongKuCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcYunDingLongKuRewardScrollItem, cfg.battleUseItemCfgList, rect, { aid: aid, code: code });
		scrollList.setPosition(bg.x + bg.width / 2 - scrollList.width / 2, bg.y + bg.height / 2 - scrollList.height / 2);
		this.addChildToContainer(scrollList);
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"wifeview_namebg",
		]);
	}
	protected getTitleStr(): string {
		return "acYunDingLongKuRewardInfoViewTitle-" + this.param.data.code;
	}
	public dispose() {
		super.dispose();
	}

}