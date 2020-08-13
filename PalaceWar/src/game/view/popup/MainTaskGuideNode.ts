/**
 * 主线任务引导
 * author hyd
 * date 2019/09/15
 * @class MainTaskGuideNode
 */
class MainTaskGuideNode extends BaseLoadDisplayObjectContiner {
	private _taskId: string;
	private _taskDescTxt: BaseTextField;
	private _taskAimTxt: BaseTextField;
	private _rbg: BaseBitmap;
	private _closeBtn: BaseButton;
	private _showUIName: string = "";
	private _completeAni: CustomMovieClip = undefined;
	private _posCfg: any = null;
	public constructor() {
		super();
		// this.show();
	}

	protected init(): void {
		this._posCfg = Config.MaintaskguideposCfg.poscfg;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE, this.refreshUIInfo, this);
		let rbg: BaseBitmap = BaseBitmap.create("public_maintask_guidebg");
		rbg.setPosition(0, -rbg.height / 2);
		this.addChild(rbg);
		rbg.addTouchTap(this.bgHandler, this);
		this._rbg = rbg;

		let icon = BaseBitmap.create("public_maintask_guideicon");
		icon.x = rbg.x;
		icon.y = rbg.y + rbg.height / 2 - icon.height / 2 - 5;
		this.addChild(icon);

		this._taskDescTxt = ComponentManager.getTextField("00", 20, 0xfff8e8);
		this._taskDescTxt.multiline = true;
		this._taskDescTxt.lineSpacing = 3;
		// this._taskDescTxt.width = 230;
		this._taskDescTxt.textAlign = egret.HorizontalAlign.LEFT;
		this._taskDescTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._taskDescTxt.x = rbg.x + 80;
		this._taskDescTxt.y = rbg.y + rbg.height / 2 + 3;
		this.addChild(this._taskDescTxt);

		this._taskAimTxt = ComponentManager.getTextField("0", 20, 0xfa0606);
		this._taskAimTxt.y = this._taskDescTxt.y - this._taskDescTxt.height / 2;
		this.addChild(this._taskAimTxt);

		let closeBtn = ComponentManager.getButton("public_maintask_guideclose", "", this.hide, this);
		this._closeBtn = closeBtn;
		this._closeBtn.x = rbg.x + 330;
		closeBtn.y = rbg.y + rbg.height / 2 - closeBtn.height / 2;
		this.addChild(closeBtn);


		TickManager.addTick(this.tick, this);
		this.refreshUIInfo();
	}

	protected refreshUIInfo() {
		this._taskId = Api.mainTaskVoApi.getCurMainTaskId() //this.param.itemId ? this.param.itemId : "101001";
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);

		let cfg = this._posCfg[taskCfg.openType];
		if (this._showUIName && this._showUIName != "") {
			cfg = this._posCfg[this._showUIName];
		}
		this.x = cfg.x;
		this.y = cfg.y;

		if (!this._taskId || !taskCfg) {
			return;
		}
		let tarColor = 0xfa0606;
		if (Api.mainTaskVoApi.isCurTaskReach()) {
			tarColor = 0x0fdb36;
		}
		this._taskAimTxt.textColor = tarColor;

		if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
			this._taskAimTxt.text = LanguageManager.getlocal("mainTask_complete");
			this.showAni();
		} else {
			this._taskAimTxt.text = "(" + Api.mainTaskVoApi.getCurMainTaskValue() + "/" + taskCfg.value + ")";
			this.hideAni();
		}
		let nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[1];
		this._taskDescTxt.text = nameAndDesc.split(":")[1];

		if (this._taskDescTxt.x + this._taskDescTxt.textWidth > 400) {
			this._taskDescTxt.width = 400 - this._taskDescTxt.x;
		}
		this._taskDescTxt.anchorOffsetY = this._taskDescTxt.height / 2;
		this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth + 5;
		this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 70;
		this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width + 20;
		// this._closeBtn.x = this._rbg.x + this._rbg.width - this._closeBtn.width - 20;
		if (cfg.x <= 0) {
			this.x = GameConfig.stageWidth / 2 - this.width / 2;
		}
	}

	private showAni() {
		if (!this._completeAni) {
			this._completeAni = ComponentManager.getCustomMovieClip("maintask_guide", 7, 150);
			// this._completeAni.blendMode = egret.BlendMode.ADD;
			this._completeAni.x = -23;
			this._completeAni.y = -70;
			this.addChildAt(this._completeAni, 1);
			this._completeAni.playWithTime(0);
		}
		this._completeAni.visible = true;
	}
	private hideAni() {
		this._completeAni ? this._completeAni.visible = false : "";
	}
	public resetUIPos(uiName?: string) {
		this._taskId = Api.mainTaskVoApi.getCurMainTaskId() //this.param.itemId ? this.param.itemId : "101001";
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
		uiName = uiName || taskCfg.openType;
		if(this._posCfg)
		{
			let cfg = this._posCfg[uiName];
			this.x = cfg.x;
			this.y = cfg.y;
			if (cfg.x <= 0) {
				this.x = GameConfig.stageWidth / 2 - this.width / 2;
			}
		}

		egret.setTimeout(() => {
			if (this && this.parent) {
				let idx1 = this.parent.getChildIndex(this);
				let idx2 = this.parent.numChildren - 1;
				if (idx1 < idx2) {
					this.parent.swapChildrenAt(idx1, idx2);
				}
			}
		}, this, 300);
	}

	public resetUIPos2(uiName?: string) {
		this._taskId = Api.mainTaskVoApi.getCurMainTaskId() //this.param.itemId ? this.param.itemId : "101001";
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
		uiName = uiName || taskCfg.openType;
		let cfg = this._posCfg[uiName];
		this.x = cfg.x;
		this.y = cfg.y;
	}

	protected isShowOpenAni(): boolean {
		return false;
	}
	private bgHandler() {
		if (Api.mainTaskVoApi.isCurTaskReach()) {
			Api.mainTaskVoApi.isKeepGuide = false;
			
			ViewController.getInstance().openView(ViewConst.POPUP.MainTASKPOPUPVIEW);
			let pchildren = this.parent.$children;
			let mindex = this.parent.getChildIndex(this);
			for (var index = mindex - 1; index >= 0; index--) {
				if (pchildren[index]) {
					let child:any = pchildren[index];
					if(child instanceof BaseView)
					{
						child.hide();
					}
					else if(child instanceof PlayerBottomUI)
					{
						PlayerBottomUI.getInstance().hide(true);
					}
				}
			}
		}
	}

	private tick(): void {
		let tarColor = 0xfa0606;
		if (Api.mainTaskVoApi.isCurTaskReach()) {
			tarColor = 0x0fdb36;
		}
		this._taskAimTxt.textColor = tarColor
		this._taskId = Api.mainTaskVoApi.getCurMainTaskId()
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);

		let nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt()[1];
		this._taskDescTxt.text = nameAndDesc.split(":")[1];
		this._taskDescTxt.anchorOffsetY = this._taskDescTxt.height / 2;
		this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth + 5;

		if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
			this._taskAimTxt.x = this._taskDescTxt.x + this._taskDescTxt.textWidth;
			this._taskAimTxt.text = LanguageManager.getlocal("mainTask_complete");
			this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 60;
			this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width;
			this.showAni();
		} else {
			this.hideAni();
			this._taskAimTxt.text = "(" + Api.mainTaskVoApi.getCurMainTaskValue() + "/" + taskCfg.value + ")";
			this._rbg.width = this._taskAimTxt.x + this._taskAimTxt.width + 70;
			this._closeBtn.x = this._taskAimTxt.x + this._taskAimTxt.width + 20;
		}


	}

	public dispose(): void {
		TickManager.removeTick(this.tick, this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAINTASK_GUIDE, this.refreshUIInfo, this);

		this._rbg = null;
		this._closeBtn = null;
		this._taskId = null;
		this._taskDescTxt = null;
		this._taskAimTxt = null;
		this._showUIName = "";
		MainTaskGuideNode._instance = null;
		this._completeAni = null;
		this._posCfg = null;
		super.dispose();
	}

	protected getResourceList(): string[] {
		return [];
	}

	protected getParent(): egret.DisplayObjectContainer {
		return LayerManager.panelLayer;
	}

	public hide() {
		super.hide();
	}

	public show(data?: any): void {
		this._showUIName = data;
		super.show(data);
	}

	private static _instance: MainTaskGuideNode = undefined;
	private static _instanceList: MainTaskGuideNode[] = [];
	public static getInstance(): MainTaskGuideNode {
		if (!MainTaskGuideNode._instance) {
			MainTaskGuideNode._instance = new MainTaskGuideNode();
		}

		return MainTaskGuideNode._instance;
	}

	//实例是否可用
	public static hasInstance() {
		if (MainTaskGuideNode._instance) {
			return true;
		}
		return false;
	}

	public static hideInstance() {
		if (MainTaskGuideNode._instance) {
			MainTaskGuideNode._instance.hide();
		}
	}

	public static resetInstance() {
		if (MainTaskGuideNode._instance) {
			MainTaskGuideNode._instance.refreshUIInfo();
		}
	}

	public static showGuideInstance(uiname?: string) {
		let ins = new MainTaskGuideNode();
		ins.show();
		ins.resetUIPos2(uiname);
		MainTaskGuideNode._instanceList.push(ins);

	}

	public static hideGuideInstance() {
		let ins = MainTaskGuideNode._instanceList.pop();
		if (ins) {
			ins.hide();
		}
		if (MainTaskGuideNode._instanceList.length == 0) {
			Api.mainTaskVoApi.isGoExcuting = false;
		}
	}

}
