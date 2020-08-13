/**
 * 物资供应 item
 * author ycg
 * date 2020.5.27
 */
class SixSection1RechargeScrollItem extends ScrollListItem
{
    private _data:any = null;

	public constructor() 
	{
		super();
	}
	

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this.width = 620;
		this._data = data;

		let bg = BaseBitmap.create("public_scrollitembg"); //public_9_bg14
		bg.width = this.width - 20;
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeTitle", [""+data.needGem]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += (titleTF.width + 40);
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);

		let reward = data.getReward;
		let rewardArr =  GameData.formatRewardItem(reward);
        let itemicon = null;
        let baseWidth = 108;
        let spaceX = 8;
        let spaceY = 12;
		let scale = 1;

		let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = titleBg.y + titleBg.height + 5;
		this.addChild(rewardBg);

		let stX = (rewardBg.width - (5 * (baseWidth * scale + spaceX) - spaceX)) /2 + rewardBg.x;
		let rowNum = Math.ceil(rewardArr.length / 5);
		rewardBg.height = rowNum * (baseWidth * scale + spaceY) + spaceY;
        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
			itemicon.x = stX + (itemicon.width * scale + spaceX)*(i % 5);
            itemicon.y = rewardBg.y + spaceY + Math.floor(i / 5) * (itemicon.height * scale + spaceY);
           	this.addChild(itemicon);
        }
        
        bg.height = rewardBg.y + rewardBg.height + 75;
        //进度条
		let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 410);
		progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        
		let currChargeGem = Api.sixsection1VoApi.getRechargeNum();
		let progressStr = LanguageManager.getlocal("sixSection1RechargeProcess", [String(currChargeGem), ""+data.needGem]);
		progress.setPercentage(currChargeGem / data.needGem, progressStr, TextFieldConst.COLOR_WHITE);

		this.height = bg.height + this.getSpaceY();

		if (Api.sixsection1VoApi.isGetRechargeById(data.id)) {
			let reviceBM = BaseBitmap.create("collectflag");
			reviceBM.anchorOffsetX = reviceBM.width / 2;
			reviceBM.anchorOffsetY = reviceBM.height / 2;
			reviceBM.setScale(0.7);
			reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
			this.addChild(reviceBM);
		}
		else {
			if (currChargeGem >= data.needGem) {
				let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
					if ((!Api.sixsection1VoApi.isInPeriousTime())) {
						App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, {rkey: data.id});
				}, this);
				reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
				this.addChild(reviceBtn);
			}
			else {
				let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", () => {
					if ((!Api.sixsection1VoApi.isInPeriousTime())) {
						App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1EndTip"));
						return;
					}
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				}, this);
				chargeBtn.setPosition(bg.x + bg.width - chargeBtn.width - 15, bg.y + bg.height - chargeBtn.height - 15);
				this.addChild(chargeBtn);
				if ((!Api.sixsection1VoApi.isInPeriousTime())) {
                    chargeBtn.setGray(true);
                }
			}
		}
	}
	
	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
	{
		this._data = null;

		super.dispose();
	}
}