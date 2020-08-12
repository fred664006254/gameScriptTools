class RoyalPassView extends CommonView{

    private _haveBuyGroup : BaseDisplayObjectContainer = null;
    private _crown : BaseBitmap = null;

    private _list : ScrollList = null;
    private _bigrewardGroup : BaseDisplayObjectContainer = null;
    private _progressbar : ProgressBar = null;
    private _bottomid:number = -1;
    private _curReward:RoyalPassItem = null;

	public constructor(){
		super();
	}

	protected getResourceList():string[]{
		return [
            `progress27_bg`,`progress27`,`royalpassview`
		];
	}

    protected getTitleStr():string{
        return null;
    }
    
    protected getBgName():string{
        return `public_white`;
    }

    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_GAMEINFO,
		];
	}

    protected getNetConstEventArr():string[]{
		return [
            NetConst.ROYALPASS_GETREWARDS
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.MODEL_GAMEINFO:
                view.freshView();
                break;
        }
    }

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.ROYALPASS_GETREWARDS:
                view.getRewardback(evt);
                break;
        }
    }

	public initView():void{
        let view = this;
        view.name = `RoyalPassView`;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let topbg = BaseBitmap.create(`royalpasstopbg`);
        view.addChildToContainer(topbg);

        // let titleTF = ComponentMgr.getTextField(LangMger.getlocal(`royalpasstitle`),TextFieldConst.SIZE_BIG_VIEWTITLE,ColorEnums.white);
        // view.addChildToContainer(titleTF);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTF, topbg, [0,20]);

        let titleBit = BaseBitmap.create("royaltitle");
        view.addChildToContainer(titleBit);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleBit, topbg, [0,20]);

        let descTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpassdesc`), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        descTxt.lineSpacing = 10;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, descTxt, topbg, [27,44]);

        //trophy_icon
        let progressbar = ComponentMgr.getProgressBar(`royalview_progress`, `royalview_bar`, 342);
        progressbar.setProgressMode()
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, descTxt, [0,descTxt.height+45]);

        let score = Api.UserinfoVoApi.getScore();
        let prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
        let nextNeed = Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore());// Config.RoyalpassCfg.getNextNeedByScore(score);
        let maxlevel = !nextNeed;
        let isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
        let isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();
        
        let str = ``;
        let per = 0;
        if(isgetall){
            str = score.toString();//LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : ``);
            per = 1;
        }
        else{
            str = `${score}/${nextNeed}`;
            per =  score/nextNeed;
            // str = `${score - prevNeed}/${nextNeed - prevNeed}`;
            // per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
        }
        progressbar.setPercentage(per);
        progressbar.setText(str);
        progressbar.setTextSize(TextFieldConst.SIZE_24);
        progressbar.setTextColor(ColorEnums.white);
        view._progressbar = progressbar;
        progressbar._textLb.stroke = 2;

        let icon = BaseBitmap.create(`trophy_icon`);
        icon.setScale(0.42);

        // let topnamebg = BaseBitmap.create(`royalpassnamebg`);
        // view.addChildToContainer(topnamebg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, topnamebg, topbg, [30,20]);

        // let nameTxt = ComponentMgr.getTextField(LangMger.getlocal(`royal_token`), TextFieldConst.SIZE_CONTENT_NORMAL, ColorEnums.white);
        // view.addChildToContainer(nameTxt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, topnamebg, [0,10]);

        let crown = BaseBitmap.create(`crown`);
        view.addChildToContainer(crown);
        view._crown = crown;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, crown, topbg, [49,35]);

        let titlebit = BaseBitmap.create("royalreadyname");
		view.addChildToContainer(titlebit);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, titlebit, topbg, [42,18]);


        let group = new BaseDisplayObjectContainer();
		view.addChildToContainer(group);
		view._haveBuyGroup = group;

		// let haveTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpasshaveget`), TextFieldConst.SIZE_CONTENT_COMMON);
		// group.addChild(haveTxt);
		
		// let flag = BaseBitmap.create(`royalgouhao`);
		// group.addChild(flag);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flag, haveTxt, [haveTxt.width,0]);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, crown, [0,5]);

        group.visible = isgetRoyalpass;
        // crown.visible = !group.visible;
        
        if(!isgetRoyalpass){
            let button =ComponentMgr.getButton(`royalopencard`, LangMger.getlocal(`royalpassgoshop`), view.goShop, view);
            view.addChildToContainer(button);
            button.setTextSize(TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, button, topbg, [41, 117]);
            let txt = button.getChildByName("btnTxt");
            txt.y = 10;
            let tween = egret.Tween.get(button,{loop:true});
            tween.to({y:button.y + 10}, 500, egret.Ease.circInOut)
            .wait(200)
            .to({y:button.y}, 500)
            .wait(200);

            crown.addTouchTap(view.goShop, view);
        }
        
        view.closeBtn.y = 10;
        // 微信中关闭按钮左上角
        view.closeBtn.x = PlatMgr.checkIsWxSp()?10 :view.closeBtn.x;

        //底部彩色背景图
        let colorbg = BaseBitmap.create(`royalpasslistbg`);
        colorbg.height = GameConfig.stageHeigth - 320;//(1136 - 814);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, colorbg, topbg, [0, topbg.height + 80]);
        view.addChildToContainer(colorbg);

        let colorbg1 = BaseBitmap.create("royalpasslistbg1");
        this.addChildToContainer(colorbg1);
        colorbg1.width = GameConfig.stageWidth / 2;

        let colorbg2 = BaseBitmap.create("royalpasslistbg2");
        this.addChildToContainer(colorbg2);
        colorbg2.width = GameConfig.stageWidth / 2;
        colorbg2.x = colorbg1.x + colorbg1.width;
        colorbg1.height = colorbg2.height = colorbg.height;
        colorbg1.y = colorbg2.y = colorbg.y = 322;
        colorbg1.smoothing = true;

        //中柱子
        let midline = BaseBitmap.create(`royalpassmidline`); // "royalpassmidline":{"scale9grid":"8,25,1,1"},
        view.addChildToContainer(midline);
        midline.fillMode = egret.BitmapFillMode.REPEAT;
    
        let bottomBg = BaseBitmap.create(`royalpassbottombg`);
        view.addChildToContainer(bottomBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, colorbg);
        bottomBg.addTouchTap(this.bottomBgOnclick, this);

        midline.height = colorbg.height - bottomBg.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midline, colorbg);

        let height = colorbg.height - bottomBg.height - 90;
        let num = Math.ceil(height/241);
        let scrollist = ComponentMgr.getScrollList(RoyalPassItem, Config.RoyalpassCfg.getRoyalPassCfgList(), new egret.Rectangle(0,0,view.width, height), null, num); // - 25 不需要间隔
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollist, colorbg, [0,85]);
        view.addChildToContainer(scrollist);
        scrollist.bounces = false;
        view._list = scrollist;
        scrollist.bindMoveCompleteCallback(()=>{
            let top = scrollist.scrollTop;
            let topIdx = Math.ceil(top / 241);
            let curIdx = topIdx + Math.ceil(scrollist.height / 241);
            view.freshBigReward(curIdx);
        }, view);

        // let mask1 = BaseBitmap.create("royalmask1");
        // this.addChildToContainer(mask1);
        // mask1.width = colorbg1.width;
        // mask1.setPosition(colorbg1.x, colorbg1.y);
        
        // let mask2 = BaseBitmap.create("royalmask2");
        // this.addChildToContainer(mask2);
        // mask2.width = colorbg2.width;
        // mask2.setPosition(colorbg2.x, colorbg2.y);

        // 新的tab
        let royaltab = BaseBitmap.create("royaltab");
        this.addChildToContainer(royaltab);
        royaltab.x = 0;
        royaltab.y = topbg.y + topbg.height - 10;

        view.addChildToContainer(progressbar);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, royaltab, [0,26]);
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, progressbar, [-icon.width/2,0]);

        let freetab = ComponentMgr.getButton(`public_alphabg`, LangMger.getlocal(`sysfree`), ()=>{console.log("免费")}, view);
        freetab.setBtnSize(270, 70);
        freetab.setTextSize(TextFieldConst.SIZE_30);
        freetab.setTextStrokeColor(0x3a3a3a, 2);
        // freetab.setEnable(false);
        view.addChildToContainer(freetab);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, freetab, royaltab, [20, 10]);

        let viptab = ComponentMgr.getButton(`public_alphabg`, LangMger.getlocal(`royal_token`), view.goShop, view);
        viptab.setBtnSize(270, 70);
        viptab.setTextSize(TextFieldConst.SIZE_30);
        viptab.setTextStrokeColor(ColorEnums.strokeOrange, 2);
        view.addChildToContainer(viptab);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, viptab, royaltab, [20, 10]);

        let bigRewardGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(bigRewardGroup);
        bigRewardGroup.width = 600;
        bigRewardGroup.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bigRewardGroup, bottomBg);
        view.addChildToContainer(bigRewardGroup);
        view._bigrewardGroup = bigRewardGroup;

        let curid = Config.RoyalpassCfg.getNowProgressId(null, true);
        if(Api.GameinfoVoApi.getIsFinishNewGuide()){
            scrollist.setScrollTopByIndex(curid, 300);
        }
        view.freshBigReward(curid);
        view.freshView();
    }

    protected preInit():void{
        let view = this;
        super.preInit();
        if(Api.GameinfoVoApi.checlIsInGuideId(16)){
            App.CommonUtil.sendNewGuideId(16);
            Api.GameinfoVoApi.setCurGudingId(17);
            view._curReward = <RoyalPassItem>view._list.getItemByIndex(0);
            view._list.scrollTop = 25;
            view._list.verticalScrollPolicy = `off`;
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
		}
    }

    private bottomBgOnclick(event:egret.Event, params){
        event.stopPropagation();
        if(!this._bottomid && this._bottomid < 0){
            return
        }
        let data = Config.RoyalpassCfg.getRoyalPassCfgById(this._bottomid);
        let freerewardvo = GameData.formatRewardItem(data.primary)[0];
        ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW,{
            title : freerewardvo.name,
            needCancel : false,
            needClose : 1,
            boxId : freerewardvo.id,
        });
    }

    public getCloseBtnName():string{
        return "commonclosebtn";
    }

    private freshBigReward(start : number):void{
        let view = this;
        let maxlevel = Config.RoyalpassCfg.getRoyalPassMaxLevel();
        let bigid = -1;
        let end = maxlevel;
        if(start > end){
            start = end;
        }
        for(let i = start; i <= end; ++ i){
            let unit = Config.RoyalpassCfg.getRoyalPassCfgById(i);
            if(unit && unit.show && unit.show == 1){
                bigid = i;
                break;
            }
        }
        this._bottomid = bigid;
        if(bigid > -1){
            view._bigrewardGroup.removeChildren();

            let data = Config.RoyalpassCfg.getRoyalPassCfgById(bigid);
            let freerewardvo = GameData.formatRewardItem(data.primary)[0];
            let freeicon = GameData.getItemIcon(freerewardvo, 0);
            freeicon.setScale(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeicon, view._bigrewardGroup, [25,-25], true);
            view._bigrewardGroup.addChild(freeicon);
    
            let haveGetGroup = new BaseDisplayObjectContainer();
            view._bigrewardGroup.addChild(haveGetGroup);
            haveGetGroup.width = freeicon.width;
            haveGetGroup.height = freeicon.height;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveGetGroup, freeicon);
    
            // let maskbg = BaseBitmap.create(`public_9_bg8`);
            // maskbg.width = freeicon.width;
            // maskbg.height = freeicon.height;
            // maskbg.alpha = 0.3;
            // haveGetGroup.addChild(maskbg);
    
            let flag = BaseBitmap.create(`royalgouhao`);
            haveGetGroup.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, haveGetGroup, [0,0], true);

            haveGetGroup.visible = Api.GameinfoVoApi.isGetRoyalPassReward(bigid);

            let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpassbigrewardtip`, [data.needScore.toString(), freerewardvo.name]), TextFieldConst.SIZE_30, 0xC5D4F7);
            view._bigrewardGroup.addChild(tipTxt);
            tipTxt.stroke = 2;
            tipTxt.strokeColor = 0x0C2C77;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, view._bigrewardGroup, [freeicon.x + freeicon.width * freeicon.scaleX,0], true);
        }
    }


    private goShop():void{
        if(Api.GameinfoVoApi.getIsBuyRoyalPass()){
            return;
        }
        let view = this;
        view.hide();
        Api.ShopVoApi.setisbuyRoyal(true);
        App.MsgHelper.dispEvt(MsgConst.ROYAL_GOSHOP);
    }

    private freshView():void{
        let view = this;
        let isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();
        view._haveBuyGroup.visible = isgetRoyalpass;
        // view._crown.visible = !view._haveBuyGroup.visible;

        let id = Config.RoyalpassCfg.getNowProgressId();
        if(id == 0){
            let item = <RoyalPassItem>view._list.getItemByIndex(0);
            if(item){
                item.setCurProgress();
            }
        }
        else{
            for(let i = 0; i < Config.RoyalpassCfg.getRoyalPassMaxLevel(); ++ i){
                let item = <RoyalPassItem>view._list.getItemByIndex(i);
                if(item){
                    item.freshInfo();
                }
            }
        }

        let score = Api.UserinfoVoApi.getScore();
        let curid = Config.RoyalpassCfg.getNowProgressId(score);
        let prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
        let nextNeed = Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore());// Config.RoyalpassCfg.getNextNeedByScore(score);
        let maxlevel = !nextNeed;
        let isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
        
        let str = ``;
        let per = 0;
        if(isgetall || maxlevel){
            str = `${score}/${nextNeed}`//LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : ``);
            per = 1;
        }
        else{
            str = `${score}/${nextNeed}`;
            per =  score/nextNeed;
            // str = `${score - prevNeed}/${nextNeed - prevNeed}`;
            // per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
        }
        view._progressbar.setPercentage(per);
        view._progressbar.setText(str);
    }
    
    private getRewardback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let rewards = evt.data.data.data.rewards;
            if(rewards && rewards != ``){

                if(Api.ShopVoApi.getIsBox()){
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        isBoxBuy : false,//连续购买模式
                        specialBoxId : Api.ShopVoApi.getBoxId(),
                        handler : view,
                        needCancel : true,
                        closecallback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    Api.ShopVoApi.setIsBox(false,``);
                }
                else{
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        handler : view,
                        callback : ()=>{
                            if(Api.GameinfoVoApi.checlIsInGuideId(18)){
                                App.CommonUtil.sendNewGuideId(18);
                                Api.GameinfoVoApi.setCurGudingId(19);
                                view.hide();
                                App.MsgHelper.dispEvt(MsgConst.ROYAL_GODICE);
                            }
                        },
                    });
                }

                if(Api.GameinfoVoApi.checlIsInGuideId(17)){
                    App.CommonUtil.sendNewGuideId(17);
                    Api.GameinfoVoApi.setCurGudingId(18);
                }
                // let rewardsArr = GameData.formatRewardItem(rewards);
                // if(rewardsArr.length > 1 || (rewardsArr[0].type == 100)){
                //     ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                //         rewards : rewards,
                //         title : LangMger.getlocal(`sysGetReward`),
                //         handler : view,
                //         callback : ()=>{
                //             App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                //         },
                //         closecallback : ()=>{
                //             App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                //         },
                //     });
                // }
                // else if(rewardsArr[0].type == 1 || rewardsArr[0].type == 2){
                //     App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                // }
            }
        }
    }

	public dispose():void{
        let view = this;
        this._bottomid = -1;
        view._haveBuyGroup = null;
        view._crown = null;
        view._list = null;
        view._bigrewardGroup = null;
        view._progressbar = null;
        view._curReward = null;
		super.dispose();
	}
}