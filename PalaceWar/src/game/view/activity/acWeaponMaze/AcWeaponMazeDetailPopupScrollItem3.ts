/**
  * 奖池
  * author ycg
  * date 2020.4.27
  * @class AcWeaponMazeDetailPopupScrollItem3
  */
 class AcWeaponMazeDetailPopupScrollItem3 extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	public constructor() {
		super();
    }
    
    private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void {
		this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;

		this.width = 530;
		let bg = BaseBitmap.create("public_popupscrollitembg");
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);

        let leftBg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_poolbox"+data.type, this.getTypeCode()));
        bg.height = leftBg.height + 30;
		leftBg.x = bg.x + 10;
		leftBg.y = bg.y + bg.height/2 - leftBg.height/2;
        this.addChild(leftBg);

        let titleBg = BaseLoadBitmap.create(`countrywarrewardview_itembg`);
        titleBg.width = bg.width - leftBg.x - leftBg.width - 10;
        titleBg.height = 30;
        this.addChild(titleBg);
        titleBg.x = leftBg.x + leftBg.width + 10;
        titleBg.y = bg.y + 10; 

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponMazeDetailPoolItemtitle"+data.type, this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height / 2 - titleTF.height / 2 + 3)
		this.addChild(titleTF);

        let rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - leftBg.x - leftBg.width - 10;
        rewardBg.height = 200;
		rewardBg.x = leftBg.x + leftBg.width + 10;
		rewardBg.y = titleBg.y + titleBg.height + 5;
        this.addChild(rewardBg);

        let rewards = data.rewards;
		let rewardIconList = GameData.getRewardItemIcons(rewards, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = rewardBg.x + (rewardBg.width - (itemWidth * scale + spaceX) * 3 + spaceX)/2;
        let stY = rewardBg.y + 10;
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 3)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 3)));
			this.addChild(rewardDB);
        } 
        this.height = bg.height + this.getSpaceY();
	}
	
	public getSpaceY():number {
		return 5;
	}

	public dispose():void {
		this._itemData = null;
		this._aid = null;
		this._code = null;
		super.dispose();
	}
}