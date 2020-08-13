/**
 * 奖励
 * author sl
 * date 2020.7.29
 * @class AcMouseTreasureAwardView
 */
class AcMouseTreasureAwardView extends PopupView
{
    public constructor(){
        super();
    }

    protected getTitleStr():string{
        return "findsame_reward_title3-1";
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            App.CommonUtil.getResByCode("mousetreasure_awardbg-1",this.param.data.uicode)
        ).concat(list);
    }

    public initView():void{
         let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 660;
        bg.setPosition(this.viewBg.width/2-bg.width/2, 10);
        this.addChildToContainer(bg);

        let topBg = BaseBitmap.create(App.CommonUtil.getResByCode("mousetreasure_awardbg-1",this.param.data.uicode));
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, bg.y+4);
        this.addChildToContainer(topBg);

        let rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
		let rewardScale = 1;
        let scrolNode:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		scrolNode.width = bg.width - 20;
		let rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - topBg.height);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect);
		scrollview.bounces = false;
		scrollview.x = bg.x + 7;
		scrollview.y = topBg.y + topBg.height + 5;
		scrollview.horizontalScrollPolicy = 'off';
        scrollview.verticalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        for(let i in rewardArr){
            let icon = rewardArr[i];
            icon.setScale(rewardScale);
			let idx = Number(i);
			icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
			icon.y = 5 + Math.floor(idx / 4) * (icon.width * icon.scaleX + 12);
			scrolNode.addChild(icon);
		}
    }

    protected getBgExtraHeight():number
	{
		return 5;
	}

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcMouseTreasureVo{
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
}
