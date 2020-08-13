/**
 * 	投壶活动奖励展示item
 * author 张朝阳
 * date 2019/4/4
 * @class AcThrowArrowRewardScrollItem
 */
class AcThrowArrowRewardScrollItem extends ScrollListItem {

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

        this.width = 520;
        this.height = 260;
        let itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = 520;
        itembg.height = 260;
        this.addChild(itembg);

        let titleBg = BaseLoadBitmap.create("acwealthcarpview_common_txtbg");
        titleBg.width = 358;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + 165, itembg.y + 15);
        this.addChild(titleBg);

        let uiCode = itemParam.code;
        if (itemParam.code == "2") {
            uiCode = "1"
        }
        else if (itemParam.code == "4") {
            uiCode = "3"
        }

        if (uiCode == "3")
        {
             let namekey = "acThrowArrow_awardname_" + (itemParam.length-data.id+1) + "-" + uiCode;
             let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(namekey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,titleTF,titleBg);
            this.addChild(titleTF);

             let itemTopLine: BaseBitmap = BaseBitmap.create("acwealthcarpview_common_line");
            itemTopLine.width += titleTF.width;
            itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
            this.addChild(itemTopLine);
        }
        else
        {
            let title: BaseLoadBitmap = BaseLoadBitmap.create("acthrowarrowview_itemtitle_" + data.id + "-" + uiCode, null, {
                callback: () => {

                    let scale = 0.55;
                    title.anchorOffsetX = title.width / 2;
                    title.anchorOffsetY = title.height / 2;
                    title.setScale(scale);
                    title.setPosition(titleBg.x + titleBg.width / 2, titleBg.y + titleBg.height / 2);

                    let itemTopLine: BaseBitmap = BaseBitmap.create("acwealthcarpview_common_line");
                    itemTopLine.width += title.width * scale;
                    itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
                    this.addChild(itemTopLine);
                }, callbackThisObj: this, callbackParams: null
            })
            this.addChild(title);
        }

       

        let bgname:string;
        if (uiCode == "3")
        {
            bgname = "acthrowarrowview_itembg_rewardbg";
        }
        else
        {
            bgname = "acthrowarrowview_itembg_rewardbg_" + data.id + "-" + uiCode;
        }

        let leftbg = BaseLoadBitmap.create(bgname);
        leftbg.width = 178;
        leftbg.height = 232;
        leftbg.setPosition(itembg.x + 10, itembg.y + itembg.height / 2 - leftbg.height / 2);
        this.addChild(leftbg);

        if (uiCode == "3")
        {
            let heartname = "acthrowarrow_redheart" + (itemParam.length-data.id+1)+ "-" + uiCode;
            let heart = BaseBitmap.create(heartname);
            heart.setScale(0.685);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,heart,leftbg);
            this.addChild(heart);
        }


        let rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 300;
        rewardbg.height = 190;
        rewardbg.setPosition(leftbg.x + leftbg.width + 13, titleBg.y + titleBg.height + 5);
        this.addChild(rewardbg);

        let rewards: string = "";
        for (let key in data.prizePool) {
            rewards += data.prizePool[key][0] + "|";
        }
        let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards.substring(0, rewards.length - 1));
        let rewardScale = 0.8;

        for (let i = 0; i < rewardVoList.length; i++) {
            let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardbg.x + (i % 3) * (rewardDB.width * rewardScale + 10) + 12, rewardbg.y + Math.floor(i / 3) * (rewardDB.height * rewardScale + 5) + 5);
            this.addChild(rewardDB);
        }


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