/**
  * 花魁活动this--粉丝排行item
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteFanRankTab1ScrollItem
  */
class AcBeautyVoteFanRankTab1ScrollItem extends ScrollListItem {

    public constructor() {
        super();

    }

    protected initItem(index: number, data: any) {

        this.width = 520;
        this.height = 62;

        // name: "马玉成"
        // title: ""
        // uid: 9000216
        // value: 83
        // zid: 9

        let tarColor = TextFieldConst.COLOR_BROWN
        if (data.zid == Api.mergeServerVoApi.getTrueZid()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        if (index < 3) {
            let rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1))
            rankImg.x = 60 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        } else {
            let rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
            rankTxt.text = String(index + 1);
            rankTxt.x = 60 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }

        let zidTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getSeverName(data.zid), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        zidTxt.x = 220 - zidTxt.width / 2;
        zidTxt.y = this.height / 2 - zidTxt.height / 2;
        this.addChild(zidTxt);


        let scoreTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        scoreTxt.x = 420 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);


    }

    public dispose(): void {

        super.dispose();
    }
}
