/**
 * 三国争霸任务奖励升级弹窗
 * author qianjun
 */
class AcThreeKingdomsUpgradeRewardView extends PopupView{
    private _haveTxt : BaseTextField = null;
    private _costIcon : BaseBitmap = null;
    private _costTxt : BaseTextField = null;
    private _showlist : ScrollList = null;
    private _havebg : BaseBitmap = null;
    private _upBtn : BaseButton = null;
    private _bg : BaseBitmap = null;

    
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private get cityId():number{
        return this.param.data.cityId;
    }

    private get kingdomid():number{
        return this.param.data.kingdomid;
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `titleupgradearrow`,`common_titlebg`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.freshview, view);
        let code = view.getUiCode();
        let cfg = view.cfg;
        let info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        let status = info.status;
        //2武3知4政5魅1全属性
        let tasktype = view.cityId;
        let tasklevel = info.level;
        let taskcfg : Config.AcCfg.ThreeKingdomsTaskListCfg = view.cfg.taskList[tasklevel - 1];

        let havebg = BaseBitmap.create(`threekingdomsrectbg1`);
        havebg.width = 150;
        view.addChildToContainer(havebg);
        view._havebg = havebg;
        havebg.setPosition(view.viewBg.x + (view.viewBg.width - havebg.width) / 2, 10);

        let icon = BaseBitmap.create(`public_icon1`);
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, havebg)

        let haveTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), 20);
        view.addChildToContainer(haveTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, havebg, [15,0])
        view._haveTxt = haveTxt;

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(tasklevel == view.cfg.taskList.length ? `acThreeKingdomstasktip16` : `acThreeKingdomstasktip${view.cityId == 1 ? 21 : 15}`, code), [view.cfg.taskList[view.cfg.taskList.length - 1][`needValue${view.cityId == 1 ? 2 : 1}`]]), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, havebg, [0, havebg.height + 10]);

        let bg = BaseBitmap.create(`public_9_bg4`);
        bg.width = 530;
        bg.height = tasklevel == view.cfg.taskList.length ? 340 : 380;
        view.addChildToContainer(bg);
        view._bg = bg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0,tipTxt.height+7]);

        let tmp = [];
        for(let i in view.cfg.taskList){
            tmp.push(view.cfg.taskList[i]);
        }
		let tmpRect =  new egret.Rectangle(0,0,510,450);
		let scrollList = ComponentManager.getScrollList(AcThreeKingdomsTaskLevelItem, tmp, tmpRect, {
            code : view.code,
            cityId : view.cityId
        });
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 7]);
		view.addChildToContainer(scrollList); 
		scrollList.bounces = false;
        view._showlist = scrollList;

        //奖励升级
        if(tasklevel == view.cfg.taskList.length){
            // let costTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code)), 20, TextFieldConst.COLOR_BROWN);
            // view.addChildToContainer(costTxt); 
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costTxt, bg, [0,bg.height+20]);
        }
        else{
            let costicon = BaseBitmap.create(`public_icon1`);
            costicon.setScale(0.8);
            view.addChildToContainer(costicon); 
            view._costIcon = costicon;
    
            let costTxt = ComponentManager.getTextField(taskcfg.needGem.toString(), 20, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(costTxt); 
            view._costTxt = costTxt;

            if (Api.playerVoApi.getPlayerGem() < taskcfg.needGem) {
                costTxt.textColor = TextFieldConst.COLOR_WARN_RED;
            }

            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, bg, [(bg.width-costicon.width*costicon.scaleX-costTxt.width)/2,bg.height+10]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width,0]);
    
            let upbtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomstasktip2`, code), ()=>{
                if(!view.vo.isInTaskTime()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip18`, code)));
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                    if(view.vo.getCurPeriod() == 4){
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                    }
                    view.hide();
                    return
                }
                if (Api.playerVoApi.getPlayerGem() < taskcfg.needGem) {
                    // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					// 	msg : LanguageManager.getlocal(`acConquerMainLandTip19-${code}`, [view._costTxt.text]),
					// 	title : `itemUseConstPopupViewTitle`,
					// 	touchMaskClose : true,
					// 	callback : ()=>{
					// 		if(!view.vo.isInTaskTime()){
                    //             App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip18`, code)));
                    //             App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                    //             if(view.vo.getCurPeriod() == 4){
                    //                 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                    //             }
                    //             view.hide();
                    //             return
                    //         }	
					// 		//充值
					// 		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
					// 	},
					// 	handle : view,
					// 	needClose : 1,
					// 	needCancel : true,
					// 	confirmTxt : `gotocharge`
                    // });
                    //确认弹框
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW,{
                        msg : LanguageManager.getlocal(`acConquerMainLandTip19-${code}`, [view._costTxt.text]),
                        touchMaskClose : true,
                        title : `itemUseConstPopupViewTitle`,
                        callback : ()=>{
                            if(!view.vo.isInTaskTime()){
                                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip18`, code)));
                                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
                                if(view.vo.getCurPeriod() == 4){
                                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_QUIT);
                                }
                                view.hide();
                                return
                            }	
                            //充值
                            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                        },
                        handle : view,
                        needClose : 1,
                        needCancel : true,
                        confirmTxt : `gotocharge`,
                        recommand : false
                    });
                    return;
                }
                // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				// 	msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip20`, code), [taskcfg.needGem.toString()]),
				// 	title : `itemUseConstPopupViewTitle`,
				// 	touchMaskClose : true,
				// 	callback : ()=>{          
                //         NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, { 
                //             activeId : view.vo.aidAndCode, 
                //             cityId : view.cityId == 1 ? 5 : (view.cityId - 1),
                //         });
				// 	},
				// 	handle : view,
				// 	needClose : 1,
				// 	needCancel : true
                // });  

                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSCONFIRMVIEW,{
                    msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip20`, code), [taskcfg.needGem.toString()]),
					title : `itemUseConstPopupViewTitle`,
					touchMaskClose : true,
                    callback : ()=>{          
                        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, { 
                            activeId : view.vo.aidAndCode, 
                            cityId : view.cityId == 1 ? 5 : (view.cityId - 1),
                        });
					},
					handle : view,
					needClose : 1,
					needCancel : true,
                    recommand : false
                });

                // App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip1`, code)));
            }, view);
            view.addChildToContainer(upbtn);
            view._upBtn = upbtn;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upbtn, bg, [0,bg.height+43]);
        }
    }

    // protected getShowHeight() : number{
    //     return 750;
    // }

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomstasktip14`, this.getUiCode());
    }

    private freshview():void{
        let view = this;
        let info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        let status = info.status;
        //2武3知4政5魅1全属性
        let tasktype = view.cityId;
        let tasklevel = info.level;
        let taskcfg : Config.AcCfg.ThreeKingdomsTaskListCfg = view.cfg.taskList[tasklevel - 1];
        view._costTxt.textColor = Api.playerVoApi.getPlayerGem() < taskcfg.needGem ? TextFieldConst.COLOR_WARN_RED : TextFieldConst.COLOR_BROWN;

        view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15,0])
    }

    private attackBack(evt : egret.Event):void{
        let view = this;
        let code = view.getUiCode();
        if(evt.data.ret){
            let data = evt.data.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal(`wifeSkillUpdSuccess`));
            view.hide();
            // let info = view.vo.getCityTaskStaus(view.cityId);
            // let tasklevel = info.level;
            // let tmp = [];
            // for(let i in view.cfg.taskList){
            //     tmp.push(view.cfg.taskList[i]);
            // }
            // // tmp.sort((a,b)=>{
            // //     if(a.id == tasklevel){
            // //         return -1;
            // //     }
            // //     else if(b.id == tasklevel){
            // //         return 1;
            // //     }
            // //     else{
            // //         if(a.id > tasklevel && b.id < tasklevel){
            // //             return -1;
            // //         }
            // //         else if(a.id < tasklevel && b.id > tasklevel){
            // //             return 1;
            // //         }
            // //         else{
            // //             return a.id - b.id;
            // //         }
            // //     }
            // // });
            // view._showlist.refreshData(tmp,{
            //     code : view.code,
            //     cityId : view.cityId
            // });

            // view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15,0])
            // if(tasklevel == view.cfg.taskList.length){
            //     view._costIcon.visible = view._upBtn.visible = false;
            //     view._costTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code));
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costTxt, view._bg, [0,view._bg.height+20]);
            // }   
        }
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, view.freshview, view);
        view._haveTxt = null;
        view._costTxt = null;
        view._havebg = null;
        view._costIcon = null;
        view._showlist = null;
        view._upBtn = null;
        view._bg = null;
		super.dispose();
	}
}