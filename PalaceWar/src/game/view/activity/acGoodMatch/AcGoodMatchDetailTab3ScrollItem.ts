/**
 * 奖池item
 * @author ycg
 */
class AcGoodMatchDetailTab3ScrollItem extends ScrollListItem {
    private _aid:string = null;
    private _code:string = null;

    public constructor() {
        super();
    }

    private get cfg():Config.AcCfg.GoodMatchCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcGoodMatchVo{
        return <AcGoodMatchVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
    
    protected initItem(index: number, data: any, itemParam: any) {
        this._aid = itemParam.aid;
        this._code = itemParam.code;

        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("acgoodmatch_pooltitlebg");
        this.addChild(titleBg);
        titleBg.x = bg.x + 5;
        titleBg.y = 7;
        
        //title txt
        let titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTitle"+data.id, this.getTypeCode()));
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = titleBg.x + 15;
        titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2;
        this.addChild(titleTxt);

        let rewardIconList = GameData.getRewardItemIcons(data.getRewards, true, true);
		let scale = 0.65;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + (bg.width - 180 - (itemWidth * scale + spaceX) * 4 + spaceX)/2 + 14;
        let stY = titleBg.y + titleBg.height + 15;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 180;
		rewardBg.x = bg.x + 15;
		rewardBg.y = stY - 5;
        this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 4)), stY + 5 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 4)));
			this.addChild(rewardDB);
        }
        
        rewardBg.height = (rewardIconList.length % 4 == 0 ? rewardIconList.length / 4 : Math.ceil(rewardIconList.length / 4)) * (itemHeight * scale + spaceY) - spaceY + 20;

		let bgHeight = rewardBg.y + rewardBg.height + 15;
        bg.height = bgHeight;

        let poolId = this.vo.getPoolRewardId();
        if (data.id == poolId){
            let selectedFlag = BaseBitmap.create("acgoodmatch_selected");
            // selectedFlag.setScale(0.7);
            selectedFlag.setPosition(bg.x + bg.width - selectedFlag.width * selectedFlag.scaleX - 15, bg.y + bg.height/2 - selectedFlag.height * selectedFlag.scaleY / 2 + 20);
            this.addChild(selectedFlag);
        }
        else{
            let selBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acGoodMatchPoolSelect", this.getTypeCode()), ()=>{
                if (!this.vo.isInActivity()){
                    this.vo.showAcEndTip();
                    return ;
                }
                if (this.vo.getCurrBallNum() != 16){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchPoolTip3", this.getTypeCode())));
                    return ;
                }
                NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_SELECTPOOL, {activeId: this.vo.aidAndCode, matchtype: data.id});
            }, this);
            selBtn.setPosition(bg.x + bg.width - selBtn.width - 15, bg.y + bg.height/2 - selBtn.height/2 + 20);
            this.addChild(selBtn);
            if (this.vo.getCurrBallNum() != 16){
                App.DisplayUtil.changeToGray(selBtn);
            }
            else{
                App.DisplayUtil.changeToNormal(selBtn);
            }
        }
		this.height = bg.y + bg.height + this.getSpaceY();
    }

    public getSpaceX(): number {
        return 0;
    }
	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 5;
    }
    
    public dispose(): void {
        this._aid = null;
        this._code = null;
        super.dispose();
    }
}