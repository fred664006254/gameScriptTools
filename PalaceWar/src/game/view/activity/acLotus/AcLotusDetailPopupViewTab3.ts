/**
 * 奖池奖励
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab3
 */
class AcLotusDetailPopupViewTab3 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        let view = this;
		// view.height = 695;
		// view.width = 530;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 695;
        bg.x = 46;
        bg.y = 53;
		view.addChild(bg);
		
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`aclotus_poolbg`, this.getTypeCode()));
		view.addChild(topbg);
		topbg.width = 532;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,3]);

        let rewardArr =  GameData.formatRewardItem(view.cfg.getPoolRewards());
        let scroStartY = topbg.y + topbg.height + 10;
		let len = Math.min(5, rewardArr.length);
		let scale = 0.85;
        let tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * 7) / 2;
        for (let index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(scale);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if ((tmpX - bg.x)> bg.width)
            {
                tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            this.addChild(iconItem);
        }
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get cfg() : Config.AcCfg.LotusCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    public dispose():void{
        super.dispose();
    }
}