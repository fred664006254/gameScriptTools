/**
 * 财神祝福
 * author ycg
 * date 2020.2.13
 * @class AcBlessingOfMammonView
 */
class AcBlessingOfMammonView extends AcCommonView{
    private _acTimeTf:BaseTextField = null;
    private _acTimeBg:BaseBitmap = null;
    private _chargeNum:BaseTextField = null;
    private _boxList:any[] = [];
    private _boxListContainer:BaseDisplayObjectContainer = null;
    private _scrollView:ScrollView = null;
    private _isBoxClick:boolean = false;
    private _flyMoneyBone:BaseLoadDragonBones = null;
    private _numBg:BaseBitmap = null;
    private _isCanMove:boolean = true;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);

        let descContainer = new BaseDisplayObjectContainer();
        descContainer.width = GameConfig.stageWidth;
        descContainer.height = 190;
        descContainer.setPosition(0, GameConfig.stageHeigth - descContainer.height);
        // this.addChildToContainer(descContainer);

        let descBgName = ResourceManager.hasRes("acblessingofmammon_bottombg-"+this.getTypeCode()) ? "acblessingofmammon_bottombg-"+this.getTypeCode() : "acliangbiographyview_common_acbg";
        let descBg = BaseBitmap.create(descBgName);
        if (this.getTypeCode() == "5"){
            descBg.height = 200;
            descContainer.height = descBg.height;
            descContainer.setPosition(0, GameConfig.stageHeigth - descContainer.height);
        }
        else{
            descBg.width = GameConfig.stageWidth;
            descBg.height = 190;
            descBg.scaleY = -1;
            descBg.setPosition(0, descContainer.height);
        }
        descContainer.addChild(descBg);
         
        //活动说明
        let maxExtraNum = this.vo.getMaxExtraReward();
        let acDescStr = LanguageManager.getlocal("acBlessingOfMommonInfo-"+this.getTypeCode(), [""+maxExtraNum]);
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
            let skinNeedData = this.vo.getSpecialRewardNeed();
            acDescStr = LanguageManager.getlocal("acBlessingOfMommonInfo-"+this.getTypeCode(), [""+maxExtraNum, ""+skinNeedData.needNum]);
        }
        let acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        descContainer.addChild(acDesc);

        //倒计时
        if (this.getTypeCode() == "5"){
            this._acTimeBg = BaseBitmap.create("public_9_bg61");
            descContainer.addChild(this._acTimeBg);
        }
        let acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acBlessingOfMommonTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descContainer.addChild(acTimeTf);
        this._acTimeTf = acTimeTf;

        //活动时间
        let acDate = ComponentManager.getTextField(LanguageManager.getlocal("acBlessingOfMommonTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descContainer.addChild(acDate);

        if (this.getTypeCode() == "5"){
            if (this._acTimeBg){
                this._acTimeBg.width = acTimeTf.width + 60;
                this._acTimeBg.setPosition(GameConfig.stageWidth - this._acTimeBg.width - 10, 0);
                acTimeTf.setPosition(this._acTimeBg.x + this._acTimeBg.width/2 - acTimeTf.width/2, this._acTimeBg.y + this._acTimeBg.height/2 - acTimeTf.height/2);
            }
            acDate.setPosition(descBg.x + 20, descBg.y + 33 + (descBg.height - acDesc.height - acDate.height - 60)/2);
            acDesc.setPosition(acDate.x, acDate.y + acDate.height + 5);
        }
        else{
            acDesc.setPosition(20, (descBg.height - acDesc.height - acTimeTf.height - acDate.height - 10)/2);
            acDate.setPosition(acDesc.x, acDesc.y + acDesc.height + 5);
            acTimeTf.setPosition(acDesc.x, acDate.y + acDate.height + 5);
        }

        //let role acwealthcomingview_forcewealth
        let specialData = this.vo.getSpecialRewardNeed();
        App.LogUtil.log(" specialData "+specialData.skinId);
        if (specialData && specialData.skinId){
            let skinCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
            let skinBoneName = skinCfg.bone+"_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
                let skin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                skin.anchorOffsetY = skin.height;
                skin.setScale(0.95);
                skin.setPosition(230, descContainer.y - 40);
                if (this.getTypeCode() == "5"){
                    skin.y = descContainer.y + 5;
                }
                this.addChildToContainer(skin);
            }
            else{
                let skinImg = BaseLoadBitmap.create(skinCfg.body);
				skinImg.width = 405;
				skinImg.height = 467;
				skinImg.anchorOffsetY = skinImg.height;
				skinImg.setScale(1.2);
				skinImg.x = -40;
                skinImg.y = descContainer.y - 25;
                if (this.getTypeCode() == "5"){
                    skinImg.y = descContainer.y + 5;
                }
				this.addChildToContainer(skinImg);
            }
        }
        else{
            let skinBone = "acwealthcomingview_culturewealth";
            let skinBoneName = skinBone+"_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && skinBoneName && RES.hasRes(skinBoneName) && App.CommonUtil.check_dragon()) {
                let skin = App.DragonBonesUtil.getLoadDragonBones(skinBone);
                skin.anchorOffsetY = skin.height;
                // skin.setScale(0.8);
                skin.setPosition(150, descContainer.y - 140);
                this.addChildToContainer(skin);
            }
        }
        // this.addChildToContainer(descContainer);

        //衣装预览
        if (specialData && specialData.skinId){
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(descContainer.x + 100, descContainer.y - 190);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);

            let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChildToContainer(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 0.9, scaleY: 0.9 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(() => {
                let skinId = Config.ServantskinCfg.formatRewardItemVoStr(specialData.skinId);;
                let topMsg = LanguageManager.getlocal("acBlessingOfMommonSkinTopMsg-"+this.getTypeCode(), [""+specialData.needNum]);
                let data = {data:[
                    {idType: skinId, topMsg:topMsg, bgName:"acthreekingdomrecharge_skinbg", scale: 0.8, offY: 2},
                ]};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }, this);
        }

        //已充值数量
        let numBgImg = ResourceManager.hasRes("acblessingofmammon_chargenumbg-"+this.getTypeCode()) ? "acblessingofmammon_chargenumbg-"+this.getTypeCode() : "acblessingofmammon_chargenumbg-1";
        let numBg = BaseBitmap.create(numBgImg);
        numBg.setPosition(GameConfig.stageWidth/2 - numBg.width/2, descContainer.y - numBg.height - 15);
        // this.addChildToContainer(numBg);
        this._numBg = numBg;

        // let currCharge = this.vo.getCurrRecharge();
        let currData = this.vo.getCurrProcessIndex();
        let chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeAllInfo-"+this.getTypeCode());
        App.LogUtil.log("currData.index "+currData.index+" needGem "+currData.needGem);
        if (currData.index || currData.index == 0){
            let chargeName = LanguageManager.getlocal("acBlessingOfMommonBoxName_"+(currData.index + 1)+"-"+this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == currData.index){
                let specialCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                chargeName = specialCfg.name;
            }
            chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeInfo-"+this.getTypeCode(), [""+currData.needGem, chargeName]);
        }
        let chargeNum = ComponentManager.getTextField(chargeNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        chargeNum.anchorOffsetX = chargeNum.width/2;
        chargeNum.setPosition(numBg.x + numBg.width/2, numBg.y + numBg.height/2 - chargeNum.height/2);
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
            numBg.y = descContainer.y - numBg.height;
            chargeNum.y = numBg.y + numBg.height - chargeNum.height - 14;
        }
        else if (this.getTypeCode() == "1"){
            numBg.width = chargeNum.width + 240;
            numBg.x = GameConfig.stageWidth/2 - numBg.width/2;
            chargeNum.x = numBg.x + numBg.width/2;
        }
        // this.addChildToContainer(chargeNum);
        this._chargeNum = chargeNum;

        //box
        let boxListContainer = new BaseDisplayObjectContainer();
        boxListContainer.width = GameConfig.stageWidth/2 + 40;
        this._boxListContainer = boxListContainer;
        let rectHeight = numBg.y - this.titleBg.height - 20;
        let boxScroRect = new egret.Rectangle(0, 0, boxListContainer.width, rectHeight);
        let scrollView = ComponentManager.getScrollView(boxListContainer, boxScroRect);
        scrollView.setPosition(GameConfig.stageWidth - boxListContainer.width - 10, this.titleBg.y + this.titleBg.height + 10);
        scrollView.horizontalScrollPolicy = 'off';
        scrollView.bounces = false;
        this.addChildToContainer(scrollView);
        this._scrollView = scrollView;
        let boxData = this.cfg.getBoxListCfg();
        let boxLength = boxData.length;
        this._boxList = [];
        for (let i = 0; i < boxData.length; i++){
            let boxContainer = new BaseDisplayObjectContainer();
            let boxImgIndex = i % 4 + 1;
            if (this.getTypeCode() == "5"){
                boxImgIndex = i % 8 + 1;
            }
            let boxImg = ResourceManager.hasRes("acblessingofmammon_box"+boxImgIndex+"-"+this.getTypeCode()) ? "acblessingofmammon_box"+boxImgIndex+"-"+this.getTypeCode() : "acblessingofmammon_box"+boxImgIndex+"-1";
            if (specialData && specialData.skinId && specialData.index == boxLength - 1 -i){
                boxImg = ResourceManager.hasRes("acblessingofmammon_bigbox-"+this.getTypeCode()) ? "acblessingofmammon_bigbox-"+this.getTypeCode() : "acblessingofmammon_bigbox-3";
            }
            let box:BaseBitmap = null;
            let boxAni:CustomMovieClip = null;
            if (this.getTypeCode() == "1"){
                box = BaseBitmap.create(boxImg);
                boxContainer.width = box.width;
                boxContainer.height = box.height;
                boxContainer.addChild(box);
                boxContainer.anchorOffsetX = boxContainer.width/2;
                boxContainer.anchorOffsetY = boxContainer.height/2;

                boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_fuzi", 8, 70);
                boxAni.width = 228;
                boxAni.height = 229;
                boxAni.anchorOffsetX = boxAni.width/2;
                boxAni.anchorOffsetY = boxAni.height/2;
                boxContainer.addChild(boxAni);
                boxAni.setPosition(box.x + box.width/2, box.y + box.height/2);
                boxAni.blendMode = egret.BlendMode.ADD;
                boxAni.playWithTime(0);
            }
            else if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
                let tableImg = ResourceManager.hasRes("acblessingofmammon_table-"+this.getTypeCode()) ? "acblessingofmammon_table-"+this.getTypeCode() : "acblessingofmammon_table-3";
                let table = BaseBitmap.create(tableImg);
                boxContainer.width = table.width;
                boxContainer.height = 180;
                boxContainer.addChild(table);
                table.y = boxContainer.height - table.height;

                box = BaseBitmap.create(boxImg);
                box.setPosition(table.x + table.width/2 - box.width/2, table.y + table.height - box.height - 11);
                if (this.getTypeCode() == "5"){
                    box.y = table.y + table.height - box.height + 13;
                }
                //可领取特效
                if (specialData && specialData.skinId && specialData.index == boxLength - 1 -i){
                    if (this.getTypeCode() == "3"){
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_yingzhengget", 16, 70);
                        boxAni.width = 344;
                        boxAni.height = 339;
                        boxAni.anchorOffsetX = boxAni.width/2;
                        boxAni.anchorOffsetY = boxAni.height/2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width/2, box.y + box.height/2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
                boxContainer.addChild(box);

                //自身特效
                if (specialData && specialData.skinId && specialData.index == boxLength - 1 -i){
                    if (this.getTypeCode() == "3"){
                        let boxEff = ComponentManager.getCustomMovieClip("acblessingmammon_yingzhengeff", 16, 70);
                        boxEff.width = 192;
                        boxEff.height = 189;
                        boxEff.anchorOffsetX = boxEff.width/2;
                        boxEff.anchorOffsetY = boxEff.height/2;
                        boxContainer.addChild(boxEff);
                        boxEff.setPosition(box.x + box.width/2, box.y + box.height/2 - 5);
                        boxEff.blendMode = egret.BlendMode.ADD;
                        boxEff.playWithTime(0);
                    }
                    else if (this.getTypeCode() == "5" || this.getTypeCode() == "6"){
                        //可领取特效
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_shuideng", 10, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width/2;
                        boxAni.anchorOffsetY = boxAni.height/2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width/2, box.y + box.height/2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
                else{
                    //可领取特效
                    if (this.getTypeCode() == "3"){
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_yuxi", 12, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width/2;
                        boxAni.anchorOffsetY = boxAni.height/2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width/2, box.y + box.height/2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                    else if (this.getTypeCode() == "5" || this.getTypeCode() == "6"){
                        boxAni = ComponentManager.getCustomMovieClip("acblessingmammon_shuideng", 10, 70);
                        boxAni.width = 300;
                        boxAni.height = 300;
                        boxAni.anchorOffsetX = boxAni.width/2;
                        boxAni.anchorOffsetY = boxAni.height/2;
                        boxContainer.addChild(boxAni);
                        boxAni.setPosition(box.x + box.width/2, box.y + box.height/2);
                        boxAni.blendMode = egret.BlendMode.ADD;
                        boxAni.playWithTime(0);
                    }
                }
            }
            
            let isSpecial = false;
            let index = boxLength - 1 - i;
            let nameStr = LanguageManager.getlocal("acBlessingOfMommonBoxName_"+(index+1)+"-"+this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == boxLength - 1 -i){
                isSpecial = true;
                let skinCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                nameStr = skinCfg.name;
            }

            boxContainer.setPosition(boxListContainer.width - boxContainer.width/2 - 20, boxContainer.height/2 + i*(boxContainer.height - 25));
            if (this.getTypeCode() == "1"){
                boxContainer.y = boxContainer.height/2 + i*(boxContainer.height - 25) + 15;
            }
            if (i % 2 == 1){
                boxContainer.x = 20 + boxContainer.width/2;
            }
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6"){
                boxContainer.setPosition(boxListContainer.width - boxContainer.width - 20, i*(boxContainer.height + 25));
                if (i % 2 == 1){
                    boxContainer.x = 20;
                }
            }
            else if (this.getTypeCode() == "5"){
                boxContainer.setPosition(boxListContainer.width - boxContainer.width - 10, i*(boxContainer.height + 15) + 15);
                if (i % 2 == 1){
                    boxContainer.x = 10;
                }
            }
            
            //line
            let line:BaseBitmap = null;
            if (i != boxLength - 1){
                let lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-"+this.getTypeCode()) ? "acblessingofmammon_line_1-"+this.getTypeCode() : "acblessingofmammon_line_1-1";
                line = BaseBitmap.create(lineImg);
                boxListContainer.addChild(line);
                if (i % 2 == 1){
                    line.scaleX = -1;
                    line.setPosition(boxContainer.x + 30 + line.width, boxContainer.y + 30);
                    if (this.getTypeCode() == "3" || this.getTypeCode() == "6"){
                        line.setPosition(boxContainer.x + boxContainer.width/2 + line.width, boxContainer.y + boxContainer.height + 12);
                    }
                    else if (this.getTypeCode() == "5"){
                        line.setPosition(boxContainer.x + boxContainer.width/2 + line.width, boxContainer.y + boxContainer.height + 18);
                    }
                }
                else{
                    line.setPosition(boxContainer.x - 40 - boxContainer.width/2, boxContainer.y + 37);
                    if (this.getTypeCode() == "3" || this.getTypeCode() == "6"){
                        line.setPosition(boxContainer.x, boxContainer.y + boxContainer.height + 12);
                    }
                    else if (this.getTypeCode() == "5"){
                        line.setPosition(boxContainer.x, boxContainer.y + boxContainer.height + 18);
                    }
                }
            }
            boxListContainer.addChild(boxContainer);

            //box light
            let light:BaseBitmap = null;
            let boxBlack:BaseBitmap = null;
            if (this.getTypeCode() == "1"){
                //black
                boxBlack = BaseBitmap.create("public_9_black");
                boxBlack.width = 127;
                boxBlack.height = 127;
                boxBlack.alpha = 0.6;
                boxBlack.anchorOffsetX = boxBlack.width/2;
                boxBlack.anchorOffsetY = boxBlack.height/2;
                boxBlack.setPosition(boxContainer.width/2, boxContainer.height/2);
                boxBlack.rotation = 45;
                boxContainer.addChild(boxBlack);
                boxBlack.visible = false;
            }

            let extraContainer = this.getExtraRewardContainer(boxData[boxData.length - 1 - i].id);
            boxContainer.addChild(extraContainer);
            extraContainer.setPosition(55, -17);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6"){
                extraContainer.x = 75;
            }
            else if (this.getTypeCode() == "5"){
                extraContainer.x = 70;
                extraContainer.y = -30;
            }
            if (PlatformManager.checkIsEnLang()){
                if (this.getTypeCode() == "1"){
                    extraContainer.y = 0;
                }
            }


            //已领取
            let collectFlag = BaseBitmap.create("collectflag");
            collectFlag.setScale(0.55);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
                collectFlag.setScale(0.7);
            }
            collectFlag.setPosition(boxContainer.width/2 - collectFlag.width * collectFlag.scaleX /2, boxContainer.height/2 - collectFlag.height * collectFlag.scaleY /2);
            boxContainer.addChild(collectFlag);
            collectFlag.visible = true;
            
            //name
            let nameBgImg = ResourceManager.hasRes("acblessingofmammon_boxnamebg-"+this.getTypeCode()) ? "acblessingofmammon_boxnamebg-"+this.getTypeCode() : "acblessingofmammon_boxnamebg-1";
            let nameBg = BaseBitmap.create(nameBgImg);
            boxListContainer.addChild(nameBg);

            let name = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            nameBg.width  = name.width + 40;
            nameBg.setPosition(boxContainer.x - nameBg.width/2, boxContainer.y + boxContainer.height/2 - nameBg.height + 15);
            name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
            if (this.getTypeCode() == "3" || this.getTypeCode() == "6"){
                nameBg.setPosition(boxContainer.x + boxContainer.width/2 - nameBg.width/2 , boxContainer.y + boxContainer.height - nameBg.height + 15);
                name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
            }
            else if (this.getTypeCode() == "5"){
                name.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
                nameBg.setPosition(boxContainer.x + boxContainer.width/2 - nameBg.width/2 , boxContainer.y + boxContainer.height - nameBg.height + 20);
                name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2 + 2);
            }
            boxListContainer.addChild(name);  

            boxContainer.addTouchTap(this.boxClick, this, [index]);

            let boxItem = {boxContainer: boxContainer, light: light, black: boxBlack, collect: collectFlag, line: line, isSpecial: isSpecial, box: box, boxAni: boxAni, extraContainer: extraContainer};
            this._boxList[index] = boxItem;
        }
        if (this.getTypeCode() == "1"){
            boxListContainer.height -= 20;
        }
        else if (this.getTypeCode() == "3"){
            boxListContainer.height -= 105;
        }
        else if (this.getTypeCode() == "5"){
            boxListContainer.height -= 70;
        }
        else if (this.getTypeCode() == "6"){
            boxListContainer.height -= 70;
        }
        scrollView.scrollTop = boxListContainer.height - scrollView.height;
        App.LogUtil.log("scrollView.scrollTop "+scrollView.scrollTop);

        let flyMoneyBone = "acblessingofmammon_flymoney";
        let flyMoneyName = flyMoneyBone + "_ske";
        if (this.getTypeCode() == "1" || this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
            let flyAct = "fuzi";
            if(this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
                flyAct = "yuanbao";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && flyMoneyName && RES.hasRes(flyMoneyName) && App.CommonUtil.check_dragon()) {
                let flyDragon = App.DragonBonesUtil.getLoadDragonBones(flyMoneyBone, 0, flyAct);
                flyDragon.setPosition(0, 0);
                this.addChildToContainer(flyDragon);
                flyDragon.visible = false;
                this._flyMoneyBone = flyDragon;
            }
        }

        if (this.vo.isShowRewardRedDot()){
            if (this._flyMoneyBone){
                this._flyMoneyBone.visible = true;
            }
        }
        else{
            if (this._flyMoneyBone){
                this._flyMoneyBone.visible = false;
            }
        }

        this.addChildToContainer(descContainer);
        this.addChildToContainer(numBg);
        this.addChildToContainer(chargeNum);

        this.freshBox();
        this.moveScrollView();
    }

    private getExtraRewardContainer(id:string|number):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let bg = BaseBitmap.create("acblessingofmammon_backmoneybg");
        container.addChild(bg);
        container.width = bg.width;
        container.height = bg.height;
        let extraData = this.vo.getExtraRewardNum(id); // 50 30  109
        let rewardNum =  ComponentManager.getBitmapText(""+extraData.max, "acblessingmammon_fnt1", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        rewardNum.setPosition(bg.x + 47, 17);
        if (!Api.switchVoApi.checkOpenBMFont()){
            let rewardStr = <BaseTextField>rewardNum;
            rewardStr.bold = true;
            rewardNum.setPosition(bg.x + 45, 22);
        }
        container.addChild(rewardNum);
        return container;
    }

    private boxClick(target:any, index:number){
        App.LogUtil.log("boxClick "+index);
        let data = this.cfg.getBoxListCfg();
        let currCharge = this.vo.getCurrRecharge();
        if (!this.vo.isGetChargeRewardById(data[index].id) && (currCharge >= Number(data[index].needGem))){
            //领取
            App.LogUtil.log("boxClick 1");
            if (this._isBoxClick){
                return;
            }
            if (!this.vo.isStart){
                this.vo.showAcEndTip();
                return;
            }
            this._isBoxClick = true;
            NetManager.request(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, { activeId: this.vo.aidAndCode, rkey: data[index].id});
        }
        else{
            App.LogUtil.log("boxClick 2");
            ViewController.getInstance().openView(ViewConst.POPUP.ACBLESSINGOFMAMMONREWARDPOPUPVEW, {aid: this.aid, code: this.code, data: data[index]});
        }
    }

    private freshBox():void{
        let data = this.cfg.getBoxListCfg();
        let currCharge = this.vo.getCurrRecharge();
        for (let i = 0; i < data.length; i++){
            let boxItem =this._boxList[i];
            let nexBoxItem = this._boxList[i+1];
            App.CommonUtil.removeIconFromBDOC(boxItem.boxContainer);
            App.LogUtil.log("freshbox "+boxItem.isSpecial)
            if (this.vo.isGetChargeRewardById(data[i].id)){
                if (nexBoxItem && nexBoxItem.line){
                    let lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-"+this.getTypeCode()) ? "acblessingofmammon_line_1-"+this.getTypeCode() : "acblessingofmammon_line_1-1";
                    nexBoxItem.line.setRes(lineImg);
                }
                boxItem.collect.visible = true;
                if (boxItem.boxAni){
                    boxItem.boxAni.visible = false;
                }
                if (this.getTypeCode() == "1"){
                    boxItem.black.visible = true;
                }
            }
            else{
                if (currCharge >= Number(data[i].needGem)){
                    App.LogUtil.log("index: "+i+ "  box isspecail "+ boxItem.isSpecial);
                    if (nexBoxItem && nexBoxItem.line){
                        let lineImg = ResourceManager.hasRes("acblessingofmammon_line_2-"+this.getTypeCode()) ? "acblessingofmammon_line_2-"+this.getTypeCode() : "acblessingofmammon_line_2-1";
                        nexBoxItem.line.setRes(lineImg);
                    }
                    boxItem.collect.visible = false;
                    if (boxItem.boxAni){
                        boxItem.boxAni.visible = true;
                    }
                    if (this.getTypeCode() == "1"){
                        boxItem.black.visible = false;
                    }
                    App.CommonUtil.addIconToBDOC(boxItem.boxContainer);
                    let reddot:BaseBitmap = <BaseBitmap>boxItem.boxContainer.getChildByName("reddot");
                    // reddot.setPosition(boxItem.boxContainer.width/4 *3 - reddot.width/2, boxItem.boxContainer.height/4 - reddot.height/2);
                    // if (this.getTypeCode() == "3" || this.getTypeCode() == "5"){
                    //     reddot.setPosition(boxItem.boxContainer.width - 40 - reddot.width/2, reddot.height/2 + 10);
                    // }
                    reddot.setPosition(boxItem.extraContainer.x + 85, boxItem.extraContainer.y + 70);
                }
                else{
                    if (nexBoxItem && nexBoxItem.line){
                        let lineImg = ResourceManager.hasRes("acblessingofmammon_line_1-"+this.getTypeCode()) ? "acblessingofmammon_line_1-"+this.getTypeCode() : "acblessingofmammon_line_1-1";
                        nexBoxItem.line.setRes(lineImg);
                    }
                    boxItem.collect.visible = false;
                    if (boxItem.boxAni){
                        boxItem.boxAni.visible = false;
                    }
                    if (this.getTypeCode() == "1"){
                        boxItem.black.visible = false;
                    }
                }
            }
        }
        let currData = this.vo.getCurrProcessIndex();
        let currIndex = currData.index;
        if (currIndex){
            let boxItem =this._boxList[currIndex];
            if (boxItem.line){
                let lineImg = ResourceManager.hasRes("acblessingofmammon_line_2-"+this.getTypeCode()) ? "acblessingofmammon_line_2-"+this.getTypeCode() : "acblessingofmammon_line_2-1";
                boxItem.line.setRes(lineImg);
            }
        }
    }

    private moveScrollView():void{
        let offHeight = 175; //155
        if (this.getTypeCode() == "3" || this.getTypeCode() == "5" || this.getTypeCode() == "6"){
            offHeight = 245; //205
        }
        if (!this._isCanMove){
            return;
        }
        let currData = this.vo.getCurrProcessIndex();
        let currId = currData.index;
        let scrollPosY = 0;
        App.LogUtil.log("currId0 : "+currId);
        let rewardIndex = this.vo.getCurrRewardIndex();
        if (rewardIndex || rewardIndex == 0){
            currId = rewardIndex;
        }
        // if (currId == null && currId != 0){
        //     currId = this.vo.getCurrRewardIndex();
        // }
        App.LogUtil.log("currId1 : "+currId);
        if (currId || currId == 0){
            if (currId < 3){
                scrollPosY = this._boxListContainer.height - this._scrollView.height;
            }
            else{
                scrollPosY = this._boxListContainer.height - this._scrollView.height - offHeight * (currId - 2);
                if (scrollPosY < 0){
                    scrollPosY = 0;
                }
            }
        }
        App.LogUtil.log("scrollPosy: "+scrollPosY);
        let time = Math.abs(this._scrollView.scrollTop - scrollPosY);
        if (scrollPosY >= 0 && time > 0){
            let view = this;
            view._isCanMove = false;
            egret.Tween.get(view._scrollView).call(()=>{view.showViewMask();}).wait(200).to({scrollTop : scrollPosY}, time/2).call(()=>{
                view.hideViewMask();
                view._isCanMove = true;
                egret.Tween.removeTweens(view._scrollView);
            }, view);
        }
    }

    private getRewardCallback(event:egret.Event){
        if (!event.data.ret){
            this._isBoxClick = false;
            return;
        }
        let rData = event.data.data.data;
        // let rInfo = this.vo.getFormatRewards(rData.rewards);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards, "otherRewards":rData.otherrewards, "isPlayAni":true, "callback":()=>{
            this._isBoxClick = false;
            this.freshBox();
            this.moveScrollView();
        } });
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
        let currData = this.vo.getCurrProcessIndex();
        let specialData = this.vo.getSpecialRewardNeed();
        let chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeAllInfo-"+this.getTypeCode());
        if (currData.index || currData.index == 0){
            let chargeName = LanguageManager.getlocal("acBlessingOfMommonBoxName_"+(currData.index + 1)+"-"+this.getTypeCode());
            if (specialData && specialData.skinId && specialData.index == currData.index){
                let specialCfg = Config.ServantskinCfg.getServantSkinItemById(specialData.skinId);
                chargeName = specialCfg.name;
            }
            chargeNumStr = LanguageManager.getlocal("acBlessingOfMommonChargeInfo-"+this.getTypeCode(), [""+currData.needGem, chargeName]);
        }
        this._chargeNum.text = chargeNumStr;
        this._chargeNum.anchorOffsetX = this._chargeNum.width/2;
        if (this.getTypeCode() == "1"){
            this._numBg.width = this._chargeNum.width + 240;
            this._numBg.x = GameConfig.stageWidth/2 - this._numBg.width/2;
            this._chargeNum.x = this._numBg.x + this._numBg.width/2;
        }
            
        if (!this._isBoxClick){
            this.freshBox();
            this.moveScrollView();
        } 
        if (this.vo.isShowRewardRedDot()){
            if (this._flyMoneyBone){
                this._flyMoneyBone.visible = true;
            }
        }
        else{
            if (this._flyMoneyBone){
                this._flyMoneyBone.visible = false;
            }
        }
    }

     //mask
     public showViewMask():void{
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("yiyibusheTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acBlessingOfMommonTimeCountDown", [this.vo.getCountDown()]);
        if (this._acTimeBg){
            this._acTimeBg.width = this._acTimeTf.width + 60;
            this._acTimeBg.x = GameConfig.stageWidth - this._acTimeBg.width - 10;
            this._acTimeTf.x = this._acTimeBg.x + this._acTimeBg.width/2 - this._acTimeTf.width/2;
        } 
    }

    private get cfg():Config.AcCfg.BlessingOfMammonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcBlessingOfMammonVo{
        return <AcBlessingOfMammonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getBgName():string{
        return ResourceManager.hasRes("acblessingofmammon_bg-"+this.getTypeCode()) ? "acblessingofmammon_bg-"+this.getTypeCode() : "acblessingofmammon_bg-1";
    }

    protected getTitleBgName():string{
        return ResourceManager.hasRes("acblessingofmammon_titlebg-"+this.getTypeCode()) ? "acblessingofmammon_titlebg-"+this.getTypeCode() : "acblessingofmammon_titlebg-1";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleStr():string{
        return "";
    }

    protected getRuleInfo():string{
        return "acBlessingOfMommonRuleInfo-"+this.getTypeCode();
    }

    public getTypeCode():string{
        if (this.code == "2"||this.code == "8"){
            return "1";
        }
        else if (this.code == "4"||this.code == "9"){
            return "3";
        }
        else if (this.code == "7"||this.code == "10"){
            return "6";
        }
        return this.code;
    }

    protected getResourceList():string[]{
        let list = [];
        if (this.getTypeCode() != "1"){
            list = ["acblessingofmammoncode1"];
        }
        return super.getResourceList().concat([
            "acliangbiographyview_common_acbg", "collectflag", "acwealthcarpview_servantskintxt", "acblessingofmammon_backmoneybg", "acblessingmammon_fnt1",
            "acblessingofmammoncode"+this.getTypeCode(),
            "acblessingofmammon_bg-"+this.getTypeCode(),
            "acblessingofmammon_titlebg-"+this.getTypeCode(),
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACBLESSINGOFMAMMON_GETREWARD, this.getRewardCallback, this);

        this._acTimeTf = null;
        this._chargeNum = null;
        this._boxList = [];
        this._boxListContainer = null;
        this._scrollView = null;
        this._isBoxClick = false;
        this._flyMoneyBone = null;
        this._numBg = null;
        this._isCanMove = true;
        this._acTimeBg = null;

        super.dispose();
    }
}