/**
 * 门客详情new 突破部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIFourItems
 */
class ServantNewUIFourItems extends BaseDisplayObjectContainer
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
		if(auraList)
		{
			let tarIdList = [];
			let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-42);
			let scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem,tarIdList,rect);
			scrollView.y = 30;
			scrollView.x = 24;
			this._scrollView = scrollView;
			this.addChild(scrollView);
			this.refreshList();
		}else
		{
			if(servantcfg.isOpenAuraBySkin())
			{
				let tarIdList = [];
				let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-42);
				let scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem,tarIdList,rect);
				scrollView.y = 30;
				scrollView.x = 24;
				this._scrollView = scrollView;
				this.addChild(scrollView);
				this.refreshList();				
			}
		}
	}

	protected refreshList()
	{
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        let auraList = servantcfg.aura;
		let tarIdList =null;
		if(auraList)
		{
			let keysList = Object.keys(auraList);
			tarIdList = [keysList[0],keysList[1] ];
			let auraId0 = keysList[0];
			let auraId1 = keysList[1];
			let auraId2 = keysList[2];
			let aura2Data = auraList[keysList[2]];
			let aura3Data = auraList[keysList[3]];
			if(aura2Data  && Api.switchVoApi.checkOpenNewAura(aura2Data.auraIcon )  )
			{
				let curData0 = auraList[auraId0];
				let curData1 = auraList[auraId1];
				let curData2 = auraList[auraId2];
				let servantObj = Api.servantVoApi.getServantObj(this._servantId);
				if(servantObj.aura[auraId0] >= curData0.maxLv && servantObj.aura[auraId1] >= curData1.maxLv)
				{
					//光环3
					tarIdList.push(keysList[2]);
				}
				if(aura3Data  && (Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon) || Number(this._servantId)>2018 ||  Number(this._servantId)<2001))
				{
					if(servantObj.aura[auraId2] >= curData2.maxLv && Api.servantVoApi.checkAura4CanShow(this._servantId))
					{
						//光环4
						tarIdList.push(keysList[3]);
					}
				}
			}
		}
		if(servantcfg.isOpenAuraBySkin())   //把皮肤开启的光环加进去
		{
			if(!tarIdList)
			{
				tarIdList = [];
			}
            let skinList:string[] = Config.ServantskinCfg.getIdListBySerVantId(this._servantId);
            for(let i = 0; i < skinList.length; i++)
            {
                if(Api.servantVoApi.isOwnSkinOfSkinId(skinList[i]))
                {
                    let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if(servantSkinCfg.specialAura)
                    {
                        tarIdList.push(servantSkinCfg.id);
                    }
                }
            }			
		}
		
		if(this._scrollView && tarIdList)
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