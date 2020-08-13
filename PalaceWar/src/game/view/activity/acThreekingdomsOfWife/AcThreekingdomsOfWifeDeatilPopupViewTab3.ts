/**
 * 奖池
 * author ycg
 * date 2020.2.11
 * @class AcThreekingdomsOfWifeDetailPopupViewTab3
 */
class AcThreekingdomsOfWifeDetailPopupViewTab3 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);

        let topBgStr = ResourceManager.hasRes("acthreekingofwife_poolbg-"+this.getTypeCode()) ? "acthreekingofwife_poolbg-"+this.getTypeCode() : "acthreekingofwife_poolbg-1";
        let topBg = BaseBitmap.create(topBgStr);
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, bg.y);
        this.addChild(topBg);

        // let listbg = BaseBitmap.create("public_9_bg14");
        // listbg.width = 530;
        // listbg.height = 670;
        // listbg.setPosition(25, 65);
        // this.addChild(listbg);

        App.LogUtil.log("rewardarr: "+this.cfg.getPoolRewards());
        let rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, false);
		let rewardScale = 1;
        let scrolNode:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		// scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
		scrolNode.width = bg.width - 20;
		let rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - topBg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect);
		scrollview.bounces = false;
		scrollview.x = bg.x + 10;
		scrollview.y = topBg.y + topBg.height + 5;
		scrollview.horizontalScrollPolicy = 'off';
        this.addChild(scrollview);
        for(let i in rewardArr){
            let icon = rewardArr[i];
            icon.setScale(rewardScale);
			let idx = Number(i);
			icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
			icon.y = 5 + Math.floor(idx / 4) * (icon.width * icon.scaleX + 12);
			scrolNode.addChild(icon);
		}
    }

    private get cfg():Config.AcCfg.ThreekingdomsOfWifeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }
	
    private get vo():AcThreekingdomsOfWifeVo{
        return <AcThreekingdomsOfWifeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose(){
        super.dispose();
    }
}