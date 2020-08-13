/**
 * 	彩蛋活动
 * @author 张朝阳
 * date 2019/3/14
 * @class AcWealthCarpRankScrollItem
 */
class AcWealthCarpRankScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	protected initItem(index: number, data: any, itemParam: any) {
		this.width = 530;
		//排序
		let rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		rankTF.setPosition(this.x + 40 - rankTF.width / 2, 8);
		this.addChild(rankTF);
		//名字
		let nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		nameTxt.setPosition(this.x + 160 - nameTxt.width / 2, rankTF.y);
		this.addChild(nameTxt);
		if (data.lucky == 1) {
			let medal = BaseBitmap.create("acwealthcarpview_medal");
			medal.setPosition(nameTxt.x + nameTxt.width + 2, nameTxt.y + nameTxt.height / 2 - medal.height / 2);
			this.addChild(medal)
		}
		//时间
		let timeStr = App.DateUtil.getFormatBySecond(data.ts, 2);
		let timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		timeTxt.setPosition(this.x + 410 - timeTxt.width / 2, nameTxt.y + nameTxt.height / 2 - timeTxt.height / 2);
		this.addChild(timeTxt);
		//文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, timeTxt.y + timeTxt.height + 10);
		this.addChild(lineSp);
		if (Api.playerVoApi.getPlayerID() == data.uid) {
			rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			nameTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
			timeTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		}
	}
	public dispose(): void {
		super.dispose();
	}
}