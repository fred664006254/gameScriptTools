/**
 * 玩吧vip特权礼包cell
 * @author 赵占涛
 */
class WanbaviptequanCell extends ScrollListItem {
    private vipLevel = 0;

    protected initItem(index: number, data: any) {
        this.vipLevel = data;
        let temW = 515;
        let temH = 138;
        this.width = temW;
        this.height = temH;

        let bg: BaseBitmap = BaseBitmap.create("activity_db_01");
        bg.width = temW;
        bg.height = 133
        this.addChild(bg);
		let bgRed:BaseBitmap = BaseBitmap.create("activity_charge_red");
		bgRed.width = 277;
        bgRed.y = 2;
		this.addChild(bgRed);
		let vipIcon:BaseBitmap = BaseBitmap.create("wanbaviptequanicon" + this.vipLevel);
        vipIcon.x = 6;
        vipIcon.y = 6;
		this.addChild(vipIcon);

        let giftTxt = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoGiftListPopupViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        giftTxt.x = vipIcon.x + vipIcon.width + 10;
        giftTxt.y = vipIcon.y + vipIcon.height / 2 - giftTxt.height / 2;
		this.addChild(giftTxt);

        // 道具
        let contentList=GameData.formatRewardItem(Config.WanbagamegiftCfg.getVipReward(this.vipLevel).reward);
        for (var i = 0; i < contentList.length; i++) {
			let tmpData = contentList[i];
			let iconItem = GameData.getItemIcon(tmpData,true);
			iconItem.setScale(0.7);
			iconItem.x = 20 + 80*i;
            iconItem.y = 45;
			
			this.addChild(iconItem);
        }
        // 按钮
        let btnTxt = "";
        let btnPic = ButtonConst.BTN_SMALL_YELLOW;
        let grey = false;
        if (Api.otherInfoVoApi.getWanbaviptequanInfo(this.vipLevel) == 1) {
            btnTxt = "candyGetAlready";
            grey = true;
        } else if (this.vipLevel == WanbaviptequanView.currentVip) {
            btnTxt = "taskCollect";
        } else if (this.vipLevel < WanbaviptequanView.currentVip){
            btnTxt = "wanbaviptequanCannotGet";
            grey = true;
        } else {
            btnTxt = "gotocharge";
            btnPic = ButtonConst.BTN_SMALL_BLUE;
        }
        let okBtn = ComponentManager.getButton(btnPic,btnTxt,this.okBtnClick,this);
        okBtn.x = 443 - okBtn.width/2;
        okBtn.y = 65 - okBtn.height/2;
        if (grey) {
            App.DisplayUtil.changeToGray(okBtn);
        }
        this.addChild(okBtn);
    }

    private okBtnClick(param: any): void {

        if (Api.otherInfoVoApi.getWanbaviptequanInfo(this.vipLevel) == 1) {
            // 已领取
        } else if (this.vipLevel == WanbaviptequanView.currentVip) {
            // 领取
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD, {vip:this.vipLevel});
        } else if (this.vipLevel < WanbaviptequanView.currentVip){
            // 不可领取
        } else {
            // 去充值
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }

    }

    public getSpaceY(): number {
        return 5;
    }

    public dispose(): void {
        super.dispose();
    }
}