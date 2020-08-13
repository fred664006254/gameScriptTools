/**
 * 门客详情 技能信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoWifeItem
 */
class ServantInfoWifeItem extends BaseDisplayObjectContainer
{
    private _servantId:string = null;
	private _wifeId:string = null;
	private _scrollView:ScrollList = null;
    public constructor()
	{
		super();
	}
	public init(servantId:string,bottomH:number):void
	{
		this._servantId = servantId;
		let servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
		this._wifeId =  servantcfg.wifeId;
		if(!this._wifeId)
		{
			return;
		}
		let wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		let wifeSkill = wifecfg.wifeSkill; 

		// let public_biaoti = BaseBitmap.create("servant_biaotinew"); 
		// public_biaoti.width =610;
		// public_biaoti.height =33;
		// if(PlatformManager.checkIsViSp()){
		// 	public_biaoti.width =650;
		// }
		// public_biaoti.x = GameConfig.stageWidth/2 - public_biaoti.width/2;
		// public_biaoti.y = 70;
		// this.addChild(public_biaoti);
		let baseY = 87;
		
		let jiaren = BaseBitmap.create("servant_jiaren");  
		// this.setLayoutPosition(LayoutConst.leftverticalCenter,jiaren,public_biaoti,[100,jiaren.y])
		jiaren.x = GameConfig.stageWidth/2 - jiaren.width/2 - 100;
		jiaren.y = baseY - jiaren.height/2;
		this.addChild(jiaren);

		let wifeTip = ComponentManager.getTextField("",26); 
		let str2 = "";
		let yingqu:BaseBitmap = null;
		//已迎娶
		if (Api.wifeVoApi.getWifeInfoVoById(this._wifeId)){
			 yingqu = BaseBitmap.create("servant_yiyinqu");
			this.addChild(yingqu);
		}else{
			yingqu = BaseBitmap.create("servant_weiyinqu");
			this.addChild(yingqu);
		}

		wifeTip.text =  wifecfg.name; 

		this.addChild(wifeTip); 
		// this.setLayoutPosition(LayoutConst.verticalCenter,wifeTip,public_biaoti);
		wifeTip.y = baseY - wifeTip.height/2;
		if(PlatformManager.checkIsViSp()){
			wifeTip.x = jiaren.x+jiaren.width+5; 
		}else{
			wifeTip.x = jiaren.x+jiaren.width+20;
		}
		// this.setLayoutPosition(LayoutConst.rightverticalCenter,yingqu,public_biaoti);
		yingqu.x = wifeTip.x+wifeTip.width;
		yingqu.y = baseY - yingqu.height/2;
		let wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
		let list = Config.WifeCfg.getWifeCfgById(this._wifeId).wifeSkill;
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomH-145 - 25);
		ServantInfoWifeItemScrollItem.servantId = this._servantId;
	
		let newList:Array<any> =[]; 
		if((PlatformManager.checkIsWxCfg())&&Api.switchVoApi.checkopenNewWifeskillFixup())
		{
			newList = list;
		}
		else 
		{
			for(var i:number=0; i<list.length; i++)
			{
				if(list[i].condition)
				{
					newList.push(list[i]);
				}
			} 
		} 

		let scrollView = ComponentManager.getScrollList(ServantInfoWifeItemScrollItem,newList,rect);
		scrollView.y = 120;
		// scrollView.x = 16;
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