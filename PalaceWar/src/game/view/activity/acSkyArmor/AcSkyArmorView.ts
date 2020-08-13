/*
    author : wxz
    date : 2020/6/22
    desc : 天魔铠甲--吕布衣装
*/
class AcSkyArmorView extends AcCommonView
{
    private _detailBtn:BaseButton = null;
    private _timeCountTxt : BaseTextField = null;
    private _timebg:BaseBitmap = null;
    private _freeBtn:BaseButton = null;
    private _jinglianBtn1:BaseButton = null;

    private _isMove = false;

    private _infobg:BaseBitmap=null;
    private _proNumBg:BaseBitmap=null;
    private _proNumTxt:BaseTextField=null;
    private _imgsArr:BaseBitmap[] = null;
    private _scrollView:ScrollView = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _qiaojiEffect:BaseLoadDragonBones=null;
    private _payTxt:BaseTextField=null;
    private _haveTxt:BaseTextField=null;
    private _exchangeNumTxt:BaseTextField=null;
    private _kaijiaImg:BaseBitmap=null;

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "acskyarmor_title-" + this.typeCode;
	}
    protected getTitleStr(): string {
        return null;
    }
	protected getBgName():string
	{
		return "acskyarmor_bg-"+this.typeCode;
	}    
    protected getRuleInfo():string{
		return "acSkyArmorRuleInfo-" + this.typeCode;
    } 
    protected getRuleInfoParam():string[]{
        return [""+this.cfg.needGem,this.cfg.change.needItem.split("_")[2]];
    }
    private get cfg() : Config.AcCfg.SkyArmorCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSkyArmorVo{
        return <AcSkyArmorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{``
        return `${this.aid}-${this.code}`;
	}
    private get typeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }

    private clickImg(e:egret.TouchEvent):void
    {
        if(!this.vo.isStart)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        let name = (e.currentTarget).name;
        let id = parseInt(name.split("_")[1]);
        ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB2,{id:id,aid:this.aid, code:this.code});
    }

    public initView()
    {
        let code = this.code;
        let typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, this.attackCallback, this);

        let infoBg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        infoBg.width = GameConfig.stageWidth;
        infoBg.height = 130;
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height);
        this.addChildToContainer(infoBg);
        this._infobg = infoBg;

        let numbg = BaseBitmap.create(`acskyarmor_zhu1`);
        numbg.x = 25;
        numbg.y = infoBg.y+infoBg.height;
        this.addChild(numbg);
        numbg.touchEnabled = true;
        numbg.addTouchTap(()=>
        {
            if(this.vo.isStart)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB2,{aid:this.aid, code:this.code});
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            }
        },this);

        let numbg2 = BaseBitmap.create(`acskyarmornumbg`);
        numbg2.width = numbg.width+30;
        numbg2.height = 24;
        numbg2.x = numbg.x + numbg.width/2 - numbg2.width/2;
        numbg2.y = numbg.y+numbg.height - numbg2.height/2-15;
        this.addChild(numbg2);
        this._proNumBg = numbg2;

        let proNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acskyarmor_pronumtxt`,["0"]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        proNumTxt.width = 200;
        proNumTxt.textAlign = egret.HorizontalAlign.CENTER;
        proNumTxt.x = numbg2.x + numbg2.width/2 - proNumTxt.width/2;
        proNumTxt.y = numbg2.y + numbg2.height/2 - proNumTxt.height/2;
        this.addChild(proNumTxt);
        this._proNumTxt = proNumTxt;
        let countX = 0;
        this._imgsArr = [];
        this._proContainer = new BaseDisplayObjectContainer();
        this._proContainer.height = 160;

        let str:string = this.cfg.change.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.x = 5;
        itemicon.y = numbg2.y+numbg2.height + 5;
        this.addChild(itemicon);

        let exchangebg = BaseBitmap.create(`acskyarmornumbg`);
        exchangebg.width = 210;
        exchangebg.height = 32;
        exchangebg.x = itemicon.x + itemicon.width - 15;
        exchangebg.y = itemicon.y+itemicon.height/2 - exchangebg.height/2;
        this.addChild(exchangebg);

        let exchangeNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSkyArmorExchangeNumTxt`,["0","0"]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        exchangeNumTxt.x = itemicon.x + itemicon.width + 5;
        exchangeNumTxt.y = itemicon.y+itemicon.height/2 - exchangeNumTxt.height/2;
        this.addChild(exchangeNumTxt);
        this._exchangeNumTxt = exchangeNumTxt;

        let datas = this.vo.getSortAchievementCfg(false);
        let count = 0;
        for(let i = 0; i < datas.length; i++)
        {
            let img:BaseBitmap = BaseBitmap.create(`acskyarmor_zhu2`);
            img.x = 30+i*85;
            this._proContainer.addChild(img);
            img.touchEnabled = true;
            img.name = "img_"+datas[i].id;
            img.addTouchTap(this.clickImg,this);
            this._imgsArr.push(img);

            let num = datas[i].needNum;
            let txt = ComponentManager.getTextField(String(num), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = img.x+img.width/2 - txt.width/2;
            txt.y = img.y+img.height - 5;
            this._proContainer.addChild(txt);
        }
        this._proContainer.width = this._proContainer.width+30;
        let scrollView = ComponentManager.getScrollView(this._proContainer, new egret.Rectangle(0,0,GameConfig.stageWidth-(numbg.x+numbg.width + 15), this._proContainer.height));
        scrollView.setPosition(numbg.x+numbg.width + 15, numbg.y);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChild(scrollView);

        let curId = this.freshProImags();

        this._scrollView.scrollLeft =this._proContainer.width - this._scrollView.width;
        if(curId < 7)
        {
            this._isMove = true;
			egret.Tween.get(this._scrollView).wait(300).to({scrollLeft : 0}, 500).call(()=>{
				egret.Tween.removeTweens(this._scrollView);
                this._isMove = false;
			}, this);           
        }

        //活动时间   
        let timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour(), 18, TextFieldConst.COLOR_WHITE);
        timeTxt.x = this._infobg.x + 15;
        timeTxt.y = this._infobg.y + 8;
        this.addChild(timeTxt);

        let needNum = this.vo.getWifeNeed();
        let infoTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSkyArmorInfo-${typecode}`,[String(this.cfg.needGem),String(needNum)]), 18, TextFieldConst.COLOR_WHITE);
        infoTxt.x = timeTxt.x;
        infoTxt.y = timeTxt.y + timeTxt.height + 6;
        infoTxt.lineSpacing = 4;
        infoTxt.width = 600;
        this.addChild(infoTxt);

        let paynum = this.cfg.needGem - (this.vo.buyGem%this.cfg.needGem);
        let payTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSkyArmorPayDesc`,[String(paynum)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        payTxt.x = timeTxt.x;
        payTxt.y = infoTxt.y + infoTxt.height +10;
        this.addChild(payTxt);
        this._payTxt = payTxt;

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.width = 260;
        this.addChild(timebg);
        this.setLayoutPosition(LayoutConst.rightbottom,timebg,this._infobg,[10,-timebg.height/2]);
        this._timebg = timebg;

        let timeCountTxt = ComponentManager.getTextField(this.vo.getAcCountDown(), 18,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,timeCountTxt,timebg,[0,0]);
        this.addChild(timeCountTxt);
        this._timeCountTxt = timeCountTxt;

        let botbg = BaseBitmap.create(`acskyarmor_bot-${typecode}`);
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height;

        ViewController.getInstance().openView(ViewConst.COMMON.ACSKYARMORSTORYVIEW, {aid: this.aid, code: this.code});

        this.showPreEffect(botbg.y,()=>
        {
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(60, botbg.y - 100);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);

            let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChild(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(() => {
                    if(this.vo.isStart)
                    {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEWTAB4, {aid: this.aid, code: this.code});
                    }else
                    {
                        App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                    }
            }, this);

            this.addChild(botbg);

            let detailBtn = ComponentManager.getButton(`skyarmorbtn-${typecode}`, "", ()=>
            {
                if(this.vo.isStart)
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSKYARMORREWARDPOPVIEW, {aid:this.aid, code:this.code});
                }else
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                }
            }, this,null,);
            detailBtn.setPosition(botbg.x+botbg.width/2-detailBtn.width/2, botbg.y-detailBtn.height+30);
            this.addChild(detailBtn);
            this._detailBtn = detailBtn;

            // 精炼按钮
            let jinglianBtn1 = ComponentManager.getButton("acskyarmorbtn1","", this.jinglianBtnHandle1, this);
            this.addChild(jinglianBtn1);
            this.setLayoutPosition(LayoutConst.leftbottom,jinglianBtn1,botbg,[45,10]);
            let jinglianBtn10 = ComponentManager.getButton("acskyarmorbtn10","",this.jinglianBtnHandle10, this);
            this.addChild(jinglianBtn10);
            this.setLayoutPosition(LayoutConst.rightbottom,jinglianBtn10,botbg,[45,10]);
            this._jinglianBtn1 = jinglianBtn1;

            this._freeBtn = ComponentManager.getButton("acskyarmorbtnfree","", this.jinglianBtnHandle1, this);
            this._freeBtn.x = jinglianBtn1.x;
            this._freeBtn.y = jinglianBtn1.y;
            this.addChild(this._freeBtn);

            let kaijia = BaseBitmap.create("acskyarmor_kaijia");
            kaijia.x = GameConfig.stageWidth/2 - kaijia.width/2;
            kaijia.y = infoBg.y + infoBg.height + 220 - (1136-GameConfig.stageHeigth)/2;
            this.addChild(kaijia);
            let posy = kaijia.y;
            egret.Tween.get(kaijia,{loop:true}).to({y:posy - 5},1000).wait(100).to({y:posy},1000).wait(100);
            this._kaijiaImg = kaijia;

            this._haveTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSkyArmorTimesTxt`,[String(this.vo.v)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._haveTxt.textAlign = egret.HorizontalAlign.CENTER;
            this._haveTxt.lineSpacing = 3;
            this._haveTxt.x = GameConfig.stageWidth/2 - this._haveTxt.width/2;
            this._haveTxt.y = GameConfig.stageHeigth - this._haveTxt.height - 23;
            this.addChild(this._haveTxt);

            let con = this.vo.getAuraCon();
            con.x = GameConfig.stageWidth - con.width*con.scaleX - 30;
            con.y = botbg.y - con.height*con.scaleY + 20;
            this.addChild(con);

            this.initEffect();
            this.freshView();
        });
    }
	protected closeHandler():void
	{
        if(this._isMove)
        {
            return;
        }
		this.hide();
	}
    private initEffect():void
    {
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon())
        {
            if(!this._qiaojiEffect)
            {
                this._qiaojiEffect = App.DragonBonesUtil.getLoadDragonBones("skyarmor_refine",0,"idle");
                this._qiaojiEffect.setPosition(325, 525-(1136-GameConfig.stageHeigth)/2);
                
                this.addChild(this._qiaojiEffect);
                this._qiaojiEffect.visible = false;
            }
        }
    }

    private freshView():void
    {
        if(this._isShowEffect)
        {
            return;
        }

        this.freshFreeLab();
        this.freshRed();
        this.freshProImags();

        let paynum = this.cfg.needGem - (this.vo.buyGem%this.cfg.needGem);
        this._payTxt.text = LanguageManager.getlocal(`acSkyArmorPayDesc`,[String(paynum)]);  
        this._haveTxt.text = LanguageManager.getlocal(`acSkyArmorTimesTxt`,[String(this.vo.v)]);

        let exchangeNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.change.needItem.split("_")[1]);
        let leftNum = this.cfg.specialLimit - this.vo.specialNum;
        this._exchangeNumTxt.text = LanguageManager.getlocal(`acSkyArmorExchangeNumTxt`,[""+exchangeNum,""+leftNum]);
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        if (!data.ret) 
        {
            this._isShowEffect = false;
            this.closeOpenTouch(true);            
            App.CommonUtil.showTip(data.data.ret);
            return;
        }
    }

    private _tempAwards:any=null;
    private attackCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!event.data.ret)
        {
            this._isShowEffect = false;
            this.closeOpenTouch(true);
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        this._tempAwards = rData.rewards;
        this.showEffect();
    }
    private showEffect():void
    {
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon())
        {
            this._kaijiaImg.visible = false;
            this._qiaojiEffect.visible = true;
            let name = this._isTen ? "10ci" : "1ci";
            this._qiaojiEffect.playDragonMovie(name,1);
            this._qiaojiEffect.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE,()=>
            {
                this._kaijiaImg.visible = true;
                this._qiaojiEffect.visible = false;
                this.showRewards();
            },1);        
        }else
        {
            this.showRewards();
        }
    }
    private showRewards():void
    {
        if(this._tempAwards)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempAwards,"isPlayAni":true, "callback":null, "handler":null});            
        }
        this.closeOpenTouch(true);
        this._isShowEffect = false;
        this.freshView();
    }
    private freshProImags():number
    {
        let curId:number=10000;
        let curnum = this.vo.getAchieveNum();
        this._proNumTxt.text = LanguageManager.getlocal(`acskyarmor_pronumtxt`,[String(curnum)]);
        this._proNumTxt.x = this._proNumBg.x + this._proNumBg.width/2 - this._proNumTxt.width/2;

        let datas = this.vo.getSortAchievementCfg(false);
        for(let i = 0; i < this._imgsArr.length; i++)
        {
            if(this.vo.isGetAchievementById(String(datas[i].id)))
            {
                if(this._imgsArr[i]["eff"])
                {
                    this._imgsArr[i]["eff"].dispose();
                    this._imgsArr[i]["eff"] = null;
                }
                App.DisplayUtil.changeToGray(this._imgsArr[i]);
            }else
            {
                if(curnum >= datas[i].needNum)   //可领取
                {
                    if(!this._imgsArr[i]["eff"])
                    {
                        let effect = ComponentManager.getCustomMovieClip(`acskyarmorach`, 10);
                        effect.width = 160;
                        effect.x = this._imgsArr[i].x + this._imgsArr[i].width/2 - effect.width/2;
                        effect.y = this._imgsArr[i].y - 40;
                        effect.playWithTime(-1);
                        this._proContainer.addChild(effect);
                        effect.blendMode = egret.BlendMode.ADD;
                        this._imgsArr[i]["eff"] = effect;
                    }
                }
            }
            if(curnum < datas[i].needNum && curId == 10000)
            {
                curId = datas[i].id;
            }
        }
        return curId;
    }
    private closeOpenTouch(b:boolean):void
    {
        this.touchChildren = b;
        this.touchEnabled = true;
    }
    private jinglianBtnHandle1():void
    {
        this.jinglianBtnHandle(1);
    }
    private jinglianBtnHandle10():void
    {     
        this.jinglianBtnHandle(2);
    }

    private _isShowEffect = false;
    private _isTen = false;
    private jinglianBtnHandle(type:number):void
    {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime() || !this.vo.isStart)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
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
            let message: string = LanguageManager.getlocal(`acskyarmorconfirmDesc`);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : message,
                title : "itemUseConstPopupViewTitle",
                touchMaskClose : true,
                callback : ()=>
                {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler : this,
                needClose : 1,
                needCancel : true
            });
            return;
        }
        this._isShowEffect = true;
        this._isTen = type == 2;
        this.closeOpenTouch(false);
        this.request(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, 
        {
            activeId: this.vo.aidAndCode,
            isFree:cost==0?1:0,
            isTenPlay:type == 1 ? 0 : 1
        });        
    }
    private freshFreeLab():void
    {
        if(this.vo.isfree > 0)
        {
            this._freeBtn.visible = true;
            this._jinglianBtn1.visible = false;
        }else
        {
            this._freeBtn.visible = false;
            this._jinglianBtn1.visible = true;
        }
    }
    private freshRed() 
    {
        if (this.vo.isShowAchieveDot() || this.vo.showExchangeWifeDot())
        {
            App.CommonUtil.addIconToBDOC(this);
            let detailRed = <BaseBitmap>this.getChildByName("reddot");
            if (detailRed)
            {
                detailRed.setPosition(this._detailBtn.x+140, this._detailBtn.y+30);
            }
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this);
        }
    }    
 
    private tick() 
    {
        this._timeCountTxt.setString(this.vo.getAcCountDown());
        this._timeCountTxt.x = this._timebg.x + this._timebg.width/2 - this._timeCountTxt.width/2;
    }
    private showPreEffect(y:number,func:any):void
    {
        let skinid = this.cfg.show;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) 
        {
            boneName = skinCfg.bone + "_ske";
        }
        if(skinCfg)
        {
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
            {
                ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone),null,()=>
                {
                    let servSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    this.addChild(servSkin);
                    servSkin.setScale(0.9);
                    servSkin.setPosition(120,y+10+(1136-GameConfig.stageHeigth)/2);
                    func();
                },null,this);
            }else
            {
                let servSkin = BaseLoadBitmap.create(skinCfg.body);
                this.addChild(servSkin);
                servSkin.setScale(1.05);
                servSkin.setPosition(-40,y-450+(1136-GameConfig.stageHeigth)/3);
                func();
            }
        }else
        {
            func();
        }
    }
   	private getBonesResArr(name:string):string[]
	{
		return [name+"_ske",name+"_tex_json",name+"_tex_png"];
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
        let typecode = this.typeCode;

        // let eff1 = this.effectRes("acskyarmorach",8);
        let eff1 = [];
        let arr = ["acskyarmorcode"+typecode,"acliangbiographyview_common_acbg","acwealthcarpview_servantskintxt",
                    "skin_detail_namebg"
        ];
        let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        if(servantSkinCfg.specialAura)
        {
            arr.push("servant_aura_Icon"+ servantSkinCfg.specialAuraCfg.auraIcon);
        }
        let baseList = arr.concat(eff1);    
        return super.getResourceList().concat(baseList).concat(this.getBonesResArr("skyarmor_refine"));
    }
    private effectRes(name:string,num:number,b:boolean=false):string[]
    {
        let arr = [];
        for(let i = 1; i <= num; i++)
        {
            arr.push(name+String(i));
        }
        if(b)
        {
            return arr;
        }
        return this.getDefaultResList(arr);
    }    
	protected getProbablyInfo():string
	{
		return "acSkyArmorProbablyInfo-"+this.typeCode;
    }     
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}  
    
    public dispose():void
    {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_PLAY, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._payTxt = null;   
        this._infobg = null;
        this._proNumTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._detailBtn = null;
        this._freeBtn = null;
        this._jinglianBtn1 = null;
        this._haveTxt = null;
        this._exchangeNumTxt = null;
        for(let i = 0; i < this._imgsArr.length; i++)
        {
            if(this._imgsArr[i]["eff"])
            {
                this._imgsArr[i]["eff"].dispose();
                this._imgsArr[i]["eff"] = null;
            }
            this._imgsArr[i].dispose();
            this._imgsArr[i] = null;
        }
        this._imgsArr = null;
     
        if(this._qiaojiEffect)
        {
            this._qiaojiEffect.dispose();
            this._qiaojiEffect = null;
        }
        super.dispose();
    }
}