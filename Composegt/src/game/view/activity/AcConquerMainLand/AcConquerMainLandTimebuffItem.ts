/**
 * author:qianjun
 * desc:日期轮数item
*/
class AcConquerMainLandTimebuffItem extends ScrollListItem {

    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.ConquerMainLandCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcConquerMainLandVo {
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    private get aid(): string {
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code(): string {
        return this._code;
    }

    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private _code: string = '';

    protected initItem(index: number, data: any, itemparam: any) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        let view = this;
        view._code = itemparam;
        view.width = GameConfig.stageWidth;
        let count = 0;
        for (let i in data) {
            let unit = data[i];
            if (unit.buff == 0) {
                continue;
            }
            ++count;
        }

        view.height = 89 + 24 * (count + 1) + 15 + 6;

        let code = view.getUiCode();

        let titlebg = BaseBitmap.create(`mainland_detailtab1_itemtitle`);
        titlebg.width = 250;
        view.addChild(titlebg);
        titlebg.setPosition(this.x + this.width / 2 - titlebg.width / 2, 0);

        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainDetailTab1ItemTitle${index + 1}-${code}`), 22, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titleTxt);
        titleTxt.setPosition(titlebg.x + titlebg.width / 2 - titleTxt.width / 2, titlebg.y + titlebg.height / 2 - titleTxt.height / 2);

        let roundbg = BaseBitmap.create(`mainland_detailtab1_itemround`);
        roundbg.width = 620;
        roundbg.height = view.height - 60;
        roundbg.setPosition(this.x + this.width / 2 - roundbg.width / 2, titlebg.y + titlebg.height + 5);
        view.addChild(roundbg);




        let titleroundbg = BaseBitmap.create(`mainland_detailtab1_itemtop`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleroundbg, roundbg, [0, 0]);
        view.addChild(titleroundbg);

        let titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleRotation`), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele1Txt, titleroundbg, [50, 0]);

        let titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`palace_history_title3`), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titele2Txt, titleroundbg, [0, 0]);

        let titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandratio-${code}`), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, titele3Txt, titleroundbg, [30, 0]);

        let ranklist = data;
        let arr = [];
        for (let i in ranklist) {
            let unit = ranklist[i];
            if (unit.buff == 0) {
                continue;
            }
            unit.pos = [{ width: titele1Txt.textWidth, x: titele1Txt.x }, { width: titele2Txt.textWidth, x: titele2Txt.x }, { width: titele3Txt.textWidth, x: titele3Txt.x }];
            unit.day = index + 1;
            arr.push(unit);
        }
        let scroRect = new egret.Rectangle(0, 0, titleroundbg.width, arr.length * 24 + 25);
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandRoundItem, arr, scroRect, view.code);
        view.addChild(scrollList);
        scrollList.setContentPosY(10);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleroundbg, [0, titleroundbg.height - 3]);

        //绳子
        let shengzi1 = BaseBitmap.create(`mainland_detail_shengzi`);
        shengzi1.setPosition(roundbg.x - 10, roundbg.y + roundbg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi1);

        let shengzi2 = BaseBitmap.create(`mainland_detail_shengzi`);
        shengzi2.scaleX = -1;
        shengzi2.setPosition(roundbg.x + roundbg.width + 10, roundbg.y + roundbg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi2);
    }

    public dispose(): void {
        let view = this;
        super.dispose();
    }
}