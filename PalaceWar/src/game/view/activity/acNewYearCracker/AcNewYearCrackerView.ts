/*
author : qianjun
desc : 爆竹迎新
*/
class AcNewYearCrackerView extends AcCommonView{
    public constructor(){
        super();
    }
    private _cdText : BaseTextField = null;
    private _numBg : BaseBitmap = null;
    private _numTxt : BaseTextField = null;
    private _buildbg : BaseBitmap = null;
    private _rewardBtn : BaseButton = null;
    private _bottomBg : BaseBitmap = null;
    private _bottomFireBg : BaseBitmap = null;
    private _bottomText : BaseTextField = null;
    private _bottomText2 : BaseTextField = null;
    private _bottomCrackerIcon : BaseBitmap = null;
    private _stopClick : boolean = false;
    private _bottomIcon : BaseButton = null;
    private _curCracker : number = 1;

    private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getTitleBgName():string{
        return `accrackertitlebg-${this.code}`
    }

    protected getTitleStr():string{
        return null;//`acNewYearCrackerTitle-${this.code}`
    }

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        let code = this.code;
        ret = ret.concat([
           `accrackertitlebg-${code}`,`accrackertopbg1-${code}`,`newyearcrackercode${code}`,`crackericon1-${code}`,`crackericon2-${code}`,
           `accrackertbg1-${code}`,`battlegrounddetail-1`,`battlegrounddetail-1_down`,`crackerbang${1}-`,`crackerfire${1}-`,`crackerfly${1}-`,`envelopeghuan${1}-`,
           `lihuabang${1}-`,`lihuahong`,`lihuahuang`,`lihualan`,`accrackertbg2-${code}`,`accrackertbg3-${code}`,
        ]);
		return ret;
	}
    
    // 背景图名称
	protected getBgName():string{
        return `accrackertbg${this.vo.getCurBuildId()}-` + this.code;
    }

    protected getRuleInfo() : string{
        return `acNewYearCrackerRule-` + this.code;
    }
    
    protected initBg():void{
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
		let bgName:string=this.getBgName();
		if(bgName){
            this.viewBg = BaseBitmap.create(bgName);
            if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
            }
            this.addChild(this.viewBg);
            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.anchorOffsetX = this.viewBg.width / 2;
            this.viewBg.anchorOffsetY = this.viewBg.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            //this.viewBg.y = 0 - (1136 - GameConfig.stageHeigth);//0 - Math.floor((1136 - GameConfig.stageHeigth) / 2);
		}
    }
    private mapPos = {
        1 : { x : 18, y : 446, width : 180, height : 116}, 
        2 : { x : 18, y : 556, width : 54, height : 54},
        3 : { x : 18, y : 666, width : 54, height : 54},
        4 : { x : 527, y : 336, width : 54, height : 54},
        5 : { x : 527, y : 446, width : 54, height : 54},
        6 : { x : 527, y : 556, width : 54, height : 54},
        7 : { x : 527, y : 666, width : 54, height : 54},
    }
    //
    public initView(){
        let view = this; 
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.update,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD),view.crackRewardCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.code;

        let topBg = BaseBitmap.create(`accrackertopbg1-${code}`);
        view.addChildToContainer(topBg);

        let btn = ComponentManager.getButton(`accrackerscene-${code}`,'',()=>{
            if(view._stopClick){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERSCENEPOPUPVIEW,{
                code : view.code,
                aid : view.aid
            })
        },view);
        view.addChildToContainer(btn);

        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerTip1-${code}`), 20);
        view.addChildToContainer(tip1Text);

        let itemicon = BaseBitmap.create(`crackericon1-${code}`);
        itemicon.setScale(0.4);
        view.addChildToContainer(itemicon);

        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerTip2-${code}`), 20);
        view.addChildToContainer(tip2Text);

        let tip3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerTip3-${code}`), 20);
        view.addChildToContainer(tip3Text);

        let tip5Text = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerTip6-${view.code}`, [view.vo.acTimeAndHour]), 20);
        view.addChildToContainer(tip5Text);
        view._cdText = tip5Text;

        let tip4Text = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerTip${view.vo.isInActy() ? 4 : 5}-${view.code}`, [view.vo.getCountCd()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(tip4Text);
        view._cdText = tip4Text;
        
        let tmpH = tip1Text.height + tip3Text.height + tip4Text.height + tip5Text.height + 30 + 26;
        let tmpY = Math.max(0, topBg.height - tmpH);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0,view.titleBg.height - tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, topBg, [10,tmpY/2]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topBg, [btn.width + 17, 13 + tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, tip1Text, [tip1Text.textWidth, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tip2Text, itemicon, [itemicon.width*itemicon.scaleX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip3Text, tip1Text, [0, tip1Text.textHeight+9]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip5Text, tip3Text, [0, tip3Text.textHeight+9]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip4Text, tip5Text, [0, tip5Text.textHeight+9]);
        //鞭炮数目
        let itemicon2 = BaseBitmap.create(`crackericon1-${code}`);
        itemicon2.setScale(0.5);
        
        let numbg = BaseBitmap.create('public_9_bg15');
        numbg.scaleY = 0.7;
        view.addChildToContainer(numbg);
        view.addChildToContainer(itemicon2);
        view._numBg = numbg;

        let numTxt = ComponentManager.getTextField(`${view.vo.getCrackerNum()}`, 20);
        view.addChildToContainer(numTxt);
        view._numTxt = numTxt;

        numbg.width =  numTxt.textWidth + 40;     
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, itemicon2, view.titleBg, [105, view.titleBg.height + 139 + 7]); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, itemicon2, [17,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);

        //建筑名
        let buildbg = BaseBitmap.create(`accrackerbuild${view.vo.getCurBuildId()}-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildbg, view.titleBg, [0,view.titleBg.height+160]);
        view.addChildToContainer(buildbg);
        view._buildbg = buildbg;

        let rewardbtn = ComponentManager.getButton(`accrackerreward-${code}`,'',()=>{
            if(view._stopClick){
                return;
            }
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
            });
            
        },view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rewardbtn, view, [20,40]);
        view.addChildToContainer(rewardbtn);
        view._rewardBtn = rewardbtn;

        let detailbtn = ComponentManager.getButton(`battlegrounddetail-1`,'',()=>{
            if(view._stopClick){
                return;
            }
            //打开活动详情
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERDETAILPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
            });
            
        },view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, detailbtn, view, [20,40]);
        view.addChildToContainer(detailbtn);
        //中部鞭炮
        for(let i = 1; i <= view.cfg.firecracker; ++ i){
            let unit = view.cfg.coordinate[i - 1];
            let midIcon = BaseBitmap.create(`accracker${i}-${code}`);
            midIcon.name = `accracker${i}`;
            midIcon.x = unit.picCoord[0];
            midIcon.y = unit.picCoord[1] + view.viewBg.y - view.viewBg.anchorOffsetY;
            if(i == view.cfg.firecracker){
                midIcon.x = unit.picCoord[0];
                midIcon.y = unit.picCoord[1] + view.viewBg.y - view.viewBg.anchorOffsetY;
            }
            view.addChildToContainer(midIcon);

            let getImg = BaseBitmap.create(`accrackerget-${code}`);
            getImg.setScale(1 - (7 - i) * 0.05);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, getImg, midIcon);
            getImg.name = `accrackerget${i}`;
            view.addChildToContainer(getImg);
            getImg.visible = false;

            let nameImg = BaseBitmap.create(`accrackername${i + (view.vo.getCurBuildId() - 1) * 7}-${code}`);
            nameImg.name = `accrackername${i}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameImg, midIcon, [0,-nameImg.height-5]);
            view.addChildToContainer(nameImg);
        }

        let obj = {
			1 : [1,7],
			2 : [8,14],
			3 : [15,21]
        }
        let curJindu = view.vo.getCurJindu();
        let base = view.vo.getCurBuildId();
        for(let i = obj[base][0]; i <= obj[base][1]; ++ i){
            let getImg : any = view.container.getChildByName(`accrackerget${i % 7 == 0 ? 7 : (i % 7)}`);
            getImg.visible = view.vo.getJinduReward(i);
        }


        //两边对联
        let envelopeleftbg = BaseBitmap.create(`accrackercountbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, envelopeleftbg, view.titleBg, [6,view.titleBg.height+154+65]);
        view.addChildToContainer(envelopeleftbg);

        let enveloperightbg = BaseBitmap.create(`accrackercountbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, enveloperightbg, view.titleBg, [6,view.titleBg.height+154+65]);
        view.addChildToContainer(enveloperightbg);

        let skinImg = ComponentManager.getButton(`accrackerskinenvelope-${code}`,'', ()=>{
            //衣装展示
            if(view._stopClick){ 
                return;
            }

            ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARDAILYPACKAGEVIEW,{
                aid : view.aid,
                code : view.code,
            });
            
        }, view);
        skinImg.setScale(1);
        skinImg.name = `skinImg`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skinImg, view, [18,336]);
        view.addChildToContainer(skinImg);
        //底部说明
        let bottomIcon = ComponentManager.getButton(`accrackerbottomicon-${code}`, '', ()=>{
            if(view._stopClick){
                return;
            }
            if(!view.vo.isInActy()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            view._curCracker = view.vo.getCurJindu();
            if(view._curCracker == view.cfg.recharge.length && view.vo.getJinduReward(view._curCracker)){
                //已经全部点燃
                App.CommonUtil.showTip(LanguageManager.getlocal(`acNewYearCrackerTip7-${code}`));
                return;
            }
            //发消息
            let needNum = view.vo.getJinduNeedNum(view._curCracker) - view.vo.getCrackerNum();
            if(needNum > 0){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acNewYearCrackerTip11-${view.code}`));
            }
            else{
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,{
                    activeId : view.acTivityId,
                    rkey : view._curCracker,
                });
            }
           
        }, view, null, 3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomIcon, view, [0,50]);
        view.addChildToContainer(bottomIcon);
        view._bottomIcon = bottomIcon;

        let bottomBg = BaseBitmap.create(`public_9_bg15`);
        view._bottomBg = bottomBg;
        view.addChildToContainer(bottomBg);

        let bottomText = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._bottomText = bottomText;
        view.addChildToContainer(bottomText);

        let bottomCrackerIcon = BaseBitmap.create(`crackericon1-${code}`);
        bottomCrackerIcon.setScale(0.5);
        view._bottomCrackerIcon = bottomCrackerIcon;
        view.addChildToContainer(bottomCrackerIcon);

        let bottomText2 = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._bottomText2 = bottomText2;
        view.addChildToContainer(bottomText2);

        let bottomFireBg = BaseBitmap.create(`accrackerfire-${code}`);
        bottomFireBg.anchorOffsetX = bottomFireBg.width / 2;
        bottomFireBg.anchorOffsetY = bottomFireBg.height / 2;
        view._bottomFireBg = bottomFireBg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomFireBg, bottomIcon, [0,-bottomFireBg.height/2]);
        view.addChildToContainer(bottomFireBg);
        if(1){
            egret.Tween.get(bottomFireBg, {loop : true}).to({scaleX : 0.9, scaleY : 0.9},500).to({scaleX : 1, scaleY : 1},500);
        }

        let envelopeghuan = ComponentManager.getCustomMovieClip(`envelopeghuan${1}-`,10,50);
        envelopeghuan.blendMode = egret.BlendMode.ADD;;
        envelopeghuan.width = 104;
        envelopeghuan.height = 115;
        envelopeghuan.playWithTime(-1);
        envelopeghuan.name = 'ghuaneffect';
        view.addChildToContainer(envelopeghuan);

        

        view.update();
        view.tick();

        // egret.Tween.get(view.viewBg).wait(1000).call(()=>{
        //     view.showEnterMovie();
        // },view);
    }

    private  pos_arr = {
        1 : [-166, -118, 2, 2, 0],
        2 : [-166, -118, 2, 2, 0],
        3 : [-156, -98, 22, 22, 0],
        4 : [-146, -88, 32, 32, 0],
        5 : [-146, -88, 32, 32, -50],
        6 : [-126, -48, 62, 62, -100],
        7 : [-106, -58, 52, 52, -80],
    };

    private crackRewardCallback(evt : egret.Event):void{
        let view = this;
        if (view.vo.isStart && view.vo.checkIsInEndShowTime()){
            return;
        }
        
        if(evt && evt.data.data.ret < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(`requestLoadErrorTip`));
            return;
        }
        view._stopClick = true;

        let time = 1;
        let code = view.code;
        let idx = view._curCracker % 7 == 0 ? 7 : (view._curCracker % 7);
        let midIcon = view.container.getChildByName(`accracker${idx}`);
        let info = view.pos_arr[idx];

        let getImg : any = view.container.getChildByName(`accrackerget${view._curCracker % 7 == 0 ? 7 : (view._curCracker % 7)}`);
        getImg.visible = view.vo.getJinduReward(view._curCracker);

        SoundManager.playEffect(SoundConst.EFFECT_FIREWORK);
        // for(let i = 1; i <= view.cfg.firecracker; ++ i){
        //     let unit = view.cfg.coordinate[i - 1];
        //     let midIcon = view.container.getChildByName(`accracker${i}`);
        //     midIcon.alpha = 0;

        //     let getImg = view.container.getChildByName(`accrackerget${i}`);
        //     getImg.visible = false;

        //     let nameImg = view.container.getChildByName(`accrackername${i}`);
        //     nameImg.alpha = 0;
        // }
        //对应的烟花爆炸
        let fireeffect = ComponentManager.getCustomMovieClip(`crackerbang${1}-`,10,50);
        fireeffect.width = 309;
        fireeffect.height = 255;
        fireeffect.blendMode = egret.BlendMode.ADD;
        fireeffect.setScale(1.25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fireeffect, midIcon, [0,166]);
        fireeffect.y = midIcon.y + info[0];
        view.addChildToContainer(fireeffect);
        fireeffect.setEndCallBack(()=>{
            view.container.removeChild(fireeffect);
        },view);

        //上升特效

        //烟花
        let bang1 = ComponentManager.getCustomMovieClip(`lihuabang${1}-`,3,50);
        bang1.width = 98;
        bang1.height = 98;
        bang1.blendMode = egret.BlendMode.ADD;
        bang1.scaleX = 2;
        bang1.scaleY = 2;
        view.addChildToContainer(bang1);
        bang1.setEndCallBack(()=>{
            view.container.removeChild(bang1);
        },view);

        let bang2 = ComponentManager.getCustomMovieClip(`lihuabang${1}-`,3,50);
        bang2.width = 98;
        bang2.height = 98;
        bang2.blendMode = egret.BlendMode.ADD;
        bang2.scaleX = 2;
        bang2.scaleY = 2;
        view.addChildToContainer(bang2);
        bang2.setEndCallBack(()=>{
            view.container.removeChild(bang2);
        },view);

        let bang3 = ComponentManager.getCustomMovieClip(`lihuabang${1}-`,3,50);
        bang3.width = 98;
        bang3.height = 98;
        bang3.blendMode = egret.BlendMode.ADD;
        bang3.scaleX = 2;
        bang3.scaleY = 2;
        view.addChildToContainer(bang3);
        bang3.setEndCallBack(()=>{
            view.container.removeChild(bang3);
        },view);

        let fly1 = ComponentManager.getCustomMovieClip(`crackerfly${1}-`,14,50);
        fly1.width = 85;
        fly1.height = 312;
        fly1.blendMode = egret.BlendMode.ADD;
        fly1.scaleX = 1.25;
        fly1.scaleY = 1.11;
        fly1.rotation = -13;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, fly1, midIcon, [-50,0]);
        fly1.x = midIcon.x + info[1];
        fly1.y = midIcon.y + midIcon.height - fly1.height + info[4];
        view.addChildToContainer(fly1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bang1, fly1, [15,-bang1.height+5]);
        fly1.setEndCallBack(()=>{
            //bang1.playWithTime(time);
            view.container.removeChild(fly1);
        },view);

        let fly2 = ComponentManager.getCustomMovieClip(`crackerfly${1}-`,14,50);
        fly2.width = 85;
        fly2.height = 312;
        fly2.blendMode = egret.BlendMode.ADD;
        fly2.scaleX = 1.25;
        fly2.scaleY = 0.9;
        fly2.rotation = 7;
        fly2.x = midIcon.x + info[2];
        fly2.y = midIcon.y + midIcon.height - fly1.height + info[4];
        view.addChildToContainer(fly2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bang2, fly2, [15,-bang1.height+5]);
        fly2.setEndCallBack(()=>{
            //bang2.playWithTime(time);
            view.container.removeChild(fly2);
        },view);

        let fly3 = ComponentManager.getCustomMovieClip(`crackerfly${1}-`,14,50);
        fly3.width = 85;
        fly3.height = 312;
        fly3.blendMode = egret.BlendMode.ADD;
        fly3.scaleX = 1.25;
        fly3.scaleY = 1.27;
        fly3.rotation = 7;
        fly3.x = midIcon.x + info[3];
        fly3.y = midIcon.y + midIcon.height - fly1.height - 80 + info[4];
        view.addChildToContainer(fly3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bang3, fly3, [15,-bang1.height+5]);
        fly3.setEndCallBack(()=>{
            //bang3.playWithTime(time);
            view.container.removeChild(fly3);
        },view);
        
        //第一根与烟花爆炸一起出现
        fireeffect.playWithTime(time);
        fly1.playWithTime(time);

        egret.Tween.get(view.viewBg).wait(50).call(()=>{
            fly2.playWithTime(time);
        },view).wait(50).call(()=>{
            fly3.playWithTime(time);
        },view);

        let arr = idx < 7 ? [`lan`,`hong`,`huang`,`lan`,`hong`,`huang`,`huang`] : [`lan`,`hong`,`huang`,`lan`,`hong`,`huang`,`huang`,`lan`,`hong`,`hong`,`huang`,`lan`,`huang`,`huang`,`lan`,`huang`,`hong`,`huang`];
        let pos = [{x : -68, y : 319}, {x : 41, y : 263},{x : 18, y : 368},{x : 136, y : 332},{x : -87, y : 440},{x : -151, y : 342},{x : 73, y : 425}, {x : 90, y : 304}, {x : -7, y : 435},{x : -161, y : 456},{x : -25, y : 278},{x : -96, y : 375},{x : -218, y : 326},{x : 193, y : 419},{x : 39, y : 398},{x : 3, y : 494},{x : 132, y : 282},{x : -138, y : 268}]
        let wait = [0,0.05,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.95,0.1,0.15,0.2,0.25,0.3,0.35,0.4];
        let scale = [0.85,0.9,0.95,1.05,1.25,1.35,1.6];
        let tmp = [{x : -40, y : 30},{x : -40, y : 30},{x : -40, y : 30},{x : -40, y : 10},{x : -60, y : -110},{x : -70, y : -120},{x : 0, y : -120}]
        for(let i in arr){
            let lihua = ComponentManager.getCustomMovieClip(`lihua${arr[i]}`,10,50);
            lihua.blendMode = egret.BlendMode.ADD;
            lihua.setScale(scale[idx - 1] * 1.2);
            
            lihua.setEndCallBack(()=>{
                //bang3.playWithTime(time);
                view.removeChild(lihua);
                if(Number(i) == arr.length - 1){
                    if(view._curCracker < 8){
                        ViewController.getInstance().openView(ViewConst.BASE.ACNEWYEARCRACKERAVGVIEW,{
                            aid : view.aid,
                            code : view.code,
                            key : view._curCracker,
                            callBack : ()=>{
                                view.showReward(evt.data.data.data.rewards,evt.data.data.data.replacerewards);
                                if(view._curCracker % 7 == 0 && view._curCracker !== view.cfg.recharge.length){
                                    view.showEnterMovie();
                                }
                                else{
                                    view._stopClick = false;
                                    view.update();
                                }
                            },
                            obj : view
                        });
                    }
                    else{
                        view.showReward(evt.data.data.data.rewards,evt.data.data.data.replacerewards);
                        if(view._curCracker % 7 == 0 && view._curCracker !== view.cfg.recharge.length){
                            view.showEnterMovie();
                        }
                        else{
                            view._stopClick = false;
                            view.update();
                        }
                    }
                }
            },view);
            

            lihua.x = midIcon.x + pos[i].x + tmp[idx - 1].x;
            lihua.y = midIcon.y - pos[i].y + tmp[idx - 1].y;
            view.addChild(lihua);
            
            egret.Tween.get(lihua).wait(530 + wait[i] * 1000).call(()=>{
                lihua.playWithTime(time);
            },view);
        }

        egret.Tween.get(view.viewBg).wait(500).call(()=>{
            bang1.playWithTime(time);
        },view).wait(50).call(()=>{
            bang2.playWithTime(time);
        },view).wait(50).call(()=>{
            bang3.playWithTime(time);
        },view);

        
        // egret.Tween.get(view.viewBg).wait(450).call(()=>{
        //     bang1.playWithTime(time);
        // },view).wait(50).call(()=>{
        //     bang2.playWithTime(time);
        // },view).wait(50).call(()=>{
        //     bang3.playWithTime(time);
        // },view);
        //view.showEnterMovie();
    }

    private showReward(rewards : string,replacerewards:any):void{
        let view = this;
        let rewardList = GameData.formatRewardItem(rewards);
        let pos = new egret.Point(view._bottomIcon.x + (view._bottomIcon.width / 2), view._bottomIcon.y + (view._bottomIcon.height / 2));
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
        if (replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards, "message": "changeOtherRewardTip" });
		}
    }

    // private showEnterMovie() : void{
    //     let view = this;
    //     egret.Tween.get(view.viewBg,{onChange : ()=>{
    //         if(view.viewBg.scaleX !== 1){
    //             view.viewBg.x = (GameConfig.stageWidth - view.viewBg.width * view.viewBg.scaleX)/2;
    //             view.viewBg.y = (GameConfig.stageHeigth - view.viewBg.height * view.viewBg.scaleY)/2
    //         }
            
    //     }, onChangeObj : view}).wait(700).call(()=>{
    //         for(let i = 1; i <= view.cfg.firecracker; ++ i){
    //             let unit = view.cfg.coordinate[i - 1];
    //             let midIcon = view.container.getChildByName(`accracker${i}`);
    //             midIcon.alpha = 0;
    
    //             let getImg = view.container.getChildByName(`accrackerget${i}`);
    //             getImg.visible = false;
    
    //             let nameImg = view.container.getChildByName(`accrackername${i}`);
    //             nameImg.alpha = 0;
    //         } 
    //     },view).to({scaleX : 1.7, scaleY : 1.7}, 1000).wait(800).call(()=>{
    //         let bg : any = view.viewBg;
    //         bg.setRes( `accrackertbg${this.vo.getCurBuildId()}-` + this.code);
    //         view.viewBg.setScale(1);
    //         view.viewBg.x = 0;
    //         view.viewBg.y = 0 - (1136 - GameConfig.stageHeigth);
    //         egret.Tween.removeTweens(view.viewBg);
    //         for(let i = 1; i <= view.cfg.firecracker; ++ i){
    //             let unit = view.cfg.coordinate[i - 1];
    //             let midIcon = view.container.getChildByName(`accracker${i}`);
    //             egret.Tween.get(midIcon).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
    //                 egret.Tween.removeTweens(midIcon);
    //             },view);
    
    //             let nameImg = view.container.getChildByName(`accrackername${i}`);
    //             egret.Tween.get(nameImg).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
    //                 egret.Tween.removeTweens(nameImg);
    //                 if(i == view.cfg.firecracker){
    //                     view._stopClick = false;
    //                     view.freshAfterMove();
    //                 }
    //             },view);
    //         }
    //     },view);
    // }


    private showEnterMovie() : void{
        let view = this;
        let tmpX = view.viewBg.x;
        let tmpY = view.viewBg.y;

        let buildId = view.vo.getCurBuildId();
		let bgName:string=this.getBgName();
        let viewBg = BaseBitmap.create(`accrackertbg${buildId}-` + this.code);
        view.addChild(viewBg);
        viewBg.anchorOffsetX = viewBg.width / 2;
        viewBg.anchorOffsetY = viewBg.height / 2;
        viewBg.x = view.viewBg.x;
        viewBg.y = view.viewBg.y;
        view.setChildIndex(viewBg, view.getChildIndex(view.viewBg));
        
        // let bg : any = view.viewBg;
        // bg.setRes( `accrackertbg${this.vo.getCurBuildId()}-` + this.code);
        // view.viewBg.setScale(1);
        // view.viewBg.x = 0;
        // view.viewBg.y = 0 - (1136 - GameConfig.stageHeigth);
        // view.viewBg.alpha = 1;

        egret.Tween.get(view.viewBg).wait(700).to({alpha : 1}, 500).to({alpha : 0}, 500).call(()=>{
            view._buildbg.setRes(`accrackerbuild${view.vo.getCurBuildId()}-${view.code}`);
        },view);

        if(buildId == 2){//view.vo.getCurBuildId() == 2
            egret.Tween.get(view.viewBg).wait(700).call(()=>{
                for(let i = 1; i <= view.cfg.firecracker; ++ i){
                    let unit = view.cfg.coordinate[i - 1];
                    let midIcon = view.container.getChildByName(`accracker${i}`);
                    midIcon.alpha = 0;
        
                    let getImg = view.container.getChildByName(`accrackerget${i}`);
                    getImg.visible = false;
        
                    let nameImg = view.container.getChildByName(`accrackername${i}`);
                    nameImg.alpha = 0;
                } 
            },view).to({scaleX : 5, scaleY : 5, x : tmpX + 55, y : tmpY - 298}, 1000).wait(800).call(()=>{
                egret.Tween.removeTweens(view.viewBg);
                let bg : any = view.viewBg;
                bg.setRes( `accrackertbg${buildId}-` + this.code);
                view.viewBg.setScale(1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
                view.viewBg.alpha = 1;

                view.removeChild(viewBg);
                for(let i = 1; i <= view.cfg.firecracker; ++ i){
                    let unit = view.cfg.coordinate[i - 1];
                    let midIcon = view.container.getChildByName(`accracker${i}`);
                    egret.Tween.get(midIcon).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
                        egret.Tween.removeTweens(midIcon);
                    },view);
        
                    let nameImg : any  = view.container.getChildByName(`accrackername${i}`);
                    nameImg.setRes(`accrackername${i + (view.vo.getCurBuildId() - 1) * 7}-${view.code}`);
    
                    egret.Tween.get(nameImg).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
                        egret.Tween.removeTweens(nameImg);
                        if(i == view.cfg.firecracker){
                            view._stopClick = false;
                            view.update();
                            //view.freshAfterMove();
                        }
                    },view);
                }
            },view);
        }
        else{
            egret.Tween.get(view.viewBg).wait(700).call(()=>{
                for(let i = 1; i <= view.cfg.firecracker; ++ i){
                    let unit = view.cfg.coordinate[i - 1];
                    let midIcon = view.container.getChildByName(`accracker${i}`);
                    midIcon.alpha = 0;
        
                    let getImg = view.container.getChildByName(`accrackerget${i}`);
                    getImg.visible = false;
        
                    let nameImg = view.container.getChildByName(`accrackername${i}`);
                    nameImg.alpha = 0;
                } 
            },view).to({scaleX : 5, scaleY : 5}, 1000).wait(800).call(()=>{
                egret.Tween.removeTweens(view.viewBg);
                let bg : any = view.viewBg;
                bg.setRes( `accrackertbg${buildId}-` + this.code);
                view.viewBg.setScale(1);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
                view.viewBg.alpha = 1;

                view.removeChild(viewBg);
                for(let i = 1; i <= view.cfg.firecracker; ++ i){
                    let unit = view.cfg.coordinate[i - 1];
                    let midIcon = view.container.getChildByName(`accracker${i}`);
                    egret.Tween.get(midIcon).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
                        egret.Tween.removeTweens(midIcon);
                    },view);
        
                    let nameImg : any  = view.container.getChildByName(`accrackername${i}`);
                    nameImg.setRes(`accrackername${i + (view.vo.getCurBuildId() - 1) * 7}-${view.code}`);
                    egret.Tween.get(nameImg).wait(500 + 150 * i).to({alpha : 1}, 100).call(()=>{
                        egret.Tween.removeTweens(nameImg);
                        if(i == view.cfg.firecracker){
                            view._stopClick = false;
                            view.update();
                        }
                    },view);
                }
            },view);
        }
    }

    private freshNumText():void{
        let view = this;
        let code = view.code;
        //鞭炮数目刷新
        let numbg = view._numBg;
        let numTxt = view._numTxt;
        numTxt.text = `${view.vo.getCrackerNum()}`;
        numbg.width = numTxt.textWidth + 40;     
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numTxt, numbg);
    }

    private freshAfterMove():void{
        let view = this;
        let code = view.code;
        //建筑背景
        
        view.update();
    }


    private update():void{
        let view = this;
        let code = view.code;
        //鞭炮数目刷新
        view.freshNumText();
        //底部提示
        view.freshBottomText();
        //对联天数     
        let curDay = view.vo.getCurDay();
        for(let i = 1; i <= curDay; ++i){
            let envelope : any = view.container.getChildByName(`envelope${i}`);
            if(!envelope){
                envelope = ComponentManager.getButton(`accrackerenvelop${i}-${code}`,'', ()=>{
                    //任务进度
                    if(view._stopClick){ 
                        return;
                    }

                    ViewController.getInstance().openView(ViewConst.COMMON.ACNEWYEARDAILYPACKAGEVIEW,{
                        aid : view.aid,
                        code : view.code,
                    });
                }, view);
                envelope.setScale(1);
                envelope.name = `envelope${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, envelope, view, [view.mapPos[i].x,view.mapPos[i].y]);
                view.addChildToContainer(envelope);   
            }
            if(i == curDay){
                let ghuaneffect : any = view.container.getChildByName(`ghuaneffect`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ghuaneffect, envelope, [2,-3]);
                view.container.setChildIndex(ghuaneffect, 999999);
            }
        }
    }

    private freshBottomText():void{
        let view = this;
        let code = view.code;
        //底部提示
        let bottombg = view._bottomBg;
        let bottomText = view._bottomText;
        let bottomText2 = view._bottomText2;
        let bottomCrackerIcon = view._bottomCrackerIcon;
        let curJindu = view.vo.getCurJindu();
        bottombg.visible = bottomText.visible = true;
        bottomText2.visible = bottomCrackerIcon.visible = false;
        view._bottomFireBg.visible = false; 
        let fireeffect : any = view.container.getChildByName(`crackerfire`);

        if(curJindu == view.cfg.recharge.length && view.vo.getJinduReward(curJindu)){
            //已经全部点燃
            bottombg.visible = bottomText.visible = false;
            if(fireeffect){
                view.container.removeChild(fireeffect);
            }
        }
        else{
            let needNum = view.vo.getJinduNeedNum(curJindu) - view.vo.getCrackerNum();
            if(needNum > 0){
                //还差
                bottomText2.visible = bottomCrackerIcon.visible = true;
                bottomText.text = LanguageManager.getlocal(`acNewYearCrackerTip8-${code}`, [needNum.toString()]);
                bottomText2.text = LanguageManager.getlocal(`acNewYearCrackerTip9-${code}`);
                bottombg.width = bottomText.textWidth + 40 + bottomText2.textWidth + bottomCrackerIcon.width * bottomCrackerIcon.scaleX;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view, [0,40]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bottomText, bottombg, [20,0]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bottomCrackerIcon, bottomText, [bottomText.textWidth,0]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bottomText2, bottomCrackerIcon, [bottomCrackerIcon.width * bottomCrackerIcon.scaleX,0]);
                if(fireeffect){
                    view.container.removeChild(fireeffect);
                }
            }
            else{
                //可以点燃
                bottombg.visible = bottomText.visible = false;
                view._bottomFireBg.visible = true; 
                
                // bottomText.text = LanguageManager.getlocal(`acNewYearCrackerTip10-${code}`);
                // bottombg.width = bottomText.textWidth + 40;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view, [0,40]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottomText, bottombg);

                if(!fireeffect){
                    let fireeffect = ComponentManager.getCustomMovieClip(`crackerfire${1}-`,10,50);
                    fireeffect.blendMode = egret.BlendMode.ADD;
                    fireeffect.width = 192;
                    fireeffect.height = 206;
                    fireeffect.playWithTime(-1);
                    fireeffect.name = 'crackerfire';
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, fireeffect, view._bottomIcon, [-55,-60]);
                    view.addChildToContainer(fireeffect);
                }
            }
        }
    }

    // private showBoxEnd():void{
    //     let view = this;
    //     let info = view.cfg.map[view.vo.getCurMapId()];
    //     let data = view._rewardData;
    //     view.freshView();
        
    //     if(info.pointType == 2){
    //         ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTGETREWARDVIEW,{
    //             aid : view.aid,
    //             code : view.code,
    //             rewards : data.rewards,
    //             extra : data.wealthGodRewards,
    //             confirmCallback : ()=>{        
    //                 ViewController.getInstance().openView(ViewConst.BASE.ACTREASUREHUNTWEALTHSUCVIEW,{
    //                     aid : view.aid,
    //                     code : view.code,
    //                 });
    //             },
    //             handler : view
    //         });
    //     }
    //     else if(info.pointType == 3){
    //         view.showAvg();
    //     }
    //     else{
    //         view.showReward(data);
    //     }
    //     view._stopClick = false;
    // }

    // private showReward(data : any ):void{
    //     let view = this;
    //     ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTGETREWARDVIEW,{
    //         aid : view.aid,
    //         code : view.code,
    //         rewards : data.rewards,
    //         extra : data.wealthGodRewards,
    //     });
    // } 

    private _count = 0;
    public tick():void{
        let view = this;
        let code = view.code;
        view._cdText.text = LanguageManager.getlocal(`acNewYearCrackerTip${view.vo.isInActy() ? 4 : 5}-${view.code}`, [view.vo.getCountCd()]);
        if(view.vo.canGetJinduReward()){
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }

        //对联天数     
        let curDay = view.vo.getCurDay();
        for(let i = 1; i <= curDay; ++i){
            let envelope : any = view.container.getChildByName(`envelope${i}`);
            if(envelope){
                if(view.vo.dayRed(i)){
                    App.CommonUtil.addIconToBDOC(envelope);
                    let reddot = envelope.getChildByName(`reddot`);
                    reddot.x = 60;
                    reddot.y = 15;
                }
                else{
                    App.CommonUtil.removeIconFromBDOC(envelope);
                }
            }
        }
        let skinenvelope = <BaseButton>view.container.getChildByName(`skinImg`);
        if(skinenvelope){
            if(curDay == 7 && view.vo.bigBoxType){
                App.CommonUtil.addIconToBDOC(skinenvelope);
                let reddot = skinenvelope.getChildByName(`reddot`);
                reddot.x = 60;
                reddot.y = 15;
            }
            else{
                App.CommonUtil.removeIconFromBDOC(skinenvelope);
            }
        }
    }

    public hide():void{
        if(this._stopClick){
            return;
        }
        super.hide();
    }
    
    protected getRuleInfoParam():string[]
	{	  
        // 5-11;
        // 11 17;
        // 17-23
        // 23-5
        var str5:number =  App.DateUtil.formatSvrHourByLocalTimeZone(5).hour; 
        var str11:number =  App.DateUtil.formatSvrHourByLocalTimeZone(11).hour; 
        var str17:number =  App.DateUtil.formatSvrHourByLocalTimeZone(17).hour; 
        var str23:number =  App.DateUtil.formatSvrHourByLocalTimeZone(23).hour; ; 
		return [str5+"",str11+"",str11+"",str17+"",str17+"",str23+"",str23+"",str5+""];  
	}
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER,view.update,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD),view.crackRewardCallback,view);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREBOXPLAY),view.playBoxCallback,view);
        view._cdText = null;
        view._numBg = null;
        view._numTxt = null;
        view._buildbg = null;
        view._rewardBtn = null;
        view._bottomBg = null;
        view._bottomText = null;
        view._bottomText2 = null;
        view._bottomCrackerIcon = null;
        view._bottomIcon = null;
        view._curCracker = 1;
        view._bottomFireBg = null;
        view._stopClick = false;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        super.dispose();
    }
}