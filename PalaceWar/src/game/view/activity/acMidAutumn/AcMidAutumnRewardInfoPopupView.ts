/**
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2018/8/30
  * @class AcMidAutumnRewardInfoPopupView
  */
class AcMidAutumnRewardInfoPopupView extends PopupView {

	public constructor() {
		super();
	}
	
	public initView()
	{
		let cfg = this.param.data.itemCfg;
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let topMsg = this.param.data.topMsg;
		let btnStatus = this.param.data.btnStatus;
		let lockTFKey = "ac" + aid + "lockTitle";
		if(code == '3' || code == '4' || code == '5' || code == '6'){
			lockTFKey = "ac" + aid + "lockTitle-" + code;
		}
		if (topMsg){
			lockTFKey = topMsg;
		}

		//public_9_probiginnerbg
		let lockTF = ComponentManager.getTextField(LanguageManager.getlocal(lockTFKey,[cfg.needNum]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
		lockTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - lockTF.width / 2 ,15)
		this.addChildToContainer(lockTF);

		let rewardBg = BaseBitmap.create("public_9_probiginnerbg")
		rewardBg.width = 526;
		rewardBg.height = 131;
		rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2,lockTF.y + lockTF.height + 15);
		this.addChildToContainer(rewardBg);

		let rewardVo = GameData.formatRewardItem(cfg.getReward);
		let itemHeight = 0;
		for(let i = 0;i < rewardVo.length;i++)
		{
			let itemDB = GameData.getItemIcon(rewardVo[i],true,true);
			let maxLength = rewardVo.length > 4?5:rewardVo.length + 1 ;
			let startWidth = (rewardBg.width - itemDB.width * (maxLength - 1))  / (maxLength);
			let posX = rewardBg.x + startWidth + 6 +  ((i % 4) * (itemDB.width + startWidth));
			let posY = rewardBg.y  + 15  + (Math.floor((i) / 4) * (itemDB.height + 10));
			itemDB.setPosition(posX, posY)
			this.addChildToContainer(itemDB);
			itemHeight = itemDB.height;
			
		}
		rewardBg.height += ((Math.floor((rewardVo.length) / 5)) * (itemHeight+ 10));
		if (btnStatus){
			if (btnStatus == "0"){
				//不可领取
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					
				}, this);
				reviceBtn.setPosition(rewardBg.x + rewardBg.width/2 - reviceBtn.width/2, rewardBg.y + rewardBg.height + 15);
				this.addChildToContainer(reviceBtn);
				reviceBtn.touchEnabled = false;
				reviceBtn.setGray(true);
			}
			else if (btnStatus == "2"){
				//已领取
				let reviceBM = BaseBitmap.create("collectflag");
				reviceBM.setPosition(rewardBg.x + rewardBg.width / 2 - reviceBM.width/2, rewardBg.y + rewardBg.height + 10);
				this.addChildToContainer(reviceBM);
			}
		}
	}
	
	protected getTitleStr():string
	{
		return "acMidAutumnRewardInfoTitle";
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"collectflag",
		]);
	}
	public dispose()
	{
		super.dispose();
	}
	
}