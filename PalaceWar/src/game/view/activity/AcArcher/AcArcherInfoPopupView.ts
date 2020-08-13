/**
  * 黄忠属性说明
  * author 张朝阳
  * date 2018/7/2
  * @class AcArcherInfoPopupView
  */
class AcArcherInfoPopupView extends PopupView{
	public constructor() {
		super();
	}

	/**
	 * 初始化view
	 */
	public initView()
	{
		let infobg:BaseBitmap = BaseBitmap.create("acarcherview_info");
		infobg.setPosition(this.getShowWidth() / 2 - infobg.width / 2,0);
		this.addChildToContainer(infobg);

		let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById("2018");
		if(servantCfg.quality2)
		{	
			let cornerImg = Api.servantVoApi.getCornerMarkerContainer(servantCfg.quality2);
			cornerImg.x = 30+GameData.popupviewOffsetX;
			cornerImg.y = 250;
			cornerImg.setScale(1.3);
			this.addChildToContainer(cornerImg);
		}
	}
	/**标题 */
	protected getTitleStr():string
	{
		return "acArcherInfoTitle";
	}
	/**
	 * 设置当前高度
	 */
	protected getShowHeight():number
	{
		return 395+9;
	}
	/**关闭界面 */
	public dispose()
	{
		super.dispose();
	}
}