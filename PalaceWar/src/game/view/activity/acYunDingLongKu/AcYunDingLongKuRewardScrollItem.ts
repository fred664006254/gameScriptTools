/**
  * 比武招亲奖励Item
  * author 张朝阳
  * date 2018/12/18
  * @class AcMarryRewardScrollItem
  */
class AcYunDingLongKuRewardScrollItem extends ScrollListItem {

    public constructor() {
        super();
    }
	/**
	 * 初始化itemview
	 */
    public initItem(index: number, data: Config.AcCfg.BattleUseItemCfg, itemParam: any): void {
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 520;
        this.addChild(bg);

        let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 5);
        this.addChild(titleBg);

        let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuRewardInfoViewItemTitleType" + data.id + "-" + itemParam.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);

        let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

        let descTF = ComponentManager.getTextField(LanguageManager.getlocal( "acYunDingLongKuRewardInfoViewItemDescType" + data.id + "-" + itemParam.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        descTF.setPosition(titleBg.x + titleBg.width / 2 - descTF.width / 2, titleBg.y + titleBg.height + 8);
        this.addChild(descTF);

        let rewardVoList = GameData.formatRewardItem(data.drawPoolReward);
        let itemHeight: number;
        for (let i = 0; i < rewardVoList.length; i++) {
            let rewardItem: BaseDisplayObjectContainer = GameData.getItemIcon(rewardVoList[i], true);
            rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setScale(0.85);
            rewardItem.setPosition(bg.x + 10 + rewardItem.width / 2 + i % 5 * (rewardItem.width - 10), descTF.y + descTF.height + rewardItem.height / 2 + (Math.floor((i) / 5)) * rewardItem.height - 5);
            this.addChild(rewardItem);
            itemHeight = rewardItem.height;
        }
        bg.height += (Math.floor(rewardVoList.length / 6) + 1) * itemHeight - 20;


    }



    public getSpaceY(): number {
        return 5;
    }

    public dispose(): void {
        super.dispose();
    }
}