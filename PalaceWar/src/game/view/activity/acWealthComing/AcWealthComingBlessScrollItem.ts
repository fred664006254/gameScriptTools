/**
 * 财神祝福Item
 * author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingBlessScrollItem
 */
class AcWealthComingBlessScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam: any): void {
		let vo = <AcWealthComingVo>Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, itemParam.code);

		let fillBg = BaseBitmap.create("public_alphabg");
		fillBg.width = 545;
		fillBg.height = 163;
		this.addChild(fillBg);

		let bg = BaseLoadBitmap.create("acwealthcomingview_blessbg");
		bg.width = 545;
		bg.height = 148;
		bg.setPosition(fillBg.x, fillBg.y + fillBg.height - bg.height);
		this.addChild(bg);

		if (vo.getWealethBuffType() == data && itemParam.noBuff == null) {
			let light = BaseBitmap.create("public_9_bg57")
			light.width = bg.width + 10;
			light.height = bg.height + 15;
			light.setPosition(bg.x - 4, bg.y - 2);
			this.addChild(light);
			egret.Tween.get(light,{loop:true}).to({alpha:0},500).to({alpha:1},500);
		}

		let titlebg = BaseLoadBitmap.create("acwealthcomingview_blesstitlebg" + data);
		titlebg.width = 185;
		titlebg.height = 72;
		titlebg.setPosition(bg.x + 15, bg.y - 15)
		this.addChild(titlebg);

		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingBlessPopupViewDesc" + data), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		descTF.width = 500;
		descTF.setPosition(bg.x + bg.width / 2 - descTF.width / 2, bg.y + 90 - descTF.height / 2);
		this.addChild(descTF);

		
		this.width = fillBg.width;
		this.height = fillBg.height;
	}



	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}