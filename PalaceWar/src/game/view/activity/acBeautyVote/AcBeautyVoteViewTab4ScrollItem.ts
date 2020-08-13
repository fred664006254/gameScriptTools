/**
  * 花魁活动this--排行item
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteViewTab4ScrollItem
  */
class AcBeautyVoteViewTab4ScrollItem extends ScrollListItem {

    private _data: any = null;
    public constructor() {
        super();

    }

    protected initItem(index: number, data: any, itemParam: any) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_RANKG_USERSHOT, this.userShotCallback, this);
        this.width = 610;
        this.height = 62;

        // name: "马玉成"
        // title: ""
        // uid: 9000216
        // value: 83
        // zid: 9
        this._data = data;
        let tarColor = TextFieldConst.COLOR_BROWN
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        let idx = itemParam.idx + index;
        if (idx < 3) {
            let rankbg = BaseBitmap.create("rankbg_" + String(idx + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn" + String(idx + 1))
            rankImg.x = 58 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        } else {
            let rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
            rankTxt.text = String(idx + 1);
            rankTxt.x = 58 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }


        let nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        nameTxt.x = 186 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);

        let zidTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(data.uid), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        zidTxt.x = 368 - zidTxt.width / 2;
        zidTxt.y = this.height / 2 - zidTxt.height / 2;
        this.addChild(zidTxt);


        let scoreTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        scoreTxt.x = 525 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);

        let maskImg = BaseBitmap.create("rank_select_mask")
        maskImg.x = GameConfig.stageWidth / 2 - maskImg.width / 2;
        maskImg.y = 0;
        maskImg.visible = false;
        maskImg.height = 62;
        this.addChild(maskImg);

        this.addTouch((event: egret.TouchEvent) => {
            let rzid = Api.mergeServerVoApi.getTrueZid(data.uid);
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    maskImg.visible = true;
                    break;
                case egret.TouchEvent.TOUCH_CANCEL:
                    maskImg.visible = false;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    maskImg.visible = false;
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: data.uid, rzid: rzid });
                    break;
            }
        }, this, null, true);
    }
    private userShotCallback(event: egret.Event) {
        if (event.data.ret) {
            let data = event.data.data.data;
            if (String(data.ruid) == this._data.uid) {
                let zid = Api.mergeServerVoApi.getTrueZid(data.ruid);
                data["crossZone"] = 1;
                data['zid'] = zid;
                ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
            }
        }
    }
    public dispose(): void {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_RANKG_USERSHOT, this.userShotCallback, this);
        this._data = null;
        super.dispose();
    }
}
