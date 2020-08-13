/*
    author : weixiaozhe
    date : 2020/5/13
    desc : 1-【英文】骑士对决
*/

class AcKnightView extends AcCommonView
{
    private _detailBtn:BaseButton;
    private _timeCountTxt : BaseTextField = null;
    private _timebg:BaseBitmap = null;
    private _icon1:BaseBitmap=null;
    private _costTxt1:BaseTextField=null;
    private _freeLab:BaseTextField=null;   
    private _icon0:BaseBitmap=null;
    private _haveTxt:BaseTextField=null;
    public _qingyuanBtn:BaseButton = null; 
    private _progress:ProgressBar=null;
    private _probg:BaseBitmap = null;
    private _qsNameTxt:BaseTextField=null;
    private _mysideidleMc:CustomMovieClip=null;  //我的站立动作
    private _mysiderunMc:CustomMovieClip=null;   //我的跑动作
    private _mysideatkMc:CustomMovieClip=null;   //我的攻击动作
    private _enemyidleMc:CustomMovieClip=null;   //敌人的站立动作
    private _enemyrunMc:CustomMovieClip=null;    //敌人的跑动作
    private _enemyatkMc:CustomMovieClip=null;    //敌人的攻击动作
    private _enemydieMc:CustomMovieClip=null;    //敌人的死亡动作
    private _mysideShadow:BaseBitmap = null;  //影子
    private _enemyShadow:BaseBitmap = null;  //影子
    private _skyBgSpeed:number=0.5;
    private _skyBg:BaseBitmap=null;
    private _skyBg2:BaseBitmap=null;
    public static IS_SHOW_PROCESS: number = 0;

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "knight_title-" + this.code;
	}
    protected getTitleStr(): string {
        return null;
    }
    protected getRuleInfo():string{
		return "acKnightRuleInfo-" + this.code;
    } 

    private get cfg() : Config.AcCfg.KnightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcKnightVo{
        return <AcKnightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected initBg():void
    {
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName : string = this.getBgName();
		if(bgName)
        {
			this.viewBg = BaseBitmap.create(bgName);
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
        this._skyBg = BaseBitmap.create("acthreekingdomsrecharge_skybg-1");
        this._skyBg.x = 0;
        this._skyBg.y = 0;
        this.addChild(this._skyBg);
        this._skyBg2 = BaseBitmap.create("acthreekingdomsrecharge_skybg-1");
        this._skyBg2.x = this._skyBg.x + this._skyBg.width;
        this._skyBg2.y = 0;
        this.addChild(this._skyBg2);        
    }

    public get code():string
    {
        return "1";
    }

    private enterHandel():void
    {
        this._skyBg.x -= this._skyBgSpeed;
        this._skyBg2.x -= this._skyBgSpeed;
        if(this._skyBg.x <= -this._skyBg.width)
        {
            this._skyBg.x = this._skyBg2.x + this._skyBg2.width;
        }
        if(this._skyBg2.x <= -this._skyBg2.width)
        {
            this._skyBg2.x = this._skyBg.x + this._skyBg.width;
        }        
    }

    public initView()
    {
        let code = this.code;
        this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkQingyuanRed,this);

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KNIGHT_ATTACK, this.attackCallback, this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterHandel,this);

        let bg = BaseBitmap.create("acthreekingdomsrecharge_bg-1");
        bg.x = GameConfig.stageWidth/2 - bg.width/2;
        bg.y = GameConfig.stageHeigth - bg.height;
        this.addChild(bg);

        //top背景图
        let topbg = BaseBitmap.create(`acknight_topbg-${code}`);
        topbg.y = this.titleBg.y + this.titleBg.height-5;
        this.addChildAt(topbg,this.getChildIndex(this.container));

        //活动时间   
        let timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 20, TextFieldConst.COLOR_WHITE);
        timeTxt.x = topbg.x + 200;
        timeTxt.y = topbg.y + 25;
        this.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acKnightTips-${code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.x = timeTxt.x;
        tipTxt.y = timeTxt.y + timeTxt.height + 15;
        tipTxt.width = GameConfig.stageWidth - tipTxt.x - 5;
        tipTxt.lineSpacing = 5;
        this.addChild(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.width = 260;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom,timebg,topbg,[10,-timebg.height/2]);
        this._timebg = timebg;

        let timeCountTxt = ComponentManager.getTextField(this.vo.getAcCountDown(), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,timeCountTxt,timebg,[0,0]);
        this.addChild(timeCountTxt);
        this._timeCountTxt = timeCountTxt;

        this.showPreEffect(topbg.y + topbg.height);

        //进度条
        let progress = ComponentManager.getProgressBar("progress8", "progress3_bg", 450);
        progress.x = GameConfig.stageWidth/2 - progress.width/2 + 25;
        progress.y = topbg.y + topbg.height + 40;
        this.addChild(progress);
        this._progress = progress;

        let probg = BaseBitmap.create(`knight_headicon-${code}`);
        probg.touchEnabled = true;
        probg.addTouchTap(()=>
        {
            AcKnightView.IS_SHOW_PROCESS = 1;
            ViewController.getInstance().openView(ViewConst.POPUP.ACKNIGHTREWARDPOPVIEWTAB2,{aid:this.aid, code:this.code});
        },this);
        this.setLayoutPosition(LayoutConst.leftverticalCenter,probg,progress,[10-probg.width,0]);
        this.addChild(probg); 
        this._probg = probg;       

        let nameBg = BaseBitmap.create("acthreekingdomsrecharge_guanqianamebg-1");
        nameBg.x = GameConfig.stageWidth/2 - nameBg.width/2;
        nameBg.y = progress.y + progress.height + 15;
        this.addChild(nameBg);

        this._qsNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acKnightName_1-${code}`), 24,TextFieldConst.COLOR_WARN_YELLOW);
        this._qsNameTxt.setPosition(GameConfig.stageWidth/2-this._qsNameTxt.width/2, nameBg.y+nameBg.height/2-this._qsNameTxt.height/2);
        this.addChild(this._qsNameTxt);

        let botbg = BaseBitmap.create(`acknight_botbg-${code}`);
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);

        let iconscale = 1;
        let icon0 = BaseBitmap.create(`knighticonsmall-${code}`);
        icon0.setScale(iconscale);
        icon0.x = GameConfig.stageWidth/2 - icon0.width*icon0.scaleX/2 - 15;
        icon0.y = botbg.y;
        this.addChild(icon0);
        this._icon0 = icon0;
        let haveTxt = ComponentManager.getTextField("X"+String(this.vo.getProcess()), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        haveTxt.x = icon0.x + icon0.width*icon0.scaleX + 2;
        haveTxt.y = icon0.y + icon0.height*icon0.scaleY/2 - haveTxt.height/2;
        this.addChild(haveTxt);
        this._haveTxt = haveTxt;

        // 前进按钮
        let knightBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acKnight_btn1", this.knightBtnHandle1, this);
        this.addChild(knightBtn1);
        this.setLayoutPosition(LayoutConst.leftbottom,knightBtn1,botbg,[50,25]);
        let knightBtn10 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acKnight_btn10", this.knightBtnHandle10, this);
        this.addChild(knightBtn10);
        this.setLayoutPosition(LayoutConst.rightbottom,knightBtn10,botbg,[50,25]);

        let icon1 = BaseBitmap.create(`knighticonsmall-${code}`);
        icon1.setScale(iconscale);
        icon1.x = knightBtn1.x + knightBtn1.width/2 - icon1.width*icon1.scaleX + 5;
		icon1.y = knightBtn1.y - icon1.height*icon1.scaleY + 10;
		this.addChild(icon1);
        let costTxt1 = ComponentManager.getTextField("X"+String(this.cfg.cost1), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt1.x = icon1.x + icon1.width*icon1.scaleX;
        costTxt1.y = icon1.y + icon1.height*icon1.scaleY/2 - costTxt1.height/2 + 2;
        this.addChild(costTxt1);
        let freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acChess_free"), 24,TextFieldConst.COLOR_LIGHT_YELLOW);
        freeLab.x = knightBtn1.x + knightBtn1.width/2 - freeLab.width/2;
        freeLab.y = knightBtn1.y - freeLab.height - 5;
        this.addChild(freeLab);

        let icon10 = BaseBitmap.create(`knighticonsmall-${code}`);
        icon10.setScale(iconscale);
        icon10.x = knightBtn10.x + knightBtn10.width/2 - icon10.width*icon10.scaleX;
		icon10.y = icon1.y;
		this.addChild(icon10);
        let costTxt10 = ComponentManager.getTextField("X"+String(this.cfg.cost10), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
        costTxt10.x = icon10.x + icon10.width*icon10.scaleX;
        costTxt10.y = costTxt1.y;
        this.addChild(costTxt10);

        this._icon1 = icon1;
        this._costTxt1 = costTxt1;
        this._freeLab = freeLab;

        if(this.code == "1")
        {
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) 
            {
                this._qingyuanBtn = ComponentManager.getButton("destroyshopbtn-3", "", () => 
                {
                    if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv())
                    {
                        ViewController.getInstance().openViewByFunName("qingyuan");
                    }else
                    {
                        App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                    }
                }, this);
                this._qingyuanBtn.setPosition(15, botbg.y - this._qingyuanBtn.height - 20);
                this.addChild(this._qingyuanBtn);
                this.checkQingyuanRed();
            }
        }        
        //活动详情
        let detailBtnBg = ResourceManager.hasRes("knightbtn-"+this.code) ? "knightbtn-"+this.code : "knightbtn-1";
        let detailBtn = ComponentManager.getButton(detailBtnBg, "", ()=>
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACKNIGHTREWARDPOPVIEW, {aid:this.aid, code:this.code});
        }, this,null,);
        if(this._qingyuanBtn)
        {
            detailBtn.setPosition(15, this._qingyuanBtn.y - detailBtn.height - 20);
        }else
        {
            detailBtn.setPosition(15, botbg.y - detailBtn.height - 20);
        }
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;

        // let middle = this._qsNameTxt.y + (detailBtn.y - this._qsNameTxt.y)/2;
        // this._mcPosY = middle - 95;
        // this._mcPosY2 = this._mcPosY - 70;

        this._mcPosY = detailBtn.y - 250;
        this._mcPosY2 = this._mcPosY - 70;

        this.effectIdle();
        this.freshView();
    }

    private freshView():void
    {
        if(this._isShowEffect)
        {
            return;
        }
        let code = this.code

        let obj:any = this.vo.getAttackProcess();
        let id = obj.id;
        let cur = obj.cur;
        let max = obj.max;
        this._lastId = id;

        this._qsNameTxt.text = LanguageManager.getlocal(`acKnightName_`+id+`-${code}`);
        this._qsNameTxt.x = GameConfig.stageWidth/2 - this._qsNameTxt.width/2;
        if(cur >= 0)
        {
            this._progress.setPercentage((max-cur)/max,Math.floor((max-cur)/max*100)+"%");
        }else
        {
            this._progress.visible = false;
            this._probg.visible = false;
        }
        this.freshFreeLab();
        this.freshRed();
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_CHESS_PLAY)
        {          
        }
    }
    private attackCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            this._tempRewards = rData.rewards;

            let obj:any = this.vo.getAttackProcess();
            if(obj.cur >= 0)
            {
                this.effectAtk(obj.id > this._lastId);
            }else
            {
                this.effectAtk();
            }
        }
    }
    private effectIdle():void
    {
        let code = this.code;
        if(!this._mysideShadow)
        {
            this._mysideShadow = BaseBitmap.create(`acknight_shadow-${code}`);
            this.addChild(this._mysideShadow);
        }
        if(!this._enemyShadow)
        {
            this._enemyShadow = BaseBitmap.create(`acknight_shadow-${code}`);
            this.addChild(this._enemyShadow);
        }        
        if(!this._mysideidleMc)
        {
            this._mysideidleMc = ComponentManager.getCustomMovieClip("mysideidle_", 7, 100);
            this._mysideidleMc.setPosition(this._mysidePosxArr[0],this._mcPosY);
            this._mysideidleMc.playWithTime(0);
            this.addChild(this._mysideidleMc);
        }
        if(!this._enemyidleMc)
        {
            this._enemyidleMc = ComponentManager.getCustomMovieClip("enemyidle_", 7, 100);
            this._enemyidleMc.setPosition(this._enemyPosxArr[0],this._mcPosY2);
            this._enemyidleMc.playWithTime(0);
            this.addChild(this._enemyidleMc);
        }
        this._mysideShadow.x = this._mysideidleMc.x + this._shadowForMyside[0];
        this._mysideShadow.y = this._mysideidleMc.y + this._shadowForMyside[1];
        this._enemyShadow.x = this._enemyidleMc.x + this._shadowForEnemy[0];
        this._enemyShadow.y = this._enemyidleMc.y + this._shadowForEnemy[1];     
    }

    private _tempRewards:string;
    private _lastId:number;
    private _mcPosY:number = 430;
    private _mcPosY2:number = 360;
    private _mysidePosxArr = [-100,30,300];
    private _enemyPosxArr = [270,140,-130];
    private _shadowForMyside = [110,170];
    private _shadowForEnemy = [150,240];
    private _runTime:number = 2000;
    private _isDie:boolean=false;
    private _isShowEffect:boolean=false;
    private effectAtk(isDie:boolean=false):void
    {     
        this._isDie = isDie;
        if(!this._mysiderunMc)
        {
            this._mysiderunMc = ComponentManager.getCustomMovieClip("mysiderun_", 5, 100);
            this._mysiderunMc.setPosition(this._mysidePosxArr[0],this._mcPosY);
            this.addChild(this._mysiderunMc);
            this._mysiderunMc.playWithTime(0);  
            this._mysiderunMc.visible = false;   
        }
        if(!this._enemyrunMc)
        {
            this._enemyrunMc = ComponentManager.getCustomMovieClip("enemyrun_", 5, 100);
            this._enemyrunMc.setPosition(this._enemyPosxArr[0],this._mcPosY2);
            this.addChild(this._enemyrunMc);   
            this._enemyrunMc.playWithTime(0);
            this._enemyrunMc.visible = false;
        }
        if(!this._mysideatkMc)
        {
            this._mysideatkMc = ComponentManager.getCustomMovieClip("mysideatk_", 9, 100);
            this._mysideatkMc.setPosition(this._mysidePosxArr[1],this._mcPosY);
            this.addChild(this._mysideatkMc);  
            this._mysideatkMc.stop();   
            this._mysideatkMc.visible =false;
        }
        if(!this._enemyatkMc)
        {
            this._enemyatkMc = ComponentManager.getCustomMovieClip("enemyatk_", 9, 100);
            this._enemyatkMc.setPosition(this._enemyPosxArr[1],this._mcPosY2);
            this.addChild(this._enemyatkMc);
            this._enemyatkMc.stop();
            this._enemyatkMc.visible = false;
        }
        if(!this._enemydieMc)
        {
            this._enemydieMc = ComponentManager.getCustomMovieClip("enemydie_", 10, 100);
            this._enemydieMc.setPosition(this._enemyPosxArr[1],this._mcPosY2);
            this.addChild(this._enemydieMc);
            this._enemydieMc.stop();
            this._enemydieMc.visible = false;
        }

        this._mysideidleMc.visible = false;
        this._enemyidleMc.visible = false;
        this._mysiderunMc.visible = true;
        this._enemyrunMc.visible = true;
        //我跑到中间   敌人也跑到中间
        egret.Tween.get(this._mysiderunMc).to({x:this._mysidePosxArr[1]},this._runTime).call(()=>
        {
            egret.Tween.removeTweens(this._mysiderunMc);
            this._mysiderunMc.visible = false;
            this._mysideatkMc.visible = true;
            this._mysideatkMc.playWithTime(1);    //我攻击
            this._mysideatkMc.setEndCallBack(()=>
            {
                //敌人不死就继续跑到对面
                if(!this._isDie)
                {
                    this._mysideatkMc.visible = false;
                    this._mysiderunMc.visible = true;
                    egret.Tween.get(this._mysiderunMc).to({x:this._mysidePosxArr[2]},this._runTime).call(()=>
                    {
                        egret.Tween.removeTweens(this._mysiderunMc);
                    },this);
                    egret.Tween.get(this._mysideShadow).to({x:this._mysidePosxArr[2]+this._shadowForMyside[0]},this._runTime).call(()=>
                    {
                        egret.Tween.removeTweens(this._mysideShadow);
                    },this);                    
                }
            },this);
        },this);
        egret.Tween.get(this._mysideShadow).to({x:this._mysidePosxArr[1]+this._shadowForMyside[0]},this._runTime).call(()=>
        {
            egret.Tween.removeTweens(this._mysideShadow);
        },this);
        egret.Tween.get(this._enemyrunMc).to({x:this._enemyPosxArr[1]},this._runTime).call(()=>
        {
            egret.Tween.removeTweens(this._enemyrunMc);
            this._enemyrunMc.visible = false;
            this._enemyatkMc.visible = true;
            this._enemyatkMc.playWithTime(1);     //敌人攻击
            this._enemyatkMc.setEndCallBack(()=>
            {
                if(this._isDie)   //敌人死了就播死亡动作
                {
                    this._enemyatkMc.visible = false;
                    this._enemydieMc.visible = true;
                    this._enemydieMc.playWithTime(1);
                    this._enemydieMc.setEndCallBack(()=>
                    {
                        this._enemydieMc.stop();
                        this._enemydieMc.setStopFrame(0);
                        this.resetMyEnemyEffect();    //重置
                    },1);
                }else
                {
                    //敌人没死也就跑到对面去
                    this._enemyatkMc.visible = false;
                    this._enemyrunMc.visible = true;
                    egret.Tween.get(this._enemyrunMc).to({x:this._enemyPosxArr[2]},this._runTime).call(()=>
                    {
                        egret.Tween.removeTweens(this._enemyrunMc);
                        this.resetMyEnemyEffect();
                    },this);
                    egret.Tween.get(this._enemyShadow).to({x:this._enemyPosxArr[2]+this._shadowForEnemy[0]},this._runTime).call(()=>
                    {
                        egret.Tween.removeTweens(this._enemyShadow);
                    },this);                    
                }
            },this);
        },this);  
        egret.Tween.get(this._enemyShadow).to({x:this._enemyPosxArr[1]+this._shadowForEnemy[0]},this._runTime).call(()=>
        {
            egret.Tween.removeTweens(this._enemyShadow);
        },this);                
    }
    private resetMyEnemyEffect():void
    {
        this._isShowEffect = false;
        this.closeOpenTach(true);

        if(this._tempRewards)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempRewards,"isPlayAni":true, "callback":null, "handler":null});            
            // let rewardVoList = GameData.formatRewardItem(this._tempRewards);
            // App.CommonUtil.playRewardFlyAction(rewardVoList);
        }

        this._mysideidleMc.visible = true;
        this._mysiderunMc.visible = false;
        this._mysideatkMc.visible = false;
        this._enemyidleMc.visible = true;
        this._enemyrunMc.visible = false;
        this._enemyatkMc.visible = false;
        this._enemydieMc.visible = false;
        this._mysiderunMc.x = this._mysidePosxArr[0];
        this._enemyrunMc.x = this._enemyPosxArr[0];
        this._mysideShadow.x = this._mysidePosxArr[0] + this._shadowForMyside[0];
        this._enemyShadow.x = this._enemyPosxArr[0] + this._shadowForEnemy[0];

        this.freshView();
    }

    private knightBtnHandle1():void
    {
        // if(1)
        // {
        //     this.effectAtk();
        //     return;
        // }
        this.knightBtnHandle(1);
    }
    private knightBtnHandle10():void
    {
        // if(1)
        // {
        //     this.effectAtk(true);
        //     return;
        // }        
        this.knightBtnHandle(2);
    }
    private knightBtnHandle(type:number):void
    {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        if(this._isShowEffect)
        {
            return;
        }
        let cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if(type == 1 && this.vo.isfree > 0)
        {
            cost = 0;
        }
        let have = this.vo.getProcess();
        if(have < cost)
        {
            let code = this.code;
            let message: string = LanguageManager.getlocal(`acKnightipDesc-${code}`);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACKNIGHTREWARDPOPVIEW,{aid:this.aid, code:this.code});
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }
        this._isShowEffect = true;
        this.closeOpenTach(false);
        this.request(NetRequestConst.REQUEST_KNIGHT_ATTACK, 
        {
            activeId: this.vo.aidAndCode,
            // isFree:(this.vo.isfree > 0 && type == 1) ? 1 : 0,
            isBatch:type == 1 ? 0 : 1
        });        
    }

    private closeOpenTach(b:boolean):void
    {
        this.touchChildren = b;
        this.touchEnabled = true;
        this._maskBmp.visible = true;
        this._maskBmp.touchEnabled = true;
    }
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	{
        let key = `${this.acTivityId}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}-${App.DateUtil.getWeeTs(GameData.serverTime)}`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, `1`);
            return {title:{key:this.getCnByCode("acKnightReportTitle", this.code)},msg:{key:this.getCnByCode("acKnightReportMsg", this.code)}};
        }
        else{
            return null;
        }
	}    
    private freshFreeLab():void
    {
        if(this.vo.isfree > 0)
        {
            this._freeLab.visible = true;
            this._icon1.visible = false;
            this._costTxt1.visible = false;
        }else
        {
            this._freeLab.visible = false;
            this._icon1.visible = true;
            this._costTxt1.visible = true;            
        }

        let num = this.vo.getProcess();
        this._haveTxt.text = "X" + String(num);
        if(num < 10)
        {
            this._icon0.x = GameConfig.stageWidth/2 - this._icon0.width*this._icon0.scaleX/2 - 15;
            this._haveTxt.x = this._icon0.x + this._icon0.width*this._icon0.scaleX + 2;
        }else
        {
            this._icon0.x = GameConfig.stageWidth/2 - this._icon0.width*this._icon0.scaleX/2 - 20;
            this._haveTxt.x = this._icon0.x + this._icon0.width*this._icon0.scaleX + 2;
        }
    }
    private freshRed() 
    {
        if (this.vo.isShowRechargeDot() || this.vo.isShowAchieveDot())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed)
            {
                detailRed.setPosition(70, 0);
            }
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
    }    
    public checkQingyuanRed():void
    {
        if (this.code == "1")
        {
            if (this._qingyuanBtn)
            {
                if (this.vo.isShowQingyuanRedDot())
                {
                    App.CommonUtil.addIconToBDOC(this._qingyuanBtn);
                    let red = <BaseBitmap>this._qingyuanBtn.getChildByName("reddot");
                    if (red)
                    {
                        red.setPosition(70, 0);
                    }    
                }
                else
                {
                    App.CommonUtil.removeIconFromBDOC(this._qingyuanBtn);
                }
            }
        }
    }    
    private tick() 
    {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width/2 - this._timeCountTxt.width/2;
    }
    private showPreEffect(y:number):void
    {
        let baseCon = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        baseCon.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        // skinTxtEffect.addTouchTap(() => 
        // {
        //     ViewController.getInstance().openView(ViewConst.POPUP.ACKNIGHTREWARDPOPVIEWTAB4,{aid:this.aid, code:this.code});
        // }, this);

        let skinTxt1 = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt1.setPosition(skinTxtEffect.x+skinTxtEffect.width/2-skinTxt1.width/2+105, skinTxtEffect.y+skinTxtEffect.height/2-skinTxt1.height/2+75);
        baseCon.addChild(skinTxt1);
        egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

        let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.setPosition(skinTxt1.x,skinTxt1.y);
        baseCon.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxteffect.touchEnabled = true;
        skinTxteffect.addTouchTap(() => 
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACKNIGHTREWARDPOPVIEWTAB4,{aid:this.aid, code:this.code});
        }, this);

        this.addChild(baseCon);
        baseCon.setPosition(-10,y-100);
    }
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }    
    private getDefaultResList(resArr: string[]): string[] 
    {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    protected getResourceList():string[]
    {
        let codeRes = this.getDefaultResList([
            "acknight_botbg",
            "acknight_topbg",
            "knight_headicon",
            "knight_title",
            "knightbtn",
            "acknight_specialitem",
            "knighticonsmall",
            "acknight_shadow"
        ]);
        let eff1 = this.effectRes("enemyatk_",9);
        let eff2 = this.effectRes("enemydie_",10);
        let eff3 = this.effectRes("enemyidle_",7);
        let eff4 = this.effectRes("enemyrun_",5);
        let eff5 = this.effectRes("mysideatk_",9);
        let eff6 = this.effectRes("mysideidle_",7);
        let eff7 = this.effectRes("mysiderun_",5);
        let arr = ["acsearchproofview_common_skintxt","progress8","progress3_bg",
        "acthreekingdomsrecharge_bg-1","acthreekingdomsrecharge_skybg-1","destroyshopbtn-3",
        "acthreekingdomsrecharge_guanqianamebg-1","achunting_bear_black-1"];
        let baseList = arr.concat(eff1).concat(eff2).concat(eff3).concat(eff4).concat(eff5).concat(eff6).concat(eff7);    
        return super.getResourceList().concat(baseList).concat(codeRes);
    }
    private effectRes(name:string,num:number):string[]
    {
        let arr = [];
        for(let i = 1; i <= num; i++)
        {
            arr.push(name+String(i));
        }
        return arr;
    }    
    public dispose():void
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL,this.checkQingyuanRed,this);

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KNIGHT_ATTACK, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._haveTxt = null;
        this._icon0 = null;
        this._icon1 = null;
        this._freeLab = null;
        this._maskBmp = null;
        this._progress = null;
        this._qingyuanBtn = null;
        this._qsNameTxt = null;
        this._mysideShadow = null;
        this._enemyShadow = null;
        if(this._mysideidleMc)
        {
            this._mysideidleMc.dispose();
            this._mysideidleMc = null;
        }
        if(this._mysiderunMc)
        {
            egret.Tween.removeTweens(this._mysiderunMc);
            this._mysiderunMc.dispose();
            this._mysiderunMc = null;
        }
        if(this._mysideatkMc)
        {
            this._mysideatkMc.dispose();
            this._mysideatkMc = null;
        }
        if(this._enemyidleMc)
        {
            this._enemyidleMc.dispose();
            this._enemyidleMc = null;
        }
        if(this._enemyrunMc)
        {
            egret.Tween.removeTweens(this._enemyrunMc);
            this._enemyrunMc.dispose();
            this._enemyrunMc = null;
        }
        if(this._enemyatkMc)
        {
            this._enemyatkMc.dispose();
            this._enemyatkMc = null;
        }
        if(this._enemydieMc)
        {
            this._enemydieMc.dispose();
            this._enemydieMc = null;
        }          
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterHandel,this);                                     
        super.dispose();
    }
}