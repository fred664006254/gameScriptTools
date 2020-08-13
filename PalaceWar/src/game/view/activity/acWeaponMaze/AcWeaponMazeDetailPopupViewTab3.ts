/**
 * 奖池奖励
 * date 2020.4.24
 * @class AcWeaponMazeDetailPopupViewTab3
 */
class AcWeaponMazeDetailPopupViewTab3 extends CommonViewTab{
    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 695;
        bg.x = 26;
        bg.y = 53;
		view.addChild(bg);
		
		let topbg = BaseBitmap.create(App.CommonUtil.getResByCode(`acweaponmaze_poolbg`, this.getTypeCode()));
		view.addChild(topbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,3]);

        let dataList = this.cfg.getPoolRewards();
        let rect = new egret.Rectangle(0, 0, 530, 680 - topbg.height + 5);
        let scrollList = ComponentManager.getScrollList(AcWeaponMazeDetailPopupScrollItem3, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(bg.x, topbg.y + topbg.height);
        this.addChild(scrollList);  
    }

    public dispose():void{
        super.dispose();
    }
}