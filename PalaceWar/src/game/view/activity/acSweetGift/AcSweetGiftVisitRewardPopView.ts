/**
 * 活动奖励
 * author yangchengguo
 * date 2019.8.21
 * @class AcSweetGiftVisitRewardPopView
 */
class AcSweetGiftVisitRewardPopView extends PopupView{
    public _visitedFlag:BaseBitmap = null;
    public _visitBtn:BaseButton = null;
    public constructor(){
        super();
    }

    public initView():void{
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.requestCallback, this);
        let dataList = this.cfg.getAchievementList();
        let data = dataList[Number(this.id) - 1];
        // let topStr1 = LanguageManager.getlocal("sweetgiftVisitGetScoreInfo-"+this.code, [String(data.needNum)]);
        // let topTxt1 = ComponentManager.getTextField(topStr1, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		// topTxt1.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt1.width/2, 10);
        // this.addChildToContainer(topTxt1);
        
        let buildingName = LanguageManager.getlocal("sweetgiftBuildingName-"+this.code+"_"+this.id);
        let topStr2 = LanguageManager.getlocal("sweetgiftVisitGetRewardInfo-"+this.code, [buildingName]);
        let topTxt2 = ComponentManager.getTextField(topStr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // topTxt2.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt2.width/2, topTxt1.y + topTxt1.height + 5);
        topTxt2.setPosition(this.viewBg.x + this.viewBg.width/2 - topTxt2.width/2, 15);
		this.addChildToContainer(topTxt2);

		let listbg = BaseBitmap.create("public_9_probiginnerbg");
		listbg.width = 520;
		// listbg.height = 350;
		listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTxt2.y + topTxt2.height + 5);
        this.addChildToContainer(listbg);   

        let scrolNode : BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        let rewardArr = GameData.getRewardItemIcons(data.getReward, true, true);
		for(let i in rewardArr){
			let icon = rewardArr[i];
			let idx = Number(i);

			icon.x = 9 + (idx % 4) * (108 + 19);
			icon.y = 7 + Math.floor(idx / 4) * (108 + 8);
			scrolNode.addChild(icon);
		}
		scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;
		let rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5 , listbg.width - 20, listbg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect)
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = listbg.y + 5;
		scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);

        let visited = BaseBitmap.create("ac_sweetgift_visited");
        visited.setPosition(listbg.x + listbg.width/2 - visited.width/2, listbg.y + listbg.height + 10);
        this.addChildToContainer(visited);
        this._visitedFlag = visited;
        visited.visible = false;

        let visitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sweetgiftVisitName-"+this.code, () => {
            if ((!this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: this.vo.aidAndCode, rkey: Number(data.id) });
        }, this);
        visitBtn.setPosition(listbg.x + listbg.width/2 - visitBtn.width/2, listbg.y + listbg.height + 30);
        visitBtn.name = "visitBtn";
        this.addChildToContainer(visitBtn);
        this._visitBtn = visitBtn;
        visitBtn.visible = false;
        
        if (this.vo.isGetAchievementById(this.id)){
            visited.visible = true;
        }
        else{
            if (this.vo.getScore() >= data.needNum){
                visitBtn.visible = true;
            }
            else{
                let scoreBg = BaseBitmap.create("luckydrawiconbg-1");
                scoreBg.height = 40;
                scoreBg.setPosition(listbg.x + listbg.width/2 - scoreBg.width/2, listbg.y + listbg.height + 25);
                this.addChildToContainer(scoreBg);
                let scoreIcon = BaseBitmap.create("ac_sweetgift_gift_icon-"+this.getTypeCode());
                scoreIcon.setScale(1);
                scoreIcon.setPosition(scoreBg.x + 80, scoreBg.y + scoreBg.height /2 - scoreIcon.height /2);
                this.addChildToContainer(scoreIcon);
                let score = ComponentManager.getTextField(this.vo.getScore() + "/" + data.needNum, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                score.setPosition(scoreIcon.x + scoreIcon.width*1 + 8, scoreBg.y + scoreBg.height/2 - score.height/2 + 5);
                this.addChildToContainer(score);
            }
        }
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (this.vo.isGetAchievementById(this.id)){
            this._visitedFlag.visible = true;
            this._visitBtn.visible = false;
        }
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

	private get cfg():Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get id():string{
        return this.param.data.id;
    }

    protected getBgExtraHeight():number
	{
		return 10;
    }
    
    // protected getShowHeight():number{
	// 	return 550;
	// }

     /**标题 */
	protected getTitleStr():string
	{
		return "sweetgiftVisitRewardTitle";
	}
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "ac_sweetgift_visited", "luckydrawiconbg-1",
            "ac_sweetgift_gift_icon-"+this.getTypeCode(),
		]);
	}

     public dispose(){
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.requestCallback, this);
        this._visitBtn = null;
        this._visitedFlag = null;
        super.dispose();
     }
}