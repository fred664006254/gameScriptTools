/**
 * 三国争霸城池点开据点弹窗
 * author qianjun
 */
class AcThreeKingdomsCityWarPopupView extends PopupView
{
    private _topGroup:BaseDisplayObjectContainer = null;
    private _bottomGroup:BaseDisplayObjectContainer = null;
    private _timebg : BaseBitmap = null;
    private _timecdTxt : BaseTextField = null;
    private _count = 0;
    private _titlebg : BaseBitmap = null;
    private _titleTxt : BaseTextField = null;
    private _list : ScrollList = null;

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
    
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
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
        return this.param.data.cityid;
    }

    private get kingdomid():number{
        return this.param.data.kingdomid;
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `public_textbrownbg`,`specialview_commoni_namebg`,`threekingdomscitypopupview`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

    
    protected getRequestData():{requestType:string,requestData:any}{	
		return {requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETBUILDINGINFO,requestData:{
            activeId : this.vo.aidAndCode,
            mainland : this.kingdomid == 0 ? 7 : ((this.kingdomid - 1) * 2 + (this.cityId - 3)),
        }};
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false){
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_THREEKINGDOMS_GETBUILDINGINFO){
            this.vo.setBuildingInfo(rData.data.buildinginfo);
		}
	}

    

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        let isCentercity = view.kingdomid == 0;
        let code = view.getUiCode();
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.selectCallback, view);
        //顶部积分榜
        let topGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(topGroup);
        view._topGroup = topGroup;
        topGroup.width = 555;

        let titlebg = BaseBitmap.create(`threekingdomscityzhanjubg${isCentercity ? `1` : view.kingdomid}`);
        view._titlebg = titlebg;
        view.addChildToContainer(titlebg);
        titlebg.y = 10;
        titlebg.x = 70;
        
        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip50`, code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${view.kingdomid}`, code))]), 20,);
        view._titleTxt = titleTxt;
        view.addChildToContainer(titleTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titlebg);

        if(isCentercity){
            titlebg.visible = titleTxt.visible = false;
        }

        for(let i = 1; i <= 3; ++ i){
            let group = new BaseDisplayObjectContainer();
            group.name = `group${i}`;
            topGroup.addChild(group);
            group.width = 165;
            group.x = 10 + (i - 1) * (165 + 20);

            let threekingdomsfont = BaseBitmap.create(`threekingdomsfont${i}`);
            group.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, threekingdomsfont, group, [0,0], true);

            let pointbg = BaseBitmap.create(`threekingdomspoint${i}bg`);
            group.addChild(pointbg);
            pointbg.name = `pointbg${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, threekingdomsfont, [0,30]);

            let point = view.vo.getPoint(i);
            let pointTxt = ComponentManager.getTextField(point.toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(pointTxt);
            pointTxt.name = `pointTxt${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, pointTxt, pointbg);
        }
        view.freshTop();
        topGroup.x = view.viewBg.x + (view.viewBg.width - topGroup.width) / 2;
        topGroup.y = titlebg.y + titlebg.height + 5;
        if(isCentercity){
            topGroup.y = 5;
        }

        let listbg = BaseBitmap.create(`public_9_bg4`);
        listbg.width = 530;
        listbg.height = 550;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, topGroup, [0,topGroup.height+10]);

        //倒计时
        let timebg = BaseBitmap.create(`public_itemtipbg2`);
        let timecdTxt = ComponentManager.getTextField(``, 18);
        view.addChildToContainer(timebg);
        view.addChildToContainer(timecdTxt);
        timebg.width = 400;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timebg, listbg, [0,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timecdTxt, timebg);
        view._timebg = timebg;
        view._timecdTxt = timecdTxt;

        //城市据点
        let cityNum = view.kingdomid == 0 ? view.cfg.campNum2 : view.cfg.campNum1;
        let arr = [];
        //let scrollist = ComponentManager.getScrollList(, );
        for(let i = 1; i <= cityNum; ++ i){
            arr.push({
                id : i,
                cityid : view.cityId,
                kingdomid : view.kingdomid
            });
        }
        //     let citySingle = new BaseDisplayObjectContainer();
        //     citySingle.name = `citySingle${i}`;
        //     cityGroup.addChild(citySingle);
        //     citySingle.width = 150;
        //     citySingle.height = 102;

        //     let bg = BaseBitmap.create(`threekingdomscityzhanjulistbg`);
        //     citySingle.addChild(bg);
        //     bg.name = `bg`;

        //     let playerGroup = new BaseDisplayObjectContainer();
        //     playerGroup.width = 230;
        //     playerGroup.height = 70;
        //     playerGroup.name = `playerGroup`
        //     citySingle.addChild(playerGroup);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerGroup, bg);

        //     let emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip51`, view.getUiCode()), [view.cfg.powerNeed.toString()]), 20,TextFieldConst.COLOR_BROWN);
        //     emptyTxt.name = `emptyTxt`;
        //     emptyTxt.lineSpacing = 10;
        //     emptyTxt.textAlign = egret.HorizontalAlign.CENTER;
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg);
        //     citySingle.addChild(emptyTxt);

        //     let flag = BaseBitmap.create(`threekingdomscityzhanjuflag`);
        //     citySingle.addChild(flag);
        //     flag.name = `flag`;

        //     citySingle.setPosition(i % 2 == 1 ? 10 : 270, 10 + (Math.ceil(i / 2) - 1) * 110);

        //     citySingle.addTouchTap(()=>{
        //          //打开出站弹窗
        //          if(view.vo.isInWarTime()){
        //             ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSPREPAREVIEW,{
        //                 aid : view.aid,
        //                 code : view.code,
        //                 cityId : view.cityId,
        //                 kingdomid : view.kingdomid,
        //                 judianid : i
        //             });
        //          }
        //          else{
        //             App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsTip60-1`));
        //             view.hide();
        //          }
        //     }, view, null);

        //     let order = BaseBitmap.create(`threekingdomscityzhanjuorder`);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, order, bg);
        //     citySingle.addChild(order);
            
        //     let ordrTxt = ComponentManager.getTextField(`${i}`, 16);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordrTxt, order, [0,-4]);
        //     citySingle.addChild(ordrTxt);
        // }

        let list = ComponentManager.getScrollList(AcThreeKingdomsCityItem, arr, new egret.Rectangle(0,0,listbg.width,listbg.height - 60), view.code);
        view.addChildToContainer(list);
        list.setContentPosY(5);
        list.bounces = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, listbg, [10,50]);
        view._list = list;

        //底部援军情况
        let bottomGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(bottomGroup);
        bottomGroup.width = 520;
        view._bottomGroup = bottomGroup;
        for(let i = 1; i <= 3; ++ i){
            let armygroup = new BaseDisplayObjectContainer();
            armygroup.name = `armygroup${i}`;
            bottomGroup.addChild(armygroup);
            armygroup.width = 110;
            armygroup.x = (i - 1) * (110 + 30);

            let armyicon = BaseBitmap.create(`threekingdomarmyicon${i}`);
            armygroup.addChild(armyicon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armyicon, armygroup, [0,0], true);

            let threekingdomsfont = BaseBitmap.create(`threekingdomsfont${i}`);
            armygroup.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, threekingdomsfont, armyicon, [0,10]);

            let pointbg = BaseBitmap.create(`specialview_commoni_namebg`);
            armygroup.addChild(pointbg);
            pointbg.name = `pointbg${i}`;
            pointbg.width = 140;
            pointbg.height = 55;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, armyicon, [0,armyicon.height-20]);

            let yuanbingpercent = `${i * 10}%`;
            let yuanbingpercentTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            armygroup.addChild(yuanbingpercentTxt);
            yuanbingpercentTxt.name = `yuanbingpercentTxt${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, pointbg);

            let armynum = `${i * 10000}`;
            let armynumTxt = ComponentManager.getTextField(armynum.toString(), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            armygroup.addChild(armynumTxt);
            armynumTxt.name = `armynumTxt${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, pointbg);

            if(i == view.vo.getMyKingdoms()){
                armygroup.addTouchTap(()=>{
                    //打开援兵详情弹窗
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSYUANBINGDETAILVIEW,{
                        aid : view.aid,
                        code : view.code,
                        cityId : view.cityId,
                        kingdomid : view.kingdomid
                    });
                }, view);
                // let rulebtn = ComponentManager.getButton(`btn_rule`, '', ()=>{

                // }, view);
                // rulebtn.setScale(0.5);
                // rulebtn.setPosition(armynumTxt.x+armynumTxt.textWidth+10,81);
                // armygroup.addChild(rulebtn);
            }
        }
        view.freshBottom();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomGroup, listbg, [0,listbg.height+10]);

        let bottomtipBg = BaseBitmap.create(`public_textbrownbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomtipBg, bottomGroup, [0,bottomGroup.height+7]);
        view.addChildToContainer(bottomtipBg);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip26`,view.code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomtipBg);
        view.tick();
    }

    //顶部的积分刷新
    private freshTop():void{
        let view = this;
        let code = view.getUiCode();
        let isCentercity = view.kingdomid == 0;
        let topGroup = view._topGroup;
        let mykingdomid = view.vo.getMyKingdoms();
        let arr = [{
            id : 1,
            point : view.vo.getCityPoint(view.kingdomid, view.cityId, 1)
        },{
            id : 2,
            point : view.vo.getCityPoint(view.kingdomid, view.cityId, 2)
        },{
            id : 3,
            point : view.vo.getCityPoint(view.kingdomid, view.cityId, 3)
        }];
        arr.sort((a,b)=>{
            return b.point - a.point;
        });
 
        for(let i = 1; i <= arr.length; ++ i){
            let kingdomid = arr[i - 1].id;
            let group = <BaseDisplayObjectContainer>topGroup.getChildByName(`group${kingdomid}`);
            group.x = 10 + (i - 1) * (165 + 20);

            let point = view.vo.getCityPoint(view.kingdomid, view.cityId, kingdomid);
            let pointTxt = <BaseTextField>group.getChildByName(`pointTxt${kingdomid}`);
            pointTxt.text = `${App.StringUtil.changeIntToText(point)}(+<font color=0x21eb39>${view.vo.getCityPerCore(view.kingdomid, view.cityId, kingdomid)}</font>)`;

            let pointbg = <BaseBitmap>group.getChildByName(`pointbg${kingdomid}`);
            pointbg.setRes(i == 1 ? `threekingdomspoint${kingdomid}bg_down` : `threekingdomspoint${kingdomid}bg`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, pointbg, [0,30]);
        }
        // view._titlebg.setRes(`threekingdomscityzhanjubg${isCentercity ? arr[0].id : view.kingdomid}`);
        // let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip50`, code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${isCentercity ? arr[0].id : view.kingdomid}`, code))]), 20,);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,  view._titleTxt, view._titlebg);
    }

    //底部城池援军
    private freshBottom():void{
        let view = this;
        let code = view.getUiCode();
        let bottomGroup = view._bottomGroup;
        let mykingdomid = view.vo.getMyKingdoms();
        let isCentercity = view.kingdomid == 0;
        let arr = [{
            id : 1,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 1, isCentercity)
        },{
            id : 2,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 2, isCentercity)
        },{
            id : 3,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 3, isCentercity)
        }];
        
        arr.sort((a,b)=>{
            if(a.point == b.point){
                return a.id - b.id;
            }
            else{
                return b.point - a.point;
            }
        });
        for(let i = 1; i <= arr.length; ++ i){
            let kingdomid = arr[i - 1].id;
            let armygroup = <BaseDisplayObjectContainer>bottomGroup.getChildByName(`armygroup${kingdomid}`);
            armygroup.x = 45 + (i - 1) * (110 + 50);

            let pointbg = <BaseBitmap>armygroup.getChildByName(`pointbg${kingdomid}`);

            let yuanbingpercent = view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, kingdomid, isCentercity);
            let yuanbingpercentTxt = <BaseTextField>armygroup.getChildByName(`yuanbingpercentTxt${kingdomid}`);
            yuanbingpercentTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip30`, code), [yuanbingpercent.toString()]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, pointbg, [0,5]);

            let armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, kingdomid);
            let armynumTxt = <BaseTextField>armygroup.getChildByName(`armynumTxt${kingdomid}`);
            armynumTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip31`, code), [App.StringUtil.changeIntToText(armynum)]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, yuanbingpercentTxt, [0,yuanbingpercentTxt.textHeight+7]);
        }
    }
    

    private freshCity(cityId:number):void{
        let view = this;
        let code = view.getUiCode();
        //刷新城池的玩家信息
        let item = <AcThreeKingdomsCityItem>view._list.getItemByIndex(cityId - 1);
        if(item){
            item.freshCity();
        }
    }
    
	protected getShowHeight():number{
		return 990;
	}

	protected getTitleStr():string{
        let view = this;
        let name = ``;
        if(view.kingdomid){
            name = `acThreeKingdoms${view.kingdomid}City${view.cityId}Name`;
        }
        else{
            name = `acThreeKingdomscenterCityName_${view.vo.getTodayWeek() == 7 ? 2 : 1}`;
        }
		return App.CommonUtil.getCnByCode(name, this.getUiCode());
    }

    public tick():void{
        let view = this;
        view.freshTop();
        if(view.vo.isInWarTime()){
            view._timecdTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip27`,view.code), [view.vo.getWarTimeCD(2)]);
        }
        else{
            view._timecdTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip28`,view.code));
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timecdTxt, view._timebg);
    }

    private selectCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //有据点消息变化
            if(evt.data.data.data.buildinginfo){
                view.vo.setBuildingInfoById(evt.data.data.data.buildinginfo);
                for(let i in evt.data.data.data.buildinginfo){
                    let tmp = evt.data.data.data.buildinginfo[i];
                    if(tmp && tmp.building){
                        view.freshCity(tmp.building);
                    }
                }
            }
        }
    }

    public getSpaceX():number{
        return 10;
    }

    // public getSpaceY():number{
    //     return 0;
    // }

	public dispose():void{
        let view = this;
        view._topGroup.dispose();
        view._topGroup = null;
        view._bottomGroup = null;
        view._timebg = null;
        view._timecdTxt = null;
        view._count = 0;
        view._titlebg = null;
        view._titleTxt = null;
        view._list = null;
        if(view.vo.listred){
            view.vo.listred = false;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETLIST,{
                activeId:view.acTivityId,
            });
        }
        NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO,{
            activeId:view.acTivityId,
        });
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.selectCallback, view);
		super.dispose();
	}
}