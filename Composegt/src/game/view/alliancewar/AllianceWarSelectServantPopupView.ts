/**
 * 门客选择界面
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarSelectServantPopupView
 */
class AllianceWarSelectServantPopupView extends PopupView {
	
	private _scrollList:ScrollList = null;
	private _isAscendingSort:boolean = false;
	private _fightBtn:BaseButton = null;
	private _servantList:{servantId:string,servantName:string,level:number,fightValue:number,qualityBoxImgPath:string,halfImgPath:string}[] = [];
	private _cfgId:string = null;
	public constructor() {
		super();
	}
	private showTip()
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectServantTip"));
		this.hide();
	}
	private showPlanTip()
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
		this.hide();
	}
	private showCancelTip(){
		App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarCancelServantTip"));
		this.hide();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.showPlanTip,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT,this.showCancelTip,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT,this.showTip,this);
		this._servantList = this.param.data.servantList;
		this._cfgId = this.param.data.cfgId;
		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 525;
		bg.height = 645;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,this.viewBg.y + 15);
		this.addChildToContainer(bg);

		// let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
		let rect = new egret.Rectangle(0,0,bg.width - 15,bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AllianceWarSelectServantScrollItem,this._servantList,rect,{cfgId:this._cfgId});
		this._scrollList.setPosition(bg.x + 8,bg.y + 10);
		this.addChildToContainer(this._scrollList);

		this._fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"allianceWarSelectServantPopupViewFightDesc",this.fightSortClick,this);
		this._fightBtn.setPosition(bg.x + bg.width / 2 - this._fightBtn.width / 2,bg.y + bg.height + 10);
		this.addChildToContainer(this._fightBtn);
		this.fightSortClick();
	}
	/**
	 * 升降序排列
	 */
	private fightSortClick()
	{
		if(this._isAscendingSort)
		{
			this._isAscendingSort = false;
			this._scrollList.refreshData(this.descendingSort(),{cfgId:this._cfgId});
			this._fightBtn.setText("allianceWarSelectServantPopupViewFightAsce")
		}
		else
		{
			this._isAscendingSort = true;
			this._scrollList.refreshData(this.ascendingSort(),{cfgId:this._cfgId});
			
			this._fightBtn.setText("allianceWarSelectServantPopupViewFightDesc")
		}

	}
	/**
	 * 升序排列
	 */
	private ascendingSort()
	{
		// let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
		let dispatchArr = [];
		let sortArr = [];
		let useServant = null;
		for(let i = 0;i<this._servantList.length;i++)
		{
			let servantState = Api.allianceWarVoApi.getServantState(this._servantList[i].servantId);
			let myInfo = Api.allianceWarVoApi.getMyInfo();
			if(myInfo && myInfo.servant2 && myInfo.servant2 == this._servantList[i].servantId)
			{
				sortArr.push(this._servantList[i]);
				continue;
			}
			if(servantState&&(myInfo && myInfo.servant != this._servantList[i].servantId || (!myInfo)))
			{
				dispatchArr.push(this._servantList[i]);
				continue;
	
			}
			if(servantState&& myInfo && myInfo.servant == this._servantList[i].servantId)
			{
				useServant = this._servantList[i];
				continue;
			}
			sortArr.push(this._servantList[i]);
		}
		if(useServant)
		{
			sortArr.unshift(useServant);
		}
		for(let i = 0;i < dispatchArr.length;i++ )
		{
			sortArr.push(dispatchArr[i]);
		}
		return sortArr;
	}

	/**
	 * 降序排列
	 */
	private descendingSort():any[]
	{
		let servantInfo:any[] = [];
		let servantInfoVoList = this._servantList;
		let useServant = null;
		let dispatchArr = [];
		let sortArr = [];
		for(let i = 0;i < servantInfoVoList.length;i++)
		{
			servantInfo.push(servantInfoVoList[servantInfoVoList.length - 1 - i]);
		}
		for(let i = 0;i<servantInfo.length;i++)
		{
			let servantState = Api.allianceWarVoApi.getServantState(servantInfo[i].servantId);
			let myInfo = Api.allianceWarVoApi.getMyInfo();
			if(myInfo && myInfo.servant2 && myInfo.servant2 == servantInfo[i].servantId)
			{
				sortArr.push(servantInfo[i]);
				continue;
			}
			if(servantState&& (myInfo && myInfo.servant != servantInfo[i].servantId|| (!myInfo)))
			{
				dispatchArr.push(servantInfo[i]);
				continue;
			}
			if(servantState&& myInfo && myInfo.servant == servantInfo[i].servantId)
			{
				useServant = servantInfo[i];
				continue;
			}
			sortArr.push(servantInfo[i]);
		}
		if(useServant)
		{
			sortArr.unshift(useServant);
		}
		for(let i = 0;i<dispatchArr.length;i++ )
		{
			sortArr.push(dispatchArr[i]);
		}
		return sortArr;
	}
	/**
	 * 备战期结束关闭界面
	 */
	protected tick() {
		let periodType = Api.allianceWarVoApi.getWarPeriod();
		if(periodType != 1)
		{
			this.hide();
			return;
		}
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenitemzshi", "acsevenitemtopbg","awservantstate1","awservantstate2"
		]);
	}
	protected getTitleStr() {

		return "allianceWarSelectServantPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM,this.showPlanTip,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_CANCELSERVANT,this.hide,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSERVANT,this.showTip,this);
		this._scrollList = null;
		this._isAscendingSort = false;
		this._fightBtn = null;
		this._servantList = [];
		this._cfgId = null;
		super.dispose();
	}
}