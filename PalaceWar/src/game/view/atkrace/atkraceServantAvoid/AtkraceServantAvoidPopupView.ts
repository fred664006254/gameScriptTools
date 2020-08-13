
/**
 * 门客选择界面
 * @author hyd
 * @date 2019/8/8
 * @class AtkraceServantAvoidPopupView
 */
class AtkraceServantAvoidPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	private _servantList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string, banishSt: number }[] = [];
	private _cfgId: string = null;
	private _avoidNum:BaseTextField = null;
	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateCallback, this);
		this._servantList = this.param.data.servantList;
		this._cfgId = this.param.data.cfgId;
		//门客免战介绍
		let introBg = BaseBitmap.create('atkraceservantavoid_intro_bg');
		introBg.width = 544;
		introBg.height = 143;
		this.addChildToContainer(introBg);
		introBg.x = this.viewBg.x + this.viewBg.width / 2 - introBg.width / 2;
		introBg.y = this.viewBg.y + 2;

		let introTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkrace_servantAvoid_intro'), TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.addChildToContainer(introTxt);
		introTxt.width = introBg.width - 16;
		introTxt.height = introBg.height - 16; 
		// introTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
		introTxt.x = introBg.x + introBg.width / 2 - introTxt.width / 2;
		introTxt.y = introBg.y + 15;

		let currAvoidNum = this.getAvoidNum();
		let maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
		App.LogUtil.log("maxNum: "+maxNum);
		let avoidNum = ComponentManager.getTextField(LanguageManager.getlocal("servantAvoidTotalNum", [""+currAvoidNum, ""+maxNum]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		avoidNum.setPosition(introBg.x + introBg.width/2 - avoidNum.width/2, introBg.y + introBg.height - 32);
		this.addChildToContainer(avoidNum);
		this._avoidNum = avoidNum;
		avoidNum.setColor(currAvoidNum >= maxNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 525;
		bg.height = 550;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, introBg.y + introBg.height + 5); //5
		this.addChildToContainer(bg);
		// let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
		let rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
		this._scrollList = ComponentManager.getScrollList(AtkraceServantAvoidScrollItem, this._servantList, rect, { cfgId: this._cfgId, servantList: this._servantList });
		this._scrollList.setPosition(bg.x + 8, bg.y + 10);
		this.addChildToContainer(this._scrollList);
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

	private onAvoidStateCallback(evt:egret.Event):void{
		if (evt && evt.data && evt.data.ret){
			let currAvoidNum = this.getAvoidNum();
			let maxNum = GameConfig.config.servantbaseCfg.avoidMaxNum;
			this._avoidNum.text = LanguageManager.getlocal("servantAvoidTotalNum", [""+currAvoidNum, ""+maxNum]);
			this._avoidNum.setColor(currAvoidNum >= maxNum ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN);
		}
	}

	protected tick() {
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			'atkraceservantavoid_switchbar_bg', 'atkraceservantavoid_switchbar', 'atkraceservantavoid_intro_bg'
		]);
	}
	protected getTitleStr() {

		return "atkrace_servantAvoid_title";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_AVOID, this.onAvoidStateCallback, this);
		this._scrollList = null;
		this._servantList = [];
		this._cfgId = null;
		this._avoidNum = null;
		super.dispose();
	}
}
