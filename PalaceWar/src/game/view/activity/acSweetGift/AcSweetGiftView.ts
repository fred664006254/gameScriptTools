/**
 * 月夜仙缘
 * author yangchengguo
 * date 2019.8.19
 * @class AcSweetGiftView
 */
class AcSweetGiftView extends AcCommonView{
    public _bgContainer:BaseDisplayObjectContainer = null;
    public _timeBg:BaseBitmap = null;
    public _acTimeTf:BaseTextField = null;
    public _scoreNum:BaseTextField = null;
    // public _currHaveInfo:BaseDisplayObjectContainer = null;
    public _startY:number = 0;
    public _makeOneNeedDesc:BaseTextField = null;
    public _freeDesc:BaseTextField = null;
    public _isSelectMakeBtn:boolean = false;
    public _rewardBtn:BaseButton = null;
    public _isPlayTen:boolean = false;
    public _buildings:BaseDisplayObjectContainer[] = [];
    public _rabbit:BaseDisplayObjectContainer = null;
    public _isSelectVisitBtn:boolean = false;
    public _selectVisitIndex:number = -1;
    public _visitRewards:string = null;
    public _makeMultiNeedDesc:BaseTextField = null;
    public _makeOneNeedContainer:BaseDisplayObjectContainer = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.visitCallback, this);
        let bgStr = ResourceManager.hasRes("acsweetgift_bg-"+this.getTypeCode())?"acsweetgift_bg-"+this.getTypeCode():"acsweetgift_bg-1";
        //bg
        let bg = BaseBitmap.create(bgStr);
        let bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = bg.width;
        bgContainer.height = bg.height;
        this._bgContainer = bgContainer;
        this.addChildToContainer(bgContainer);
        bgContainer.addChild(bg);
        // bg.addTouch(this.moveBgHandler, this);

        let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        let noticescrollView = ComponentManager.getScrollView(bgContainer, rect);
        noticescrollView.bounces = false;
        noticescrollView.setPosition(0, 0);
        noticescrollView.verticalScrollPolicy = 'on';
        bgContainer.y = 0;
        noticescrollView.setShowArrow(false);
        this.addChildToContainer(noticescrollView);
        noticescrollView.setScrollTop(bgContainer.height - GameConfig.stageHeigth, 0);

        //desc
        let acDescBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        acDescBg.width = GameConfig.stageWidth;
        acDescBg.height = 155;
        acDescBg.setPosition(0, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        //介绍
        let acDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftDesc-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        acDesc.setPosition(20, acDescBg.y + acDescBg.height/2 - acDesc.height/2 - 12);
        if (acDesc.height > acDescBg.height){
            acDesc.y = acDescBg.y + 4;
        }
        this.addChildToContainer(acDesc);
        //日期
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftDate", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acDate.setPosition(acDesc.x, acDesc.y + acDesc.height + 6);
        this.addChildToContainer(acDate);
        //活动倒计时
		this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = acDescBg.y + acDescBg.height - this._timeBg.height / 2 - 2;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftTimeDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf); 
        //分数
        let scoreBg = BaseBitmap.create("public_9_resbg");
        scoreBg.setPosition(10, acDescBg.y + acDescBg.height + 15);
        this.addChildToContainer(scoreBg);
        //score icon
        let scoreIconImg = ResourceManager.hasRes("ac_sweetgift_gift_icon-"+this.getTypeCode())?"ac_sweetgift_gift_icon-"+this.getTypeCode():"ac_sweetgift_gift_icon-1";
        let scoreIcon = BaseBitmap.create(scoreIconImg);
        scoreIcon.setPosition(scoreBg.x - 3, scoreBg.y - 4);
        this.addChildToContainer(scoreIcon);
        //score num
        let scoreNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        scoreNum.setPosition(scoreIcon.x + scoreIcon.width + 10, scoreBg.y + scoreBg.height/2 - scoreNum.height/2);
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;

        //底部
        let bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = 640;
        bottomBg.height = 140;
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);
        bottomBg.name = "bottomBg";

        this.getSkinView(String(this.cfg.show1));
        this.getSkinView(String(this.cfg.show2));

        this.addChildToContainer(bottomBg);
        
        //底部按钮
        //制作一次
        let makeOneBtn = ComponentManager.getButton("btn_big_yellow", "sweetgiftMakeOne-"+this.code, this.makeBtnClick, this, ["0"]);
        makeOneBtn.setPosition(60, bottomBg.y + bottomBg.height - makeOneBtn.height - 35);
        this.addChildToContainer(makeOneBtn);

        //免费
        let freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftMakeFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(makeOneBtn.x + makeOneBtn.width/2 - freeDesc.width/2, makeOneBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;

        let makeOneNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(makeOneNeedContainer);
        let oneGemIcon = BaseLoadBitmap.create("itemicon1");
		oneGemIcon.width = 100;
        oneGemIcon.height = 100;
        oneGemIcon.setScale(0.5);
        makeOneNeedContainer.addChild(oneGemIcon);
        let makeOneNeedDesc = ComponentManager.getTextField(String(this.cfg.cost), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        makeOneNeedDesc.setPosition(oneGemIcon.x + oneGemIcon.width * oneGemIcon.scaleX, oneGemIcon.y + oneGemIcon.height * oneGemIcon.scaleY/2 - makeOneNeedDesc.height/2 + 4);
        makeOneNeedContainer.addChild(makeOneNeedDesc);
        makeOneNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + makeOneNeedDesc.width;
        makeOneNeedContainer.setPosition(makeOneBtn.x + makeOneBtn.width/2 - makeOneNeedContainer.width/2 - 2,  makeOneBtn. y - oneGemIcon.height * oneGemIcon.scaleY + 5);
        this._makeOneNeedContainer = makeOneNeedContainer;
        this._makeOneNeedDesc = makeOneNeedDesc;
        if (this.vo.isFree()){
            freeDesc.visible = true;
            makeOneNeedContainer.visible = false;
        }
        else{
            freeDesc.visible = false;
            makeOneNeedContainer.visible = false;
        }

        //制作十次
        let makeMultiBtn = ComponentManager.getButton("btn_big_yellow", "sweetgiftMakeMulti-"+this.code, this.makeBtnClick, this, ["1"]);
        makeMultiBtn.setPosition(GameConfig.stageWidth - 60 - makeMultiBtn.width, bottomBg.y + bottomBg.height - makeMultiBtn.height - 35);
        this.addChildToContainer(makeMultiBtn);
        let multiNeed = this.cfg.cost * 10;
        if (this.cfg.discount){
            multiNeed *= this.cfg.discount;
        }

        let makeMultiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(makeMultiNeedContainer);
        let multiGemIcon = BaseLoadBitmap.create("itemicon1");
		multiGemIcon.width = 100;
        multiGemIcon.height = 100;
        multiGemIcon.setScale(0.5);
        makeMultiNeedContainer.addChild(multiGemIcon);
        let makeMultiNeedDesc = ComponentManager.getTextField(String(multiNeed), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        makeMultiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width * multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height * multiGemIcon.scaleY/2 - makeMultiNeedDesc.height/2 + 4);
        makeMultiNeedContainer.addChild(makeMultiNeedDesc);
        makeMultiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + makeMultiNeedDesc.width;

        makeMultiNeedContainer.setPosition(makeMultiBtn.x + makeMultiBtn.width/2 - makeMultiNeedContainer.width/2 - 2, makeMultiBtn.y - multiGemIcon.height * multiGemIcon.scaleY + 5);
        this._makeMultiNeedDesc = makeMultiNeedDesc;

        let makeEnterDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftMakeMultiInfo-"+this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        makeEnterDesc.setPosition(makeMultiBtn.x + makeMultiBtn.width/2 - makeEnterDesc.width/2, makeMultiBtn.y + makeMultiBtn.height + 3);
        this.addChildToContainer(makeEnterDesc);

        //打折标记
        if (this.cfg.discount) {
            let discount = this.cfg.discount;
			let tag = BaseBitmap.create('shopview_corner');
			tag.setPosition(makeMultiBtn.x, makeMultiBtn.y);
            this.addChildToContainer(tag);
            tag.setScale(0.9);

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('sweetgiftShopDiscount-' + this.code, [String(discount * 10)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			let tagnum = 10 - discount * 10;
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
				tagTxt.text = LanguageManager.getlocal('sweetgiftShopDiscount-' + this.code, [(tagnum * 10).toString()]);
			}
			tagTxt.width = 70;
			tagTxt.height = 20;
			tagTxt.textAlign = egret.HorizontalAlign.CENTER;
			tagTxt.anchorOffsetX = tagTxt.width / 2;
			tagTxt.anchorOffsetY = tagTxt.height / 2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 22, -tagTxt.anchorOffsetY + 21]);
			tagTxt.rotation = -45;
			this.addChildToContainer(tagTxt);
		}

        this.createBuildName();

        //添加兔子
        // let rabbit = this.createRabbitAni();
        // rabbit.setPosition(bg.width/2 - rabbit.width/2 - 20, 800);
        // this._bgContainer.addChild(rabbit);
        // this._rabbit = rabbit;

        let rewardBtn = ComponentManager.getButton("achuntingviewchargebtn", "", ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTREWARDPOPVIEW, { aid: this.aid, code: this.code });
        }, this);
        rewardBtn.setPosition(GameConfig.stageWidth - rewardBtn.width - 20, bottomBg.y - rewardBtn.height - 20);
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;

        /**衣装预览 start */
        //门客
        let achieveData = this.cfg.getAchievementList();
        let servantNeedMoney = 0;
        if (achieveData && achieveData.length > 0 ){
            servantNeedMoney = achieveData[achieveData.length - 1].needNum;
        }
        let wifeNeedMoney = this.vo.getWifeNeedMoney();
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(0, bottomBg.y - 40 - skinTxtEffectBM.height / 2);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTSKINPOPUPVIEW, { 
                wifeId: this.cfg.show2,
                servantId: this.cfg.show1,
                wifeNeedText: "sweetgiftShowWifeTopMsg-"+this.code,
                servantNeedText: "sweetgiftShowServentTopMsg-"+this.code,
                wifeNeed: ""+wifeNeedMoney,
                servantNeed: ""+servantNeedMoney,
                isShowWife:false
             });
        }, this);

		let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(skinTxtEffect.x + 100, bottomBg.y - 40);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        //佳人
        let skinTxtEffectWife = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBMWife = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffectWife.setPosition(GameConfig.stageWidth/2 - 70, bottomBg.y - 40 - skinTxtEffectBMWife.height / 2);
		skinTxtEffectWife.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffectWife);
        skinTxtEffectWife.playWithTime(-1);
		skinTxtEffectWife.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTSKINPOPUPVIEW, { 
                wifeId: this.cfg.show2,
                servantId: this.cfg.show1,
                wifeNeedText: "sweetgiftShowWifeTopMsg-"+this.code,
                servantNeedText: "sweetgiftShowServentTopMsg-"+this.code,
                wifeNeed: ""+wifeNeedMoney,
                servantNeed: ""+servantNeedMoney,
                isShowWife:true
             });
        }, this);

		let skinTxtWife = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxtWife.anchorOffsetX = skinTxtWife.width / 2;
		skinTxtWife.anchorOffsetY = skinTxtWife.height / 2;
		skinTxtWife.setPosition(skinTxtEffectWife.x + 100, bottomBg.y - 40);
		this.addChildToContainer(skinTxtWife);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffectWife = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffectWife.anchorOffsetX = skinTxteffectWife.width / 2;
		skinTxteffectWife.anchorOffsetY = skinTxteffectWife.height / 2;
		skinTxteffectWife.setPosition(skinTxtWife.x, skinTxtWife.y);
		this.addChildToContainer(skinTxteffectWife);
		skinTxteffectWife.blendMode = egret.BlendMode.ADD;
		skinTxteffectWife.alpha = 0;
		egret.Tween.get(skinTxteffectWife, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        /**衣装预览 end */

        this.refreshView();
    }

    //建筑位置
    public _buildingPos = [
        {x:426, y:708},
        {x:8, y:593},
        {x:361, y:483},
        {x:0, y:443},
        {x:128, y:233}
    ];

    //建筑名字位置
    public _buildingNamePos = [
        {x:431, y:688},
        {x:220, y:620},
        {x:449, y:477},
        {x:60, y:451},
        {x:261, y:248}
    ];

    //标签位置
    public _buildingFlagPos = [
        {x:450, y:800},
        {x:130, y:731},
        {x:430, y:596},
        {x:75, y:560},
        {x:265, y:417}
    ];

    //云位置
    public _cloudPos = [
        {posLeft:[345, 674], posRight:[434, 719]},
        {posLeft:[11, 611], posRight:[139, 648]},
        {posLeft:[306, 467], posRight:[431, 507]},
        {posLeft:[-20, 441], posRight:[67, 476]},
        {posLeft:[114, 273], posRight:[235, 333]},
    ];

    //灯光位置
    public _lightPos = [
        {x:442, y:710},
        {x:58, y:666},
        {x:403, y:519},
        {x:70, y:440},
        {x:158, y:314}
    ];

    //build name
    public createBuildName():void{
        let data = this.cfg.getAchievementList();
        for (let i=0; i < data.length; i++){
            let container = new BaseDisplayObjectContainer();
            container.setPosition(this._buildingPos[i].x, this._buildingPos[i].y);
            
            let buildImg = ResourceManager.hasRes("acsweetgift_building-"+this.getTypeCode()+"_"+(i+1))?"acsweetgift_building-"+this.getTypeCode()+"_"+(i+1):"acsweetgift_building-1_"+(i+1);
            let building = BaseBitmap.create(buildImg);
            container.addChild(building);
            building.visible = true;
            building.name = "building";
            container.width = building.width;
            container.height = building.height;
            egret.Tween.get(building, {loop:true}).to({alpha: 0.5}, 600).to({alpha:1}, 600);

            let buildingLightImg = ResourceManager.hasRes("acsweetgift_building_light-"+this.getTypeCode()+"_"+(i+1))?"acsweetgift_building_light-"+this.getTypeCode()+"_"+(i+1):"acsweetgift_building_light-1_"+(i+1);
            let buildingLight = BaseBitmap.create(buildingLightImg);
            buildingLight.setPosition(this._lightPos[i].x - container.x, this._lightPos[i].y - container.y);
            buildingLight.blendMode = egret.BlendMode.ADD;
            container.addChild(buildingLight);
            buildingLight.visible = false;
            buildingLight.name = "buildingLight";
            egret.Tween.get(buildingLight,{loop:true}).to({alpha: 0}, 1000).to({alpha: 1}, 1000);

            let cloundLeftImg = ResourceManager.hasRes("acsweetgift_cloud-"+this.getTypeCode()+"_1")?"acsweetgift_cloud-"+this.getTypeCode()+"_1":"acsweetgift_cloud-1_1";
            let cloundRightImg = ResourceManager.hasRes("acsweetgift_cloud-"+this.getTypeCode()+"_2")?"acsweetgift_cloud-"+this.getTypeCode()+"_2":"acsweetgift_cloud-1_2";
            if (i == 4){
                cloundLeftImg = ResourceManager.hasRes("acsweetgift_moon_cloud-"+this.getTypeCode()+"_1")?"acsweetgift_moon_cloud-"+this.getTypeCode()+"_1":"acsweetgift_moon_cloud-1_1";
                cloundRightImg = ResourceManager.hasRes("acsweetgift_moon_cloud-"+this.getTypeCode()+"_2")?"acsweetgift_moon_cloud-"+this.getTypeCode()+"_2":"acsweetgift_moon_cloud-1_2";
            }
            let posLeft = this._cloudPos[i].posLeft;
            let cloundLeft = BaseBitmap.create(cloundLeftImg);
            cloundLeft.setPosition(posLeft[0] - container.x, posLeft[1] - container.y);
            container.addChild(cloundLeft);
            cloundLeft.visible = true;
            cloundLeft.name = "cloudLeft";

            let posRight = this._cloudPos[i].posRight;
            let cloundRight = BaseBitmap.create(cloundRightImg);
            cloundRight.setPosition(posRight[0] - container.x, posRight[1] - container.y);
            container.addChild(cloundRight);
            cloundRight.visible = true;
            cloundRight.name = "cloudRight";

            let nameBgStr = "ac_sweetgift_palace_name_bg-1_1";
            if (i == 4){
                nameBgStr = "ac_sweetgift_palace_name_bg-1_2";
            }
            let nameBg = BaseBitmap.create(nameBgStr);
            container.addChild(nameBg);
            let name = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftBuildingName-"+this.code + "_"+(i+1)), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
            nameBg.width = name.width + 30;
            nameBg.setPosition(building.x + building.width/2 - nameBg.width/2, this._buildingNamePos[i].y - container.y);
            name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
            container.addChild(name);

            let nameContainer = new BaseDisplayObjectContainer();
            nameContainer.width = nameBg.width;
            nameContainer.height = nameBg.height;
            nameContainer.setPosition(nameBg.x, nameBg.y);
            nameContainer.name = "nameContainer";
            container.addChild(nameContainer);

            let alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.width = nameBg.width + 25;
            alphaBg.height = building.height + 25;
            if (i == 4){
                alphaBg.width = nameBg.width + 10;
                alphaBg.height = building.height + 50;
            }
            alphaBg.setPosition(nameBg.x + nameBg.width/2 - alphaBg.width/2, nameBg.y);
            container.addChild(alphaBg);

            //分数
            let scoreContainer = new BaseDisplayObjectContainer();
            scoreContainer.width = 120;
            scoreContainer.setPosition(this._buildingFlagPos[i].x - container.x, this._buildingFlagPos[i].y - container.y);
            container.addChild(scoreContainer);
            scoreContainer.name = "scoreContainer";
            let scoreBg = BaseBitmap.create("battlepassfntbg-1");
            // scoreBg.setPosition(this._buildingFlagPos[i].x - container.x, this._buildingFlagPos[i].y - container.y);
            scoreBg.width = scoreContainer.width;
            scoreBg.name = "scoreBg";
            scoreContainer.addChild(scoreBg);

            let scoreIconImg = ResourceManager.hasRes("ac_sweetgift_gift_icon-"+this.getTypeCode())?"ac_sweetgift_gift_icon-"+this.getTypeCode():"ac_sweetgift_gift_icon-1";
            let scoreIcon = BaseBitmap.create(scoreIconImg);
            scoreIcon.setScale(0.6);
            scoreIcon.setPosition(scoreBg.x, scoreBg.y - 2);
            scoreContainer.addChild(scoreIcon);

            let scoreNum = data[i].needNum;
            let score = ComponentManager.getTextField(String(scoreNum), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            score.setPosition(scoreBg.x + scoreBg.width/2 - score.width/2, scoreBg.y + scoreBg.height/2 - score.height/2 + 2);
            score.name = "score";
            scoreContainer.addChild(score);

            //拜访
            let reviceBtn = ComponentManager.getButton("ac_sweetgift_visit_btn", "sweetgiftVisitName-"+this.code, this.visitBtnHandler, this, [{index:String(i+1)}]);
            reviceBtn.setPosition(nameContainer.x + nameContainer.width/2 - reviceBtn.width/2, scoreContainer.y);
            container.addChild(reviceBtn);
            reviceBtn.visible = false;
            reviceBtn.name = "reviceBtn";
            App.CommonUtil.addIconToBDOC(reviceBtn);

            let reviceEnd = BaseBitmap.create("ac_sweetgift_building_visited");
            reviceEnd.setPosition(nameContainer.x + nameContainer.width/2 - reviceEnd.width/2, scoreContainer.y);
            reviceEnd.name = "reviceEnd";
            reviceEnd.visible = false;
            container.addChild(reviceEnd);

            // let rabbit = this.createRabbitAni();
            // rabbit.setPosition(scoreContainer.x - rabbit.width, scoreContainer.y - rabbit.height/2 - 15);
            // container.addChild(rabbit);
            // rabbit.name = "rabbit";

            this._bgContainer.addChild(container);
            alphaBg.addTouchTap(this.bulidingBtnHandler, this, [{index:String(i+1)}]);
            this._buildings[i] = container;
        }
    }

    //兔子
    public createRabbitAni():BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let bgStr = ResourceManager.hasRes("acsweetgift_rabbit_bg-"+this.getTypeCode()) ? "acsweetgift_rabbit_bg-"+this.getTypeCode():"acsweetgift_rabbit_bg-1";
        let rabbitBg = BaseBitmap.create(bgStr);
        container.width = rabbitBg.width;
        container.height = rabbitBg.height;
        container.addChild(rabbitBg);
        let rabbitAni = ComponentManager.getCustomMovieClip("acsweetgift_rabbit_effect", 3, 150);
        rabbitAni.x = 10;
        container.addChild(rabbitAni);
        rabbitAni.name = "rabbitAni";
        rabbitAni.playWithTime(0);
        return container;
    }

    //点击建筑 拜访
    public bulidingBtnHandler(target:any, data:any){
        App.LogUtil.log("buildingBtn index:"+data.index);
        if (this._isSelectVisitBtn){
            return;
        }
        let status = this.vo.getAchievementStatusById(data.index);
        if (status != 1){
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTVISITREWARDPOPVIEW, { aid: this.aid, code: this.code, id:data.index });
        }
        else{
            if ((!this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._selectVisitIndex = Number(data.index);
            this._isSelectVisitBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: this.vo.aidAndCode, rkey: this._selectVisitIndex });
        }
    }

    public visitBtnHandler(data:any):void{
        if (this._isSelectVisitBtn){
            return;
        }
        let status = this.vo.getAchievementStatusById(data.index);
        if (status != 1){
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTVISITREWARDPOPVIEW, { aid: this.aid, code: this.code, id:data.index });
        }
        else{
            if ((!this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._selectVisitIndex = Number(data.index);
            this._isSelectVisitBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: this.vo.aidAndCode, rkey: this._selectVisitIndex });
        }
    }

    //拜访回调
    public visitCallback(event:egret.Event):void{
        let data = event.data.data.data;
        this._visitRewards = data.rewards;
        let container = this._buildings[this._selectVisitIndex - 1];
        let building = <BaseBitmap>container.getChildByName("building");
        let cloudLeft = <BaseBitmap>container.getChildByName("cloudLeft");
        let cloudRight = <BaseBitmap>container.getChildByName("cloudRight");
        building.visible = true;
        egret.Tween.get(cloudLeft).to({x: cloudLeft.x - 150, alpha:0}, 1000);
        egret.Tween.get(cloudRight).to({x: cloudLeft.x + 150, alpha:0}, 1000).call(this.showAvg, this);
    }

    //剧情
    private showAvg():void{
        let view = this;
        let visitId = view._selectVisitIndex;
        let data = view._visitRewards;

        ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTAVGVIEW,{
            aid : view.aid,
            code : view.code,
            visitId : visitId,
            callBack : ()=>{
                view.showReward(data);
            },
            obj : view
        });
    }

    //奖励
    private showReward(data:any){
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":data,"isPlayAni":true, "callback":view.refreshBuildingStatus, "handler":view});
    }

    //制作按钮
    public makeBtnClick(btnType:any):void{
        if (this._isSelectMakeBtn){
            return;
        }
        this._isSelectMakeBtn = true;
        if (!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            this._isSelectMakeBtn = false;
            return;
        }
        if (btnType == "0"){
            if (!this.vo.isFree() && Api.playerVoApi.getPlayerGem() < this.cfg.cost){
                // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                this.showRechargeTipView();
                this._isSelectMakeBtn = false;
                return;
            }
            this._isPlayTen = false;
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTMAKECAKEPOPVIEW, { aid: this.aid, code: this.code});
            this._isSelectMakeBtn = false;
        }
        else{
            if (Api.playerVoApi.getPlayerGem() < this.cfg.cost * this.cfg.discount * 10){
                // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                this.showRechargeTipView();
                this._isSelectMakeBtn = false;
                return;
            }
            this._isPlayTen = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, { activeId: this.vo.aidAndCode, isTenPlay:1, isFree: 0});
        }
    }

    public showRechargeTipView():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            title:"sweetgiftTipTitle",
            msg:LanguageManager.getlocal("sweetgiftTipMsg"),
            callback:() =>{
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler:this,
            needCancel:true,
            });
    }

    //背景移动
    public moveBgHandler(e:egret.TouchEvent){
        let maxDiffY = this._bgContainer.height - GameConfig.stageHeigth;
        if (e.type == egret.TouchEvent.TOUCH_BEGIN){
            this._startY = e.stageY;
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE){
            let diffY = e.stageY - this._startY;
            if (diffY > 0){//向下
                if(this._bgContainer.y >= 0 || Math.abs(this._bgContainer.y) < diffY){
                    this._bgContainer.y = 0;
                }
                else{
                    this._bgContainer.y += diffY;
                }
            }
            else{
                if (Math.abs(this._bgContainer.y) + Math.abs(diffY) >= maxDiffY){
                    this._bgContainer.y = -maxDiffY;
                }
                else{
                    this._bgContainer.y += diffY;
                }
            }   
        }
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("sweetgiftTimeDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    //制作回调
    private makeRequestCallback(event:egret.Event){
        this._isSelectMakeBtn = false;
        if (!this._isPlayTen){
            return;
        }
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let itemStr = rData.rewards.split("|")[0];
        let itemId = itemStr.split("_")[1];
        let itemData = this.vo.getCakeDataById(itemId);
        let itemName = LanguageManager.getlocal("itemName_" + itemId);
        let msgStr = LanguageManager.getlocal("sweetgiftMakeGetRewardMsg-"+this.code, ["10", itemName, String(itemData.score * 10)]);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards,"isPlayAni":true, tipMsg: msgStr});
    }

    public refreshView():void{
        this._scoreNum.text = String(this.vo.getScore());
        if (this.vo.isFree()){
            this._freeDesc.visible = true;
            this._makeOneNeedContainer.visible = false;
        }
        else{
            this._freeDesc.visible = false;
            this._makeOneNeedContainer.visible = false;
        }
        if (this.vo.isShowRewardsRedDot()){
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }

        if (!this._isSelectVisitBtn){
            this.refreshBuildingStatus();
        }

        let playGem = Api.playerVoApi.getPlayerGem();
        if (playGem < this.cfg.cost){
            this._makeOneNeedDesc.setColor(TextFieldConst.COLOR_WARN_RED);
        }
        else{
            this._makeOneNeedDesc.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }

        let multiNeed = this.cfg.cost * 10;
        if (this.cfg.discount){
            multiNeed *= this.cfg.discount;
        }
        if (playGem < multiNeed){
            this._makeMultiNeedDesc.setColor(TextFieldConst.COLOR_WARN_RED);
        }
        else{
            this._makeMultiNeedDesc.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    }

    //刷新建筑状态 0 不可领取 1 可领取 2 已领取
    public refreshBuildingStatus():void{
        this._isSelectVisitBtn = false;
        let achieveId = this.vo.getMaxAchieveId();
        for (let i=0; i < this._buildings.length; i++){
            let status = this.vo.getAchievementStatusById(String(i+1));
            let container = this._buildings[i];
            let building = <BaseBitmap>container.getChildByName("building");
            let cloudLeft = <BaseBitmap>container.getChildByName("cloudLeft");
            let cloudRight = <BaseBitmap>container.getChildByName("cloudRight");
            // let rabbit = <BaseDisplayObjectContainer>container.getChildByName("rabbit");
            let scoreContainer = <BaseDisplayObjectContainer>container.getChildByName("scoreContainer");
            let buildingLight = <BaseBitmap>container.getChildByName("buildingLight");
            let reviceBtn = <BaseButton>container.getChildByName("reviceBtn");
            let reviceEnd = <BaseBitmap>container.getChildByName("reviceEnd");
            if (status == 1){
                egret.Tween.removeTweens(building);
                // building.visible = true;
                cloudLeft.alpha = 0.7;
                cloudRight.alpha = 0.7; 
                reviceBtn.visible = true;
                reviceEnd.visible = false;
                scoreContainer.visible = false;
                buildingLight.visible = true;
            }
            else if (status == 0){
                // building.visible = false;
                cloudLeft.alpha = 1;
                cloudRight.alpha = 1;
                reviceBtn.visible = false;
                reviceEnd.visible = false;
                scoreContainer.visible = true;
                buildingLight.visible = false;
            }
            else if (status == 2){
                // building.visible = true;
                egret.Tween.removeTweens(building);
                cloudLeft.alpha = 0;
                cloudRight.alpha = 0;
                reviceBtn.visible = false;
                reviceEnd.visible = true;
                scoreContainer.visible = false;
                reviceBtn.setText("sweetgiftVisitedName-"+this.code);
                reviceBtn.setGray(true);
                App.CommonUtil.removeIconFromBDOC(reviceBtn);
                buildingLight.visible = true;
            }
            // if (status != 2){
                // if (achieveId == -1){
                //     rabbit.visible = false;
                //     this._rabbit.visible = true;
                // }
                // else if (achieveId == this._buildings.length - 1){
                //     this._rabbit.visible = false;
                //     rabbit.visible = false;
                // }
                // else{
                //     this._rabbit.visible = false;
                //     if (i == achieveId){
                //         rabbit.visible = true;
                //     }
                //     else{
                //         rabbit.visible = false;
                //     }
                // }
            // }
            // else{
                // this._rabbit.visible = false;
                // rabbit.visible = false;
            // } 
        }  
    }

    public getSkinView(skinId:string){
        let container = new BaseDisplayObjectContainer();
        let skinCfg:any = Config.WifeskinCfg.getWifeCfgById(skinId);
        let isWifeskin = false;
        if(skinCfg){
            isWifeskin = true;
        }
        else{
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        let bottomBg = this.container.getChildByName("bottomBg");
		if(isWifeskin){
			let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				// wife.width = 354;
                // wife.height = 611;
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                wife.setPosition(0, 0);
				wife.setScale(0.7);  
                container.setPosition(360, GameConfig.stageHeigth - 115);
                container.addChild(wife);
                
			}
			else {
                wife = BaseBitmap.create("ac_sweetgift_wifeskin-"+this.getTypeCode());
                wife.anchorOffsetY = wife.height;
                wife.setScale(0.8);
                wife.setPosition(0, 0);
                container.addChild(wife);
                container.setPosition(160, GameConfig.stageHeigth - 140);
            } 
        }
        else{
            let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
				droWifeIcon.scaleY = 1;
				droWifeIcon.scaleX = 1;
				droWifeIcon.anchorOffsetY = droWifeIcon.height;
				droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, droWifeIcon, container, [270,460]);
                droWifeIcon.setPosition(0, 0);
                container.addChild(droWifeIcon);
                container.setPosition(160, GameConfig.stageHeigth - 140);
			}
			else {
                let servant = BaseBitmap.create("ac_sweetgift_servantskin-"+this.getTypeCode());
                servant.anchorOffsetY = servant.height;
                servant.setScale(0.8);
                servant.setPosition(0, 0);
                container.addChild(servant);
                container.setPosition(0, GameConfig.stageHeigth - 140);
            }
        }
        this.addChildToContainer(container);
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

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `sweetgiftreporttitle-${this.code}` }, msg: { key: `sweetgiftreportmsg-${this.code}` } };
    }

    // 标题背景名称
	protected getTitleBgName():string
    {   
        return ResourceManager.hasRes("ac_sweetgift_titlebg-"+this.getTypeCode())?"ac_sweetgift_titlebg-"+this.getTypeCode():"ac_sweetgift_titlebg-1"; 
	}
    
    protected getTitleStr():string{
        return "";
    }

    //规则
    protected getRuleInfo(): string {
        return "sweetgiftRuleInfo-" + this.code;
    }

    protected getRuleInfoParam():string[]
	{
        let moonCakeList = this.cfg.getMoonCakeList();
        return [String(moonCakeList[0].score), String(moonCakeList[1].score), String(moonCakeList[2].score)];
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() != "1"){
            list = ["ac_sweetgift_titlebg-1","acsweetgift_bg-1","ac_sweetgift_gift_icon-1","ac_sweetgift_material_icon-1", "acsweetgift_building-1_1", "acsweetgift_building-1_2", "acsweetgift_building-1_3", "acsweetgift_building-1_4", "acsweetgift_building-1_5", "acsweetgift_cloud-1_1", "acsweetgift_cloud-1_2", "acsweetgift_moon_cloud-1_1", "acsweetgift_moon_cloud-1_2", "acsweetgift_rabbit_bg-1", "acsweetgift_building_light-1_1", "acsweetgift_building_light-1_2", "acsweetgift_building_light-1_3", "acsweetgift_building_light-1_4", "acsweetgift_building_light-1_5"];
        }
        return super.getResourceList().concat([
            "ac_sweetgift_titlebg-"+this.getTypeCode(),
            "acsweetgift_bg-"+this.getTypeCode(),
            "ac_sweetgift_gift_icon-"+this.getTypeCode(),
            "ac_sweetgift_material_icon-"+this.getTypeCode(),
            "acsweetgift_building-"+this.getTypeCode()+"_1",
            "acsweetgift_building-"+this.getTypeCode()+"_2",
            "acsweetgift_building-"+this.getTypeCode()+"_3",
            "acsweetgift_building-"+this.getTypeCode()+"_4",
            "acsweetgift_building-"+this.getTypeCode()+"_5",
            "acsweetgift_building_light-"+this.getTypeCode()+"_1",
            "acsweetgift_building_light-"+this.getTypeCode()+"_2",
            "acsweetgift_building_light-"+this.getTypeCode()+"_3",
            "acsweetgift_building_light-"+this.getTypeCode()+"_4",
            "acsweetgift_building_light-"+this.getTypeCode()+"_5",
            "acsweetgift_cloud-"+this.getTypeCode()+"_1",
            "acsweetgift_cloud-"+this.getTypeCode()+"_2",
            "acsweetgift_moon_cloud-"+this.getTypeCode()+"_1",
            "acsweetgift_moon_cloud-"+this.getTypeCode()+"_2",
            "acsweetgift_rabbit_bg-"+this.getTypeCode(),
            "ac_sweetgift_wifeskin-"+this.getTypeCode(),
            "ac_sweetgift_servantskin-"+this.getTypeCode(),
            "acliangbiographyview_common_acbg", "luckydrawiconbg-1", "arena_bottom",
            "ac_sweetgift_palace_name_bg-1_1", "ac_sweetgift_palace_name_bg-1_2", "mainlandcitynamebg-1", "acwealthcarpview_skineffect", "collectflag", "acsearchproofview_common_skintxt", "public_alphabg", "achuntingviewchargebtn", "shopview_corner", "battlepassfntbg-1", "ac_sweetgift_visit_btn", "ac_sweetgift_visit_btn_down", "ac_sweetgift_building_visited"
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.visitCallback, this);
        this._bgContainer = null;
        this._timeBg = null;
        this._acTimeTf = null;
        this._scoreNum = null;
        // this._currHaveInfo = null;
        this._makeOneNeedDesc = null;
        this._makeMultiNeedDesc = null;
        this._freeDesc = null;
        this._rewardBtn = null;
        this._isSelectMakeBtn = false;
        this._buildings = [];
        this._rabbit = null;
        this._isSelectVisitBtn = false;
        this._selectVisitIndex = -1;
        this._visitRewards = null;
        this._makeOneNeedContainer = null;
    
        super.dispose();
    }
}