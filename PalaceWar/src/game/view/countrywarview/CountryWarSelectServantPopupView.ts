/**
 * 门客选择界面
 * @author 张朝阳
 * date 2018/11/19
 * @class CountryWarSelectServantPopupView
 */
class CountryWarSelectServantPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	private _isAscendingSort: boolean = false;
	private _fightBtn: BaseButton = null;
	private _servantList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string ,banishSt:number}[] = [];
	private _cfgId: string = null;
	public constructor() {
		super();
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT,this.servantSuccess,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreashView,this);

		this._servantList = this.param.data.servantList;
		let cityId = this.param.data.cityId;
		let index = this.param.data.index;

		let topTxt = ComponentManager.getTextField(LanguageManager.getlocal("countryWarSelectServantPopupViewTopTitle", [LanguageManager.getlocal("CountryWarCityName" + cityId), Config.CountrywarCfg.cityLowestPower[cityId].power]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		topTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(topTxt);

		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 645;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTxt.y + topTxt.height + 15);
		this.addChildToContainer(bg);

		let sortList = this.sortServantPower();
		let rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
		this._scrollList = ComponentManager.getScrollList(CountryWarSelectServantScrollItem, sortList, rect, { cityId: cityId ,index:index});
		this._scrollList.setPosition(bg.x, bg.y + 5);
		this.addChildToContainer(this._scrollList);
	}
	/**门客势力排序 */
	private sortServantPower() {
		//cd门客
		let dispatchArr = [];
		//排序
		let sortArr = [];
		//特殊门客
		let specialArr = [];
		//用着的门客
		let useArr = [];
		for (let i = 0; i < this._servantList.length; i++) {
			let servant = this._servantList[i];
			if (Api.countryWarVoApi.isUseServant(servant.servantId)) {
				useArr.push(servant);
				continue;
			}
			if ((!Api.countryWarVoApi.isUseServant(servant.servantId)) && Api.countryWarVoApi.isServantRest(servant.servantId)) {
				dispatchArr.push(servant);
				continue;
			}
			if (Api.countryWarVoApi.isHaveServant(servant.servantId)) {
				specialArr.push(servant);
				continue;
			}
			sortArr.push(servant);

		}
		if (Api.switchVoApi.checkOpenExile()) {
			useArr.sort((a, b) => {
				if (a.banishSt && (!b.banishSt)) {
					return 1;
				}
				else if (a.banishSt && b.banishSt) {
					return 0;
				}
				else if ((!a.banishSt) && b.banishSt) {
					return -1;
				}
				else if ((!a.banishSt) && (!b.banishSt)) {
					return 0;
				}
			});
			specialArr.sort((a, b) => {
				if (a.banishSt && (!b.banishSt)) {
					return 1;
				}
				else if (a.banishSt && b.banishSt) {
					return 0;
				}
				else if ((!a.banishSt) && b.banishSt) {
					return -1;
				}
				else if ((!a.banishSt) && (!b.banishSt)) {
					return 0;
				}
			});
			sortArr.sort((a, b) => {
				if (a.banishSt && (!b.banishSt)) {
					return 1;
				}
				else if (a.banishSt && b.banishSt) {
					return 0;
				}
				else if ((!a.banishSt) && b.banishSt) {
					return -1;
				}
				else if ((!a.banishSt) && (!b.banishSt)) {
					return 0;
				}
			});
			dispatchArr.sort((a, b) => {
				if (a.banishSt && (!b.banishSt)) {
					return 1;
				}
				else if (a.banishSt && b.banishSt) {
					return 0;
				}
				else if ((!a.banishSt) && b.banishSt) {
					return -1;
				}
				else if ((!a.banishSt) && (!b.banishSt)) {
					return 0;
				}
			});
		}

		for (let i = 0; i < specialArr.length; i++) {
			sortArr.unshift(specialArr[specialArr.length - 1 - i]);
		}
		for (let i = 0; i < useArr.length; i++) {
			sortArr.unshift(useArr[useArr.length - 1 - i]);
		}
		for (let i = 0; i < dispatchArr.length; i++) {
			sortArr.push(dispatchArr[i]);
		}
		return sortArr;
	}
	private servantSuccess(event:egret.Event)
	{
		if(event.data.ret)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("countryWarSuccessServantTip"));
			this.hide();
		}	
		// else
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("countryWarFailServantTip"));
		// }
		
	}
	private refreashView() {
		let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
		let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string ,banishSt:number}[] = [];
		for (let key in servantInfoVoList) {
			let item = servantInfoVoList[key];
			let fightValue = item.total;
			let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath,banishSt:item.banishSt };
			servantInfoList.push(servantInfo);
		}
		servantInfoList.sort((a, b) => {
			return b.fightValue - a.fightValue;
		})
		this._servantList = servantInfoList;
		let sortList = this.sortServantPower();
		this._scrollList.refreshData(sortList, { cityId: this.param.data.cityId ,index:this.param.data.index});

	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"awservantstate1","discusspqzhong"
		]);
	}
	protected getTitleStr() {

		return "allianceWarSelectServantPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_COUNTRYWAY_SELECTSERVANT,this.servantSuccess,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SERVANT,this.refreashView,this);
		this._scrollList = null;
		this._isAscendingSort = false;
		this._fightBtn = null;
		this._servantList = [];
		this._cfgId = null;
		super.dispose();
	}
}