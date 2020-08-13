/**
 * 皇宫
 * author yanyuling
 * date 2018/03/27
 * @class PalaceHouseGroupView
 */

class PalaceHouseGroupView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
   
    public constructor() {
        super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        /**
         * 该建筑下的所有称号列表
         */
        let buildingId = this.param.data.buildingId;
        let idList = GameConfig.config.buildingCfg[buildingId].title;

        let resList = [];
        for (let key in idList) {
            let titleId = idList[key];
            let cfg = Config.TitleCfg.getTitleCfgById(titleId);
            if(cfg.isTitle == 1 && (cfg.titleType == 5 || cfg.titleType == 6) && Api.switchVoApi.isCrossOpen()){
                if(Api.palaceVoApi.getRoleInfoByTitleId(titleId) && Config.TitleCfg.isTitleOPend(titleId)){
                    resList.push(titleId);
                }
            }
            else{
                if(Api.palaceVoApi.getRoleInfoByTitleId(titleId) && Config.TitleCfg.isTitleOPend(titleId)){
                    resList.push(titleId);
                }
            }
        }
        resList.sort((a,b)=>{
            let cfga = Config.TitleCfg.getTitleCfgById(a);
            let cfgb = Config.TitleCfg.getTitleCfgById(b);
            if(cfga.titleType != cfgb.titleType){
                return cfgb.titleType - cfga.titleType;
            }
            else{
                return Number(cfga.id) - Number(cfgb.id);
            }
        });
        
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - this.container.y);
        let scrollList = ComponentManager.getScrollList(PalaceRoleInfoItem2,[],rect);
        // PalaceRoleInfoItem2.buildingId = buildingId;
        scrollList.y = -10;
        scrollList.refreshData(resList);
        this._nodeContainer.addChild(scrollList);
    }
 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
        ]);
	}

    protected getRuleInfo():string  
	{   
        let buildingId = this.param.data.buildingId;
		if(buildingId == "61" || buildingId == "63")
		{
			return "palaceHouseGroupRule-"+buildingId;
		}
		
		return "";
    }
    
    private userShotCallback(event:egret.Event)
    {
        if (event && event.data && event.data.ret){
            let data = event.data.data.data;
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(Number(data.ruid));
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);   
        }
    }

	// 标题背景名称
	protected getTitleStr():string
	{   
        if (Api.switchVoApi.checkOpenCrossRank() && (this.param.data.buildingId=="61"|| this.param.data.buildingId=="63"))
        {
            return "palace_buildingName2_"+this.param.data.buildingId;
        }
		return "palace_buildingName"+this.param.data.buildingId;
	}
	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._nodeContainer = null;
		super.dispose();
	}
}