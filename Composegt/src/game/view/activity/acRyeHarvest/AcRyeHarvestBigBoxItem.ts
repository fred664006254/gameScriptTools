/**
 * 麦田飘香大箱子item
 * author 赵占涛
 */
class AcRyeHarvestBigBoxItem extends ScrollListItem {
	private _data: any = null;
	private _code: string;
	private _Index: number = 0;
	private _tadayTaskTxt: BaseTextField = null;
	public constructor() {
		super();
	}

	private get cfg(): Config.AcCfg.RyeHarvestCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
	}

	private get vo(): AcRyeHarvestVo {
		return <AcRyeHarvestVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
	}

	private get aid(): string {
		return "ryeHarvest";
	}

	private get code(): string {
		return this._code;
	}

	protected getUiCode(): string {
		let code = '';
		switch (Number(this.code)) {
			case 2:
				code = '1';
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

	private get acTivityId(): string {
		return `${this.aid}-${this._code}`;
	}

	protected initItem(index: number, data: any, itemParam?: any) {
		let view = this;
		view._data = data;
		view.width = 518;
		view._code = itemParam;
		view._Index = index;

		let reward = data.getReward;
		let rIcons = GameData.getRewardItemIcons(reward, true, true);
		let row = Math.ceil(rIcons.length / 5);//行数
		view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();

		let bg = BaseBitmap.create("activity_db_01");
		bg.width = view.width;
		bg.height = view.height - view.getSpaceY();
		view.addChild(bg);

		let titleBg = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
		titleBg.width = 510;
		titleBg.height = 33;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
		view.addChild(titleBg);


		//任务：1／10
		let tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
		tadayTaskTxt.text = LanguageManager.getlocal(`acRyeHarvestBigBoxTitle-${this.getUiCode()}`, [String(this.vo.num), this._data.needValue]);
		tadayTaskTxt.x = 24;
		tadayTaskTxt.y = 24 - tadayTaskTxt.height / 2;
		this._tadayTaskTxt = tadayTaskTxt;
		this.addChild(tadayTaskTxt);

		let tmpY = 5;
		for (let i in rIcons) {
			let icon = rIcons[i];
			icon.setScale(0.8);
			let idx = Number(i);
			icon.x = 27 + (idx % 5) * (108 * 0.8 + 8);
			icon.y = 50 + Math.floor(idx / 5) * (108 * 0.8 + 5);
			view.addChild(icon);
		}


		if (view.vo.getBigBoxOneGetted(this._Index + 1)) { // 已领取
			let flag = BaseBitmap.create(`collectflag`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flag, bg, [10, 20]);
			view.addChild(flag);
		}
		else { // 还未领取
			let str = ``;
			let res = ``;
			if (view.vo.num < data.needValue) {
				res = ButtonConst.BTN_SMALL_YELLOW;
				str = `taskGoBtn`; // 前往
			}
			else {
				res = ButtonConst.BTN_SMALL_YELLOW;
				str = `taskCollect`; // 领取
			}

			let btn = ComponentManager.getButton(res, str, view.buyHandler, view);
			view.addChild(btn);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 20]);
			if (view.vo.num >= data.needValue) {
				if (view.vo.isActyEnd()) {
					App.CommonUtil.removeIconFromBDOC(btn);
				}
				else {
					App.CommonUtil.addIconToBDOC(btn);
				}
				btn.setGray(view.vo.isActyEnd());
			}
			else {
				btn.setGray(!view.vo.isInActivity());
			}

		}
	}

	private buyHandler(param: any): void {
		let view = this;
		if (view.vo.isActyEnd()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (view.vo.num < view._data.needValue) {
			console.log("关闭对话框");
			ViewController.getInstance().hideView(ViewConst.POPUP.ACRYEHARVESTBIGBOXPOPUPVIEW);
		}
		else {
			NetManager.request(NetRequestConst.REQUEST_RYEHARVEST_GETBIGPRIZE, {
				activeId: view.acTivityId,
				gid: view._Index + 1,
			});
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		let view = this;
		view._Index = 0;
		super.dispose();
	}
}