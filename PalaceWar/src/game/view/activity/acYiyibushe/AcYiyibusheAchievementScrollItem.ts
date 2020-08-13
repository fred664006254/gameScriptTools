/**
 * 进度奖励
 * author ycg
 * date 2019.10.14
 * @class AcYiyibusheAchievementScrollItem
 */
class AcYiyibusheAchievementScrollItem extends ScrollListItem{
    public _data:any;
    public _aid:string;
    public _code:string;
    public _vo:any;

    public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
        this._data = data;
		this._aid = itemParam.aid;
		this._code = itemParam.code;
		let id = itemParam.id;
	 	let tmpVo = <AcYiyibusheVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code); 
		this._vo =  tmpVo;
	 
		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		itemBg.width = 540;
		this.addChild(itemBg); 

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = itemBg.width;
		titleBg.height = 35;
		titleBg.setPosition(itemBg.x + itemBg.width / 2 - itemBg.width / 2, itemBg.y + 10);
		this.addChild(titleBg);

		//标题
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheAchieveRewardItemTitle-"+this.getTypeCode(),[String(data.needNum)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += (titleTF.width + 10);
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        
        //奖励背景
		let rewardBg = BaseBitmap.create("public_9_bg21");
		rewardBg.width = itemBg.width - 14;
		rewardBg.setPosition(7, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);
        
        let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(data.getReward);
		let rewardScale = 0.83;
		let itemHeight:number = 0;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
			rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 15) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
			this.addChild(rewardDB);
			itemHeight = rewardDB.height * rewardScale + 15;
		}
		let offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        rewardBg.height = offsetH + 10;
		itemBg.height += offsetH - 20;
		
		//进度条标题
		let proTitle = ComponentManager.getTextField(LanguageManager.getlocal("acYiyibusheAchieveCurTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		proTitle.y = rewardBg.y + rewardBg.height + 10;
		this.addChild(proTitle);
		
		//进度条
		let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 360);
		itemBg.height += progress.height + 35;
		progress.setPosition(rewardBg.x + 5, proTitle.y + proTitle.height + 4);
		this.addChild(progress);
		proTitle.x  = progress.x + progress.width/2 - proTitle.width/2;
		let currNum = tmpVo.getScore();
		progress.setPercentage(currNum / data.needNum, currNum + "/" + data.needNum, TextFieldConst.COLOR_LIGHT_YELLOW);

		//按钮
		let status = tmpVo.getAchievementStatusById(data.id);
		if (status == 2){ 
			//已领取
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.setScale(0.6);
			collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.6 - 10, itemBg.y + itemBg.height - collectflag.height * 0.6 - 5);
			this.addChild(collectflag); 
		}
		else{
			let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', () => {
				if (!tmpVo.isStart) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				App.LogUtil.log("data.id: "+data.id);
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACYIYIBUSHE_PLAYSTORY, {id:data.id})
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_YIYIBUSHE_GETREWARD, { activeId: tmpVo.aidAndCode, rkey: data.id });
			}, this);
			receiveBtn.setPosition(itemBg.x + itemBg.width - receiveBtn.width - 15, progress.y + progress.height/2 - receiveBtn.height / 2 - 5);
			this.addChild(receiveBtn);

			if (status == 1) {
				receiveBtn.setEnable(true);
				receiveBtn.setGray(false);
			}
			else {
				receiveBtn.setEnable(false);
				receiveBtn.setGray(true);
			}
		}
		this.height = itemBg.height;

		if (id && id == data.id) {
			let light = BaseBitmap.create("public_9_bg57")
			light.width = itemBg.width + 10;
			light.height = itemBg.height + 14;
			light.setPosition(itemBg.x - 6, itemBg.y - 6);
			this.addChild(light);
			egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		}
	}

	public getTypeCode():string{
		return this._code;
	}
	
	public getSpaceY():number{
		return 10;
	}

    public dispose():void{
		this._data = null;
		this._aid = null;
		this._code = null;
		this._vo = null;
        super.dispose();
    }
}