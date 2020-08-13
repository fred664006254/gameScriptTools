class ComposeLvupView extends BaseView
{
    constructor()
    {
        super();
    }

    private _personImg: BaseLoadBitmap;
    private _getNewMvPlaying: boolean = false;
    private _composeMvPlaying: boolean = false;

    protected initView():void
    {
        if (this.param.data.unlockServant && this.param.data.unlockServant == "1001") {
            // 如果是元芳，要解锁门客和经营入口
            MainUI.getInstance().setUnlockIndex(8);
        }

        SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
        Api.rookieVoApi.checkNextStep();
        let maxLv=this.getMaxLv();
        let drag:BaseLoadDragonBones;
        let titleBg:BaseBitmap;
        let lightbg:BaseLoadBitmap;
        if(App.CommonUtil.check_dragon())
        {
            drag=App.DragonBonesUtil.getLoadDragonBones("jiesuoxindengji",1,"birth");
            drag.setPosition(0,0);
            this.addChildToContainer(drag);
            // drag.setPosition(0,1150-(1136-GameConfig.stageHeigth));
            drag.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE,()=>{
                drag.playDragonMovie("idle",0);
            },this);
        }
        else
        {
            titleBg=BaseBitmap.create("composelvuptitle_text");
            this.addChildToContainer(titleBg);
            let rect=egret.Rectangle.create();
            rect.setTo(0,0,280,280);
            lightbg=BaseLoadBitmap.create("composelvuplightbg",rect);
            this.addChildToContainer(lightbg);
        }

        let scale=1;
        let persion=BaseLoadBitmap.create(Config.MapinfoCfg.getPersonResBig(maxLv-1),ComposeStatus.renBigSize);
        persion.setScale(scale);
        persion.setPosition((GameConfig.stageWidth-persion.width*persion.scaleX)*0.5,GameConfig.stageHeigth/2-persion.height*persion.scaleY);
        this.addChildToContainer(persion);
        this._personImg = persion;
        let persionPosY=persion.x;

        let persion2=BaseLoadBitmap.create(Config.MapinfoCfg.getPersonResBig(maxLv-1),ComposeStatus.renBigSize);
        persion2.setScale(scale);
        persion2.setPosition(persion.x,persion.y);
        this.addChildToContainer(persion2);


        drag&&drag.setPosition(GameConfig.stageWidth*0.5,persion.y+(persion.height*persion.scaleY)*0.5);
        lightbg&&lightbg.setPosition((GameConfig.stageWidth-lightbg.width)*0.5-25,persion.y+(persion.height-lightbg.height)*0.5+70);
        
        titleBg&&titleBg.setPosition((GameConfig.stageWidth-titleBg.width)*0.5,persion.y-titleBg.height);

        let nameBg=BaseBitmap.create("public_lockbg");
        nameBg.setPosition((GameConfig.stageWidth-nameBg.width)*0.5,persion.y-nameBg.height);
        this.addChildToContainer(nameBg);
        let nameStr=Config.PersoninfoCfg.getPersonLocalNameByLv(maxLv);
        let lvStr=Config.PersoninfoCfg.getPersonLocalLvByLv(maxLv);
        let nameTf=ComponentManager.getTextField(nameStr+"  "+lvStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTf.setPosition(nameBg.x+(nameBg.width*nameBg.scaleX-nameTf.width)*0.5,nameBg.y+(nameBg.height*nameBg.scaleY-nameTf.height)*0.5);
        this.addChildToContainer(nameTf);


        let bg=BaseBitmap.create("composelvupbg");
        bg.setPosition((GameConfig.stageWidth-bg.width)*0.5,persion.y+persion.height*persion.scaleY+50);
        this.addChildToContainer(bg);

        let lvbg=BaseBitmap.create("public_ts_bg01");
        lvbg.width=260;
        lvbg.setPosition((GameConfig.stageWidth-lvbg.width)*0.5,bg.y+42);
        this.addChildToContainer(lvbg);

        let lvtxt=ComponentManager.getTextField(LanguageManager.getlocal("unlockRewardTitle"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        lvtxt.setPosition(lvbg.x+(lvbg.width-lvtxt.width)*0.5,lvbg.y+(lvbg.height-lvtxt.height)*0.5);
        this.addChildToContainer(lvtxt);

        let closeTxt=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
        closeTxt.setPosition((GameConfig.stageWidth-closeTxt.width)*0.5,bg.y+bg.height+40);
        this.addChildToContainer(closeTxt);
        closeTxt.visible = false;


        this._composeMvPlaying = true;
        egret.Tween.get(persion).to({x:persionPosY-50*scale},250).to({x:persionPosY},100).call(()=>{
            persion&&egret.Tween.removeTweens(persion);
            persion.setload(Config.MapinfoCfg.getPersonResBig(maxLv),ComposeStatus.renBigSize);
            let effect=ComponentManager.getCustomMovieClip("compose_com",8);
            effect.setScale(1*scale);
            effect.setPosition(persion.x-63*scale,persion.y-80*scale);
            this.addChildToContainer(effect);
            effect.setEndCallBack(()=>{
                this._composeMvPlaying = false;
                closeTxt.visible = true;
                effect&&effect.dispose();
            },this);
            effect.playWithTime(1);
        },this)
        egret.Tween.get(persion2).to({x:persionPosY+50*scale},250).to({x:persionPosY},100).call(()=>{
            persion2&&persion2.dispose();
        },this)


        let cfg=Config.PersoninfoCfg.getPersonCfgByLv(maxLv);
        if(cfg)
        {
            let rewardsstr:string=cfg.firstReward;
            if(rewardsstr)
            {
                let scale=0.45;
                let rewardVoArr = GameData.formatRewardItem(rewardsstr);
                let l=rewardVoArr.length;
                let startY=lvbg.y+lvbg.height+23+(100*scale*(4-l)/2);
                for(let i:number=0;i<l;i++)
                {
                    let vo=rewardVoArr[i];
                    let icon = BaseLoadBitmap.create(vo.icon);
                    icon.setScale(scale);
                    this.addChildToContainer(icon);
                    let txt=ComponentManager.getBitmapText("+"+vo.num,TextFieldConst.FONTNAME_ITEMTIP);
                    icon.setPosition(bg.x+(bg.width-60-txt.width)*0.5,startY+(100*scale)*i);
                    txt.setPosition(icon.x+60,icon.y+(50-txt.height)/2);
                    this.addChildToContainer(txt);
                }
                let tmpRewards = this.getRewards();
                let rewardList = GameData.formatRewardItem(tmpRewards||rewardsstr);
		        App.CommonUtil.playRewardFlyAction(rewardList);
            }
        }
        this.addTouchTap(this.onTouchTap, this);
    }

    private onTouchTap() {
        if (this._composeMvPlaying) return;
        // this.onGetNewServant("1001");
        // const _lv = this.getMaxLv();
        // let _cfg = Config.PersoninfoCfg.getPersonCfgByLv(_lv);
        // if (_cfg && _cfg.unlockServent) {
        if (this.param.data.unlockServant) {
            // todo 有新解锁的门客
            this.onGetNewServant(this.param.data.unlockServant);
        } else {
            this.hide();
        }
    }

    private onGetNewServant(sid: string) {
        if (this._getNewMvPlaying) return;
        this._getNewMvPlaying = true;
        this._personImg.anchorOffsetX = this._personImg.width / 2;
        this._personImg.anchorOffsetY = this._personImg.height / 2;
        this._personImg.x += this._personImg.anchorOffsetX;
        this._personImg.y += this._personImg.anchorOffsetY;
        ServantGetView._composeLv = this.getMaxLv();
        // egret.Tween.get(this._personImg)
        // .to({scaleX: 1.3, scaleY: 1.3}, 200)
        // .to({scaleX: 0.8, scaleY: 0.8}, 600)
        // .wait(200)
        // .to({scaleX: 1.6, scaleY: 1.6}, 200)
        // .to({scaleX: 1.1, scaleY: 1.1}, 600)
        // .wait(200)
        // .to({scaleX: 4, scaleY: 4, alpha: 0.2}, 200)
        // .call(() => {
        //     // ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, [sid]);
        //     let servantCfg = GameConfig.config.servantCfg[sid];
        //     if (servantCfg.getStoryID) {
        //         // 有故事的人
        //         ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, {
        //             storyId: servantCfg.getStoryID,
        //             newServant: true,
        //             callback: (unlockServant) => {
        //                 ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
        //             },
        //             target: this,
        //             params: [sid]
        //         });
        //     } else {
        //         // 没故事的人
        //         ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, [sid]);
        //     }
        //     this.hide();
        // })

        let servantCfg = GameConfig.config.servantCfg[sid];
        if (servantCfg.getStoryID) {
            // 有故事的人
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, {
                storyId: servantCfg.getStoryID,
                newServant: true,
                callback: (unlockServant) => {
                    ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
                },
                target: this,
                params: [sid]
            });
        } else {
            // 没故事的人
            ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, [sid]);
        }
        this.hide();
    }

    private getMaxLv():number {
        return this.param?this.param.data.lv:Api.composemapVoApi.getMaxLv();
    }

    private getRewards():string {
        return this.param?this.param.data.rewards:"";
    }

    protected getResourceList():string[] {
        let resList:string[]=[
            "composelvupbg",
        ];
        if(!App.CommonUtil.check_dragon())
        {
            resList.push("composelvuptitle_text");
        }
        return super.getResourceList().concat(resList);
    }

    protected getTitleStr():string {
        return null;
    }

    protected getCloseBtnName():string {
		return null;
	}

    public dispose():void {
        this._getNewMvPlaying = false;
        this._composeMvPlaying = false;
        let lv=this.getMaxLv();
        Api.rookieVoApi.checkNextStep();
        super.dispose();
        if(lv==5)
        {//升官
            Api.rookieVoApi.curGuideKey = "levelup";
            Api.rookieVoApi.insertWaitingGuide({"idx":"levelup_1"});
            Api.rookieVoApi.checkWaitingGuide();
        }
        else if(lv==6)
        {//解锁关卡
            Api.rookieVoApi.curGuideKey = "challenge";
            Api.rookieVoApi.insertWaitingGuide({"idx":"challenge_1"});
            Api.rookieVoApi.checkWaitingGuide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL);
        } else if (Config.DinnerCfg.getNeedLv()==lv) {
            //解锁宴会
            Api.rookieVoApi.curGuideKey = "dinner";
            Api.rookieVoApi.insertWaitingGuide({"idx":"dinner_1"},true);
        }
        else if(Api.searchVoApi.getUnlockPersonLimit()==lv)
        {
            //寻访分阶段引导
            Api.rookieVoApi._waitingGuide.length=0;
            Api.rookieVoApi.curGuideKey = "search";
            Api.rookieVoApi.insertWaitingGuide({"idx":"search_1"},true);

            if(PlatformManager.isShowNewAnalytics()){
                PlatformManager.analyticsUnlockSearch()
            }
        }
    }

}