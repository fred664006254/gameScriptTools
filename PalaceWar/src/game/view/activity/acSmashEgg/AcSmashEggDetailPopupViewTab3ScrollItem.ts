/**
 * 金蛋赠礼活动详情tab3Item
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab3ScrollItem
 */
class AcSmashEggDetailPopupViewTab3ScrollItem extends ScrollListItem {

    private code: any = null;
    private aid: any = null;

    private _data: any = null;

    private _isRequest: boolean = false;
    public constructor() {
        super();
    }

    public initItem(index: number, data: any, itemParam: any): void {
        const aid = itemParam.aid;
        const code = itemParam.code;
        const cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);


        this.width = 520;

        let tmp: RewardItemVo = GameData.formatRewardItem(data[0])[0];
        let rewardStr = `<font color=${tmp.nameColor}>${tmp.name}*${tmp.num}</font>`;
        let logStr = LanguageManager.getlocal(`acSmashEggLogTip-${code}`, [data[1], LanguageManager.getlocal(`acSmashEggEggType${(data[2] + 1)}-${code}`), rewardStr])
        let logTF = ComponentManager.getTextField(logStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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


    public dispose(): void {
        this.aid = null;
        this.code = null;
        this._data = null;
        this._isRequest = false;
        super.dispose();
    }

}