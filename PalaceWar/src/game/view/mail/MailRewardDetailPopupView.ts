/**
 * 邮件奖励详情
 * author 张朝阳
 * date 2018/5/31
 * @class MailRewardDetailPopupView
 */
class MailRewardDetailPopupView extends PopupView {

	/**背景图1 */
	private _bg:BaseBitmap;
	/**奖励Itembg */
	private _itemBg:BaseBitmap;
	/**提示信息 */
	private _tipsInfoTxt:BaseTextField;
	/**奖励 */
	private _touch:string;
	/**门客奖励的名字 */
	private _rewardName:string;

	public constructor() {
		super();
	}
	/**UI的入口函数 */
	protected initView()
	{

		this._rewardName = this.param.data.name;
		this._touch = this.param.data.touch;
		this._bg = BaseBitmap.create("public_9_bg4");
		this.addChildToContainer(this._bg);
		this._bg.width = 520;
		this._bg.height = 160;
		this._bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._bg.width / 2,this.viewBg.y + this.getContainerY() / 2);
		
		this._tipsInfoTxt = ComponentManager.getTextField(LanguageManager.getlocal("useMailRewardTips",[this._rewardName]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._tipsInfoTxt);
		this._tipsInfoTxt.setPosition(this._bg.x + 10,this._bg.y + 10);

		this._itemBg = BaseBitmap.create("public_9_bg1");
		this.addChildToContainer(this._itemBg);
		this._itemBg.width = this._bg.width - 20;
		this._itemBg.height = 110;
		this._itemBg.setPosition(this._bg.x + 10,this._tipsInfoTxt.y + this._tipsInfoTxt.height + 10);

		this._bg.height = this._itemBg.height + this._tipsInfoTxt.height + 40;
		let rewardVo = GameData.getRewardItemIcons(this._touch)[0];

		this.addChildToContainer(rewardVo);
		rewardVo.x = this._itemBg.x + this._itemBg.width / 2 - rewardVo.width / 2;
		rewardVo.y = this._itemBg.y + this._itemBg.height / 2 - rewardVo.height / 2;


	}
	/**添加标题 */
	protected getTitleStr():string
	{
		return "itemUseConstPopupViewTitle";
	}
	/**设置按钮上文本的内容 */
	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
	/**设置按钮的需要的图片 */
	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
	/**设置整个UI的高度 */
	protected getShowHeight():number
	{
		return 360;
	}
	public dispose()
	{
		this._bg = null;
		this._itemBg = null;
		this._rewardName = null;
		this._tipsInfoTxt = null;
		this._touch = null;
		super.dispose();
	}
}