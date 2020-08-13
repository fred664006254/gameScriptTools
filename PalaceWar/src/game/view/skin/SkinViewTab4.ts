/**
 * 碎片兑换
 * author qianjun
 * date 2018/08/13
 * @class SkinView
 */
class SkinViewTab4  extends CommonViewTab
{
	private _myNodeContainer:BaseDisplayObjectContainer;
	private _myScrollList:ScrollList;
	private _tabbarGroup : TabBarGroup;
	private _curMyTabIdx=-1;
	public constructor() {
		super();
		this.initView();
	}

	public initView():void
	{	

		if (Api.rookieVoApi.curGuideKey == "skin")
		{
			 this._curMyTabIdx = 1;
		}
		// ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
		let view = this;
		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SKIN_MAKE),view.makeCallback,view);
		let skinView : any  = ViewController.getInstance().getView(`SkinView`);
		view.width = GameConfig.stageWidth;
		view.height = skinView.getTabViewHeight();
		//我的皮肤列表部分
		view._myNodeContainer = new BaseDisplayObjectContainer();
		view.addChild(this._myNodeContainer);

		let tabList = [];
		if(Api.switchVoApi.checkOpenServantSkin())
		{
			tabList.push("skinViewMyTab1");
		}
		if(!Api.switchVoApi.checkCloseWifeskin())
		{
			tabList.push("skinViewMyTab2");
		}

        let tabbarGroup = ComponentManager.getTabBarGroup("skin_mytab1",tabList,this.tabBtnClickHandler2,this);
        tabbarGroup.x = GameConfig.stageWidth/2 - tabbarGroup.width/2;
        tabbarGroup.y = 10;
		this._myNodeContainer.addChild(tabbarGroup);
		this._tabbarGroup = tabbarGroup;

		if (this._curMyTabIdx != -1)
		{	
			this._tabbarGroup.selectedIndex = this._curMyTabIdx;
		}

		let bottombg = BaseBitmap.create(`arena_bottom`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
		this.addChild(bottombg);

		let tipText = ComponentManager.getTextField(LanguageManager.getlocal(`skin_tip3`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipText, bottombg);
		this.addChild(tipText);

		let rectH2 = view.height - tabbarGroup.y - tabbarGroup.height - bottombg.height - 10;
		let rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth,rectH2);
		this._myScrollList  = ComponentManager.getScrollList(SkinExchangeScrollItem,[],rect2);
		this._myScrollList.y = tabbarGroup.y + tabbarGroup.height + 1;
		this._myScrollList.setEmptyTip(LanguageManager.getlocal("skin_notOwnTip4"));
		this._myNodeContainer.addChild(this._myScrollList);
		this.refreshRankList();

		TickManager.addTick(this.tick, this);
		this.tick();

		
    }

	protected refreshRankList()
    {
		if(this._curMyTabIdx == -1)
		{
			this.tabBtnClickHandler2({index:0});
		}else{
			this.tabBtnClickHandler2({index:this._curMyTabIdx});
		}
	}
	
	protected tabBtnClickHandler2(params:any)
    {
        this._curMyTabIdx = params.index;
		let list = [];
		let uiTypeV = 1;

        if(this._curMyTabIdx == 0)
		{
			if(Api.switchVoApi.checkOpenServantSkin()){
				list = Config.ServantskinCfg.getServantSkinList();
				uiTypeV = 1;
			}else{
				list = Config.WifeskinCfg.getWifeCfgList();
				uiTypeV = 2;
			}
		}else{
			list = Config.WifeskinCfg.getWifeCfgList();
			uiTypeV = 2;
		}

		list.sort((dataA:any,dataB:any)=>{
			dataA["uiType"] = uiTypeV;
			dataB["uiType"] = uiTypeV;
			return Number(dataA.id) - Number(dataB.id)
		});
		let ownList = [];
		let notOwnList = [];
		let serverOpenTime = Api.skinVoApi.getShowTime();
		// serverOpenTime = 501;
		let noObjList = [];

		
		for (var index = 0; index < list.length; index++) {
			let tmp = list[index];
			let id = tmp.id;
			if(uiTypeV == 1 ){
				if(typeof tmp.displayTime != `undefined` && serverOpenTime >= tmp.displayTime){
					if(!Api.servantVoApi.getServantObj(tmp.servantId)){
						noObjList.push(tmp);
					}
					else if(Api.servantVoApi.isOwnSkinOfSkinId(id)){
						ownList.push(tmp);
					}else{
						notOwnList.push(tmp);
					}
				}
				
			}else if(uiTypeV == 2){
				if(typeof tmp.displayTime != `undefined` && serverOpenTime >= tmp.displayTime){
					if(!Api.wifeVoApi.getWifeInfoVoById(tmp.wifeId)){
						noObjList.push(tmp);
					}
					else if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(id)){
						ownList.push(tmp);
					}else{
						notOwnList.push(tmp);
					}
				}
			}
			
		}
		notOwnList = notOwnList.concat(noObjList).concat(ownList);
		this._myScrollList.refreshData(notOwnList);

		if (uiTypeV == 2 && Api.rookieVoApi.curGuideKey == "skin")
		{	
			let guideIdx:number = 0;
			for (let i=0; i<notOwnList.length; i++)
			{
				let tmp = notOwnList[i];
				let id = tmp.id;
				if (id == "2211")
				{
					guideIdx = i;
					this._myScrollList.setScrollTopByIndex(guideIdx);
					break;
				}
			}
			
		}
		
	}

	private makeCallback(evt : egret.Event):void{
		let view = this;
		if(evt.data.ret){
			if(evt.data.data.data){
				let data = evt.data.data.data;
				let itemvo = GameData.formatRewardItem(data.rewards)[0];
				let cfg = null;
				if(data.skinType == 1){
					cfg = Config.WifeskinCfg.getWifeCfgById(itemvo.id);
					ViewController.getInstance().openView(ViewConst.POPUP.SKINGETVIEW, {
						rewards : cfg,
					});
				}
				else{
					// cfg = Config.ServantskinCfg.getServantSkinItemById(itemvo.id);
					App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(data.rewards));
				}
				
				this.refreshRankList();
			}
		}
	}

	public tick():void{
		let view = this;
		if(Api.skinVoApi.checkServantExchange()){
			view._tabbarGroup.addRedPoint(0);
		}
		else{
			view._tabbarGroup.removeRedPoint(0);
		}

		let index = Api.switchVoApi.checkOpenServantSkin() ? 1 : 0;
		if(Api.skinVoApi.checkWifeExchange()){
			view._tabbarGroup.addRedPoint(index);
		}
		else{
			view._tabbarGroup.removeRedPoint(index);
		}
	}

	public dispose()
    {
		TickManager.removeTick(this.tick, this);
		this._myNodeContainer = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SKIN_MAKE),this.makeCallback,this);
		this._myScrollList = null;
		this._curMyTabIdx=-1;
		this._tabbarGroup = null;
        super.dispose();
    }
}