/**
 * 任务 
 */ 
class AcCrossServerHegemonyFlagViewTab2 extends CommonViewTab {


	private _scrollList: ScrollList = null;
	private code: string = null;
	private aid: string = null;
	private uiCode: string = null;
	private freshEvent: string = null;
	private requestEvent: string = null;
	protected _tabIndex = 0;
	public constructor(param: any) {

		super();

		this.aid = param.data.aid;
		this.code = param.data.code;
		this.uiCode = param.data.uiCode || this.code;
		this.freshEvent = MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH;//param.data.freshEvent;
		this.requestEvent = NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD//param.data.requestEvent;

		this.initView();
	}
	private flyReward(event?:egret.Event):void{
		// console.log(event);
        if(event.data.ret && event.data.ret && event.data.data.ret == 0){
            let d = event.data.data.data;
            // console.log(d);
			let rewards = d.rewards;
			if (rewards){
				rewards = `1049_0_${d.special}_${this.uiCode}`+"|"+rewards;
			}
			else{
				rewards = `1049_0_${d.special}_${this.uiCode}`;
			}
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);	
        }
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.flyReward,this);

		if (this.freshEvent){
			App.MessageHelper.addEventListener(this.freshEvent, this.refreshData, this);
		}else{
			App.LogUtil.warn("---AcCommonTask--- 未传入刷新事件,任务列表无法刷新");
		}

		this.showList();
	}

	private get cfg(): any {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): AcCrossServerHegemonyVo {
		return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	public showList(): void {

		if (this._scrollList == null) {
			let taskList = this.vo.getSortTask(this.getTabIndex());
			taskList.sort((a: any, b: any) => { return a.sortId - b.sortId });

			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 620, GameConfig.stageHeigth - 99 - 60 - 14);
			this._scrollList = ComponentManager.getScrollList(AcCrossServerTaskScrollItem, taskList, rect, {
				aid: this.aid,
				code: this.code,
				uiCode: this.uiCode,
				requestEvent: this.requestEvent
			});
			this.addChild(this._scrollList);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2, 10);
		}
	}

	private refreshData() {
		if (this._scrollList) {
			let taskList = this.vo.getSortTask(this.getTabIndex());
			taskList.sort((a: any, b: any) => { return a.sortId - b.sortId });
			this._scrollList.refreshData(taskList, { 
				aid: this.aid,
				code: this.code,
				uiCode: this.uiCode,
				requestEvent: this.requestEvent
			});
		}
	}

	protected getTabIndex(): number {
		return this._tabIndex;
	}

	public dispose(): void {
		if (this.freshEvent){
			App.MessageHelper.removeEventListener(this.freshEvent, this.refreshData, this);
		}
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD,this.flyReward,this);

		this._scrollList = null;
		this.aid = null;
		this.code = null;
		this.uiCode = null;
		this.freshEvent = null;
		this.requestEvent = null;
		this._tabIndex = 0;
		super.dispose();
	}
}