/**
 * 	圣诞活动奖励奖池
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
class AcChristmasRewardPoolPopupView extends PopupView {
	/**位置信息 */
	private _posList: { x: number, y: number, scale: number, visible: boolean }[] = [];
	/**reward 信息 */
	private _containerList: BaseDisplayObjectContainer[] = [];
	/** 需要改变位置 */
	private _startPosX = 0
	/** 对象池 */
	private _reward: Object = {};
	/** 滑动的 */
	private _container: BaseDisplayObjectContainer = null;
	/** 奖励index */
	private _index = 0;
	/** 每层的奖励 */
	private _floorRewardList: { id: string, reward: string, weight: number, isLight: boolean }[] = [];
	/** 滑动位置index */
	private _slideIndex = 0;

	private _isUsePool = false;

	private _showContainerNum = 9;
	/**快速循环的次数 */
	private _fastLoop = 0;
	/**快速循环的次数 */
	private _slowLoop = 0;

	private _isChange = false;
	private _changeLoop = 0;

	private _endPosX = 0;
	private _slowChangeLoop = 0;
	private _slowTimer = 0;

	private _lastItemId: string = null;

	private _isStop = false;

	private _rewards = null;

	private _isHaveNew = false;

	private _lastItemIdTmp: string = null;
	private _closeTip:BaseTextField = null;
	// private _pos
	public constructor() {
		super();
	}

	protected isShowOpenAni():boolean{
		return false;
	}

	protected initView(): void {

		this._floorRewardList = this.param.data.floorRewardList;
		this._lastItemId = this.param.data.lastItemId;
		this._rewards = this.param.data.rewards;
		let bgStr = "acchristmasview_rewardbg";
		if(this.isValentines())
		{
			bgStr = "acchristmasview_rewardbg_" + this.isValentines();
		}
		else if(this.getUiCode())
		{
			bgStr = "acchristmasview_rewardbg_" + this.getUiCode();
		}
		else if (this.isMagpiesBridge()){
			bgStr = "acchristmasview_rewardbg_" + this.isMagpiesBridge();
		}
		else if (this.getTypeCode() == "8"){
			bgStr = "acchristmasview_rewardbg_" + this.getTypeCode();
		}
		let bg = BaseBitmap.create(bgStr);
		// bg.width = 628;
		// bg.height = 258;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2 - this.getContainerY());
		this.addChildToContainer(bg);

		this._container = new BaseDisplayObjectContainer();
		this._container.width = 558;
		this._container.height = 116;
		this._container.mask = new egret.Rectangle(0, 0, 558, 116);
		this._container.setPosition(bg.x + bg.width / 2 - this._container.width / 2, bg.y + 105);
		this.addChildToContainer(this._container);
		if (this.getTypeCode() == "8"){
			this._container.y = bg.y + 95;
		}

		if (this._floorRewardList.length > this._showContainerNum) {
			this._isUsePool = true;
			this._lastItemIdTmp = String(this._floorRewardList.length * 1000);
			for (let i = 0; i < this._floorRewardList.length; i++) {
				let reward = this.getRewardContainer(this._floorRewardList[i]);
				reward.setVisible(false);
			}
		}
		else {
			this._isUsePool = false;
			this._showContainerNum = (Math.floor(this._showContainerNum / this._floorRewardList.length) + 1) * this._floorRewardList.length;
		}
		let offestWidth = 0;
		for (let i = 0; i < this._showContainerNum; i++) {
			let scaleVale = 0.8;
			let rewardContainer: BaseDisplayObjectContainer;
			let floorReward = this._floorRewardList[i % this._floorRewardList.length];
			if (this._isUsePool) {
				rewardContainer = this.getRewardContainer(floorReward);
				rewardContainer.setVisible(true);
			}
			else {
				let rewardVo = GameData.formatRewardItem(floorReward.reward)[0];
				rewardContainer = GameData.getItemIcon(rewardVo);
				rewardContainer.name = floorReward.id;
				this._container.addChild(rewardContainer);
			}

			if (i == 4) {
				scaleVale = 1;
				rewardContainer.setScale(scaleVale);
				rewardContainer.setPosition(rewardContainer.width * (i - 2) + 20 - 9, this._container.height / 2 - rewardContainer.height * scaleVale / 2);
				this._endPosX = rewardContainer.x;
			}
			else {
				scaleVale = 0.8;
				rewardContainer.setScale(scaleVale);
				rewardContainer.setPosition(rewardContainer.width * (i - 2) + 20, this._container.height / 2 - rewardContainer.height * scaleVale / 2);
			}
			if (i == 0) {
				this._startPosX = rewardContainer.x;
			}
			let visible = i == 0 || i == this._showContainerNum - 1 ? false : true;
			let pos = { x: rewardContainer.x, y: rewardContainer.y, scale: scaleVale, visible: visible };
			this._containerList.push(rewardContainer);
			this._posList.push(pos);
			this._index++;
		}
		let bgMask = BaseBitmap.create("acchristmasview_rewardbgmask");
		// bgMask.width = 558;
		// bgMask.height = 116;
		bgMask.setPosition(bg.x + bg.width / 2 - bgMask.width / 2, bg.y + 105);
		this.addChildToContainer(bgMask);
		if (this.getTypeCode() == "8"){
			bgMask.y = bg.y + 88;
		}

		let topArcher = BaseBitmap.create("acchristmasview_archer");
		topArcher.setPosition(bgMask.x + bgMask.width / 2 - topArcher.width / 2, bgMask.y - topArcher.height);
		this.addChildToContainer(topArcher);

		let buttomArcher = BaseBitmap.create("acchristmasview_archer");
		buttomArcher.anchorOffsetX = buttomArcher.width / 2;
		buttomArcher.anchorOffsetY = buttomArcher.height / 2;
		buttomArcher.rotation = 180;
		buttomArcher.setPosition(bgMask.x + bgMask.width / 2, bgMask.y + bgMask.height + buttomArcher.height / 2);
		this.addChildToContainer(buttomArcher);

		//close tip
		let closeTip = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasCloseTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		closeTip.setPosition(bg.x + bg.width/2 - closeTip.width/2, bg.y + bg.height + 15);
		this.addChildToContainer(closeTip);
		closeTip.visible = false;
		this._closeTip = closeTip;

		//120
		let waittime = 0;
		if (this._isUsePool) {
			this._fastLoop = this._floorRewardList.length * 1;
			this._slowLoop = this._floorRewardList.length * 2;
			this._slowChangeLoop = Math.floor(this._floorRewardList.length / 2)
			waittime = 15;
		}
		else {
			this._fastLoop = this._showContainerNum * 1;
			this._slowLoop = this._showContainerNum * 2;
			this._slowChangeLoop = Math.floor(this._showContainerNum / 2);
			waittime = 0;
		}

		this.movePos(60, waittime);
	}
	/**
	 * 位置移动
	 */
	private movePos(time: number, waitTime: number) {
		if (this._isChange) {
			let rewardVo = GameData.formatRewardItem(this._rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			this._closeTip.visible = true;
			this.addTouchTap(this.hide, this);
			// if (this.param.data.code == "2" && this.param.data.replacerewards) {
			// 	let oldReward = "";
			// 	let newReward = "";
			// 	let replacerewards = this.param.data.replacerewards;
			// 	for (let key in replacerewards[0]) {
			// 		if (key && replacerewards[0][key]) {
			// 			oldReward = String(key);
			// 			newReward = replacerewards[0][key];
			// 		}
			// 	}
			// 	let rewardName = Config.WifeskinCfg.getWifeCfgById(GameData.formatRewardItem(oldReward)[0].id).name;
			// 	ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": rewardName, "touch": newReward, "message": "changeOtherRewardTip" });
			// }
			if(this.param.data.replacerewards)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: this.param.data.replacerewards});
			}
			return;
		}
		this._slideIndex++;
		for (let i = 0; i < this._posList.length; i++) {
			let movePos = this._posList[(i - (this._slideIndex % this._posList.length) + this._posList.length) % this._posList.length];
			let timetmp = time;
			if (this._containerList[i].x == this._startPosX) {
				if (this._isUsePool && this._isHaveNew == false) {
					let floorReward = this._floorRewardList[this._index % this._floorRewardList.length];
					if (this._isStop) {
						this._isHaveNew = true;
						floorReward = this.getStopId();
						floorReward.id = this._lastItemIdTmp;
					}
					this._containerList[i] = this.getRewardContainer(floorReward);
					this._containerList[i].visible = false;
				}
			}

			egret.Tween.get(this._containerList[i]).to({ x: movePos.x, y: movePos.y, scaleX: movePos.scale, scaleY: movePos.scale, visible: movePos.visible }, time).call(() => {
				egret.Tween.removeTweens(this._containerList[i]);
				if (this._isStop && this._containerList[i].x == this._endPosX) {
					if (this._isUsePool) {
						if (this._containerList[i].name == this._lastItemIdTmp) {
							this._isChange = true;
						}
					}
					else {
						if (this._containerList[i].name == this._lastItemId) {
							this._isChange = true;
						}
					}

				}
				if (i == this._posList.length - 1) {
					egret.Tween.get(this).wait(0).call(() => {
						egret.Tween.removeTweens(this);
						this._index++;
						this._changeLoop++;
						if (this._changeLoop >= this._fastLoop) {
							this._slowTimer++;
							if (this._slowTimer > this._slowChangeLoop) {
								this._isStop = true;
							}
							time += 10;
							waitTime += 10;
							this.movePos(time, waitTime);
						}
						else {
							this.movePos(time, waitTime);
						}

					}, this)
				}

			}, this);
		}
	}
	private getStopId() {
		for (let key in this._floorRewardList) {
			if (this._floorRewardList[key].id == this._lastItemId) {
				return this._floorRewardList[key];
			}
		}
	}
	private getRewardContainer(item: { id: string, reward: string, weight: number, isLight: boolean }): BaseDisplayObjectContainer {
		if (this._reward[item.id]) {
			return this._reward[item.id];
		}
		else {
			let rewardVo = GameData.formatRewardItem(item.reward)[0];
			this._reward[item.id] = GameData.getItemIcon(rewardVo);
			this._reward[item.id].name = item.id;
			this._container.addChild(this._reward[item.id]);
			return this._reward[item.id];
		}
	}
	/**是否情人节 */
    private isValentines() {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    }
	protected getUiCode():string
    {
        if(this.param.data.code == "5")
        {
            return "5"
        }
        return null;
    }
	//是否为鹊桥相会
	protected isMagpiesBridge():string{
		if (this.param.data.code == "6" || this.param.data.code == "7"){
			return "6";
		}
		return null;
	}

	protected getTypeCode():string{
		if (this.param.data.code == "9" || this.param.data.code == "10"){
			return "8";
		}
		return this.param.data.code;
	}

	protected getResourceList(): string[] {
		let list:string[] = [];
		if(this.isValentines())
		{
			list=["acchristmasview_rewardbg_" + this.isValentines()];
		}
		if(this.getUiCode())
		{
			list.push("acchristmasview_rewardbg_" + this.getUiCode())
		}
		if (this.isMagpiesBridge()){
			list.push("acchristmasview_rewardbg_" + this.isMagpiesBridge());
		}
		if (this.getTypeCode() == "8"){
			list.push("acchristmasview_rewardbg_" +this.getTypeCode());
		}
		return super.getResourceList().concat([
			"acchristmasview_rewardbg", "acchristmasview_rewardbgmask"
		]).concat(list);
	}
	protected getTitleStr(): string {
		return null;
	}
	protected getCloseBtnName(): string {
		return null;
	}
	protected getBgName(): string {
		return null;
	}
	public dispose(): void {
		for (let key in this._reward) {
			egret.Tween.removeTweens(this._reward[key]);
			this._reward[key].dispose();
		}
		egret.Tween.removeTweens(this);
		this._reward = {};
		this._posList = [];
		this._index = 0;
		this._floorRewardList = [];
		this._slideIndex = 0;
		this._container.dispose();
		this._container = null;
		this._startPosX = 0;
		for (let key in this._containerList) {
			egret.Tween.removeTweens(this._containerList[key]);
			this._containerList[key].dispose();
		}
		this._containerList = [];
		this._isUsePool = false;
		this._showContainerNum = 9;
		this._fastLoop = 0;
		this._slowLoop = 0;
		this._changeLoop = 0;
		this._isChange = false;
		this._endPosX = 0;
		this._slowChangeLoop = 0;
		this._slowTimer = 0;
		this._isStop = false;
		this._rewards = null;
		this._isHaveNew = false;
		this._lastItemIdTmp = null;
		this._lastItemId = null;
		this._closeTip = null;

		super.dispose();
	}
}