/*
author : yanyuling
desc : 周年庆特惠转盘活动
*/

class AcOneYearPackSkinView extends CommonView
{
   
	public constructor() 
	{
		super();
    }
    private get cfg() : Config.AcCfg.OneYearPackCfg{
        return this.vo.config;
    }

    private get vo() : AcOneYearPackVo{
        return <AcOneYearPackVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
    }
	protected initView():void
	{ 
        let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = GameConfig.stageHeigth - this.container.y -60;
		bottomBg.x = 0;
		bottomBg.y = -10;//GameConfig.stageHeigth - this.container.y;
		
		let innerbg =  BaseBitmap.create("public_9v_bg02");
		innerbg.width = GameConfig.stageWidth - 10;
		innerbg.height =  GameConfig.stageHeigth - this.container.y - 50;
		innerbg.y = bottomBg.y +5;
		innerbg.x = 5;
		this.addChildToContainer(innerbg);

        let bottom = BaseBitmap.create("chatview_bottom");
		bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
		bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;//-221;

        let wifeSkinShow = this.cfg.wifeSkinShow;
        let keys = Object.keys(wifeSkinShow);
        keys.sort((keya:string,keyb:string)=>{
            return Number(keya) -  Number(keyb);
        });
        let ids = [];
        for (var index = 0; index < keys.length; index++) {
            ids.push(wifeSkinShow[keys[index]].wifeSkinID);
        }
        let rectH1 = bottom.y + 55;// innerbg.height - 10;
		let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth,rectH1);
		let _scrollList  = ComponentManager.getScrollList(AcOneYearoackSkinScrollItem,ids,rect);
		_scrollList.y =  bottomBg.y;
		_scrollList.x = 10;
		this.addChildToContainer(_scrollList);

		this.addChildToContainer(bottomBg);
		this.addChildToContainer(bottom);
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"skin_boxbg","skin_boxbg2", "chatview_bottom",
         ]);
	} 

	public dispose():void
	{	 
       
        super.dispose();
	}
}