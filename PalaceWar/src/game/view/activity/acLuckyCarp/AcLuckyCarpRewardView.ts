/**
  * 锦鲤奖励预览
  * author 张朝阳
  * date 2019/2/11
  * @class AcLuckyCarpRewardView
  */
class AcLuckyCarpRewardView extends CommonView {

	private code: string;

	private aid: string;
	public constructor() {
		super();
	}

	public initView() {
		this.code = this.param.data.code;
		this.aid = this.param.data.aid;
		let cfg = <Config.AcCfg.LuckyCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let titlebg = BaseLoadBitmap.create("acluckycarptitilebg-" + this.code);
		titlebg.width = 640;
		titlebg.height = 92;

		let midbg = BaseLoadBitmap.create("dragonboattab1bg");
		midbg.width = 640;
		midbg.height = GameConfig.stageHeigth - titlebg.height + 10;
		midbg.setPosition(0, titlebg.x + titlebg.height - 10);
		this.addChildToContainer(midbg);
		this.addChildToContainer(titlebg);

		if (this.param.data.handleDate.totalCharge > cfg.rewardItemListCfg[cfg.rewardItemListCfg.length - 1].unlockValue) {
			this.param.data.handleDate.totalCharge = cfg.rewardItemListCfg[cfg.rewardItemListCfg.length - 1].unlockValue;
		}
		let rect = new egret.Rectangle(0, 0, 614, midbg.height - 37);
		let scrollList = ComponentManager.getScrollList(AcLuckyCarpRewardScrollItem, cfg.rewardItemListCfg, rect, {
			aid: this.aid,
			code: this.code,
			handleDate: this.param.data.handleDate
		});
		scrollList.setPosition(midbg.x + midbg.width / 2 - scrollList.width / 2, midbg.y + 17);
		this.addChildToContainer(scrollList);

	}
	protected getRuleInfo(): string {
		return "acLuckyCarpViewRule-" + this.code;
	}
	protected getTitleBgName(): string {
		return null;
	}
	protected getTitleStr(): string {
		return null;
	}
	public dispose() {
		super.dispose();
	}

}