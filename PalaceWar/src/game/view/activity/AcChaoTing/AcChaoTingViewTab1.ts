/**
 * 排行奖励
 * author ycg
 * date 2020.3.24
 */
class AcChaoTingViewTab1 extends AcCommonViewTab{

    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        let baseView = <AcChaoTingView>ViewController.getInstance().getView("AcChaoTingView");
        let showHeight = baseView.getListShowHeight();
        
        let data = this.cfg.getRankRewardCfg();
        let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, showHeight - 10);
        let scrollList = ComponentManager.getScrollList(AcChaoTingViewTabScrollItem1, data, rect, {aid: this.aid, code: this.code});
        scrollList.setPosition(GameConfig.stageWidth/2 - scrollList.width/2, 5);
        this.addChild(scrollList);  
    }

    private getTypeCode():string{
        return this.code;
    }

    private get vo():AcChaoTingVo{
        return <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.ChaoTingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{

        super.dispose();
    }
}