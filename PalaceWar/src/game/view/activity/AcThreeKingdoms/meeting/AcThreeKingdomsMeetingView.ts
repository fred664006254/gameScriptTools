class AcThreeKingdomsMeetingView extends CommonView{

    private _type : number = 1;//1赛季 2上轮
    private _topGroup : BaseDisplayObjectContainer = null;
    private _limitBtn : BaseDisplayObjectContainer = null;
    private _orderBtn : BaseDisplayObjectContainer = null;
    private _flagstate : BaseDisplayObjectContainer = null;
    private _totalarr = [0,0,0];
    private _roundarr = [0,0,0];

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

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `threekingdomsmeetingview`,`specialview_commoni_namebg`
		]);
    }

    protected getRuleInfo():string{
		return `acThreeKingdomsMeetingRule-${this.getUiCode()}`;
    }

    protected getTitleBgName():string{
		return App.CommonUtil.getResByCode(`threekingdomsmeetingtitle`, this.getUiCode());
    }

    protected getTitleStr() : string{
        return null;
    }

    protected getBgName():string{
        return `threekingdomsmeetingbg`;
    }
    
    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_SEASONRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let arr = data.data.data.seasonScore;
            for(let i = 0; i < arr.length; ++ i){
                let unit = arr[i];
                if(i == arr.length - 1){
                    this._roundarr = unit;
                }
                for(let j in unit){
                    if(!this._totalarr[j]){
                        this._totalarr[j] = 0;
                    }
                    this._totalarr[j] += Number(unit[j]);
                }
            }
            // let scorearr = 
			// for(let i = 0; i < scorearr.length; ++ i){
            //     this._arr.push({
			// 		kingdomid : Number(i) + 1,
			// 		value : scorearr[i]
			// 	});
			// }
            // this._arr.sort((a,b)=>{
			// 	return b.value - a.value;
			// });
        }
    }
    

    
    public initView():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.height = view.height - view.titleBg.height;
        view.container.y = view.titleBg.height;

        let topbg = BaseBitmap.create(`threekingdomsmeetingtopbg`);
        view.addChildToContainer(topbg);
        topbg.y = -20;
        
        view._type = 1;
        //切换按钮
        let btn = ComponentManager.getButton(`threekingdomsmeetingtopbtn`, '', ()=>{
            view._type = 3 - view._type;
            btn.setBtnBitMap(view._type == 1 ? `threekingdomsmeetingtopbtn` : `threekingdomsmeetingtopbtn_down`);
            view.freshTop();
        }, view);
        view.addChildToContainer(btn);
        btn.y = -10;
        //顶部积分榜
        let topGroup = new BaseDisplayObjectContainer();
        topGroup.width = 515;
        view.addChildToContainer(topGroup);
        view._topGroup = topGroup;
       
        for(let i = 1; i <= 3; ++ i){
            let group = new BaseDisplayObjectContainer();
            group.name = `group${i}`;
            topGroup.addChild(group);
            group.width = 150;
            group.x =(i - 1) * (150 + 30);

            let threekingdomsfont = BaseBitmap.create(`threekingdomsfont${i}`);
            group.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, threekingdomsfont, group, [0,0], true);

            let pointbg = BaseBitmap.create(`threekingdomspoint${i}bg`);
            group.addChild(pointbg);
            pointbg.name = `pointbg${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointbg, threekingdomsfont, [0,25]);

            let point = view._type == 1 ? this._totalarr[i - 1] : this._roundarr[i - 1];
            let pointTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(point), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            group.addChild(pointTxt);
            pointTxt.name = `pointTxt${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, pointTxt, pointbg);
        }
        topGroup.x = 102;
        topGroup.y = -7;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topGroup, btn, [btn.width+10, 0]);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_PRANK), view.prankCallback, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_ZRANK), view.zrankCallback, view);
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_PRANK,{
        //     activeId : view.acTivityId, 
        // });
        // NetManager.request(NetRequestConst.REQUEST_MAINLAND_ZRANK,{
        //     activeId : view.acTivityId, 
        // });

        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);

        // if(view.vo.getpublicRedhot1()){
        //     view.tabbarGroup.addRedPoint(2)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(2)
        // }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
        let desk = BaseBitmap.create(`threekingdomsmeetingdesk`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, desk, view.container, [0,0], true);

        let manGroup = new BaseDisplayObjectContainer();
        manGroup.width = view.width;
        manGroup.height = desk.y - topbg.y - topbg.height + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, manGroup, desk, [0,desk.height - 20]);
        view.addChildToContainer(manGroup);
        manGroup.mask = new egret.Rectangle(0,0, manGroup.width, manGroup.height);

        view.addChildToContainer(desk);

        //大都督 尚书 主簿 第二周
        let poscfg = {
            2 : {
                layout : LayoutConst.leftbottom,
                param : [25,0],
                nameparam : [0,180],
                offlayout : LayoutConst.lefttop,
                offparam : [0,0],
                emptyparam : [0,140],
                roleparam : [0,165],
                emplayout : LayoutConst.lefttop,
            },
            3 : {
                layout : LayoutConst.rightbottom,
                param : [25,0],
                nameparam : [0,180],
                offlayout : LayoutConst.righttop,
                offparam : [0,0],
                emptyparam : [0,140],
                roleparam : [320,165],
                emplayout : LayoutConst.lefttop,
            },
            1 : {
                layout : LayoutConst.horizontalCenterbottom,
                param : [0,70],
                nameparam : [0,160],
                offlayout : LayoutConst.righttop,
                offparam : [0,0],
                emptyparam : [0,0],
                roleparam : [170,50],
                emplayout : LayoutConst.horizontalCentertop,
            }
        }
        let week = view.vo.getCurWeek();
        //本周周一0点
        let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let man = null;

        let userContainer = null;
        for(let i = 1; i <= 3; ++ i){
            let pos = poscfg[i];
            let minfo = view.vo.getOfficalInfo(i);

            if(minfo){
                let curLv = minfo.level;
                let tinfo = App.CommonUtil.getTitleData(minfo.title);
                if (tinfo.clothes != ""){	
                    if(!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)){
                        curLv = tinfo.clothes;
                    }
                    userContainer = new BaseDisplayObjectContainer();
                    let pic = minfo.pic;
                    userContainer.mask = egret.Rectangle.create().setTo(20,-40,600,800);
                    userContainer.name = "userContainer";
                    manGroup.addChild(userContainer);
                    let dbNode1 =  new BaseDisplayObjectContainer(); //下层可变特效
                    userContainer.addChild(dbNode1);
                    let dbNode2 =  new BaseDisplayObjectContainer();  //上层可变
                    let dbNode3 =  new BaseDisplayObjectContainer();  //上层不可变
                    
                    let role = null;
                    //App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")
                    role = Api.playerVoApi.getPlayerPortrait(Number(curLv), pic);
                    userContainer.addChild(role);
                    dbNode1.y = dbNode2.y = dbNode3.y = role.y+40;
                    userContainer.anchorOffsetX = userContainer.width/2;
                    userContainer.anchorOffsetY = userContainer.height/2;
                    userContainer.addChild(dbNode2);
                    userContainer.addChild(dbNode3);
                    userContainer.anchorOffsetX = userContainer.width / 2;//300;
                    userContainer.anchorOffsetY = userContainer.height/2;
                    userContainer.setScale(manGroup.height/800);
                }
                else{
                    userContainer = Api.playerVoApi.getPlayerPortrait(curLv,minfo.pic);
                    userContainer.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,800);
                    userContainer.x = 20;
                    userContainer.y = 40;
                    userContainer.name = "userContainer";
                    manGroup.addChild(userContainer);
                    userContainer.setScale(manGroup.height/800);
                    userContainer.anchorOffsetX = userContainer.width/2;
                    userContainer.anchorOffsetY = userContainer.height/2;
                }
                if(i == 1){
                    userContainer.x = 320;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY;
                }
                else if(i == 2){
                    userContainer.x = 160;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                else if(i == 3){
                    userContainer.x = 480;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                // App.DisplayUtil.setLayoutPosition(pos.emplayout, userContainer, manGroup, pos.emptyparam, true);
            }
            else{
                userContainer = BaseLoadBitmap.create(`palace_role_empty`);
                userContainer.width = 517;
                userContainer.height = 775;
                userContainer.setScale(manGroup.height/775);
                manGroup.addChild(userContainer);
                userContainer.mask = egret.Rectangle.create().setTo(20,-40,600,800);
                userContainer.anchorOffsetX = userContainer.width/2;
                userContainer.anchorOffsetY = userContainer.height/2;
                if(i == 1){
                    userContainer.x = 320;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY;
                }
                else if(i == 2){
                    userContainer.x = 160;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
                else if(i == 3){
                    userContainer.x = 480;
                    userContainer.y = userContainer.anchorOffsetY * userContainer.scaleY + 140;
                }
            }
            let official = BaseBitmap.create(`threekingdomsofficial${i}`);
            manGroup.addChild(official);
            if(i == 1){
                official.x = 450;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
            }
            else if(i == 2){
                official.x = 0;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
            }
            else if(i == 3){
                official.x = 586;
                official.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY;
                if (PlatformManager.checkIsTextHorizontal()){
                    official.x = 480;
                }
            }

            let namebg = BaseBitmap.create(`specialview_commoni_namebg`);
            namebg.name = `namebg${i}`;
            manGroup.addChild(namebg);

            let str = ``;
            let color;
            if(week >= 2){
                if(minfo){
                    str = minfo.name;
                    color = TextFieldConst.COLOR_LIGHT_YELLOW;
                }
                else{
                    str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip2`, code));
                    color = TextFieldConst.COLOR_WARN_RED;
                }
            }
            else{
                let end = view.vo.activeSt + 1 * (7 * 86400);
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip1`, code), [App.DateUtil.getFormatBySecond(end, 7)]);
                color = TextFieldConst.COLOR_WARN_GREEN;
            }

            let nametxt = ComponentManager.getTextField(str,20,color);
            nametxt.name = `nametxt${i}`;
            manGroup.addChild(nametxt);

            namebg.width = nametxt.width + 50;

            if(i == 1){
                namebg.x = 320 - namebg.width/2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            else if(i == 2){
                namebg.x = 160 - namebg.width/2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            else if(i == 3){
                namebg.x = 480 - namebg.width/2;
                namebg.y = userContainer.y - userContainer.anchorOffsetY * userContainer.scaleY + 290 * userContainer.scaleY;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg);
        }

        for(let i = 1; i <= 3; ++ i){
            let namebg = manGroup.getChildByName(`namebg${i}`);
            manGroup.setChildIndex(namebg, 9999);

            let nametxt = manGroup.getChildByName(`nametxt${i}`);
            manGroup.setChildIndex(nametxt, 9999);
        }

        //底部按钮
        let btnpos = {
            1 : {
                layout : LayoutConst.lefttop,
                param : [80,30],
            },
            2 : {
                layout : LayoutConst.lefttop,
                param : [403,65],
            },
            3 : {
                layout : LayoutConst.lefttop,
                param : [240,105],
            },
            4 : {
                layout : LayoutConst.lefttop,
                param : [65,190],
            },
            5 : {
                layout : LayoutConst.lefttop,
                param : [520,190],
            },
        }
        for(let i in btnpos){
            let pos = btnpos[i];

            let group = new BaseDisplayObjectContainer();
            App.DisplayUtil.setLayoutPosition(pos.layout, group, desk, pos.param);
            view.addChildToContainer(group);

            let btn = ComponentManager.getButton(`threekingdomsmeetingbtn${i}`, ``, ()=>{
                let scene = ``;
                switch(Number(i)){
                    //神将助威
                    case 1:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSHEROCHEERVIEW;
                        break;
                    //排行榜
                    case 2:
                        scene = ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW;
                        break;
                    //军令
                    case 3:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSORDERVIEW;
                        break;
                    //限时军需
                    case 4:
                        scene = ViewConst.COMMON.ACTHREEKINGDOMSLIMITCHARGEVIEW; 
                        break;
                    //转换阵营
                    case 5:
                        scene = ViewConst.POPUP.ACTHREEKINGDOMSCHANGETEAMVIEW;
                        break;
                }

                ViewController.getInstance().openView(scene,{
                    aid : view.aid,
                    code : view.code
                });
                
            }, view);
            group.addChild(btn);
    
            let citynamebg = BaseBitmap.create(`threekingdomscitynamebg`);
            let cityName = BaseBitmap.create(`threekingdomsmeetingbtn${i}txt`);
            citynamebg.width = cityName.width + 30;
            group.addChild(citynamebg);
            group.addChild(cityName);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, citynamebg, btn, [0, btn.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cityName, citynamebg);
            if(Number(i) == 4){
                view._limitBtn = group;
            }
            if(Number(i) == 3){
                let flagstate = new BaseDisplayObjectContainer();
                flagstate.width = 56;
                flagstate.height = 90;
                
                let flag = BaseBitmap.create(`threekingdomsorderstate2`);
                flagstate.addChild(flag);

                let eff = ComponentManager.getCustomMovieClip(`threekingdomsinorder`, 10);
                eff.playWithTime(-1);
                // eff.blendMode = egret.BlendMode.ADD;
                flagstate.addChild(eff);
                eff.setPosition(-3,2);

                view._flagstate = flagstate;
                group.addChild(flagstate);
                flagstate.setPosition(65,10);

                view._orderBtn = group;
            }
        }
        //神将
        //排行榜
        //军令
        //限时军需
        //转换阵营

        view.freshTop();
        view.tick();
    }

    public tick():void{
        let view = this;
        //周六日出现限时军需
        view._limitBtn.visible = view.vo.getTodayWeek() > 5;//
        let info = view.vo.getOrderInfo();
        view._flagstate.visible = info.state == 2;
        if(view.vo.getpublicRedhot1()){//
            App.CommonUtil.addIconToBDOC(view._limitBtn);
            let reddot = view._limitBtn.getChildByName("reddot");
            if(reddot){
                reddot.x = 65;
                reddot.y = 0;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._limitBtn);
        }
        //军令
        if(view.vo.getpublicRedhot7()){
            App.CommonUtil.addIconToBDOC(view._orderBtn);
            let reddot = view._orderBtn.getChildByName("reddot");
            if(reddot){
                reddot.x = 65;
                reddot.y = 0;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._orderBtn);
        }
        // if(view.vo.getpublicRedhot3()){
        //     view.tabbarGroup.addRedPoint(3)
        // }
        // else{
        //     view.tabbarGroup.removeRedPoint(3)
        // }
    }

    // private prankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setPrankinfo(evt.data.data.data);
    //     }
    // }

    // private zrankCallback(evt : egret.Event):void{
    //     let view = this;
    //     if(evt.data.data.data){
    //         view.vo.setZrankinfo(evt.data.data.data);
    //     }
    // }
    //顶部的积分刷新
    private freshTop():void{
        let view = this;
        let topGroup = view._topGroup;
        let mykingdomid = view.vo.getMyKingdoms();
        let arr = [{
            id : 1,
            point : view._type == 1 ? this._totalarr[0] : this._roundarr[0]
        },{
            id : 2,
            point : view._type == 2 ? this._totalarr[1] : this._roundarr[1]
        },{
            id : 3,
            point : view._type == 3 ? this._totalarr[2] : this._roundarr[2]
        }];
        
        // arr.sort((a,b)=>{
        //     return b.point - a.point;
        //     // if(a.id == mykingdomid){
        //     //     return -1;
        //     // }
        //     // else if(b.id == mykingdomid){
        //     //     return 1;
        //     // }
        //     // else{
        //     //     return b.point - a.point;
        //     // }
        // });
        for(let i = 1; i <= arr.length; ++ i){
            let kingdomid = arr[i - 1].id;
            let group = <BaseDisplayObjectContainer>topGroup.getChildByName(`group${kingdomid}`);
            group.x = (i - 1) * (150 + 30);

            let point = view._type == 1 ? this._totalarr[kingdomid - 1] : this._roundarr[kingdomid - 1];
            let pointTxt = <BaseTextField>group.getChildByName(`pointTxt${kingdomid}`);
            pointTxt.text = App.StringUtil.changeIntToText(point);

            let pointbg = <BaseBitmap>group.getChildByName(`pointbg${kingdomid}`);
            //pointbg.setRes(i == 1 ? `threekingdomspoint${kingdomid}bg_down` : `threekingdomspoint${kingdomid}bg`);
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, pointTxt, pointbg, [0,30]);
        }
    }

    public dispose():void{
        let view = this;
        view._type = 1;
        view._topGroup = null;
        view._limitBtn = null;
        view._flagstate = null;
        view._totalarr = [];
        view._roundarr = [];
        view._orderBtn = null;
        super.dispose();
    }
}