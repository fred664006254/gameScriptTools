/**
  * 勤王除恶--rankItem
  * @author 张朝阳
  * date 2019/4/12
  * @class AllianceWeekEndRankScrollItem
  */
class AllianceWeekEndRankScrollItem extends ScrollListItem {

    public constructor() {
        super();

    }

    protected initItem(index: number, data: any) {

        this.width = 530;
        this.height = 62;

        let tarColor = TextFieldConst.COLOR_BROWN
        if (data[0] == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        if (index < 3) {
            let rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1))
            rankImg.x = 70 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        } else {
            let rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
            rankTxt.text = String(index + 1);
            rankTxt.x = 70 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }


        let nameTxt = ComponentManager.getTextField(data[1], TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        nameTxt.x = 225 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);


        let scoreTxt = ComponentManager.getTextField(data[2], TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        scoreTxt.x = 415 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);


    }

    public dispose(): void {

        super.dispose();
    }
}
