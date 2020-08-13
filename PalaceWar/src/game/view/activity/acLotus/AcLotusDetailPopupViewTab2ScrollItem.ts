/**
 * 进度奖励item
 * @author ycg
 */
class AcLotusDetailPopupViewTab2ScrollItem extends ScrollListItem {
    private itemParam: any = null;

    public constructor() {
        super();
    }

    private get cfg() : Config.AcCfg.LotusCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcLotusVo{
        return <AcLotusVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected get aid() {
        return this.itemParam.aid;
    }
    protected get code() {
        return this.itemParam.code;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    protected initItem(index: number, data: any, itemParam: any) {
        this.itemParam = itemParam;

        this.width = 530;
        //item bg
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width/2 - bg.width/2;
        this.addChild(bg);

        let titleBg = BaseBitmap.create("ackite_processtitlebg-1");
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width/2 - titleBg.width/2;
        bg.y = titleBg.y + 13;
        
        //title txt
        let titleTxtStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusDetailProcessTitle", this.getTypeCode()), [""+data.specialnum]);;
        let titleTxt = ComponentManager.getTextField(titleTxtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width/2 - titleTxt.width/2;
        titleTxt.y = titleBg.y + 14;
        this.addChild(titleTxt);

        let rewardIconList = GameData.getRewardItemIcons(data.getReward, true, true);
		let scale = 0.8;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 10;
        let spaceY = 10;
        let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * 5 + spaceX)/2;
        let stY = bg.y + 45;
        let offHeight = 85;
        
        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = bg.width - 20;
		rewardBg.x = bg.x + bg.width/2 - rewardBg.width/2;
		rewardBg.y = stY - 10;
        this.addChild(rewardBg);
        
		for (let i = 0; i < rewardIconList.length; i++) {
            let rewardDB = rewardIconList[i];
			rewardDB.setScale(scale);
			rewardDB.setPosition(stX + ((rewardDB.width * scale + spaceX) * (i % 5)), stY + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let bgHeight = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + stY + offHeight;
		if (bgHeight > bg.height){
			bg.height = bgHeight;
        }
        rewardBg.height = (rewardIconList.length % 5 == 0 ? rewardIconList.length / 5 : Math.ceil(rewardIconList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 20;
        
        //进度条
        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 320);
        progress.setPosition(bg.x + 15, bg.y + bg.height - progress.height - 25);
        this.addChild(progress);
        let currNum = this.vo.getProcessNum();
        let progressStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acLotusDetailProcessNum", this.getTypeCode()), [String(currNum), String(data.specialnum)]);
        progress.setPercentage(currNum / data.specialnum, progressStr, TextFieldConst.COLOR_WHITE);

        if (this.vo.isGetAchieveRewardById(data.id)) {
            let reviceBM = BaseBitmap.create("collectflag");
            reviceBM.anchorOffsetX = reviceBM.width / 2;
            reviceBM.anchorOffsetY = reviceBM.height / 2;
            reviceBM.setScale(0.7);
            reviceBM.setPosition(bg.x + bg.width - reviceBM.width * 0.7 / 2 - 10, bg.y + bg.height - reviceBM.height * 0.7 / 2);
            this.addChild(reviceBM);
        }
        else{
            let reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => {
                if ((!this.vo.isStart)) {
                    this.vo.showAcEndTip();
                    return;
                }
                NetManager.request(NetRequestConst.REQUEST_ACLOTUS_GETREWARD, { activeId: this.vo.aidAndCode, rkey: data.id}); 
            }, this);
            reviceBtn.setPosition(bg.x + bg.width - reviceBtn.width - 15, bg.y + bg.height - reviceBtn.height - 15);
            this.addChild(reviceBtn);
            reviceBtn.setColor(TextFieldConst.COLOR_BLACK);
            if (currNum < data.specialnum){
                reviceBtn.setEnable(false);
            }
        }  
        
        if (itemParam.id && Number(itemParam.id) == Number(data.id)) {
			let light = BaseBitmap.create("public_9_bg57")
			light.width = bg.width + 10;
			light.height = bg.height + 16;
			light.setPosition(bg.x - 6, bg.y - 8);
			this.addChildAt(light, this.getChildIndex(bg) + 1);
			egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
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
        this.itemParam = null;
        super.dispose();
    }
}