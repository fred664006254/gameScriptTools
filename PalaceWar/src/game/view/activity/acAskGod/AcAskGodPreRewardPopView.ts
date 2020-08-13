/**
 * 奖池
 * author wxz
 * date 2020.6.15
 * @class AcAskGodPreRewardPopView
 */
class AcAskGodPreRewardPopView extends PopupView{
    public constructor(data?:any){
        super();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 690;
        bg.setPosition(55, 10);
        this.addChildToContainer(bg);

        let topBg = BaseBitmap.create("acaskgod_pre-"+this.getTypeCode());
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, 14);
        this.addChildToContainer(topBg);

        App.LogUtil.log("rewardarr: "+this.cfg.getPoolRewards());
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

    private get cfg():Config.AcCfg.SkySoundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }
	
    private get vo():AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	protected getShowHeight():number
	{
		return 800;
    }
    protected resetBgSize():void
    {
        super.resetBgSize();
        this.container.x = 0;
    }    
	protected getTitleStr():string
	{
        return "acAskGodPreAwardTitle-"+this.getTypeCode();
	}  
    public dispose(){
        super.dispose();
    }
}