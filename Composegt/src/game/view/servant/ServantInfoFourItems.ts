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

		
		// let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
		// public_biaoti.x = 25;
		// public_biaoti.y = 70;
		// public_biaoti.width =550;
		// this.addChild(public_biaoti);
		let baseY = 87;
		
		let jineng = BaseBitmap.create("servant_tupo"); 
		jineng.x = 250;
		jineng.y = baseY - jineng.height/2;//public_biaoti.y;
		this.addChild(jineng);
		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
		let serObj = <ServantInfoVo>Api.servantVoApi.getServantObj(this._servantId);

		// let istshotbg = BaseBitmap.create("public_listshotbg");
		// istshotbg.width = 600;
		// istshotbg.height =bottomH-185;
		// istshotbg.y = 130;
		// istshotbg.x =20;
		// this.addChild(istshotbg); 
		let auraList = [];
		let  tmpList = servantcfg.aura || [];
		for (var key in tmpList) {
			if (tmpList.hasOwnProperty(key)) {
				if(serObj.aura[key] != null)
				{
					auraList[key] = tmpList[key];
				}
			}
		}
		
		let skin_auraList = Api.servantVoApi.getServantObj(this._servantId).getAllSkinAuraList();
		let keysList = Object.keys(auraList).concat(Object.keys(skin_auraList));
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-145-25);
		ServantInfoFourItemScrollItem.servantId = this._servantId; 
		let scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem,keysList,rect);
		// scrollView.x = 24;
	
		// scrollView.y = 111;
		scrollView.y = 120;
		this._scrollView = scrollView;
	
		this.addChild(scrollView);
	}

    private servantWifeLevelupHandler()
    {
        
    }

    public dispose():void
	{
		this._scrollView = null;
        this._servantId =  null;
		super.dispose();
	}

}