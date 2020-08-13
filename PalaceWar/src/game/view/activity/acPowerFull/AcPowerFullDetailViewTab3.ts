/**
 * 奖池奖励
 * date 2020.7.14
 * @class AcKiteDetailPopupViewTab3
 */
class AcPowerFullDetailViewTab3 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public initView():void{
        let view = this;
		// view.height = 695;
		// view.width = 530;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 695;
        bg.x = 26;
        bg.y = 53;
		view.addChild(bg);
		
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`acpowerfull_poolbg`, this.getTypeCode()));
		view.addChild(topbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,1]);

        let rewardArr =  GameData.formatRewardItem(view.cfg.getPoolRewards());
        let scroStartY = topbg.y + topbg.height + 10;
        let len = 4;
        let spaceX = 15;
        let spaceY = 15;
		let scale = 1;
        let tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * spaceX) / 2;
        for (let index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            App.LogUtil.log(iconItem.width);
            iconItem.setScale(scale);
            iconItem.x = tmpX + (108 + spaceX) * (index % len);
            iconItem.y = scroStartY + (Math.floor(index / len)) * (108 + spaceY);
            this.addChild(iconItem);
        }
    }

    public dispose():void{
        super.dispose();
    }
}