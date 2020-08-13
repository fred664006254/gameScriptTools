/*
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
*/

class AcDuanWuView extends AcCommonView
{
    private _timeCountTxt : BaseTextField = null;
    private _timebg : BaseBitmap = null;
    private _itemNumTextTab:BaseTextField[] = [];
    private _sceneLayer:BaseDisplayObjectContainer = null;

    private _nameBtnTab:BaseButton[] = [];

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "duanwu_title-" + this.getUiCode();
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getRuleInfo():string{
		return "acDuanWuRuleInfo-" + this.getUiCode();
    } 

    private get cfg() : Config.AcCfg.DuanWuCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }

    protected getBgName():string{
        let code = this.getUiCode();
		return `duanwubg-${code}`;
    }

    protected  getUiCode():string
	{   
        if (this.code == "2")
        {
            return "1";
        }
		return this.code;
	}

      protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `duanwu_title-${code}`,"acwealthcarpview_skineffect1","acwealthcarpview","acliangbiographyview_common_acbg",
           `duanwubg-${code}`, `duanwu_handrail`, `duanwuiconsmall1-${code}`,`duanwuiconsmall2-${code}`,`duanwuiconsmall3-${code}`,
           `duanwu_entrance1-${code}`,`duanwu_entrance2-${code}`,`duanwu_entrance3-${code}`,`duanwu_entrance4-${code}`,
            `duanwu_name1-${code}`,`duanwu_name2-${code}`,`duanwu_name3-${code}`,`duanwu_name4-${code}`,
        ]);
    }

    private _pos = {
        1 : {x : 434, y : 514+35, nameX : 95, nameY : -15, sceneName : ViewConst.POPUP.ACDUANWUPOPUPVIEW ,red:1},
        2 : {x : 196, y : 542+35, nameX : -10, nameY : -25, sceneName : ViewConst.POPUP.ACDUANWUPOPUPVIEW3,red:3},
        3 : {x : 302, y : 415+35, nameX : -40, nameY : -5, sceneName : ViewConst.POPUP.ACDUANWUPOPUPVIEW4,red:4},
        4 : {x : 472, y : 666+35, nameX : -20, nameY : -5, sceneName : ViewConst.POPUP.ACDUANWUPOPUPVIEW2,red:2},
    };

    public initView()
    {
        // egret.callLater(function(){
        //     ViewController.getInstance().openView(ViewConst.POPUP.ACDUANWUPOPUPVIEW,{
        //         aid : this.aid,
        //         code : this.code
        //     });
        // },this);

        if (PlatformManager.checkIsTextHorizontal()) {
            this._pos = {
                1: { x: 434, y: 514 + 35, nameX: 434, nameY: 528, sceneName: ViewConst.POPUP.ACDUANWUPOPUPVIEW, red: 1 },
                2: { x: 196, y: 542 + 35, nameX: 181, nameY: 550, sceneName: ViewConst.POPUP.ACDUANWUPOPUPVIEW3, red: 3 },
                3: { x: 302, y: 415 + 35, nameX: 292, nameY: 443, sceneName: ViewConst.POPUP.ACDUANWUPOPUPVIEW4, red: 4 },
                4: { x: 472, y: 666 + 35, nameX: 444, nameY: 664, sceneName: ViewConst.POPUP.ACDUANWUPOPUPVIEW2, red: 2 },
            };
        }

        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

        //top背景图
        let topbg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topbg.width = GameConfig.stageWidth;
        topbg.height = 144;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height-7]);
        view.addChildAt(topbg,this.getChildIndex(this.container));
        
        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true)}`, 20);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20,23]);
        view.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDuanWuTip1-${code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);
        view.addChild(tipTxt);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._timebg = timebg;

        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;

      

        for(let i = 1; i <= 4; ++ i){

            let buildMask = BaseBitmap.create(`duanwu_entrance${i}-${code}`);
			buildMask.addTouch((e : egret.Event)=>{
				if(e.type==egret.TouchEvent.TOUCH_BEGIN){
					if(buildMask.alpha == 0){
						buildMask.alpha = 0.3;
					}
					else{
						buildMask.alpha = 0;
					}
				}
				else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
					buildMask.alpha = 0;
				}
				if(e.type == egret.TouchEvent.TOUCH_END){
					buildMask.alpha = 0;
					if(GameData.serverTime < view.vo.et){
						//弹板
						ViewController.getInstance().openView(view._pos[i].sceneName, {
							code : view.code,
                            uicode:view.getUiCode(),
							aid : view.aid
						})
					}
					else{
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					}
				}
			},view,null,true);
			buildMask.setScale(4);
			buildMask.x = view._pos[i].x + view.viewBg.x;
			buildMask.y = view._pos[i].y + view.viewBg.y;
			view.addChild(buildMask);
			buildMask.alpha = 0;


            let buildName = ComponentManager.getButton(`duanwu_name${i}-${code}`, '', ()=>{
				//弹板
				if(GameData.serverTime < view.vo.et){
					//弹板
					ViewController.getInstance().openView(view._pos[i].sceneName, {
						code : view.code,
                        uicode:view.getUiCode(),
						aid : view.aid
					})
				}
				else{
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				}
			}, view);
			buildName.x = view._pos[i].nameX + buildMask.x;
			buildName.y = view._pos[i].nameY + buildMask.y;
            if (PlatformManager.checkIsTextHorizontal()) {
                buildName.x = view._pos[i].nameX + view.viewBg.x;
			    buildName.y = view._pos[i].nameY + view.viewBg.y;
            }
			view.addChild(buildName);

            view._nameBtnTab.push(buildName);

        }
        let servantBone = "servant_full2_10491";
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(servantBone+"_ske"))//+"_ske"
        {
            let servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
			servantDB.setPosition(0+ view.viewBg.x+140, 633+ view.viewBg.y+410);
            servantDB.anchorOffsetY = servantDB.height;
			servantDB.anchorOffsetX = servantDB.width / 2;
            servantDB.scaleX = -1;
			this.addChild(servantDB);
        }
        else
        {   
            // let rect = egret.Rectangle.create();
		    // rect.setTo(0, 0, 250, 288);
            let servantPic = BaseLoadBitmap.create("duanwuservant-"+code);
			servantPic.setPosition(view.viewBg.x, 663+ view.viewBg.y);
			this.addChild(servantPic);
        }

        let wifeBone = "wife_full3_2161";
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(wifeBone+"_ske"))//
        {
            let wifetDB = App.DragonBonesUtil.getLoadDragonBones(wifeBone);
			wifetDB.setPosition(158+ view.viewBg.x +160, 688+ view.viewBg.y + 450);
            wifetDB.anchorOffsetY = wifetDB.height;
			wifetDB.anchorOffsetX = wifetDB.width / 2;
            wifetDB.setScale(0.7);
			this.addChild(wifetDB);
        }
        else
        {   
            let rect = egret.Rectangle.create();
		    rect.setTo(0, 0, 250, 328);
            let servantPic = BaseLoadBitmap.create("wife_skin_2161",rect);
			servantPic.setPosition(158+ view.viewBg.x, 688+ view.viewBg.y);
			this.addChild(servantPic);
        }
        //扶栏
        let handrail:BaseBitmap = BaseBitmap.create(`duanwu_handrail`);
        handrail.y = GameConfig.stageHeigth-handrail.height;
        view.addChild(handrail);

        //预览
		let topBg = {x:20,y:GameConfig.stageHeigth - 270};
        for (let i=1; i<=2; i++)
        {   
            if (i==2)
            {
                topBg = {x:230,y:GameConfig.stageHeigth - 270};
            }
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
			// this._effect.setScale(2);
			let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
			skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
			skinTxtEffect.blendMode = egret.BlendMode.ADD;
			this.addChild(skinTxtEffect);
			skinTxtEffect.playWithTime(-1);

			let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
			skinTxt.anchorOffsetX = skinTxt.width / 2;
			skinTxt.anchorOffsetY = skinTxt.height / 2;
			skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
			this.addChild(skinTxt);
			egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


			let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
			skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
			skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
			skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
			this.addChild(skinTxteffect);
			skinTxteffect.blendMode = egret.BlendMode.ADD;
			skinTxteffect.alpha = 0;
			egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
			
			//透明点击区域
			let touchPos = BaseBitmap.create("public_alphabg");
			touchPos.width = 180;
			touchPos.height = 176;
			touchPos.setPosition(topBg.x, topBg.y);
			view.addChild(touchPos);
			touchPos.addTouchTap(() => {
                if (i == 1)
                {   
                    
                    let num = 0;
                    let needCharge = view.vo.getArr("recharge");
                    for(let k in needCharge){
                        if(needCharge[k].getReward.indexOf("2309") > -1){
                            num = needCharge[k].needGem;
                            break;
                        }
                    }
                    let titleStr:string=LanguageManager.getlocal("acDuanWuClothesTip2-"+code,[String(num)]);
					ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSEVRVANTSKINPOPUPVIEW,{sid:"10491",title:titleStr});
                }
                else
                {   
                    let titleStr:string=LanguageManager.getlocal(`acDuanWuClothesTip1-${code}`);
					ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSKINPOPUPVIEW,{sid:"2161",title:titleStr});
                }
				
			}, ViewController);
        }
			

        //道具
        for (let i:number = 1; i<=3; i++)
        {
            let goldBg1:BaseBitmap = BaseBitmap.create("public_9_resbg");
            goldBg1.setPosition( 7+(i-1)*148, 242);
            this.addChild(goldBg1);

            let icon:BaseBitmap = BaseBitmap.create(`duanwuiconsmall${i}-${code}`);
            icon.setPosition(goldBg1.x-2,goldBg1.y-2);
            this.addChild(icon);

            let numText:BaseTextField = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            numText.setPosition(goldBg1.x+50,goldBg1.y+goldBg1.height/2-numText.height/2);
            this.addChild(numText);

            this._itemNumTextTab.push(numText);
        }
         view.freshView();
    }


    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
    }

    private freshView():void
    {
        let view = this;

        for(let i = 1; i <= 4; ++ i){
            let red = this._pos[i].red;
			if(view.vo[`getpublicRedhot${red}`]()){
				App.CommonUtil.addIconToBDOC(view._nameBtnTab[i-1]);
			}
            else
            {
                App.CommonUtil.removeIconFromBDOC(view._nameBtnTab[i-1]);
            }
		}

        for (let i:number = 1; i<=3; i++)
        {
            this._itemNumTextTab[i-1].text = String(this.vo.getActivityItem(i));
        }
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
        return {title:{key:`acDuanWureporttitle-${this.code}`},msg:{key:`acDuanWureportmsg-${this.code}`}};
	}

    public dispose():void
    {
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        view._timeCountTxt = null;
        view._timebg = null;
        view._itemNumTextTab.length = 0;
        view._sceneLayer = null;
        view._nameBtnTab.length = 0;
 

        super.dispose();
    }
}