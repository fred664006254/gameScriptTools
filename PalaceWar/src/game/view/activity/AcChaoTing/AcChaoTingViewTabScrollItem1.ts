/**
 * 排行奖励item
 * author ycg
 * date 2020.3.24
 */
class AcChaoTingViewTabScrollItem1 extends ScrollListItem{
    private _code:string = null;
    private _aid:string = null;

    public constructor(){
        super();
    }

    public initItem(index:number, data:any, param:any):void{
        let aid = param.aid;
        let code = param.code;
        this._aid = aid;
		this._code = code;

		let vo = <AcChaoTingVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		this.width = 640;
		let bgImg = ResourceManager.hasRes("acchaoting_itembg-"+this.getTypeCode()) ? "acchaoting_itembg-"+this.getTypeCode() : "acchaoting_itembg-1";
		let bg = BaseBitmap.create(bgImg);
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);
		let offHeight = 0;
		if (index < 3){
			let titleBgImg = ResourceManager.hasRes("acchaoting_ranktitle"+(index+1)+"-"+this.getTypeCode()) ? "acchaoting_ranktitle"+(index+1)+"-"+this.getTypeCode() : "acchaoting_ranktitle"+(index+1)+"-1";
			let titleBg = BaseBitmap.create(titleBgImg);
			titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, 0);
			bg.y = titleBg.y + titleBg.height - 34;
			this.addChild(titleBg);
			offHeight = titleBg.height - 34;

			let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankRewardRank" + (index+1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			titleTf.setPosition(titleBg.x + titleBg.width / 2 - titleTf.width / 2, titleBg.y + 47);
			this.addChild(titleTf);
		}
		else{
			let titleTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingRankRewardRank4", [""+data.rank[0], ""+data.rank[1]]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			titleTf.setPosition(bg.x + bg.width / 2 - titleTf.width / 2, bg.y + 6);
			this.addChild(titleTf);
		}

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let scale = 0.95;
		let itemHeight = 108;
		let itemWidth = 108;
		let spaceX = 14;
		let spaceY = 12;
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(bg.x + 21 + ((rewardDB.width * scale + spaceX) * (i % 5)), bg.y + 45 + ((rewardDB.height * scale + spaceY) * Math.floor(i / 5)));
			this.addChild(rewardDB);
		}
		let bgHeight = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.ceil(rewardVoList.length / 5)) * (itemHeight * scale + spaceY) - spaceY + 45 + 20;
		if (bgHeight > bg.height){
			bg.height = bgHeight;
		}
		this.height = bg.height + offHeight + this.getSpaceY();
    }

    private getTypeCode():string{
        return this._code;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
		this._aid = null;
		this._code = null;
        super.dispose();
    }
}