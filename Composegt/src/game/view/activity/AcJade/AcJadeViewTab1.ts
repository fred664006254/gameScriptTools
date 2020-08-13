
class AcJadeViewTab1 extends AcCommonViewTab {

	private _scrollList:ScrollList = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	public constructor() {
		super();
		this.initView();
	}

	public initView()
	{
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth -this.getViewTitleButtomY() - 50 - 47)
		
        let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        let rankList = cfg.getRankList();
        this._scrollList = ComponentManager.getScrollList(AcJadeViewRankScrollItem,rankList,rect,this._aidAndCode);
		// this._scrollList.setPosition(15,15);
		this._scrollList.y = 3;
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this.addChild(this._scrollList);

		
		let bottomBg = BaseBitmap.create("adult_lowbg");
		bottomBg.x = GameConfig.stageWidth/2- bottomBg.width/2;
		bottomBg.y = GameConfig.stageHeigth -486- bottomBg.height-12;
		this.addChild(bottomBg);

        let tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip1"),20,0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width/2 - tabText.width/2;
        tabText.y = bottomBg.y + bottomBg.height/2 - tabText.height/2;
        this.addChild(tabText);
	}


	public dispose()
	{
		this._scrollList = null;
		this._aidAndCode = null;
		super.dispose();
	}
	
}