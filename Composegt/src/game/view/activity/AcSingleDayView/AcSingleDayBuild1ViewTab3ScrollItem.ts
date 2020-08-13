/**
 * 双11  累计消费 item
 * @author 张朝阳
 * date 2018/10/24
 * @class AcSingleDayBuild1ViewTab3ScrollItem
 */
class AcSingleDayBuild1ViewTab3ScrollItem extends ScrollListItem {

	private _progressBar:ProgressBar = null;

	private _receiveBtn:BaseButton = null;

	private _receiveBM:BaseBitmap = null;

	private _consumeBtn:BaseButton = null;
	private vo: AcSingleDayVo = null;
	private _data = null;
	public constructor() {
		super();
		
	}

	protected initItem(index:number,data:any,itemParm: any){
		this.vo = itemParm.vo;
		this._data = data;
		let bg = BaseBitmap.create("public_9v_bg04");
		bg.width = GameConfig.stageWidth - 20;
		this.addChild(bg);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab3ItemTitle",[data.needGem]),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xa87e00);
		titleTxt.setPosition(bg.x + bg.width / 2 - titleTxt.width / 2,bg.y + 15);
		this.addChild(titleTxt);

		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.setPosition(titleTxt.x - leftLine.width - 10,titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
		this.addChild(leftLine);

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.anchorOffsetX = rightLine.width / 2;
		rightLine.anchorOffsetY = rightLine.height / 2;
		rightLine.rotation = 180;
		rightLine.setPosition(titleTxt.x + titleTxt.width + rightLine.width / 2 + 10,titleTxt.y + titleTxt.height / 2);
		this.addChild(rightLine);

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let rewardBg = BaseBitmap.create("public_listshotbg");
		rewardBg.width = bg.width ;
		rewardBg.height = 30 + 115 * (Math.floor(rewardVoList.length / 6) + 1);
		rewardBg.setPosition(bg.x,titleTxt.y + titleTxt.height + 10);
		this.addChild(rewardBg);
		bg.height = rewardBg.height + 125;
		for(let i = 0;i < rewardVoList.length;i++)
		{
			let itemDB = GameData.getItemIcon(rewardVoList[i],true,false);
			itemDB.setPosition(rewardBg.x + 15 + (itemDB.width + 15) * (i % 5),rewardBg.y + 15 + (itemDB.height + 15) * Math.floor(i / 5));
			this.addChild(itemDB);
		}

		this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",435);
		this._progressBar.setPosition(rewardBg.x + 15,rewardBg.y + rewardBg.height + 30);
		this.addChild(this._progressBar);
		this._progressBar.setPercentage(this.vo.getUseGemNum() / Number(data.needGem), LanguageManager.getlocal("acSingleDayBuild1ViewTab2ItemProgressText", [this.vo.getUseGemNum(), data.needGem]));

		this._receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.rechargeClick,this);
		this._receiveBtn.setPosition(rewardBg.x + rewardBg.width - this._receiveBtn.width - 20,rewardBg.y + rewardBg.height + 15);
		this.addChild(this._receiveBtn)

		this._consumeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acSingleDayBuild1ViewTab3ItemGoConsume",this.consumeClick,this);
		this._consumeBtn.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._consumeBtn.width / 2,this._receiveBtn.y + this._receiveBtn.height / 2 - this._consumeBtn.height / 2);
		this.addChild(this._consumeBtn)

		this._receiveBM = BaseBitmap.create("collectflag");
		this._receiveBM.setPosition(this._receiveBtn.x + this._receiveBtn.width / 2 - this._receiveBM.width / 2,this._receiveBtn.y + this._receiveBtn.height / 2 - this._receiveBM.height / 2);
		this.addChild(this._receiveBM);

		if (this.vo.isGetConsume(data.key)) {
			this._receiveBM.setVisible(true);
			this._receiveBtn.setVisible(false);
			this._consumeBtn.setVisible(false);

		}
		else if (this.vo.getUseGemNum() >= Number(data.needGem)) {
			this._receiveBM.setVisible(false);
			this._receiveBtn.setVisible(true);
			this._consumeBtn.setVisible(false);
		}
		else {
			this._consumeBtn.setVisible(true);
			this._receiveBM.setVisible(false);
			this._receiveBtn.setVisible(false);
			if(!this.vo.isInActivity())
			{
				this._consumeBtn.setEnable(false);
			}
		}

	}
	private consumeClick()
	{
		if(this.vo.isActivityEnd())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{aid:this.vo.aid,code:this.vo.code});
	}
	private rechargeClick()
	{
		if(this.vo.isActivityEnd())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}
		NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_REWARD, { activeId:this.vo.aidAndCode,mType: 1, rkey: this._data.key })
	}
	private refreashView()
	{

	}
	public dispose(): void {
		this._progressBar = null;
		this._receiveBM = null;
		this._receiveBtn = null;
		this.vo = null;
		this._data = null;
		this._consumeBtn = null;
		super.dispose();
	}


}