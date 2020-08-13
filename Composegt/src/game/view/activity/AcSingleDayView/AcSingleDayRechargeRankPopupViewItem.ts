/**
 * 双11排行榜 Item
 * @author 张朝阳
 * date 2018/10/25
 * @class AcSingleDayRechargeRankPopupViewItem
 */
class AcSingleDayRechargeRankPopupViewItem extends ScrollListItem {
    public constructor() {
        super();
    }

    protected initItem(index: number, data: any) {
        this.height = 50;
        this.width = 502;
        if (index % 2 == 1) {
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }
        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField(String(index+1),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN)
            titleTxt1.setPosition(this.x + 60 - titleTxt1.width / 2,this.y + this.height / 2 - titleTxt1.height / 2)
            this.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID())
            {
                titleTxt1.setColor(TextFieldConst.COLOR_WARN_GREEN);
                titleTxt1.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.setPosition(this.x + 60 - rankImg.width / 2,this.y + this.height / 2 - rankImg.height / 2)
            this.addChild(rankImg);
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        nameTxt.setPosition(this.x + 235 - nameTxt.width / 2,this.y + this.height / 2 - nameTxt.height / 2);
        this.addChild(nameTxt);

        let rechargeTxt = ComponentManager.getTextField(data.value,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        rechargeTxt.setPosition(this.x + 410 - rechargeTxt.width / 2,this.y + this.height / 2 - rechargeTxt.height / 2);
        this.addChild(rechargeTxt);
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            nameTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
            rechargeTxt.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }
    }
    public getSpaceY(): number {
        return 5;
    }
    public dispose(): void {
        super.dispose();
    }

}