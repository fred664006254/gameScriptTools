/**
 * author hyd
 * date 2019/8/29
 * @class AtkraceFameScrollItem
 */
class AtkraceFameScrollItem extends ScrollListItem {

	private _bgBB: BaseBitmap;

	private _titleBB: BaseDisplayObjectContainer

	private _data: any;

	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam?: any): void {
		this.width = 616;
		// this.height = 200 + this.getSpaceY();

		this._data = data;
		let id = data.id;


		let fameList = Config.AtkraceCfg.getFameList();
		let maxLevel = fameList.length;
		let servantList = itemParam;
		let servantNum = 0;
		if (servantList[id] && servantList[id].length) {
			servantNum = servantList[id].length;
		}



		let bgImg = "aktracefame_scrollerbg" + (Number(id) > 9 ? Number(id) - 8 : 1);
		this._bgBB = BaseBitmap.create(bgImg);
		// this._bgBB.height = 162;
		this.addChild(this._bgBB);


		if (Number(id) <= Number(maxLevel)) {
			this.showIcons(index, data, servantList);
			let tipContainer = this.getItemTip(id, fameList, servantNum);
			this.addChild(tipContainer);
		}


		this._titleBB = this.getItemTitle(id);
		this._titleBB.x = this._bgBB.x + this._bgBB.width / 2 - this._titleBB.width / 2 + 15;
		this._titleBB.y = this._bgBB.y - 12;
		if(Number(id) > 9){
			this._titleBB.x -= 10;
		}
		this.addChild(this._titleBB);

		//置灰
		let maxServantLv = 1;
		for (const key in servantList) {
			if (servantList.hasOwnProperty(key)) {
				const element = servantList[key][0];
				let fameLv = Number(Api.servantVoApi.getServantObj(element).fameLv)
				if (maxServantLv < fameLv) {
					maxServantLv = fameLv;
				}

			}
		}
		if (id > maxServantLv){
			App.DisplayUtil.changeToGray(this);
		}
	}

	private showIcons(index: number, data: any, servantList: any) {
		let itemBB = BaseBitmap.create("atkracefame_scrollitem_bg");
		itemBB.width = this.width - 25;
		itemBB.height = 130;
		itemBB.x = 14;
		itemBB.y = 25;
		this.addChild(itemBB);
		let servantIconBaseWidth = 132;
		let statusContanier = new BaseDisplayObjectContainer();
		let servantCount = 0;
		if (servantList[data.id] && servantList[data.id].length) {
			servantCount = servantList[data.id].length;
		}
		for (var index = 0; index < servantCount; index++) {
			let servantId = servantList[data.id][index];
			let servantIcon = this.getAtkraceFameIcon(data, servantId);
			// wifeIcon.setScale(0.6)
			servantIcon.x = (servantIconBaseWidth + 20) * index;
			var num = index % 4;
			servantIcon.x = 10 * (num + 1) + servantIconBaseWidth * num + 2;
			servantIcon.y = (servantIcon.height + 5) * (Math.floor((index) / 4));
			statusContanier.addChild(servantIcon);

		}

		this.addChild(statusContanier);
		statusContanier.x = this.width / 2 - statusContanier.width / 2;
		statusContanier.y = 160;

		let addH = 135 + 140 * (Math.ceil((servantCount) / 4))

		if (!addH) {
			addH = 0;
			itemBB.visible = false;
		}
		itemBB.height = addH;

		this._bgBB.height = 40 + addH;

	}
	private getAtkraceFameIcon(data: any, servantId: string): BaseDisplayObjectContainer {
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg: BaseBitmap = BaseBitmap.create("atkracefame_headbg");
		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);

		let servantInfo = Api.servantVoApi.getServantObj(servantId);
		let servantCfg = Config.ServantCfg.getServantItemById(servantId);
		let iconStr = servantInfo.halfImgPath;
		let icon = BaseLoadBitmap.create(iconStr);
		icon.setPosition(0, 5)
		icon.setScale(0.6);
		let iconMask = BaseBitmap.create("atkracefame_headmask");
		iconMask.setPosition(5, 5)
		iconContainer.addChild(iconMask);
		iconContainer.cacheAsBitmap = true;
		icon.mask = iconMask;
		iconContainer.addChild(icon);
		iconContainer.addTouchTap(this.clickItemHandler, this, [servantId]);

		let nameBg = BaseBitmap.create("wifestatus_namebg");
		nameBg.setPosition(iconContainer.width / 2 - nameBg.width / 2, 105)
		iconContainer.addChild(nameBg);

		let nameTF = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
		nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2;
		nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2;
		iconContainer.addChild(nameTF);

		//红点
		if (Api.atkraceVoApi.checkServantCanUpFame(servantId)) {
			let redDotSp = BaseBitmap.create("public_dot2");
			redDotSp.x = 100;
			redDotSp.y = 10;
			iconContainer.addChild(redDotSp);
		}
		return iconContainer;
	}
	private getItemTitle(level: string | number): BaseDisplayObjectContainer {
		level = Number(level);
		let uiNum = level > 9 ? (level - 8) : 1
		let titleContainer = new BaseDisplayObjectContainer();

		let titleBg: BaseBitmap = BaseBitmap.create("aktracefame_scrollertitlebg" + uiNum);
		titleContainer.addChild(titleBg);

		let title: BaseBitmap = BaseBitmap.create("atkracefame_level" + level);
		titleContainer.addChild(title);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, titleBg);

		return titleContainer;
	}
	private getItemTip(level: string | number, fameCfg: any[], servantNum: number): BaseDisplayObjectContainer {
		level = Number(level);
		let uiNum = level > 9 ? (level - 8) : 1
		let nowFame = Config.AtkraceCfg.getFameCfgBylevel(level);
		let attrType = nowFame.att1Type;

		let tipContainer = new BaseDisplayObjectContainer();
		let titleTipBg: BaseBitmap = BaseBitmap.create("public_9_bg79");
		titleTipBg.width = 530;
		titleTipBg.height = 32;
		//titleTipBg.x = 2;
		tipContainer.addChild(titleTipBg);



		let tipTextStr_1 = LanguageManager.getlocal('atkraceFameUpFameNeed', [nowFame.expNeed + '']);
		let tipText_1 = ComponentManager.getTextField(tipTextStr_1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW)
		tipContainer.addChild(tipText_1);
		tipText_1.setPosition(titleTipBg.x + 30, titleTipBg.y + 6);

		let tipTextStr_2 = LanguageManager.getlocal('atkraceFameServantNum', [servantNum + '']);
		let tipText_2 = ComponentManager.getTextField(tipTextStr_2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW)
		tipContainer.addChild(tipText_2);
		//todo
		tipText_2.setPosition(titleTipBg.x + titleTipBg.width - tipText_2.width - 30, tipText_1.y);

		let attrStr_3 = '+' + nowFame.att1;
		if (attrType == 2) {
			attrStr_3 = '+' + App.MathUtil.toFixed(nowFame.att1 * 100, 1) + '%';
		}
		let tipTextStr_3 = LanguageManager.getlocal('atkraceFameAllServant') + LanguageManager.getlocal('atkraceFameAddAtk', [attrStr_3]);
		let tipText_3 = ComponentManager.getTextField(tipTextStr_3, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN)
		tipContainer.addChild(tipText_3);
		tipText_3.setPosition(titleTipBg.x + 10, titleTipBg.y + 45);


		let tipTextStr_4 = LanguageManager.getlocal('atkraceFameAddCrt', ['+' + App.MathUtil.toFixed(nowFame.att2 * 100, 1) + '%']);
		let tipText_4 = ComponentManager.getTextField(tipTextStr_4, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN)
		tipContainer.addChild(tipText_4);
		tipText_4.setPosition(tipText_3.x + tipText_3.width + 20, tipText_3.y);


		let tipTextStr_5 = LanguageManager.getlocal('atkraceFameSingleServant') + LanguageManager.getlocal('atkraceFameAddServant', ['+' + nowFame.att3]);
		let tipText_5 = ComponentManager.getTextField(tipTextStr_5, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN)
		tipContainer.addChild(tipText_5);
		tipText_5.setPosition(tipText_3.x, tipText_3.y + tipText_3.height + 15);


		tipContainer.setPosition(50, 40);
		return tipContainer;
	}

	private clickItemHandler(event: egret.TouchEvent, servantId: string): void {
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFAMESERVANTPOPUPVIEW, { servantId: servantId, level: this._data.id });

	}




	public getSpaceY(): number {
		return -40;
	}

	public dispose(): void {

		this._data = null;
		this._bgBB = null;
		this._titleBB = null;

		super.dispose();
	}
}