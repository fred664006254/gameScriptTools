/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcBattlePassUnlockRewardView extends CommonView
{
	private _nodeContainer : BaseDisplayObjectContainer = null;
	private _curLevel : number = 1;
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
			"atkracecross_rewatdbg3",
			"acseventopbg",
			"countrywarrewardview_itembg",
			`tombrewardrankbg-1`,
			`servant_namebg`,`btn_small_orange`
		]);
	}

	protected getRuleInfo():string{
        let view = this;
        let code = view.getUiCode();
		return App.CommonUtil.getCnByCode(`acBattlePassRuleInfo`, code);
    } 

	protected getTitleStr():string{
		return `acBattlePassBuyUnlockTitle-${this.getUiCode()}`;
	}

	protected initView():void{	
		let view = this;
		view._curLevel = view.vo.getMyBattleLevel();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
		view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
		let code = view.getUiCode();
		view._nodeContainer = new BaseDisplayObjectContainer();
		let str = '';

		let topBg = BaseBitmap.create(`acseventopbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view, [0, 10]);
		view.addChildAt(topBg, view.getChildIndex(view.titleBg) - 1);

        let topTip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip9`, code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		topTip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topTip1Txt, view.titleBg, [0, view.titleBg.height + 20]);
		view.addChild(topTip1Txt);

		let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 95;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);
		
		let tip1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassTip10`, code), [`${view.cfg.maxlevel}`]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tip1Txt, bottomBg);
		view.addChild(tip1Txt);
		
		let rankList = view.cfg.getBattleInfoArr();
		let tmpX = 20;
		let scroStartY = 3;

		let myBattlelevel = view.vo.getMyBattleLevel();

		for (let index = 0; index < rankList.length; index++) {
			let rItem = rankList[index];
			let info = view.cfg.getBattleInfo(rItem.unlockBP);
			let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(info.unlockRecharge);//
			/** 
			 *  --战令分级显示
				--open:是否开启政令版本(1-开启，0不开启)
				--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
				--unlockRecharge:解锁充值。玩家购买advanced后直接解锁intermediate
				--lvAdd:购买后直接赠送等级
				--unlockTask:open=1时，开放的任务
			*/
			let level = rItem.unlockBP == `advanced` ? 3 : 2;

			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(level == 3 ? `tombrewardrankbg-1` : `atkracecross_rewatdbg3`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);

			let titleImg = BaseBitmap.create(`battlepasslevel${level}title-${code}`);
			titleImg.x = GameConfig.stageWidth/2 - titleImg.width/2;
			titleImg.y = winbg.y + winbg.height/2 - titleImg.height/2;
			this._nodeContainer.addChild(titleImg);

			let listbg = BaseBitmap.create("public_9_bg65");
			listbg.width = 605;
			view.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, winbg, [0, winbg.height + 5]);
			this._nodeContainer.addChild(listbg);

			let tip1Txt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassUnlockGetTip-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			view.setLayoutPosition(LayoutConst.lefttop, tip1Txt, listbg, [15, 10]);
			this._nodeContainer.addChild(tip1Txt);
			
			let itemicon = GameData.getRewardItemIcons(`1_1_${rechargeCfg.gemCost}`, true, true)[0];
			itemicon.x = tip1Txt.x;
			itemicon.y = tip1Txt.y + tip1Txt.textHeight + 10;
			this._nodeContainer.addChild(itemicon);

			// let numlb = itemicon.getChildByName(`numLb`);
			// if(numlb){
			// 	numlb.visible = false;
			// }

			// let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
			// numbg.width = 100;
			// numbg.scaleY = 22/numbg.height;
			// numbg.setPosition(itemicon.width/2-numbg.width/2 , itemicon.height - 27);
			// itemicon.addChild(numbg);

			// let getTxt : BaseTextField = ComponentManager.getTextField(rechargeCfg.gemCost.toString(), 18);
			// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getTxt, numbg);
			// itemicon.addChild(getTxt);

			// if (PlatformManager.checkIsTextHorizontal() || PlatformManager.checkIsTWBSp()) {
			// 	numbg.setVisible(false);
			// 	getTxt.setVisible(false);
			// 	if(numlb){
			// 		numlb.visible = true;
			// 	}				
			// }

			let tipTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassUnlock${rItem.unlockBP}Tip-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			view.setLayoutPosition(LayoutConst.lefttop, tipTxt, itemicon, [0, itemicon.height + 10]);
			this._nodeContainer.addChild(tipTxt);

			//let show1 = level == 3 ? view.cfg.show2 : view.cfg.show1;
			let rIcons = [];
			let reward = level == 3 ? view.cfg.show2.reward : view.cfg.show1.reward
			for(let i in reward){
				let unit = reward[i];
				let rewardvo = GameData.formatRewardItem(String(unit[0]))[0];
				let icon = GameData.getItemIcon(rewardvo, true, true);
				rIcons.push(icon);
			}

			//let rIcons = GameData.getRewardItemIcons(, true, true);
			let len = rIcons.length;
			let startY = tipTxt.y + tipTxt.height+ 10;
			let paramX = listbg.x + (listbg.width - Math.min(5, len) * (108) - (Math.min(5, len) - 1) * 10) / 2;
			tmpX = paramX;
			scroStartY = startY;
			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				let element = rIcons[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+10);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = paramX;
					scroStartY += element.height + 10;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 10);
				}
				this._nodeContainer.addChild(element);
				// let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
				// numbg.width = 100;
				// numbg.scaleY = 22/numbg.height;
				// numbg.setPosition(element.width/2-numbg.width/2 , element.height - 27);
				// element.addChild(numbg);

				// let getTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassTip13-${code}`, [show1[innerIdx][1]]), 18);
				// view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getTxt, numbg);
				// element.addChild(getTxt);
			}
			scroStartY += 151;
			listbg.height = scroStartY - listbg.y;

			let tip2Txt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassTip11-${code}`), 20);
			view.setLayoutPosition(LayoutConst.leftbottom, tip2Txt, listbg, [15, 10]);
			this._nodeContainer.addChild(tip2Txt);

			let givebg = BaseBitmap.create(`countrywarrewardview_itembg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, givebg, listbg, [0, listbg.height + 10]);
			this._nodeContainer.addChild(givebg);

			let givefnt = BaseBitmap.create(`battlepassgive-${code}`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, givefnt, givebg, [75, -3]);
			this._nodeContainer.addChild(givefnt);

			let giveTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBattlePassTip12-${code}`, [`${info.lvAdd}`]), 20);
			view.setLayoutPosition(LayoutConst.leftverticalCenter, giveTxt, givefnt, [givefnt.width + 10, 3]);
			this._nodeContainer.addChild(giveTxt);
			

			let btn = ComponentManager.getButton(`btn_small_orange`, ``, ()=>{
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
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, givebg, [0,givebg.height + 12]);
			this._nodeContainer.addChild(btn);
			btn.name = `btn${level}`;
			btn.visible = false;

			let collectImg = BaseBitmap.create(`battlepasscollect4-${code}`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectImg, givebg, [0,givebg.height]);
			this._nodeContainer.addChild(collectImg);
			collectImg.name = `flag${level}`;
			collectImg.visible = false;

			if(myBattlelevel == 3){
				collectImg.visible = true;
			}
			else if(myBattlelevel == 1){
				btn.visible = true;
			}
			else{
				if(level == 2){
					collectImg.visible = true;
				}
				else{
					btn.visible = true;
				}
			}
			winBottomBg.height = collectImg.y + collectImg.height - winBottomBg.y - 8;
			this._nodeContainer.height = winBottomBg.y + winBottomBg.height;

			scroStartY = winBottomBg.y + winBottomBg.height + 10;
		}
		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y - 5 - 173);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 173;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);

		view.setChildIndex(view.closeBtn, 99);
	}

	private buyCallback() : void{
		let view = this;
		let myBattlelevel = view.vo.getMyBattleLevel();
		if(myBattlelevel == view._curLevel){
			return;
		}
		view._curLevel = myBattlelevel;
		for(let i = 2; i < 4; ++ i){
			let collectImg = view._nodeContainer.getChildByName(`flag${i}`);
			let btn = view._nodeContainer.getChildByName(`btn${i}`);
			if(collectImg && btn){
				if(myBattlelevel == 3){
					collectImg.visible = true;
					btn.visible = false;
				}
				else if(myBattlelevel == 1){
					collectImg.visible = false;
					btn.visible = true;
				}
				else{
					if(i == 2){
						collectImg.visible = true;
						btn.visible = false;
					}
					else{
						collectImg.visible = false;
						btn.visible = true;
					}
				}
			}
		}
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			msg : LanguageManager.getlocal(`acBattlePassTip14-${view.getUiCode()}`, [LanguageManager.getlocal(`acBattlePassLevel${view.vo.getMyBattleLevel()}-${view.getUiCode()}`)]),
			title : `itemUseConstPopupViewTitle`,
			touchMaskClose : true,
		});  
	}

	public dispose():void{
		let view = this;
		view._curLevel = 1;
		view._nodeContainer.dispose();
		view._nodeContainer = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.buyCallback, view);
		super.dispose();
	}
}