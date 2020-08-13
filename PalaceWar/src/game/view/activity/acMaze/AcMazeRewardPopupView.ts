/**
  * 赵云物品展示
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRewardPopupView
  */
class AcMazeRewardPopupView extends PopupView{
	public constructor() {
		super();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.MazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	public initView()
	{
		let type = this.param.data.type;
		let pool = this.vo.getMazePool()[type];
		let rewardPool = this.cfg.typePool(pool);
		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 518;
		bg.height = 350;
		bg.setPosition(this.getShowWidth() / 2 - bg.width / 2,10);
		this.addChildToContainer(bg);

		let detailTF = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewRewardDetailTitle"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		detailTF.setPosition(bg.x + bg.width / 2 - detailTF.width / 2,bg.y + 20);
		this.addChildToContainer(detailTF);

		let itembg = BaseBitmap.create("public_9_bg44");
		itembg.width = 492;
		itembg.height = 257;
		itembg.setPosition(detailTF.x + detailTF.width / 2 - itembg.width / 2,detailTF.y + detailTF.height + 20);
		this.addChildToContainer(itembg);
		for(let i = 0; i < rewardPool.length;i++)
		{
			let rewardVo = GameData.formatRewardItem(rewardPool[i][0])[0];
			let rewardItem = GameData.getItemIcon(rewardVo,true,true);
			// rewardItem.anchorOffsetX = rewardItem.width / 2;
			rewardItem.anchorOffsetY = rewardItem.height / 2;
			
			rewardItem.setPosition(itembg.x + itembg.width / 2 + (((i % 4) - 2)*((rewardItem.width + 10))) + 5 ,itembg.y + Math.floor(i / 4) * (rewardItem.height + 22) + rewardItem.height / 2  + 10);
			this.addChildToContainer(rewardItem);		
		}

		this.setConfirmBtnPosition(this.getShowWidth()/2 - 75,this.viewBg.height - this.getContainerY() - 55 - 1150)


	}
	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}
	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
	protected getShowHeight():number
	{
		return 498;
	}
	// 确认按钮名称
	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
	public dispose()
	{
		super.dispose();
	}
	
}