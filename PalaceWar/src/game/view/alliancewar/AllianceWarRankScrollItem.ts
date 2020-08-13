/**
 * 帮会争霸 排行榜Item
 * author 张朝阳
 * date 2018/10/13
 * @class AllianceWarRankScrollItem
 */
class AllianceWarRankScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	public initItem(index: number, data: any): void {
		this.width = 520;
		let offestX: number = 0;
		let offestY:number = 0;
		if (index <= 2) {
			let rankBM = BaseLoadBitmap.create("rank_" + String(index + 1));
			rankBM.width = 42;
			rankBM.height = 41;
			rankBM.x = this.x + 62 - rankBM.width / 2;
			this.addChild(rankBM);
			offestX = rankBM.width / 2
			offestY = rankBM.height / 2;
		}
		else {
			let rankBg = BaseBitmap.create("rankinglist_rankbg");
			rankBg.x = this.x + 62 - rankBg.width / 2;
			this.addChild(rankBg);

			let rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			rankTF.setPosition(rankBg.x + rankBg.width / 2 - rankTF.width / 2, rankBg.y + rankBg.height / 2 - rankTF.height / 2);
			this.addChild(rankTF);

			offestX = rankBg.width / 2;
			offestY = rankBg.height / 2;
			if(Api.playerVoApi.getPlayerAllianceId() == data.id)
			{
				rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			}
		}

		//帮派名字
		let rankAllianceName = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		rankAllianceName.setPosition(this.x + 62 + 120 - rankAllianceName.width / 2, offestY - rankAllianceName.height / 2);
		this.addChild(rankAllianceName);
		//区服
		let rankServer = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2",[data.zid]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		rankServer.setPosition(rankAllianceName.x + rankAllianceName.width / 2 + 123 - rankServer.width / 2, rankAllianceName.y + rankAllianceName.height / 2 - rankServer.height / 2);
		this.addChild(rankServer);
		//分数
		let rankScore = ComponentManager.getTextField(data.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		rankScore.setPosition(rankServer.x + rankServer.width / 2 + 123 - rankScore.width / 2, rankServer.y + rankServer.height / 2 - rankScore.height / 2);
		this.addChild(rankScore);
		//文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,rankScore.y + rankScore.height + 15);
		this.addChild(lineSp);
		if(Api.playerVoApi.getPlayerAllianceId() == data.id)
		{
			rankAllianceName.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			rankServer.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			rankScore.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		}
	}

	public getSpaceY(): number {
		return 10;
	}

	public dispose(): void {

		super.dispose();
	}
}