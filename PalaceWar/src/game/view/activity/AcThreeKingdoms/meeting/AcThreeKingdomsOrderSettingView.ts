/**
 * 三国争霸 军令显示
 * author qianjun
 */
class AcThreeKingdomsOrderSettingView extends PopupView{    
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

	protected getResourceList():string[]{
		return super.getResourceList().concat([

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
        //App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        let code = view.getUiCode();
        let cfg = view.cfg;

        let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip10`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt1);
        tipTxt1.setPosition(view.viewBg.x + 65, 10);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip11`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tipTxt1, [0, tipTxt1.height + 6]);

        let bg = BaseBitmap.create(`public_9_bg4`);
        bg.width = 530;
        bg.height = 450;
        view.addChildToContainer(bg);
        bg.setPosition(view.viewBg.x + (view.viewBg.width - bg.width)/2, 90);

        let week = view.vo.getCurWeek();
        for(let i = 1; i < 5; ++ i){
            let citygroup = new BaseDisplayObjectContainer();
            citygroup.width = 220;
            citygroup.height = 150;
            view.addChildToContainer(citygroup);
            citygroup.name = `citygroup${i}`;

            let ordercityinfo = view.vo.getOrderCityInfo(i);
            let cityid = ordercityinfo ? ordercityinfo.targetcity : 0;
            let targetkingdom = ordercityinfo ? ordercityinfo.targetkingdom : 1;
            let descbg = BaseBitmap.create(`threekingdomsrectbg1`);
            descbg.width = 220;
            descbg.height = 50;
            descbg.name = `descbg${i}`;
            citygroup.addChild(descbg);
            citygroup.addTouchTap(()=>{
                if(GameData.serverTime < st){//
                    //打开选择弹窗
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSORDERCITYSELECTVIEW, {
                        aid : view.aid,
                        code : view.code,
                        selectcity : cityid,
                        selectkingdom : ordercityinfo ? ordercityinfo.targetkingdom : 0,
                        id : i
                    });
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip14`, code)));
                }
            }, view);

            let start = view.vo.activeSt + (week - 1) * (7 * 86400);
            let unit : Config.AcCfg.ThreeKingdomsActiveCfg = cfg.activeTime[(i % 2 == 1 ? 3 : 4) - 1];
            let tmp = i < 3 ? 6 : 7;
            let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
            let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
            let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;
            let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip13`, code), [i.toString(),timeparam]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            descTxt.lineSpacing = 6;
            descTxt.textAlign = egret.HorizontalAlign.CENTER;
            citygroup.addChild(descTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg,);
            
            let city = BaseBitmap.create(`threekingdoms${targetkingdom}city${4}`);
            citygroup.addChild(city);
            city.name = `city${i}`;
            city.anchorOffsetX = city.width / 2;
            city.x = 110;

            let font = BaseBitmap.create(`threekingdomsfont${targetkingdom}`);
            citygroup.addChild(font);
            font.name = `font${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, city, [-16,0]);

            let stateflag = BaseBitmap.create(``);
            citygroup.addChild(stateflag);
            stateflag.name = `stateflag${i}`;

            let namebg = BaseBitmap.create(`public_itemtipbg2`);
            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${targetkingdom}City${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}Name`, code)),18,TextFieldConst.COLOR_LIGHT_YELLOW); 
            namebg.width = nameTxt.width + 40;
            citygroup.addChild(namebg);
            namebg.name = `namebg${i}`;
            nameTxt.name = `nameTxt${i}`;
            citygroup.addChild(nameTxt);

            if(ordercityinfo){
                font.visible = stateflag.visible = true;
                let cityid = ordercityinfo.targetcity;
                App.DisplayUtil.changeToNormal(city);
                city.setRes(`threekingdoms${ordercityinfo.targetkingdom}city${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}`);
                font.setRes(`threekingdomsfont${ordercityinfo.targetkingdom}`);
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${ordercityinfo.targetkingdom}City${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}Name`, code));
            }
            else{
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip19`, code));
                App.DisplayUtil.changeToBlack(city);
                font.visible = false;
                stateflag.visible = false;
                if(GameData.serverTime >= et){
                    namebg.visible = nameTxt.visible = false;
                    stateflag.visible = true;
                }
            }   

            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, descbg, [0, descbg.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, stateflag, city, [-16,0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, city);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            citygroup.setPosition(bg.x+(i & 1 ? 40:290), bg.y+(i - 1)*90+10);
        }
       
        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip12`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt2);
        tipTxt2.lineSpacing = 6;
        tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, bg, [0, bg.height + 12]);

        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `confirmBtn`, ()=>{
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, tipTxt2, [0,tipTxt2.textHeight+7]);
        view.addChildToContainer(btn);

        view.tick();
    }

    private freshCity():void{
        let view = this;
        let code = view.getUiCode();
        let week = view.vo.getCurWeek();
        for(let i = 1; i < 5; ++ i){
            let citygroup = <BaseDisplayObjectContainer>view.container.getChildByName(`citygroup${i}`);
            let start = view.vo.activeSt + (week - 1) * (7 * 86400);
            let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[(i % 2 == 1 ? 3 : 4) - 1];
            let tmp = i < 3 ? 6 : 7;
            let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
            let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
            let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;
            
            let descbg = citygroup.getChildByName(`descbg${i}`);
            let city = <BaseBitmap>citygroup.getChildByName(`city${i}`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, descbg, [0, descbg.height]);

            let font = <BaseBitmap>citygroup.getChildByName(`font${i}`);
            let stateflag = <BaseBitmap>citygroup.getChildByName(`stateflag${i}`);
            let state = 1;
            //1未生效 2生效中 3已过期
            if(GameData.serverTime < st){
                state = 1;
            }
            else if(GameData.serverTime >= st && GameData.serverTime < et){
                state = 2; 
            }
            else if(GameData.serverTime >= et){
                state = 3; 
            }
            if(state > 1){
                stateflag.setRes(`threekingdomsorderstate${state == 2 ? 1 : 3}`);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, stateflag, city, [-16,0]);

            let namebg = <BaseBitmap>citygroup.getChildByName(`namebg${i}`);
            let nameTxt = <BaseTextField>citygroup.getChildByName(`nameTxt${i}`);

            let ordercityinfo = view.vo.getOrderCityInfo(i);
            if(ordercityinfo){
                font.visible = stateflag.visible = true;
                let cityid = ordercityinfo.targetcity;
                App.DisplayUtil.changeToNormal(city);
                city.setRes(`threekingdoms${ordercityinfo.targetkingdom}city${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}`);
                font.setRes(`threekingdomsfont${ordercityinfo.targetkingdom}`);
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${ordercityinfo.targetkingdom}City${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}Name`, code));
            }
            else{
                nameTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip19`, code));
                App.DisplayUtil.changeToBlack(city);
                font.visible = false;
                stateflag.visible = false;
                if(GameData.serverTime >= et){
                    namebg.visible = nameTxt.visible = false;
                    stateflag.visible = true;
                }
            }     
            city.anchorOffsetX = city.width / 2;
            city.x = 110;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, city, [-16,0]);

            namebg.width = nameTxt.width + 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, namebg, city, [0,-30]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
        }
    }

    public tick():void{
        let view = this;
        view.freshCity();
    }

    protected getShowHeight() : number{
        return 750;
    }

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip9`, this.getUiCode());
    }

    // private attackBack(evt : egret.Event):void{
    //     let view = this;
    //     let code = view.getUiCode();
    //     if(evt.data.ret){
    //         let data = evt.data.data.data;
    //         App.CommonUtil.showTip(LanguageManager.getlocal(`wifeSkillUpdSuccess`));
    //         let info = view.vo.getCityTaskStaus(view.cityId);
    //         let tasklevel = info.level;
    //         let tmp = [];
    //         for(let i in view.cfg.taskList){
    //             tmp.push(view.cfg.taskList[i]);
    //         }
    //         // tmp.sort((a,b)=>{
    //         //     if(a.id == tasklevel){
    //         //         return -1;
    //         //     }
    //         //     else if(b.id == tasklevel){
    //         //         return 1;
    //         //     }
    //         //     else{
    //         //         if(a.id > tasklevel && b.id < tasklevel){
    //         //             return -1;
    //         //         }
    //         //         else if(a.id < tasklevel && b.id > tasklevel){
    //         //             return 1;
    //         //         }
    //         //         else{
    //         //             return a.id - b.id;
    //         //         }
    //         //     }
    //         // });
    //         view._showlist.refreshData(tmp,{
    //             code : view.code,
    //             cityId : view.cityId
    //         });

    //         view._haveTxt.text = Api.playerVoApi.getPlayerGemStr();
    //         App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._haveTxt, view._havebg, [15,0])
    //         if(tasklevel == view.cfg.taskList.length){
    //             view._costIcon.visible = view._upBtn.visible = false;
    //             view._costTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip16`, code));
    //             App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costTxt, view._bg, [0,view._bg.height+20]);
    //         }
            
    //     }
    // }

	public dispose():void{
        let view = this;
        //App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
		super.dispose();
	}
}