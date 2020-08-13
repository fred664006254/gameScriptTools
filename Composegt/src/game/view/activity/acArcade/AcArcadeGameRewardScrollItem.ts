/**
  * 拉霸机奖池item
  * author 张朝阳
  * date 2019/6/12
  * @class AcArcadeGameRewardScrollItem
  */
class AcArcadeGameRewardScrollItem extends ScrollListItem {
	private _itemData: Config.AcCfg.ArcadePoolItemCfg = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor() {
		super();
	}
	protected getCnCode(): string {
		let code = this._aidAndCode.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {

		this._itemData = data;
		this._aidAndCode = itemParam;

		let bg = BaseBitmap.create("activity_db_01");
		bg.width = 520;
		this.addChild(bg);

		let titleBg = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
		titleBg.width = 510;
		titleBg.height = 33;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 6);
		this.addChild(titleBg);

		let tilteTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameRewardScrollItemTitle" + this._itemData.id + "-" + this.getCnCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		if(index == 0){
			let titleBg2 = BaseBitmap.create("arcadegame_topbg_2"); //
			titleBg2.width = titleBg.width;
			titleBg2.height = titleBg.height;
			titleBg2.setPosition(bg.x + bg.width / 2 - titleBg2.width / 2, bg.y+4 );
			this.addChild(titleBg2);
			tilteTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		}
		tilteTF.setPosition(titleBg.x + titleBg.width / 2 - tilteTF.width / 2, titleBg.y + titleBg.height / 2 - tilteTF.height / 2);
		this.addChild(tilteTF);

		let tilteTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeGameReward_display_txt"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		tilteTF2.setPosition(titleBg.x + 20, titleBg.y + titleBg.height +8);
		this.addChild(tilteTF2);

		let offsetH = 0;
		let rewardScale = 0.8;
		let itemScale = 0.8;
		let itemHeight: number = 0;
		let num = 4;
		if(index == 0){
			let public_listshotbg =  BaseBitmap.create("public_listshotbg"); //
			public_listshotbg.setPosition(tilteTF2.x-10, tilteTF2.y + 25);
			public_listshotbg.width = 490;
			this.addChild(public_listshotbg);  

			let prizePool = this._itemData.prizePool;
			offsetH = tilteTF2.y + 30;
			for (var index = 0; index < prizePool.length; index++) {
				let bg2 = BaseBitmap.create("acarcadeview_logdown-1"); //
				bg2.setPosition(tilteTF2.x , offsetH);
				rewardScale = 0.6;
				bg2.setScale(rewardScale);
				this.addChild(bg2);
				
				let arrowsp = BaseBitmap.create("acarcadeview_arrow"); //
				arrowsp.setPosition(bg2.x + bg2.width * rewardScale + 10 , bg2.y + bg2.height * rewardScale/2 - arrowsp.height/2);
				this.addChild(arrowsp);
				
				let rewards = prizePool[index][0];
				let rewardVo: RewardItemVo = GameData.formatRewardItem(rewards)[0];
				for (let i = 0; i < 4; i++) {
					let rewardDB = GameData.getItemIcon(rewardVo, true, true);
					itemScale = 0.55;
					rewardDB.setScale(itemScale);
					rewardDB.setPosition(bg2.x + (rewardDB.width * itemScale + 24) * i + 17, bg2.y + bg2.height / 2*rewardScale - rewardDB.height * itemScale / 2);
					this.addChild(rewardDB);
					itemHeight = rewardDB.height * rewardScale + 15;
					if(i == 3){
						rewardDB.setScale(0.8);
						rewardDB.x = bg.x + bg.width - rewardDB.width * 0.8 - 25 ;
						rewardDB.y = bg2.y + bg2.height/2*rewardScale - rewardDB.height * 0.8 /2 ;
					}
				}
				offsetH = bg2.y +  bg2.height*rewardScale+10;
			}
			public_listshotbg.height = offsetH + 5 - public_listshotbg.y;
			this.height = titleBg.height + offsetH ;
		}else{
			let rewards = this._itemData.rewardPoolList();
			let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(rewards);
			offsetH = tilteTF2.y + 30;
			let num = 5;
			for (let i = 0; i < rewardVoList.length ; i++) {
				let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
				rewardDB.setScale(itemScale);
				rewardDB.setPosition(titleBg.x + (i % num) * (rewardDB.width * itemScale + 11) + 25, titleBg.y + titleBg.height + Math.floor(i / num) * (rewardDB.height * itemScale + 20) + 40);
				this.addChild(rewardDB);
				itemHeight = rewardDB.height * itemScale + 15;
			}
			offsetH =  (Math.floor(rewardVoList.length / num) + 1) * itemHeight + 30;
			this.height = titleBg.height + offsetH + 40;
		}
		
		bg.height = this.height;

	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		super.dispose();
	}
}