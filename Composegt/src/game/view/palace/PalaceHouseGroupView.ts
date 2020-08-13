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

        //背景图片
        let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width=GameConfig.stageWidth;
		borderBg.height=GameConfig.stageHeigth - 69;
		borderBg.y = 69;
		this.addChild(borderBg);

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
            if(Api.palaceVoApi.getRoleInfoByTitleId(titleId))
            {
                resList.push(titleId);
            }
        }
        
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth-28,GameConfig.stageHeigth - this.container.y);
        let scrollList = ComponentManager.getScrollList(PalaceRoleInfoItem2,resList,rect);
        // PalaceRoleInfoItem2.buildingId = buildingId;
        scrollList.x = GameConfig.stageWidth / 2 - scrollList.width/2;
        scrollList.y = -15;
        this._nodeContainer.addChild(scrollList);
    }
 

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "palace_perbg",
        ]);
	}

	// 标题背景名称
	protected getTitleStr():string
	{
		return "palace_buildingName"+this.param.data.buildingId;
	}
	public dispose():void
	{
        this._nodeContainer = null;
		super.dispose();
	}
}