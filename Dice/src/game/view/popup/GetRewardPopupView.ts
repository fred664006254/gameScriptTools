/**
 * 宝箱类打开后获得弹窗
 * author qianjun
 */
class GetRewardPopupView extends PopupView{
    private _dbGroup : BaseDisplayObjectContainer = null;
    private _isplay  : boolean = false;
    private _isTween : boolean = false;
    private _hasone:boolean = false;
    private lastY:number;
    private opennum:number = 0;

	public constructor() {
		super();
    }
    
	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view._maskBmp.removeTouchTap();
        view._maskBmp.touchEnabled = true;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        TickMgr.addTick(this.tick, this);
    }
    
    private createRewardGroup():void{
        let view = this;
        view._isplay = false;
        view._hasone = false;
        view.container.y = view.lastY || view.container.y;
        let param = view.param.data;

        let dbGroup = new BaseDisplayObjectContainer();
        // dbGroup.width = GameConfig.stageWidth;
        // dbGroup.height = GameConfig.stageHeigth;
        view.addChildToContainer(dbGroup);
        view._dbGroup = dbGroup;

        let group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;
        view.addChildToContainer(group);

        let resGroup = new BaseDisplayObjectContainer();
        resGroup.width = GameConfig.stageWidth;
        resGroup.height = GameConfig.stageHeigth;
        view.addChildToContainer(resGroup);
        resGroup.visible = true;


        let rewards = GameData.formatRewardItem(param.rewards);

        let boxOpen = BaseBitmap.create(`boxopen`);
        boxOpen.visible = false;
        group.addChild(boxOpen);
        boxOpen.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxOpen, group, [0,0]);

        let boxBottom = BaseBitmap.create(`boxbottom`);
        boxBottom.visible = false;
        group.addChild(boxBottom);
        boxBottom.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxBottom, boxOpen, [0,0]);

        let rewardTitleBg = BaseBitmap.create(`boxrewardtitle`);
        group.addChild(rewardTitleBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardTitleBg, boxOpen, [0,230]);

        let rewardTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysYouGetReward`), TextFieldConst.SIZE_38, ColorEnums.white);
        rewardTxt.strokeColor = 0x7e1201;
        rewardTxt.stroke = 1.5;
        group.addChild(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardTxt, rewardTitleBg, [10,10]);

        let len = Math.min(3,rewards.length);
        let sortRewards:Array<RewardItemVo> = [];
        let birds:Array<RewardItemVo> = [];
        for (let index = 0; index < rewards.length; index++) {
            let item = rewards[index];
            if(item.type == 100){
                birds.splice(0,0, item)
            } else {
                sortRewards.push(item);
            }
        }
        sortRewards = sortRewards.concat(birds);
        
        let list = ComponentMgr.getScrollList(GetrewardItem, sortRewards, new egret.Rectangle(0,0, len * 157, rewards.length > 3 ? 400 : 188));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, rewardTitleBg, [0,rewardTitleBg.height+10]);
        group.addChild(list);
        
		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,LangMger.getlocal(`confirmBtn`),view.closeHandler,view);
        conBtn.setColor(ColorEnums.white);
        conBtn.setTextPos(null,25);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, conBtn, list, [0,list.height+55]);
		group.addChild(conBtn);
		//宝箱连续购买
		if(param.isBoxBuy){
			let specialBoxId = param.specialBoxId;
            let specialBoxCfg = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId));
            
            let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL,``,view.clickConHandler,view);
            buyBtn.setColor(ColorEnums.white);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, buyBtn, list, [0,list.height+55]);
            group.addChild(buyBtn);
            buyBtn.setTextPos(null,25);

			// conBtn.setText(specialBoxCfg.costGem1.toString());
			// conBtn.addTextIcon(`public_icon1`);

			let costGroup = new BaseDisplayObjectContainer();
            costGroup.width = buyBtn.width;
            costGroup.height = buyBtn.height;

			let costicon = BaseBitmap.create(`ab_mainui_gem`);
			costGroup.addChild(costicon);
            costicon.setScale(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, costGroup, [10,10]);
	
			let costTxt = ComponentMgr.getTextField(`${specialBoxCfg.costGem}`, TextFieldConst.SIZE_CONTENT_COMMON);
			costGroup.addChild(costTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt, costicon, [costicon.width*costicon.scaleX+15,0]);

			let shopline = BaseBitmap.create(`shopview_line`);
			shopline.width = costTxt.width + 20;
			costGroup.addChild(shopline);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, costTxt);
            
            let buyTxt = ComponentMgr.getTextField(`${specialBoxCfg.costGem1}`, TextFieldConst.SIZE_CONTENT_COMMON);
			costGroup.addChild(buyTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, buyTxt, costTxt, [0,costTxt.textHeight+5]);

            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, conBtn, [0,-costGroup.height]);
            buyBtn.addChild(costGroup);

            let reopenbg = BaseBitmap.create(`boxreopenbg`);
            buyBtn.addChild(reopenbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, reopenbg, buyBtn, [-5,0]);

            let reopenTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopreopen`), TextFieldConst.SIZE_16);
            buyBtn.addChild(reopenTxt);
            reopenTxt.strokeColor = ColorEnums.btnStrokeBlue;;
            reopenTxt.stroke = 1.5;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, reopenTxt, reopenbg, [0, 5]);

        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, list, [0,list.height+55]);
        }
        group.height = Math.min(group.height, 926);
        group.x = (view.width - group.width) / 2;
        group.y = (view.height - group.height) / 2;

        // DEBUG: 调试阶段用播放龙骨动画，提交代码是要记得放开
        if(App.CommonUtil.check_dragon()){
            rewards = GameData.formatRewardItem(param.rewards);
            this._isTween = true;
            group.alpha = 0;
            let arr = [];
            for(let i in rewards){
                let unit = rewards[i];
                if(unit.type == 100){
                    arr.push(unit);
                }
            }
            let idx = -1;

            let hasLoad = false;
            //宝箱动画
            let boxdb = App.DragonBonesUtil.getLoadDragonBones(`royalpass_bxani`,1,`idle1`, ()=>{
                hasLoad = true;
            });
            boxdb.name = `boxdb`;
            boxdb.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, (evt)=>{
                if(evt.animationName == `idle2`){
                    // view._isplay = false;
                }
                else if(evt.animationName == `idle1`){
                    // view._isplay = false;
                    boxdb.playDragonMovie(`idle3`,0);
                } else if (evt.animationName == `idle3` && view._isplay) {
                    view._isplay = false;
                }
            }, view);

            let tip = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            dbGroup.addChild(tip);
            tip.stroke = 2;
            tip.width = GameConfig.stageWidth;
            tip.textAlign = egret.HorizontalAlign.CENTER;
            tip.text = LangMger.getlocal("sysclickbox");

            // 一键领取按钮
            let allreward = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("sysrewardall"), ()=>{
                this._hasone = true;
                boxdb.playDragonMovie(`idle2`,1);
                boxdb.getDBobj().animation.timeScale = 100000;
                resGroup.visible = false;
                fguang.alpha = 0;
                xunhuan.visible = false;
                let diecIcon = <BaseDisplayObjectContainer>dbGroup.getChildByName(`diceicon`);
                if(diecIcon){
                    diecIcon.visible = false;
                    egret.Tween.removeTweens(diecIcon);
                    diecIcon.dispose();
                    diecIcon = null;
                }
                if(diceShow){
                    diceShow.alpha = 0;
                    diceShow.stop();
                }
                tip.visible = false;
                remainG.visible = false;
                egret.Tween.removeTweens(remainG);
                allreward.visible = false;
                // group.y = GameConfig.stageHeigth;
                view.removeTouchTap();
                egret.Tween.get(boxdb, {onChange : ()=>{
                    fguang.y = boxdb.y - 130;
                }, onChangeObj : view}).to({y : group.y + 253}, 500).call(()=>{
                    fguang.setPosition(boxdb.x,group.y + 120);
                    fguang.alpha = 1;
                    egret.Tween.removeTweens(boxdb);
                    egret.Tween.get(group).to({alpha : 1}, 200).call(()=>{
                        egret.Tween.removeTweens(group);
                        this._isTween = false;
                    }, view);
                }, view);
                view.lastY = view.container.y;
                view.container.y = 0;
            }, this);
            
            allreward.visible = false;
            dbGroup.addChild(allreward);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, allreward, tip, [0,0]);
            
            // 显示还有多少个奖励
            let remainG = new BaseDisplayObjectContainer();
            // dbGroup.addChild(remainG);
            let remainbg = BaseBitmap.create("getrewardremain");
            remainG.addChild(remainbg);

            let remaintip = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            remainG.addChild(remaintip);
            remaintip.stroke = 2;
            remaintip.text = String(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, remaintip, remainbg, [-6,0]);
            remainG.visible = false;

            // 循环效果
            let xunhuan = App.DragonBonesUtil.getLoadDragonBones("box_effect_xunhuan");
            xunhuan.alpha = 1;
            xunhuan.x = GameConfig.stageWidth / 2;
            xunhuan.y = boxdb.y - 645;
            dbGroup.addChild(xunhuan);
            let pizhiarr = {
                1: "bai",
                2: "lan",
                3: "zi",
                4: "huang"
            }
            boxdb.setDragonBoneEventListener(dragonBones.EventObject.FRAME_EVENT,(evt)=>{
                if(evt.frameLabel == "do"){
                    if(idx >= arr.length || this._hasone)
                        return;
                        
                    remainG.visible = true;
                    let unit = arr[idx];
                    let dicecfg = Config.DiceCfg.getCfgById(unit.id);
                    
                    let playani:Function = (evt)=>{
                        if(evt.frameLabel == "niao"){
                            if(idx >= arr.length)
                            return;

                            let unit = arr[idx];
                            let dicecfg = Config.DiceCfg.getCfgById(unit.id);
                            let curlv = Api.DiceVoApi.getDiceLvById(unit.id.toString());
                            let needNum = dicecfg.getNextLvCostNumByLv(curlv + 1);
                            let curNum = Api.DiceVoApi.getDiceNumById(unit.id.toString());
                            let ismaxlevel = curlv == dicecfg.maxGrade;
                            let canlevelup = curNum >= needNum && !ismaxlevel;
                            let diceicon = App.CommonUtil.getDiceIconById(unit.id.toString(), 1, true, Api.DiceVoApi.notOld(unit.id.toString()));
                            // let shadow = diceicon.getChildByName(`shadow`);
                            // if(shadow){
                            //     shadow.visible = false;
                            // }
                            diceicon.anchorOffsetX = diceicon.width / 2;
                            diceicon.anchorOffsetY = diceicon.height / 2;
                            dbGroup.addChildAt(diceicon, dbGroup.getChildIndex(diceShow) - 1);
                            diceicon.alpha = 1;
                            // diceicon.scaleX = 0;
                            // diceicon.scaleY = 0;
                            diceicon.name = `diceicon`;
                            diceicon.setPosition(diceShow.x,diceShow.y);
                            let num = ComponentMgr.getTextField('11', 44, ColorEnums.white);
                            num.width = 200;
                            num.textAlign = egret.HorizontalAlign.CENTER;
                            diceicon.addChild(num);
                            num.text = `x${unit.num}`;
                            num.y = 200 + 10;

                            let nameTxt  = ComponentMgr.getTextField(`${dicecfg.name}`, TextFieldConst.SIZE_44);
                            nameTxt.lineSpacing = 5;
                            resGroup.addChild(nameTxt);
                            nameTxt.setPosition(350 , diceicon.y - diceicon.height / 2 + 30);
                            nameTxt.alpha = 0;

                            // 品质
                            let qualityTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, GameConfig.getQualityColor(dicecfg.quality));
                            resGroup.addChild(qualityTxt);
                            qualityTxt.stroke = 2;
                            qualityTxt.strokeColor = ColorEnums.strokeBlack;
                            qualityTxt.textColor = GameConfig.getQualityColor(dicecfg.quality);
                            qualityTxt.text = LangMger.getlocal(`quality${dicecfg.quality}`);
                            qualityTxt.x = nameTxt.x;
                            qualityTxt.y = nameTxt.y + nameTxt.height + 20;
                            qualityTxt.alpha = 0;
                            // 小鸟当前等级
                            let lvTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, GameConfig.getQualityColor(dicecfg.quality));
                            resGroup.addChild(lvTxt);
                            lvTxt.stroke = 2;
                            lvTxt.strokeColor = ColorEnums.strokeBlack;
                            lvTxt.textColor = GameConfig.getQualityColor(dicecfg.quality);
                            lvTxt.text = LangMger.getlocal("shopgetboxlv", [String(curlv)]);
                            lvTxt.x = nameTxt.x;
                            lvTxt.y = qualityTxt.y + qualityTxt.height * 2;
                            lvTxt.alpha = 0;
                            
                            allreward.visible = arr.length - idx - 1 > 0;

                            let progressGroup = new BaseDisplayObjectContainer();
                            resGroup.addChild(progressGroup);
                            progressGroup.alpha = 0;

                            let progressbg = `dicelevelupprogress`;
                            let arrowres = `public_arrowblue`;
                            if(ismaxlevel){
                                progressbg = `dicelevelupprogress3`;
                                arrowres = ``;
                            }
                            else if(canlevelup){
                                arrowres = `public_arrowgreen`;
                                progressbg = `dicelevelupprogress2`;
                            }

                            let progress = ComponentMgr.getProgressBar(progressbg,`dicelevelupprogress_bg`,180);//progress_bg_1
                            progressGroup.addChild(progress);
                            let lastnum = (curNum - unit.num )> 0 ? curNum - unit.num : 0;
                            progress.setPercentage(lastnum/needNum);
                            // progress.tweenTo(curNum/needNum,500);
                            
                            if(needNum > 99 || curNum > 99)
                            {
                               progress.setTextSize(TextFieldConst.SIZE_30); 
                            }
                            else
                            {
                                progress.setTextSize(TextFieldConst.SIZE_36); 
                            }

                            let progress2 = BaseBitmap.create(progressbg);
                            progress2.width = 180;
                            progress2.blendMode = egret.BlendMode.ADD;
                            // progressGroup.addChild(progress2);
                            progress2.setPosition(progress.x,progress.y);
                            progress2.mask = new egret.Rectangle(0, 0, progress2.width * (ismaxlevel ? 1 : (curNum/needNum)), progress2.height);
                            progress2.alpha = 0;

                            let arrow = BaseBitmap.create(arrowres);
                            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow, progress, [-20,0]);
                            progressGroup.addChild(arrow);

                            let arrow2 = BaseBitmap.create(arrowres);
                            arrow2.blendMode = egret.BlendMode.ADD;
                            arrow2.setPosition(arrow.x,arrow.y);
                            // progressGroup.addChild(arrow2);
                            arrow2.alpha = 0;

                            progressGroup.anchorOffsetX = progressGroup.width / 2;
                            progressGroup.anchorOffsetY = progressGroup.height / 2;
                            progressGroup.setPosition(410 + 214, lvTxt.y + lvTxt.height + 55);

                            // fguang.setPosition(diceicon.x,diceicon.y);
                            let waitNum = 0;
                            let timeparam = BattleStatus.timeparam;

                            let endX = 450;// nameTxt.x + 50;
                            // egret.Tween.get(diceicon).wait(8 * timeparam).to({scaleX : 0.2, scaleY : 0.2}, 5 * timeparam).to({scaleX : 1, scaleY : 1}, 3 * timeparam);
                            egret.Tween.get(diceicon).to({alpha : 1}, 2 * timeparam).wait(8 * timeparam).to({x : 210}, 7 * timeparam)
                            .call(()=>{
                                xunhuan.alpha = 1;
                                xunhuan.x = diceicon.x;
                                xunhuan.y = diceicon.y;
                                xunhuan.playDragonMovie(`box_effect_xunhuan_${pizhiarr[dicecfg.quality]}`, 0);
                                
                            });
                            let gt =  egret.Tween.get(progressGroup);
                            gt.wait(10 * timeparam).call(()=>{
                                // nameTxt.alpha = 1;
                                nameTxt.alpha = 1;
                                qualityTxt.alpha = 1;
                                qualityTxt.x = nameTxt.x +15;
                                lvTxt.alpha = 0;
                                let last = nameTxt.x;
                                nameTxt.x = last + 30
                                lvTxt.x = last + 40;
                                // egret.Tween.get(nameTxt).to({x: nameTxt.x - 30}, 2*timeparam).to({x:nameTxt.x +15}, 2*timeparam).to({x:nameTxt.x}, 3*timeparam)
                                egret.Tween.get(nameTxt).to({x:last}, 3*timeparam)
                                .call(()=>{
                                    egret.Tween.removeTweens(nameTxt);
                                });
                                egret.Tween.get(qualityTxt).to({x:last}, 2*timeparam)
                                .call(()=>{
                                    egret.Tween.removeTweens(qualityTxt);
                                });
                                egret.Tween.get(lvTxt).to({x:last, alpha:1}, 2*timeparam)
                                .call(()=>{
                                    egret.Tween.removeTweens(lvTxt);
                                });
                            }, view).to({alpha : 1, x : endX}, 7 * timeparam)
                            .call(()=>{
        
                                App.CommonUtil.changeNumTween(lastnum, curNum, 500, (num)=>{
                                    try {
                                        if(ismaxlevel){
                                            progress && progress.setPercentage(1);
                                            progress && progress.setText(`${num}`);
                                        }	
                                        else{
                                            progress && progress.setText(`${num}/${needNum}`);
                                        }
                                    } catch (error) {
                                        App.LogUtil.log(error);
                                    }
                                });
                                if(ismaxlevel){
                                    progress && progress.setPercentage(1);
                                }	
                                else{
                                    progress.tweenTo(curNum/needNum, 500);
                                }
                            });

                            if(unit.num > 1){
                                let sxNum = unit.num > 4 ? 4 : unit.num;
                                for(let index = 0; index < sxNum; index++)
                                    gt.to({scaleX : 0.9}, 0.5 * timeparam).to({scaleX : 1}, 0.5 * timeparam).to({scaleX : 1.1}, 0.5 * timeparam).to({scaleX : 1}, 0.5 * timeparam)
                            }

                            gt.call(()=>{ // egret.Tween.get(progressGroup).wait(16 * timeparam)
                                arrow2.alpha = 1;
                                progress2.alpha = 1;
                                egret.Tween.get(arrow2).to({alpha : 0}, 5 * timeparam);
                                egret.Tween.get(progress2).to({alpha : 0}, 5 * timeparam).call(()=>{
                                    view._isplay = false;
                                    egret.Tween.removeTweens(diceicon);
                                    egret.Tween.removeTweens(progressGroup);
                                    egret.Tween.removeTweens(arrow2);
                                    egret.Tween.removeTweens(progress2);
                                    // fguang.alpha = 0;
                                    // if(idx < arr.length - 1){
                                    //     // boxdb.playDragonMovie(`idle3`,0);
                                    //     // boxdb.playDragonMovie(`idle1`,0);
                                    // }
                                },view);
                            }, view)
                          
                        }
                        
                    }

                    diceShow.alpha = 1;
                    diceShow.playDragonMovie(`box_effect_kaidan_${pizhiarr[dicecfg.quality]}`,1); // `box_effect_kaidan_${pizhiarr[dicecfg.quality]}`
                    diceShow.setDragonBoneEventListener(dragonBones.EventObject.FRAME_EVENT, playani, view);
                }
            },view);


            view.addTouchTap(()=>{
                if(view._isplay || !hasLoad){
                    return;
                }
                fguang.alpha = 0;
                xunhuan.alpha = 0;
                view._isplay = true;
                this.opennum = 0;
                ++ idx;
                let diecIcon = <BaseDisplayObjectContainer>dbGroup.getChildByName(`diceicon`);
                if(diecIcon){
                    diecIcon.alpha = 0;
                    egret.Tween.removeTweens(diecIcon);
                    diecIcon.dispose();
                    diecIcon = null;
                }
                if(diceShow){
                    diceShow.alpha = 0;
                    diceShow.stop();
                }
                remaintip.text = String(Math.max(0, arr.length - idx - 1));
                allreward.visible = (arr.length - idx - 1 > 0) ? allreward.visible : false;

                resGroup.removeChildren();
                if(idx == arr.length){
                    tip.visible = false;
                    remainG.visible = false;
                    allreward.visible = false;
                    egret.Tween.removeTweens(remainG);
                    // group.y = GameConfig.stageHeigth;
                    view.removeTouchTap();
                    egret.Tween.get(boxdb, {onChange : ()=>{
                        fguang.y = boxdb.y - 130;
                    }, onChangeObj : view}).to({y : group.y + 253}, 800).call(()=>{
                        fguang.setPosition(boxdb.x,group.y + 120);
                        fguang.alpha = 1;
                        egret.Tween.removeTweens(boxdb);
                        egret.Tween.get(group).to({alpha : 1}, 500).call(()=>{
                            egret.Tween.removeTweens(group);
                            this._isTween = false;
                        }, view);
                    }, view);
                    view.lastY = view.container.y;
                    view.container.y = 0;
                }
                else{
                    let remainTween = egret.Tween.get(remainG);
                    remainTween.to({scaleX: 0.9, scaleY:0.9}, 100)
                    .to({scaleX:1, scaleY:1}, 100)
                    .call(()=>{
                        egret.Tween.removeTweens(remainG);
                    });
                    fguang.setPosition(boxdb.x,boxdb.y-130);
                    fguang.alpha = 1;
                    boxdb.playDragonMovie(`idle2`,1);

                    if(Config.DiceCfg.getCfgById(arr[idx].id).quality == 4)
                    {
                        SoundMgr.playEffect(SoundConst.EFFECT_BOX_EXTENDED);
                    }
                    else
                    {
                        SoundMgr.playEffect(SoundConst.EFFECT_BOX);
                    }
                }
            },view);
            dbGroup.addChild(boxdb);
            boxdb.width = 324;
            boxdb.height = 253;
            boxdb.x = GameConfig.stageWidth / 2;
            boxdb.y = GameConfig.stageHeigth / 2 + boxdb.height + 100;
            tip.y = boxdb.y + 30;
            allreward.y = tip.y + tip.height + 10;
            
            //发光
            let fguang = App.DragonBonesUtil.getLoadDragonBones(`royalpass_bxvfx`, 0, `idle`);
            // let fguang = App.DragonBonesUtil.getLoadDragonBones(`box_effect_xunhuan`, 0, `idle`);
            dbGroup.addChild(fguang);
            fguang.alpha = 0;

            //小鸟出现
            // let diceShow = App.DragonBonesUtil.getLoadDragonBones(`royalpass_bxfx`);
            let diceShow = App.DragonBonesUtil.getLoadDragonBones(`box_effect_kaidan`);
            diceShow.alpha = 1;
            diceShow.x = GameConfig.stageWidth / 2;
            diceShow.y = boxdb.y - 645;
            dbGroup.addChild(diceShow);

            dbGroup.addChild(remainG);
            remainG.x = boxdb.x + 97;
            remainG.y = boxdb.y - 263;

        }
        else{
            boxOpen.visible = boxBottom.visible = false;
        }
    }

	protected resetBgSize():void{
        super.resetBgSize();
        this.createRewardGroup();
        
        // this.container.y = 50;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, view);
	}

	protected isTouchMaskClose():boolean{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void{
        let param=this.param;
        if(this._isTween){
            return;
        }
		// if (!param.data.clickNotAutoHide) {
		// 	this.hide();
		// }
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
    }
    
    protected tick(){
        if(this._isplay){
            this.opennum ++;
            if(this.opennum >= 5){
                this._isplay = false;
                this.opennum = 0;
            }
        }
    }
    
    protected getBgName():string{
		return "public_ab_scenebg"
	}
    
    protected getTitleBgName(){
        return null;
    }

    protected getTitleStr(){
        return null;
	}
	
	protected getCloseBtnName():string{
		return null;//this.param.data.needClose === 1 ? 
	}

	protected closeHandler(){
        let param=this.param;
        if(this._isTween){
            return;
        }
        if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}

    protected switchToTop(data):void{
        super.switchToTop(data);
        this.param = data;
        this.playHideViewEffect(()=>{
            this.container.removeChildren();
            this._dbGroup.removeChildren();
            this.createRewardGroup();
            this.playOpenViewEffect();
        },this);
    }


	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `shopview_line`,`getrewardpopupview`,`progress24_bg`,`progress24`,`progress25`,`progress26`
		]);
	}

	public dispose():void{
        TickMgr.removeTick(this.tick, this);
        this._dbGroup = null;
        this._isplay = false;
        this._isTween = false;
        this._hasone = false;
		super.dispose();
	}
}