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
        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField(String(index+1),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE)
            titleTxt1.setPosition(this.x + 60 - titleTxt1.width / 2,this.y + this.height / 2 - titleTxt1.height / 2)
            this.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID())
            {
                titleTxt1.setColor(0xfedb38);
            }
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.setPosition(this.x + 60 - rankImg.width / 2,this.y + this.height / 2 - rankImg.height / 2)
            this.addChild(rankImg);
        }

        let nameTxt = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        nameTxt.setPosition(this.x + 247 - nameTxt.width / 2,this.y + this.height / 2 - nameTxt.height / 2);
        this.addChild(nameTxt);

        let rechargeTxt = ComponentManager.getTextField(data.value,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        rechargeTxt.setPosition(this.x + 453 - rechargeTxt.width / 2,this.y + this.height / 2 - rechargeTxt.height / 2);
        this.addChild(rechargeTxt);
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            nameTxt.setColor(0xfedb38);
            rechargeTxt.setColor(0xfedb38);
        }
        //文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,rechargeTxt.y + rechargeTxt.height + 15);
		this.addChild(lineSp);
    }
    public getSpaceY(): number {
        return 5;
    }
    public dispose(): void {
        super.dispose();
    }

}