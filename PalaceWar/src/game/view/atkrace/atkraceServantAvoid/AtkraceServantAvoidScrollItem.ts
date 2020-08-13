/**
 * 选择门客的item
 * @author hyd
 * @date 2019/8/8
 * @class AtkraceServantAvoidScrollItem
 */
class AtkraceServantAvoidScrollItem extends ScrollListItem {

	private _servantId: string = '';
	private _servantName: string = '';
	private _lastReqServantId: string = '';
	private _cfgId: string = '';
	private _avoidState: number = 0;
	private _avoidBarInImg: BaseBitmap = null;
	private _avoidBarInTxt: BaseTextField = null;
	private _servantList:any[] = [];
	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam: any): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateHander, this);

		this._cfgId = itemParam.cfgId;
		this._servantId = data.servantId;
		this._servantList = itemParam.servantList;
		this.width = 510;
		let bg = BaseBitmap.create("public_9_bg44");
		// servantId
		bg.width = this.width;
		bg.height = 130;
		this.addChild(bg);
		// 184 × 184
		//180 × 177
		let scaleVale = 106 / 184;
		let iconBgBt: BaseBitmap = BaseLoadBitmap.create(data.qualityBoxImgPath);
		iconBgBt.width = 184;
		iconBgBt.height = 184;
		iconBgBt.setScale(scaleVale);
		iconBgBt.setPosition(bg.x + 10, bg.y + bg.height / 2 - iconBgBt.height / 2 * scaleVale);
		this.addChild(iconBgBt);

		let iconBt: BaseBitmap = BaseLoadBitmap.create(data.halfImgPath);
		iconBt.width = 180;
		iconBt.height = 177;
		iconBt.setScale(scaleVale);
		iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scaleVale - iconBt.width / 2 * scaleVale, iconBgBt.y + iconBgBt.height / 2 * scaleVale - iconBt.height / 2 * scaleVale);
		this.addChild(iconBt);

		this._servantName = data.servantName;



		if(data.avoidState){
			//已拥有的
			let servantNameTxt = ComponentManager.getTextField(data.servantName, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 15);
			this.addChild(servantNameTxt);

			let servantLevelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarServantLevel", [data.level]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
			servantLevelTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 13);
			this.addChild(servantLevelTxt);
	
	
			let servantTotalTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servantAvoid_total", [data.totalValue]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xe6ded0);
			servantTotalTxt.setPosition(servantNameTxt.x, servantLevelTxt.y + servantLevelTxt.height + 13);
			this.addChild(servantTotalTxt);
	
	
			let switchAvoidContainer = this.getAvoidSwitchBar();
			this.addChild(switchAvoidContainer);
			switchAvoidContainer.x = this.x + this.width - switchAvoidContainer.width - 35;
			switchAvoidContainer.y = this.y + this.height / 2 - switchAvoidContainer.height / 2 - 5;
	
			this.refreashItem();
		}else{
			//未拥有的
			let servantNameTxt = ComponentManager.getTextField(data.servantName + LanguageManager.getlocal('atkrace_servantAvoid_notOwned'), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			servantNameTxt.setPosition(iconBgBt.x + iconBgBt.width * scaleVale + 15, bg.y + 30);
			this.addChild(servantNameTxt);

			let servantNotOwnedTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantAvoidSource_"+this._servantId), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			servantNotOwnedTxt.setPosition(servantNameTxt.x, servantNameTxt.y + servantNameTxt.height + 20);
			this.addChild(servantNotOwnedTxt);

		}


	}

	//to do 本地化 
	private refreashItem() {
		this._avoidState = Api.servantVoApi.getServantObj(this._servantId).avoid;
		let stateStr = '';
		this._avoidState = this._avoidState || 1;
		if (this._avoidState == 2) {
			stateStr = LanguageManager.getlocal('atkrace_servantAvoid_inAvoid');
			this._avoidBarInImg.x = 3;
			this._avoidBarInTxt.x = 73;
		} else {
			stateStr = LanguageManager.getlocal('atkrace_servantAvoid_inBattle');
			this._avoidBarInImg.x = 62;
			this._avoidBarInTxt.x = 5;
		}
		this._avoidBarInTxt.text = stateStr;
	}

	private getAvoidSwitchBar(): BaseDisplayObjectContainer {
		let switchBarContainer = new BaseDisplayObjectContainer;
		let barBg = BaseBitmap.create('atkraceservantavoid_switchbar_bg');
		switchBarContainer.addChild(barBg);

		this._avoidBarInImg = BaseBitmap.create('atkraceservantavoid_switchbar');
		switchBarContainer.addChild(this._avoidBarInImg);
		this._avoidBarInImg.y = barBg.y + barBg.height / 2 - this._avoidBarInImg.height / 2;

		this._avoidBarInTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_servantAvoid_inBattle"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
		switchBarContainer.addChild(this._avoidBarInTxt);
		this._avoidBarInTxt.y = barBg.y + barBg.height / 2 - this._avoidBarInTxt.height / 2;

		switchBarContainer.addTouchTap(this.clickStateHander, this);
		return switchBarContainer;
	}

	private getAvoidNum():number{
		if (!this._servantList || this._servantList.length <= 0){
			return 0;
		}
		let list = this._servantList;
		let servantId:any;
		let count = 0;
		for (let i = 0; i < list.length; i++){
			servantId = list[i].servantId;
			if (Api.servantVoApi.getServantObj(servantId) && Api.servantVoApi.getServantObj(list[i].servantId).avoid == 2){
				count ++;
			}
		}
		return count;
	}

	private showTip() {
		let tipStr = '';
		if (this._avoidState == 2) {
			tipStr = LanguageManager.getlocal("atkrace_servantAvoid_switchToAvoidTip", [this._servantName]);
		} else {
			tipStr = LanguageManager.getlocal("atkrace_servantAvoid_switchToBattleTip", [this._servantName]);
		}
		App.CommonUtil.showTip(tipStr);
	}

	public getSpaceY(): number {
		return 10;
	}

	private clickStateHander(param: any): void {
		let currAvoidNum = this.getAvoidNum();
		let maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
		if (this._avoidState != 2 && currAvoidNum >= maxNum){
			App.CommonUtil.showTip(LanguageManager.getlocal("servantAvoidMaxTip"));
			return;
		}
		let voidState = 3 - this._avoidState;
		this._lastReqServantId = this._servantId;
		NetManager.request(NetRequestConst.REQUEST_SERVANT_AVOID, {
			servantId: this._servantId,
			avoid: voidState,
		});
	}


	private onAvoidStateHander(param: any): void {
		if (this._lastReqServantId === this._servantId) {
			this._lastReqServantId = '';
			this.refreashItem();
			this.showTip();
		}

	}

	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateHander, this);
		this._servantId = '';
		this._servantName = '';
		this._lastReqServantId = '';
		this._cfgId = '';
		this._avoidState = 0;
		this._avoidBarInImg = null;
		this._avoidBarInTxt = null;
		this._servantList = [];
		super.dispose();
	}
}