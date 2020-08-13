/**
 * 金蛋赠礼活动详情Tab2
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab2
 */
class AcSmashEggDetailPopupViewTab2 extends AcCommonViewTab {
    public constructor() {
        super();
        this.initView();
    }

    public initView(): void {
        this.height = 670;
        this.width = 520;
        let Bg = BaseBitmap.create("public_9_bg4");
		Bg.width = 530;
		Bg.height = 660;
		Bg.x = 25;
		Bg.y = 55;
        this.addChild(Bg);
        
        let dataList = this.vo.getSortEggRewardCfgList();
        let rect = new egret.Rectangle(0, 0, 520, 640);
        let scrollList = ComponentManager.getScrollList(AcSmashEggDetailPopupViewTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(30, 70);
        this.addChild(scrollList);
    }

    private get cfg(): Config.AcCfg.SmashEggCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcSmashEggVo {
        return <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose() {
        super.dispose();
    }
}