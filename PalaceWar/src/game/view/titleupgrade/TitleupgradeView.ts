/**
 * 帝王霸业
 * author qianjun
 */
class TitleupgradeView extends CommonView{	

    private _bgGroup : BaseDisplayObjectContainer = null;
    private _bgScrollView : ScrollView = null;
    private _stopTouch : boolean = false;
    private _leftArrow : BaseButton = null;
    private _rightArrow : BaseButton = null;
    private _achieveBtn:BaseButton = null;
    private _achieveBtnEff:CustomMovieClip = null;
    private _curType = 1;// 1皇 2帝 3王 = > 王→帝→皇
    private _dragon : BaseLoadDragonBones = null;

    public constructor(){
		super();
	}

    //titlebtnselect
	protected getResourceList():string[]{
		let arr = [`titledipos`,`titlediposspecial`,`titleupgradebgloop`,`titleupgradebuildbg`,`titleupgradecloud1`,`titleupgradecloud2`,`titleupgradebuilding`,`titlewangpos`,`titlewangposspecial`,`titleupgradebuildloop`,`titleupgradescan`,`specialview_commoni_namebg`,`titlecloud1`,`titlecloud2`,`titlecloud3`,`titleupgradetipbg`,`titleupgradeintitle`,`titleupgradearrow`,`emperor_achievebtn`,`emperor_achievebtn_down`,`titleupgradebottompage`,`titleupgradebottompage1`,`titleupgradebottompage2`,`titleupgradebottompage3`,`titleupgradebottomfnt1`,`titleupgradebottomfnt2`,`titleupgradebottomfnt3`];
		return super.getResourceList().concat(arr);
    }

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_TITLEUPGRADE;
    }
    
    protected isHideTitleBgShadow():boolean{
        return true;
    }

	protected initBg():void{
        let view = this;
        view._curType = 2;

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,view.upgradeCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.makePage();      
    }

    private makePage():void{
        let view = this;
        // 1皇 2帝 3王 => 王帝皇
        let order = [];
        let mannum = 7;
        let loopmannum = 4;       
        let cfg = Config.TitleupgradeCfg;
        let distance = 0;
        switch(this._curType){
            case 3:
                order = cfg.getHuangOrder();
                distance = -10;
                break;
            case 2:
                order = cfg.getDiOrder();
                distance = -45;
                break;
            case 1:
                order = cfg.getWangOrder();
                break;
        }
        let total = order.length;
        //帝人数
        // let diorder = cfg.getDiOrder();
        // let wangorder = cfg.getWangOrder();
        //计算出要补的图 与总宽度       
        // let didistance = -45;//(bggroup.width - diorder.length * 360) / (diorder.length - 1);
        // let wangdistance = -10;//(bggroup.width - wangorder.length * 171) / (wangorder.length - 1);

        let lenth1 = order.length * (360 + distance);// + (diorder.length - 1) * 150;
        //let lenth2 = wangorder.length * (171 + wangdistance);// + (wangorder.length - 1) * 100;
        let loopnum1 = Math.ceil(lenth1 / GameConfig.stageWidth);
        let mapnum = loopnum1;
        // let loopnum2 = Math.ceil(lenth2 / GameConfig.stageWidth);
        // let mapnum = Math.max(loopnum1, loopnum2);
        if(view._bgGroup){
            view._bgGroup.dispose();
            view._bgGroup = null;
        }
        let bggroup = new BaseDisplayObjectContainer();
        bggroup.width = GameConfig.stageWidth * mapnum;
        bggroup.height = GameConfig.stageHeigth;
        view._bgGroup = bggroup;
       
        //建筑
        let basebgx = (bggroup.width - GameConfig.stageWidth) / 2;
        let len = bggroup.width / (GameConfig.stageWidth); 
        for(let i = 0; i < len; ++ i){
            let str = i == 0 ? `titleupgradebuildbg` : `titleupgradebuildloop` 
            let buildbg = BaseBitmap.create(str);
            buildbg.x = basebgx + (i % 2 == 0 ? 1 : -1) * (Math.ceil(i / 2)) * GameConfig.stageWidth;
            buildbg.y = GameConfig.stageHeigth - buildbg.height - 290;
            bggroup.addChild(buildbg);
            if(i == (len - 2) && ((i % 2 == 1 && buildbg.x > 0) || (i % 2 == 0 && buildbg.x < (bggroup.width - buildbg.width)))){
                let buildbg = BaseBitmap.create(str);
                buildbg.x = basebgx + (len % 2 == 0 ? 1 : -1) * (Math.ceil(len / 2)) * GameConfig.stageWidth;
                buildbg.y = GameConfig.stageHeigth - buildbg.height - 290;
                bggroup.addChild(buildbg);
            }
        }
        //背景图
        for(let i = 0; i < mapnum; ++ i){
            let res = `titleupgradebgloop`;
            let bg = BaseBitmap.create(res);
            bg.scaleY = 1.1;
            bg.x = i * GameConfig.stageWidth;
            bg.y = bggroup.height - bg.height - 160;
            bggroup.addChild(bg);
        }
        //云朵
        for(let i = 0; i < (mapnum / 2); ++ i){
            let cloud = BaseBitmap.create(`titleupgradecloud${i / 2 == 0 ? 1 : 2}`);
            cloud.x = i * cloud.width;
            cloud.y = bggroup.width / 2 - cloud.height / 2;
            bggroup.addChild(cloud);
        }

        let basepos = 0;
        if(this._curType == 3){
          //皇位
          basepos = (bggroup.width - 171) / 2 + (171 - 360) / 2;
          for(let i = 0; i < order.length; ++ i){
              let titleid = order[i];
              let role = null;
              let titlecfg = Config.TitleCfg.getTitleCfgById(titleid);

              let special = true;//Number(i) == 0;
              let pos = BaseBitmap.create(special ? `titlediposspecial` : `titledipos`);
              pos.x = basepos + (i % 2 == 0 ? 1 : -1) * (Math.ceil(i / 2)) * (360 + distance);
              pos.y = (bggroup.height - pos.height) / 2 + 70;
              bggroup.addChild(pos);

              if(Config.TitleCfg.isTitleOPend(titleid)){
                  role = Api.playerVoApi.getPlayerPortrait(titleid, Api.playerVoApi.getPlayePicId());
                  role.name = `role${titleid}`;
                  role.setScale(special ? 0.55 : 0.5);
                  App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [8, 140]);
                  bggroup.addChild(role);
                  role.addTouchTap(()=>{
                      //if(Api.titleupgradeVoApi.isinTitle(titleid)){
                          ViewController.getInstance().openView(ViewConst.COMMON.TITLEUPGRADELLEVELUPVIEW, {
                              titleid : titleid
                          });
                      //}
                  }, view);
                  //已解锁过
                  if(Api.titleupgradeVoApi.isunlock(titleid)){
                      App.DisplayUtil.changeToNormal(role);
                  }
                  else{
                      App.DisplayUtil.changeToAlpha(role);
                  }
                  let clv = 0;
                  let info = Api.titleupgradeVoApi.getTitleInfo(titleid);
                  clv = info.level;

                  if(clv){
                      let txt2 =ComponentManager.getBitmapText(LanguageManager.getlocal(`servant_lv`, [clv.toString()]), `socre_fnt`);
                      txt2.name = `levelTxt${titleid}`
                      App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt2, role, [0,-txt2.height+5]);
                      bggroup.addChild(txt2);
                  }

                  if(Api.titleupgradeVoApi.isinTitle(titleid)){
                      let bg1 = BaseBitmap.create(`titleupgradeintitle`);
                      bggroup.addChild(bg1);
                      App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, role, [0,-bg1.height]);
                      
                      let scan = BaseBitmap.create(`titleupgradescan`);
                      scan.alpha = 0;
                      App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scan, bg1);
                      bggroup.addChild(scan);
                      scan.x = bg1.x - 33;
                      egret.Tween.get(scan, {loop : true}).to({x : bg1.x - 33 + bg1.width}, 1000).set({x : bg1.x - 33}).wait(1500);
                      egret.Tween.get(scan, {loop : true}).to({alpha : 1}, 500).to({alpha : 0}, 500).wait(1500)
                  }

                  //可提升
                  if(Api.titleupgradeVoApi.canTitleLevelUp(titleid)){//Api.titleupgradeVoApi.canTitleLevelUp(titleid)
                      let leveluptipGroup = new BaseDisplayObjectContainer();
                      leveluptipGroup.name = `leveluptipGroup${titleid}`;
                      bggroup.addChild(leveluptipGroup);

                      let bg2 = BaseBitmap.create(`titleupgradetipbg`);
                      leveluptipGroup.addChild(bg2);
                  
                      leveluptipGroup.anchorOffsetX = leveluptipGroup.width / 2;
                      leveluptipGroup.anchorOffsetY = leveluptipGroup.height / 2;
                      App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, leveluptipGroup, role, [0,75]);
                      egret.Tween.get(leveluptipGroup, {loop : true}).to({scaleX : 1.2, scaleY : 1.2}, 500).to({scaleX : 1, scaleY : 1}, 500);
                  }

                  let titleImg = App.CommonUtil.getTitlePic(titleid, clv);
                  titleImg.width = 155;
                  titleImg.height = 59;
                  App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0,15]);
                  bggroup.addChild(titleImg);
                  titleImg.name = `title${titleid}`;
              }
              else{
                  let roleImgName = ResourceManager.hasRes("palace_role_empty_"+titleid) ? "palace_role_empty_"+titleid : "palace_role_empty";
                  role = BaseLoadBitmap.create(roleImgName);
                  role.width = 517;
                  role.height = 775;
                  role.setScale(special ? 0.55 : 0.5);
                  bggroup.addChild(role);
                  App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [0, 130]);
              }
          }   
        }
        else if(this._curType == 2){
            //帝位
            basepos = (bggroup.width - 171) / 2 + (171 - 360) / 2;
            for(let i = 0; i < order.length; ++ i){
                let titleid = order[i];
                let role = null;
                let titlecfg = Config.TitleCfg.getTitleCfgById(titleid);

                let special = Number(i) == 0;
                let pos = BaseBitmap.create(special ? `titlediposspecial` : `titledipos`);
                pos.x = basepos + (i % 2 == 0 ? 1 : -1) * (Math.ceil(i / 2)) * (360 + distance);
                pos.y = (bggroup.height - pos.height) / 2 + 70;
                bggroup.addChild(pos);

                if(Config.TitleCfg.isTitleOPend(titleid)){
                    role = Api.playerVoApi.getPlayerPortrait(titleid, Api.playerVoApi.getPlayePicId());
                    role.name = `role${titleid}`;
                    role.setScale(special ? 0.55 : 0.5);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [8, 140]);
                    bggroup.addChild(role);
                    role.addTouchTap(()=>{
                        //if(Api.titleupgradeVoApi.isinTitle(titleid)){
                            ViewController.getInstance().openView(ViewConst.COMMON.TITLEUPGRADELLEVELUPVIEW, {
                                titleid : titleid
                            });
                        //}
                    }, view);
                    //已解锁过
                    if(Api.titleupgradeVoApi.isunlock(titleid)){
                        App.DisplayUtil.changeToNormal(role);
                    }
                    else{
                        App.DisplayUtil.changeToAlpha(role);
                    }
                    let clv = 0;
                    let info = Api.titleupgradeVoApi.getTitleInfo(titleid);
                    clv = info.level;

                    if(clv){
                        let txt2 =ComponentManager.getBitmapText(LanguageManager.getlocal(`servant_lv`, [clv.toString()]), `socre_fnt`);
                        txt2.name = `levelTxt${titleid}`
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt2, role, [0,-txt2.height+5]);
                        bggroup.addChild(txt2);
                    }

                    if(Api.titleupgradeVoApi.isinTitle(titleid)){
                        let bg1 = BaseBitmap.create(`titleupgradeintitle`);
                        bggroup.addChild(bg1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, role, [0,-bg1.height]);
                        
                        let scan = BaseBitmap.create(`titleupgradescan`);
                        scan.alpha = 0;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scan, bg1);
                        bggroup.addChild(scan);
                        scan.x = bg1.x - 33;
                        egret.Tween.get(scan, {loop : true}).to({x : bg1.x - 33 + bg1.width}, 1000).set({x : bg1.x - 33}).wait(1500);
                        egret.Tween.get(scan, {loop : true}).to({alpha : 1}, 500).to({alpha : 0}, 500).wait(1500)
                    }

                    //可提升
                    if(Api.titleupgradeVoApi.canTitleLevelUp(titleid)){//Api.titleupgradeVoApi.canTitleLevelUp(titleid)
                        let leveluptipGroup = new BaseDisplayObjectContainer();
                        leveluptipGroup.name = `leveluptipGroup${titleid}`;
                        bggroup.addChild(leveluptipGroup);

                        let bg2 = BaseBitmap.create(`titleupgradetipbg`);
                        leveluptipGroup.addChild(bg2);
                    
                        leveluptipGroup.anchorOffsetX = leveluptipGroup.width / 2;
                        leveluptipGroup.anchorOffsetY = leveluptipGroup.height / 2;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, leveluptipGroup, role, [0,75]);
                        leveluptipGroup.setScale(1);
                        egret.Tween.get(leveluptipGroup, {loop : true}).to({scaleX : 1.2, scaleY : 1.2}, 700).to({scaleX : 1, scaleY : 1}, 700);
                    }

                    let titleImg = App.CommonUtil.getTitlePic(titleid, clv);
                    titleImg.width = 155;
                    titleImg.height = 59;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0,15]);
                    bggroup.addChild(titleImg);
                    titleImg.name = `title${titleid}`;
                }
                else{
                    role = BaseLoadBitmap.create(`palace_role_empty`);
                    role.width = 517;
                    role.height = 775;
                    role.setScale(special ? 0.55 : 0.5);
                    bggroup.addChild(role);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [0, 130]);
                }
            }   
        }
        else{
            //王位
            basepos = (bggroup.width - 171) / 2 + (171 - 360) / 2;
            for(let i = 0; i < order.length; ++ i){
                // let pos = base + (i % 2 == 0 ? 1 : -1) * (Math.ceil(i / 2))
                // obj[pos] = wangorder[i];
                let titleid = order[i];
                let role = null;
                let titlecfg = Config.TitleCfg.getTitleCfgById(titleid);

                let special = Number(i) == 0;
                let pos = BaseBitmap.create(special ? `titlediposspecial` : `titledipos`);
                pos.x = basepos + (i % 2 == 0 ? 1 : -1) * (Math.ceil(i / 2)) * (360 + distance);
                pos.y = (bggroup.height - pos.height) / 2 + 70;
                bggroup.addChild(pos);
                pos.name = `pos${titleid}`;

                if(Config.TitleCfg.isTitleOPend(titleid)){
                    //已解锁过
                    role = Api.playerVoApi.getPlayerPortrait(titleid, Api.playerVoApi.getPlayePicId());
                    role.name = `role${titleid}`;
                    role.setScale(special ? 0.55 : 0.5);
                    bggroup.addChild(role);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [8, 140]);
                    role.addTouchTap(()=>{
                        //if(Api.titleupgradeVoApi.isinTitle(titleid)){
                            ViewController.getInstance().openView(ViewConst.COMMON.TITLEUPGRADELLEVELUPVIEW, {
                                titleid : titleid
                            });
                        //}
                    }, view);
                    if(Api.titleupgradeVoApi.isunlock(titleid)){
                        App.DisplayUtil.changeToNormal(role);
                    }
                    else{
                        App.DisplayUtil.changeToAlpha(role);
                    }
                    let clv = 0;
                    let info = Api.titleupgradeVoApi.getTitleInfo(titleid);
                    clv = info.level;

                    if(clv){
                        let txt2 = ComponentManager.getBitmapText(LanguageManager.getlocal(`servant_lv`, [clv.toString()]), `socre_fnt`);
                        txt2.name = `levelTxt${titleid}`
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt2, role, [0,-txt2.height+5]);
                        bggroup.addChild(txt2);
                    }
                    

                    if(Api.titleupgradeVoApi.isinTitle(titleid)){ 
                        let bg1 = BaseBitmap.create(`titleupgradeintitle`);
                        bggroup.addChild(bg1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, role, [0,-bg1.height]);

                        let scan = BaseBitmap.create(`titleupgradescan`);
                        scan.alpha = 0;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scan, bg1);
                        bggroup.addChild(scan);
                        scan.x = bg1.x - 33;
                        egret.Tween.get(scan, {loop : true}).to({x : bg1.x - 33 + bg1.width * bg1.scaleX}, 1000).set({x : bg1.x - 33}).wait(1500);
                        egret.Tween.get(scan, {loop : true}).to({alpha : 1}, 500).to({alpha : 0}, 500).wait(1500);
                    }

                    if(Api.titleupgradeVoApi.canTitleLevelUp(titleid)){//
                        //可提升
                        let leveluptipGroup = new BaseDisplayObjectContainer();
                        leveluptipGroup.name = `leveluptipGroup${titleid}`;
                        bggroup.addChild(leveluptipGroup);

                        let bg2 = BaseBitmap.create(`titleupgradetipbg`);
                        leveluptipGroup.addChild(bg2);
                        
                        leveluptipGroup.anchorOffsetX = leveluptipGroup.width / 2;
                        leveluptipGroup.anchorOffsetY = leveluptipGroup.height / 2;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, leveluptipGroup, role, [0,75]);
                        // leveluptipGroup.x = role.x + 58;
                        // if(Number(titleid) == 3201){
                        //     leveluptipGroup.x = role.x + 67;
                        //     leveluptipGroup.y -= 10; 
                        // }
                        egret.Tween.get(leveluptipGroup, {loop : true}).to({scaleX : 0.84, scaleY : 0.84}, 500).to({scaleX : 0.7, scaleY : 0.7}, 500);
                    }
                    let titleImg = App.CommonUtil.getTitlePic(titleid, clv);
                    titleImg.width = 155;
                    titleImg.height = 59;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, titleImg, role, [0,15]);
                    bggroup.addChild(titleImg);
                    titleImg.name = `title${titleid}`;

                }
                else{
                    role = BaseLoadBitmap.create(`palace_role_empty`);
                    role.width = 517;
                    role.height = 775;
                    role.setScale(special ? 0.55 : 0.5);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, role, pos, [0, 130]);
                    bggroup.addChild(role);
                }
            }
        }
        
        //云朵动画
        for(let i = 0; i < Math.floor(len / 2); ++ i){
            let startX = i * GameConfig.stageWidth * 2;
            let endX = (i + 1) * GameConfig.stageWidth * 2;
            /**
             * 13S：移动810PX
                位置：Y：350
                文件名：云02

                5s移动1000px
                位置：Y：490
                文件名：云03

                7S移动790PX
                位置：Y：648
                文件名：云02

                6S移动1100
                位置：Y：890
                文件名：云01
            */
            let cloud1 = BaseBitmap.create(`titlecloud2`);
            cloud1.x = startX;
            cloud1.y = 350 - 89;
            let speed1 = 810 / 13000 / 2;

            let cloud2 = BaseBitmap.create(`titlecloud3`);
            cloud2.x = endX;
            cloud2.y = 490 - 89;
            let speed2 = 1000 / 5000 / 2;

            let cloud3 = BaseBitmap.create(`titlecloud2`);
            cloud3.x = startX;
            cloud3.y = 648 - 89;
            let speed3 = 790 / 7000 / 2;

            let cloud4 = BaseBitmap.create(`titlecloud1`);
            cloud4.x = endX;
            cloud4.y = 890 - 89;
            let speed4 = 1100 / 6000 / 2;

            egret.Tween.get(cloud1, {loop : true}).to({x : startX + 810}, 810 / speed1).to({alpha : 0, x : startX + 910}, 100 / speed1).set({x : startX - 100}).to({x : startX , alpha : 1}, 100 / speed1);
            egret.Tween.get(cloud2, {loop : true}).to({x : endX - 1000}, 1000 / speed2).to({alpha : 0, x : endX - 1100}, 100 / speed2).set({x : endX + 100}).to({x : endX , alpha : 1}, 100 / speed2);
            egret.Tween.get(cloud3, {loop : true}).to({x : startX + 790}, 790 / speed3).to({alpha : 0, x : startX + 890}, 100 / speed3).set({x : startX - 100}).to({x : startX , alpha : 1}, 100 / speed3);
            egret.Tween.get(cloud4, {loop : true}).to({x : endX - 1100}, 1100 / speed4).to({alpha : 0, x : endX - 1200}, 100 / speed4).set({x : endX + 100}).to({x : endX , alpha : 1}, 100 / speed4);

            bggroup.addChild(cloud1);
            bggroup.addChild(cloud2);
            bggroup.addChild(cloud3);
            bggroup.addChild(cloud4);
        }
        let childIdx = 0;
        if(view._bgScrollView){
            childIdx = view.getChildIndex(view._bgScrollView);
            view._bgScrollView.dispose();
            view.removeChild(view._bgScrollView);
            view._bgScrollView = null;
        }
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
        let noticescrollView = ComponentManager.getScrollView(bggroup,rect);
        noticescrollView.bounces = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
        noticescrollView.verticalScrollPolicy = 'off';
        bggroup.y = 92;
        if(childIdx){
            this.addChildAt(noticescrollView, childIdx);
        }
        else{
            this.addChild(noticescrollView);
        }
        this._bgScrollView = noticescrollView;
        view._bgScrollView.bindMoveCompleteCallback(()=>{
            //左右箭头
            let leftX = view._bgScrollView.scrollLeft;
            if(view._leftArrow){
                view._leftArrow.visible = leftX > 0;
                view._rightArrow.visible = leftX < (view._bgGroup.width - GameConfig.stageWidth);
            }
        },this);
        // this.freshMap();
        noticescrollView.scrollLeft = (bggroup.width - GameConfig.stageWidth) / 2;
        view.freshRedPoint();
    }

    private freshRedPoint():void{
        let view = this;
        let cfg = Config.TitleupgradeCfg;
        for(let i = 1; i < 4; ++ i){
            let order = [];  
            let perorbtn = <BaseDisplayObjectContainer>view.getChildByName(`perorbtn${i}`);
            switch(i){
                case 1:
                    order = cfg.getWangOrder();
                    break;
                case 2:
                    order = cfg.getDiOrder();
                    break;
                case 3:
                    order = cfg.getHuangOrder();
                    break;
            }
            let flag = false;
            for(let i in order){
                let titleid = order[i];
                if(Api.titleupgradeVoApi.canTitleLevelUp(titleid)){
                    flag = true;
                    break;
                }
            }
            if(flag){
                App.CommonUtil.addIconToBDOC(perorbtn);
                if(perorbtn){
                    let redpoint = perorbtn.getChildByName(`reddot`);
                    if(redpoint){
                        redpoint.x = 115;
                        redpoint.y = 10;
                    }
                }
               
            }
            else{
                App.CommonUtil.removeIconFromBDOC(perorbtn);
            }
        }
    }

    private upgradeCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data){
            let titleid = evt.data;
            let titlecfg = Config.TitleCfg.getTitleCfgById(titleid);
            //let isdi = titlecfg.isTitle == 1 && titlecfg.titleType == 1;

            let role = view._bgGroup.getChildByName(`role${titleid}`);
            let levelTxt = <BaseTextField>view._bgGroup.getChildByName(`levelTxt${titleid}`);
            let info = Api.titleupgradeVoApi.getTitleInfo(titleid);
            if(levelTxt){
                levelTxt.text = LanguageManager.getlocal(`servant_lv`, [info.level.toString()]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, levelTxt, role, [0,-levelTxt.height]);

            let leveluptipGroup = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`leveluptipGroup${titleid}`);
            if(leveluptipGroup && !Api.titleupgradeVoApi.canTitleLevelUp(titleid)){
                leveluptipGroup.dispose();
                leveluptipGroup = null;
            }
            let titleImg = <BaseDisplayObjectContainer>view._bgGroup.getChildByName(`title${titleid}`);
            if(titleImg){
                titleImg.dispose();
                titleImg = null;

                let tmp = App.CommonUtil.getTitlePic(titleid, info.level);
                tmp.width = 155;
                tmp.height = 59;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tmp, role, [0,15]);
                view._bgGroup.addChild(tmp);
                tmp.name = `title${titleid}`;
            }
            view.freshRedPoint();
        }
    }

	protected getTitleStr():string{
		return null;
    }

    protected getTitleBgName():string{
		return "titleupgradetitle";
    }
    
    protected getRuleInfo():string{
		return "titleupgraderule";
	}

	public initView():void{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD), this.refreshView, this);
        let view = this;
        view._bgGroup.y = view.titleBg.y + view.titleBg.height;

        let leftArrow = ComponentManager.getButton(`titleupgradearrow`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.max(view._bgScrollView.scrollLeft - GameConfig.stageWidth, 0);
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                view._stopTouch = false;
                view._leftArrow.visible = view._bgScrollView.scrollLeft > 0;
                egret.Tween.removeTweens(view._bgScrollView);
            },view);
        }, view);
        leftArrow.anchorOffsetX = leftArrow.width / 2;
        leftArrow.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftArrow, view);
        view._leftArrow = leftArrow;
        view.addChild(leftArrow);

        let rightArrow = ComponentManager.getButton(`titleupgradearrow`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.min(view._bgScrollView.scrollLeft + GameConfig.stageWidth, (view._bgGroup.width - GameConfig.stageWidth));
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                egret.Tween.removeTweens(view._bgScrollView);
                view._stopTouch = false;
                view._rightArrow.visible = view._bgScrollView.scrollLeft < (view._bgGroup.width - GameConfig.stageWidth);
            },view);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightArrow, view);
        view._rightArrow = rightArrow;
        view.addChild(rightArrow);

        view._bgScrollView.bindMoveCompleteCallback(()=>{
            //左右箭头
            let leftX = view._bgScrollView.scrollLeft;
            if(view._leftArrow){
                view._leftArrow.visible = leftX > 0;
                view._rightArrow.visible = leftX < (view._bgGroup.width - GameConfig.stageWidth);
            }
        },this);

        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,view.checkRed,view);
        
        //帝王成就
        if (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement()){
            let achieveBtn = ComponentManager.getButton("emperor_achievebtn", "", ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.EMPERORACHIEVEVIEW);
            }, this);
            achieveBtn.setPosition(GameConfig.stageWidth - achieveBtn.width - 25, view.titleBg.height+20);
            this.addChild(achieveBtn);
            this._achieveBtn = achieveBtn;
            let achieveBtnEff = ComponentManager.getCustomMovieClip("emperorachieve_iconeffect", 10, 70);
            achieveBtnEff.setPosition(achieveBtn.x - 15, achieveBtn.y - 15);
            achieveBtnEff.playWithTime(0);
            this.addChild(achieveBtnEff);
            achieveBtnEff.visible = false;
            this._achieveBtnEff = achieveBtnEff;
            this.refreshAchieveBtn();
        }

        let bottompage = BaseBitmap.create(`titleupgradebottompage`);
        view.addChild(bottompage);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottompage, view);

        // let eff = ComponentManager.getCustomMovieClip(`titlebtnselect`, 10);
        // eff.width = 164;
        // eff.height = 158;
        // eff.blendMode = egret.BlendMode.ADD;
        // eff.playWithTime(-1);
        // view._selectEff = eff;

        for(let i = 1; i < 4; ++ i){
            let perorbtn = new BaseDisplayObjectContainer();
            perorbtn.width = 148;
            perorbtn.height = 142;
            perorbtn.anchorOffsetX = perorbtn.width / 2;
            perorbtn.anchorOffsetY = perorbtn.height / 2;
            view.addChild(perorbtn);

            let btnbg = BaseBitmap.create(`titleupgradebottompage${i}`);
            perorbtn.addChild(btnbg);

            let downeff = ComponentManager.getCustomMovieClip(`tilelevelbtn${i}down`, 10);
            downeff.width = 180;
            downeff.height = 173;
            downeff.playWithTime(-1);
            downeff.name = `downeff${i}`;
            perorbtn.addChild(downeff);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, downeff, btnbg);

            let fnt = BaseBitmap.create(`titleupgradebottomfnt${i}`);
            perorbtn.addChild(fnt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fnt, btnbg);

            let upeff = ComponentManager.getCustomMovieClip(`tilelevelbtn${i}up`, 10);
            upeff.width = 180;
            upeff.height = 173;
            upeff.name = `upeff${i}`;
            upeff.playWithTime(-1);
            perorbtn.addChild(upeff);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upeff, btnbg);
            upeff.blendMode = egret.BlendMode.ADD;

            downeff.visible = upeff.visible = false;
            perorbtn.addTouchTap(()=>{
                if(!this.checkKingOpen(i)){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`titleupgradetip6`, [LanguageManager.getlocal(`titleupgradetype${i}`)]));
                    return; 
                }
                if(view._curType == i){
                    return;
                }
                view._curType = i;
                view.checkBtnStatus();
                view.cloudShowPage();
            }, view);
            
            // ComponentManager.getButton(`titleupgradebottompage${i}`, '', ()=>{
            // }, view);
    
            perorbtn.name = `perorbtn${i}`;
            view.addChild(perorbtn);
            perorbtn.setScale(0.9);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, perorbtn, bottompage, [12+  perorbtn.anchorOffsetX + 170 * (i - 1),18]);
            if(i == 2){
                perorbtn.setScale(1);
                downeff.visible = upeff.visible = true;
            }
        }
        
        let boneName = `qianshijinsheng_tex_png`;
        if(!Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName) && App.CommonUtil.check_dragon()){
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(`qianshijinsheng`,-1,'stop');
            droWifeIcon.setScale(1);
            droWifeIcon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,this.dragonMc,this); 
            droWifeIcon.stop();
            droWifeIcon.x = 320;
            droWifeIcon.y = 500;
            droWifeIcon.scaleY = 1.5;
            view._dragon = droWifeIcon;
            droWifeIcon.alpha = 0;
            view.addChild(droWifeIcon);
        }
        
    }

    private dragonMc():void{
        let view = this;
        view._dragon.alpha = 0;
    }

    private cloudShowPage():void{
        let view = this;
        if(view._dragon){
            view._dragon.alpha = 1;
            view._dragon.playDragonMovie(`idle`, 1);
            egret.Tween.get(view._dragon).wait(800).call(()=>{
                view.makePage();
            }, view).call(()=>{
                egret.Tween.removeTweens(view._dragon);
            }, view);
        }
        else{
            view.makePage();
        }
    }

    private refreshView():void{
        this.refreshAchieveBtn();
    }

    private refreshAchieveBtn():void{
        if (Api.switchVoApi.checkTitleUpgrade() && Api.switchVoApi.checkOpenEmperorsAchievement()){
            if (Api.emperorAchieveVoApi.isShowKingAchieveRedDot()){
                App.CommonUtil.addIconToBDOC(this._achieveBtn);
                this._achieveBtnEff.visible = true;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(this._achieveBtn);
                this._achieveBtnEff.visible = false;
            }
        } 
        this.freshRedPoint();
    }
    
    public tick():void{
        let view = this;
        let arr = [];
        let cfg = Config.TitleupgradeCfg;
        switch(this._curType){
            case 3:
                arr = cfg.getHuangOrder();
                break;
            case 2:
                arr = cfg.getDiOrder();
                break;
            case 1:
                arr = cfg.getWangOrder();
                break;
        }
        App.CommonUtil.removeIconFromBDOC(view._leftArrow);
        App.CommonUtil.removeIconFromBDOC(view._rightArrow);
        for(let i in arr){
            if(Api.titleupgradeVoApi.canTitleLevelUp(arr[i])){
                let role = view._bgGroup.getChildByName(`role${arr[i]}`);
                if(role){
                    let leftx = view._bgScrollView.scrollLeft;
                    if(role.x > (leftx + GameConfig.stageWidth)){
                        App.CommonUtil.addIconToBDOC(view._rightArrow);
                    }
                    else if((role.x + (role.width * role.scaleX)) < leftx){
                        App.CommonUtil.addIconToBDOC(view._leftArrow);
                    }
                }
            }	
        }
        this.refreshAchieveBtn();
    }

    private checkKingOpen(type : number):boolean{
        let flag = false;
        // 1 皇 2 帝 3 王=》 王 帝 皇
        let order = [];
        let cfg = Config.TitleupgradeCfg;
        switch(type){
            case 3:
                order = cfg.getHuangOrder();
                break;
            case 2:
                order = cfg.getDiOrder();
                break;
            case 1:
                order = cfg.getWangOrder();
                break;
        }
        for(let i = 0; i < order.length; ++ i){
            let tid = order[i];
            if(Config.TitleCfg.isTitleOPend(tid)){
                flag = true;
                break;
            }
        }
        return flag;
    }

    private checkBtnStatus():void{
        let view = this;
        for(let i = 1; i < 4; ++ i){
            let perorbtn = <BaseDisplayObjectContainer>view.getChildByName(`perorbtn${i}`);
            if(perorbtn){
                perorbtn.setScale(view._curType == i ? 1 : 0.9);
                let downeff = perorbtn.getChildByName(`downeff${i}`);
                let upeff = perorbtn.getChildByName(`upeff${i}`);
                downeff.visible = upeff.visible = view._curType == i;
            }
        }
    }

    public dispose() : void{
        let view = this;
        view._leftArrow = null;
        view._rightArrow = null;
        view._stopTouch = false;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TITLEUPGRADE), this.upgradeCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TITLEUPGRADE_MODEL,view.upgradeCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD), this.refreshView, this);
        view._bgGroup = null;
        view._bgScrollView = null;
        view._achieveBtn = null;
        view._achieveBtnEff = null;
        view._dragon = null;
		super.dispose();
	}
}