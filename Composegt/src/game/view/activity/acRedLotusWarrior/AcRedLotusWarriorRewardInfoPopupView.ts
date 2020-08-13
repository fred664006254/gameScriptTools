/**
  * 中秋活动奖励查看的弹板
  * @author 张朝阳
  * date 2018/8/30
  * @class AcRedLotusWarriorRewardInfoPopupView
  */
class AcRedLotusWarriorRewardInfoPopupView extends PopupView {

    private aid:string = null;
    private code :string = null;
	public constructor() {
		super();
	}
		/**获取资源数组 */
	protected getResourceList(): string[]
	{
		return super.getResourceList().concat(["itemeffect"
		]);
	}
	public initView()
	{
		let cfg = this.param.data.itemCfg;
		let aid = this.param.data.aid;
		let code = this.param.data.code;
        let islast = this.param.data.islast;
        this.aid = aid;
        this.code = code;

        let lockKey = null;
        if(islast == 1){
            lockKey = this.getDefaultCn("acredLotusWarriorlockLastTitle");
        } else {
            lockKey = this.getDefaultCn("acredLotusWarriorlockTitle");
        }
		let lockTF = ComponentManager.getTextField(LanguageManager.getlocal(lockKey,[cfg.needNum]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
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
	}
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }

	protected getTitleStr():string
	{
		return "acMidAutumnRewardInfoTitle";
	}
	public dispose()
	{
        this.aid = null;
        this.code = null;
		super.dispose();
	}
	
}