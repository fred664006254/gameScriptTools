/**
 * 真情好礼item
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewScrollItem2
 */
class AcFirstSightLoveViewScrollItem2 extends ScrollListItem{
    public _aid:string = null;
    public _code:string = null;
    public _vo:any = null;

    public constructor(){
        super();
    }

    public initItem(index: number, data: any, itemParam: any):void{
        this._aid = itemParam.aid;
		this._code = itemParam.code;
		let id = itemParam.id;
	 	let vo = <AcFirstSightLoveVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code); 
        this._vo =  vo;
        
        let itemBgStr = ResourceManager.hasRes("ac_firstsightlove_truth_itembg-"+this.getTypeCode()) ? "ac_firstsightlove_truth_itembg-"+this.getTypeCode() : "ac_firstsightlove_truth_itembg-1";
        let itemBg:BaseBitmap = BaseBitmap.create(itemBgStr); 
        
        //奖励次数提示
        // if (data.needReward){
        //     let spTipBg = BaseBitmap.create("");
        //     spTipBg.width = itemBg.width;
        //     this.addChild(spTipBg);
        //     let spTip = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthRewardNum_1-"+this.getTypeCode(), [String(1111)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        //     spTip.width = spTipBg.width - 20;
        //     spTip.setPosition(spTipBg.x + 10 ,spTipBg.y + 5);
        //     this.addChild(spTip);
        //     spTipBg.height = spTip.height + 10;
        //     spTipBg.setPosition(0, 0);            
        //     itemBg.y = spTipBg.y + spTipBg.height;    
        // }
        this.addChild(itemBg); 
        this.width = itemBg.width;
        this.height = itemBg.height;

		let titleBg = BaseBitmap.create("common_titlebg");
		titleBg.setPosition(itemBg.x + 15, itemBg.y + 5);
		this.addChild(titleBg);

        //标题
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_1"+"-" + this.getTypeCode(), [String(data.needFavor)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + 10, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
        this.addChild(titleTF);
        titleBg.width = titleTF.width + 40;
       
        let rewardVoList: RewardItemVo[] = GameData.formatRewardItem(data.getReward);
        let spBg = BaseBitmap.create("ac_firstsightlove_special_itembg");
        spBg.setPosition(itemBg.x + itemBg.width - spBg.width - 20, itemBg.y + itemBg.height/2 - spBg.height/2 - 20);
        this.addChild(spBg);

        let rewardDB = GameData.getItemIcon(rewardVoList[0], true, false);
        rewardDB.x = spBg.x + spBg.width/2 - rewardDB.width/2;
        rewardDB.y = spBg.y + spBg.height/2 - rewardDB.height/2;
        let b = rewardDB.getChildByName("iconBg");
        if(b){
            b.alpha = 0;
        }
        let numLb = rewardDB.getChildByName("numLb");
        numLb.x = 80;
        numLb.y = 80;
        this.addChild(rewardDB);
        if (rewardDB.getChildByName("numbg"))
        {
            rewardDB.getChildByName("numbg").visible = false;
        }

        let anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim",10,70);
        anim.x = rewardDB.x + rewardDB.width/2 - 190/2;
        anim.y = rewardDB.y + rewardDB.height/2 - 190/2;
        anim.blendMode = egret.BlendMode.ADD; 
        this.addChild(anim);
        anim.playWithTime(-1);
        if (rewardVoList[0].type == 11 && rewardVoList[0].id == 4033){
            //衣装预览
            let btnContainer = this.getSkinBtnContainer(rewardVoList[0].id, rewardVoList[0].type);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, spBg.y + 50);
        }

		let rewardScale = 0.83;
		for (let i = 1; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itemBg.x + 30 + (i-1) * (rewardDB.width * rewardScale + 15), titleBg.y + titleBg.height + 5);
			this.addChild(rewardDB);
        }

        //special tip
        if (data.isSpecial == 1){
            let specialTip = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveTruthSpecialTip-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
            specialTip.textAlign = TextFieldConst.ALIGH_CENTER;
            specialTip.width = 400;
            specialTip.lineSpacing = 5;
            specialTip.setPosition(30, itemBg.y + itemBg.height - 105);
            this.addChild(specialTip);
        }

        //person tip
        let personTipBg = BaseBitmap.create("public_9_bg87");
        // personTipBg.y = itemBg.y + itemBg.height - 105;
        personTipBg.y = itemBg.y + itemBg.height - personTipBg.height - 20;
        if (data.isSpecial == 0){
            personTipBg.y = itemBg.y + itemBg.height - personTipBg.height - 40;
        }
        this.addChild(personTipBg);
        let personTip = ComponentManager.getTextField(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_2"+"-" + this.getTypeCode(), [String(data.needFavor1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		// personTip.setPosition(titleBg.x + 15, itemBg.y + itemBg.height - personTip.height - 30);
        this.addChild(personTip);
        personTipBg.width = personTip.width + 60;
        personTipBg.x = itemBg.x + (itemBg.width - 120)/2 - personTipBg.width/2;
        personTip.setPosition(personTipBg.x + personTipBg.width/2 - personTip.width/2, personTipBg.y + personTipBg.height/2 - personTip.height/2);

        if (vo.getCurrLove() >= data.needFavor1){
            personTip.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }

        //按钮
        if (vo.getAchieveRewardById(data.id)){ 
			//已领取
			let collectflag = BaseBitmap.create("collectflag");
			collectflag.setScale(0.6);
            // collectflag.setPosition(itemBg.x + (itemBg.width -120)/2 - collectflag.width * 0.6/2, itemBg.y + itemBg.height - collectflag.height * 0.5 - 15);
            collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.6 - 25, itemBg.y + itemBg.height - collectflag.height * 0.5 - 15);
			this.addChild(collectflag); 
		}
		else{
            let totalLove = vo.getTotalLove();
			let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', () => {
				if (!vo.isStart) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
                }
                if (totalLove < data.needFavor){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_1"+"-"+this.getTypeCode(), [""+data.needFavor]));
                    return;
                }
                App.LogUtil.log("vo.getCurr: "+vo.getCurrLove()+ " fav1: "+data.needFavor1);
                if (vo.getCurrLove() < data.needFavor1){
                    App.CommonUtil.showTip(LanguageManager.getlocal("acFristSightLoveTruthItemTitle_3"+"-"+this.getTypeCode(), [""+data.needFavor1]));
                    return;
                }
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETREWARD, { activeId: vo.aidAndCode, rkey: data.id });
			}, this);
            // receiveBtn.setPosition(itemBg.x + (itemBg.width - 120)/2 - receiveBtn.width/2, itemBg.y + itemBg.height - receiveBtn.height - 20);
            receiveBtn.setPosition(itemBg.x + itemBg.width - receiveBtn.width - 25, itemBg.y + itemBg.height - receiveBtn.height - 20);
            this.addChild(receiveBtn);
            if (totalLove >= data.needFavor && vo.getCurrLove() >= data.needFavor1){
                receiveBtn.setGray(false);
            }
            else{
                receiveBtn.setGray(true);
            }
        }
    }

    //衣装预览按钮
    private getSkinBtnContainer(id:number|string, type:number|string, isOther?:boolean):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        // skinTxtEffect.touchEnabled = false;
        
        let skinTxtStr = "acgiftreturnview_common_skintxt";
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
		// skinTxt.touchEnabled = false;

		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		// skinTxteffect.touchEnabled = false;
		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        
		touchPos.addTouchTap(() => {
			let titleId = Config.TitleCfg.formatRewardItemVoStr(id);
            let data = {data:[
				{idType: titleId}
            ], showType:""};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }

    public getTypeCode():string{
        return this._code;
    }

    public dispose():void{
        this._aid = null;
        this._code = null;
        this._vo = null;
        super.dispose();
    }
}