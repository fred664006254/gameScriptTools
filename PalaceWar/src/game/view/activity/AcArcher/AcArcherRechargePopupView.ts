/**
  * 黄忠活动充值奖励
  * author 张朝阳
  * date 2018/6/20
  * @class AcArcherRechargePopupView
  */
class AcArcherRechargePopupView extends PopupView{
	private code:string = null;
	public constructor() {
		super();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.ArcherCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACARCHER, this.code);
    }
	/**
	 * 初始化view
	 */
	public initView()
	{
		this.code = this.param.data.code;
		let rechearDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acArcherRechearDesc"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		rechearDesc.setPosition(this.getShowWidth() / 2 - rechearDesc.width / 2,15);
		this.addChildToContainer(rechearDesc);

		let itembg:BaseBitmap = BaseBitmap.create("public_9_bg43");
		itembg.width = 520;
		itembg.height = 640;
		itembg.setPosition(this.getShowWidth() / 2 - itembg.width / 2,rechearDesc.y + rechearDesc.height + 15);
		this.addChildToContainer(itembg);

		let recharge = this.cfg.recharge;
		let itemRect:egret.Rectangle =  new egret.Rectangle(0,0,itembg.width - 20,itembg.height - 20);
		let scrollList = ComponentManager.getScrollList(AcArcherRechargeScrollItem,recharge,itemRect,{"code":this.code});
		scrollList.setPosition(itembg.x + 10,itembg.y + 10); 
		this.addChildToContainer(scrollList);
	}
	/**标题 */
	protected getTitleStr():string
	{
		return "acArcherRechearTitle";
	}
	/**
	 * 设置当前高度
	 */
	protected getShowHeight():number
	{
		return 798;
	}
	/**关闭界面 */
	public dispose()
	{
		this.code = null;
		super.dispose();
	}
}