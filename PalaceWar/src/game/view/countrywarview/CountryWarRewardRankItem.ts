/**
 * 	个人排行item相关
 * author 张朝阳
 * date 2018/11/19
 * @class CountryWarRewardRankItem
 */
class CountryWarRewardRankItem extends ScrollListItem {

    public constructor() {
        super();
    }

    protected initItem(index: number, data: any, itemParam: any) {
        this.width = 530;
        // this.height = 150;
        let offestX: number = 0;
		let offestY:number = 0;
        if (index <= 2) {
			let rankBM = BaseLoadBitmap.create("rank_" + String(index + 1));
			rankBM.width = 42;
			rankBM.height = 41;
			rankBM.x = this.x + 40 - rankBM.width / 2;
			this.addChild(rankBM);
			offestX = rankBM.width / 2
			offestY = rankBM.height / 2;
		}
		else {
			let rankBg = BaseBitmap.create("rankinglist_rankbg");
			rankBg.x = this.x + 40 - rankBg.width / 2;
			this.addChild(rankBg);

			let rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			rankTF.setPosition(rankBg.x + rankBg.width / 2 - rankTF.width / 2, rankBg.y + rankBg.height / 2 - rankTF.height / 2);
			this.addChild(rankTF);

			offestX = rankBg.width / 2;
			offestY = rankBg.height / 2;
			if(Api.playerVoApi.getPlayerID() == data.uid)
			{
				rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			}
		}

		//玩家名字
		let nickName = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		nickName.setPosition(this.x + 180 - nickName.width / 2, offestY - nickName.height / 2);
		this.addChild(nickName);
		//区服
		let rankServer = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(data.uid), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		rankServer.setPosition(this.x + 335 - rankServer.width / 2, nickName.y + nickName.height / 2 - rankServer.height / 2);
		this.addChild(rankServer);
		//分数
        let powerScore = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.dps), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		powerScore.setPosition(this.x + 465 - powerScore.width / 2, rankServer.y + rankServer.height / 2 - powerScore.height / 2);
		this.addChild(powerScore);
		//文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,powerScore.y + powerScore.height + 15);
		this.addChild(lineSp);
		if(Api.playerVoApi.getPlayerID() == data.uid)
		{
			nickName.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			rankServer.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			powerScore.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		}
    }
    public dispose(): void {
        super.dispose();
    }
}