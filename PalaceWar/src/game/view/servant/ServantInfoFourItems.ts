/**
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItems
 */
class ServantInfoFourItems extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW,this.refreshList,this);
		this._servantId = servantId;
		ServantInfoFourItemScrollItem.servantId = this._servantId;

		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        let auraList = servantcfg.aura;
		if(!auraList)
		{
			return; //没有觉醒
		}

		let tarIdList = [];
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-120);
		let scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem,tarIdList,rect);
		scrollView.y = 90;
		scrollView.x = 24;
		this._scrollView = scrollView;
		this.addChild(scrollView);
		this.refreshList();
	}

	protected refreshList()
	{
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        let auraList = servantcfg.aura;
		if(!auraList)
		{
			return; //没有觉醒
		}
		let keysList = Object.keys(auraList);
		let tarIdList = [keysList[0],keysList[1] ];
		let auraId0 = keysList[0];
		let auraId2 = keysList[2];
		let aura2Data = auraList[keysList[2]];
		if(aura2Data  && Api.switchVoApi.checkOpenNewAura(aura2Data.auraIcon )  )
		{
			let curData0 = auraList[auraId0];
			let auraId1 = keysList[1];
			let curData1 = auraList[auraId1];
			let servantObj = Api.servantVoApi.getServantObj(this._servantId);
			if(servantObj.aura[auraId0] >= curData0.maxLv && servantObj.aura[auraId1] >= curData1.maxLv)
			{
				tarIdList = keysList;
			}
		}
		
		if(this._scrollView )
		{
			this._scrollView.refreshData(tarIdList);
			return;
		}
	}

    public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW,this.refreshList,this);
		this._scrollView = null;
        this._servantId =  null;
		super.dispose();
	}

}