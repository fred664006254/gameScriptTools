/**
 * 排行榜
 * author yanyuling
 * date 2017/10/25
 * @class RankView
 */

class RankView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor() {
        super();
	}

	public initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();

        // let border = BaseBitmap.create("public_9v_bg03");
		// border.width = GameConfig.stageWidth;
		// border.height = GameConfig.stageHeigth - 100+ 30;
		// border.x = 0;
		// border.y = -20;
		// this.addChildToContainer(border);

        //最底部背景
        // let bottomBg2 = BaseBitmap.create("adult_lowbg");
        // bottomBg2.x = GameConfig.stageWidth /2 - bottomBg2.width/2;
        // bottomBg2.y = GameConfig.stageHeigth - bottomBg2.height -this.container.y - 21;
		// this._nodeContainer.addChild(bottomBg2);

        let rank_bigbox1 =  ComponentManager.getButton("rank_bigbox1","",this.btnHandler,this,[1]);
        rank_bigbox1.x = this.viewBg.width/2 - rank_bigbox1.width/2;
        rank_bigbox1.y = GameConfig.stageHeigth/2  -this.container.y/2 - rank_bigbox1.height;
		this._nodeContainer.addChild(rank_bigbox1);

        let rank_bigbox2 =  ComponentManager.getButton("rank_bigbox2","",this.btnHandler,this,[2]);
        rank_bigbox2.x = this.viewBg.width/2  - rank_bigbox2.width/2;
        rank_bigbox2.y = GameConfig.stageHeigth/2  -this.container.y/2 ;
		this._nodeContainer.addChild(rank_bigbox2);

        if(!Api.switchVoApi.checkOpenCrossRank())
        {
            App.DisplayUtil.changeToGray(rank_bigbox2);
        }

    }

    protected btnHandler(params:any)
    {
        let tarView = ViewConst.COMMON.RANKSINGLEVIEW;
        if(params == 2){
            tarView = ViewConst.COMMON.RANKCROSSVIEW;
            if(!Api.switchVoApi.checkOpenCrossRank())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("rankview_crossOpenTip1"));
                return;
            }
        }
        ViewController.getInstance().openView(tarView);
    }
     // 背景图名称
	protected getBgName():string
	{
		return "firstchargebg01";
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_1","rank_2","rank_3","rank_display_namebg","rank_line",
            "rank_select_mask","servant_bottombg","wifeview_bottombg","public_mobai",
            "rank_biao","adult_lowbg",
            "rank_bigbox1","rank_bigbox2","firstchargebg01",
        ]);
	}

	public dispose():void
	{
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._nodeContainer = null;
        super.dispose();
    }
}