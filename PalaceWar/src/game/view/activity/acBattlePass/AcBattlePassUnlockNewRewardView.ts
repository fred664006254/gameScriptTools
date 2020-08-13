/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcBattlePassUnlockNewRewardView extends CommonView
{
    private _nodeContainer : BaseDisplayObjectContainer = null;
    private _bottomGroup : BaseDisplayObjectContainer = null;
    private _curLevel : number = 1;
    private _stop = false;
	public constructor() {
		super();
	}

	private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getUiCode():string{
        let code = ``;
        switch(Number(this.code)){
            case 2:
                code = '1';
                break;
            case 7:
                code = '4';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }
	
	protected getResourceList():string[]{
		return super.getResourceList().concat([
            "battlepassglow",`shopview_line`,
			"acseventopbg",`btn_small_orange`,`battlepassunlockbottom`,`battlepassunlockrect`,`battlepassunlockbg`,`allianceweekendview_goldline`,`luckydrawbg-1`,
		]);
    }
    
    protected isHideTitleBgShadow():boolean
	{
		return true;
	}

	protected getRuleInfo():string{
        let view = this;
        let code = view.code;
		return App.CommonUtil.getCnByCode("acBattlePassRuleInfo", code);
    } 
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}
    protected getExtraRuleInfo():string
    {   
        if (this.code != "1")
        {
            let params:string[] = [];
            if ( Api.switchVoApi.checkServantRefuseBattle())
            {
                params.push(LanguageManager.getlocal(`acBattlePassRuleInfo-${this.code}_part1`));
            }
            else
            {
                params.push("");
            }
            return LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRuleInfo", this.code), params);
        }
        return null;
    }

	// protected getTitleStr():string{
	// 	return `acBattlePassBuyUnlockTitle-${this.getUiCode()}`;
	// }
	protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        let view = this;
        return App.CommonUtil.getResByCode(`battlepassunlocktitle`, this.code);
    }

    protected getBgName():string{
        return `luckydrawbg-1`;
    }

	protected initView():void{	
		let view = this;
		view._curLevel = view.vo.getMyBattleLevel();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
		view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
		let code = view.getUiCode();
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = 610;
		let str = '';

        let topGroup = new BaseDisplayObjectContainer();
        topGroup.width = GameConfig.stageWidth;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topGroup, view, [0, 60]);
        view.addChildAt(topGroup, view.getChildIndex(view.titleBg) - 1);
        
		let topBg = BaseBitmap.create(`acseventopbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, topGroup, [0,0], true);
		topGroup.addChild(topBg);

        let topTip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip9`, code)), 18);
		topTip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topTip1Txt, topBg, [0,50]);
		topGroup.addChild(topTip1Txt);
				
		let tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip10`, code), [`${view.cfg.maxlevel}`]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1Txt, topTip1Txt, [0,topTip1Txt.textHeight+15]);
        topGroup.addChild(tip1Txt);

        let bottomGroup = new BaseDisplayObjectContainer();
        let bottomBg = BaseBitmap.create(`battlepassunlockbottom`);
        bottomGroup.addChild(bottomBg);
        view._bottomGroup = bottomGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomGroup, view);

        for(let i = 0; i < 2; ++ i){
            let light = BaseBitmap.create(`battlepassglow`);
            bottomGroup.addChild(light);
            App.DisplayUtil.setLayoutPosition(i == 0 ? LayoutConst.lefttop : LayoutConst.righttop, light, bottomBg, [-25, -40]);
            egret.Tween.get(light, {loop : true}).to({alpha : 0}, 500).to({alpha : 1}, 500);
        }

		let listbg = BaseBitmap.create(`battlepassunlockbg`);
		listbg.height = bottomGroup.y - 158;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [0,218]);
        view.addChild(listbg);
		
		// let rankList = view.cfg.getBattleInfoArr();
		let tmpX = 20;
		let scroStartY = 3;

        let myBattlelevel = view.vo.getMyBattleLevel();
        let rankList = view.cfg.getBattleInfoArr();
        let rItem = rankList[0];
        let info = view.cfg.getBattleInfo(rItem.unlockBP);
        let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(info.unlockRecharge);//
        let level = rItem.unlockBP == `advanced` ? 3 : 2;

        //奖励物品
        let startY = 10;
        let arr = [[`1`,0],[`2`,0]];
        let reward = view.cfg.show1.reward;
        for(let i in reward){
            let unit = reward[i];
            // let rewardvo = unit[0];
            // if(rewardvo.type == 11 && !Api.switchVoApi.checkIsTitleState(rewardvo.id.toString())){
            //     continue;
            // }
            arr.push(unit);
        }
        for(let i in arr){
            let group = new BaseDisplayObjectContainer();
            group.height = 105;
            group.width = 610;
            group.y = startY;
            view._nodeContainer.addChild(group);

            let unit = arr[i];
            let icon = null;
            let str = ``;
            //道具
            let tmpx = 20;
            let rewardvo = GameData.formatRewardItem(String(unit[0]))[0];
            if(unit[0] == `1`){
                 //元宝
                icon = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassunlockicon1`, code));
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip1`, code), [rechargeCfg.gemCost.toString()]);
            }
            else if(unit[0] == `2`){
                let cost = 0;
                for(let i in view.cfg.show){
                    let unit = view.cfg.show[i];
                    if(unit.unlockBP == `lv` && unit.lvAdd == info.lvAdd){
                        cost = unit.cost;
                        break;
                    }
                }
                icon = BaseLoadBitmap.create(App.CommonUtil.getResByCode(`battlepassicon`, code));
                icon.width = 100;
                icon.height = 100;
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip2`, code), [info.lvAdd, cost]);
            }
            else if(rewardvo.type == 8){
                group.addTouchTap(()=>{
                    let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                    if(index >= 1){
                        ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                            aid : this.aid,
                            code : this.code
                        });
                    }
                }, view);
                icon = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassunlockicon3`, code));

                let servantcfg = Config.ServantCfg.getServantItemById(rewardvo.id);
                let init = Api.servantVoApi.getServantAptitude(rewardvo.id.toString());
                let speciality = servantcfg.speciality;
                let specialityStr = "";
                for (let i = 0; i < speciality.length; i++) {
                    specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，"
                }
                specialityStr = specialityStr.substr(0, specialityStr.length - 1);
                let servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr]);
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip3`, code), [servantcfg.name, init.toString(), specialityStr]);
            }
            else if(rewardvo.type == 10){
                group.addTouchTap(()=>{
                    let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                    if(index >= 1){
                        ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                            aid : this.aid,
                            code : this.code
                        });
                    }
                }, view);
                icon = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassunlockicon2`, code));

                let wifecfg = Config.WifeCfg.getWifeCfgById(rewardvo.id);
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip4`, code), [wifecfg.name, wifecfg.glamour.toString()]);
            }
            else{
                tmpx = 40;
                icon = GameData.getItemIcon(rewardvo, false, true);
                icon.setScale(0.7);
                let numlb = icon.getChildByName(`numLb`);
                if(numlb){
                    numlb.visible = false;
                }
                let numbg = icon.getChildByName(`numbg`);
                if(numbg){
                    numbg.visible = false;
                }
                if(rewardvo.type == 11){
                    let tcfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
                    if(tcfg.isTitle == 2){
                        icon = App.CommonUtil.getHeadPic(String(rewardvo.id), 10);
                        icon.setScale(0.9);
                        tmpx = 30;
                    }
                    else{
                        icon = App.CommonUtil.getTitlePic(String(rewardvo.id), 10);
                        icon.setScale(0.75);
                        tmpx = 20;
                    }
                    group.addTouchTap(()=>{
                        let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if(index >= 1){
                            ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                                aid : this.aid,
                                code : this.code
                            });
                        }
                    }, view);
                    
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode((tcfg && tcfg.isTitle == 2) ? `battlepassunlocktip5` : `battlepassunlocktip6`,code), [String(unit[1])]);
                }
                else if(rewardvo.type == 24){
                    group.addTouchTap(()=>{
                        let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if(index >= 1){
                            ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                                aid : this.aid,
                                code : this.code
                            });
                        }
                    }, view);
                    let tcfg = Config.TitleCfg.getTitleCfgById(rewardvo.id);
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip7`, code), [String(unit[1])]);
                }
                else if(rewardvo.type == 16){
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip8`, code), [String(unit[1]),LanguageManager.getlocal(`itemType16`),rewardvo.name]);
                    group.addTouchTap(()=>{
                        let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if(index >= 1){
                            ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                                aid : this.aid,
                                code : this.code
                            });
                        }
                    }, view);
                }
                else if(rewardvo.type == 19){
                    group.addTouchTap(()=>{
                        let index = view.cfg.showDetail.indexOf(String(unit[0])) + 1;
                        if(index >= 1){
                            ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                                aid : this.aid,
                                code : this.code
                            });
                        }
                    }, view);
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip8`, code), [String(unit[1]),LanguageManager.getlocal(`itemType19`),rewardvo.name]);
                }
                else if(rewardvo.type == 1025 || rewardvo.type == 1026){
                    group.addTouchTap(()=>{
                        // for(let i in view.cfg.showDetail){
                        //     let vo = GameData.formatRewardItem(view.cfg.showDetail[i])[0];
                        //     if(vo.type == rewardvo.type){
                        //         index = Number(i) + 1;
                        //         break;
                        //     }
                        // }
                        let index = view.cfg.showDetail.indexOf(`1025_${view.code}_1`) + 1;
                        if(index >= 1){
                            ViewController.getInstance().openView(`AcBattlePassRewardPopupView|${index}`, {
                                aid : this.aid,
                                code : this.code
                            });
                        }
                    }, view);
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(rewardvo.type == 1025 ? `battlepassunlocktip9` : `battlepassunlocktip10`,code), [String(unit[1]),rewardvo.name]);
                } 
                else{
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`battlepassunlocktip11`, code), [String(unit[1]),rewardvo.num.toString(),rewardvo.name]);
                }
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, group, [tmpx,0], true);
            group.addChild(icon);

            let descTxt = ComponentManager.getTextField(str, 22, TextFieldConst.COLOR_BLACK);
            descTxt.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, group, [150, 0], true);
            group.addChild(descTxt);

            let line1 = BaseBitmap.create("allianceweekendview_goldline");
            line1.width = 600;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line1, group, [0,0], true);
			group.addChild(line1);
            //说明
            startY += group.height;

        }

        let alphamask = BaseBitmap.create(`public_alphabg`);
        alphamask.width = view._nodeContainer.width;
        alphamask.height = view._nodeContainer.height;
        view._nodeContainer.addChildAt(alphamask,0);

		let rect = new egret.Rectangle(0,0,610,listbg.height-150);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, listbg, [0,5]);
		scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);

        let rectmask = BaseBitmap.create(`battlepassunlockrect`);
        rectmask.width = 690;
        rectmask.height = 63;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rectmask, scrollView, [0,scrollView.height - rectmask.height + 10]);
        view.addChild(rectmask);
        rectmask.alpha = 0;
        
		let btn = ComponentManager.getButton(`btn_small_orange`, ``, ()=>{
            if(this._stop){
                return;
            }
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null){	
				ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
				return;
			}
			//购买等级
			PlatformManager.checkPay(info.unlockRecharge); 
		}, view);
		//
		let twStr = PlatformManager.getMoneySign();
		btn.setText(`${twStr + rechargeCfg.cost}${LanguageManager.getlocal(`acPunishBuyItemBuy`)}`, false); 
		if(PlatformManager.checkIsEnLang())
		{
			btn.setText(`${twStr + rechargeCfg.cost}`, false); 
		}
        if(PlatformManager.checkisLocalPrice()&&rechargeCfg.platFullPrice)
        {
            btn.setText(rechargeCfg.platFullPrice,false); 
        }
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bottomBg, [0,15]);
		bottomGroup.addChild(btn);
		btn.name = `btn${level}`;
        btn.visible = false;

        let originPrice = `${LanguageManager.getlocal(`originalPriceTitle`)}：${twStr}99.99`;
        let originPriceTxt = ComponentManager.getTextField(originPrice, 24);
        bottomGroup.addChild(originPriceTxt);
        originPriceTxt.name = `originPriceTxt${level}`;
        originPriceTxt.visible = false;
        originPriceTxt.setPosition(btn.x + btn.width/2 - originPriceTxt.width/2, btn.y + btn.height + 7);

        let shopline = BaseBitmap.create("shopview_line");
        shopline.name = `shopline${level}`;
        shopline.visible = false;
        shopline.width = originPriceTxt.width + 16;
        shopline.height = 17;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, originPriceTxt, [0, -2]);
        bottomGroup.addChild(shopline);
              
		let collectImg = BaseBitmap.create(`battlepassrewardget`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectImg, btn);
		bottomGroup.addChild(collectImg);
		collectImg.name = `flag${level}`;
		collectImg.visible = false;

		if(myBattlelevel == 3){
			collectImg.visible = true;
		}
		else if(myBattlelevel == 1){
            if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                originPriceTxt.visible = shopline.visible = true;
            }
            btn.visible = true;
		}
		else{
			if(level == 2){
				collectImg.visible = true;
			}
			else{
                btn.visible = true;
                if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                    originPriceTxt.visible = shopline.visible = true;
                }
                btn.visible = true;
			}
		}
        view.setChildIndex(view.closeBtn, 99);
        view.addChild(bottomGroup);
        /** 
         * 公告横条：
            位移距离：119px
                时间：0~0.2m


            卷轴背景：
            距离：1035px
            时间：0.2~0.6m

            卷轴内容
            距离：1035px
            时间：0.2~0.8m

            下面板+按钮
            距离：99px
            时间：0.8~1m
        */
        view._stop = true;
        topGroup.alpha = 0;
        let tmpY = topGroup.y;
        topGroup.y -= 119;
        egret.Tween.get(topGroup).to({y : tmpY, alpha : 1}, 200).call(()=>{
            egret.Tween.removeTweens(topGroup);
        }, view);

        listbg.alpha = 0;
        if(Number(this.code) >= 3 && !Api.switchVoApi.checkCloseBone() && RES.hasRes(`battlepass_unlockbg1_tex_png`) && App.CommonUtil.check_dragon()){
            let lamp1 = App.DragonBonesUtil.getLoadDragonBones(`battlepass_unlockbell1`);
            lamp1.x = 320;
            lamp1.y = 994 + scrollView.y;
            view.addChild(lamp1);
            
            let list = App.DragonBonesUtil.getLoadDragonBones(`battlepass_unlockbg1`, 1, `appear`);
            list.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
                list.playDragonMovie(`idle`, 0);
            },this);  
            list.x = 320;
            list.scaleY = (listbg.height / 926);
            list.y = listbg.height + 255;
            view.addChildAt(list, view.getChildIndex(listbg) - 1);

            scrollView.alpha = 0;
            let scroy = scrollView.y;
            scrollView.y -= 1035;

            bottomGroup.alpha = 0;
            let bottomy = bottomGroup.y;
            bottomGroup.y += 99;

            egret.Tween.get(scrollView).wait(1200).to({y : scroy, alpha : 1}, 600).call(()=>{
                egret.Tween.removeTweens(scrollView);
                rectmask.alpha = 1;
            }, view);
    
            egret.Tween.get(bottomGroup).wait(1800).to({y : bottomy, alpha : 1}, 200).call(()=>{
                egret.Tween.removeTweens(bottomGroup);
                view._stop = false;
            }, view);
        }
        else{
            let listy = listbg.y;
            listbg.y -= 1035;
            egret.Tween.get(listbg).wait(200).to({y : listy, alpha : 1}, 400).call(()=>{
                egret.Tween.removeTweens(listbg);
            }, view);
    
            scrollView.alpha = 0;
            let scroy = scrollView.y;
            scrollView.y -= 1035;
    
            egret.Tween.get(scrollView).wait(200).to({y : scroy, alpha : 1}, 600).call(()=>{
                egret.Tween.removeTweens(scrollView);
                rectmask.alpha = 1;
            }, view);

            bottomGroup.alpha = 0;
            let bottomy = bottomGroup.y;
            bottomGroup.y += 99;
    
            egret.Tween.get(bottomGroup).wait(800).to({y : bottomy, alpha : 1}, 200).call(()=>{
                egret.Tween.removeTweens(bottomGroup);
                view._stop = false;
            }, view);
        }
	}

	private buyCallback() : void{
		let view = this;
		let myBattlelevel = view.vo.getMyBattleLevel();
		if(myBattlelevel == view._curLevel){
			return;
		}
		view._curLevel = myBattlelevel;
		for(let i = 2; i < 4; ++ i){
			let collectImg = view._bottomGroup.getChildByName(`flag${i}`);
            let btn = view._bottomGroup.getChildByName(`btn${i}`);
            let shopline = view._bottomGroup.getChildByName(`shopline${i}`);
            let originPriceTxt = view._bottomGroup.getChildByName(`originPriceTxt${i}`);
			if(collectImg && btn){
				if(myBattlelevel == 3){
					collectImg.visible = true;
                    btn.visible = false;
                    if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                        originPriceTxt.visible = shopline.visible = false;
                    }
				}
				else if(myBattlelevel == 1){
					collectImg.visible = false;
                    btn.visible = true;
                    if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                        originPriceTxt.visible = shopline.visible = true;
                    }
				}
				else{
					if(i == 2){
						collectImg.visible = true;
                        btn.visible = false;
                        if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                            originPriceTxt.visible = shopline.visible = false;
                        }
					}
					else{
						collectImg.visible = false;
                        btn.visible = true;
                        if(PlatformManager.checkIsThSp() && Number(this.code) == 4){
                            originPriceTxt.visible = shopline.visible = true;
                        }
					}
				}
			}
		}
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip14`, view.getUiCode()), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassLevel${view.vo.getMyBattleLevel()}`, view.getUiCode()))]),
			title : `itemUseConstPopupViewTitle`,
			touchMaskClose : true,
		});  
	}

    public hide():void{
        if(this._stop){
            return;
        }
        super.hide();
    }

	public dispose():void{
        let view = this;
        view._stop = false;
		view._curLevel = 1;
		view._nodeContainer.dispose();
        view._nodeContainer = null;
        view._bottomGroup.dispose();
        view._bottomGroup = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
		super.dispose();
	}
}