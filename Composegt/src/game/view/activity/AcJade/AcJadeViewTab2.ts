
class AcJadeViewTab2 extends AcCommonViewTab {

	private _scrollList:ScrollList = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _rankList = null;
	public constructor() {
		super();
		this.initView();
	}
    public get vo ()
    {
       return <AcJadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
	public initView()
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshData,this);
	
		this._aidAndCode = {"aid":this.aid,"code":this.code};
		let rect = new egret.Rectangle(0,0,612,GameConfig.stageHeigth -this.getViewTitleButtomY() - 50 - 47)
		
        let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

        this._rankList = cfg.getTotalList();
		let rankO = null;
		for(let i =  this._rankList.length - 1; i >= 0;i --)
		{
			rankO = this._rankList[i];
			if(rankO.rankV2 != -1 && rankO.rankV2 < this.vo.getRechargeValue())
			{
				this._rankList.splice(i,1);
			}
		}
		
        this._scrollList = ComponentManager.getScrollList(AcJadeViewTotalScrollItem,this._rankList,rect,this._aidAndCode);
		this._scrollList.setScrollTopByIndex(this._rankList.length - 1);
		this._scrollList.y = 3;
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this.addChild(this._scrollList);

		
		let bottomBg = BaseBitmap.create("adult_lowbg");
		bottomBg.x = GameConfig.stageWidth/2- bottomBg.width/2;
		bottomBg.y = GameConfig.stageHeigth -486- bottomBg.height-12;
		this.addChild(bottomBg);

        let tabText = ComponentManager.getTextField(LanguageManager.getlocal("acJadeViewBottomTip2"),20,0xdc9740);
        tabText.x = bottomBg.x + bottomBg.width/2 - tabText.width/2;
        tabText.y = bottomBg.y + bottomBg.height/2 - tabText.height/2;
        this.addChild(tabText);
	}
	private refreshData()
	{
		if(this._rankList)
		{
			let rankO = null;
			for(let i =  this._rankList.length - 1; i >= 0;i --)
			{
				rankO = this._rankList[i];
				if(rankO.rankV2 != -1 && rankO.rankV2 < this.vo.getRechargeValue())
				{
					this._rankList.splice(i,1);
				}
			}
			this._scrollList.refreshData(this._rankList,this._aidAndCode);
			this._scrollList.setScrollTopByIndex(this._rankList.length - 1);
		}

	}

	public dispose()
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACJADE_REFRESHVO,this.refreshData,this);
		this._scrollList = null;
		this._aidAndCode = null;
		this._rankList = null;
		super.dispose();
	}
	
}