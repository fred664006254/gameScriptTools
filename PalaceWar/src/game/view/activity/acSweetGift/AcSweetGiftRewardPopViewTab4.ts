/**
 * 活动奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopViewTab4
 */
class AcSweetGiftRewardPopViewTab4 extends AcCommonViewTab{
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        this.height = 670;
		this.width = 520;
        let dataList = this.vo.getSortMoonCakeCfg();
        let rect =  new egret.Rectangle(0, 0, 520, 670);
        let scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab4ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(30+1, 60);
        this.addChild(scrollList);
    }

	private get cfg():Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        super.dispose();
     }
}