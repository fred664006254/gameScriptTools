/**
 * 	投壶活动日志item
 * author 张朝阳
 * date 2019/4/4
 * @class AcThrowArrowLogScrollItem
 */
class AcThrowArrowLogScrollItem extends ScrollListItem {

    private code: any = null;
    private aid: any = null;

    private rkey: string = null;

    private rankList: any = null;

    private _data: any = null;

    private _isRequest: boolean = false;
    public constructor() {
        super();
    }

    public initItem(index: number, data: any, itemParam: any): void {

        let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(itemParam.aid, itemParam.code);

        this.width = 520;

        let tmp: RewardItemVo = GameData.formatRewardItem(data[1])[0];
        let rewardStr = `<font color=${tmp.nameColor}>${tmp.name}*${tmp.num}</font>`;
        let logTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowGetAllItemInfo-" + itemParam.code, [data[0], LanguageManager.getlocal("acThrowArrowResultPopupViewArrowType_" + cfg.getLotteryType(data[2]) + "-" + itemParam.code), rewardStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        logTF.width = 460;
        logTF.lineSpacing = 5;
        logTF.setPosition(this.x + this.width / 2 - logTF.width / 2, this.y + 10);
        this.addChild(logTF);

        let txtLine = BaseBitmap.create("acthrowarrowview_common_txtline");
        txtLine.width = 500;
        txtLine.setPosition(this.x + this.width / 2 - txtLine.width / 2, logTF.y + logTF.height + 7);
        this.addChild(txtLine);

        this.height = logTF.height + txtLine.height + 17;
    }

    private getThrowName() {

    }

    public dispose(): void {
        this.aid = null;
        this.code = null;
        this.rkey = null;
        this.rankList = null;
        this._data = null;
        this._isRequest = false;
        super.dispose();
    }

}