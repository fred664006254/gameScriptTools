/**
 * 选择出海的门客
 * @author 张朝阳
 * date 2019/2/19
 * @class ServantExileSelectServantPopupView
 */
class ServantExileSelectServantPopupView extends PopupView {
    public constructor() {
        super();
    }
    protected initView(): void {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        let topTip = ComponentManager.getTextField(LanguageManager.getlocal("servantExileSelectServantPopupViewTopTip", [String(Config.ExileCfg.unitGem)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        topTip.width = 520;
        topTip.lineSpacing = 3;
        topTip.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTip.width / 2, 15);
        this.addChildToContainer(topTip);

        let bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = this.getShowHeight() - topTip.height - 140;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTip.y + topTip.height + 15);
        this.addChildToContainer(bg);

        let rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 10)
        let scrollList = ComponentManager.getScrollList(ServantExileSelectServantScrollItem, this.sortServant(), rect, { posId: this.param.data.posId ,days:this.param.data.days});
        scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChildToContainer(scrollList);
        scrollList.bounces = false;
    }

    private sortServant() {
        let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(5);
        // let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string }[] = [];
        // for (let key in servantInfoVoList) {
        //     let item = servantInfoVoList[key];
        //     let fightValue = item.total;
        //     let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath };
        //     servantInfoList.push(servantInfo);
        // }
        // servantInfoList.sort((a, b) => {
        //     return a.fightValue - b.fightValue;
        // })
        // return servantInfoList;
        // servantInfoVoList.sort((a, b) => {
        //     return a.total - b.total;
        // })
        return servantInfoVoList
    }
    private servantExileHandle(event: egret.Event) {
        if (event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip2"));
            this.hide();
        }
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "servantexileview_servantexile",
        ]);
    }

    protected getTitleBgName(): string {
        return null;
    }

    protected getShowHeight(): number {
        return 910;
    }

    protected getShowWidth(): number {
        return 570;
    }

    protected getTitleStr(): string {
        return 'servantExileSelectServantPopupViewTitle';
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.servantExileHandle, this);
        super.dispose();
    }
}