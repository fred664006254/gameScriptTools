/**
 * 合成征收界面
 * @author hyd
*/
class LevyView extends CommonView {

	private _scollList: ScrollList = null;
	private _aniContainer:BaseDisplayObjectContainer = null;

	public constructor() {
		super();
	}


	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"commonview_redtitle", "commonview_woodbg","progress_type1_yellow2","progress_type3_bg",
			"commonview_bottom", "levy_numbg","levy_star1","levy_star2",
			"levy_itembg", "levy_lock","levy_starbg"
		]);
	}

	public initView(): void {

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.updateResNum,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY,this.refreshUi,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_PROGRESS_FULL,this.progressFullHandle,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH,this.scrollCanTouch,this);
		let redTitle = BaseBitmap.create("commonview_redtitle");
		this.addChildToContainer(redTitle);
		redTitle.setPosition(GameConfig.stageWidth / 2 - redTitle.width / 2, - 23);

		let arr = Api.levyVoApi.getLevyItemList();
		this._scollList = ComponentManager.getScrollList(LevyScrollItem, arr, new egret.Rectangle(0, 0, 636, GameConfig.stageHeigth - 160));
		this.addChild(this._scollList);
		this._scollList.setPosition(GameConfig.stageWidth / 2 - this._scollList.width / 2, 128);
		if(Api.rookieVoApi.isGuiding){
			this._scollList.verticalScrollPolicy = "off";
		}


		let maxV = 3;
		for (let i: number = 0; i < maxV; i++) {
			this.getResIcons(i, this, redTitle);
		}



		let bottom = BaseBitmap.create("commonview_bottom");
		bottom.setPosition(0,GameConfig.stageHeigth - bottom.height);
		this.addChild(bottom);
	}

	private getResIcons(index: number, container: egret.DisplayObjectContainer, positionObj: egret.DisplayObject): void {
		let diffX = 200;
		let type: string;
		if (index == 0) {
			type = "gold"
		}
		else if (index == 1) {
			type = "food";
		}
		else if (index == 2) {
			type = "soldier";
		}
		else if (index == 3) {
			type = "practice";
		}
		let resBar:ResBar = ComponentManager.getResBar(ItemEnums[type],true);
		resBar.setPosition(40 + index * diffX, this.container.y + positionObj.y + (positionObj.height - resBar.height) / 2 +5);
		resBar.isShowAni = true;

		this[`_${type}bar`] = resBar;
		container.addChild(resBar);
		this[`_${type}bar`]._levyRate = Api.levyVoApi.getTotalRawAddRate(type);

		let resAddText: BaseTextField = ComponentManager.getTextField(Api.levyVoApi.getTotalAddRateStr(type), 18, TextFieldConst.COLOR_WARN_YELLOW2);
		resAddText.setPosition(resBar.x+resBar.width/2-resAddText.width/2 + 10, resBar.y + resBar.height - 17);
		container.addChild(resAddText);
		this["_" + type + "AddText"] = resAddText;


	}

	private updateResNum():void
	{ 
		this["_goldbar"].setResNum(Api.playerVoApi.getPlayerGoldStr());
		this["_soldierbar"].setResNum(Api.playerVoApi.getSoldierStr());
		this["_foodbar"].setResNum(Api.playerVoApi.getFoodStr());

	}

	public refreshUi(){
		if(this._scollList){
			let arr = Api.levyVoApi.getLevyItemList();
			this._scollList.refreshData(arr);
		}
		let typeArr = ["gold","food","soldier"];
		for (let i = 0; i < typeArr.length; i++) {
			const type = typeArr[i];
			if(this[`_${type}AddText`] && this[`_${type}bar`]){
				this[`_${type}AddText`].text = Api.levyVoApi.getTotalAddRateStr(type);
				this[`_${type}AddText`].x = this[`_${type}bar`].x+this[`_${type}bar`].width/2-this[`_${type}AddText`].width/2 +10;
				this[`_${type}bar`].levyRate = Api.levyVoApi.getTotalRawAddRate(type);
			}
		}

	}

	private scrollCanTouch(){
		this._scollList.verticalScrollPolicy = "on";
	}

	private progressFullHandle(event:egret.Event){
		let levyIndex = event.data.levyIndex;
		let itemRate = Api.levyVoApi.getLevyItemRate(levyIndex);
		let itemY = this._scollList.getItemByIndex(levyIndex).y;
		if(itemY>this._scollList.scrollTop-200 && itemY<this._scollList.scrollTop-200+800){
			if(!this._aniContainer){
				this._aniContainer = new BaseDisplayObjectContainer();
				this._aniContainer.width = GameConfig.stageWidth;
				this._aniContainer.height = GameConfig.stageHeigth;
				this.addChildAt(this._aniContainer,999);
			}
			if(itemRate.grate){
				let levyEffect = new LevyEffect();
				levyEffect.start(
					"public_icon2",
					new egret.Point(410,this._scollList.y + itemY - this._scollList.scrollTop +220),
					new egret.Point(this["_goldbar"].x,this["_goldbar"].y),
					this._aniContainer,
					()=>{
						levyEffect.dispose();
					},this);

			}
			if(itemRate.frate){
				let levyEffect = new LevyEffect();
				levyEffect.start(
					"public_icon3",
					new egret.Point(410,this._scollList.y + itemY - this._scollList.scrollTop +220),
					new egret.Point(this["_foodbar"].x,this["_foodbar"].y),					
					this._aniContainer,
					()=>{
					levyEffect.dispose();
					},this);
			}
			if(itemRate.srate){
				let levyEffect = new LevyEffect();
				levyEffect.start(
					"public_icon4",
					new egret.Point(410,this._scollList.y + itemY - this._scollList.scrollTop +220),
					new egret.Point(this["_soldierbar"].x,this["_soldierbar"].y),					
					this._aniContainer,
					()=>{
					levyEffect.dispose();
					},this);
			}
		}

	}

	protected getTitleStr(): string {
		return `levyViewTitle`;
	}

	protected getBgName(): string {
		return `commonview_woodbg`;
	}

	protected getRequestData(): { requestType: string, requestData: any } {
	    return {
	        requestType: NetRequestConst.REQUEST_LEVY_INDEX,
	        requestData: {
	        }
	    };
	}

	protected getRuleInfo(): string {
		return `levyRule`;
	}

	public hide():void{
		if(Api.rookieVoApi.curGuideKey=="levy"||!Api.rookieVoApi.curGuideKey)
		{
			Api.rookieVoApi.checkWaitingGuide();
		}
		
		super.hide();
	}

	public dispose(): void {
		this._scollList = null;
		this._aniContainer = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS,this.updateResNum,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESHVO_LEVY,this.refreshUi,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_PROGRESS_FULL,this.progressFullHandle,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_SCOLL_CANTOUCH,this.scrollCanTouch,this);
		super.dispose();
	}
}

