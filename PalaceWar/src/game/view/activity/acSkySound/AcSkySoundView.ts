/*
    author : wxz
    date : 2020/6/15
    desc : 天籁之音--黄月英
*/
class AcSkySoundView extends AcCommonView
{
    private _detailBtn:BaseBitmap;
    private _timeCountTxt : BaseTextField = null;
    private _timebg:BaseBitmap = null;
    private _icon1:BaseBitmap=null;
    private _costTxt1:BaseTextField=null;
    private _freeLab:BaseTextField=null;   
    private _icon0:BaseBitmap=null;
    private _costTxt10:BaseTextField=null;
    private _haveTxt:BaseTextField=null;

    private _isMove = false;

    private _yfNum1:number = 0;
    private _yfNum2:number = 0;
    private _yfNum3:number = 0;

    private _infobg:BaseBitmap=null;
    private _proNumTxt:BaseTextField=null;
    private _imgsArr:BaseBitmap[] = null;
    private _scrollView:ScrollView = null;
    private _proContainer:BaseDisplayObjectContainer = null;
    private _qiaojiEffect:BaseLoadDragonBones=null;
    private _botbzImg:BaseBitmap=null;
    private _payTxt:BaseTextField=null;

    private _bubbleCon:BaseDisplayObjectContainer = null;
    private _bubbleTxt:BaseTextField=null;
    private _bubbleCount:number=null;
    private _soundCount:number=null;

    private _checkBox1:CheckBox = null;
    private _checkTxt1:BaseTextField=null;
    private _checkBox2:CheckBox = null;
    private _checkTxt2:BaseTextField=null;
    private _drinkTeaBtn10:BaseButton=null;

    public static IS_SHOW_PROCESS: number = -1;

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "acskysound_title-" + this.typeCode;
	}
    protected getTitleStr(): string {
        return null;
    }
	protected getBgName():string
	{
		return "acskysound_bg-"+this.typeCode;
	}    
    protected getRuleInfo():string{
		return "acSkySoundRuleInfo-" + this.code;
    } 

    private get cfg() : Config.AcCfg.SkySoundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
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
        let name = (e.currentTarget).name;
        AcSkySoundView.IS_SHOW_PROCESS = parseInt(name.split("_")[1]) + 1;
        ViewController.getInstance().openView(ViewConst.POPUP.ACSKYSOUNDREWARDPOPVIEWTAB2,{aid:this.aid, code:this.code});
    }

    public initView()
    {
        this._soundCount = 0;

        let code = this.code;
        let typecode = this.typeCode;
        this.width = GameConfig.stageWidth;
		this.height = GameConfig.stageHeigth;

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_KNOCK, this.attackCallback, this);

        let numbg = BaseBitmap.create(`acskysound_zhu1`);
        numbg.x = 10;
        numbg.y = this.titleBg.y+this.titleBg.height + 130;
        this.addChild(numbg);
        numbg.touchEnabled = true;
        numbg.addTouchTap(()=>
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKYSOUNDREWARDPOPVIEWTAB2,{aid:this.aid, code:this.code});
        },this);

        let proNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acskysound_pronumtxt`,["0"]), 16, TextFieldConst.COLOR_BROWN);
        proNumTxt.lineSpacing = 3;
        proNumTxt.width = numbg.width;
        proNumTxt.textAlign = egret.HorizontalAlign.CENTER;
        proNumTxt.x = numbg.x;
        proNumTxt.y = numbg.y + 50;
        this.addChild(proNumTxt);
        this._proNumTxt = proNumTxt;
        let countX = 0;
        this._imgsArr = [];
        this._proContainer = new BaseDisplayObjectContainer();
        this._proContainer.height = 160;

        let datas = this.vo.getSortAchievementCfg(false);
        let count = 0;
        for(let i = 0; i < Number.MAX_VALUE; i++)
        {
            let img:BaseBitmap;
            if(i%5 == 0)
            {
                let num = datas[count].needNum;
                countX += 5;
                img = BaseBitmap.create(`acskysound_zhu2`);
                img.x = countX;
                this._proContainer.addChild(img);

                let txtbg = BaseBitmap.create("acskysoundtxtbg");
                txtbg.width = 60;
                txtbg.height = 24;
                txtbg.alpha = 0.8;
                txtbg.x = img.x+img.width/2 - txtbg.width/2;
                txtbg.y = img.height + 2;
                this._proContainer.addChild(txtbg);
                
                let txt = ComponentManager.getTextField(String(num), 18, TextFieldConst.COLOR_WHITE);
                txt.x = txtbg.x+txtbg.width/2 - txt.width/2;
                txt.y = txtbg.y+txtbg.height/2 - txt.height/2;
                this._proContainer.addChild(txt);

                img.touchEnabled = true;
                img.name = "img_"+count;
                img.addTouchTap(this.clickImg,this);
                this._imgsArr.push(img);
                count++;
                if(count >= datas.length)
                {
                    break;
                }                
            }else
            {
                if(i%5 == 1)
                {
                    countX += 40;
                }else
                {
                    countX += 20;
                }              
                img = BaseBitmap.create(`acskysound_zhu4`);
                img.x = countX;
                this._proContainer.addChild(img);
            }
        }
        // this.addChild(this._proContainer);
        let scrollView = ComponentManager.getScrollView(this._proContainer, new egret.Rectangle(0,0,GameConfig.stageWidth-(numbg.x+numbg.width + 5), this._proContainer.height));
        scrollView.setPosition(numbg.x+numbg.width + 5, numbg.y);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        this.addChild(scrollView);

        let curId = this.freshProImags();

        this._scrollView.scrollLeft =this._proContainer.width - this._scrollView.width;
        if(curId < 6)
        {
            this._isMove = true;
			egret.Tween.get(this._scrollView).wait(300).to({scrollLeft : 0}, 500).call(()=>{
				egret.Tween.removeTweens(this._scrollView);
                this._isMove = false;
			}, this);           
        }

        this._infobg = BaseBitmap.create(`acskysound_infobg-${typecode}`);
        this._infobg.x = GameConfig.stageWidth/2 - this._infobg.width/2;
        this._infobg.y = this.titleBg.y+this.titleBg.height;
        this.addChild(this._infobg);

        //活动时间   
        let timeTxt = ComponentManager.getTextField(this.vo.getAcTimeAndHour("acSkySound_time"), 18, TextFieldConst.COLOR_WHITE);
        timeTxt.x = this._infobg.x + 60;
        timeTxt.y = this._infobg.y + 25;
        this.addChild(timeTxt);

        let needNum = this.vo.getWifeNeed();
        let infoTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSkySoundInfo-${typecode}`,[String(this.cfg.needGem),String(needNum)]), 18, TextFieldConst.COLOR_WHITE);
        infoTxt.x = timeTxt.x;
        infoTxt.y = timeTxt.y + timeTxt.height + 4;
        infoTxt.lineSpacing = 4;
        infoTxt.width = 530;
        this.addChild(infoTxt);

        let paynum = this.cfg.needGem - (this.vo.v%this.cfg.needGem);
        let payTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acskysoundpayDesc`,[String(paynum)]), 18, TextFieldConst.COLOR_WHITE);
        payTxt.x = timeTxt.x;
        payTxt.y = infoTxt.y + infoTxt.height + 10;
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

        let botbg = BaseBitmap.create(`acskysound_desk-${typecode}`);
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height;

        let botbzImg = BaseBitmap.create(`acskysound_bz-${typecode}`);
        botbzImg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbzImg.y = botbg.y - botbzImg.height + 45;
        this._botbzImg = botbzImg;

        let maskbg = BaseBitmap.create(`skysoundbtnmask0`);
        maskbg.setPosition(530,670*(GameConfig.stageHeigth/1136));
        this.addChild(maskbg);

        let detailImg = BaseBitmap.create(`skysoundbtnmask`);
        // detailImg.setScale(4);
        detailImg.width = maskbg.width+5;
        detailImg.height = maskbg.height-6;
        detailImg.setPosition(maskbg.x+maskbg.width/2-detailImg.width/2-5,maskbg.y+maskbg.height/2-detailImg.height/2);
        this.addChild(detailImg);
        detailImg.alpha = 0;
        detailImg.touchEnabled = true;
        this._detailBtn = detailImg;
        detailImg.addTouch((event:egret.TouchEvent)=>
        {
            let target = event.currentTarget;
            if(event.type == egret.TouchEvent.TOUCH_BEGIN)
            {
                this._detailBtn.alpha = 1;
            }else
            {
                this._detailBtn.alpha = 0;
            }
        },1);
        detailImg.addTouchTap(()=>
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKYSOUNDREWARDPOPVIEW, {aid:this.aid, code:this.code});
        },this);

        //活动详情
        let detailBtnBg = ResourceManager.hasRes("skysoundbtn-"+this.code) ? "skysoundbtn-"+this.code : "skysoundbtn-1";
        let detailBtnImg = BaseBitmap.create(detailBtnBg);
        detailBtnImg.setPosition(detailImg.x+detailImg.width/2-detailBtnImg.width/2,detailImg.y+detailImg.height*detailImg.scaleY-detailBtnImg.height/2);
        this.addChild(detailBtnImg);        

        this.showAcDialog();

        this.showPreEffect(botbg.y,()=>
        {
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(botbzImg.x+botbzImg.width/2-104, botbzImg.y - 100);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);

            let skinTxt = BaseBitmap.create("acnightsky_exchange_txt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt1 = BaseBitmap.create("acnightsky_exchange_txt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChild(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            skinTxt1.addTouchTap(() => {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSKYSOUNDREWARDPOPVIEWTAB4, {aid: this.aid, code: this.code});
            }, this);

            this.addChild(botbg);
            this.addChild(botbzImg);

            this._bubbleCon = new BaseDisplayObjectContainer();
            this.addChild(this._bubbleCon);

            let bubble = BaseBitmap.create(`acskysound_bubble`);
            bubble.width = 220;
            bubble.height = 100;
            this._bubbleCon.addChild(bubble);

            this._bubbleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSkySoundBubble1"), 20,TextFieldConst.COLOR_BROWN);
            this._bubbleTxt.width = 150;
            this._bubbleTxt.x = bubble.x + bubble.width/2 - this._bubbleTxt.width/2 + 5;
            this._bubbleTxt.y = bubble.y + 25;
            this._bubbleCon.addChild(this._bubbleTxt);

            this._bubbleCon.anchorOffsetY = bubble.height;
            this._bubbleCon.x = GameConfig.stageWidth - bubble.width - 20;
            this._bubbleCon.y = botbzImg.y-200 + (1136-GameConfig.stageHeigth)/6;
            this._bubbleCon.alpha = 0;

            let itemhave = BaseBitmap.create(`acskysound_iconsmall-${typecode}`);
            this.setLayoutPosition(LayoutConst.horizontalCenterbottom,itemhave,botbg,[-40,99]);
            this.addChild(itemhave);
            let txthave = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",["20"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
            txthave.x = itemhave.x + itemhave.width+ 3;
            txthave.y = itemhave.y + 3;
            this.addChild(txthave);
            this._haveTxt = txthave;

            // 前进按钮
            let drinkTeaBtn1 = ComponentManager.getButton("acskysoundbtn1", "", this.drinkTeaBtnHandle1, this);
            this.addChild(drinkTeaBtn1);
            this.setLayoutPosition(LayoutConst.leftbottom,drinkTeaBtn1,botbg,[70,5]);
            let drinkTeaBtn10 = ComponentManager.getButton("acskysoundbtn10", "", this.drinkTeaBtnHandle10, this);
            this.addChild(drinkTeaBtn10);
            this.setLayoutPosition(LayoutConst.rightbottom,drinkTeaBtn10,botbg,[70,5]);
            this._drinkTeaBtn10 = drinkTeaBtn10;

            let iconscale = 1;
            let icon1 = BaseBitmap.create(`acskysound_iconsmall-${typecode}`);
            icon1.setScale(iconscale);
            icon1.x = drinkTeaBtn1.x + 5;
            icon1.y = drinkTeaBtn1.y - 25;
            this.addChild(icon1);
            let costTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",[String(this.cfg.cost1)]), 18,TextFieldConst.COLOR_LIGHT_YELLOW);
            costTxt1.x = icon1.x + icon1.width + 1;
            costTxt1.y = icon1.y + 2;
            this.addChild(costTxt1);

            let freeLab = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_freetxt"), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
            freeLab.x = drinkTeaBtn1.x + drinkTeaBtn1.width/2 - freeLab.width/2-10;
            freeLab.y = drinkTeaBtn1.y - 25;
            this.addChild(freeLab);

            let icon10 = BaseBitmap.create(`acskysound_iconsmall-${typecode}`);
            icon10.setScale(iconscale);
            icon10.x = drinkTeaBtn10.x + 50;
            icon10.y = icon1.y;
            this.addChild(icon10);
            let costTxt10 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",[String(this.cfg.cost10)]), 18,TextFieldConst.COLOR_LIGHT_YELLOW);
            costTxt10.x = icon10.x + icon10.width + 1;
            costTxt10.y = costTxt1.y;
            this.addChild(costTxt10);

            this._icon1 = icon1;
            this._costTxt1 = costTxt1;
            this._freeLab = freeLab;
            this._costTxt10 = costTxt10;

            this.initEffect();

            this._checkBox1=ComponentManager.getCheckBox("");
            this._checkBox1.setPosition(35, GameConfig.stageHeigth-160);
            this.addChild(this._checkBox1);
            this._checkBox1.addTouchTap(this.onCheckClick1,this);        
            this._checkTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysoundCheckTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._checkTxt1.setPosition(this._checkBox1.x+this._checkBox1.width+5,this._checkBox1.y+this._checkBox1.height/2-this._checkTxt1.height/2);
            this.addChild(this._checkTxt1);

            this._checkBox2=ComponentManager.getCheckBox("");
            this._checkBox2.setPosition(0, this._checkBox1.y);
            this.addChild(this._checkBox2);
            this._checkTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acskysoundCheckTip2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._checkTxt2.setPosition(GameConfig.stageWidth-this._checkTxt2.width-35,this._checkBox2.y+this._checkBox2.height/2-this._checkTxt2.height/2);
            this.addChild(this._checkTxt2);
            this._checkBox2.x = this._checkTxt2.x - this._checkBox2.width - 5;
            this._checkBox2.addTouchTap(this.onCheckClick2,this);

            this.freshView();
        });
    }

    private onCheckClick1():void
    {
        
    }
    private onCheckClick2():void
    {
        if(this._checkBox2.checkSelected())
        {
            this._costTxt10.text = LanguageManager.getlocal("acskysound_numtxt",["50"]);
            this._drinkTeaBtn10.setBtnBitMap("acskysoundbtn50");
        }else
        {
            this._costTxt10.text = LanguageManager.getlocal("acskysound_numtxt",[String(this.cfg.cost10)]);
            this._drinkTeaBtn10.setBtnBitMap("acskysoundbtn10");
        }
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
            this._botbzImg.visible = false;
            if(!this._qiaojiEffect)
            {
                this._qiaojiEffect = App.DragonBonesUtil.getLoadDragonBones("chimebell",1,"idle");
                this._qiaojiEffect.setPosition(0, GameConfig.stageHeigth-1136);
                
                this.addChild(this._qiaojiEffect);
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
        this._haveTxt.text = LanguageManager.getlocal("acskysound_numtxt",[String(this.vo.getProcess())]);

        let paynum = this.cfg.needGem - (this.vo.v%this.cfg.needGem);
        this._payTxt.text = LanguageManager.getlocal(`acskysoundpayDesc`,[String(paynum)]);        
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

        let num1 = this.vo.getSpecialNum("costSpecial2");
        let num2 = this.vo.getSpecialNum("costSpecial4");
        let num3 = this.vo.getSpecialNum("costSpecial8");

        if(num3 > this._yfNum3)
        {
            this._tempAwards = "1064_0_" + (num3-this._yfNum3) + "_" + this.typeCode + "|" + this._tempAwards;
        }  
        if(num2 > this._yfNum2)
        {
            this._tempAwards = "1063_0_" + (num2-this._yfNum2) + "_" + this.typeCode + "|" + this._tempAwards;
        }
        if(num1 > this._yfNum1)
        {
            this._tempAwards = "1062_0_" + (num1-this._yfNum1) + "_" + this.typeCode + "|" + this._tempAwards;
        }        

        if(!this._checkBox1.checkSelected())
        {
            if(this._isTen)
            {
                SoundManager.playEffect("effect_acskySound10");
            }else
            {
                if(this._soundCount%2 == 0)
                {
                    SoundManager.playEffect("effect_acskySound1");
                }else
                {
                    SoundManager.playEffect("effect_acskySound2");
                }
                this._soundCount++;
            }
        }
        this.showEffect();        
    }
    private showEffect():void
    {
        let b = this._checkBox1.checkSelected();
        if (!b && (!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon())
        {
            let name = this._isTen ? "ten" : "one";
            name = name + (Math.random()>0.5 ? "2" : "1");
            this._qiaojiEffect.playDragonMovie(name,1);
            this._qiaojiEffect.setDragonBoneEventListener(dragonBones.AnimationEvent.COMPLETE,()=>
            {
                if(this._tempAwards)
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempAwards,"isPlayAni":true, "callback":null, "handler":null,isSameAdd:this._isfiveTen});            
                }
                this.closeOpenTouch(true);
                this._isShowEffect = false;
                this.freshView();
            },1);        
        }else
        {
            if(this._tempAwards)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._tempAwards,"isPlayAni":true, "callback":null, "handler":null,isSameAdd:this._isfiveTen});            
            }
            this.closeOpenTouch(true);
            this._isShowEffect = false;
            this.freshView();           
        }
    }
    private freshProImags():number
    {
        let curId:number=10000;
        let curnum = this.vo.getAchieveNum();
        this._proNumTxt.text = LanguageManager.getlocal(`acskysound_pronumtxt`,[String(curnum)]);

        if(this._checkBox2)
        {
            this._checkBox2.visible = curnum >= 50;
            this._checkTxt2.visible = curnum >= 50;
        }

        let datas = this.vo.getSortAchievementCfg(false);
        for(let i = 0; i < this._imgsArr.length; i++)
        {
            if(this.vo.isGetAchievementById(String(datas[i].id)))
            {
                this._imgsArr[i].texture = ResourceManager.getRes("acskysound_zhu2a");
                if(this._imgsArr[i]["eff"])
                {
                    this._imgsArr[i]["eff"].dispose();
                    this._imgsArr[i]["eff"] = null;
                }
            }else
            {
                if(curnum >= datas[i].needNum)   //可领取
                {
                    if(!this._imgsArr[i]["eff"])
                    {
                        let effect = ComponentManager.getCustomMovieClip(`skysoundeff`, 8);
                        effect.width = 212;
                        effect.x = this._imgsArr[i].x + this._imgsArr[i].width/2 - effect.width/2;
                        effect.y = this._imgsArr[i].y - 15;
                        effect.playWithTime(-1);
                        this._proContainer.addChild(effect);

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
    private drinkTeaBtnHandle1():void
    {
        this.drinkTeaBtnHandle(1);
    }
    private drinkTeaBtnHandle10():void
    {     
        this.drinkTeaBtnHandle(2);
    }

    private _isShowEffect = false;
    private _isTen = false;
    private _isfiveTen = false;
    private drinkTeaBtnHandle(type:number):void
    {
        if (!this.vo.isInActivity() || this.vo.checkIsInEndShowTime())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }       
        let cost = type == 1 ? this.cfg.cost1 : this.cfg.cost10;
        if(type == 1 && this.vo.isfree > 0)
        {
            cost = 0;
        }
        if(type == 2 && this._checkBox2.checkSelected())
        {
            cost = 50;
        }
        let have = this.vo.getProcess();
        if(have < cost)
        {
            let message: string = LanguageManager.getlocal(`acskysoundconfirmDesc`);
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
        this._isfiveTen = cost == 50;
        this.closeOpenTouch(false);
        this._yfNum1 = this.vo.getSpecialNum("costSpecial2");
        this._yfNum2 = this.vo.getSpecialNum("costSpecial4");
        this._yfNum3 = this.vo.getSpecialNum("costSpecial8");
        this.request(NetRequestConst.REQUEST_ACSKYSOUND_KNOCK, 
        {
            activeId: this.vo.aidAndCode,
            isTenPlay:type == 1 ? 0 : 1,
            isFifthPlay:cost==50 ? 1 : 0
        });        
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
    }
    private freshRed() 
    {
        if (this.vo.isShowAchieveDot() || this.vo.showExchangeDot() || this.vo.showExchangeWifeDot())
        {
            App.CommonUtil.addIconToBDOC(this);
            let detailRed = <BaseBitmap>this.getChildByName("reddot");
            if (detailRed)
            {
                detailRed.setPosition(this._detailBtn.x+60, this._detailBtn.y);
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

        if(this._bubbleCount == null)
        {
            this._bubbleCount = 1;
        }else
        {
            this._bubbleCount++;
        }
        if(this._bubbleCount%24 == 0)
        {
            let rand = Math.floor(Math.random()*5+1);
            this._bubbleTxt.text = LanguageManager.getlocal("acSkySoundBubble"+rand);
            egret.Tween.get(this._bubbleCon).to({alpha:1}, 1000,egret.Ease.quadOut).wait(5000).to({alpha:0}, 1000,egret.Ease.quadOut).call(()=>{
				egret.Tween.removeTweens(this._bubbleCon);
			}, this);
        }
    }
    private showPreEffect(y:number,func:any):void
    {
        let wifeId = this.cfg.show;
        let skinCfg = Config.WifeCfg.getWifeCfgById(wifeId);
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
                    let wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    this.addChild(wife);
                    wife.setScale(0.85);
                    wife.setPosition(340,y+10+(1136-GameConfig.stageHeigth)/2);
                    func();
                },null,this);
            }else
            {
                let wife = BaseLoadBitmap.create(skinCfg.body);
                this.addChild(wife);
                wife.setScale(0.6);
                wife.setPosition(140,y-490+(1136-GameConfig.stageHeigth)/3);
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
        let codeRes = this.getDefaultResList([
            "acskysound_bg",
            "acskysound_bz",
            "acskysound_desk",
            "acskysound_iconsmall",
            "acskysound_specialitem",
            "acskysound_title",
            "skysoundbtn",
            "acskysound_infobg",
            "acskysound_yf1",
            "acskysound_yf2",
            "acskysound_yf3",
        ]);
        // let eff1 = this.effectRes("acskysoundeff",8);
        let eff1 = [];
        let arr = ["acskysound_bubble",,"acskysound_zhu1","acskysound_zhu2","story_bg6","acskysoundtxtbg",
        "acskysound_zhu4","acskysoundbtn1","acskysoundbtn10","acskysound_zhu2a","acskysound_zhu4a","skysoundbtnmask",
        "acnightsky_exchange_txt","skysoundbtnmask0","acskysoundbtn50"];
        let baseList = arr.concat(eff1);    
        return super.getResourceList().concat(baseList).concat(codeRes).concat(this.getBonesResArr("chimebell"));
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
		return "acSkySoundProbablyInfo-"+this.typeCode;
    }     
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}    
	protected getSoundBgName():string
	{
		return "music_acskysound";
	}    
    
    public dispose():void
    {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_KNOCK, this.attackCallback, this);
        this._timeCountTxt = null;
        this._isShowEffect = false;
        this._haveTxt = null;
        this._payTxt = null;
        this._icon0 = null;
        this._icon1 = null;
        this._freeLab = null;    
        this._infobg = null;
        this._scrollView = null;
        this._proContainer = null;
        this._bubbleCon = null;
        this._bubbleTxt = null;
        this._bubbleCount = null;
        this._checkBox1 = null;
        this._checkBox2 = null;
        this._checkTxt1 = null;
        this._checkTxt2 = null;
        this._costTxt1 = null;
        this._costTxt10 = null;
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
        this._botbzImg = null;
        this._soundCount = null;
        this._isMove = false;
        super.dispose();
    }
}