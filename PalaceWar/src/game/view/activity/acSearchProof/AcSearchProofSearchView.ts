/**
 * 宝箱奖励
 * author 张朝阳
 * date 2019/6/26
 * @class AcSearchProofSearchView
 */
class AcSearchProofSearchView extends BaseView {

	public constructor() {
		super();
	}
	public initView(): void {
		let code = this.param.data.code;
		let aid = this.param.data.aid;
		let skin = this.param.data.skin;
		let name = this.param.data.name;
		let desc = this.param.data.desc;

		let sceneContainer = new BaseDisplayObjectContainer();
		sceneContainer.width = 640;
		sceneContainer.height = 960;
		sceneContainer.setPosition(GameConfig.stageWidth / 2 - sceneContainer.width / 2, GameConfig.stageHeigth / 2 - sceneContainer.height / 2);
		this.addChildToContainer(sceneContainer);
		// 550 156


		let scrollbg = BaseLoadBitmap.create("acsearchproofview_common_scrollbg");
		scrollbg.width = 592;
		scrollbg.height = 222;
		scrollbg.setPosition(sceneContainer.width / 2 - scrollbg.width / 2, 29);
		sceneContainer.addChild(scrollbg);


		let descTF = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		descTF.width = 550;
		descTF.height = 156;
		descTF.verticalAlign = egret.VerticalAlign.MIDDLE;
		descTF.setPosition(scrollbg.x + scrollbg.width / 2 - descTF.width / 2, scrollbg.y + scrollbg.height / 2 - descTF.height / 2);
		sceneContainer.addChild(descTF);

		let continueTF = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		continueTF.setPosition(descTF.x + descTF.width - continueTF.width, descTF.y + descTF.height - continueTF.height);
		sceneContainer.addChild(continueTF);

		let leftscroll = BaseLoadBitmap.create("acsearchproofview_common_scroll");
		leftscroll.width = 25;
		leftscroll.height = 280;
		sceneContainer.addChild(leftscroll);

		let rightscroll = BaseLoadBitmap.create("acsearchproofview_common_scroll");
		rightscroll.width = 25;
		rightscroll.height = 280;
		rightscroll.setPosition(sceneContainer.width - rightscroll.width, 0);
		sceneContainer.addChild(rightscroll);

		let paper = BaseLoadBitmap.create("acsearchproofview_common_searchbg");
		paper.width = 560;
		paper.height = 707;
		paper.setPosition(sceneContainer.width / 2 - paper.width / 2, scrollbg.y + scrollbg.height + 2);
		sceneContainer.addChild(paper);

		let skinImgScale: number = 0.95;
		let skinImg = BaseLoadBitmap.create(skin);
		skinImg.width = 405;
		skinImg.height = 467;
		skinImg.setScale(skinImgScale);
		skinImg.setPosition(sceneContainer.width / 2 - skinImg.width / 2 * skinImgScale, paper.y + 185)
		sceneContainer.addChild(skinImg);

		let nameBg = BaseBitmap.create("acsearchproofview_common_namebg");
		nameBg.setPosition(paper.x + 55, paper.y + 203);
		sceneContainer.addChild(nameBg);

		let nameTF = ComponentManager.getTextField(name, TextFieldConst.FONTSIZE_TITLE_BIG, TextFieldConst.COLOR_WHITE);
		if (PlatformManager.checkIsEnLang()) {
			nameTF.size = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
		}
		nameTF.setPosition(nameBg.x + nameBg.width / 2 - nameTF.width / 2, nameBg.y + nameBg.height / 2 - nameTF.height / 2);
		sceneContainer.addChild(nameTF);

		let stamp = BaseBitmap.create("acsearchproofview_common_stamp");
		stamp.setPosition(paper.x + paper.width - stamp.width - 40, paper.y + paper.height - stamp.height - 100);
		sceneContainer.addChild(stamp);


		let search = BaseLoadBitmap.create("acsearchproofview_common_searchtitlebg");
		search.width = 394;
		search.height = 101;
		search.setPosition(sceneContainer.width / 2 - search.width / 2, paper.y + 85);
		sceneContainer.addChild(search);



		this._maskBmp.addTouchTap(this.closeView, this);

	}
	protected getBgName(): string {
		return null;
	}

	protected getTitleBgName(): string {
		return null;
	}
	protected getTitleStr(): string {
		return null;
	}
	private closeView() {
		this.hide();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["acsearchproofview_common_namebg", "acsearchproofview_common_stamp"
		]);
	}
	public dispose(): void {
		super.dispose();
	}
}