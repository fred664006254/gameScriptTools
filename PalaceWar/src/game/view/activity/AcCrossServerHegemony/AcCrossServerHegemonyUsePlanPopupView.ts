/**
 * 	计策使用界面
 * @author jiangly
 * date 2018/10/16
 * @class AcCrossServerHegemonyUsePlanPopupView
 */
class AcCrossServerHegemonyUsePlanPopupView extends PopupView {

	public constructor() {
		super();
	}
	private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
	}
	
	protected get uiType():string
	{
		return "2";
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.hide, this);

		let itemCfg: Config.ItemItemCfg = this.param.data.itemCfg;
		let itemNum: number = this.param.data.itemNum;
		let cfgId = this.param.data.cfgId;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 515;
		bg.height = 225;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let itemDB = GameData.getItemIcon(itemCfg);
		itemDB.setPosition(bg.x + bg.width / 2 - itemDB.width / 2, bg.y + 25);
		this.addChildToContainer(itemDB);

		if (itemNum && itemNum > 1) {
			let itemNumTxt = ComponentManager.getTextField(String(itemNum), TextFieldConst.FONTSIZE_CONTENT_SMALL);
			itemNumTxt.setPosition(itemDB.x + itemDB.width - 6 - itemNumTxt.width, itemDB.y + itemDB.height - 6 - itemNumTxt.height);
			this.addChildToContainer(itemNumTxt);
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyUsePlanPopupViewTip", [itemCfg.name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		if (tipTxt.width > 480) {
			tipTxt.width = 480;
		}
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		tipTxt.setPosition(bg.x + bg.width / 2 - tipTxt.width / 2, itemDB.y + itemDB.height + 20);
		this.addChildToContainer(tipTxt)

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_RED, "cancelBtn", this.hide, this);
		cancelBtn.setPosition(bg.x + 30, bg.y + bg.height + 15);
		this.addChildToContainer(cancelBtn);

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", () => {
			let servantInfo = this.param.data.servantInfo;
			// console.log(servantInfo);
			// let info =  servantInfo[Api.playerVoApi.getPlayerID()];//this.param.data.servantInfo;Api.allianceWarVoApi.getMyInfo();
			// console.log("servant info--->",info);
			if(servantInfo){
				let info =  servantInfo[Api.playerVoApi.getPlayerID()];
				if (info && info.servant != null) {

					if(itemNum <= 0)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip2"));
						return;
					}

					if (itemCfg.id != "2201") {
						this.request(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, { rid:this.param.data.matchId,activeId:this.param.data.aid+"-"+this.param.data.code,straId: cfgId });
					}
					else {
						let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
						let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string, clv:number }[] = [];
						for (let key in servantInfoVoList) {
							// let servantState = Api.allianceWarVoApi.getServantState(servantInfoVoList[key].servantId);
							let myInfo =  Api.crossServerHegemonyVoApi.getMyInfo();
							let servantState = this.vo.sinfo[servantInfoVoList[key].servantId];
							if(servantState)
							{
								continue;
							}
							let item = servantInfoVoList[key];
							let fightValue = Api.servantVoApi.getServantCombatWithId(item.servantId)
							let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, clv:item.clv };
							servantInfoList.push(servantInfo);
						}
						servantInfoList.sort((a, b) => {
							return b.fightValue - a.fightValue;
						});
						// let list1 = [];
						// let list2 = [];
						// let myInfo = Api.crossServerHegemonyVoApi.getCurData();
						// for (let i=0; i < servantInfoList.length; i++){
						// 	let serId = servantInfoList[i].servantId;
						// 	let servantState = this.vo.sinfo[serId];
						// 	if (myInfo && myInfo.servant2 && myInfo.servant2 == serId || (servantState && servantState == 1 && (myInfo && myInfo.servant != serId ||(!myInfo)))){
						// 		list2.push(servantInfoList[i]);
						// 	}
						// 	else{
						// 		list1.push(servantInfoList[i]);
						// 	}
						// }
						// let data = list1.concat(list2);
						ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYSELECTSERVANTPOPUPVIEW,{servantList:servantInfoList,cfgId:cfgId,matchId:this.param.data.matchId,aid:this.param.data.aid,code:this.param.data.code});
						this.hide();
					}


				}
				else {
					App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip"));
				}
			} else {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarPlanTip"));
			}



		}, this);
		confirmBtn.setPosition(bg.x + bg.width - confirmBtn.width - 30, cancelBtn.y);
		this.addChildToContainer(confirmBtn);


	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		
		let periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId));
		if(periodType != 1)
		{
			this.hide();
			return;
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenitemzshi", "acsevenitemtopbg",
		]);
	}
	protected getTitleStr() {

		return "allianceWarUsePlanPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.hide, this);
		super.dispose();
	}
}