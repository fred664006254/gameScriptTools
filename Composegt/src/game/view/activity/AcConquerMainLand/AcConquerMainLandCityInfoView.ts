/**
 * 区服活动排名
 * author qianjun
 */
class AcConquerMainLandCityInfoView extends PopupView {
	// 滑动列表

	private _info: any = null;
	private _list: ScrollList = null;
	//定时刷新
	private _freshTime: number = 300;
	public constructor() {
		super();
	}

	protected getUiCode(): string {
		let code = '';
		switch (Number(this.code)) {
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}
	protected isHaveTitle(): boolean {
		return true;
	}

	private get cfg(): Config.AcCfg.ConquerMainLandCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): AcConquerMainLandVo {
		return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	private get code(): string {
		return this.param.data.code;
	}

	private get aid(): string {
		return this.param.data.aid;
	}

	private get cityNum(): string {
		return this.param.data.cityNum;
	}
	private get cityLevel(): string {
		return this.param.data.cityLevel;
	}

	private get acTivityId(): string {
		return `${this.param.data.aid}-${this.code}`;
	}

	protected getResourceList(): string[] {
		let code = this.getUiCode();
		let arr = ["popupview_bg3", "popupview_bg4", "popupview_bg5", "mainland_cityitem_bg", "mainland_cityitem_noarmy",`mlcity_instate-${this.getUiCode()}`];
		if (this.param.data.cityLevel < 3) {
			arr.push(`mainlandtiaofu${code}-`);
			arr.push(`mainlandtitleeji${code}-`);
			arr.push(`mainlandtitleyji${code}-`);
		}
		return super.getResourceList().concat(arr);
	}

	public initView(): void {
		let view = this;
		let code = view.getUiCode();
		let level = view.param.data.cityLevel;
		let num = view.param.data.cityNum;
		this._freshTime = 300;

		let contentBg = this.container.getChildByName('newTitleBg');

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip13-${code}`), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		if(PlatformManager.checkIsViSp()){
			tipTxt.size -= 2;
		}
		tipTxt.setPosition(contentBg.x + contentBg.width / 2 - tipTxt.width / 2, this.y + 30);
		view.addChildToContainer(tipTxt);

		let arr = [];
		let landinfo = view.cfg.mainLand[level - 1];
		for (let i in view._info) {
			let unit = view._info[i];
			arr.push({
				level: level,
				num: num,
				pos: Number(unit.segment),
				pic: Number(unit.pic),
				uid: Number(unit.uid),
				npc: Number(unit.npc) == 1,
				titleid: unit.title,
				ptitleid: unit.ptitle,
				name: unit.name,
				team: unit.team,
				teamnum: Number(unit.teamnum),
				zid: Number(unit.zid),
			});
		}
		arr.sort((a, b) => {
			return a.pos - b.pos;
		});
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0, 0, 550, 340);
		if (Number(this.cityLevel) > 1) {
			rect2.setTo(0, 0, 550, 670);

		}
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandCityInfoItem, arr, rect2, view.code);
		scrollList.setPosition(60, 80);
		view.addChildToContainer(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view._list = scrollList;
		view.setChildIndex(view.closeBtn, 9999);
		if (this.cityLevel == '1' || this.cityLevel == '7') {
			contentBg.height = 430;
		} else {
			contentBg.height = 760;
		}
	}


	protected getRequestData(): { requestType: string, requestData: any } {
		let view = this;
		let level = view.param.data.cityLevel;
		let num = view.param.data.cityNum;
		return {
			requestType: NetRequestConst.REQUEST_MAINLAND_GETCITYINFO, requestData: {
				activeId: view.vo.aidAndCode,
				mainland: level,
				building: num
			}
		};
	}

	private freshList(): void {
		let view = this;
		if (view._list) {
			let arr = [];
			let code = view.getUiCode();
			let level = view.param.data.cityLevel;
			let num = view.param.data.cityNum;
			let landinfo = view.cfg.mainLand[level - 1];
			for (let i in view._info) {
				let unit = view._info[i];
				arr.push({
					level: level,
					num: num,
					pos: Number(unit.segment),
					pic: Number(unit.pic),
					uid: Number(unit.uid),
					npc: Number(unit.npc) == 1,
					titleid: unit.title,
					titlelv:unit.titlelv || 0,
					ptitleid: unit.ptitle,
					name: unit.name,
					team: unit.team,
					teamnum: Number(unit.teamnum),
					zid: Number(unit.zid),
				});
			}
			arr.sort((a, b) => {
				return a.pos - b.pos;
			});
			view._list.refreshData(arr, view.code);
		}
	}

	protected receiveData(data: { ret: boolean, data: any }): void {
		let view = this;
		view._info = data.data.data.buildinginfo;
		view.freshList();
	}

	// protected resetBgSize():void{
	// 	super.resetBgSize();
	// 	this.closeBtn.x = 551;
	// 	// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
	// 	// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
	// 	// this.addChild(tipTxt);
	// 	// tipTxt.visible = false;
	// 	// this._tipTxt = tipTxt;
	// }

	// protected getShowWidth():number{
	// 	return 590;
	// }

	protected getShowHeight(): number {
		if (this.cityLevel == '1' || this.cityLevel == '7') {
			return 520;
		} else {
			return 850;
		}
	}

	// 标题背景名称
	// protected getTitleBgName():string{
	// 	return null;
	// }

	// 标题背景名称
	protected getTitleStr(): string {
		return `acmainlandcity${this.cityLevel}_${this.cityNum}-${this.code}`;
	}


	public hide(): void {
		super.hide();
	}

	public tick() {
		if (this._freshTime && this._freshTime > 0){
			this._freshTime --;
		}else{
			this._freshTime = 300;
			let view = this;
			let level = view.param.data.cityLevel;
			let num = view.param.data.cityNum;
			this.request(NetRequestConst.REQUEST_MAINLAND_GETCITYINFO,{
				activeId:view.vo.aidAndCode,
				mainland: level,
				building: num
			})
		}

	}

	public dispose(): void {
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE, view.hide, view);
		view._info = null;
		view._list = null;
		view._freshTime = 300;
		super.dispose();
	}
}