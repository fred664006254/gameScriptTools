/**
 * 金蛋赠礼活动详情tab3
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab3
 */
class AcSmashEggDetailPopupViewTab3 extends AcCommonViewTab {
    private _scrollList: ScrollList = null;


    public constructor() {
        super();
        this.initView();
    }

    private get cfg(): Config.AcCfg.SmashEggCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcSmashEggVo {
        return <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }
    protected initView(): void {
        let view = this;
        view.height = 670;
        view.width = 520;

        let Bg = BaseBitmap.create("smashegg_logbg");
		Bg.width = 530;
		Bg.height = 660;
		Bg.x = 25;
		Bg.y = 55;
		this.addChild(Bg);

        let tmpRect = new egret.Rectangle(0, 0, 540, Bg.height - 20);

        let scrollList = ComponentManager.getScrollList(AcSmashEggDetailPopupViewTab3ScrollItem, [], tmpRect, this.code);
        scrollList.setPosition(30, 70);
        view.addChild(scrollList);
        view._scrollList = scrollList;
        view.freshRecord();
    }

    private freshRecord(): void {
        let view = this;
        let list: any[] = view.vo.egglog;
        if (Object.keys(view.vo.egglog).length) {
            list.sort((a, b) => { return b[1] - a[1] });
            view._scrollList.refreshData(view.vo.egglog, { aid: view.aid, code: view.code });
        }else{
            view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }


    }



    public dispose(): void {
        let view = this;
        view._scrollList = null;


        super.dispose();
    }
}