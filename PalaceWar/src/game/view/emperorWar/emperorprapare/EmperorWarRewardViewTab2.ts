class EmperorWarRewardViewTab2 extends CommonViewTab
{
	private get cfg(){
        return Config.EmperorwarCfg;
    }

	public constructor() 
	{
		super();
		this.initView();
	}

	protected getListType():number
	{
		return 2;
	}

	protected initView():void
	{
		let view = this;
		let viewbg = view.getViewBg();
		view.width = GameConfig.stageWidth+18;

		let cfg = view.cfg;
		let arr = [];
		for(let i in cfg.cheerRewardList){
			let unit = cfg.cheerRewardList[i];
			unit.type = 2;
			arr.push(unit);
		}
		let scrollList  = ComponentManager.getScrollList(EmperorWarRewardScrollItem, arr, new egret.Rectangle(viewbg.x, 0, viewbg.width - 60, viewbg.height - 55));
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, viewbg, [0,25 - viewbg.y]);
        view.addChild(scrollList);
	}

	public dispose():void
	{
		super.dispose();
	}

}