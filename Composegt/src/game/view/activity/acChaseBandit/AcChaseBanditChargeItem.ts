/**
 * 充值奖励item
 * author qianjun
 */
class AcChaseBanditChargeItem extends ScrollListItem {
	private _data: any = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _id: number;
	private _btn: BaseButton = null;
	private _Index: number = 0;
	private _tadayTaskTxt: BaseTextField = null;
	public constructor() {
		super();
	}

	private get cfg(): Config.AcCfg.ChaseBanditCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): AcChaseBanditVo {
		return <AcChaseBanditVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	private get aid(): string {
		return this._aidAndCode.aid;
	}

	private get code(): string {
		return this._aidAndCode.code;
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
		return this._aidAndCode.aid + "-" + this._aidAndCode.code;
	}

	protected initItem(index: number, data: any, itemParam?: any) {
		let view = this;
		view._data = data;
		view.width = 518;
		view._aidAndCode = itemParam;
		view._id = data.id;
		view._Index = index;

		let reward = data.getReward;
		reward = `1009_0_${data.specialGift}_${view.getUiCode()}|` + reward;
		let rIcons = GameData.getRewardItemIcons(reward, true, true);
		let row = Math.ceil(rIcons.length / 5);//行数
		view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();

		let bg = BaseBitmap.create("activity_db_01");
		bg.width = view.width;
		bg.height = view.height - view.getSpaceY();
		view.addChild(bg);


		//任务红色底
		let bottom2: BaseBitmap = BaseBitmap.create("activity_charge_red");
		this.addChild(bottom2);
		bottom2.x = -1;


		//任务：1／10
		let tadayTaskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		var num1 = view.vo.getChargeNum(data.questType);
		if (this._data.questType == 105) {
			tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [
				LanguageManager.getlocal("officialTitle" + num1),
				LanguageManager.getlocal("officialTitle" + this._data.value)
			]);
		} else {
			tadayTaskTxt.text = this.getTitleStr(Number(this._data.questType));
		}
		tadayTaskTxt.x = 10;
		tadayTaskTxt.y = 5;
		this._tadayTaskTxt = tadayTaskTxt;
		this.addChild(tadayTaskTxt);
		bottom2.width = tadayTaskTxt.textWidth + 35;

		let tmpY = 5;
		for (let i in rIcons) {
			let icon = rIcons[i];
			icon.setScale(0.8);
			let idx = Number(i);
			icon.x = 27 + (idx % 5) * (108 * 0.8 + 8);
			icon.y = 50 + Math.floor(idx / 5) * (108 * 0.8 + 5);
			view.addChild(icon);
		}

		let progress = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 324);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progress, bg, [10, 35]);
		view.addChild(progress);
		progress.setPercentage(view.vo.getChargeNum(data.questType) / data.value, `${view.vo.getChargeNum(data.questType)}/${data.value}`, TextFieldConst.COLOR_QUALITY_WHITE);

		if (view.vo.isGetRecharge(data.id)) {
			let flag = BaseBitmap.create(`collectflag`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10, 10]);
			view.addChild(flag);
		}
		else {
			let str = ``;
			let res = ``;
			if (view.vo.getChargeNum(data.questType) < data.value) {
				if (!this._data.openType) {
					res = ButtonConst.BTN_SMALL_YELLOW;
					str = `taskCollect`;
				} else {
					res = ButtonConst.BTN_SMALL_YELLOW;
					str = `taskGoBtn`;
				}
			}
			else {
				res = ButtonConst.BTN_SMALL_YELLOW;
				str = `taskCollect`;
			}
			// if (this._data.openType || view.vo.getChargeNum(data.questType) >= data.value) {

				let btn = ComponentManager.getButton(res, str, view.buyHandler, view);
				view.addChild(btn);
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [20, 20]);
				view._btn = btn;

				if (view.vo.getChargeNum(data.questType) >= data.value) {
					if (!view.vo.isInActivity()) {
						App.CommonUtil.removeIconFromBDOC(btn);
					}
					else {
						App.CommonUtil.addIconToBDOC(btn);
					}
					btn.setGray(!view.vo.isInActivity());
				}
				else {
					btn.setGray(!view.vo.isInActivity() || !this._data.openType);
				}
			// }
		}
	}

	/**
	 * 获得
	 */
	private getTitleStr(type:number):string
	{
		let strTop:string = null;
		let valueStr = String(this._data.value);
		switch(Number(this._data.questType))
		{
			case 1:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType1",[valueStr]);
				break;
			}
			case 2:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType2",[valueStr]);
				break;
			}
			case 301:
			{	
				if(Api.switchVoApi.checkCloseText())
				{
					strTop = LanguageManager.getlocal("acJadeTaksTitleType3_1",[valueStr]);
				}
				else
				{
					strTop = LanguageManager.getlocal("acJadeTaksTitleType3_2",[valueStr]);
				}
				
				break;
			}
			case 402:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType4",[valueStr]);
				break;
			}
			case 303:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType5",[valueStr]);
				break;
			}
			case 601:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType6",[valueStr]);
				break;
			}
			case 104:
			{
				strTop = LanguageManager.getlocal("acJadeTaksTitleType7",[valueStr]);
				break;
			}
			case 10001:
			{
				strTop = LanguageManager.getlocal("betheking_task_questType10001",[valueStr]);
				break;
			}
			default:
			{
				App.LogUtil.log("未支持的类型");
			}
		}
		return strTop;
	}
	private buyHandler(param: any): void {
		let view = this;
		if (!view.vo.isInActivity()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		if (view.vo.getChargeNum(this._data.questType) < view._data.value) {
			if (!view.vo.isInActivity()) {
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}

			let openType = this._data.openType;
			if (!openType) {
				return;
			}
			let viewName = App.StringUtil.firstCharToUper(openType);
			if (openType == "level" || openType == "arrival" || openType == "") {
				// ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
				PlayerBottomUI.getInstance().show();
			}
			else {
				if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
					let isShowNpc: boolean = Api[openType + "VoApi"].isShowNpc();
					if (!isShowNpc) {
						let lockedStr: string = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
						App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
						return;
					}
				}
				if (openType == "alliance") {
					Api.allianceVoApi.openMainView();
					return;
				}

				if (openType == "studyatk") {
					Api.studyatkVoApi.openMainView();
					return;
				}
				if (egret.getDefinitionByName(viewName + "View")) {
					ViewController.getInstance().openView(viewName + "View");

				} else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
				{
					ViewController.getInstance().openView(viewName + "PopupView");
				}
				else {
					if (openType == "recharge") {
						ViewController.getInstance().openView(viewName + "Vip" + "View");
					}
				}
			}
		}
		else {
			view.vo.selIdx = view._id - 1;
			NetManager.request(NetRequestConst.REQUEST_CHASEBANDIT_TASKREWARD, {
				activeId: view.acTivityId,
				taskId: view._id,
			});
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		let view = this;
		view._data = null;
		view._aidAndCode = null;
		view._btn = null;
		view._id = 0;
		view._Index = 0;
		super.dispose();
	}
}