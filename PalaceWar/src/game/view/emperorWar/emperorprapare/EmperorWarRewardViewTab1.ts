//
class EmperorWarRewardViewTab1 extends CommonViewTab
{
	public constructor() 
	{
		super();
		this.initView();
	}

	private get cfg(){
        return Config.EmperorwarCfg;
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		let view = this;
		let viewbg = view.getViewBg();
		view.width = GameConfig.stageWidth+18;
		// let txt1 : BaseTextField= ComponentManager.getTextField(LanguageManager.getlocal("emperorWarTitle"),24,TextFieldConst.COLOR_BLACK);
		// view.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, viewbg, [0,20 - viewbg.y]);
		// view.addChild(txt1);

		let winBottomBg = BaseBitmap.create("emptquan");
		view.setLayoutPosition(LayoutConst.horizontalCentertop, winBottomBg, view, [-10,10]);
		view.addChild(winBottomBg);

		let distance = (winBottomBg.width - (4 * 45 + 82 * 3)) / 2 - 20;
		// for(var index = 1; index <= 3; index++){
		// 	let prerogativIcon = ComponentManager.getButton(`prestige_prerogative${index}`,'',view.empriorHandler,view,[index]);//BaseBitmap.create("prestige_prerogative"+index);
		// 	view.setLayoutPosition(LayoutConst.leftverticalCenter, prerogativIcon, winBottomBg, [distance + (45 + 82) * (index - 1),20]);
		// 	view.addChild(prerogativIcon);
		// }
		for(var index = 1; index <= 4; index++){
			let prerogativIcon = ComponentManager.getButton(`prestige_prerogative${index}`,'',view.empriorHandler,view,[index]);//BaseBitmap.create("prestige_prerogative"+index);
			view.setLayoutPosition(LayoutConst.leftverticalCenter, prerogativIcon, winBottomBg, [distance + (45 + 82) * (index - 1),20]);
			view.addChild(prerogativIcon);
		}


		let cfg = view.cfg;
		let arr = [];
		for(let i in cfg.rankRewardList){
			let unit = cfg.rankRewardList[i];
			unit.type = 1;
			arr.push(unit);
		}
		let scrollList  = ComponentManager.getScrollList(EmperorWarRewardScrollItem, arr, new egret.Rectangle(viewbg.x, winBottomBg.y + winBottomBg.height, viewbg.width - 60, viewbg.height - winBottomBg.height - 75));
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, viewbg, [0,winBottomBg.y+winBottomBg.height - viewbg.y]);
        view.addChild(scrollList);
	}

	private empriorHandler(param:any)
	{
		ViewController.getInstance().openView(ViewConst.POPUP.PRESTIGEITEMPOPUPVIEW,{itemId:param});
	}

	public dispose():void
	{
		super.dispose();
	}

}